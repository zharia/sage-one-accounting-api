/**
 * HTTP Transport layer (spec §10, ADR-006).
 *
 * Owns:
 * - Request URL and header construction
 * - Authentication injection via `SageAuthenticator`
 * - JSON, multipart FormData, and binary (`ArrayBuffer`) response handling
 * - Timeouts & `AbortSignal` composition
 * - Request correlation IDs
 * - Conservative GET-only retry policy (never retries financial mutations)
 * - Deterministic mapping into the `SageError` hierarchy
 * - Structured logging events (`request.start`, `request.end`, `request.retry`, `request.abort`)
 */

import { randomUUID } from "node:crypto";
import type { ZodType } from "zod";

import type { SageAuthenticator } from "../auth/index.js";
import type { ResolvedSageOneConfig } from "../config/index.js";
import {
  SageApiError,
  SageAuthenticationError,
  SageAuthorizationError,
  SageConflictError,
  SageError,
  SageNetworkError,
  SageNotFoundError,
  SageRateLimitError,
  SageResponseError,
  SageTimeoutError,
} from "../errors/index.js";
import { NOOP_LOGGER, type SageLogger } from "../logging/index.js";
import { validateRequestPayload, validateResponsePayload } from "../validation/index.js";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface TransportRequest<TReq = unknown, TRes = unknown> {
  readonly resource: string;
  readonly operation: string;
  readonly method: HttpMethod;
  readonly path: string;
  readonly query?: Readonly<Record<string, string | number | boolean | undefined>> | undefined;
  readonly body?: TReq | undefined;
  readonly formData?: FormData | undefined;
  readonly requestSchema?: ZodType<TReq> | undefined;
  readonly responseSchema?: ZodType<TRes> | undefined;
  readonly responseType?: "json" | "binary" | "empty" | undefined;
  readonly requiresAuthentication?: boolean | undefined;
  readonly isFinancialMutation?: boolean | undefined;
  readonly allowRetry?: boolean | undefined;
  readonly companyId?: number | undefined;
  readonly timeout?: number | undefined;
  readonly signal?: AbortSignal | undefined;
  readonly headers?: Readonly<Record<string, string>> | undefined;
}

const TRANSIENT_HTTP_STATUSES = new Set([429, 502, 503, 504]);

function isRetryAllowed<TReq, TRes>(
  request: TransportRequest<TReq, TRes>,
  config: ResolvedSageOneConfig,
): boolean {
  if (!config.retry.enabled || config.retry.maxAttempts <= 1) {
    return false;
  }
  if (request.isFinancialMutation === true) {
    return false;
  }
  if (request.method !== "GET" && request.allowRetry !== true) {
    return false;
  }
  return true;
}

function sanitizePathForLog(url: URL): string {
  const clone = new URL(url.toString());
  for (const key of [...clone.searchParams.keys()]) {
    if (/^(?:apikey|api_key|password|token|secret)$/i.test(key)) {
      clone.searchParams.set(key, "[REDACTED]");
    }
  }
  return `${clone.pathname}${clone.search}`;
}

function extractHeadersRecord(headers: Headers): Record<string, string> {
  const record: Record<string, string> = {};
  headers.forEach((value, key) => {
    if (!/^(?:authorization|cookie|set-cookie)$/i.test(key)) {
      record[key.toLowerCase()] = value;
    }
  });
  return record;
}

function parseRetryAfterSeconds(headers: Headers): number | undefined {
  const raw = headers.get("retry-after");
  if (!raw) {
    return undefined;
  }
  const num = Number.parseInt(raw, 10);
  return Number.isFinite(num) && num >= 0 ? num : undefined;
}

export class SageTransport {
  private readonly config: ResolvedSageOneConfig;
  private readonly authenticator: SageAuthenticator;
  private readonly logger: SageLogger;

  public constructor(options: {
    readonly config: ResolvedSageOneConfig;
    readonly authenticator: SageAuthenticator;
    readonly logger?: SageLogger | undefined;
  }) {
    this.config = options.config;
    this.authenticator = options.authenticator;
    this.logger = options.logger ?? NOOP_LOGGER;
  }

  public async execute<TReq = unknown, TRes = unknown>(
    request: TransportRequest<TReq, TRes>,
  ): Promise<TRes> {
    const correlationId = randomUUID();
    const requiresAuth = request.requiresAuthentication ?? true;

    let validatedBody: unknown = request.body;
    if (
      request.body !== undefined &&
      request.requestSchema !== undefined &&
      this.config.validation.validateRequests
    ) {
      validatedBody = validateRequestPayload(request.requestSchema, request.body, {
        resource: request.resource,
        operation: request.operation,
        requestId: correlationId,
        logger: this.logger,
      });
    }

    const normalizedPath = request.path.startsWith("/") ? request.path : `/${request.path}`;
    const rawUrl = new URL(`${this.config.baseUrl}${normalizedPath}`);
    if (request.query) {
      for (const [k, v] of Object.entries(request.query)) {
        if (v !== undefined) {
          rawUrl.searchParams.set(k, String(v));
        }
      }
    }

    const baseHeaders: Record<string, string> = {
      Accept: request.responseType === "binary" ? "application/octet-stream" : "application/json",
      "X-Correlation-Id": correlationId,
      ...this.config.headers,
      ...(request.headers ?? {}),
    };

    if (validatedBody !== undefined && !request.formData) {
      baseHeaders["Content-Type"] = "application/json";
    }

    const authed = await this.authenticator.apply({
      url: rawUrl,
      headers: baseHeaders,
      requiresAuthentication: requiresAuth,
      companyId: request.companyId,
    });

    const canRetry = isRetryAllowed(request, this.config);
    const maxAttempts = canRetry ? this.config.retry.maxAttempts : 1;
    const timeoutMs = request.timeout ?? this.config.timeout;
    const logPath = sanitizePathForLog(authed.url);

    let attempt = 0;
    while (attempt < maxAttempts) {
      attempt += 1;
      const startTime = Date.now();

      this.logger.debug("request.start", {
        correlationId,
        method: request.method,
        path: logPath,
        attempt,
      });

      const timeoutController = new AbortController();
      const timer = setTimeout(() => {
        timeoutController.abort(new Error(`Request timed out after ${String(timeoutMs)}ms`));
      }, timeoutMs);

      const composedSignal = request.signal
        ? AbortSignal.any([request.signal, timeoutController.signal])
        : timeoutController.signal;

      try {
        if (request.signal?.aborted) {
          throw new SageTimeoutError(
            `Request ${request.resource}.${request.operation} was aborted by caller`,
            {
              isAborted: true,
              resource: request.resource,
              operation: request.operation,
              requestId: correlationId,
              cause: request.signal.reason,
            },
          );
        }

        const init: RequestInit = {
          method: request.method,
          headers: authed.headers,
          signal: composedSignal,
        };
        if (request.formData) {
          init.body = request.formData;
        } else if (validatedBody !== undefined) {
          init.body = JSON.stringify(validatedBody);
        }

        const response = await this.config.fetch(authed.url.toString(), init);
        const durationMs = Date.now() - startTime;

        this.logger.debug("request.end", {
          correlationId,
          status: response.status,
          durationMs,
        });

        if (!response.ok) {
          const mappedError = await this.mapHttpError(response, request, correlationId);
          if (canRetry && attempt < maxAttempts && TRANSIENT_HTTP_STATUSES.has(response.status)) {
            this.logger.warn("request.retry", {
              correlationId,
              attempt,
              reason: `HTTP ${String(response.status)}`,
            });
            await this.sleepBackoff(attempt);
            continue;
          }
          throw mappedError;
        }

        return await this.parseSuccessResponse(response, request, correlationId);
      } catch (err: unknown) {
        if (err instanceof SageError) {
          throw err;
        }

        if (request.signal?.aborted) {
          this.logger.warn("request.abort", {
            correlationId,
            reason: "caller_abort",
          });
          throw new SageTimeoutError(
            `Request ${request.resource}.${request.operation} was aborted`,
            {
              isAborted: true,
              resource: request.resource,
              operation: request.operation,
              requestId: correlationId,
              cause: err,
            },
          );
        }

        if (timeoutController.signal.aborted) {
          this.logger.warn("request.abort", {
            correlationId,
            reason: "timeout",
          });
          const timeoutErr = new SageTimeoutError(
            `Request ${request.resource}.${request.operation} timed out after ${String(timeoutMs)}ms`,
            {
              timeoutMs,
              isAborted: false,
              resource: request.resource,
              operation: request.operation,
              requestId: correlationId,
              cause: err,
            },
          );
          if (canRetry && attempt < maxAttempts) {
            this.logger.warn("request.retry", {
              correlationId,
              attempt,
              reason: "timeout",
            });
            await this.sleepBackoff(attempt);
            continue;
          }
          throw timeoutErr;
        }

        if (canRetry && attempt < maxAttempts) {
          this.logger.warn("request.retry", {
            correlationId,
            attempt,
            reason: "network_error",
          });
          await this.sleepBackoff(attempt);
          continue;
        }

        throw new SageNetworkError(
          `Network failure during ${request.resource}.${request.operation}: ${err instanceof Error ? err.message : String(err)}`,
          {
            resource: request.resource,
            operation: request.operation,
            requestId: correlationId,
            retryable: canRetry,
            cause: err,
          },
        );
      } finally {
        clearTimeout(timer);
      }
    }

    throw new SageNetworkError(
      `Exhausted ${String(maxAttempts)} attempts for ${request.resource}.${request.operation}`,
      {
        resource: request.resource,
        operation: request.operation,
        requestId: correlationId,
      },
    );
  }

  private async sleepBackoff(attempt: number): Promise<void> {
    const base = this.config.retry.baseDelayMs;
    if (base <= 0) {
      return;
    }
    const delay = base * 2 ** (attempt - 1);
    await new Promise<void>((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  private async parseSuccessResponse<TReq, TRes>(
    response: Response,
    request: TransportRequest<TReq, TRes>,
    correlationId: string,
  ): Promise<TRes> {
    const responseType = request.responseType ?? "json";

    if (responseType === "binary") {
      const buffer = await response.arrayBuffer();
      return buffer as unknown as TRes;
    }

    if (responseType === "empty" || response.status === 204) {
      return undefined as unknown as TRes;
    }

    const rawText = await response.text();
    if (rawText.trim().length === 0) {
      if (request.responseSchema === undefined) {
        return undefined as unknown as TRes;
      }
    }

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(rawText);
    } catch (cause: unknown) {
      throw new SageResponseError(
        `Failed to parse JSON response from ${request.resource}.${request.operation} (HTTP ${String(response.status)})`,
        {
          status: response.status,
          rawBody: rawText,
          resource: request.resource,
          operation: request.operation,
          requestId: correlationId,
          cause,
        },
      );
    }

    if (request.responseSchema && this.config.validation.validateResponses) {
      return validateResponsePayload(request.responseSchema, parsedJson, {
        resource: request.resource,
        operation: request.operation,
        requestId: correlationId,
        status: response.status,
        logger: this.logger,
      });
    }

    return parsedJson as TRes;
  }

  private async mapHttpError<TReq, TRes>(
    response: Response,
    request: TransportRequest<TReq, TRes>,
    correlationId: string,
  ): Promise<SageError> {
    const headersRecord = extractHeadersRecord(response.headers);
    const rawText = await response.text();
    let parsedBody: unknown = rawText;
    if (rawText.trim().length > 0) {
      try {
        parsedBody = JSON.parse(rawText);
      } catch {
        parsedBody = rawText;
      }
    }

    const baseMessage = `Sage API HTTP ${String(response.status)} on ${request.method} ${request.path}`;

    switch (response.status) {
      case 401:
        return new SageAuthenticationError(baseMessage, {
          status: 401,
          resource: request.resource,
          operation: request.operation,
          requestId: correlationId,
          details: parsedBody,
        });
      case 402:
      case 403:
        return new SageAuthorizationError(baseMessage, {
          status: response.status,
          resource: request.resource,
          operation: request.operation,
          requestId: correlationId,
          details: parsedBody,
        });
      case 404:
        return new SageNotFoundError(baseMessage, {
          responseBody: parsedBody,
          responseHeaders: headersRecord,
          resource: request.resource,
          operation: request.operation,
          requestId: correlationId,
        });
      case 409:
        return new SageConflictError(baseMessage, {
          responseBody: parsedBody,
          responseHeaders: headersRecord,
          resource: request.resource,
          operation: request.operation,
          requestId: correlationId,
        });
      case 429:
        return new SageRateLimitError(baseMessage, {
          responseBody: parsedBody,
          responseHeaders: headersRecord,
          retryAfterSeconds: parseRetryAfterSeconds(response.headers),
          resource: request.resource,
          operation: request.operation,
          requestId: correlationId,
        });
      default:
        return new SageApiError(baseMessage, {
          status: response.status,
          responseBody: parsedBody,
          responseHeaders: headersRecord,
          resource: request.resource,
          operation: request.operation,
          requestId: correlationId,
        });
    }
  }
}

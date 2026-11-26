/**
 * HTTP Transport layer (spec §10, ADR-006, ADR-017).
 *
 * Owns:
 * - Request URL and header construction
 * - Authentication injection via `SageAuthenticator`
 * - JSON, multipart FormData, and binary (`ArrayBuffer`) response handling
 * - Timeouts & `AbortSignal` composition
 * - Request correlation IDs
 * - Central scheduling of every request through `RequestScheduler`
 *   (concurrency, per-company lanes, pacing, suspension — WP008.2)
 * - Conservative retry policy (never retries financial mutations; honours
 *   `Retry-After` delta-seconds and HTTP-date; full-jitter exponential
 *   backoff bounded by `scheduler.maxBackoffMs`)
 * - Deterministic mapping into the `SageError` hierarchy
 * - Structured logging events (`request.start`, `request.end`, `request.retry`,
 *   `request.abort`, `scheduler.rate_limit`)
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
import {
  computeBackoffDelayMs,
  parseRetryAfterMs,
  RequestScheduler,
  type SchedulerSnapshot,
} from "./scheduler.js";

export {
  computeBackoffDelayMs,
  parseRetryAfterMs,
  RequestScheduler,
  type SchedulerAcquireOptions,
  type SchedulerLaneSnapshot,
  type SchedulerPermit,
  type SchedulerSnapshot,
} from "./scheduler.js";

export type HttpMethod = "GET" | "HEAD" | "POST" | "PUT" | "DELETE";

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

// Generic transient statuses. HTTP 429 is deliberately NOT in this set:
// a rate-limit response has its own suspension policy (below) and must never
// fall through to ordinary exponential-backoff retry (WP008.2R §4.4).
const TRANSIENT_HTTP_STATUSES = new Set([502, 503, 504]);

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
  // Safe methods retry transient failures; unsafe methods (PUT/DELETE/POST)
  // require an explicit `allowRetry: true` — the operation-aware policy of
  // WP008.2 §5.2.5 (POST never retries ambiguous outcomes implicitly).
  if (request.method !== "GET" && request.method !== "HEAD" && request.allowRetry !== true) {
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
  const ms = parseRetryAfterMs(headers.get("retry-after"));
  return ms === null ? undefined : Math.ceil(ms / 1000);
}

/** Sleep that rejects when `signal` aborts (WP008.2 §5.2.6 — abortable waits). */
function abortableSleep(ms: number, signal: AbortSignal | undefined): Promise<void> {
  if (signal?.aborted) {
    return Promise.reject(new Error("Aborted"));
  }
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    function onAbort(): void {
      clearTimeout(timer);
      reject(new Error("Aborted"));
    }
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

export class SageTransport {
  private readonly config: ResolvedSageOneConfig;
  private readonly authenticator: SageAuthenticator;
  private readonly logger: SageLogger;
  private readonly scheduler: RequestScheduler;

  public constructor(options: {
    readonly config: ResolvedSageOneConfig;
    readonly authenticator: SageAuthenticator;
    readonly logger?: SageLogger | undefined;
  }) {
    this.config = options.config;
    this.authenticator = options.authenticator;
    this.logger = options.logger ?? NOOP_LOGGER;
    this.scheduler = new RequestScheduler({
      maxConcurrency: options.config.scheduler.maxConcurrency,
      minIntervalMs: options.config.scheduler.minIntervalMs,
      logger: this.logger,
    });
  }

  /** Observable scheduler queue state (WP008.2 §5.2.3). */
  public schedulerSnapshot(): SchedulerSnapshot {
    return this.scheduler.snapshot();
  }

  /** Graceful scheduler shutdown: stop admitting, drain queued and in flight (WP008.2 §5.2.3). */
  public shutdown(): Promise<void> {
    return this.scheduler.shutdown();
  }

  public async execute<TReq = unknown, TRes = unknown>(
    request: TransportRequest<TReq, TRes>,
  ): Promise<TRes> {
    const correlationId = randomUUID();
    const requiresAuth = request.requiresAuthentication ?? true;
    // Company lane for scheduling isolation (WP008.2 §5.2.3): a suspension
    // for one company must not stop unrelated companies.
    const lane = String(request.companyId ?? this.config.companyId ?? "default");

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

      this.logger.debug("request.start", {
        correlationId,
        method: request.method,
        path: logPath,
        attempt,
      });

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

      // Every request passes through the central scheduler (WP008.2 §5.2.2):
      // it waits for a concurrency slot, lane pacing and any lane suspension
      // (e.g. a previous 429 for this company). Queue wait does not consume
      // the request timeout — the timer starts only once dispatched.
      const permit = await this.scheduler.acquire({
        lane,
        signal: request.signal,
        correlationId,
        method: request.method,
        resource: request.resource,
        operation: request.operation,
      });

      const startTime = Date.now();
      const timeoutController = new AbortController();
      const timer = setTimeout(() => {
        timeoutController.abort(new Error(`Request timed out after ${String(timeoutMs)}ms`));
      }, timeoutMs);

      const composedSignal = request.signal
        ? AbortSignal.any([request.signal, timeoutController.signal])
        : timeoutController.signal;

      try {
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
          const transient = TRANSIENT_HTTP_STATUSES.has(response.status);

          if (response.status === 429) {
            // Rate limit — handled distinctly from generic 5xx (WP008.2R §4.3/§4.4).
            // Sage documents: 100 req/min per company, ≤1 req/s advised, one-hour
            // block, "do not continue to make requests"; no Retry-After behaviour
            // is published (developer-api page, accessed 2026-11-25).
            const retryAfterMs = parseRetryAfterMs(response.headers.get("retry-after"));
            // Login/Validate 429 is the documented failed-login throttle
            // (20/hour → 24 h username block) — an independent condition that
            // must not suspend the resource-request lane (WP008.2R §4.5).
            const isAuthThrottle = request.resource === "Login" && request.operation === "Validate";

            if (isAuthThrottle) {
              this.logger.warn("scheduler.rate_limit", {
                correlationId,
                scope: "authentication",
                attempt,
                action: "surface_error_no_lane_suspension",
              });
              throw mappedError;
            }

            const suspensionMs =
              retryAfterMs !== null && retryAfterMs <= this.config.scheduler.maxRetryAfterMs
                ? retryAfterMs
                : retryAfterMs !== null
                  ? retryAfterMs // full server delay — never shorten a valid Retry-After
                  : this.config.scheduler.rateLimitFallbackMs; // missing/invalid: documented block policy
            this.scheduler.suspend(lane, suspensionMs);
            this.logger.warn("scheduler.rate_limit", {
              correlationId,
              lane,
              retryAfterMs,
              suspensionMs,
              attempt,
            });

            // Auto-retry only after a valid, within-budget Retry-After has
            // fully elapsed (the next acquire waits out the suspension, so no
            // request can be dispatched during the block). Missing/invalid
            // Retry-After never retries: surface SageRateLimitError instead
            // of probing the service (WP008.2R §4.3).
            if (
              retryAfterMs !== null &&
              retryAfterMs <= this.config.scheduler.maxRetryAfterMs &&
              canRetry &&
              attempt < maxAttempts
            ) {
              permit.release();
              continue;
            }
            throw mappedError;
          }

          if (canRetry && attempt < maxAttempts && transient) {
            this.logger.warn("request.retry", {
              correlationId,
              attempt,
              reason: `HTTP ${String(response.status)}`,
            });
            permit.release();
            clearTimeout(timer); // backoff must not consume the attempt's timeout timer
            await this.sleepBackoff(attempt, request, correlationId);
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
            permit.release();
            clearTimeout(timer);
            await this.sleepBackoff(attempt, request, correlationId);
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
          permit.release();
          clearTimeout(timer);
          await this.sleepBackoff(attempt, request, correlationId);
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
        permit.release();
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

  /**
   * Bounded, jittered, abortable backoff wait (WP008.2R §5.2).
   *
   * A caller abort during the delay rejects with the documented
   * `SageTimeoutError { isAborted: true }` — never a generic `Error` — and
   * terminates the retry sequence before any further dispatch.
   */
  private async sleepBackoff(
    attempt: number,
    request: TransportRequest<unknown, unknown>,
    correlationId: string,
  ): Promise<void> {
    const delay = computeBackoffDelayMs(
      attempt,
      this.config.retry.baseDelayMs,
      this.config.scheduler.maxBackoffMs,
      this.config.scheduler.jitter,
    );
    if (delay <= 0) {
      return;
    }
    try {
      await abortableSleep(delay, request.signal);
    } catch (err: unknown) {
      if (request.signal?.aborted) {
        this.logger.warn("request.abort", {
          correlationId,
          reason: "caller_abort_during_backoff",
        });
        throw new SageTimeoutError(
          `Request ${request.resource}.${request.operation} was aborted during retry backoff`,
          {
            isAborted: true,
            resource: request.resource,
            operation: request.operation,
            requestId: correlationId,
            cause: request.signal.reason,
          },
        );
      }
      throw err;
    }
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
      case 429: {
        // Failed-login throttle (20/hour → 24 h username block) surfaces as an
        // authentication error so consumers can distinguish it from an ordinary
        // resource rate limit (WP008.2R §4.5).
        if (request.resource === "Login" && request.operation === "Validate") {
          return new SageAuthenticationError(
            `${baseMessage} (login attempt limit reached — Sage blocks the username for 24 hours after 20 failed logins/hour)`,
            {
              status: 429,
              details: parsedBody,
              resource: request.resource,
              operation: request.operation,
              requestId: correlationId,
            },
          );
        }
        return new SageRateLimitError(baseMessage, {
          responseBody: parsedBody,
          responseHeaders: headersRecord,
          retryAfterSeconds: parseRetryAfterSeconds(response.headers),
          resource: request.resource,
          operation: request.operation,
          requestId: correlationId,
        });
      }
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

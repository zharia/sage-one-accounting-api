/**
 * Authentication layer for Sage One Accounting API 2.0.0 (spec §9, ADR-007).
 *
 * Verified mechanism from Sage Developer Program & Help documentation:
 * - HTTP Basic authentication (`Authorization: Basic base64(username:password)`)
 * - `apikey` query parameter issued by Sage One Developer Program
 * - `CompanyId` (or `companyid`) query parameter for company-scoped requests
 * - `POST /Login/Validate` verifies user credentials returning a boolean
 */

import type { SageCredentials } from "../config/index.js";
import { SageAuthenticationError } from "../errors/index.js";
import { NOOP_LOGGER, type SageLogger } from "../logging/index.js";

export interface AuthenticationContext {
  readonly baseUrl: string;
  readonly apiKey?: string | undefined;
  readonly companyId?: number | undefined;
  readonly fetch?: typeof fetch | undefined;
  readonly signal?: AbortSignal | undefined;
}

export interface AuthenticationResult {
  readonly authenticated: boolean;
  readonly verifiedAt: string;
}

export interface AuthenticableRequest {
  readonly url: URL;
  readonly headers: Record<string, string>;
  readonly requiresAuthentication: boolean;
  readonly companyId?: number | undefined;
}

export interface SageAuthenticator {
  authenticate(context: AuthenticationContext): Promise<AuthenticationResult>;
  apply(request: AuthenticableRequest): Promise<AuthenticableRequest>;
}

export interface BasicAndApiKeyAuthenticatorOptions {
  readonly credentials?: SageCredentials | undefined;
  readonly apiKey?: string | undefined;
  readonly companyId?: number | undefined;
  readonly logger?: SageLogger | undefined;
}

export class BasicAndApiKeyAuthenticator implements SageAuthenticator {
  private readonly credentials: SageCredentials | undefined;
  private readonly apiKey: string | undefined;
  private readonly defaultCompanyId: number | undefined;
  private readonly logger: SageLogger;
  private inFlightAuth: Promise<AuthenticationResult> | null = null;

  public constructor(options: BasicAndApiKeyAuthenticatorOptions) {
    this.credentials = options.credentials;
    this.apiKey = options.apiKey;
    this.defaultCompanyId = options.companyId;
    this.logger = options.logger ?? NOOP_LOGGER;
  }

  /**
   * Verifies credentials against `POST /Login/Validate` with single-flight concurrency safety.
   */
  public async authenticate(context: AuthenticationContext): Promise<AuthenticationResult> {
    if (this.inFlightAuth) {
      return this.inFlightAuth;
    }

    this.inFlightAuth = this.performValidation(context).finally(() => {
      this.inFlightAuth = null;
    });

    return this.inFlightAuth;
  }

  private async performValidation(context: AuthenticationContext): Promise<AuthenticationResult> {
    if (!this.credentials) {
      this.logger.warn("auth.failure", { reason: "missing_credentials" });
      throw new SageAuthenticationError(
        "Cannot authenticate: credentials (username and password) were not provided.",
        { resource: "Login", operation: "Validate" },
      );
    }

    this.logger.debug("auth.authenticate", { operation: "Login/Validate" });
    const baseUrl = context.baseUrl.endsWith("/") ? context.baseUrl.slice(0, -1) : context.baseUrl;
    const url = new URL(`${baseUrl}/Login/Validate`);
    const effectiveApiKey = context.apiKey ?? this.apiKey;
    if (effectiveApiKey) {
      url.searchParams.set("apikey", effectiveApiKey);
    }

    const fetchImpl = context.fetch ?? globalThis.fetch;
    const requestInit: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Username: this.credentials.username,
        Password: this.credentials.password,
      }),
    };
    if (context.signal) {
      requestInit.signal = context.signal;
    }

    const response = await fetchImpl(url.toString(), requestInit);
    if (!response.ok) {
      this.logger.warn("auth.failure", {
        reason: "http_error",
        status: response.status,
      });
      throw new SageAuthenticationError(
        `Authentication validation failed with HTTP ${String(response.status)}`,
        {
          status: response.status,
          resource: "Login",
          operation: "Validate",
        },
      );
    }

    const valid = (await response.json()) as unknown;
    if (valid !== true) {
      this.logger.warn("auth.failure", { reason: "invalid_credentials" });
      throw new SageAuthenticationError("Sage One rejected the provided credentials.", {
        status: 401,
        resource: "Login",
        operation: "Validate",
      });
    }

    return {
      authenticated: true,
      verifiedAt: new Date().toISOString(),
    };
  }

  public async apply(request: AuthenticableRequest): Promise<AuthenticableRequest> {
    const url = new URL(request.url.toString());
    const headers: Record<string, string> = { ...request.headers };

    if (this.apiKey && !url.searchParams.has("apikey") && !url.searchParams.has("APIKey")) {
      url.searchParams.set("apikey", this.apiKey);
    }

    const effectiveCompanyId = request.companyId ?? this.defaultCompanyId;
    if (
      effectiveCompanyId !== undefined &&
      !url.searchParams.has("CompanyId") &&
      !url.searchParams.has("companyid") &&
      !url.searchParams.has("companyId")
    ) {
      url.searchParams.set("CompanyId", String(effectiveCompanyId));
    }

    if (request.requiresAuthentication) {
      if (!this.credentials) {
        this.logger.warn("auth.failure", { reason: "missing_credentials" });
        throw new SageAuthenticationError(
          "Endpoint requires authentication, but no credentials or custom authenticator were configured.",
        );
      }
      const token = Buffer.from(
        `${this.credentials.username}:${this.credentials.password}`,
        "utf8",
      ).toString("base64");
      headers["Authorization"] = `Basic ${token}`;
    }

    return {
      ...request,
      url,
      headers,
    };
  }
}

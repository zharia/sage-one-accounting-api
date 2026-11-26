/**
 * Client configuration schema, defaults, and precedence rules (spec §14, ADR-005).
 *
 * No implicit environment access (`process.env` is never read here).
 */

import { z } from "zod";

import { SageConfigurationError } from "../errors/index.js";

export const DEFAULT_BASE_URL = "https://accounting.sageone.co.za/api/2.0.0" as const;
export const DEFAULT_TIMEOUT_MS = 30_000 as const;
export const DEFAULT_RETRY_MAX_ATTEMPTS = 3 as const;
export const DEFAULT_RETRY_BASE_DELAY_MS = 250 as const;
export const DEFAULT_SCHEDULER_MAX_CONCURRENCY = 4 as const;
/**
 * Per-company dispatch pacing default.
 *
 * Reflects Sage South Africa's published guidance "advisable to make no more
 * than one request per second" (https://www.sage.com/en-za/sage-business-cloud/accounting/developer-api/,
 * accessed 2026-11-25). This is a conservative SDK default, not a hard Sage
 * protocol guarantee — see ADR-017.
 */
export const DEFAULT_SCHEDULER_MIN_INTERVAL_MS = 1_000 as const;
export const DEFAULT_SCHEDULER_MAX_RETRY_AFTER_MS = 60_000 as const;
export const DEFAULT_SCHEDULER_MAX_BACKOFF_MS = 30_000 as const;
/**
 * Lane suspension applied when a 429 arrives with a missing or invalid
 * `Retry-After`. Sage publishes no `Retry-After` behaviour but documents a
 * one-hour block during which "you must not continue to make requests"
 * (same source, accessed 2026-11-25) — the fallback mirrors that documented
 * block. Configurable; setting it to 0 disables fallback suspension.
 */
export const DEFAULT_SCHEDULER_RATE_LIMIT_FALLBACK_MS = 3_600_000 as const;

export interface SageCredentials {
  readonly username: string;
  readonly password: string;
}

export interface SageRetryConfig {
  readonly enabled: boolean;
  readonly maxAttempts: number;
  readonly baseDelayMs: number;
}

/**
 * Central request scheduler settings (M008 WP008.2).
 *
 * Defaults encode SDK-side safety only — no undocumented Sage limit is
 * assumed. The documented per-company limit (100 req/min, see
 * `docs/api/authentication.md`) can be expressed via `minIntervalMs: 600`.
 */
export interface SageSchedulerConfig {
  /** Maximum in-flight requests across all company lanes. */
  readonly maxConcurrency: number;
  /**
   * Minimum spacing between dispatched requests within one company lane
   * (0 = disabled). Default 1 000 ms — Sage's published ≤1 req/s guidance;
   * client-side safeguard only, not a Sage guarantee (ADR-017).
   */
  readonly minIntervalMs: number;
  /**
   * Maximum delay the scheduler will wait for a `Retry-After` value before
   * giving up and preserving the original rate-limit error. Never shortens a
   * server-provided delay: the lane suspension always uses the full value.
   */
  readonly maxRetryAfterMs: number;
  /** Lane suspension for a 429 with missing/invalid `Retry-After` (documented 1 h block; 0 disables). */
  readonly rateLimitFallbackMs: number;
  /** Upper bound for a single exponential-backoff delay (before jitter). */
  readonly maxBackoffMs: number;
  /** Apply full jitter (`delay = random() * cappedExponential`) to backoff. */
  readonly jitter: boolean;
}

export interface SageLoggingConfig {
  readonly enabled: boolean;
  readonly level: "debug" | "info" | "warn" | "error" | "silent";
}

export interface SageValidationConfig {
  readonly validateRequests: boolean;
  readonly validateResponses: boolean;
}

export interface SageOneConfigInput {
  readonly baseUrl?: string | undefined;
  readonly apiKey?: string | undefined;
  readonly companyId?: number | undefined;
  readonly credentials?: SageCredentials | undefined;
  readonly timeout?: number | undefined;
  readonly retry?:
    | {
        readonly enabled?: boolean | undefined;
        readonly maxAttempts?: number | undefined;
        readonly baseDelayMs?: number | undefined;
      }
    | undefined;
  readonly scheduler?:
    | {
        readonly maxConcurrency?: number | undefined;
        readonly minIntervalMs?: number | undefined;
        readonly maxRetryAfterMs?: number | undefined;
        readonly rateLimitFallbackMs?: number | undefined;
        readonly maxBackoffMs?: number | undefined;
        readonly jitter?: boolean | undefined;
      }
    | undefined;
  readonly logging?:
    | {
        readonly enabled?: boolean | undefined;
        readonly level?: "debug" | "info" | "warn" | "error" | "silent" | undefined;
      }
    | undefined;
  readonly validation?:
    | {
        readonly validateRequests?: boolean | undefined;
        readonly validateResponses?: boolean | undefined;
      }
    | undefined;
  readonly headers?: Readonly<Record<string, string>> | undefined;
  readonly transport?:
    | {
        readonly fetch?: typeof fetch | undefined;
      }
    | undefined;
}

export interface ResolvedSageOneConfig {
  readonly baseUrl: string;
  readonly apiKey: string | undefined;
  readonly companyId: number | undefined;
  readonly credentials: SageCredentials | undefined;
  readonly timeout: number;
  readonly retry: SageRetryConfig;
  readonly scheduler: SageSchedulerConfig;
  readonly logging: SageLoggingConfig;
  readonly validation: SageValidationConfig;
  readonly headers: Readonly<Record<string, string>>;
  readonly fetch: typeof fetch;
}

const ConfigInputSchema = z
  .object({
    baseUrl: z.string().url("baseUrl must be a valid URL").optional(),
    apiKey: z.string().min(1, "apiKey must not be empty").optional(),
    companyId: z.number().int().positive("companyId must be a positive integer").optional(),
    credentials: z
      .object({
        username: z.string().min(1, "credentials.username must not be empty"),
        password: z.string().min(1, "credentials.password must not be empty"),
      })
      .strict()
      .optional(),
    timeout: z.number().int().positive("timeout must be a positive integer in ms").optional(),
    retry: z
      .object({
        enabled: z.boolean().optional(),
        maxAttempts: z
          .number()
          .int()
          .min(1, "retry.maxAttempts must be >= 1")
          .max(10, "retry.maxAttempts must be <= 10")
          .optional(),
        baseDelayMs: z.number().int().min(0, "retry.baseDelayMs must be >= 0").optional(),
      })
      .strict()
      .optional(),
    scheduler: z
      .object({
        maxConcurrency: z
          .number()
          .int()
          .min(1, "scheduler.maxConcurrency must be >= 1")
          .max(1024, "scheduler.maxConcurrency must be <= 1024")
          .optional(),
        minIntervalMs: z.number().int().min(0, "scheduler.minIntervalMs must be >= 0").optional(),
        maxRetryAfterMs: z
          .number()
          .int()
          .min(0, "scheduler.maxRetryAfterMs must be >= 0")
          .optional(),
        rateLimitFallbackMs: z
          .number()
          .int()
          .min(0, "scheduler.rateLimitFallbackMs must be >= 0")
          .max(86_400_000, "scheduler.rateLimitFallbackMs must be <= 24h")
          .optional(),
        maxBackoffMs: z.number().int().min(0, "scheduler.maxBackoffMs must be >= 0").optional(),
        jitter: z.boolean().optional(),
      })
      .strict()
      .optional(),
    logging: z
      .object({
        enabled: z.boolean().optional(),
        level: z.enum(["debug", "info", "warn", "error", "silent"]).optional(),
      })
      .strict()
      .optional(),
    validation: z
      .object({
        validateRequests: z.boolean().optional(),
        validateResponses: z.boolean().optional(),
      })
      .strict()
      .optional(),
    headers: z.record(z.string(), z.string()).optional(),
    transport: z
      .object({
        fetch: z
          .custom<typeof fetch>((val) => typeof val === "function", {
            message: "transport.fetch must be a function",
          })
          .optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

export function resolveConfig(input: SageOneConfigInput = {}): ResolvedSageOneConfig {
  const parsed = ConfigInputSchema.safeParse(input);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const fieldPath = firstIssue ? firstIssue.path.join(".") : "config";
    const issueMessage = firstIssue ? firstIssue.message : "Invalid configuration";
    throw new SageConfigurationError(
      `Invalid SageOneClient configuration at "${fieldPath}": ${issueMessage}`,
      {
        fieldPath,
        details: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
    );
  }

  const data = parsed.data;
  const rawBaseUrl = data.baseUrl ?? DEFAULT_BASE_URL;
  const baseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

  const loggingEnabled = data.logging?.enabled ?? false;
  const loggingLevel = data.logging?.level ?? (loggingEnabled ? "warn" : "silent");

  return {
    baseUrl,
    apiKey: data.apiKey,
    companyId: data.companyId,
    credentials: data.credentials,
    timeout: data.timeout ?? DEFAULT_TIMEOUT_MS,
    retry: {
      enabled: data.retry?.enabled ?? true,
      maxAttempts: data.retry?.maxAttempts ?? DEFAULT_RETRY_MAX_ATTEMPTS,
      baseDelayMs: data.retry?.baseDelayMs ?? DEFAULT_RETRY_BASE_DELAY_MS,
    },
    scheduler: {
      maxConcurrency: data.scheduler?.maxConcurrency ?? DEFAULT_SCHEDULER_MAX_CONCURRENCY,
      minIntervalMs: data.scheduler?.minIntervalMs ?? DEFAULT_SCHEDULER_MIN_INTERVAL_MS,
      maxRetryAfterMs: data.scheduler?.maxRetryAfterMs ?? DEFAULT_SCHEDULER_MAX_RETRY_AFTER_MS,
      rateLimitFallbackMs:
        data.scheduler?.rateLimitFallbackMs ?? DEFAULT_SCHEDULER_RATE_LIMIT_FALLBACK_MS,
      maxBackoffMs: data.scheduler?.maxBackoffMs ?? DEFAULT_SCHEDULER_MAX_BACKOFF_MS,
      jitter: data.scheduler?.jitter ?? true,
    },
    logging: {
      enabled: loggingEnabled,
      level: loggingLevel,
    },
    validation: {
      validateRequests: data.validation?.validateRequests ?? true,
      validateResponses: data.validation?.validateResponses ?? true,
    },
    headers: data.headers ?? {},
    fetch: data.transport?.fetch ?? globalThis.fetch,
  };
}

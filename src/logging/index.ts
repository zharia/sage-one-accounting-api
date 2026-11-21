/**
 * Structured logging interface, secret redaction, and Pino adapter (spec §13, ADR-008).
 */

import pino from "pino";

export type LogLevel = "debug" | "info" | "warn" | "error" | "silent";

export interface SageLogger {
  debug(message: string, context?: Record<string, unknown>): void;
  info(message: string, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  error(message: string, context?: Record<string, unknown>): void;
}

const SENSITIVE_KEY_REGEX =
  /^(?:password|pass|secret|token|accesstoken|refreshtoken|apikey|api_key|authorization|cookie|set-cookie|credentials)$/i;

const VALUE_SECRET_PATTERNS = [
  /(Basic\s+)[A-Za-z0-9+/=]+/gi,
  /(Bearer\s+)[^\s"',]+/gi,
  /([?&](?:apikey|api_key|password|token)=)[^&\s"',]+/gi,
];

function redactStringValue(value: string): string {
  let clean = value;
  for (const pattern of VALUE_SECRET_PATTERNS) {
    clean = clean.replace(pattern, "$1[REDACTED]");
  }
  return clean;
}

/**
 * Deeply clones and redacts sensitive keys and credential patterns from log context objects
 * before they reach any logger implementation (custom or Pino).
 */
export function redactLogContext(
  context: Record<string, unknown> | undefined,
): Record<string, unknown> | undefined {
  if (!context) {
    return undefined;
  }

  function sanitizeValue(val: unknown, depth: number): unknown {
    if (depth > 8 || val === null || val === undefined) {
      return val;
    }
    if (typeof val === "string") {
      return redactStringValue(val);
    }
    if (typeof val !== "object") {
      return val;
    }
    if (Array.isArray(val)) {
      return val.map((item) => sanitizeValue(item, depth + 1));
    }
    const result: Record<string, unknown> = {};
    for (const [key, entryVal] of Object.entries(val as Record<string, unknown>)) {
      if (SENSITIVE_KEY_REGEX.test(key)) {
        result[key] = "[REDACTED]";
      } else {
        result[key] = sanitizeValue(entryVal, depth + 1);
      }
    }
    return result;
  }

  return sanitizeValue(context, 0) as Record<string, unknown>;
}

const LEVEL_WEIGHT: Readonly<Record<LogLevel, number>> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  silent: 100,
};

export class RedactingLogger implements SageLogger {
  private readonly delegate: SageLogger;
  private readonly minWeight: number;

  public constructor(delegate: SageLogger, level: LogLevel = "warn") {
    this.delegate = delegate;
    this.minWeight = LEVEL_WEIGHT[level];
  }

  public debug(message: string, context?: Record<string, unknown>): void {
    if (this.minWeight <= LEVEL_WEIGHT.debug) {
      this.delegate.debug(redactStringValue(message), redactLogContext(context));
    }
  }

  public info(message: string, context?: Record<string, unknown>): void {
    if (this.minWeight <= LEVEL_WEIGHT.info) {
      this.delegate.info(redactStringValue(message), redactLogContext(context));
    }
  }

  public warn(message: string, context?: Record<string, unknown>): void {
    if (this.minWeight <= LEVEL_WEIGHT.warn) {
      this.delegate.warn(redactStringValue(message), redactLogContext(context));
    }
  }

  public error(message: string, context?: Record<string, unknown>): void {
    if (this.minWeight <= LEVEL_WEIGHT.error) {
      this.delegate.error(redactStringValue(message), redactLogContext(context));
    }
  }
}

export const NOOP_LOGGER: SageLogger = {
  debug(): void {},
  info(): void {},
  warn(): void {},
  error(): void {},
};

export function createPinoLogger(level: LogLevel = "warn"): SageLogger {
  if (level === "silent") {
    return NOOP_LOGGER;
  }
  const instance = pino({
    name: "@bytemoney/sage-one",
    level,
  });

  const adapter: SageLogger = {
    debug(message, context) {
      if (context) {
        instance.debug(context, message);
      } else {
        instance.debug(message);
      }
    },
    info(message, context) {
      if (context) {
        instance.info(context, message);
      } else {
        instance.info(message);
      }
    },
    warn(message, context) {
      if (context) {
        instance.warn(context, message);
      } else {
        instance.warn(message);
      }
    },
    error(message, context) {
      if (context) {
        instance.error(context, message);
      } else {
        instance.error(message);
      }
    },
  };

  return new RedactingLogger(adapter, level);
}


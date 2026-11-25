/**
 * Error hierarchy for `@bytemoney/sage-one` (spec §15, ADR-009).
 */

export type SageErrorCode =
  | "SAGE_CONFIGURATION_ERROR"
  | "SAGE_AUTHENTICATION_ERROR"
  | "SAGE_AUTHORIZATION_ERROR"
  | "SAGE_VALIDATION_ERROR"
  | "SAGE_API_ERROR"
  | "SAGE_NETWORK_ERROR"
  | "SAGE_TIMEOUT_ERROR"
  | "SAGE_RATE_LIMIT_ERROR"
  | "SAGE_SCHEDULER_SHUTDOWN"
  | "SAGE_NOT_FOUND_ERROR"
  | "SAGE_CONFLICT_ERROR"
  | "SAGE_RESPONSE_ERROR";

export interface SageErrorOptions {
  readonly code: SageErrorCode;
  readonly message: string;
  readonly status?: number | undefined;
  readonly resource?: string | undefined;
  readonly operation?: string | undefined;
  readonly requestId?: string | undefined;
  readonly retryable?: boolean | undefined;
  readonly details?: unknown;
  readonly cause?: unknown;
}

const SECRET_PATTERNS = [
  /(Authorization\s*:\s*Basic\s+)[A-Za-z0-9+/=]+/gi,
  /(Authorization\s*:\s*Bearer\s+)[^\s"',]+/gi,
  /([?&](?:apikey|api_key|password|token)=)[^&\s"',]+/gi,
  /("(?:password|apiKey|apikey|token|secret)"\s*:\s*)"[^"]*"/gi,
];

/**
 * Sanitizes strings so credentials, Basic auth headers, and API keys never leak into error messages.
 */
export function sanitizeErrorMessage(message: string): string {
  let clean = message;
  for (const pattern of SECRET_PATTERNS) {
    clean = clean.replace(pattern, "$1[REDACTED]");
  }
  return clean;
}

export class SageError extends Error {
  public readonly code: SageErrorCode;
  public readonly status: number | undefined;
  public readonly resource: string | undefined;
  public readonly operation: string | undefined;
  public readonly requestId: string | undefined;
  public readonly retryable: boolean;
  public readonly details: unknown;

  public constructor(options: SageErrorOptions) {
    super(
      sanitizeErrorMessage(options.message),
      options.cause ? { cause: options.cause } : undefined,
    );
    this.name = new.target.name;
    this.code = options.code;
    this.status = options.status;
    this.resource = options.resource;
    this.operation = options.operation;
    this.requestId = options.requestId;
    this.retryable = options.retryable ?? false;
    this.details = options.details;
  }
}

export class SageConfigurationError extends SageError {
  public readonly fieldPath: string | undefined;

  public constructor(
    message: string,
    options?: {
      readonly fieldPath?: string | undefined;
      readonly details?: unknown;
      readonly cause?: unknown;
    },
  ) {
    super({
      code: "SAGE_CONFIGURATION_ERROR",
      message,
      retryable: false,
      details: options?.details,
      cause: options?.cause,
    });
    this.fieldPath = options?.fieldPath;
  }
}

export class SageAuthenticationError extends SageError {
  public constructor(
    message: string,
    options?: {
      readonly status?: number | undefined;
      readonly resource?: string | undefined;
      readonly operation?: string | undefined;
      readonly requestId?: string | undefined;
      readonly details?: unknown;
      readonly cause?: unknown;
    },
  ) {
    super({
      code: "SAGE_AUTHENTICATION_ERROR",
      message,
      status: options?.status ?? 401,
      resource: options?.resource,
      operation: options?.operation,
      requestId: options?.requestId,
      retryable: false,
      details: options?.details,
      cause: options?.cause,
    });
  }
}

export class SageAuthorizationError extends SageError {
  public constructor(
    message: string,
    options?: {
      readonly status?: number | undefined;
      readonly resource?: string | undefined;
      readonly operation?: string | undefined;
      readonly requestId?: string | undefined;
      readonly details?: unknown;
      readonly cause?: unknown;
    },
  ) {
    super({
      code: "SAGE_AUTHORIZATION_ERROR",
      message,
      status: options?.status ?? 403,
      resource: options?.resource,
      operation: options?.operation,
      requestId: options?.requestId,
      retryable: false,
      details: options?.details,
      cause: options?.cause,
    });
  }
}

export interface ValidationIssueDetail {
  readonly path: string;
  readonly expected: string;
  readonly message: string;
  readonly received?: unknown;
}

export class SageValidationError extends SageError {
  public readonly issues: readonly ValidationIssueDetail[];

  public constructor(
    message: string,
    options: {
      readonly resource: string;
      readonly operation: string;
      readonly issues: readonly ValidationIssueDetail[];
      readonly requestId?: string | undefined;
      readonly cause?: unknown;
    },
  ) {
    super({
      code: "SAGE_VALIDATION_ERROR",
      message,
      resource: options.resource,
      operation: options.operation,
      requestId: options.requestId,
      retryable: false,
      details: options.issues,
      cause: options.cause,
    });
    this.issues = options.issues;
  }
}

export class SageApiError extends SageError {
  public readonly responseBody: unknown;
  public readonly responseHeaders: Readonly<Record<string, string>>;

  public constructor(
    message: string,
    options: {
      readonly code?: SageErrorCode | undefined;
      readonly status: number;
      readonly responseBody: unknown;
      readonly responseHeaders?: Readonly<Record<string, string>> | undefined;
      readonly resource?: string | undefined;
      readonly operation?: string | undefined;
      readonly requestId?: string | undefined;
      readonly retryable?: boolean | undefined;
      readonly cause?: unknown;
    },
  ) {
    super({
      code: options.code ?? "SAGE_API_ERROR",
      message,
      status: options.status,
      resource: options.resource,
      operation: options.operation,
      requestId: options.requestId,
      retryable: options.retryable ?? (options.status >= 500 || options.status === 429),
      details: options.responseBody,
      cause: options.cause,
    });
    this.responseBody = options.responseBody;
    this.responseHeaders = options.responseHeaders ?? {};
  }
}

export class SageNotFoundError extends SageApiError {
  public constructor(
    message: string,
    options: {
      readonly responseBody: unknown;
      readonly responseHeaders?: Readonly<Record<string, string>> | undefined;
      readonly resource?: string | undefined;
      readonly operation?: string | undefined;
      readonly requestId?: string | undefined;
      readonly cause?: unknown;
    },
  ) {
    super(message, {
      ...options,
      code: "SAGE_NOT_FOUND_ERROR",
      status: 404,
      retryable: false,
    });
  }
}

export class SageConflictError extends SageApiError {
  public constructor(
    message: string,
    options: {
      readonly responseBody: unknown;
      readonly responseHeaders?: Readonly<Record<string, string>> | undefined;
      readonly resource?: string | undefined;
      readonly operation?: string | undefined;
      readonly requestId?: string | undefined;
      readonly cause?: unknown;
    },
  ) {
    super(message, {
      ...options,
      code: "SAGE_CONFLICT_ERROR",
      status: 409,
      retryable: false,
    });
  }
}

export class SageRateLimitError extends SageApiError {
  public readonly retryAfterSeconds: number | undefined;

  public constructor(
    message: string,
    options: {
      readonly responseBody: unknown;
      readonly responseHeaders?: Readonly<Record<string, string>> | undefined;
      readonly retryAfterSeconds?: number | undefined;
      readonly resource?: string | undefined;
      readonly operation?: string | undefined;
      readonly requestId?: string | undefined;
      readonly cause?: unknown;
    },
  ) {
    super(message, {
      ...options,
      code: "SAGE_RATE_LIMIT_ERROR",
      status: 429,
      retryable: true,
    });
    this.retryAfterSeconds = options.retryAfterSeconds;
  }
}

export class SageNetworkError extends SageError {
  public constructor(
    message: string,
    options?: {
      readonly resource?: string | undefined;
      readonly operation?: string | undefined;
      readonly requestId?: string | undefined;
      readonly retryable?: boolean | undefined;
      readonly cause?: unknown;
    },
  ) {
    super({
      code: "SAGE_NETWORK_ERROR",
      message,
      resource: options?.resource,
      operation: options?.operation,
      requestId: options?.requestId,
      retryable: options?.retryable ?? true,
      cause: options?.cause,
    });
  }
}

export class SageTimeoutError extends SageError {
  public readonly timeoutMs: number | undefined;
  public readonly isAborted: boolean;

  public constructor(
    message: string,
    options?: {
      readonly timeoutMs?: number | undefined;
      readonly isAborted?: boolean | undefined;
      readonly resource?: string | undefined;
      readonly operation?: string | undefined;
      readonly requestId?: string | undefined;
      readonly cause?: unknown;
    },
  ) {
    super({
      code: "SAGE_TIMEOUT_ERROR",
      message,
      resource: options?.resource,
      operation: options?.operation,
      requestId: options?.requestId,
      retryable: !(options?.isAborted ?? false),
      cause: options?.cause,
    });
    this.timeoutMs = options?.timeoutMs;
    this.isAborted = options?.isAborted ?? false;
  }
}

export class SageResponseError extends SageError {
  public override readonly status: number;
  public readonly rawBody: unknown;

  public constructor(
    message: string,
    options: {
      readonly status: number;
      readonly rawBody: unknown;
      readonly resource?: string | undefined;
      readonly operation?: string | undefined;
      readonly requestId?: string | undefined;
      readonly details?: unknown;
      readonly cause?: unknown;
    },
  ) {
    super({
      code: "SAGE_RESPONSE_ERROR",
      message,
      status: options.status,
      resource: options.resource,
      operation: options.operation,
      requestId: options.requestId,
      retryable: false,
      details: options.details ?? options.rawBody,
      cause: options.cause,
    });
    this.status = options.status;
    this.rawBody = options.rawBody;
  }
}

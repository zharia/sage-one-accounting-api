/**
 * Runtime validation framework using Zod (spec §8, ADR-005).
 */

import { z, type ZodType } from "zod";

import {
  SageResponseError,
  SageValidationError,
  type ValidationIssueDetail,
} from "../errors/index.js";
import { NOOP_LOGGER, type SageLogger } from "../logging/index.js";

const SENSITIVE_FIELD_REGEX = /password|secret|token|apikey|api_key|authorization/i;

function formatZodIssues(error: z.ZodError, input: unknown): ValidationIssueDetail[] {
  return error.issues.map((issue) => {
    const path = issue.path.map(String).join(".") || "(root)";
    const isSensitive = SENSITIVE_FIELD_REGEX.test(path);
    let receivedValue: unknown;
    if (!isSensitive && input !== null && typeof input === "object") {
      let cursor: unknown = input;
      for (const segment of issue.path) {
        if (cursor !== null && typeof cursor === "object" && segment in cursor) {
          cursor = (cursor as Record<PropertyKey, unknown>)[segment];
        } else {
          cursor = undefined;
          break;
        }
      }
      receivedValue = cursor;
    }
    return {
      path,
      expected: issue.code,
      message: issue.message,
      ...(isSensitive ? {} : { received: receivedValue }),
    };
  });
}

export interface ValidationContext {
  readonly resource: string;
  readonly operation: string;
  readonly requestId?: string | undefined;
  readonly logger?: SageLogger | undefined;
}

/**
 * Validates structured request payloads before serialization.
 * Throws `SageValidationError` (SDK-side) on schema mismatch.
 */
export function validateRequestPayload<T>(
  schema: ZodType<T>,
  payload: unknown,
  context: ValidationContext,
): T {
  const result = schema.safeParse(payload);
  if (result.success) {
    return result.data;
  }

  const logger = context.logger ?? NOOP_LOGGER;
  const issues = formatZodIssues(result.error, payload);
  logger.warn("validation.failure", {
    resource: context.resource,
    operation: context.operation,
    fieldPath: issues[0]?.path ?? "(root)",
  });

  throw new SageValidationError(
    `Request validation failed for ${context.resource}.${context.operation} at "${issues[0]?.path ?? "(root)"}": ${issues[0]?.message ?? "Invalid payload"}`,
    {
      resource: context.resource,
      operation: context.operation,
      issues,
      requestId: context.requestId,
      cause: result.error,
    },
  );
}

/**
 * Validates received API responses against a Zod schema.
 * Throws `SageResponseError` when a 2xx response mismatches the contract schema.
 */
export function validateResponsePayload<T>(
  schema: ZodType<T>,
  payload: unknown,
  context: ValidationContext & { readonly status: number },
): T {
  const result = schema.safeParse(payload);
  if (result.success) {
    return result.data;
  }

  const logger = context.logger ?? NOOP_LOGGER;
  const issues = formatZodIssues(result.error, payload);
  logger.warn("response.schema_mismatch", {
    resource: context.resource,
    operation: context.operation,
    expected: issues[0]?.expected,
    fieldPath: issues[0]?.path,
  });

  throw new SageResponseError(
    `Response schema mismatch for ${context.resource}.${context.operation} at "${issues[0]?.path ?? "(root)"}": ${issues[0]?.message ?? "Invalid response structure"}`,
    {
      status: context.status,
      rawBody: payload,
      resource: context.resource,
      operation: context.operation,
      requestId: context.requestId,
      details: issues,
      cause: result.error,
    },
  );
}

/**
 * Creates a forward-compatible enum schema that accepts known values or preserves
 * unknown future values injected by Sage without catastrophic parsing failures (spec §7.3).
 */
export function createForwardCompatibleEnumSchema<
  T extends string | number,
  TBase extends "string" | "number",
>(
  _knownValues: readonly T[],
  baseType: TBase,
): ZodType<T | (TBase extends "number" ? number : string)> {
  if (baseType === "number") {
    return z.number().int() as unknown as ZodType<T | (TBase extends "number" ? number : string)>;
  }
  return z.string() as unknown as ZodType<T | (TBase extends "number" ? number : string)>;
}

/**
 * Creates a Zod schema for the standard Sage paging envelope (`TotalResults`, `ReturnedResults`, `Results`),
 * preserving any extra fields via `.passthrough()`.
 */
export function createSagePageSchema<TItem>(itemSchema: ZodType<TItem>) {
  return z
    .object({
      TotalResults: z.number().int(),
      ReturnedResults: z.number().int(),
      Results: z.array(itemSchema),
    })
    .passthrough();
}

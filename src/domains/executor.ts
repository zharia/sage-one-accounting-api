/**
 * Request executor abstraction provided to domain services (spec §5.1, `docs/architecture/module-boundaries.md`).
 *
 * Domain services depend on this interface rather than importing `src/transport` or `fetch` directly.
 */

import type { ZodType } from "zod";

import { ODataQueryBuilder, type ODataQueryParams, type RequestOptions } from "../types/index.js";

export interface DomainOperationSpec<TReq = unknown, TRes = unknown> {
  readonly resource: string;
  readonly operation: string;
  readonly method: "GET" | "POST" | "PUT" | "DELETE";
  readonly path: string;
  readonly query?: Readonly<Record<string, string | number | boolean | undefined>> | undefined;
  readonly body?: TReq | undefined;
  readonly formData?: FormData | undefined;
  readonly requestSchema?: ZodType<TReq> | undefined;
  readonly responseSchema?: ZodType<TRes> | undefined;
  readonly responseType?: "json" | "binary" | "empty" | undefined;
  readonly requiresAuthentication?: boolean | undefined;
  readonly isFinancialMutation?: boolean | undefined;
  readonly options?: RequestOptions | undefined;
}

export interface SageRequestExecutor {
  request<TReq = unknown, TRes = unknown>(spec: DomainOperationSpec<TReq, TRes>): Promise<TRes>;
}

/**
 * Merges operation-specific query parameters with optional OData query parameters
 * from `RequestOptions.odata`.
 */
export function buildQueryWithOData(
  baseQuery: Readonly<Record<string, string | number | boolean | undefined>> | undefined,
  odataInput: ODataQueryParams | ODataQueryBuilder<unknown> | undefined,
): Record<string, string | number | boolean | undefined> | undefined {
  const odataParams: ODataQueryParams | undefined =
    odataInput instanceof ODataQueryBuilder ? odataInput.toParams() : odataInput;

  if (!baseQuery && !odataParams) {
    return undefined;
  }

  const merged: Record<string, string | number | boolean | undefined> = {
    ...(baseQuery ?? {}),
  };

  if (odataParams) {
    if (odataParams.$filter !== undefined) merged["$filter"] = odataParams.$filter;
    if (odataParams.$select !== undefined) merged["$select"] = odataParams.$select;
    if (odataParams.$orderby !== undefined) merged["$orderby"] = odataParams.$orderby;
    if (odataParams.$top !== undefined) merged["$top"] = odataParams.$top;
    if (odataParams.$skip !== undefined) merged["$skip"] = odataParams.$skip;
    if (odataParams.$expand !== undefined) merged["$expand"] = odataParams.$expand;
    if (odataParams.$count !== undefined) merged["$count"] = odataParams.$count;
  }

  return merged;
}

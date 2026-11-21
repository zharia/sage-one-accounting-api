/**
 * Typed OData query builder, pagination envelope, async iterators, and shared domain enumerations
 * (spec §7.3, §11.1, §11.2, ADR-010, ADR-011).
 */

export interface SagePage<T> {
  readonly TotalResults: number;
  readonly ReturnedResults: number;
  readonly Results: readonly T[];
}

export type ODataComparisonOperator = "eq" | "ne" | "gt" | "ge" | "lt" | "le";
export type ODataOrderDirection = "asc" | "desc";

export interface ODataQueryParams {
  readonly $filter?: string | undefined;
  readonly $select?: string | undefined;
  readonly $orderby?: string | undefined;
  readonly $top?: number | undefined;
  readonly $skip?: number | undefined;
  readonly $expand?: string | undefined;
  readonly $count?: boolean | undefined;
}

export interface RequestOptions {
  readonly companyId?: number | undefined;
  readonly timeout?: number | undefined;
  readonly signal?: AbortSignal | undefined;
  readonly headers?: Readonly<Record<string, string>> | undefined;
  readonly odata?: ODataQueryParams | ODataQueryBuilder<unknown> | undefined;
}

function formatODataValue(value: string | number | boolean | null): string {
  if (value === null) {
    return "null";
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new RangeError(`Invalid OData number literal: ${String(value)}`);
    }
    return String(value);
  }
  const escaped = value.replace(/'/g, "''");
  return `'${escaped}'`;
}

export class ODataQueryBuilder<TModel> {
  private readonly filters: string[] = [];
  private readonly selects: string[] = [];
  private readonly orderBys: string[] = [];
  private readonly expands: string[] = [];
  private topValue: number | undefined;
  private skipValue: number | undefined;
  private countValue: boolean | undefined;

  public filter<K extends Extract<keyof TModel, string>>(
    field: K,
    operator: ODataComparisonOperator,
    value: string | number | boolean | null,
  ): this {
    this.filters.push(`${field} ${operator} ${formatODataValue(value)}`);
    return this;
  }

  public rawFilter(expression: string): this {
    const trimmed = expression.trim();
    if (trimmed.length > 0) {
      this.filters.push(trimmed);
    }
    return this;
  }

  public select<K extends Extract<keyof TModel, string>>(...fields: readonly K[]): this {
    for (const f of fields) {
      if (!this.selects.includes(f)) {
        this.selects.push(f);
      }
    }
    return this;
  }

  public orderBy<K extends Extract<keyof TModel, string>>(
    field: K,
    direction: ODataOrderDirection = "asc",
  ): this {
    this.orderBys.push(`${field} ${direction}`);
    return this;
  }

  public rawOrderBy(expression: string): this {
    const trimmed = expression.trim();
    if (trimmed.length > 0) {
      this.orderBys.push(trimmed);
    }
    return this;
  }

  public expand(...relations: readonly string[]): this {
    for (const r of relations) {
      const trimmed = r.trim();
      if (trimmed.length > 0 && !this.expands.includes(trimmed)) {
        this.expands.push(trimmed);
      }
    }
    return this;
  }

  public top(count: number): this {
    if (!Number.isInteger(count) || count < 0) {
      throw new RangeError(`OData $top must be a non-negative integer, received ${String(count)}`);
    }
    this.topValue = count;
    return this;
  }

  public skip(count: number): this {
    if (!Number.isInteger(count) || count < 0) {
      throw new RangeError(`OData $skip must be a non-negative integer, received ${String(count)}`);
    }
    this.skipValue = count;
    return this;
  }

  public count(enabled = true): this {
    this.countValue = enabled;
    return this;
  }

  public toParams(): ODataQueryParams {
    return {
      ...(this.filters.length > 0 ? { $filter: this.filters.join(" and ") } : {}),
      ...(this.selects.length > 0 ? { $select: this.selects.join(",") } : {}),
      ...(this.orderBys.length > 0 ? { $orderby: this.orderBys.join(",") } : {}),
      ...(this.topValue !== undefined ? { $top: this.topValue } : {}),
      ...(this.skipValue !== undefined ? { $skip: this.skipValue } : {}),
      ...(this.expands.length > 0 ? { $expand: this.expands.join(",") } : {}),
      ...(this.countValue !== undefined ? { $count: this.countValue } : {}),
    };
  }

  public build(): string {
    return serializeODataQueryParams(this.toParams());
  }
}

export function odata<TModel = Record<string, unknown>>(): ODataQueryBuilder<TModel> {
  return new ODataQueryBuilder<TModel>();
}

export function serializeODataQueryParams(params: ODataQueryParams): string {
  const searchParams = new URLSearchParams();
  if (params.$filter !== undefined && params.$filter.length > 0) {
    searchParams.set("$filter", params.$filter);
  }
  if (params.$select !== undefined && params.$select.length > 0) {
    searchParams.set("$select", params.$select);
  }
  if (params.$orderby !== undefined && params.$orderby.length > 0) {
    searchParams.set("$orderby", params.$orderby);
  }
  if (params.$top !== undefined) {
    searchParams.set("$top", String(params.$top));
  }
  if (params.$skip !== undefined) {
    searchParams.set("$skip", String(params.$skip));
  }
  if (params.$expand !== undefined && params.$expand.length > 0) {
    searchParams.set("$expand", params.$expand);
  }
  if (params.$count !== undefined) {
    searchParams.set("$count", params.$count ? "true" : "false");
  }
  return searchParams.toString();
}

export const DEFAULT_PAGE_SIZE = 100 as const;
export const DEFAULT_MAX_PAGES = 100 as const;

export interface PaginationOptions {
  readonly pageSize?: number | undefined;
  readonly initialSkip?: number | undefined;
  readonly maxPages?: number | undefined;
  readonly maxItems?: number | undefined;
  readonly signal?: AbortSignal | undefined;
}

export interface PageIterationEnvelope<T> {
  readonly page: SagePage<T>;
  readonly pageNumber: number;
  readonly skip: number;
  readonly top: number;
}

export type PageFetcher<T> = (pagination: {
  readonly skip: number;
  readonly top: number;
  readonly signal?: AbortSignal | undefined;
}) => Promise<SagePage<T>>;

/**
 * Async iterator over pages of a Sage collection endpoint with infinite-pagination protection
 * (`maxPages`, `maxItems`, `AbortSignal`, empty page / TotalResults boundary).
 */
export async function* paginatePages<T>(
  fetchPage: PageFetcher<T>,
  options: PaginationOptions = {},
): AsyncGenerator<PageIterationEnvelope<T>, void, undefined> {
  const top = options.pageSize ?? DEFAULT_PAGE_SIZE;
  if (!Number.isInteger(top) || top <= 0) {
    throw new RangeError(`pageSize must be a positive integer, received ${String(top)}`);
  }
  const maxPages = options.maxPages ?? DEFAULT_MAX_PAGES;
  if (!Number.isInteger(maxPages) || maxPages <= 0) {
    throw new RangeError(`maxPages must be a positive integer, received ${String(maxPages)}`);
  }
  if (
    options.maxItems !== undefined &&
    (!Number.isInteger(options.maxItems) || options.maxItems <= 0)
  ) {
    throw new RangeError(
      `maxItems must be a positive integer, received ${String(options.maxItems)}`,
    );
  }

  let skip = options.initialSkip ?? 0;
  let pageNumber = 0;
  let itemsYielded = 0;

  while (pageNumber < maxPages) {
    if (options.signal?.aborted) {
      throw options.signal.reason ?? new Error("Pagination aborted");
    }

    const page = await fetchPage({
      skip,
      top,
      signal: options.signal,
    });
    pageNumber += 1;

    yield {
      page,
      pageNumber,
      skip,
      top,
    };

    const count = page.Results.length;
    itemsYielded += count;
    skip += count;

    if (count === 0) {
      break;
    }
    if (skip >= page.TotalResults) {
      break;
    }
    if (options.maxItems !== undefined && itemsYielded >= options.maxItems) {
      break;
    }
  }
}

/**
 * Async iterator over individual items of a Sage collection endpoint.
 */
export async function* paginateItems<T>(
  fetchPage: PageFetcher<T>,
  options: PaginationOptions = {},
): AsyncGenerator<T, void, undefined> {
  let yielded = 0;
  const maxItems = options.maxItems;

  for await (const { page } of paginatePages(fetchPage, options)) {
    for (const item of page.Results) {
      if (maxItems !== undefined && yielded >= maxItems) {
        return;
      }
      yield item;
      yielded += 1;
    }
  }
}

/**
 * Documented Sage enumerations with forward-compatible union types (spec §7.3).
 */
export const COMMUNICATION_METHOD_VALUES = [-1, 0, 1, 2, 3] as const;
export type KnownCommunicationMethod = (typeof COMMUNICATION_METHOD_VALUES)[number];
export type CommunicationMethod = KnownCommunicationMethod | (number & {});

export const ITEM_REPORTING_GROUP_TYPE_VALUES = [1, 2, 3, 4] as const;
export type KnownItemReportingGroupType = (typeof ITEM_REPORTING_GROUP_TYPE_VALUES)[number];
export type ItemReportingGroupType = KnownItemReportingGroupType | (number & {});

export const ROUNDING_TYPE_VALUES = [0, 1, 2, 3] as const;
export type KnownRoundingType = (typeof ROUNDING_TYPE_VALUES)[number];
export type RoundingTypeValue = KnownRoundingType | (number & {});

export const TAX_SYSTEM_VALUES = [0, 1, 2] as const;
export type KnownTaxSystem = (typeof TAX_SYSTEM_VALUES)[number];
export type TaxSystemValue = KnownTaxSystem | (number & {});

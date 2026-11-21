/**
 * Taxation domain services and wire schemas:
 * - TaxType (`POST /TaxType/Save`, `GET /TaxType/Get`, `GET /TaxType/Get/{id}`, `DELETE /TaxType/Delete/{id}`)
 */

import { z } from "zod";

import {
  paginateItems,
  paginatePages,
  type PageIterationEnvelope,
  type PaginationOptions,
  type RequestOptions,
  type SagePage,
} from "../../types/index.js";
import { createSagePageSchema } from "../../validation/index.js";
import { buildQueryWithOData, type SageRequestExecutor } from "../executor.js";

export const TaxTypeSchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string().optional(),
    Percentage: z.number().optional(),
    IsDefault: z.boolean().optional(),
    HasActivity: z.boolean().optional(),
    IsManualTax: z.boolean().optional(),
    Active: z.boolean().optional(),
    Created: z.string().optional(),
    Modified: z.string().nullable().optional(),
    TaxTypeDefaultUID: z.string().nullable().optional(),
    CompanyId: z.number().int().optional(),
  })
  .passthrough();

export type TaxType = z.infer<typeof TaxTypeSchema>;

export const TaxTypeSaveRequestSchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string(),
    Percentage: z.number().optional(),
    IsDefault: z.boolean().optional(),
    HasActivity: z.boolean().optional(),
    IsManualTax: z.boolean().optional(),
    Active: z.boolean().optional(),
    Created: z.string().optional(),
    Modified: z.string().nullable().optional(),
    TaxTypeDefaultUID: z.string().nullable().optional(),
    CompanyId: z.number().int().optional(),
  })
  .strict();

export type TaxTypeSaveRequest = z.infer<typeof TaxTypeSaveRequestSchema>;

export const TaxTypePageSchema = createSagePageSchema(TaxTypeSchema);

export class TaxTypesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /TaxType/Get` — Gets a list of Tax Types. Supports OData and paging. */
  public async list(options?: RequestOptions): Promise<SagePage<TaxType>> {
    return this.executor.request({
      resource: "TaxType",
      operation: "Get",
      method: "GET",
      path: "/TaxType/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: TaxTypePageSchema,
      options,
    });
  }

  /** Async page iterator for `GET /TaxType/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<TaxType>, void, undefined> {
    return paginatePages(
      ({ skip, top, signal }) =>
        this.list({
          ...options,
          signal: signal ?? options?.signal,
          odata: {
            ...(options?.odata instanceof Object && "toParams" in options.odata
              ? options.odata.toParams()
              : options?.odata),
            $skip: skip,
            $top: top,
          },
        }),
      options,
    );
  }

  /** Async item iterator for `GET /TaxType/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<TaxType, void, undefined> {
    return paginateItems(
      ({ skip, top, signal }) =>
        this.list({
          ...options,
          signal: signal ?? options?.signal,
          odata: {
            ...(options?.odata instanceof Object && "toParams" in options.odata
              ? options.odata.toParams()
              : options?.odata),
            $skip: skip,
            $top: top,
          },
        }),
      options,
    );
  }

  /** `GET /TaxType/Get/{id}` — Gets a specific Tax Type based on the identifier sent through. */
  public async get(id: number, options?: RequestOptions): Promise<TaxType> {
    return this.executor.request({
      resource: "TaxType",
      operation: "GetById",
      method: "GET",
      path: `/TaxType/Get/${encodeURIComponent(String(id))}`,
      responseSchema: TaxTypeSchema,
      options,
    });
  }

  /** `POST /TaxType/Save` — Saves the specified Tax Type based on the object sent through. */
  public async save(input: TaxTypeSaveRequest, options?: RequestOptions): Promise<TaxType> {
    return this.executor.request({
      resource: "TaxType",
      operation: "Save",
      method: "POST",
      path: "/TaxType/Save",
      body: input,
      requestSchema: TaxTypeSaveRequestSchema,
      responseSchema: TaxTypeSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /TaxType/Delete/{id}` — Deletes a specific Tax Type based on the identifier sent through. */
  public async delete(id: number, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "TaxType",
      operation: "Delete",
      method: "DELETE",
      path: `/TaxType/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export * from "./m006.js";

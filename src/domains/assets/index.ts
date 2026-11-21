/**
 * AUTO-GENERATED from contracts/sage-api/endpoint-catalogue.json (M006).
 * Generator: scripts/generate/generate-domains.ts
 * Do not edit manually without updating the contract catalogue.
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

export const AssetSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Category: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    Location: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    DatePurchased: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    SerialNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    BoughtFrom: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PurchasePrice: z.union([z.number(), z.string()]).nullable().optional(),
    CurrentValue: z.union([z.number(), z.string()]).nullable().optional(),
    ReplacementValue: z.union([z.number(), z.string()]).nullable().optional(),
    TextField1: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    TextField2: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    TextField3: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    NumericField1: z.union([z.number(), z.string()]).nullable().optional(),
    NumericField2: z.union([z.number(), z.string()]).nullable().optional(),
    NumericField3: z.union([z.number(), z.string()]).nullable().optional(),
    YesNoField1: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    YesNoField2: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    YesNoField3: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    DateField1: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DateField2: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DateField3: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
  })
  .passthrough();
export type Asset = z.infer<typeof AssetSchema>;

export const AssetCategorySchema = z
  .object({
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Modified: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Created: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
  })
  .passthrough();
export type AssetCategory = z.infer<typeof AssetCategorySchema>;

export const AssetLocationSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
  })
  .passthrough();
export type AssetLocation = z.infer<typeof AssetLocationSchema>;

export const AssetNoteSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Subject: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    EntryDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ActionDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Status: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Note: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    HasAttachments: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    AssetId: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type AssetNote = z.infer<typeof AssetNoteSchema>;

export class AssetService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /Asset/Save` [POST-Asset-Save] — Saves a specified Asset. */
  public async save(
    input: z.infer<typeof AssetSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AssetSchema>> {
    return this.executor.request({
      resource: "Asset",
      operation: "Save",
      method: "POST",
      path: "/Asset/Save",
      body: input,
      requestSchema: AssetSchema,
      responseSchema: AssetSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /Asset/Get` [GET-Asset-Get] — Retrieves a collection of Assets. */
  public async list(options?: RequestOptions): Promise<SagePage<z.infer<typeof AssetSchema>>> {
    return this.executor.request({
      resource: "Asset",
      operation: "Get",
      method: "GET",
      path: "/Asset/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(AssetSchema),
      options,
    });
  }

  /** Async page iterator for `GET /Asset/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof AssetSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /Asset/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof AssetSchema>, void, undefined> {
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

  /** `GET /Asset/Get/{id}` [GET-Asset-Get-id] — Retrieves a specific Asset. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AssetSchema>> {
    return this.executor.request({
      resource: "Asset",
      operation: "GetById",
      method: "GET",
      path: `/Asset/Get/${encodeURIComponent(String(id))}`,
      responseSchema: AssetSchema,
      options,
    });
  }

  /** `DELETE /Asset/Delete/{id}` [DELETE-Asset-Delete-id] — Deletes a specified Asset. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "Asset",
      operation: "Delete",
      method: "DELETE",
      path: `/Asset/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class AssetCategoryService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /AssetCategory/Save` [POST-AssetCategory-Save] — Saves the specified Asset Category. */
  public async save(
    input: z.infer<typeof AssetCategorySchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AssetCategorySchema>> {
    return this.executor.request({
      resource: "AssetCategory",
      operation: "Save",
      method: "POST",
      path: "/AssetCategory/Save",
      body: input,
      requestSchema: AssetCategorySchema,
      responseSchema: AssetCategorySchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /AssetCategory/Get` [GET-AssetCategory-Get] — Gets a list of Asset Categories. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof AssetCategorySchema>>> {
    return this.executor.request({
      resource: "AssetCategory",
      operation: "Get",
      method: "GET",
      path: "/AssetCategory/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(AssetCategorySchema),
      options,
    });
  }

  /** Async page iterator for `GET /AssetCategory/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof AssetCategorySchema>>, void, undefined> {
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

  /** Async item iterator for `GET /AssetCategory/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof AssetCategorySchema>, void, undefined> {
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

  /** `GET /AssetCategory/Get/{id}` [GET-AssetCategory-Get-id] — Gets the specified Asset Category based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AssetCategorySchema>> {
    return this.executor.request({
      resource: "AssetCategory",
      operation: "GetById",
      method: "GET",
      path: `/AssetCategory/Get/${encodeURIComponent(String(id))}`,
      responseSchema: AssetCategorySchema,
      options,
    });
  }

  /** `DELETE /AssetCategory/Delete/{id}` [DELETE-AssetCategory-Delete-id] — Deletes the specified Asset Category. Only succeeds if the Asset Category is not in use. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "AssetCategory",
      operation: "Delete",
      method: "DELETE",
      path: `/AssetCategory/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class AssetLocationService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /AssetLocation/Save` [POST-AssetLocation-Save] — Saves the specified Asset Location. */
  public async save(
    input: z.infer<typeof AssetLocationSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AssetLocationSchema>> {
    return this.executor.request({
      resource: "AssetLocation",
      operation: "Save",
      method: "POST",
      path: "/AssetLocation/Save",
      body: input,
      requestSchema: AssetLocationSchema,
      responseSchema: AssetLocationSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /AssetLocation/Get` [GET-AssetLocation-Get] — Gets a list of Asset Locations. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof AssetLocationSchema>>> {
    return this.executor.request({
      resource: "AssetLocation",
      operation: "Get",
      method: "GET",
      path: "/AssetLocation/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(AssetLocationSchema),
      options,
    });
  }

  /** Async page iterator for `GET /AssetLocation/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof AssetLocationSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /AssetLocation/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof AssetLocationSchema>, void, undefined> {
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

  /** `GET /AssetLocation/Get/{id}` [GET-AssetLocation-Get-id] — Gets the specified Asset Location based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AssetLocationSchema>> {
    return this.executor.request({
      resource: "AssetLocation",
      operation: "GetById",
      method: "GET",
      path: `/AssetLocation/Get/${encodeURIComponent(String(id))}`,
      responseSchema: AssetLocationSchema,
      options,
    });
  }

  /** `DELETE /AssetLocation/Delete/{id}` [DELETE-AssetLocation-Delete-id] — Deletes the specified Asset Location. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "AssetLocation",
      operation: "Delete",
      method: "DELETE",
      path: `/AssetLocation/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class AssetNoteService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /AssetNote/Save` [POST-AssetNote-Save] — Saves the specified Asset Note. */
  public async save(
    input: z.infer<typeof AssetNoteSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AssetNoteSchema>> {
    return this.executor.request({
      resource: "AssetNote",
      operation: "Save",
      method: "POST",
      path: "/AssetNote/Save",
      body: input,
      requestSchema: AssetNoteSchema,
      responseSchema: AssetNoteSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /AssetNote/Get` [GET-AssetNote-Get] — Gets a list of Asset Notes. */
  public async list(options?: RequestOptions): Promise<SagePage<z.infer<typeof AssetNoteSchema>>> {
    return this.executor.request({
      resource: "AssetNote",
      operation: "Get",
      method: "GET",
      path: "/AssetNote/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(AssetNoteSchema),
      options,
    });
  }

  /** Async page iterator for `GET /AssetNote/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof AssetNoteSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /AssetNote/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof AssetNoteSchema>, void, undefined> {
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

  /** `GET /AssetNote/Get/{id}` [GET-AssetNote-Get-id] — Gets the specified Asset Note based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AssetNoteSchema>> {
    return this.executor.request({
      resource: "AssetNote",
      operation: "GetById",
      method: "GET",
      path: `/AssetNote/Get/${encodeURIComponent(String(id))}`,
      responseSchema: AssetNoteSchema,
      options,
    });
  }

  /** `DELETE /AssetNote/Delete/{id}` [DELETE-AssetNote-Delete-id] — Deletes the specified Asset Note. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "AssetNote",
      operation: "Delete",
      method: "DELETE",
      path: `/AssetNote/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

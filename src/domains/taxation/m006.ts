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

export const BASReportSchema = z
  .object({
    G1: z.number().int().optional(),
    G2: z.number().int().optional(),
    G3: z.number().int().optional(),
    G4: z.number().int().optional(),
    G5: z.number().int().optional(),
    G6: z.number().int().optional(),
    G7: z.number().int().optional(),
    G8: z.number().int().optional(),
    G9: z.number().int().optional(),
    G10: z.number().int().optional(),
    G11: z.number().int().optional(),
    G12: z.number().int().optional(),
    G13: z.number().int().optional(),
    G14: z.number().int().optional(),
    G15: z.number().int().optional(),
    G16: z.number().int().optional(),
    G17: z.number().int().optional(),
    G18: z.number().int().optional(),
    G19: z.number().int().optional(),
    G20: z.number().int().optional(),
    Code1A: z.number().int().optional(),
    Code1B: z.number().int().optional(),
    Code2A: z.number().int().optional(),
    Code2B: z.number().int().optional(),
    Code3: z.number().int().optional(),
    W1: z.number().int().optional(),
    W2: z.number().int().optional(),
    W3: z.number().optional(),
    W4: z.number().int().optional(),
    TaxReportingType: z.number().int().optional(),
  })
  .passthrough();
export type BASReport = z.infer<typeof BASReportSchema>;

export const BASReportRequestModelSchema = z
  .object({
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    TaxPeriodId: z.number().int().nullable().optional(),
  })
  .passthrough();
export type BASReportRequestModel = z.infer<typeof BASReportRequestModelSchema>;

export const ClosingTaxPeriodRequestModelSchema = z
  .object({
    TaxPeriod: z.lazy(() => TaxPeriodSchema).optional(),
    TransactionIdList: z.array(z.number().int()).optional(),
  })
  .passthrough();
export type ClosingTaxPeriodRequestModel = z.infer<typeof ClosingTaxPeriodRequestModelSchema>;

export const TaxAdjustmentSchema = z
  .object({
    ID: z.number().int().optional(),
    Date: z.string().optional(),
    Description: z.string().optional(),
    Total: z.number().optional(),
    TaxPeriodId: z.number().int().nullable().optional(),
    TaxAdjustmentType: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
    TaxAdjustmentAccountType: z.union([z.literal(1), z.literal(2)]).optional(),
    Locked: z.boolean().optional(), // read-only / system generated
  })
  .passthrough();
export type TaxAdjustment = z.infer<typeof TaxAdjustmentSchema>;

export const TaxPeriodSchema = z
  .object({
    ID: z.number().int().optional(),
    PeriodReference: z.string().optional(),
    StartDate: z.string().nullable().optional(),
    EndDate: z.string().optional(),
    Status: z.number().int().optional(),
    TaxValue: z.number().nullable().optional(),
    TaxPeriodFrequency: z.number().int().optional(),
    SubmissionDate: z.string().nullable().optional(),
    TaxTotalPaidRefunded: z.number().nullable().optional(),
    UnreportedTransactionTotal: z.number().nullable().optional(),
    TaxReportingTypeId: z.number().int().nullable().optional(),
  })
  .passthrough();
export type TaxPeriod = z.infer<typeof TaxPeriodSchema>;

export const TaxRateAdjustmentSchema = z
  .object({
    ID: z.number().int().optional(),
    CountryId: z.number().int().optional(),
    CountryCode: z.string().optional(),
    CountryName: z.string().optional(),
    OldTaxTypeDefaultUID: z.string().optional(),
    NewTaxTypeDefaultUID: z.string().optional(),
    TaxRateAdjustmentDate: z.string().optional(),
    TaxNotificationEndDate: z.string().optional(),
    OldTaxTypeId: z.number().int().optional(),
    OldTaxName: z.string().optional(),
    OldTaxPercentage: z.number().optional(),
    NewTaxTypeId: z.number().int().optional(),
    NewTaxName: z.string().optional(),
    NewTaxPercentage: z.number().optional(),
    TaxRateName: z.string().optional(),
  })
  .passthrough();
export type TaxRateAdjustment = z.infer<typeof TaxRateAdjustmentSchema>;

export const TaxReportingTypeSchema = z.record(z.string(), z.unknown());
export type TaxReportingType = z.infer<typeof TaxReportingTypeSchema>;

export const VAT201DataSchema = z
  .object({
    VatCode: z.string().nullable().optional(),
    VatCodeDescription: z.string().nullable().optional(),
    Total: z.number().int().nullable().optional(),
    Vat: z.number().int().nullable().optional(),
    VatType: z.string().nullable().optional(),
    SortInd: z.number().int().nullable().optional(),
  })
  .passthrough();
export type VAT201Data = z.infer<typeof VAT201DataSchema>;

export const VAT201ReportRequestModelSchema = z
  .object({
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    IncludeAdjustments: z.boolean().optional(),
    OffsetCredits: z.boolean().optional(),
    TaxPeriodId: z.number().int().nullable().optional(),
  })
  .passthrough();
export type VAT201ReportRequestModel = z.infer<typeof VAT201ReportRequestModelSchema>;

export class TaxAdjustmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /TaxAdjustment/Get` [GET-TaxAdjustment-Get] — Gets a list of Tax Adjustments. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof TaxAdjustmentSchema>>> {
    return this.executor.request({
      resource: "TaxAdjustment",
      operation: "Get",
      method: "GET",
      path: "/TaxAdjustment/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(TaxAdjustmentSchema),
      options,
    });
  }

  /** Async page iterator for `GET /TaxAdjustment/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof TaxAdjustmentSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /TaxAdjustment/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof TaxAdjustmentSchema>, void, undefined> {
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

  /** `GET /TaxAdjustment/Get/{id}` [GET-TaxAdjustment-Get-id] — Gets a specific Tax Adjustment based on the identifier sent through. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof TaxAdjustmentSchema>> {
    return this.executor.request({
      resource: "TaxAdjustment",
      operation: "GetById",
      method: "GET",
      path: `/TaxAdjustment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: TaxAdjustmentSchema,
      options,
    });
  }

  /** `POST /TaxAdjustment/Save` [POST-TaxAdjustment-Save] — Saves the specified Tax Adjustment. */
  public async save(
    input: z.infer<typeof TaxAdjustmentSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof TaxAdjustmentSchema>> {
    return this.executor.request({
      resource: "TaxAdjustment",
      operation: "Save",
      method: "POST",
      path: "/TaxAdjustment/Save",
      body: input,
      requestSchema: TaxAdjustmentSchema,
      responseSchema: TaxAdjustmentSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /TaxAdjustment/SaveBatch` [POST-TaxAdjustment-SaveBatch] — Saves a batch of Tax Adjustments */
  public async saveBatch(
    input: readonly z.infer<typeof TaxAdjustmentSchema>[],
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof TaxAdjustmentSchema>>> {
    return this.executor.request({
      resource: "TaxAdjustment",
      operation: "SaveBatch",
      method: "POST",
      path: "/TaxAdjustment/SaveBatch",
      body: input,
      requestSchema: z.array(TaxAdjustmentSchema),
      responseSchema: z.array(TaxAdjustmentSchema),
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /TaxAdjustment/Delete/{id}` [DELETE-TaxAdjustment-Delete-id] — Deletes the specified Tax Adjustment. */
  public async delete(id: number | string, options?: RequestOptions): Promise<unknown> {
    return this.executor.request({
      resource: "TaxAdjustment",
      operation: "Delete",
      method: "DELETE",
      path: `/TaxAdjustment/Delete/${encodeURIComponent(String(id))}`,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /TaxAdjustment/DeleteBatch` [POST-TaxAdjustment-DeleteBatch] — Deletes the batch of Journal Entry. */
  public async deleteBatch(
    input: readonly (number | string | Record<string, unknown>)[],
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "TaxAdjustment",
      operation: "DeleteBatch",
      method: "POST",
      path: "/TaxAdjustment/DeleteBatch",
      body: input,
      requestSchema: z.array(z.union([z.number(), z.string(), z.record(z.string(), z.unknown())])),
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class TaxRateAdjustmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /TaxRateAdjustment/Get` [GET-TaxRateAdjustment-Get] — Gets a specific tax rate adjustment based on the company. */
  public async get(options?: RequestOptions): Promise<z.infer<typeof TaxRateAdjustmentSchema>> {
    return this.executor.request({
      resource: "TaxRateAdjustment",
      operation: "Get",
      method: "GET",
      path: "/TaxRateAdjustment/Get",
      responseSchema: TaxRateAdjustmentSchema,
      options,
    });
  }

  /** `GET /TaxRateAdjustment/GetAll` [GET-TaxRateAdjustment-GetAll] — Gets the tax rate adjustments based on the company. */
  public async getAll(
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof TaxRateAdjustmentSchema>>> {
    return this.executor.request({
      resource: "TaxRateAdjustment",
      operation: "GetAll",
      method: "GET",
      path: "/TaxRateAdjustment/GetAll",
      responseSchema: z.array(TaxRateAdjustmentSchema),
      options,
    });
  }
}

export class TaxPeriodService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /TaxPeriod/CloseTaxPeriod` [POST-TaxPeriod-CloseTaxPeriod] — Closes the specified Tax Period. */
  public async closeTaxPeriod(
    input: z.infer<typeof ClosingTaxPeriodRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "TaxPeriod",
      operation: "CloseTaxPeriod",
      method: "POST",
      path: "/TaxPeriod/CloseTaxPeriod",
      body: input,
      requestSchema: ClosingTaxPeriodRequestModelSchema,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /TaxPeriod/AssignPaymentsRefundsToTaxPeriod` [POST-TaxPeriod-AssignPaymentsRefundsToTaxPeriod] — Assigns the payments and refunds to a tax period. */
  public async assignPaymentsRefundsToTaxPeriod(
    input: z.infer<typeof ClosingTaxPeriodRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "TaxPeriod",
      operation: "AssignPaymentsRefundsToTaxPeriod",
      method: "POST",
      path: "/TaxPeriod/AssignPaymentsRefundsToTaxPeriod",
      body: input,
      requestSchema: ClosingTaxPeriodRequestModelSchema,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /TaxPeriod/OpenTaxPeriod` [POST-TaxPeriod-OpenTaxPeriod] — Opens the specified Tax Period. */
  public async openTaxPeriod(
    input: z.infer<typeof TaxPeriodSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "TaxPeriod",
      operation: "OpenTaxPeriod",
      method: "POST",
      path: "/TaxPeriod/OpenTaxPeriod",
      body: input,
      requestSchema: TaxPeriodSchema,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /TaxPeriod/HasUnreportedTransactions` [POST-TaxPeriod-HasUnreportedTransactions] — Determines whether the specified tax period has unreported transactions. This can occur if a closed period was opened and transactions processed within this periods date range. */
  public async hasUnreportedTransactions(
    input: z.infer<typeof TaxPeriodSchema>,
    options?: RequestOptions,
  ): Promise<boolean> {
    return this.executor.request({
      resource: "TaxPeriod",
      operation: "HasUnreportedTransactions",
      method: "POST",
      path: "/TaxPeriod/HasUnreportedTransactions",
      body: input,
      requestSchema: TaxPeriodSchema,
      responseSchema: z.boolean(),
      options,
    });
  }

  /** `POST /TaxPeriod/HasPreviousTransactions` [POST-TaxPeriod-HasPreviousTransactions] — Determines whether there are unreported transactions that occurred before this Tax Period. These transactions would then need to be included in this period when this period is closed. */
  public async hasPreviousTransactions(input: string, options?: RequestOptions): Promise<boolean> {
    return this.executor.request({
      resource: "TaxPeriod",
      operation: "HasPreviousTransactions",
      method: "POST",
      path: "/TaxPeriod/HasPreviousTransactions",
      body: input,
      requestSchema: z.string(),
      responseSchema: z.boolean(),
      options,
    });
  }

  /** `DELETE /TaxPeriod/DeleteAllTaxPeriods` [DELETE-TaxPeriod-DeleteAllTaxPeriods] — Deletes all Tax Periods. Transactional data is not affected by this action. */
  public async deleteAllTaxPeriods(options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "TaxPeriod",
      operation: "DeleteAllTaxPeriods",
      method: "DELETE",
      path: "/TaxPeriod/DeleteAllTaxPeriods",
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /TaxPeriod/Get` [GET-TaxPeriod-Get] — Gets a list of Tax Periods. */
  public async list(options?: RequestOptions): Promise<SagePage<z.infer<typeof TaxPeriodSchema>>> {
    return this.executor.request({
      resource: "TaxPeriod",
      operation: "Get",
      method: "GET",
      path: "/TaxPeriod/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(TaxPeriodSchema),
      options,
    });
  }

  /** Async page iterator for `GET /TaxPeriod/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof TaxPeriodSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /TaxPeriod/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof TaxPeriodSchema>, void, undefined> {
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

  /** `GET /TaxPeriod/Get/{id}` [GET-TaxPeriod-Get-id] — Gets the specified Tax Period based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof TaxPeriodSchema>> {
    return this.executor.request({
      resource: "TaxPeriod",
      operation: "GetById",
      method: "GET",
      path: `/TaxPeriod/Get/${encodeURIComponent(String(id))}`,
      responseSchema: TaxPeriodSchema,
      options,
    });
  }
}

export class BASReportService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /BASReport/Get` [POST-BASReport-Get] — Gets the BAS Report based on the request model. */
  public async get(
    input: z.infer<typeof BASReportRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof BASReportSchema>> {
    return this.executor.request({
      resource: "BASReport",
      operation: "Get",
      method: "POST",
      path: "/BASReport/Get",
      body: input,
      requestSchema: BASReportRequestModelSchema,
      responseSchema: BASReportSchema,
      options,
    });
  }
}

export class VAT201ReportService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /VAT201Report/Get` [GET-VAT201Report-Get] — Gets the VAT201 Model based on the request model sent through. */
  public async list(
    input: z.infer<typeof VAT201ReportRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof VAT201DataSchema>>> {
    return this.executor.request({
      resource: "VAT201Report",
      operation: "Get",
      method: "GET",
      path: "/VAT201Report/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: VAT201ReportRequestModelSchema,
      responseSchema: createSagePageSchema(VAT201DataSchema),
      options,
    });
  }

  /** Async page iterator for `GET /VAT201Report/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof VAT201DataSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /VAT201Report/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof VAT201DataSchema>, void, undefined> {
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
}

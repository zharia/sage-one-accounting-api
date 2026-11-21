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
    G1: z.union([z.number().int(), z.string()]).nullable().optional(),
    G2: z.union([z.number().int(), z.string()]).nullable().optional(),
    G3: z.union([z.number().int(), z.string()]).nullable().optional(),
    G4: z.union([z.number().int(), z.string()]).nullable().optional(),
    G5: z.union([z.number().int(), z.string()]).nullable().optional(),
    G6: z.union([z.number().int(), z.string()]).nullable().optional(),
    G7: z.union([z.number().int(), z.string()]).nullable().optional(),
    G8: z.union([z.number().int(), z.string()]).nullable().optional(),
    G9: z.union([z.number().int(), z.string()]).nullable().optional(),
    G10: z.union([z.number().int(), z.string()]).nullable().optional(),
    G11: z.union([z.number().int(), z.string()]).nullable().optional(),
    G12: z.union([z.number().int(), z.string()]).nullable().optional(),
    G13: z.union([z.number().int(), z.string()]).nullable().optional(),
    G14: z.union([z.number().int(), z.string()]).nullable().optional(),
    G15: z.union([z.number().int(), z.string()]).nullable().optional(),
    G16: z.union([z.number().int(), z.string()]).nullable().optional(),
    G17: z.union([z.number().int(), z.string()]).nullable().optional(),
    G18: z.union([z.number().int(), z.string()]).nullable().optional(),
    G19: z.union([z.number().int(), z.string()]).nullable().optional(),
    G20: z.union([z.number().int(), z.string()]).nullable().optional(),
    Code1A: z.union([z.number().int(), z.string()]).nullable().optional(),
    Code1B: z.union([z.number().int(), z.string()]).nullable().optional(),
    Code2A: z.union([z.number().int(), z.string()]).nullable().optional(),
    Code2B: z.union([z.number().int(), z.string()]).nullable().optional(),
    Code3: z.union([z.number().int(), z.string()]).nullable().optional(),
    W1: z.union([z.number().int(), z.string()]).nullable().optional(),
    W2: z.union([z.number().int(), z.string()]).nullable().optional(),
    W3: z.union([z.number(), z.string()]).nullable().optional(),
    W4: z.union([z.number().int(), z.string()]).nullable().optional(),
    TaxReportingType: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
  })
  .passthrough();
export type BASReport = z.infer<typeof BASReportSchema>;

export const BASReportRequestModelSchema = z
  .object({
    FromDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    TaxPeriodId: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type BASReportRequestModel = z.infer<typeof BASReportRequestModelSchema>;

export const ClosingTaxPeriodRequestModelSchema = z
  .object({
    TaxPeriod: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    TransactionIdList: z
      .array(z.union([z.number().int(), z.string()]))
      .nullable()
      .optional(),
  })
  .passthrough();
export type ClosingTaxPeriodRequestModel = z.infer<typeof ClosingTaxPeriodRequestModelSchema>;

export const TaxAdjustmentSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Total: z.union([z.number(), z.string()]).nullable().optional(),
    TaxPeriodId: z.union([z.number().int(), z.string()]).nullable().optional(),
    TaxAdjustmentType: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    TaxAdjustmentAccountType: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    Locked: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type TaxAdjustment = z.infer<typeof TaxAdjustmentSchema>;

export const TaxPeriodSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    PeriodReference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    StartDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    EndDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Status: z.union([z.number().int(), z.string()]).nullable().optional(),
    TaxValue: z.union([z.number(), z.string()]).nullable().optional(),
    TaxPeriodFrequency: z.union([z.number().int(), z.string()]).nullable().optional(),
    SubmissionDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    TaxTotalPaidRefunded: z.union([z.number(), z.string()]).nullable().optional(),
    UnreportedTransactionTotal: z.union([z.number(), z.string()]).nullable().optional(),
    TaxReportingTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TaxPeriod = z.infer<typeof TaxPeriodSchema>;

export const TaxRateAdjustmentSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    CountryId: z.union([z.number().int(), z.string()]).nullable().optional(),
    CountryCode: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CountryName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    OldTaxTypeDefaultUID: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    NewTaxTypeDefaultUID: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    TaxRateAdjustmentDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    TaxNotificationEndDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    OldTaxTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    OldTaxName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    OldTaxPercentage: z.union([z.number(), z.string()]).nullable().optional(),
    NewTaxTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    NewTaxName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    NewTaxPercentage: z.union([z.number(), z.string()]).nullable().optional(),
    TaxRateName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
  })
  .passthrough();
export type TaxRateAdjustment = z.infer<typeof TaxRateAdjustmentSchema>;

export const VAT201DataSchema = z
  .object({
    VatCode: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    VatCodeDescription: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Total: z.union([z.number().int(), z.string()]).nullable().optional(),
    Vat: z.union([z.number().int(), z.string()]).nullable().optional(),
    VatType: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    SortInd: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type VAT201Data = z.infer<typeof VAT201DataSchema>;

export const VAT201ReportRequestModelSchema = z
  .object({
    FromDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    IncludeAdjustments: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    OffsetCredits: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    TaxPeriodId: z.union([z.number().int(), z.string()]).nullable().optional(),
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

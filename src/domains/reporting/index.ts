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

const AdditionalPriceListSchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string(),
    IsDefault: z.boolean().optional(),
  })
  .passthrough();

export const BalanceSheetReportingLevelSchema = z
  .object({
    Total: z.number().int().nullable().optional(),
    ID: z.number().int().nullable().optional(),
    Description: z.string().nullable().optional(),
    Category: z.string().nullable().optional(),
    CategoryId: z.number().int().nullable().optional(),
    AccountTypeId: z.number().int().nullable().optional(),
    Children: z.array(z.unknown().nullable()).optional(),
    ReportingLevelType: z.number().int().nullable().optional(),
    AccountCategoryId: z.number().int().nullable().optional(),
    AccountCategoryOrder: z.number().int().nullable().optional(),
    AccountNumber: z.string().nullable().optional(),
    ItemReportingGroupTypeId: z.number().int().nullable().optional(),
  })
  .passthrough();
export type BalanceSheetReportingLevel = z.infer<typeof BalanceSheetReportingLevelSchema>;

export const BalanceSheetRequestModelSchema = z
  .object({
    RunAtDate: z.string().optional(),
    DisplayReportingGroupDetail: z.boolean().optional(),
  })
  .passthrough();
export type BalanceSheetRequestModel = z.infer<typeof BalanceSheetRequestModelSchema>;

const CustomerSchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string(),
    Category: z.lazy(() => CustomerCategorySchema).optional(),
    SalesRepresentativeId: z.number().int().nullable().optional(),
    SalesRepresentative: z.lazy(() => SalesRepresentativeSchema).optional(),
    TaxReference: z.string().optional(),
    ContactName: z.string().optional(),
    Telephone: z.string().optional(),
    Fax: z.string().optional(),
    Mobile: z.string().optional(),
    Email: z.string().optional(),
    WebAddress: z.string().optional(),
    Active: z.boolean().optional(),
    IsObfuscated: z.boolean().optional(),
    Balance: z.number().optional(), // read-only / system generated
    CreditLimit: z.number().optional(),
    CommunicationMethod: z.number().int().nullable().optional(),
    PostalAddress01: z.string().optional(),
    PostalAddress02: z.string().optional(),
    PostalAddress03: z.string().optional(),
    PostalAddress04: z.string().optional(),
    PostalAddress05: z.string().optional(),
    DeliveryAddress01: z.string().optional(),
    DeliveryAddress02: z.string().optional(),
    DeliveryAddress03: z.string().optional(),
    DeliveryAddress04: z.string().optional(),
    DeliveryAddress05: z.string().optional(),
    AutoAllocateToOldestInvoice: z.boolean().nullable().optional(),
    EnableCustomerZone: z.boolean().optional(),
    CustomerZoneGuid: z.string().optional(), // read-only / system generated
    CashSale: z.boolean().nullable().optional(),
    TextField1: z.string().optional(),
    TextField2: z.string().optional(),
    TextField3: z.string().optional(),
    NumericField1: z.number().nullable().optional(),
    NumericField2: z.number().nullable().optional(),
    NumericField3: z.number().nullable().optional(),
    YesNoField1: z.boolean().optional(),
    YesNoField2: z.boolean().optional(),
    YesNoField3: z.boolean().optional(),
    DateField1: z.string().nullable().optional(),
    DateField2: z.string().nullable().optional(),
    DateField3: z.string().nullable().optional(),
    DefaultPriceListId: z.number().int().nullable().optional(),
    DefaultPriceList: z.lazy(() => AdditionalPriceListSchema).optional(),
    DefaultPriceListName: z.string().optional(),
    AcceptsElectronicInvoices: z.boolean().optional(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().optional(), // read-only / system generated
    BusinessRegistrationNumber: z.string().optional(),
    TaxStatusVerified: z.string().nullable().optional(),
    CurrencyId: z.number().int().nullable().optional(),
    CurrencySymbol: z.string().optional(),
    HasActivity: z.boolean().optional(), // read-only / system generated
    DefaultDiscountPercentage: z.number().nullable().optional(),
    DefaultTaxTypeId: z.number().int().nullable().optional(),
    DefaultTaxType: z.lazy(() => TaxTypeSchema).optional(),
    DueDateMethodId: z.number().int().nullable().optional(),
    DueDateMethodValue: z.number().int().nullable().optional(),
    CityId: z.number().int().nullable().optional(),
    AccountingAgreement: z.boolean().nullable().optional(),
    HasSpecialCountryTaxActivity: z.boolean().optional(), // read-only / system generated
    OutstandingInvoices: z.boolean().nullable().optional(),
    OverdueInvoices: z.boolean().nullable().optional(),
    OnHold: z.boolean().nullable().optional(),
    ExcludeFromDebtorsManager: z.boolean().nullable().optional(),
    SubjectToDRCVat: z.boolean().optional(),
  })
  .passthrough();

const CustomerCategorySchema = z
  .object({
    Description: z.string().optional(),
    ID: z.number().int(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().nullable().optional(), // read-only / system generated
  })
  .passthrough();

export const IncomeVsExpenseSchema = z
  .object({
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    Periods: z.array(z.lazy(() => IncomeVsExpensesPeriodGroupingSchema)).optional(),
    IsComparative: z.boolean().optional(),
    UsePurchases: z.boolean().optional(),
  })
  .passthrough();
export type IncomeVsExpense = z.infer<typeof IncomeVsExpenseSchema>;

export const IncomeVsExpenseRequestModelSchema = z
  .object({
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    UsePurchases: z.boolean().optional(),
    PeriodGroupingLength: z.number().int().optional(),
    Comparative: z.boolean().optional(),
  })
  .passthrough();
export type IncomeVsExpenseRequestModel = z.infer<typeof IncomeVsExpenseRequestModelSchema>;

export const IncomeVsExpensesPeriodGroupingSchema = z.record(z.string(), z.unknown());
export type IncomeVsExpensesPeriodGrouping = z.infer<typeof IncomeVsExpensesPeriodGroupingSchema>;

export const ProfitAndLossReportingLevelSchema = z
  .object({
    Total: z.array(z.number().int().nullable()).optional(),
    Variance: z.number().int().nullable().optional(),
    ID: z.number().int().nullable().optional(),
    Description: z.string().nullable().optional(),
    Category: z.string().nullable().optional(),
    CategoryId: z.number().int().nullable().optional(),
    AccountTypeId: z.number().int().nullable().optional(),
    Children: z.array(z.unknown().nullable()).optional(),
    ReportingLevelType: z.number().int().nullable().optional(),
    AccountCategoryId: z.number().int().nullable().optional(),
    AccountCategoryOrder: z.number().int().nullable().optional(),
    AccountNumber: z.string().nullable().optional(),
    ItemReportingGroupTypeId: z.number().int().nullable().optional(),
  })
  .passthrough();
export type ProfitAndLossReportingLevel = z.infer<typeof ProfitAndLossReportingLevelSchema>;

export const ProfitAndLossStatementRequestModelSchema = z
  .object({
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    UsePurchases: z.boolean().optional(),
    DisplayReportingGroupDetail: z.boolean().optional(),
    Comparative: z.boolean().optional(),
    BudgetId: z.number().int().nullable().optional(),
    ShowVariance: z.boolean().optional(),
  })
  .passthrough();
export type ProfitAndLossStatementRequestModel = z.infer<
  typeof ProfitAndLossStatementRequestModelSchema
>;

export const SalesBySalesRepresentativeSchema = z
  .object({
    DocumentHeaderId: z.number().int().optional(),
    DocumentTypeId: z.number().int().optional(),
    SalesRepresentativeId: z.number().int().optional(),
    DocumentNumber: z.string().optional(),
    Date: z.string().optional(),
    UnitPriceExclusive: z.number().optional(),
    Quantity: z.number().nullable().optional(),
    TotalCost: z.number().optional(),
    Total: z.number().optional(),
    Name: z.string().optional(),
    CustomerName: z.string().optional(),
    GPAmount: z.number().optional(),
    GPPercentage: z.number().optional(),
    TotalGroupAverage: z.number().optional(),
    TotalReportAverage: z.number().optional(),
  })
  .passthrough();
export type SalesBySalesRepresentative = z.infer<typeof SalesBySalesRepresentativeSchema>;

export const SalesBySalesRepresentativeRequestModelSchema = z
  .object({
    FromSalesRepresentative: z.string().optional(),
    ToSalesRepresentative: z.string().optional(),
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    IncludeActive: z.boolean().optional(),
    IncludeInactive: z.boolean().optional(),
    IncludeCreditNotes: z.boolean().optional(),
    IncludeItems: z.boolean().optional(),
    IncludeTime: z.boolean().optional(),
    IncludeAccounts: z.boolean().optional(),
    UseLastCost: z.boolean().optional(),
  })
  .passthrough();
export type SalesBySalesRepresentativeRequestModel = z.infer<
  typeof SalesBySalesRepresentativeRequestModelSchema
>;

const SalesRepresentativeSchema = z
  .object({
    ID: z.number().int().optional(),
    FirstName: z.string(),
    LastName: z.string().optional(),
    Name: z.string().optional(), // read-only / system generated
    Active: z.boolean(),
    Email: z.string().optional(),
    Mobile: z.string().optional(),
    Telephone: z.string().optional(),
    Created: z.string().optional(), // read-only / system generated
    Modified: z.string().nullable().optional(), // read-only / system generated
  })
  .passthrough();

const SupplierSchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string().optional(),
    Category: z.lazy(() => SupplierCategorySchema).optional(),
    TaxReference: z.string().optional(),
    ContactName: z.string().optional(),
    Telephone: z.string().optional(),
    Fax: z.string().optional(),
    Mobile: z.string().optional(),
    Email: z.string().optional(),
    WebAddress: z.string().optional(),
    Active: z.boolean().optional(),
    IsObfuscated: z.boolean().optional(),
    Balance: z.number().optional(), // read-only / system generated
    CreditLimit: z.number().optional(),
    PostalAddress01: z.string().optional(),
    PostalAddress02: z.string().optional(),
    PostalAddress03: z.string().optional(),
    PostalAddress04: z.string().optional(),
    PostalAddress05: z.string().optional(),
    DeliveryAddress01: z.string().optional(),
    DeliveryAddress02: z.string().optional(),
    DeliveryAddress03: z.string().optional(),
    DeliveryAddress04: z.string().optional(),
    DeliveryAddress05: z.string().optional(),
    AutoAllocateToOldestInvoice: z.boolean().nullable().optional(),
    TextField1: z.string().optional(),
    TextField2: z.string().optional(),
    TextField3: z.string().optional(),
    NumericField1: z.number().nullable().optional(),
    NumericField2: z.number().nullable().optional(),
    NumericField3: z.number().nullable().optional(),
    YesNoField1: z.boolean().optional(),
    YesNoField2: z.boolean().optional(),
    YesNoField3: z.boolean().optional(),
    DateField1: z.string().nullable().optional(),
    DateField2: z.string().nullable().optional(),
    DateField3: z.string().nullable().optional(),
    AccountingAgreement: z.boolean().optional(),
    HasSpecialCountryTaxActivity: z.boolean().optional(), // read-only / system generated
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().optional(), // read-only / system generated
    BusinessRegistrationNumber: z.string().optional(),
    RMCDApprovalNumber: z.string().optional(),
    TaxStatusVerified: z.string().nullable().optional(),
    CurrencyId: z.number().int().nullable().optional(),
    CurrencySymbol: z.string().optional(),
    HasActivity: z.boolean().optional(), // read-only / system generated
    DefaultDiscountPercentage: z.number().nullable().optional(),
    DefaultTaxTypeId: z.number().int().nullable().optional(),
    DefaultTaxType: z.lazy(() => TaxTypeSchema).optional(),
    DueDateMethodId: z.number().int().nullable().optional(),
    DueDateMethodValue: z.number().int().nullable().optional(),
    SubjectToDRCVat: z.boolean().optional(),
  })
  .passthrough();

const SupplierCategorySchema = z
  .object({
    Description: z.string().optional(),
    ID: z.number().int(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().nullable().optional(), // read-only / system generated
  })
  .passthrough();

const TaxTypeSchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string().optional(),
    Percentage: z.number().optional(),
    IsDefault: z.boolean().optional(),
    HasActivity: z.boolean().optional(), // read-only / system generated
    IsManualTax: z.boolean().optional(),
    Active: z.boolean().optional(),
    Created: z.string().optional(), // read-only / system generated
    Modified: z.string().nullable().optional(), // read-only / system generated
    TaxTypeDefaultUID: z.string().optional(), // read-only / system generated
    CompanyId: z.number().int().optional(),
  })
  .passthrough();

export const TopCustomersByOutstandingBalanceRequestModelSchema = z
  .object({
    ViewTop: z.number().int().optional(),
  })
  .passthrough();
export type TopCustomersByOutstandingBalanceRequestModel = z.infer<
  typeof TopCustomersByOutstandingBalanceRequestModelSchema
>;

export const TopCustomersBySalesSchema = z
  .object({
    CustomerId: z.number().int().nullable().optional(),
    Name: z.string().nullable().optional(),
    Exclusive: z.number().int().nullable().optional(),
    Total: z.number().int().nullable().optional(),
  })
  .passthrough();
export type TopCustomersBySales = z.infer<typeof TopCustomersBySalesSchema>;

export const TopCustomersBySalesRequestModelSchema = z
  .object({
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    CustomerId: z.number().int().optional(),
    IncludeCreditNotes: z.boolean().optional(),
    ViewTop: z.number().int().optional(),
  })
  .passthrough();
export type TopCustomersBySalesRequestModel = z.infer<typeof TopCustomersBySalesRequestModelSchema>;

export const TopPurchasedItemSchema = z
  .object({
    ItemId: z.number().int().nullable().optional(),
    Description: z.string().nullable().optional(),
    Exclusive: z.number().int().nullable().optional(),
    Total: z.number().int().nullable().optional(),
    Quantity: z.number().int().nullable().optional(),
  })
  .passthrough();
export type TopPurchasedItem = z.infer<typeof TopPurchasedItemSchema>;

export const TopPurchasedItemRequestModelSchema = z
  .object({
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    IncludeOption: z.boolean().optional(),
    ViewTop: z.number().int().optional(),
  })
  .passthrough();
export type TopPurchasedItemRequestModel = z.infer<typeof TopPurchasedItemRequestModelSchema>;

export const TopSellingItemSchema = z
  .object({
    ItemId: z.number().int().nullable().optional(),
    Description: z.string().nullable().optional(),
    Exclusive: z.number().int().nullable().optional(),
    Total: z.number().int().nullable().optional(),
    Quantity: z.number().int().nullable().optional(),
  })
  .passthrough();
export type TopSellingItem = z.infer<typeof TopSellingItemSchema>;

export const TopSellingItemByValueOnHandSchema = z
  .object({
    ItemId: z.number().int().nullable().optional(),
    Description: z.string().nullable().optional(),
    QuantityOnHand: z.number().int().nullable().optional(),
    AverageCost: z.number().int().nullable().optional(),
    ValueOnHand: z.number().int().nullable().optional(),
  })
  .passthrough();
export type TopSellingItemByValueOnHand = z.infer<typeof TopSellingItemByValueOnHandSchema>;

export const TopSellingItemByValueOnHandRequestModelSchema = z
  .object({
    RunAtDate: z.string().optional(),
    UseLastCost: z.boolean().optional(),
    ViewTop: z.number().int().optional(),
  })
  .passthrough();
export type TopSellingItemByValueOnHandRequestModel = z.infer<
  typeof TopSellingItemByValueOnHandRequestModelSchema
>;

export const TopSellingItemRequestModelSchema = z
  .object({
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    IncludeOption: z.boolean().optional(),
    ViewTop: z.number().int().optional(),
  })
  .passthrough();
export type TopSellingItemRequestModel = z.infer<typeof TopSellingItemRequestModelSchema>;

export const TopSuppliersByOutstandingBalanceRequestModelSchema = z
  .object({
    ViewTop: z.number().int().optional(),
  })
  .passthrough();
export type TopSuppliersByOutstandingBalanceRequestModel = z.infer<
  typeof TopSuppliersByOutstandingBalanceRequestModelSchema
>;

export const TopSuppliersByPurchasesSchema = z
  .object({
    Name: z.string().nullable().optional(),
    Exclusive: z.number().int().nullable().optional(),
    Total: z.number().int().nullable().optional(),
  })
  .passthrough();
export type TopSuppliersByPurchases = z.infer<typeof TopSuppliersByPurchasesSchema>;

export const TopSuppliersByPurchasesRequestModelSchema = z
  .object({
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    SupplierId: z.number().int().optional(),
    IncludeSupplierReturns: z.boolean().optional(),
    ViewTop: z.number().int().optional(),
  })
  .passthrough();
export type TopSuppliersByPurchasesRequestModel = z.infer<
  typeof TopSuppliersByPurchasesRequestModelSchema
>;

export const TrialBalanceExportMappingSchema = z
  .object({
    ID: z.number().int().nullable().optional(),
    AccountId: z.number().int().nullable().optional(),
    AccountNumber: z.string().nullable().optional(),
    AccountTypeId: z.number().int().nullable().optional(),
    TrialBalanceAccountTypeId: z.number().int().nullable().optional(),
    ExportCode: z.string().nullable().optional(),
  })
  .passthrough();
export type TrialBalanceExportMapping = z.infer<typeof TrialBalanceExportMappingSchema>;

export const TrialBalanceRequestModelSchema = z
  .object({
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    ShowMovement: z.boolean().optional(),
    DisplayReportingGroupDetail: z.boolean().optional(),
    Comparative: z.boolean().optional(),
    CurrencyId: z.number().int().nullable().optional(),
  })
  .passthrough();
export type TrialBalanceRequestModel = z.infer<typeof TrialBalanceRequestModelSchema>;

export class BalanceSheetService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /BalanceSheet/Get` [POST-BalanceSheet-Get] — Retrieves the Balance Sheet report */
  public async get(
    input: z.infer<typeof BalanceSheetRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof BalanceSheetReportingLevelSchema>>> {
    return this.executor.request({
      resource: "BalanceSheet",
      operation: "Get",
      method: "POST",
      path: "/BalanceSheet/Get",
      body: input,
      requestSchema: BalanceSheetRequestModelSchema,
      responseSchema: z.array(BalanceSheetReportingLevelSchema),
      options,
    });
  }
}

export class ProfitAndLossService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /ProfitAndLoss/Get` [POST-ProfitAndLoss-Get] — Retrieves a Profit And Loss report. */
  public async get(
    input: z.infer<typeof ProfitAndLossStatementRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof ProfitAndLossReportingLevelSchema>>> {
    return this.executor.request({
      resource: "ProfitAndLoss",
      operation: "Get",
      method: "POST",
      path: "/ProfitAndLoss/Get",
      body: input,
      requestSchema: ProfitAndLossStatementRequestModelSchema,
      responseSchema: z.array(ProfitAndLossReportingLevelSchema),
      options,
    });
  }
}

export class TrialBalanceService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /TrialBalance/Export` [POST-TrialBalance-Export] — Exports the Trial Balance based on the Trial Balance request model sent through. */
  public async export(
    input: z.infer<typeof TrialBalanceRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "TrialBalance",
      operation: "Export",
      method: "POST",
      path: "/TrialBalance/Export",
      body: input,
      requestSchema: TrialBalanceRequestModelSchema,
      responseType: "binary",
      isFinancialMutation: true,
      options,
    });
  }
}

export class TrialBalanceExportMappingService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /TrialBalanceExportMapping/Get` [GET-TrialBalanceExportMapping-Get] — Retrieves a collection of Trial Balance Export Mappings. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof TrialBalanceExportMappingSchema>>> {
    return this.executor.request({
      resource: "TrialBalanceExportMapping",
      operation: "Get",
      method: "GET",
      path: "/TrialBalanceExportMapping/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(TrialBalanceExportMappingSchema),
      options,
    });
  }

  /** Async page iterator for `GET /TrialBalanceExportMapping/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof TrialBalanceExportMappingSchema>>,
    void,
    undefined
  > {
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

  /** Async item iterator for `GET /TrialBalanceExportMapping/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof TrialBalanceExportMappingSchema>, void, undefined> {
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

export class FinalAccountsService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /FinalAccounts/Get` [GET-FinalAccounts-Get_accountId] — No documentation available. */
  public async getByAccountId(
    input?: unknown,
    options?: RequestOptions & { readonly accountId?: number | undefined },
  ): Promise<unknown> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.accountId !== undefined) {
      baseQuery["accountId"] = options.accountId;
    }
    return this.executor.request({
      resource: "FinalAccounts",
      operation: "Get",
      method: "GET",
      path: "/FinalAccounts/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      body: input,
      options,
    });
  }

  /** `GET /FinalAccounts/Get` [GET-FinalAccounts-Get] — No documentation available. */
  public async get(input?: unknown, options?: RequestOptions): Promise<unknown> {
    return this.executor.request({
      resource: "FinalAccounts",
      operation: "Get",
      method: "GET",
      path: "/FinalAccounts/Get",
      body: input,
      options,
    });
  }

  /** `GET /FinalAccounts/GetByCompanyId` [GET-FinalAccounts-GetByCompanyId_companyId] — No documentation available. */
  public async getByCompanyId(
    input?: unknown,
    options?: RequestOptions & { readonly companyId?: number | undefined },
  ): Promise<unknown> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.companyId !== undefined) {
      baseQuery["companyId"] = options.companyId;
    }
    return this.executor.request({
      resource: "FinalAccounts",
      operation: "GetByCompanyId",
      method: "GET",
      path: "/FinalAccounts/GetByCompanyId",
      query: buildQueryWithOData(baseQuery, options?.odata),
      body: input,
      options,
    });
  }

  /** `POST /FinalAccounts/Delete` [POST-FinalAccounts-Delete_accountId] — No documentation available. */
  public async delete(
    options?: RequestOptions & { readonly accountId?: number | undefined },
  ): Promise<void> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.accountId !== undefined) {
      baseQuery["accountId"] = options.accountId;
    }
    await this.executor.request({
      resource: "FinalAccounts",
      operation: "Delete",
      method: "POST",
      path: "/FinalAccounts/Delete",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /FinalAccounts/DeleteBatch` [POST-FinalAccounts-DeleteBatch] — No documentation available. */
  public async deleteBatch(
    input: readonly (number | string | Record<string, unknown>)[],
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "FinalAccounts",
      operation: "DeleteBatch",
      method: "POST",
      path: "/FinalAccounts/DeleteBatch",
      body: input,
      requestSchema: z.array(z.union([z.number(), z.string(), z.record(z.string(), z.unknown())])),
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /FinalAccounts/LinkToFinalAccountsOnlineByCompanyId` [POST-FinalAccounts-LinkToFinalAccountsOnlineByCompanyId_companyId] — No documentation available. */
  public async linkToFinalAccountsOnlineByCompanyId(
    options?: RequestOptions & { readonly companyId?: number | undefined },
  ): Promise<string> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.companyId !== undefined) {
      baseQuery["companyId"] = options.companyId;
    }
    return this.executor.request({
      resource: "FinalAccounts",
      operation: "LinkToFinalAccountsOnlineByCompanyId",
      method: "POST",
      path: "/FinalAccounts/LinkToFinalAccountsOnlineByCompanyId",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: z.string(),
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /FinalAccounts/LinkToFinalAccountsOnline` [POST-FinalAccounts-LinkToFinalAccountsOnline] — No documentation available. */
  public async linkToFinalAccountsOnline(options?: RequestOptions): Promise<string> {
    return this.executor.request({
      resource: "FinalAccounts",
      operation: "LinkToFinalAccountsOnline",
      method: "POST",
      path: "/FinalAccounts/LinkToFinalAccountsOnline",
      responseSchema: z.string(),
      isFinancialMutation: true,
      options,
    });
  }
}

export class IncomeVsExpenseService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /IncomeVsExpense/Get` [POST-IncomeVsExpense-Get] — Gets the specified Item Category based on the identifier. */
  public async get(
    input: z.infer<typeof IncomeVsExpenseRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof IncomeVsExpenseSchema>> {
    return this.executor.request({
      resource: "IncomeVsExpense",
      operation: "Get",
      method: "POST",
      path: "/IncomeVsExpense/Get",
      body: input,
      requestSchema: IncomeVsExpenseRequestModelSchema,
      responseSchema: IncomeVsExpenseSchema,
      options,
    });
  }
}

export class SalesBySalesRepresentativeService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /SalesBySalesRepresentative/Get` [POST-SalesBySalesRepresentative-Get] — Gets a List of Sales by Sales Representatives. */
  public async get(
    input: z.infer<typeof SalesBySalesRepresentativeRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof SalesBySalesRepresentativeSchema>>> {
    return this.executor.request({
      resource: "SalesBySalesRepresentative",
      operation: "Get",
      method: "POST",
      path: "/SalesBySalesRepresentative/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: SalesBySalesRepresentativeRequestModelSchema,
      responseSchema: createSagePageSchema(SalesBySalesRepresentativeSchema),
      options,
    });
  }
}

export class TopCustomersByOutstandingBalanceService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /TopCustomersByOutstandingBalance/Get` [POST-TopCustomersByOutstandingBalance-Get] — Gets a list of Customers based on the request model. */
  public async get(
    input: z.infer<typeof TopCustomersByOutstandingBalanceRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof CustomerSchema>>> {
    return this.executor.request({
      resource: "TopCustomersByOutstandingBalance",
      operation: "Get",
      method: "POST",
      path: "/TopCustomersByOutstandingBalance/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: TopCustomersByOutstandingBalanceRequestModelSchema,
      responseSchema: createSagePageSchema(CustomerSchema),
      options,
    });
  }
}

export class TopCustomersBySalesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /TopCustomersBySales/Get` [POST-TopCustomersBySales-Get] — Gets the Top Customers by Sales based on the request. */
  public async get(
    input: z.infer<typeof TopCustomersBySalesRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof TopCustomersBySalesSchema>>> {
    return this.executor.request({
      resource: "TopCustomersBySales",
      operation: "Get",
      method: "POST",
      path: "/TopCustomersBySales/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: TopCustomersBySalesRequestModelSchema,
      responseSchema: createSagePageSchema(TopCustomersBySalesSchema),
      options,
    });
  }
}

export class TopPurchasedItemsService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /TopPurchasedItems/Get` [POST-TopPurchasedItems-Get] — Gets a list of Top Purchased Items. */
  public async get(
    input: z.infer<typeof TopPurchasedItemRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof TopPurchasedItemSchema>>> {
    return this.executor.request({
      resource: "TopPurchasedItems",
      operation: "Get",
      method: "POST",
      path: "/TopPurchasedItems/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: TopPurchasedItemRequestModelSchema,
      responseSchema: createSagePageSchema(TopPurchasedItemSchema),
      options,
    });
  }
}

export class TopSellingItemsService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /TopSellingItems/Get` [POST-TopSellingItems-Get] — Gets the Top Selling Item. */
  public async get(
    input: z.infer<typeof TopSellingItemRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof TopSellingItemSchema>>> {
    return this.executor.request({
      resource: "TopSellingItems",
      operation: "Get",
      method: "POST",
      path: "/TopSellingItems/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: TopSellingItemRequestModelSchema,
      responseSchema: createSagePageSchema(TopSellingItemSchema),
      options,
    });
  }
}

export class TopSellingItemsByValueOnHandService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /TopSellingItemsByValueOnHand/Get` [POST-TopSellingItemsByValueOnHand-Get] — Gets the Top Selling Items by Value based on the request model sent through. */
  public async get(
    input: z.infer<typeof TopSellingItemByValueOnHandRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof TopSellingItemByValueOnHandSchema>>> {
    return this.executor.request({
      resource: "TopSellingItemsByValueOnHand",
      operation: "Get",
      method: "POST",
      path: "/TopSellingItemsByValueOnHand/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: TopSellingItemByValueOnHandRequestModelSchema,
      responseSchema: createSagePageSchema(TopSellingItemByValueOnHandSchema),
      options,
    });
  }
}

export class TopSuppliersByOutstandingBalanceService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /TopSuppliersByOutstandingBalance/Get` [POST-TopSuppliersByOutstandingBalance-Get] — Gets a list of Suppliers based on the request model. */
  public async get(
    input: z.infer<typeof TopSuppliersByOutstandingBalanceRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof SupplierSchema>>> {
    return this.executor.request({
      resource: "TopSuppliersByOutstandingBalance",
      operation: "Get",
      method: "POST",
      path: "/TopSuppliersByOutstandingBalance/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: TopSuppliersByOutstandingBalanceRequestModelSchema,
      responseSchema: createSagePageSchema(SupplierSchema),
      options,
    });
  }
}

export class TopSuppliersByPurchasesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /TopSuppliersByPurchases/Get` [POST-TopSuppliersByPurchases-Get] — Gets the Top Suppliers by Purchases based on the request. */
  public async get(
    input: z.infer<typeof TopSuppliersByPurchasesRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof TopSuppliersByPurchasesSchema>>> {
    return this.executor.request({
      resource: "TopSuppliersByPurchases",
      operation: "Get",
      method: "POST",
      path: "/TopSuppliersByPurchases/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: TopSuppliersByPurchasesRequestModelSchema,
      responseSchema: createSagePageSchema(TopSuppliersByPurchasesSchema),
      options,
    });
  }
}

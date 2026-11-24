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

const AccountCategorySchema = z
  .object({
    Description: z.string().optional(),
    ID: z.number().int(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().nullable().optional(), // read-only / system generated
    Comment: z.string().optional(),
    Order: z.number().int().optional(),
  })
  .passthrough();

export const AccountPaymentSchema = z
  .object({
    ID: z.number().int().optional(),
    AccountId: z.number().int().optional(),
    Date: z.string().optional(),
    Payee: z.string().optional(),
    Description: z.string().optional(),
    Reference: z.string().optional(),
    TaxTypeId: z.number().int().optional(),
    Comments: z.string().optional(),
    Exclusive: z.number().optional(),
    Tax: z.number().optional(),
    Total: z.number().optional(),
    Reconciled: z.boolean().optional(),
    BankAccountId: z.number().int().optional(),
    AnalysisCategoryId1: z.number().int().nullable().optional(),
    AnalysisCategoryId2: z.number().int().nullable().optional(),
    AnalysisCategoryId3: z.number().int().nullable().optional(),
    Accepted: z.boolean().optional(),
    BankUniqueIdentifier: z.string().optional(),
    ImportTypeId: z.number().int().nullable().optional(),
    BankImportMappingId: z.number().int().nullable().optional(),
    BankAccount_CurrencyId: z.number().int().nullable().optional(),
    BankAccount_ExchangeRate: z.number().nullable().optional(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().optional(), // read-only / system generated
  })
  .passthrough();
export type AccountPayment = z.infer<typeof AccountPaymentSchema>;

export const AccountReceiptSchema = z
  .object({
    ID: z.number().int().optional(),
    AccountId: z.number().int().optional(),
    Date: z.string().optional(),
    Payee: z.string().optional(),
    Description: z.string().optional(),
    Reference: z.string().optional(),
    TaxTypeId: z.number().int().optional(),
    Comments: z.string().optional(),
    Exclusive: z.number().optional(),
    Tax: z.number().optional(),
    Total: z.number().optional(),
    Reconciled: z.boolean().optional(),
    BankAccountId: z.number().int().optional(),
    AnalysisCategoryId1: z.number().int().nullable().optional(),
    AnalysisCategoryId2: z.number().int().nullable().optional(),
    AnalysisCategoryId3: z.number().int().nullable().optional(),
    ParentId: z.number().int().optional(),
    Accepted: z.boolean().optional(),
    BankUniqueIdentifier: z.string().optional(),
    ImportTypeId: z.number().int().nullable().optional(),
    BankImportMappingId: z.number().int().nullable().optional(),
    BankAccount_CurrencyId: z.number().int().nullable().optional(),
    BankAccount_ExchangeRate: z.number().nullable().optional(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().optional(), // read-only / system generated
  })
  .passthrough();
export type AccountReceipt = z.infer<typeof AccountReceiptSchema>;

const AdditionalPriceListSchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string(),
    IsDefault: z.boolean().optional(),
  })
  .passthrough();

export const AnalysisCategorySchema = z
  .object({
    ID: z.number().int().optional(),
    AnalysisTypeId: z.number().int().optional(),
    Description: z.string(),
  })
  .passthrough();
export type AnalysisCategory = z.infer<typeof AnalysisCategorySchema>;

export const AnalysisTypeSchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string().optional(),
    AnalysisCategories: z.array(z.lazy(() => AnalysisCategorySchema)).optional(),
    Active: z.boolean().optional(),
  })
  .passthrough();
export type AnalysisType = z.infer<typeof AnalysisTypeSchema>;

const AttachmentSchema = z
  .object({
    Name: z.string(),
    Size: z.number().int().optional(),
    AttachmentUID: z.string().optional(),
    Data: z.string().optional(),
  })
  .passthrough();

export const BudgetSchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string().optional(),
    BudgetItems: z.array(z.lazy(() => BudgetItemSchema)).optional(),
    NumberOfPeriods: z.number().int().optional(),
  })
  .passthrough();
export type Budget = z.infer<typeof BudgetSchema>;

export const BudgetItemSchema = z
  .object({
    ID: z.number().int().optional(),
    Account: z.lazy(() => BudgetItemAccountSchema).optional(),
    BudgetItemPeriods: z.array(z.lazy(() => BudgetItemPeriodSchema)).optional(),
    Total: z.number().optional(),
    AccountTypeId: z.number().int().optional(),
  })
  .passthrough();
export type BudgetItem = z.infer<typeof BudgetItemSchema>;

export const BudgetItemAccountSchema = z
  .object({
    ID: z.number().int().optional(),
    ReportingLevelType: z
      .union([
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
        z.literal(6),
        z.literal(10),
      ])
      .optional(),
    Name: z.string().optional(),
    Category: z.lazy(() => AccountCategorySchema).optional(),
  })
  .passthrough();
export type BudgetItemAccount = z.infer<typeof BudgetItemAccountSchema>;

const BudgetItemPeriodSchema = z
  .object({
    ID: z.number().int().optional(),
    Date: z.string().optional(), // read-only / system generated
    Total: z.number().optional(),
  })
  .passthrough();

export const BudgetRequestModelSchema = z
  .object({
    NumberOfPeriods: z.number().int().optional(),
    BudgetStartDate: z.string().optional(),
  })
  .passthrough();
export type BudgetRequestModel = z.infer<typeof BudgetRequestModelSchema>;

const CommercialDocumentLineSchema = z
  .object({
    SelectionId: z.number().int(),
    TaxTypeId: z.number().int().nullable().optional(),
    ID: z.number().int().optional(),
    Description: z.string().optional(),
    LineType: z
      .union([z.literal(0), z.literal(1), z.literal(3), z.literal(4), z.literal(5), z.literal(6)])
      .optional(),
    Quantity: z.number(),
    UnitPriceExclusive: z.number().optional(),
    Unit: z.string().optional(),
    UnitPriceInclusive: z.number().optional(),
    TaxPercentage: z.number().optional(),
    DiscountPercentage: z.number().optional(),
    Exclusive: z.number().optional(),
    Discount: z.number().optional(),
    Tax: z.number().optional(),
    Total: z.number().optional(),
    Comments: z.string().optional(),
    AnalysisCategoryId1: z.number().int().nullable().optional(),
    AnalysisCategoryId2: z.number().int().nullable().optional(),
    AnalysisCategoryId3: z.number().int().nullable().optional(),
    CurrencyId: z.number().int().nullable().optional(),
    UnitCost: z.number().nullable().optional(), // read-only / system generated
    UID: z.string().optional(), // read-only / system generated
  })
  .passthrough();

export const ComparativeProfitAndLossStatementSchema = z
  .object({
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    IsComparative: z.boolean().optional(),
    IsBudget: z.boolean().optional(),
    ShowVariance: z.boolean().optional(),
    Periods: z.array(z.lazy(() => PeriodGroupingSchema)).optional(),
    SalesLines: z.array(z.lazy(() => ComparativeProfitAndLossStatementLineSchema)).optional(),
    CostOfSalesLines: z.array(z.lazy(() => ComparativeProfitAndLossStatementLineSchema)).optional(),
    GrossProfit: z.array(z.number().nullable()).optional(),
    OtherIncomeLines: z.array(z.lazy(() => ComparativeProfitAndLossStatementLineSchema)).optional(),
    ExpenseLines: z.array(z.lazy(() => ComparativeProfitAndLossStatementLineSchema)).optional(),
    NetProfitBeforeTax: z.array(z.number().nullable()).optional(),
    Tax: z.array(z.number()).optional(),
    NetProfitAfterTax: z.array(z.number().nullable()).optional(),
    SalesTotal: z.array(z.number()).optional(),
    CostOfSalesTotal: z.array(z.number()).optional(),
    OtherIncomeTotal: z.array(z.number()).optional(),
    ExpenseTotal: z.array(z.number()).optional(),
  })
  .passthrough();
export type ComparativeProfitAndLossStatement = z.infer<
  typeof ComparativeProfitAndLossStatementSchema
>;

export const ComparativeProfitAndLossStatementLineSchema = z.record(z.string(), z.unknown());
export type ComparativeProfitAndLossStatementLine = z.infer<
  typeof ComparativeProfitAndLossStatementLineSchema
>;

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

export const DetailedLedgerRequestModelSchema = z
  .object({
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    Inactive: z.boolean().optional(),
    Active: z.boolean().optional(),
    FromAccount: z.string().optional(),
    ToAccount: z.string().optional(),
    AccountCategorieIds: z.array(z.number().int()).optional(),
    TransactionTypes: z.array(z.number().int()).optional(),
    AnalysisTypeId1: z.number().int().nullable().optional(),
    AnalysisTypeId2: z.number().int().nullable().optional(),
    AnalysisTypeId3: z.number().int().nullable().optional(),
    ConsolidateAdditionalCost: z.boolean().nullable().optional(),
    IncludeNoTax: z.boolean().nullable().optional(),
  })
  .passthrough();
export type DetailedLedgerRequestModel = z.infer<typeof DetailedLedgerRequestModelSchema>;

export const DetailedLedgerTransactionSchema = z
  .object({
    ID: z.number().int().nullable().optional(),
    Date: z.string().nullable().optional(),
    TransactionTypeId: z.number().int().nullable().optional(),
    Reference: z.string().nullable().optional(),
    Description: z.string().nullable().optional(),
    AccountId: z.number().int().nullable().optional(),
    AccountDescription: z.string().nullable().optional(),
    ContraAccountId: z.number().int().nullable().optional(),
    ContraAccountDescription: z.string().nullable().optional(),
    Debit: z.number().int().nullable().optional(),
    Credit: z.number().int().nullable().optional(),
    TaxTypeId: z.number().int().nullable().optional(),
    TaxTypeName: z.string().nullable().optional(),
    Modified: z.string().nullable().optional(),
    AccountCategoryId: z.number().int().nullable().optional(),
    AccountCategoryDescription: z.string().nullable().optional(),
    TransactionTypeDescription: z.string().nullable().optional(),
    AnalysisCategoryId1: z.number().int().nullable().optional(),
    AnalysisCategoryId2: z.number().int().nullable().optional(),
    AnalysisCategoryId3: z.number().int().nullable().optional(),
  })
  .passthrough();
export type DetailedLedgerTransaction = z.infer<typeof DetailedLedgerTransactionSchema>;

export const FinancialYearSchema = z
  .object({
    ID: z.number().int().optional(),
    YearStart: z.string().optional(),
    YearEnd: z.string().optional(),
    IsCurrentYear: z.boolean().optional(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().optional(), // read-only / system generated
  })
  .passthrough();
export type FinancialYear = z.infer<typeof FinancialYearSchema>;

const IModelSchema = z
  .object({
    ID: z.number().int().optional(),
  })
  .passthrough();

export const JournalEntrySchema = z
  .object({
    ID: z.number().int().optional(),
    Date: z.string(),
    Effect: z.union([z.literal(1), z.literal(2)]).optional(),
    AccountId: z.number().int().optional(),
    Reference: z.string().optional(),
    Description: z.string().optional(),
    TaxTypeId: z.number().int().nullable().optional(),
    TaxPeriodId: z.number().int().nullable().optional(),
    Exclusive: z.number().optional(),
    Tax: z.number().optional(),
    Total: z.number().optional(),
    ContraAccountId: z.number().int().optional(),
    Memo: z.string().optional(),
    HasAttachments: z.boolean().optional(),
    AnalysisCategoryId1: z.number().int().nullable().optional(),
    AnalysisCategoryId2: z.number().int().nullable().optional(),
    AnalysisCategoryId3: z.number().int().nullable().optional(),
    Editable: z.boolean().optional(), // read-only / system generated
    Locked: z.boolean().optional(), // read-only / system generated
    Debit: z.number().optional(),
    Credit: z.number().optional(),
    BusinessId: z.number().int().nullable().optional(),
    PayRunId: z.number().int().nullable().optional(),
  })
  .passthrough();
export type JournalEntry = z.infer<typeof JournalEntrySchema>;

export const PeriodGroupingSchema = z.record(z.string(), z.unknown());
export type PeriodGrouping = z.infer<typeof PeriodGroupingSchema>;

export const RecurringJournalSchema = z
  .object({
    ID: z.number().int().optional(),
    Active: z.boolean().optional(),
    MarkAsReviewed: z.boolean().optional(),
    TemplateName: z.string().optional(),
    Created: z.string().optional(), // read-only / system generated
    Modified: z.string().nullable().optional(), // read-only / system generated
    RecurringJournalTransactions: z
      .array(z.lazy(() => RecurringJournalTransactionSchema))
      .optional(),
    RecurringJournalRecurrence: z.lazy(() => RecurringJournalRecurrenceSchema).optional(),
  })
  .passthrough();
export type RecurringJournal = z.infer<typeof RecurringJournalSchema>;

export const RecurringJournalRecurrenceSchema = z
  .object({
    ID: z.number().int(),
    FrequencyType: z.number().int(),
    FrequencyInterval: z.number().int(),
    FrequencyRelativeInterval: z.number().int(),
    FrequencyRecurrenceFactor: z.number().int(),
    FrequencyYearlyMonth: z.number().int(),
    RecurrenceRangeType: z.number().int(),
    StartDate: z.string(),
    NextRunDate: z.string().nullable().optional(), // read-only / system generated
    LastRunDate: z.string().nullable().optional(), // read-only / system generated
    EndDate: z.string().nullable().optional(),
    NumberOfOccurrences: z.number().int().nullable().optional(),
    Created: z.string().optional(), // read-only / system generated
    Modified: z.string().nullable().optional(), // read-only / system generated
  })
  .passthrough();
export type RecurringJournalRecurrence = z.infer<typeof RecurringJournalRecurrenceSchema>;

export const RecurringJournalRunScheduleRequestModelSchema = z
  .object({
    ID: z.number().int().optional(),
    RunScheduleAndUpdateNextRunDate: z.boolean().optional(),
  })
  .passthrough();
export type RecurringJournalRunScheduleRequestModel = z.infer<
  typeof RecurringJournalRunScheduleRequestModelSchema
>;

export const RecurringJournalTransactionSchema = z
  .object({
    ID: z.number().int().optional(),
    Effect: z.union([z.literal(1), z.literal(2)]).optional(),
    AccountId: z.number().int().optional(),
    Reference: z.string().optional(),
    Description: z.string().optional(),
    TaxTypeId: z.number().int().nullable().optional(),
    Exclusive: z.number().optional(),
    Tax: z.number().optional(),
    Total: z.number().optional(),
    ContraAccountId: z.number().int().optional(),
    Memo: z.string().optional(),
    AnalysisCategoryId1: z.number().int().nullable().optional(),
    AnalysisCategoryId2: z.number().int().nullable().optional(),
    AnalysisCategoryId3: z.number().int().nullable().optional(),
    Editable: z.boolean().optional(), // read-only / system generated
    Locked: z.boolean().optional(), // read-only / system generated
    Debit: z.number().optional(),
    Credit: z.number().optional(),
    Created: z.string().optional(), // read-only / system generated
    Modified: z.string().nullable().optional(), // read-only / system generated
  })
  .passthrough();
export type RecurringJournalTransaction = z.infer<typeof RecurringJournalTransactionSchema>;

export const ReportingGroupSchema = z
  .object({
    ID: z.number().int().nullable().optional(),
    ParentReportingGroupId: z.number().int().nullable().optional(),
    Description: z.string().nullable().optional(),
    AccountCategory: z.record(z.string(), z.unknown()).nullable().optional(),
  })
  .passthrough();
export type ReportingGroup = z.infer<typeof ReportingGroupSchema>;

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

const StorageInformationSchema = z
  .object({
    SizeUsed: z.number().int().optional(),
    MaxSizeAllowed: z.number().int().optional(),
  })
  .passthrough();

export const TakeOnAccountBalanceSchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string().optional(),
    GroupKey: z.number().int().optional(),
    Category: z.lazy(() => AccountCategorySchema).optional(),
    AccountType: z.number().int().optional(),
    LinkId: z.number().int().optional(),
    Debit: z.number().nullable().optional(),
    Credit: z.number().nullable().optional(),
    EntryUrl: z.string().optional(),
  })
  .passthrough();
export type TakeOnAccountBalance = z.infer<typeof TakeOnAccountBalanceSchema>;

export const TakeOnAccountDetailSchema = z
  .object({
    ID: z.number().int().optional(),
    TakeOnAccountGroups: z.array(z.lazy(() => TakeOnAccountGroupSchema)).optional(),
    TakeOnDate: z.string().optional(),
    TakeOnSuspenseAcountBalance: z.number().nullable().optional(),
  })
  .passthrough();
export type TakeOnAccountDetail = z.infer<typeof TakeOnAccountDetailSchema>;

export const TakeOnAccountGroupSchema = z
  .object({
    TakeOnAccountBalances: z.array(z.lazy(() => TakeOnAccountBalanceSchema)).optional(),
    Order: z.number().int().optional(),
    AddUrl: z.string().optional(),
    Name: z.string().optional(),
  })
  .passthrough();
export type TakeOnAccountGroup = z.infer<typeof TakeOnAccountGroupSchema>;

export const TakeOnBalanceAccountTypeSchema = z.record(z.string(), z.unknown());
export type TakeOnBalanceAccountType = z.infer<typeof TakeOnBalanceAccountTypeSchema>;

const TaxInvoiceSchema = z
  .object({
    ID: z.number().int().optional(),
    Date: z.string(),
    Inclusive: z.boolean().optional(),
    DiscountPercentage: z.number().optional(),
    TaxReference: z.string().optional(),
    DocumentNumber: z.string().optional(),
    Reference: z.string().optional(),
    Message: z.string().optional(),
    Discount: z.number().optional(),
    Exclusive: z.number().optional(),
    Tax: z.number().optional(),
    Rounding: z.number().optional(),
    Total: z.number().optional(),
    AmountDue: z.number().optional(),
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
    TaxPeriodId: z.number().int().nullable().optional(), // read-only / system generated
    Editable: z.boolean().optional(), // read-only / system generated
    HasAttachments: z.boolean().optional(), // read-only / system generated
    HasNotes: z.boolean().nullable().optional(), // read-only / system generated
    HasAnticipatedDate: z.boolean().nullable().optional(), // read-only / system generated
    HasSpecialCountryTax: z.boolean().optional(), // read-only / system generated
    AnticipatedDate: z.string().nullable().optional(), // read-only / system generated
    ExternalReference: z.string().optional(),
    UID: z.string().optional(), // read-only / system generated
    CustomerId: z.number().int(),
    CustomerName: z.string().optional(),
    Customer: z.lazy(() => CustomerSchema).optional(),
    SalesRepresentativeId: z.number().int().nullable().optional(),
    SalesRepresentative: z.lazy(() => SalesRepresentativeSchema).optional(),
    StatusId: z.number().int().nullable().optional(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().optional(), // read-only / system generated
    Customer_CurrencyId: z.number().int().nullable().optional(),
    Customer_ExchangeRate: z.number().nullable().optional(),
    DueDate: z.string(),
    FromDocument: z.string().optional(),
    FromDocumentId: z.number().int().optional(), // read-only / system generated
    FromDocumentTypeId: z.number().int().nullable().optional(), // read-only / system generated
    Status: z.string().optional(), // read-only / system generated
    AllowOnlinePayment: z.boolean().nullable().optional(),
    Paid: z.boolean().nullable().optional(), // read-only / system generated
    Locked: z.boolean().optional(), // read-only / system generated
    Lines: z.array(z.lazy(() => CommercialDocumentLineSchema)).optional(),
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

export class AccountPaymentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /AccountPayment/Get` [GET-AccountPayment-Get] — Gets a list of Account Payments. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof AccountPaymentSchema>>> {
    return this.executor.request({
      resource: "AccountPayment",
      operation: "Get",
      method: "GET",
      path: "/AccountPayment/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(AccountPaymentSchema),
      options,
    });
  }

  /** Async page iterator for `GET /AccountPayment/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof AccountPaymentSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /AccountPayment/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof AccountPaymentSchema>, void, undefined> {
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

  /** `POST /AccountPayment/Save` [POST-AccountPayment-Save] — Saves the specified Account Payment. */
  public async save(
    input: z.infer<typeof AccountPaymentSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AccountPaymentSchema>> {
    return this.executor.request({
      resource: "AccountPayment",
      operation: "Save",
      method: "POST",
      path: "/AccountPayment/Save",
      body: input,
      requestSchema: AccountPaymentSchema,
      responseSchema: AccountPaymentSchema,
      isFinancialMutation: true,
      options,
    });
  }
}

export class AccountReceiptService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /AccountReceipt/Get` [GET-AccountReceipt-Get] — Gets a list of Account Receipts. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof AccountReceiptSchema>>> {
    return this.executor.request({
      resource: "AccountReceipt",
      operation: "Get",
      method: "GET",
      path: "/AccountReceipt/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(AccountReceiptSchema),
      options,
    });
  }

  /** Async page iterator for `GET /AccountReceipt/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof AccountReceiptSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /AccountReceipt/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof AccountReceiptSchema>, void, undefined> {
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

  /** `POST /AccountReceipt/Save` [POST-AccountReceipt-Save] — Saves the specified Account Receipt. */
  public async save(
    input: z.infer<typeof AccountReceiptSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof TaxInvoiceSchema>> {
    return this.executor.request({
      resource: "AccountReceipt",
      operation: "Save",
      method: "POST",
      path: "/AccountReceipt/Save",
      body: input,
      requestSchema: AccountReceiptSchema,
      responseSchema: TaxInvoiceSchema,
      isFinancialMutation: true,
      options,
    });
  }
}

export class AccountNoteAttachmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /AccountNoteAttachment/Save` [POST-AccountNoteAttachment-Save] — Saves the Attachment. The file data is transmitted as a multipart/form-data POST. In the query string of the Url or a parameter in the form post, a AccountNoteId is required. An AccountNoteId is the ID of the AccountNote that this attachment must be linked to. This is Required and is not optional. */
  public async save(
    upload: {
      readonly AccountNoteId: number | string;
      readonly file: Blob | Uint8Array | string;
      readonly fileName?: string | undefined;
      readonly fieldName?: string | undefined;
    },
    options?: RequestOptions,
  ): Promise<unknown> {
    const formData = new FormData();
    formData.set("AccountNoteId", String(upload.AccountNoteId));
    const blob =
      upload.file instanceof Blob
        ? upload.file
        : new Blob([typeof upload.file === "string" ? upload.file : new Uint8Array(upload.file)]);
    formData.set(upload.fieldName ?? "file", blob, upload.fileName ?? "attachment.bin");
    return this.executor.request({
      resource: "AccountNoteAttachment",
      operation: "Save",
      method: "POST",
      path: "/AccountNoteAttachment/Save",
      query: buildQueryWithOData({ AccountNoteId: upload.AccountNoteId }, options?.odata),
      formData,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /AccountNoteAttachment/Get/{id}` [GET-AccountNoteAttachment-Get-id] — Gets the specified Attachment based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AttachmentSchema>>> {
    return this.executor.request({
      resource: "AccountNoteAttachment",
      operation: "GetById",
      method: "GET",
      path: `/AccountNoteAttachment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(AttachmentSchema),
      options,
    });
  }

  /** `GET /AccountNoteAttachment/Download/{id}` [GET-AccountNoteAttachment-Download-id] — Downloads the specified Attachment based on file identifier (Guid). */
  public async download(id: string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "AccountNoteAttachment",
      operation: "Download",
      method: "GET",
      path: `/AccountNoteAttachment/Download/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }

  /** `GET /AccountNoteAttachment/GetCompanyStorageInformation` [GET-AccountNoteAttachment-GetCompanyStorageInformation] — Gets the Company Storage Information. */
  public async getCompanyStorageInformation(
    options?: RequestOptions,
  ): Promise<z.infer<typeof StorageInformationSchema>> {
    return this.executor.request({
      resource: "AccountNoteAttachment",
      operation: "GetCompanyStorageInformation",
      method: "GET",
      path: "/AccountNoteAttachment/GetCompanyStorageInformation",
      responseSchema: StorageInformationSchema,
      options,
    });
  }

  /** `DELETE /AccountNoteAttachment/Delete/{id}` [DELETE-AccountNoteAttachment-Delete-id] — Deletes the specified Attachment based on file identifier (Guid). */
  public async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "AccountNoteAttachment",
      operation: "Delete",
      method: "DELETE",
      path: `/AccountNoteAttachment/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /AccountNoteAttachment/DeleteAll/{id}` [DELETE-AccountNoteAttachment-DeleteAll-id] — Deletes all Attachments based on the identifier. */
  public async deleteAll(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "AccountNoteAttachment",
      operation: "DeleteAll",
      method: "DELETE",
      path: `/AccountNoteAttachment/DeleteAll/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /AccountNoteAttachment/Validate` [POST-AccountNoteAttachment-Validate] — Validates the specified Entity. */
  public async validate(
    input: z.infer<typeof IModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "AccountNoteAttachment",
      operation: "Validate",
      method: "POST",
      path: "/AccountNoteAttachment/Validate",
      body: input,
      requestSchema: IModelSchema,
      responseType: "empty",
      options,
    });
  }
}

export class JournalEntryService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /JournalEntry/Get` [GET-JournalEntry-Get] — Gets a list of Journal Entries. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof JournalEntrySchema>>> {
    return this.executor.request({
      resource: "JournalEntry",
      operation: "Get",
      method: "GET",
      path: "/JournalEntry/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(JournalEntrySchema),
      options,
    });
  }

  /** Async page iterator for `GET /JournalEntry/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof JournalEntrySchema>>, void, undefined> {
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

  /** Async item iterator for `GET /JournalEntry/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof JournalEntrySchema>, void, undefined> {
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

  /** `GET /JournalEntry/Get/{id}` [GET-JournalEntry-Get-id] — Gets a specific Journal Entry based on the identifier sent through. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof JournalEntrySchema>> {
    return this.executor.request({
      resource: "JournalEntry",
      operation: "GetById",
      method: "GET",
      path: `/JournalEntry/Get/${encodeURIComponent(String(id))}`,
      responseSchema: JournalEntrySchema,
      options,
    });
  }

  /** `DELETE /JournalEntry/DeleteOpenBatchJournalTransaction/{id}` [DELETE-JournalEntry-DeleteOpenBatchJournalTransaction-id] — No documentation available. */
  public async deleteOpenBatchJournalTransaction(
    id: number | string,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "JournalEntry",
      operation: "DeleteOpenBatchJournalTransaction",
      method: "DELETE",
      path: `/JournalEntry/DeleteOpenBatchJournalTransaction/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /JournalEntry/Save` [POST-JournalEntry-Save] — Saves the specified Journal Entry. */
  public async save(
    input: z.infer<typeof JournalEntrySchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof JournalEntrySchema>> {
    return this.executor.request({
      resource: "JournalEntry",
      operation: "Save",
      method: "POST",
      path: "/JournalEntry/Save",
      body: input,
      requestSchema: JournalEntrySchema,
      responseSchema: JournalEntrySchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /JournalEntry/SaveBatch` [POST-JournalEntry-SaveBatch] — Saves a batch of Journal Entries. */
  public async saveBatch(
    input: readonly z.infer<typeof JournalEntrySchema>[],
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof JournalEntrySchema>>> {
    return this.executor.request({
      resource: "JournalEntry",
      operation: "SaveBatch",
      method: "POST",
      path: "/JournalEntry/SaveBatch",
      body: input,
      requestSchema: z.array(JournalEntrySchema),
      responseSchema: z.array(JournalEntrySchema),
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /JournalEntry/Calculate` [POST-JournalEntry-Calculate] — Calculates the totals of the Journal Entry sent through. */
  public async calculate(
    input: z.infer<typeof JournalEntrySchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof JournalEntrySchema>> {
    return this.executor.request({
      resource: "JournalEntry",
      operation: "Calculate",
      method: "POST",
      path: "/JournalEntry/Calculate",
      body: input,
      requestSchema: JournalEntrySchema,
      responseSchema: JournalEntrySchema,
      options,
    });
  }

  /** `DELETE /JournalEntry/Delete/{id}` [DELETE-JournalEntry-Delete-id] — Deletes the specified Journal Entry. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "JournalEntry",
      operation: "Delete",
      method: "DELETE",
      path: `/JournalEntry/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /JournalEntry/DeleteBatch` [POST-JournalEntry-DeleteBatch] — Deletes the batch of Journal Entry. */
  public async deleteBatch(
    input: readonly (number | string | Record<string, unknown>)[],
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "JournalEntry",
      operation: "DeleteBatch",
      method: "POST",
      path: "/JournalEntry/DeleteBatch",
      body: input,
      requestSchema: z.array(z.union([z.number(), z.string(), z.record(z.string(), z.unknown())])),
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class RecurringJournalService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /RecurringJournal/Get/{id}` [GET-RecurringJournal-Get-id] — Gets a specific Recurring Journal based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof RecurringJournalSchema>> {
    return this.executor.request({
      resource: "RecurringJournal",
      operation: "GetById",
      method: "GET",
      path: `/RecurringJournal/Get/${encodeURIComponent(String(id))}`,
      responseSchema: RecurringJournalSchema,
      options,
    });
  }

  /** `GET /RecurringJournal/Get` [GET-RecurringJournal-Get_includeDetail] — Gets a list of Recurring Journals. */
  public async list(
    options?: RequestOptions & { readonly includeDetail?: boolean | undefined },
  ): Promise<SagePage<z.infer<typeof RecurringJournalSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.includeDetail !== undefined) {
      baseQuery["includeDetail"] = options.includeDetail;
    }
    return this.executor.request({
      resource: "RecurringJournal",
      operation: "Get",
      method: "GET",
      path: "/RecurringJournal/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(RecurringJournalSchema),
      options,
    });
  }

  /** Async page iterator for `GET /RecurringJournal/Get`. */
  public pages(
    options?: RequestOptions & { readonly includeDetail?: boolean | undefined } & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof RecurringJournalSchema>>,
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

  /** Async item iterator for `GET /RecurringJournal/Get`. */
  public iterate(
    options?: RequestOptions & { readonly includeDetail?: boolean | undefined } & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof RecurringJournalSchema>, void, undefined> {
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

  /** `POST /RecurringJournal/Save` [POST-RecurringJournal-Save] — Saves the specified Recurring Journal. */
  public async save(
    input: z.infer<typeof RecurringJournalSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof RecurringJournalSchema>> {
    return this.executor.request({
      resource: "RecurringJournal",
      operation: "Save",
      method: "POST",
      path: "/RecurringJournal/Save",
      body: input,
      requestSchema: RecurringJournalSchema,
      responseSchema: RecurringJournalSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /RecurringJournal/RunRecurrenceNow` [POST-RecurringJournal-RunRecurrenceNow] — Runs the active Recurring Journal's Recurrence and creates the Journal Entries and Open Batch Journals if valid. */
  public async runRecurrenceNow(
    input: z.infer<typeof RecurringJournalRunScheduleRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof RecurringJournalSchema>> {
    return this.executor.request({
      resource: "RecurringJournal",
      operation: "RunRecurrenceNow",
      method: "POST",
      path: "/RecurringJournal/RunRecurrenceNow",
      body: input,
      requestSchema: RecurringJournalRunScheduleRequestModelSchema,
      responseSchema: RecurringJournalSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /RecurringJournal/SkipRecurrenceNextRunDate/{id}` [GET-RecurringJournal-SkipRecurrenceNextRunDate-id] — Skips the current Next Run Date of the Recurring Journal Recurrence without processing new Journal Entries or Open Batch Journals. */
  public async skipRecurrenceNextRunDate(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof RecurringJournalSchema>> {
    return this.executor.request({
      resource: "RecurringJournal",
      operation: "SkipRecurrenceNextRunDate",
      method: "GET",
      path: `/RecurringJournal/SkipRecurrenceNextRunDate/${encodeURIComponent(String(id))}`,
      responseSchema: RecurringJournalSchema,
      options,
    });
  }

  /** `DELETE /RecurringJournal/Delete/{id}` [DELETE-RecurringJournal-Delete-id] — Deletes the specified Recurring Journal. */
  public async delete(id: number | string, options?: RequestOptions): Promise<unknown> {
    return this.executor.request({
      resource: "RecurringJournal",
      operation: "Delete",
      method: "DELETE",
      path: `/RecurringJournal/Delete/${encodeURIComponent(String(id))}`,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /RecurringJournal/DeleteBatch` [POST-RecurringJournal-DeleteBatch] — Deletes the batch of Recurring Journal Entries. */
  public async deleteBatch(
    input: readonly (number | string | Record<string, unknown>)[],
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "RecurringJournal",
      operation: "DeleteBatch",
      method: "POST",
      path: "/RecurringJournal/DeleteBatch",
      body: input,
      requestSchema: z.array(z.union([z.number(), z.string(), z.record(z.string(), z.unknown())])),
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class DetailedLedgerTransactionService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /DetailedLedgerTransaction/Get` [POST-DetailedLedgerTransaction-Get] — Retrieves a collection of Detailed Ledger Transactions */
  public async get(
    input: z.infer<typeof DetailedLedgerRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof DetailedLedgerTransactionSchema>>> {
    return this.executor.request({
      resource: "DetailedLedgerTransaction",
      operation: "Get",
      method: "POST",
      path: "/DetailedLedgerTransaction/Get",
      body: input,
      requestSchema: DetailedLedgerRequestModelSchema,
      responseSchema: z.array(DetailedLedgerTransactionSchema),
      options,
    });
  }
}

export class FinancialYearService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /FinancialYear/Get` [GET-FinancialYear-Get] — Gets a list of Financial Years. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof FinancialYearSchema>>> {
    return this.executor.request({
      resource: "FinancialYear",
      operation: "Get",
      method: "GET",
      path: "/FinancialYear/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(FinancialYearSchema),
      options,
    });
  }

  /** Async page iterator for `GET /FinancialYear/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof FinancialYearSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /FinancialYear/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof FinancialYearSchema>, void, undefined> {
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

  /** `GET /FinancialYear/Get/{id}` [GET-FinancialYear-Get-id] — Gets a specific Financial Year based on the identifier sent through. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof FinancialYearSchema>> {
    return this.executor.request({
      resource: "FinancialYear",
      operation: "GetById",
      method: "GET",
      path: `/FinancialYear/Get/${encodeURIComponent(String(id))}`,
      responseSchema: FinancialYearSchema,
      options,
    });
  }

  /** `GET /FinancialYear/GetCurrent` [GET-FinancialYear-GetCurrent] — Gets the current Financial Year. */
  public async getCurrent(options?: RequestOptions): Promise<z.infer<typeof FinancialYearSchema>> {
    return this.executor.request({
      resource: "FinancialYear",
      operation: "GetCurrent",
      method: "GET",
      path: "/FinancialYear/GetCurrent",
      responseSchema: FinancialYearSchema,
      options,
    });
  }

  /** `POST /FinancialYear/Save` [POST-FinancialYear-Save] — Saves the specified Financial Year. */
  public async save(
    input: z.infer<typeof FinancialYearSchema>,
    options?: RequestOptions,
  ): Promise<unknown> {
    return this.executor.request({
      resource: "FinancialYear",
      operation: "Save",
      method: "POST",
      path: "/FinancialYear/Save",
      body: input,
      requestSchema: FinancialYearSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /FinancialYear/AddNextFinancialYear` [POST-FinancialYear-AddNextFinancialYear] — Adds the next Financial Year after the provided Financial Year if possible. */
  public async addNextFinancialYear(
    input: z.infer<typeof FinancialYearSchema>,
    options?: RequestOptions,
  ): Promise<unknown> {
    return this.executor.request({
      resource: "FinancialYear",
      operation: "AddNextFinancialYear",
      method: "POST",
      path: "/FinancialYear/AddNextFinancialYear",
      body: input,
      requestSchema: FinancialYearSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /FinancialYear/Delete/{id}` [DELETE-FinancialYear-Delete-id] — Deletes the specified Financial Year based on the identifier. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "FinancialYear",
      operation: "Delete",
      method: "DELETE",
      path: `/FinancialYear/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class BudgetService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /Budget/Get` [GET-Budget-Get_includeDetail] — Gets a list of Budgets. */
  public async list(
    options?: RequestOptions & { readonly includeDetail?: boolean | undefined },
  ): Promise<SagePage<z.infer<typeof BudgetSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.includeDetail !== undefined) {
      baseQuery["includeDetail"] = options.includeDetail;
    }
    return this.executor.request({
      resource: "Budget",
      operation: "Get",
      method: "GET",
      path: "/Budget/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(BudgetSchema),
      options,
    });
  }

  /** Async page iterator for `GET /Budget/Get`. */
  public pages(
    options?: RequestOptions & { readonly includeDetail?: boolean | undefined } & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof BudgetSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /Budget/Get`. */
  public iterate(
    options?: RequestOptions & { readonly includeDetail?: boolean | undefined } & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof BudgetSchema>, void, undefined> {
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

  /** `GET /Budget/Get/{id}` [GET-Budget-Get-id] — Gets the specified identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof BudgetSchema>> {
    return this.executor.request({
      resource: "Budget",
      operation: "GetById",
      method: "GET",
      path: `/Budget/Get/${encodeURIComponent(String(id))}`,
      responseSchema: BudgetSchema,
      options,
    });
  }

  /** `GET /Budget/GetBudgetReport/{id}` [GET-Budget-GetBudgetReport-id_removeZeroValues] — Gets the budget report. */
  public async getBudgetReport(
    id: number | string,
    options?: RequestOptions & { readonly removeZeroValues?: boolean | undefined },
  ): Promise<z.infer<typeof ComparativeProfitAndLossStatementSchema>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.removeZeroValues !== undefined) {
      baseQuery["removeZeroValues"] = options.removeZeroValues;
    }
    return this.executor.request({
      resource: "Budget",
      operation: "GetBudgetReport",
      method: "GET",
      path: `/Budget/GetBudgetReport/${encodeURIComponent(String(id))}`,
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: ComparativeProfitAndLossStatementSchema,
      options,
    });
  }

  /** `POST /Budget/GetDefaultBudget` [POST-Budget-GetDefaultBudget] — Gets the default Budget. */
  public async getDefaultBudget(
    input: z.infer<typeof BudgetRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof BudgetSchema>> {
    return this.executor.request({
      resource: "Budget",
      operation: "GetDefaultBudget",
      method: "POST",
      path: "/Budget/GetDefaultBudget",
      body: input,
      requestSchema: BudgetRequestModelSchema,
      responseSchema: BudgetSchema,
      options,
    });
  }

  /** `POST /Budget/Save` [POST-Budget-Save] — Saves the specified Budget. */
  public async save(
    input: z.infer<typeof BudgetSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof BudgetSchema>> {
    return this.executor.request({
      resource: "Budget",
      operation: "Save",
      method: "POST",
      path: "/Budget/Save",
      body: input,
      requestSchema: BudgetSchema,
      responseSchema: BudgetSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /Budget/Delete/{id}` [DELETE-Budget-Delete-id] — Deletes the specified Budget. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "Budget",
      operation: "Delete",
      method: "DELETE",
      path: `/Budget/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /Budget/Validate` [POST-Budget-Validate] — Validates the specified Budget. */
  public async validate(
    input: z.infer<typeof BudgetSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "Budget",
      operation: "Validate",
      method: "POST",
      path: "/Budget/Validate",
      body: input,
      requestSchema: BudgetSchema,
      responseType: "empty",
      options,
    });
  }
}

export class TakeOnBalanceService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /TakeOnBalance/Get` [POST-TakeOnBalance-Get] — Gets the specified Take On Account Detail based on the Take On Date. */
  public async get(
    input: string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof TakeOnAccountDetailSchema>> {
    return this.executor.request({
      resource: "TakeOnBalance",
      operation: "Get",
      method: "POST",
      path: "/TakeOnBalance/Get",
      body: input,
      requestSchema: z.string(),
      responseSchema: TakeOnAccountDetailSchema,
      options,
    });
  }

  /** `POST /TakeOnBalance/Save` [POST-TakeOnBalance-Save] — Saves the specified Take On Account Detail. */
  public async save(
    input: z.infer<typeof TakeOnAccountDetailSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof TakeOnAccountDetailSchema>> {
    return this.executor.request({
      resource: "TakeOnBalance",
      operation: "Save",
      method: "POST",
      path: "/TakeOnBalance/Save",
      body: input,
      requestSchema: TakeOnAccountDetailSchema,
      responseSchema: TakeOnAccountDetailSchema,
      isFinancialMutation: true,
      options,
    });
  }
}

export class AnalysisCategoryService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /AnalysisCategory/Get` [GET-AnalysisCategory-Get] — Gets a list of Analysis Categories. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof AnalysisCategorySchema>>> {
    return this.executor.request({
      resource: "AnalysisCategory",
      operation: "Get",
      method: "GET",
      path: "/AnalysisCategory/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(AnalysisCategorySchema),
      options,
    });
  }

  /** Async page iterator for `GET /AnalysisCategory/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof AnalysisCategorySchema>>,
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

  /** Async item iterator for `GET /AnalysisCategory/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof AnalysisCategorySchema>, void, undefined> {
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

  /** `GET /AnalysisCategory/Get/{id}` [GET-AnalysisCategory-Get-id] — Gets the specified Analysis Category based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AnalysisCategorySchema>> {
    return this.executor.request({
      resource: "AnalysisCategory",
      operation: "GetById",
      method: "GET",
      path: `/AnalysisCategory/Get/${encodeURIComponent(String(id))}`,
      responseSchema: AnalysisCategorySchema,
      options,
    });
  }

  /** `DELETE /AnalysisCategory/Delete/{id}` [DELETE-AnalysisCategory-Delete-id] — Deletes the specified Analysis Category. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "AnalysisCategory",
      operation: "Delete",
      method: "DELETE",
      path: `/AnalysisCategory/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /AnalysisCategory/Save` [POST-AnalysisCategory-Save] — Saves the specified Analysis Category. */
  public async save(
    input: z.infer<typeof AnalysisCategorySchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AnalysisCategorySchema>> {
    return this.executor.request({
      resource: "AnalysisCategory",
      operation: "Save",
      method: "POST",
      path: "/AnalysisCategory/Save",
      body: input,
      requestSchema: AnalysisCategorySchema,
      responseSchema: AnalysisCategorySchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /AnalysisCategory/AllowDelete` [POST-AnalysisCategory-AllowDelete] — Confirms if Delete is Allowed. */
  public async allowDelete(
    input: z.infer<typeof AnalysisCategorySchema>,
    options?: RequestOptions,
  ): Promise<boolean> {
    return this.executor.request({
      resource: "AnalysisCategory",
      operation: "AllowDelete",
      method: "POST",
      path: "/AnalysisCategory/AllowDelete",
      body: input,
      requestSchema: AnalysisCategorySchema,
      responseSchema: z.boolean(),
      options,
    });
  }
}

export class AnalysisTypeService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /AnalysisType/Get` [GET-AnalysisType-Get] — Retrieves a collection of Analysis Types. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof AnalysisTypeSchema>>> {
    return this.executor.request({
      resource: "AnalysisType",
      operation: "Get",
      method: "GET",
      path: "/AnalysisType/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(AnalysisTypeSchema),
      options,
    });
  }

  /** Async page iterator for `GET /AnalysisType/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof AnalysisTypeSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /AnalysisType/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof AnalysisTypeSchema>, void, undefined> {
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

  /** `GET /AnalysisType/Get/{id}` [GET-AnalysisType-Get-id] — Retrieves a specific Analysis Type. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AnalysisTypeSchema>> {
    return this.executor.request({
      resource: "AnalysisType",
      operation: "GetById",
      method: "GET",
      path: `/AnalysisType/Get/${encodeURIComponent(String(id))}`,
      responseSchema: AnalysisTypeSchema,
      options,
    });
  }

  /** `DELETE /AnalysisType/Delete/{id}` [DELETE-AnalysisType-Delete-id] — Deletes a specified Analysis Type. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "AnalysisType",
      operation: "Delete",
      method: "DELETE",
      path: `/AnalysisType/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /AnalysisType/Save` [POST-AnalysisType-Save] — Saves a specified Analysis Type. */
  public async save(
    input: z.infer<typeof AnalysisTypeSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AnalysisTypeSchema>> {
    return this.executor.request({
      resource: "AnalysisType",
      operation: "Save",
      method: "POST",
      path: "/AnalysisType/Save",
      body: input,
      requestSchema: AnalysisTypeSchema,
      responseSchema: AnalysisTypeSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /AnalysisType/SaveBatch` [POST-AnalysisType-SaveBatch] — Saves a collection of Analysis Types. */
  public async saveBatch(
    input: readonly z.infer<typeof AnalysisTypeSchema>[],
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AnalysisTypeSchema>>> {
    return this.executor.request({
      resource: "AnalysisType",
      operation: "SaveBatch",
      method: "POST",
      path: "/AnalysisType/SaveBatch",
      body: input,
      requestSchema: z.array(AnalysisTypeSchema),
      responseSchema: z.array(AnalysisTypeSchema),
      isFinancialMutation: true,
      options,
    });
  }
}

export class ReportingGroupService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /ReportingGroup/Get` [GET-ReportingGroup-Get] — Gets a list of Reporting Groups. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof ReportingGroupSchema>>> {
    return this.executor.request({
      resource: "ReportingGroup",
      operation: "Get",
      method: "GET",
      path: "/ReportingGroup/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(ReportingGroupSchema),
      options,
    });
  }

  /** Async page iterator for `GET /ReportingGroup/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof ReportingGroupSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /ReportingGroup/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof ReportingGroupSchema>, void, undefined> {
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

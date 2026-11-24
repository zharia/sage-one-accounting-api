/**
 * AUTO-GENERATED from contracts/sage-api/endpoint-catalogue.json (M005).
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

const AccountSchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string().optional(),
    Category: z.lazy(() => AccountCategorySchema).optional(),
    Active: z.boolean().optional(),
    Balance: z.number().optional(), // read-only / system generated
    Description: z.string().optional(),
    ReportingGroupId: z.number().int().nullable().optional(),
    UnallocatedAccount: z.boolean().optional(), // read-only / system generated
    IsTaxLocked: z.boolean().optional(), // read-only / system generated
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().optional(), // read-only / system generated
    AccountType: z.number().int().optional(), // read-only / system generated
    HasActivity: z.boolean().optional(), // read-only / system generated
    DefaultTaxTypeId: z.number().int().nullable().optional(),
    DefaultTaxType: z.lazy(() => TaxTypeSchema).optional(),
  })
  .passthrough();

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

export const AgeingTransactionSchema = z.record(z.string(), z.unknown());
export type AgeingTransaction = z.infer<typeof AgeingTransactionSchema>;

const AttachmentSchema = z
  .object({
    Name: z.string(),
    Size: z.number().int().optional(),
    AttachmentUID: z.string().optional(),
    Data: z.string().optional(),
  })
  .passthrough();

export const BankAccountSchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string().optional(),
    BankName: z.string().optional(),
    AccountNumber: z.string().optional(),
    BranchName: z.string().optional(),
    BranchNumber: z.string().optional(),
    Category: z.lazy(() => BankAccountCategorySchema).optional(),
    Active: z.boolean().optional(),
    Default: z.boolean().optional(),
    Balance: z.number().optional(), // read-only / system generated
    Description: z.string().optional(),
    BankFeedAccount: z.lazy(() => BankFeedAccountSchema).optional(),
    LastTransactionDate: z.string().nullable().optional(),
    LastImportDate: z.string().nullable().optional(),
    HasTransactionsWaitingForReview: z.boolean().optional(),
    HasActivity: z.boolean().optional(), // read-only / system generated
    DefaultPaymentMethodId: z.number().int().nullable().optional(),
    PaymentMethod: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().nullable().optional(), // read-only / system generated
    CurrencyId: z.number().int().nullable().optional(),
  })
  .passthrough();
export type BankAccount = z.infer<typeof BankAccountSchema>;

export const BankAccountCategorySchema = z
  .object({
    Description: z.string().optional(),
    ID: z.number().int(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().nullable().optional(), // read-only / system generated
  })
  .passthrough();
export type BankAccountCategory = z.infer<typeof BankAccountCategorySchema>;

export const BankFeedAccountSchema = z
  .object({
    ID: z.number().int().optional(),
    BankFeedAccountGroupId: z.number().int().optional(),
    BankFeedAccountGroup: z.lazy(() => BankFeedAccountGroupSchema).optional(),
    Description: z.string().optional(),
    Identifier: z.string().optional(),
    LastRefreshDate: z.string().nullable().optional(),
    FirstImportDate: z.string().nullable().optional(),
    Balance: z.number().nullable().optional(),
    BankAccountId: z.number().int().nullable().optional(),
    BankAccountName: z.string().optional(),
    LastRefreshStatusId: z.number().int().optional(),
  })
  .passthrough();
export type BankFeedAccount = z.infer<typeof BankFeedAccountSchema>;

export const BankFeedAccountGroupSchema = z
  .object({
    ID: z.number().int().optional(),
    BankFeedProviderId: z.number().int().optional(),
    BankFeedProviderTypeId: z.number().int().optional(),
    Description: z.string().optional(),
    Identifier: z.string().optional(),
    RequiresAdditionalAuthentication: z.boolean().optional(),
    LastRefreshStatusId: z.number().int().optional(),
  })
  .passthrough();
export type BankFeedAccountGroup = z.infer<typeof BankFeedAccountGroupSchema>;

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

const EmailRequestModelSchema = z
  .object({
    ID: z.number().int().optional(),
    EmailAddress: z.string(),
    CCAddress: z.string().optional(),
    BCCAddress: z.string().optional(),
    Subject: z.string().optional(),
    Message: z.string().optional(),
    Attachments: z.array(z.record(z.string(), z.string())).optional(),
  })
  .passthrough();

const IBigModelSchema = z
  .object({
    ID: z.number().int().optional(),
  })
  .passthrough();

export const OutstandingSupplierDocumentSchema = z
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
    SupplierId: z.number().int(),
    SupplierName: z.string().optional(),
    Supplier: z.lazy(() => SupplierSchema).optional(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().optional(), // read-only / system generated
    StatusId: z.number().int().nullable().optional(),
    Supplier_CurrencyId: z.number().int().nullable().optional(),
    Supplier_ExchangeRate: z.number().nullable().optional(),
    DocumentTypeId: z.number().int().optional(),
    DueDate: z.string().nullable().optional(),
    ExpectedPaymentDate: z.string().nullable().optional(),
    Lines: z.array(z.lazy(() => CommercialDocumentLineSchema)).optional(),
  })
  .passthrough();
export type OutstandingSupplierDocument = z.infer<typeof OutstandingSupplierDocumentSchema>;

export const OutstandingSupplierDocumentRequestModelSchema = z
  .object({
    SupplierId: z.number().int().optional(),
  })
  .passthrough();
export type OutstandingSupplierDocumentRequestModel = z.infer<
  typeof OutstandingSupplierDocumentRequestModelSchema
>;

export const PurchaseOrderSchema = z
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
    SupplierId: z.number().int(),
    SupplierName: z.string().optional(),
    Supplier: z.lazy(() => SupplierSchema).optional(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().optional(), // read-only / system generated
    StatusId: z.number().int().nullable().optional(),
    Supplier_CurrencyId: z.number().int().nullable().optional(),
    Supplier_ExchangeRate: z.number().nullable().optional(),
    DeliveryDate: z.string(),
    Status: z.string().optional(),
    Lines: z.array(z.lazy(() => CommercialDocumentLineSchema)).optional(),
  })
  .passthrough();
export type PurchaseOrder = z.infer<typeof PurchaseOrderSchema>;

const StorageInformationSchema = z
  .object({
    SizeUsed: z.number().int().optional(),
    MaxSizeAllowed: z.number().int().optional(),
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

export const SupplierAdjustmentSchema = z
  .object({
    ID: z.number().int().optional(),
    Date: z.string(),
    SupplierId: z.number().int().optional(),
    DocumentNumber: z.string().optional(),
    Reference: z.string().optional(),
    Description: z.string().optional(),
    TaxTypeId: z.number().int().optional(),
    Exclusive: z.number().optional(),
    Tax: z.number().optional(),
    Total: z.number().optional(),
    ContraAccountId: z.number().int().optional(),
    Memo: z.string().optional(),
    HasAttachments: z.boolean().optional(),
    Supplier: z.lazy(() => SupplierSchema).optional(),
    AccountName: z.string().optional(),
    AnalysisCategoryId1: z.number().int().nullable().optional(),
    AnalysisCategoryId2: z.number().int().nullable().optional(),
    AnalysisCategoryId3: z.number().int().nullable().optional(),
    Account: z.lazy(() => AccountSchema).optional(), // read-only / system generated
    Locked: z.boolean().optional(), // read-only / system generated
    TaxPeriodId: z.number().int().nullable().optional(), // read-only / system generated
    TotalOutstanding: z.number().nullable().optional(), // read-only / system generated
    Inclusive: z.boolean().optional(),
    Supplier_CurrencyId: z.number().int().nullable().optional(),
    Supplier_ExchangeRate: z.number().nullable().optional(),
  })
  .passthrough();
export type SupplierAdjustment = z.infer<typeof SupplierAdjustmentSchema>;

export const SupplierAgeingSchema = z
  .object({
    Current: z.number().optional(),
    Days120Plus: z.number().optional(),
    Days30: z.number().optional(),
    Days60: z.number().optional(),
    Days90: z.number().optional(),
    Total: z.number().optional(),
    Date: z.string().optional(),
    Supplier: z.lazy(() => SupplierSchema).optional(),
    AgeingTransactions: z.array(z.lazy(() => AgeingTransactionSchema)).optional(),
  })
  .passthrough();
export type SupplierAgeing = z.infer<typeof SupplierAgeingSchema>;

export const SupplierAgeingRequestModelSchema = z
  .object({
    SupplierId: z.number().int().optional(),
    ToDate: z.string().optional(),
    Summary: z.boolean().optional(),
    AgeingPeriod: z.number().int().optional(),
    FromSupplier: z.string().optional(),
    ToSupplier: z.string().optional(),
    FromCategory: z.string().optional(),
    ToCategory: z.string().optional(),
    IncludeActive: z.boolean().optional(),
    IncludeInactive: z.boolean().optional(),
    BasedOnDueDate: z.boolean().optional(),
    ExcludeZeroBalance: z.boolean().optional(),
    UseForeignCurrency: z.boolean().optional(),
  })
  .passthrough();
export type SupplierAgeingRequestModel = z.infer<typeof SupplierAgeingRequestModelSchema>;

const SupplierCategorySchema = z
  .object({
    Description: z.string().optional(),
    ID: z.number().int(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().nullable().optional(), // read-only / system generated
  })
  .passthrough();

export const SupplierInvoiceSchema = z
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
    SupplierId: z.number().int(),
    SupplierName: z.string().optional(),
    Supplier: z.lazy(() => SupplierSchema).optional(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().optional(), // read-only / system generated
    StatusId: z.number().int().nullable().optional(),
    Supplier_CurrencyId: z.number().int().nullable().optional(),
    Supplier_ExchangeRate: z.number().nullable().optional(),
    DueDate: z.string(),
    Paid: z.boolean().nullable().optional(), // read-only / system generated
    Status: z.string().optional(), // read-only / system generated
    FromDocument: z.string().optional(),
    Locked: z.boolean().optional(), // read-only / system generated
    HasAdditionalCost: z.boolean().optional(), // read-only / system generated
    Lines: z.array(z.lazy(() => CommercialDocumentLineSchema)).optional(),
  })
  .passthrough();
export type SupplierInvoice = z.infer<typeof SupplierInvoiceSchema>;

export const SupplierPaymentSchema = z
  .object({
    ID: z.number().int().optional(),
    SupplierId: z.number().int().optional(),
    Date: z.string().optional(),
    Payee: z.string().optional(),
    DocumentNumber: z.string().optional(),
    Reference: z.string().optional(),
    Description: z.string().optional(),
    Comments: z.string().optional(),
    Total: z.number().optional(),
    Discount: z.number().optional(),
    TotalUnallocated: z.number().optional(),
    Reconciled: z.boolean().optional(),
    BankAccountId: z.number().int().optional(),
    PaymentMethod: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
    Status: z.union([z.literal(0), z.literal(1)]).optional(),
    TaxPeriodId: z.number().int().nullable().optional(), // read-only / system generated
    Editable: z.boolean().optional(), // read-only / system generated
    Accepted: z.boolean().optional(),
    Locked: z.boolean().optional(), // read-only / system generated
    AnalysisCategoryId1: z.number().int().nullable().optional(),
    AnalysisCategoryId2: z.number().int().nullable().optional(),
    AnalysisCategoryId3: z.number().int().nullable().optional(),
    Printed: z.boolean().optional(), // read-only / system generated
    BankUniqueIdentifier: z.string().optional(),
    ImportTypeId: z.number().int().nullable().optional(),
    BankImportMappingId: z.number().int().nullable().optional(),
    BankAccount_CurrencyId: z.number().int().nullable().optional(),
    BankAccount_ExchangeRate: z.number().nullable().optional(),
    Supplier_CurrencyId: z.number().int().nullable().optional(),
    Supplier_ExchangeRate: z.number().nullable().optional(),
    Supplier: z.lazy(() => SupplierSchema).optional(),
    BankAccount: z.lazy(() => BankAccountSchema).optional(), // read-only / system generated
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().optional(), // read-only / system generated
    UID: z.string().optional(), // read-only / system generated
  })
  .passthrough();
export type SupplierPayment = z.infer<typeof SupplierPaymentSchema>;

export const SupplierPurchaseHistorySchema = z
  .object({
    Date: z.string().nullable().optional(),
    Supplier: z.record(z.string(), z.unknown()).nullable().optional(),
    Exclusive: z.number().int().nullable().optional(),
  })
  .passthrough();
export type SupplierPurchaseHistory = z.infer<typeof SupplierPurchaseHistorySchema>;

export const SupplierPurchaseHistoryRequestModelSchema = z
  .object({
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    SupplierId: z.number().int().optional(),
    IncludeSupplierReturns: z.boolean().optional(),
    GroupingType: z.number().int().optional(),
  })
  .passthrough();
export type SupplierPurchaseHistoryRequestModel = z.infer<
  typeof SupplierPurchaseHistoryRequestModelSchema
>;

export const SupplierReturnSchema = z
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
    SupplierId: z.number().int(),
    SupplierName: z.string().optional(),
    Supplier: z.lazy(() => SupplierSchema).optional(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().optional(), // read-only / system generated
    StatusId: z.number().int().nullable().optional(),
    Supplier_CurrencyId: z.number().int().nullable().optional(),
    Supplier_ExchangeRate: z.number().nullable().optional(),
    FromDocument: z.string().optional(),
    Locked: z.boolean().optional(), // read-only / system generated
    Lines: z.array(z.lazy(() => CommercialDocumentLineSchema)).optional(),
  })
  .passthrough();
export type SupplierReturn = z.infer<typeof SupplierReturnSchema>;

export const SupplierTransactionListingRequestModelSchema = z
  .object({
    FromSupplier: z.string().optional(),
    ToSupplier: z.string().optional(),
    FromCategory: z.string().optional(),
    ToCategory: z.string().optional(),
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    IncludeActive: z.boolean().optional(),
    IncludeInactive: z.boolean().optional(),
    TransactionType: z.string().optional(),
    ShowOpeningBalance: z.boolean().optional(),
    UseForeignCurrency: z.boolean().optional(),
  })
  .passthrough();
export type SupplierTransactionListingRequestModel = z.infer<
  typeof SupplierTransactionListingRequestModelSchema
>;

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

export const TransactionListingSchema = z
  .object({
    ID: z.number().int().nullable().optional(),
    Name: z.string().nullable().optional(),
    CurrencySymbol: z.string().nullable().optional(),
    OpeningBalanceDate: z.string().nullable().optional(),
    OpeningBalance: z.number().int().nullable().optional(),
    ClosingBalanceDate: z.string().nullable().optional(),
    ClosingBalance: z.number().int().nullable().optional(),
  })
  .passthrough();
export type TransactionListing = z.infer<typeof TransactionListingSchema>;

export class PurchaseOrderService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /PurchaseOrder/Get` [GET-PurchaseOrder-Get_includeDetail_includeSupplierDetails] — Gets a list of Purchase Orders. */
  public async list(
    options?: RequestOptions & {
      readonly includeDetail?: boolean | undefined;
      readonly includeSupplierDetails?: boolean | undefined;
    },
  ): Promise<SagePage<z.infer<typeof PurchaseOrderSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.includeDetail !== undefined) {
      baseQuery["includeDetail"] = options.includeDetail;
    }
    if (options?.includeSupplierDetails !== undefined) {
      baseQuery["includeSupplierDetails"] = options.includeSupplierDetails;
    }
    return this.executor.request({
      resource: "PurchaseOrder",
      operation: "Get",
      method: "GET",
      path: "/PurchaseOrder/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(PurchaseOrderSchema),
      options,
    });
  }

  /** Async page iterator for `GET /PurchaseOrder/Get`. */
  public pages(
    options?: RequestOptions & {
      readonly includeDetail?: boolean | undefined;
      readonly includeSupplierDetails?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof PurchaseOrderSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /PurchaseOrder/Get`. */
  public iterate(
    options?: RequestOptions & {
      readonly includeDetail?: boolean | undefined;
      readonly includeSupplierDetails?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof PurchaseOrderSchema>, void, undefined> {
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

  /** `GET /PurchaseOrder/Get/{id}` [GET-PurchaseOrder-Get-id] — Gets the specified Purchase Order based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof PurchaseOrderSchema>> {
    return this.executor.request({
      resource: "PurchaseOrder",
      operation: "GetById",
      method: "GET",
      path: `/PurchaseOrder/Get/${encodeURIComponent(String(id))}`,
      responseSchema: PurchaseOrderSchema,
      options,
    });
  }

  /** `POST /PurchaseOrder/Save` [POST-PurchaseOrder-Save_useSystemDocumentNumber] — Saves the specified Purchase Order. */
  public async save(
    input: z.infer<typeof PurchaseOrderSchema>,
    options?: RequestOptions & { readonly useSystemDocumentNumber?: boolean | undefined },
  ): Promise<z.infer<typeof PurchaseOrderSchema>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.useSystemDocumentNumber !== undefined) {
      baseQuery["useSystemDocumentNumber"] = options.useSystemDocumentNumber;
    }
    return this.executor.request({
      resource: "PurchaseOrder",
      operation: "Save",
      method: "POST",
      path: "/PurchaseOrder/Save",
      query: buildQueryWithOData(baseQuery, options?.odata),
      body: input,
      requestSchema: PurchaseOrderSchema,
      responseSchema: PurchaseOrderSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /PurchaseOrder/Calculate` [POST-PurchaseOrder-Calculate] — Calculates the specified Purchase Order total fields. */
  public async calculate(
    input: z.infer<typeof PurchaseOrderSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof PurchaseOrderSchema>> {
    return this.executor.request({
      resource: "PurchaseOrder",
      operation: "Calculate",
      method: "POST",
      path: "/PurchaseOrder/Calculate",
      body: input,
      requestSchema: PurchaseOrderSchema,
      responseSchema: PurchaseOrderSchema,
      options,
    });
  }

  /** `DELETE /PurchaseOrder/Delete/{id}` [DELETE-PurchaseOrder-Delete-id] — Gets the specified Purchase Order based on the identifier. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "PurchaseOrder",
      operation: "Delete",
      method: "DELETE",
      path: `/PurchaseOrder/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /PurchaseOrder/Export/{id}` [GET-PurchaseOrder-Export-id] — Downloads a copy of a Purchase Order as a PDF file. */
  public async export(id: number | string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "PurchaseOrder",
      operation: "Export",
      method: "GET",
      path: `/PurchaseOrder/Export/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }

  /** `POST /PurchaseOrder/Email` [POST-PurchaseOrder-Email] — Emails the specified Purchase Order. */
  public async email(
    input: z.infer<typeof EmailRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "PurchaseOrder",
      operation: "Email",
      method: "POST",
      path: "/PurchaseOrder/Email",
      body: input,
      requestSchema: EmailRequestModelSchema,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class PurchaseOrderAttachmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /PurchaseOrderAttachment/Save` [POST-PurchaseOrderAttachment-Save] — Saves the Attachment. The file data is transmitted as a multipart/form-data POST. In the query string of the Url or a parameter in the form post, a TransactionId is required. A TransactionId is the ID of the PurchaseOrder that this attachment must be linked to. This is Required and is not optional. */
  public async save(
    upload: {
      readonly TransactionId: number | string;
      readonly file: Blob | Uint8Array | string;
      readonly fileName?: string | undefined;
      readonly fieldName?: string | undefined;
    },
    options?: RequestOptions,
  ): Promise<unknown> {
    const formData = new FormData();
    formData.set("TransactionId", String(upload.TransactionId));
    const blob =
      upload.file instanceof Blob
        ? upload.file
        : new Blob([typeof upload.file === "string" ? upload.file : new Uint8Array(upload.file)]);
    formData.set(upload.fieldName ?? "file", blob, upload.fileName ?? "attachment.bin");
    return this.executor.request({
      resource: "PurchaseOrderAttachment",
      operation: "Save",
      method: "POST",
      path: "/PurchaseOrderAttachment/Save",
      query: buildQueryWithOData({ TransactionId: upload.TransactionId }, options?.odata),
      formData,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /PurchaseOrderAttachment/Get/{id}` [GET-PurchaseOrderAttachment-Get-id] — Gets the specified Attachment based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AttachmentSchema>>> {
    return this.executor.request({
      resource: "PurchaseOrderAttachment",
      operation: "GetById",
      method: "GET",
      path: `/PurchaseOrderAttachment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(AttachmentSchema),
      options,
    });
  }

  /** `GET /PurchaseOrderAttachment/Download/{id}` [GET-PurchaseOrderAttachment-Download-id] — Downloads the specified Attachment based on file identifier (Guid). */
  public async download(id: string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "PurchaseOrderAttachment",
      operation: "Download",
      method: "GET",
      path: `/PurchaseOrderAttachment/Download/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }

  /** `GET /PurchaseOrderAttachment/GetCompanyStorageInformation` [GET-PurchaseOrderAttachment-GetCompanyStorageInformation] — Gets the Company Storage Information. */
  public async getCompanyStorageInformation(
    options?: RequestOptions,
  ): Promise<z.infer<typeof StorageInformationSchema>> {
    return this.executor.request({
      resource: "PurchaseOrderAttachment",
      operation: "GetCompanyStorageInformation",
      method: "GET",
      path: "/PurchaseOrderAttachment/GetCompanyStorageInformation",
      responseSchema: StorageInformationSchema,
      options,
    });
  }

  /** `DELETE /PurchaseOrderAttachment/Delete/{id}` [DELETE-PurchaseOrderAttachment-Delete-id] — Deletes the specified Attachment based on file identifier (Guid). */
  public async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "PurchaseOrderAttachment",
      operation: "Delete",
      method: "DELETE",
      path: `/PurchaseOrderAttachment/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /PurchaseOrderAttachment/DeleteAll/{id}` [DELETE-PurchaseOrderAttachment-DeleteAll-id] — Deletes all Attachments based on the identifier. */
  public async deleteAll(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "PurchaseOrderAttachment",
      operation: "DeleteAll",
      method: "DELETE",
      path: `/PurchaseOrderAttachment/DeleteAll/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /PurchaseOrderAttachment/Validate` [POST-PurchaseOrderAttachment-Validate] — Validates the specified Entity. */
  public async validate(
    input: z.infer<typeof IBigModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "PurchaseOrderAttachment",
      operation: "Validate",
      method: "POST",
      path: "/PurchaseOrderAttachment/Validate",
      body: input,
      requestSchema: IBigModelSchema,
      responseType: "empty",
      options,
    });
  }
}

export class SupplierInvoiceService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /SupplierInvoice/Get` [GET-SupplierInvoice-Get_includeDetail_includeSupplierDetails] — Gets a list of Supplier Invoices. */
  public async list(
    options?: RequestOptions & {
      readonly includeDetail?: boolean | undefined;
      readonly includeSupplierDetails?: boolean | undefined;
    },
  ): Promise<SagePage<z.infer<typeof SupplierInvoiceSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.includeDetail !== undefined) {
      baseQuery["includeDetail"] = options.includeDetail;
    }
    if (options?.includeSupplierDetails !== undefined) {
      baseQuery["includeSupplierDetails"] = options.includeSupplierDetails;
    }
    return this.executor.request({
      resource: "SupplierInvoice",
      operation: "Get",
      method: "GET",
      path: "/SupplierInvoice/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(SupplierInvoiceSchema),
      options,
    });
  }

  /** Async page iterator for `GET /SupplierInvoice/Get`. */
  public pages(
    options?: RequestOptions & {
      readonly includeDetail?: boolean | undefined;
      readonly includeSupplierDetails?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof SupplierInvoiceSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /SupplierInvoice/Get`. */
  public iterate(
    options?: RequestOptions & {
      readonly includeDetail?: boolean | undefined;
      readonly includeSupplierDetails?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof SupplierInvoiceSchema>, void, undefined> {
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

  /** `GET /SupplierInvoice/Get/{id}` [GET-SupplierInvoice-Get-id] — Gets the specified Supplier Invoice based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SupplierInvoiceSchema>> {
    return this.executor.request({
      resource: "SupplierInvoice",
      operation: "GetById",
      method: "GET",
      path: `/SupplierInvoice/Get/${encodeURIComponent(String(id))}`,
      responseSchema: SupplierInvoiceSchema,
      options,
    });
  }

  /** `POST /SupplierInvoice/Save` [POST-SupplierInvoice-Save_useSystemDocumentNumber] — Saves the specified Supplier Invoice. */
  public async save(
    input: z.infer<typeof SupplierInvoiceSchema>,
    options?: RequestOptions & { readonly useSystemDocumentNumber?: boolean | undefined },
  ): Promise<z.infer<typeof SupplierInvoiceSchema>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.useSystemDocumentNumber !== undefined) {
      baseQuery["useSystemDocumentNumber"] = options.useSystemDocumentNumber;
    }
    return this.executor.request({
      resource: "SupplierInvoice",
      operation: "Save",
      method: "POST",
      path: "/SupplierInvoice/Save",
      query: buildQueryWithOData(baseQuery, options?.odata),
      body: input,
      requestSchema: SupplierInvoiceSchema,
      responseSchema: SupplierInvoiceSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /SupplierInvoice/Calculate` [POST-SupplierInvoice-Calculate] — Calculates the specified Supplier Invoice. */
  public async calculate(
    input: z.infer<typeof SupplierInvoiceSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SupplierInvoiceSchema>> {
    return this.executor.request({
      resource: "SupplierInvoice",
      operation: "Calculate",
      method: "POST",
      path: "/SupplierInvoice/Calculate",
      body: input,
      requestSchema: SupplierInvoiceSchema,
      responseSchema: SupplierInvoiceSchema,
      options,
    });
  }

  /** `POST /SupplierInvoice/Email` [POST-SupplierInvoice-Email] — Emails the specified Supplier Invoice. */
  public async email(
    input: z.infer<typeof EmailRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "SupplierInvoice",
      operation: "Email",
      method: "POST",
      path: "/SupplierInvoice/Email",
      body: input,
      requestSchema: EmailRequestModelSchema,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /SupplierInvoice/Export/{id}` [GET-SupplierInvoice-Export-id] — Downloads a copy of a Supplier Invoice as a PDF file. */
  public async export(id: number | string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "SupplierInvoice",
      operation: "Export",
      method: "GET",
      path: `/SupplierInvoice/Export/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }
}

export class SupplierInvoiceAttachmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /SupplierInvoiceAttachment/Save` [POST-SupplierInvoiceAttachment-Save] — Saves the Attachment. The file data is transmitted as a multipart/form-data POST. In the query string of the Url or a parameter in the form post, a TransactionId is required. A TransactionId is the ID of the SupplierInvoice that this attachment must be linked to. This is Required and is not optional. */
  public async save(
    upload: {
      readonly TransactionId: number | string;
      readonly file: Blob | Uint8Array | string;
      readonly fileName?: string | undefined;
      readonly fieldName?: string | undefined;
    },
    options?: RequestOptions,
  ): Promise<unknown> {
    const formData = new FormData();
    formData.set("TransactionId", String(upload.TransactionId));
    const blob =
      upload.file instanceof Blob
        ? upload.file
        : new Blob([typeof upload.file === "string" ? upload.file : new Uint8Array(upload.file)]);
    formData.set(upload.fieldName ?? "file", blob, upload.fileName ?? "attachment.bin");
    return this.executor.request({
      resource: "SupplierInvoiceAttachment",
      operation: "Save",
      method: "POST",
      path: "/SupplierInvoiceAttachment/Save",
      query: buildQueryWithOData({ TransactionId: upload.TransactionId }, options?.odata),
      formData,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /SupplierInvoiceAttachment/Get/{id}` [GET-SupplierInvoiceAttachment-Get-id] — Gets the specified Attachment based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AttachmentSchema>>> {
    return this.executor.request({
      resource: "SupplierInvoiceAttachment",
      operation: "GetById",
      method: "GET",
      path: `/SupplierInvoiceAttachment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(AttachmentSchema),
      options,
    });
  }

  /** `GET /SupplierInvoiceAttachment/Download/{id}` [GET-SupplierInvoiceAttachment-Download-id] — Downloads the specified Attachment based on file identifier (Guid). */
  public async download(id: string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "SupplierInvoiceAttachment",
      operation: "Download",
      method: "GET",
      path: `/SupplierInvoiceAttachment/Download/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }

  /** `GET /SupplierInvoiceAttachment/GetCompanyStorageInformation` [GET-SupplierInvoiceAttachment-GetCompanyStorageInformation] — Gets the Company Storage Information. */
  public async getCompanyStorageInformation(
    options?: RequestOptions,
  ): Promise<z.infer<typeof StorageInformationSchema>> {
    return this.executor.request({
      resource: "SupplierInvoiceAttachment",
      operation: "GetCompanyStorageInformation",
      method: "GET",
      path: "/SupplierInvoiceAttachment/GetCompanyStorageInformation",
      responseSchema: StorageInformationSchema,
      options,
    });
  }

  /** `DELETE /SupplierInvoiceAttachment/Delete/{id}` [DELETE-SupplierInvoiceAttachment-Delete-id] — Deletes the specified Attachment based on file identifier (Guid). */
  public async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SupplierInvoiceAttachment",
      operation: "Delete",
      method: "DELETE",
      path: `/SupplierInvoiceAttachment/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /SupplierInvoiceAttachment/DeleteAll/{id}` [DELETE-SupplierInvoiceAttachment-DeleteAll-id] — Deletes all Attachments based on the identifier. */
  public async deleteAll(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SupplierInvoiceAttachment",
      operation: "DeleteAll",
      method: "DELETE",
      path: `/SupplierInvoiceAttachment/DeleteAll/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /SupplierInvoiceAttachment/Validate` [POST-SupplierInvoiceAttachment-Validate] — Validates the specified Entity. */
  public async validate(
    input: z.infer<typeof IBigModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "SupplierInvoiceAttachment",
      operation: "Validate",
      method: "POST",
      path: "/SupplierInvoiceAttachment/Validate",
      body: input,
      requestSchema: IBigModelSchema,
      responseType: "empty",
      options,
    });
  }
}

export class SupplierPaymentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /SupplierPayment/Get` [GET-SupplierPayment-Get_includeSupplierDetails_includeBankAccountDetails] — Gets a list of Supplier Payments. */
  public async list(
    options?: RequestOptions & {
      readonly includeSupplierDetails?: boolean | undefined;
      readonly includeBankAccountDetails?: boolean | undefined;
    },
  ): Promise<SagePage<z.infer<typeof SupplierPaymentSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.includeSupplierDetails !== undefined) {
      baseQuery["includeSupplierDetails"] = options.includeSupplierDetails;
    }
    if (options?.includeBankAccountDetails !== undefined) {
      baseQuery["includeBankAccountDetails"] = options.includeBankAccountDetails;
    }
    return this.executor.request({
      resource: "SupplierPayment",
      operation: "Get",
      method: "GET",
      path: "/SupplierPayment/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(SupplierPaymentSchema),
      options,
    });
  }

  /** Async page iterator for `GET /SupplierPayment/Get`. */
  public pages(
    options?: RequestOptions & {
      readonly includeSupplierDetails?: boolean | undefined;
      readonly includeBankAccountDetails?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof SupplierPaymentSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /SupplierPayment/Get`. */
  public iterate(
    options?: RequestOptions & {
      readonly includeSupplierDetails?: boolean | undefined;
      readonly includeBankAccountDetails?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof SupplierPaymentSchema>, void, undefined> {
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

  /** `GET /SupplierPayment/Get/{id}` [GET-SupplierPayment-Get-id] — Gets the specified Supplier Payment based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SupplierPaymentSchema>> {
    return this.executor.request({
      resource: "SupplierPayment",
      operation: "GetById",
      method: "GET",
      path: `/SupplierPayment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: SupplierPaymentSchema,
      options,
    });
  }

  /** `POST /SupplierPayment/Save` [POST-SupplierPayment-Save_useSystemDocumentNumber] — Saves the specified Supplier Payment. */
  public async save(
    input: z.infer<typeof SupplierPaymentSchema>,
    options?: RequestOptions & { readonly useSystemDocumentNumber?: boolean | undefined },
  ): Promise<z.infer<typeof SupplierPaymentSchema>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.useSystemDocumentNumber !== undefined) {
      baseQuery["useSystemDocumentNumber"] = options.useSystemDocumentNumber;
    }
    return this.executor.request({
      resource: "SupplierPayment",
      operation: "Save",
      method: "POST",
      path: "/SupplierPayment/Save",
      query: buildQueryWithOData(baseQuery, options?.odata),
      body: input,
      requestSchema: SupplierPaymentSchema,
      responseSchema: SupplierPaymentSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /SupplierPayment/SaveBatch` [POST-SupplierPayment-SaveBatch] — Saves the list of Supplier Payments. */
  public async saveBatch(
    input: readonly z.infer<typeof SupplierPaymentSchema>[],
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof SupplierPaymentSchema>>> {
    return this.executor.request({
      resource: "SupplierPayment",
      operation: "SaveBatch",
      method: "POST",
      path: "/SupplierPayment/SaveBatch",
      body: input,
      requestSchema: z.array(SupplierPaymentSchema),
      responseSchema: z.array(SupplierPaymentSchema),
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /SupplierPayment/Export/{id}` [GET-SupplierPayment-Export-id] — Gets a Supplier Payments generated as a PDF. */
  public async export(id: number | string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "SupplierPayment",
      operation: "Export",
      method: "GET",
      path: `/SupplierPayment/Export/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }

  /** `POST /SupplierPayment/Delete/{id}` [POST-SupplierPayment-Delete-id] — Deletes a specified Supplier Payment. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SupplierPayment",
      operation: "Delete",
      method: "POST",
      path: `/SupplierPayment/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class SupplierReturnService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /SupplierReturn/Get` [GET-SupplierReturn-Get_includeDetail] — Gets a List of Supplier Returns. */
  public async list(
    options?: RequestOptions & { readonly includeDetail?: boolean | undefined },
  ): Promise<SagePage<z.infer<typeof SupplierReturnSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.includeDetail !== undefined) {
      baseQuery["includeDetail"] = options.includeDetail;
    }
    return this.executor.request({
      resource: "SupplierReturn",
      operation: "Get",
      method: "GET",
      path: "/SupplierReturn/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(SupplierReturnSchema),
      options,
    });
  }

  /** Async page iterator for `GET /SupplierReturn/Get`. */
  public pages(
    options?: RequestOptions & { readonly includeDetail?: boolean | undefined } & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof SupplierReturnSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /SupplierReturn/Get`. */
  public iterate(
    options?: RequestOptions & { readonly includeDetail?: boolean | undefined } & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof SupplierReturnSchema>, void, undefined> {
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

  /** `GET /SupplierReturn/Get/{id}` [GET-SupplierReturn-Get-id] — Gets the specified Supplier Return based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SupplierReturnSchema>> {
    return this.executor.request({
      resource: "SupplierReturn",
      operation: "GetById",
      method: "GET",
      path: `/SupplierReturn/Get/${encodeURIComponent(String(id))}`,
      responseSchema: SupplierReturnSchema,
      options,
    });
  }

  /** `POST /SupplierReturn/Save` [POST-SupplierReturn-Save_useSystemDocumentNumber] — Saves the specified Supplier Return. */
  public async save(
    input: z.infer<typeof SupplierReturnSchema>,
    options?: RequestOptions & { readonly useSystemDocumentNumber?: boolean | undefined },
  ): Promise<z.infer<typeof SupplierReturnSchema>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.useSystemDocumentNumber !== undefined) {
      baseQuery["useSystemDocumentNumber"] = options.useSystemDocumentNumber;
    }
    return this.executor.request({
      resource: "SupplierReturn",
      operation: "Save",
      method: "POST",
      path: "/SupplierReturn/Save",
      query: buildQueryWithOData(baseQuery, options?.odata),
      body: input,
      requestSchema: SupplierReturnSchema,
      responseSchema: SupplierReturnSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /SupplierReturn/Calculate` [POST-SupplierReturn-Calculate] — Calculates the specified Supplier Return total fields. */
  public async calculate(
    input: z.infer<typeof SupplierReturnSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SupplierReturnSchema>> {
    return this.executor.request({
      resource: "SupplierReturn",
      operation: "Calculate",
      method: "POST",
      path: "/SupplierReturn/Calculate",
      body: input,
      requestSchema: SupplierReturnSchema,
      responseSchema: SupplierReturnSchema,
      options,
    });
  }

  /** `POST /SupplierReturn/Email` [POST-SupplierReturn-Email] — Emails the specified Supplier Return. */
  public async email(
    input: z.infer<typeof EmailRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "SupplierReturn",
      operation: "Email",
      method: "POST",
      path: "/SupplierReturn/Email",
      body: input,
      requestSchema: EmailRequestModelSchema,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /SupplierReturn/Export/{id}` [GET-SupplierReturn-Export-id] — Downloads a copy of a Supplier Return as a PDF file. */
  public async export(id: number | string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "SupplierReturn",
      operation: "Export",
      method: "GET",
      path: `/SupplierReturn/Export/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }
}

export class SupplierReturnAttachmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /SupplierReturnAttachment/Save` [POST-SupplierReturnAttachment-Save] — Saves the Attachment. The file data is transmitted as a multipart/form-data POST. In the query string of the Url or a parameter in the form post, a TransactionId is required. A TransactionId is the ID of the SupplierReturn that this attachment must be linked to. This is Required and is not optional. */
  public async save(
    upload: {
      readonly TransactionId: number | string;
      readonly file: Blob | Uint8Array | string;
      readonly fileName?: string | undefined;
      readonly fieldName?: string | undefined;
    },
    options?: RequestOptions,
  ): Promise<unknown> {
    const formData = new FormData();
    formData.set("TransactionId", String(upload.TransactionId));
    const blob =
      upload.file instanceof Blob
        ? upload.file
        : new Blob([typeof upload.file === "string" ? upload.file : new Uint8Array(upload.file)]);
    formData.set(upload.fieldName ?? "file", blob, upload.fileName ?? "attachment.bin");
    return this.executor.request({
      resource: "SupplierReturnAttachment",
      operation: "Save",
      method: "POST",
      path: "/SupplierReturnAttachment/Save",
      query: buildQueryWithOData({ TransactionId: upload.TransactionId }, options?.odata),
      formData,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /SupplierReturnAttachment/Get/{id}` [GET-SupplierReturnAttachment-Get-id] — Gets the specified Attachment based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AttachmentSchema>>> {
    return this.executor.request({
      resource: "SupplierReturnAttachment",
      operation: "GetById",
      method: "GET",
      path: `/SupplierReturnAttachment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(AttachmentSchema),
      options,
    });
  }

  /** `GET /SupplierReturnAttachment/Download/{id}` [GET-SupplierReturnAttachment-Download-id] — Downloads the specified Attachment based on file identifier (Guid). */
  public async download(id: string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "SupplierReturnAttachment",
      operation: "Download",
      method: "GET",
      path: `/SupplierReturnAttachment/Download/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }

  /** `GET /SupplierReturnAttachment/GetCompanyStorageInformation` [GET-SupplierReturnAttachment-GetCompanyStorageInformation] — Gets the Company Storage Information. */
  public async getCompanyStorageInformation(
    options?: RequestOptions,
  ): Promise<z.infer<typeof StorageInformationSchema>> {
    return this.executor.request({
      resource: "SupplierReturnAttachment",
      operation: "GetCompanyStorageInformation",
      method: "GET",
      path: "/SupplierReturnAttachment/GetCompanyStorageInformation",
      responseSchema: StorageInformationSchema,
      options,
    });
  }

  /** `DELETE /SupplierReturnAttachment/Delete/{id}` [DELETE-SupplierReturnAttachment-Delete-id] — Deletes the specified Attachment based on file identifier (Guid). */
  public async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SupplierReturnAttachment",
      operation: "Delete",
      method: "DELETE",
      path: `/SupplierReturnAttachment/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /SupplierReturnAttachment/DeleteAll/{id}` [DELETE-SupplierReturnAttachment-DeleteAll-id] — Deletes all Attachments based on the identifier. */
  public async deleteAll(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SupplierReturnAttachment",
      operation: "DeleteAll",
      method: "DELETE",
      path: `/SupplierReturnAttachment/DeleteAll/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /SupplierReturnAttachment/Validate` [POST-SupplierReturnAttachment-Validate] — Validates the specified Entity. */
  public async validate(
    input: z.infer<typeof IBigModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "SupplierReturnAttachment",
      operation: "Validate",
      method: "POST",
      path: "/SupplierReturnAttachment/Validate",
      body: input,
      requestSchema: IBigModelSchema,
      responseType: "empty",
      options,
    });
  }
}

export class SupplierAdjustmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /SupplierAdjustment/Get` [GET-SupplierAdjustment-Get] — Gets a list of Supplier Adjustments. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof SupplierAdjustmentSchema>>> {
    return this.executor.request({
      resource: "SupplierAdjustment",
      operation: "Get",
      method: "GET",
      path: "/SupplierAdjustment/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(SupplierAdjustmentSchema),
      options,
    });
  }

  /** Async page iterator for `GET /SupplierAdjustment/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof SupplierAdjustmentSchema>>,
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

  /** Async item iterator for `GET /SupplierAdjustment/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof SupplierAdjustmentSchema>, void, undefined> {
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

  /** `GET /SupplierAdjustment/Get/{id}` [GET-SupplierAdjustment-Get-id] — Gets the specified Supplier Adjustment based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SupplierAdjustmentSchema>> {
    return this.executor.request({
      resource: "SupplierAdjustment",
      operation: "GetById",
      method: "GET",
      path: `/SupplierAdjustment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: SupplierAdjustmentSchema,
      options,
    });
  }

  /** `POST /SupplierAdjustment/Save` [POST-SupplierAdjustment-Save] — Saves the specified Supplier Adjustment object. */
  public async save(
    input: z.infer<typeof SupplierAdjustmentSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SupplierAdjustmentSchema>> {
    return this.executor.request({
      resource: "SupplierAdjustment",
      operation: "Save",
      method: "POST",
      path: "/SupplierAdjustment/Save",
      body: input,
      requestSchema: SupplierAdjustmentSchema,
      responseSchema: SupplierAdjustmentSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /SupplierAdjustment/Calculate` [POST-SupplierAdjustment-Calculate] — Calculates the total, exclusive, tax and inclusive value of the Supplier Adjustment for the Document Header. */
  public async calculate(
    input: z.infer<typeof SupplierAdjustmentSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SupplierAdjustmentSchema>> {
    return this.executor.request({
      resource: "SupplierAdjustment",
      operation: "Calculate",
      method: "POST",
      path: "/SupplierAdjustment/Calculate",
      body: input,
      requestSchema: SupplierAdjustmentSchema,
      responseSchema: SupplierAdjustmentSchema,
      options,
    });
  }
}

export class OutstandingSupplierDocumentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /OutstandingSupplierDocument/Get` [POST-OutstandingSupplierDocument-Get] — Gets a list of Outstanding Supplier Documents based on the request model. */
  public async get(
    input: z.infer<typeof OutstandingSupplierDocumentRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof OutstandingSupplierDocumentSchema>>> {
    return this.executor.request({
      resource: "OutstandingSupplierDocument",
      operation: "Get",
      method: "POST",
      path: "/OutstandingSupplierDocument/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: OutstandingSupplierDocumentRequestModelSchema,
      responseSchema: createSagePageSchema(OutstandingSupplierDocumentSchema),
      options,
    });
  }
}

export class SupplierAgeingService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /SupplierAgeing/GetSummary` [POST-SupplierAgeing-GetSummary] — Gets the specified Supplier Ageing Summary statement based on the request. */
  public async getSummary(
    input: z.infer<typeof SupplierAgeingRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SupplierAgeingSchema>> {
    return this.executor.request({
      resource: "SupplierAgeing",
      operation: "GetSummary",
      method: "POST",
      path: "/SupplierAgeing/GetSummary",
      body: input,
      requestSchema: SupplierAgeingRequestModelSchema,
      responseSchema: SupplierAgeingSchema,
      options,
    });
  }

  /** `POST /SupplierAgeing/GetDetail` [POST-SupplierAgeing-GetDetail] — Gets a list of Supplier Ageing statements based on the request. */
  public async getDetail(
    input: z.infer<typeof SupplierAgeingRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof SupplierAgeingSchema>>> {
    return this.executor.request({
      resource: "SupplierAgeing",
      operation: "GetDetail",
      method: "POST",
      path: "/SupplierAgeing/GetDetail",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: SupplierAgeingRequestModelSchema,
      responseSchema: createSagePageSchema(SupplierAgeingSchema),
      options,
    });
  }
}

export class SupplierTransactionListingService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /SupplierTransactionListing/GetSupplierTransactionListingReportingDetail` [POST-SupplierTransactionListing-GetSupplierTransactionListingReportingDetail] — Gets the Supplier Transaction Listing. */
  public async getSupplierTransactionListingReportingDetail(
    input: z.infer<typeof SupplierTransactionListingRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof TransactionListingSchema>>> {
    return this.executor.request({
      resource: "SupplierTransactionListing",
      operation: "GetSupplierTransactionListingReportingDetail",
      method: "POST",
      path: "/SupplierTransactionListing/GetSupplierTransactionListingReportingDetail",
      body: input,
      requestSchema: SupplierTransactionListingRequestModelSchema,
      responseSchema: z.array(TransactionListingSchema),
      options,
    });
  }
}

export class SupplierPurchaseHistoryService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /SupplierPurchaseHistory/Get` [POST-SupplierPurchaseHistory-Get] — Gets a list of Supplier Purchase History. */
  public async get(
    input: z.infer<typeof SupplierPurchaseHistoryRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof SupplierPurchaseHistorySchema>>> {
    return this.executor.request({
      resource: "SupplierPurchaseHistory",
      operation: "Get",
      method: "POST",
      path: "/SupplierPurchaseHistory/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: SupplierPurchaseHistoryRequestModelSchema,
      responseSchema: createSagePageSchema(SupplierPurchaseHistorySchema),
      options,
    });
  }
}

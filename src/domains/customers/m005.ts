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

const AdditionalPriceListSchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string(),
    IsDefault: z.boolean().optional(),
  })
  .passthrough();

const AgeingTransactionSchema = z.record(z.string(), z.unknown());

export const AllocatedCustomerDocumentSchema = z
  .object({
    AllocationId: z.number().int().nullable().optional(),
    SourceDocumentId: z.number().int().nullable().optional(),
    AllocatedToDocumentId: z.number().int().nullable().optional(),
    AllocationTotal: z.number().int().nullable().optional(),
    AllocationDiscount: z.number().int().nullable().optional(),
    CustomerId: z.number().int().nullable().optional(),
    CustomerName: z.string().nullable().optional(),
    Customer: z.record(z.string(), z.unknown()).nullable().optional(),
    SalesRepresentativeId: z.number().int().nullable().optional(),
    SalesRepresentative: z.record(z.string(), z.unknown()).nullable().optional(),
    StatusId: z.number().int().nullable().optional(),
    Modified: z.string().nullable().optional(),
    Created: z.string().nullable().optional(),
    Customer_CurrencyId: z.number().int().nullable().optional(),
    Customer_ExchangeRate: z.number().int().nullable().optional(),
    ID: z.number().int().nullable().optional(),
    Date: z.string().nullable().optional(),
    Inclusive: z.boolean().nullable().optional(),
    DiscountPercentage: z.number().nullable().optional(),
    TaxReference: z.string().nullable().optional(),
    DocumentNumber: z.string().nullable().optional(),
    Reference: z.string().nullable().optional(),
    Message: z.string().nullable().optional(),
    Discount: z.number().int().nullable().optional(),
    Exclusive: z.number().int().nullable().optional(),
    Tax: z.number().int().nullable().optional(),
    Rounding: z.number().int().nullable().optional(),
    Total: z.number().int().nullable().optional(),
    AmountDue: z.number().int().nullable().optional(),
    PostalAddress01: z.string().nullable().optional(),
    PostalAddress02: z.string().nullable().optional(),
    PostalAddress03: z.string().nullable().optional(),
    PostalAddress04: z.string().nullable().optional(),
    PostalAddress05: z.string().nullable().optional(),
    DeliveryAddress01: z.string().nullable().optional(),
    DeliveryAddress02: z.string().nullable().optional(),
    DeliveryAddress03: z.string().nullable().optional(),
    DeliveryAddress04: z.string().nullable().optional(),
    DeliveryAddress05: z.string().nullable().optional(),
    Printed: z.boolean().nullable().optional(),
    TaxPeriodId: z.number().int().nullable().optional(),
    Editable: z.boolean().nullable().optional(),
    HasAttachments: z.boolean().nullable().optional(),
    HasNotes: z.boolean().nullable().optional(),
    HasAnticipatedDate: z.boolean().nullable().optional(),
    HasSpecialCountryTax: z.boolean().nullable().optional(),
    AnticipatedDate: z.string().nullable().optional(),
    ExternalReference: z.string().nullable().optional(),
    UID: z.string().nullable().optional(),
    Lines: z.array(z.record(z.string(), z.unknown()).nullable()).optional(),
  })
  .passthrough();
export type AllocatedCustomerDocument = z.infer<typeof AllocatedCustomerDocumentSchema>;

export const AllocatedSupplierDocumentSchema = z
  .object({
    AllocationId: z.number().int().nullable().optional(),
    SourceDocumentId: z.number().int().nullable().optional(),
    AllocatedToDocumentId: z.number().int().nullable().optional(),
    AllocationTotal: z.number().int().nullable().optional(),
    AllocationDiscount: z.number().int().nullable().optional(),
    SupplierId: z.number().int().nullable().optional(),
    SupplierName: z.string().nullable().optional(),
    Supplier: z.record(z.string(), z.unknown()).nullable().optional(),
    Modified: z.string().nullable().optional(),
    Created: z.string().nullable().optional(),
    StatusId: z.number().int().nullable().optional(),
    Supplier_CurrencyId: z.number().int().nullable().optional(),
    Supplier_ExchangeRate: z.number().int().nullable().optional(),
    ID: z.number().int().nullable().optional(),
    Date: z.string().nullable().optional(),
    Inclusive: z.boolean().nullable().optional(),
    DiscountPercentage: z.number().nullable().optional(),
    TaxReference: z.string().nullable().optional(),
    DocumentNumber: z.string().nullable().optional(),
    Reference: z.string().nullable().optional(),
    Message: z.string().nullable().optional(),
    Discount: z.number().int().nullable().optional(),
    Exclusive: z.number().int().nullable().optional(),
    Tax: z.number().int().nullable().optional(),
    Rounding: z.number().int().nullable().optional(),
    Total: z.number().int().nullable().optional(),
    AmountDue: z.number().int().nullable().optional(),
    PostalAddress01: z.string().nullable().optional(),
    PostalAddress02: z.string().nullable().optional(),
    PostalAddress03: z.string().nullable().optional(),
    PostalAddress04: z.string().nullable().optional(),
    PostalAddress05: z.string().nullable().optional(),
    DeliveryAddress01: z.string().nullable().optional(),
    DeliveryAddress02: z.string().nullable().optional(),
    DeliveryAddress03: z.string().nullable().optional(),
    DeliveryAddress04: z.string().nullable().optional(),
    DeliveryAddress05: z.string().nullable().optional(),
    Printed: z.boolean().nullable().optional(),
    TaxPeriodId: z.number().int().nullable().optional(),
    Editable: z.boolean().nullable().optional(),
    HasAttachments: z.boolean().nullable().optional(),
    HasNotes: z.boolean().nullable().optional(),
    HasAnticipatedDate: z.boolean().nullable().optional(),
    HasSpecialCountryTax: z.boolean().nullable().optional(),
    AnticipatedDate: z.string().nullable().optional(),
    ExternalReference: z.string().nullable().optional(),
    UID: z.string().nullable().optional(),
    Lines: z.array(z.record(z.string(), z.unknown()).nullable()).optional(),
  })
  .passthrough();
export type AllocatedSupplierDocument = z.infer<typeof AllocatedSupplierDocumentSchema>;

export const AllocationSchema = z
  .object({
    ID: z.number().int().optional(),
    DocumentHeaderId_Source: z.number().int().optional(),
    DocumentHeaderId_Allocation: z.number().int().optional(),
    SourceDocumentId: z.number().int().optional(),
    AllocatedToDocumentId: z.number().int().optional(),
    Total: z.number().optional(),
    Discount: z.number().optional(),
    Type: z.number().int().nullable().optional(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().nullable().optional(), // read-only / system generated
  })
  .passthrough();
export type Allocation = z.infer<typeof AllocationSchema>;

export const AllocationRequestModelSchema = z
  .object({
    SelectionId: z.number().int().optional(),
    TransactionId: z.number().int().optional(),
    IncludePaidInvoices: z.boolean().optional(),
    IncludeUnpaidInvoices: z.boolean().optional(),
  })
  .passthrough();
export type AllocationRequestModel = z.infer<typeof AllocationRequestModelSchema>;

const AttachmentSchema = z
  .object({
    Name: z.string(),
    Size: z.number().int().optional(),
    AttachmentUID: z.string().optional(),
    Data: z.string().optional(),
  })
  .passthrough();

const BankAccountSchema = z
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

const BankAccountCategorySchema = z
  .object({
    Description: z.string().optional(),
    ID: z.number().int(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().nullable().optional(), // read-only / system generated
  })
  .passthrough();

const BankFeedAccountSchema = z
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

const BankFeedAccountGroupSchema = z
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

export const CustomerAdditionalContactDetailSchema = z
  .object({
    BusinessBaseHashId: z.string().optional(),
    IsDirty: z.boolean().optional(),
    ID: z.number().int().optional(),
    CustomerId: z.number().int().optional(),
    ContactName: z.string().optional(),
    Designation: z.string().optional(),
    Telephone: z.string().optional(),
    Fax: z.string().optional(),
    Mobile: z.string().optional(),
    Email: z.string().optional(),
    OutstandingInvoices: z.boolean().nullable().optional(),
    OverdueInvoices: z.boolean().nullable().optional(),
  })
  .passthrough();
export type CustomerAdditionalContactDetail = z.infer<typeof CustomerAdditionalContactDetailSchema>;

export const CustomerAdditionalContactOptionDTOSchema = z
  .object({
    ID: z.number().int().optional(),
    CompanyId: z.number().int().optional(),
    CustomerAdditionalContactDetailId: z.number().int().optional(),
  })
  .passthrough();
export type CustomerAdditionalContactOptionDTO = z.infer<
  typeof CustomerAdditionalContactOptionDTOSchema
>;

export const CustomerAdjustmentSchema = z
  .object({
    ID: z.number().int().optional(),
    Date: z.string(),
    CustomerId: z.number().int().optional(),
    DocumentNumber: z.string().optional(),
    Reference: z.string().optional(),
    Description: z.string().optional(),
    TaxTypeId: z.number().int().optional(),
    Exclusive: z.number().optional(),
    Tax: z.number().optional(),
    Total: z.number().optional(),
    ContraAccountId: z.number().int().optional(),
    Memo: z.string().optional(),
    AnalysisCategoryId1: z.number().int().nullable().optional(),
    AnalysisCategoryId2: z.number().int().nullable().optional(),
    AnalysisCategoryId3: z.number().int().nullable().optional(),
    HasAttachments: z.boolean().optional(),
    Customer: z.lazy(() => CustomerSchema).optional(), // read-only / system generated
    Account: z.lazy(() => AccountSchema).optional(), // read-only / system generated
    Locked: z.boolean().optional(), // read-only / system generated
    TaxPeriodId: z.number().int().nullable().optional(), // read-only / system generated
    TotalOutstanding: z.number().nullable().optional(), // read-only / system generated
    Inclusive: z.boolean().optional(),
    Customer_CurrencyId: z.number().int().nullable().optional(),
    Customer_ExchangeRate: z.number().nullable().optional(),
  })
  .passthrough();
export type CustomerAdjustment = z.infer<typeof CustomerAdjustmentSchema>;

export const CustomerAgeingSchema = z
  .object({
    Total: z.number().optional(),
    Current: z.number().optional(),
    Days30: z.number().optional(),
    Days60: z.number().optional(),
    Days90: z.number().optional(),
    Days120Plus: z.number().optional(),
    Customer: z.lazy(() => CustomerSchema).optional(),
    Date: z.string().optional(),
    AgeingTransactions: z.array(z.lazy(() => AgeingTransactionSchema)).optional(),
  })
  .passthrough();
export type CustomerAgeing = z.infer<typeof CustomerAgeingSchema>;

export const CustomerAgeingRequestModelSchema = z
  .object({
    CustomerId: z.number().int().optional(),
    ToDate: z.string().optional(),
    Summary: z.boolean().optional(),
    AgeingPeriod: z.number().int().optional(),
    FromCustomer: z.string().optional(),
    ToCustomer: z.string().optional(),
    FromCategory: z.string().optional(),
    ToCategory: z.string().optional(),
    IncludeActive: z.boolean().optional(),
    IncludeInactive: z.boolean().optional(),
    BasedOnDueDate: z.boolean().optional(),
    ExcludeZeroBalance: z.boolean().optional(),
    UseForeignCurrency: z.boolean().optional(),
  })
  .passthrough();
export type CustomerAgeingRequestModel = z.infer<typeof CustomerAgeingRequestModelSchema>;

const CustomerCategorySchema = z
  .object({
    Description: z.string().optional(),
    ID: z.number().int(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().nullable().optional(), // read-only / system generated
  })
  .passthrough();

export const CustomerReceiptSchema = z
  .object({
    ID: z.number().int().optional(),
    CustomerId: z.number().int().optional(),
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
    Customer_CurrencyId: z.number().int().nullable().optional(),
    Customer_ExchangeRate: z.number().nullable().optional(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().optional(), // read-only / system generated
    Customer: z.lazy(() => CustomerSchema).optional(), // read-only / system generated
    SalesRepresentative: z.lazy(() => SalesRepresentativeSchema).optional(), // read-only / system generated
    BankAccount: z.lazy(() => BankAccountSchema).optional(), // read-only / system generated
    UID: z.string().optional(), // read-only / system generated
  })
  .passthrough();
export type CustomerReceipt = z.infer<typeof CustomerReceiptSchema>;

export const CustomerReturnSchema = z
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
    FromDocument: z.string().optional(),
    Locked: z.boolean().optional(), // read-only / system generated
    Lines: z.array(z.lazy(() => CommercialDocumentLineSchema)).optional(),
  })
  .passthrough();
export type CustomerReturn = z.infer<typeof CustomerReturnSchema>;

export const CustomerSalesHistorySchema = z
  .object({
    Date: z.string().nullable().optional(),
    Customer: z.record(z.string(), z.unknown()).nullable().optional(),
    Exclusive: z.number().int().nullable().optional(),
  })
  .passthrough();
export type CustomerSalesHistory = z.infer<typeof CustomerSalesHistorySchema>;

export const CustomerSalesHistoryRequestModelSchema = z
  .object({
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    CustomerId: z.number().int().optional(),
    IncludeCreditNotes: z.boolean().optional(),
  })
  .passthrough();
export type CustomerSalesHistoryRequestModel = z.infer<
  typeof CustomerSalesHistoryRequestModelSchema
>;

export const CustomerTransactionListingRequestModelSchema = z
  .object({
    FromCustomer: z.string().optional(),
    ToCustomer: z.string().optional(),
    FromCategory: z.string().optional(),
    ToCategory: z.string().optional(),
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    IncludeActive: z.boolean().optional(),
    IncludeInactive: z.boolean().optional(),
    TransactionType: z.string().optional(),
    UseForeignCurrency: z.boolean().optional(),
  })
  .passthrough();
export type CustomerTransactionListingRequestModel = z.infer<
  typeof CustomerTransactionListingRequestModelSchema
>;

export const CustomerWriteOffSchema = z
  .object({
    ID: z.number().int().optional(),
    CustomerId: z.number().int().optional(),
    Date: z.string().optional(),
    DocumentNumber: z.string().optional(),
    Reference: z.string().optional(),
    Description: z.string().optional(),
    Comments: z.string().optional(),
    Total: z.number().optional(),
    TotalUnallocated: z.number().optional(),
    Reconciled: z.boolean().optional(),
    Customer: z.lazy(() => CustomerSchema).optional(),
    Locked: z.boolean().optional(), // read-only / system generated
    TaxPeriodId: z.number().int().nullable().optional(), // read-only / system generated
  })
  .passthrough();
export type CustomerWriteOff = z.infer<typeof CustomerWriteOffSchema>;

export const CustomerZoneUrlRequestModelSchema = z
  .object({
    DocumentHeaderId: z.number().int().optional(),
    CustomerId: z.number().int().optional(),
  })
  .passthrough();
export type CustomerZoneUrlRequestModel = z.infer<typeof CustomerZoneUrlRequestModelSchema>;

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

export const IModelSchema = z
  .object({
    ID: z.number().int().optional(),
  })
  .passthrough();
export type IModel = z.infer<typeof IModelSchema>;

export const OutstandingCustomerDocumentSchema = z
  .object({
    DocumentTypeId: z.number().int().nullable().optional(),
    DueDate: z.string().nullable().optional(),
    ExpectedPaymentDate: z.string().nullable().optional(),
    CustomerId: z.number().int().nullable().optional(),
    CustomerName: z.string().nullable().optional(),
    Customer: z.record(z.string(), z.unknown()).nullable().optional(),
    SalesRepresentativeId: z.number().int().nullable().optional(),
    SalesRepresentative: z.record(z.string(), z.unknown()).nullable().optional(),
    StatusId: z.number().int().nullable().optional(),
    Modified: z.string().nullable().optional(),
    Created: z.string().nullable().optional(),
    Customer_CurrencyId: z.number().int().nullable().optional(),
    Customer_ExchangeRate: z.number().int().nullable().optional(),
    ID: z.number().int().nullable().optional(),
    Date: z.string().nullable().optional(),
    Inclusive: z.boolean().nullable().optional(),
    DiscountPercentage: z.number().nullable().optional(),
    TaxReference: z.string().nullable().optional(),
    DocumentNumber: z.string().nullable().optional(),
    Reference: z.string().nullable().optional(),
    Message: z.string().nullable().optional(),
    Discount: z.number().int().nullable().optional(),
    Exclusive: z.number().int().nullable().optional(),
    Tax: z.number().int().nullable().optional(),
    Rounding: z.number().int().nullable().optional(),
    Total: z.number().int().nullable().optional(),
    AmountDue: z.number().int().nullable().optional(),
    PostalAddress01: z.string().nullable().optional(),
    PostalAddress02: z.string().nullable().optional(),
    PostalAddress03: z.string().nullable().optional(),
    PostalAddress04: z.string().nullable().optional(),
    PostalAddress05: z.string().nullable().optional(),
    DeliveryAddress01: z.string().nullable().optional(),
    DeliveryAddress02: z.string().nullable().optional(),
    DeliveryAddress03: z.string().nullable().optional(),
    DeliveryAddress04: z.string().nullable().optional(),
    DeliveryAddress05: z.string().nullable().optional(),
    Printed: z.boolean().nullable().optional(),
    TaxPeriodId: z.number().int().nullable().optional(),
    Editable: z.boolean().nullable().optional(),
    HasAttachments: z.boolean().nullable().optional(),
    HasNotes: z.boolean().nullable().optional(),
    HasAnticipatedDate: z.boolean().nullable().optional(),
    HasSpecialCountryTax: z.boolean().nullable().optional(),
    AnticipatedDate: z.string().nullable().optional(),
    ExternalReference: z.string().nullable().optional(),
    UID: z.string().nullable().optional(),
    Lines: z.array(z.record(z.string(), z.unknown()).nullable()).optional(),
  })
  .passthrough();
export type OutstandingCustomerDocument = z.infer<typeof OutstandingCustomerDocumentSchema>;

export const OutstandingCustomerDocumentRequestModelSchema = z
  .object({
    CustomerId: z.number().int().optional(),
    IncludePaidInvoices: z.boolean().optional(),
  })
  .passthrough();
export type OutstandingCustomerDocumentRequestModel = z.infer<
  typeof OutstandingCustomerDocumentRequestModelSchema
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

const StorageInformationSchema = z
  .object({
    SizeUsed: z.number().int().optional(),
    MaxSizeAllowed: z.number().int().optional(),
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

const TransactionListingSchema = z
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

export class CustomerReceiptService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /CustomerReceipt/Get` [GET-CustomerReceipt-Get_includeCustomerDetails_includeBankAccountDetails] — Gets a list of Customer Receipts. */
  public async list(
    options?: RequestOptions & {
      readonly includeCustomerDetails?: boolean | undefined;
      readonly includeBankAccountDetails?: boolean | undefined;
    },
  ): Promise<SagePage<z.infer<typeof CustomerReceiptSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.includeCustomerDetails !== undefined) {
      baseQuery["includeCustomerDetails"] = options.includeCustomerDetails;
    }
    if (options?.includeBankAccountDetails !== undefined) {
      baseQuery["includeBankAccountDetails"] = options.includeBankAccountDetails;
    }
    return this.executor.request({
      resource: "CustomerReceipt",
      operation: "Get",
      method: "GET",
      path: "/CustomerReceipt/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(CustomerReceiptSchema),
      options,
    });
  }

  /** Async page iterator for `GET /CustomerReceipt/Get`. */
  public pages(
    options?: RequestOptions & {
      readonly includeCustomerDetails?: boolean | undefined;
      readonly includeBankAccountDetails?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof CustomerReceiptSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /CustomerReceipt/Get`. */
  public iterate(
    options?: RequestOptions & {
      readonly includeCustomerDetails?: boolean | undefined;
      readonly includeBankAccountDetails?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof CustomerReceiptSchema>, void, undefined> {
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

  /** `GET /CustomerReceipt/Get/{id}` [GET-CustomerReceipt-Get-id] — Gets the specified Customer Receipt based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof CustomerReceiptSchema>> {
    return this.executor.request({
      resource: "CustomerReceipt",
      operation: "GetById",
      method: "GET",
      path: `/CustomerReceipt/Get/${encodeURIComponent(String(id))}`,
      responseSchema: CustomerReceiptSchema,
      options,
    });
  }

  /** `POST /CustomerReceipt/Save` [POST-CustomerReceipt-Save_useSystemDocumentNumber] — Saves the specified Customer Receipt. */
  public async save(
    input: z.infer<typeof CustomerReceiptSchema>,
    options?: RequestOptions & { readonly useSystemDocumentNumber?: boolean | undefined },
  ): Promise<z.infer<typeof CustomerReceiptSchema>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.useSystemDocumentNumber !== undefined) {
      baseQuery["useSystemDocumentNumber"] = options.useSystemDocumentNumber;
    }
    return this.executor.request({
      resource: "CustomerReceipt",
      operation: "Save",
      method: "POST",
      path: "/CustomerReceipt/Save",
      query: buildQueryWithOData(baseQuery, options?.odata),
      body: input,
      requestSchema: CustomerReceiptSchema,
      responseSchema: CustomerReceiptSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /CustomerReceipt/Export/{id}` [GET-CustomerReceipt-Export-id] — Gets a Customer Receipt generated as a PDF. */
  public async export(id: number | string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "CustomerReceipt",
      operation: "Export",
      method: "GET",
      path: `/CustomerReceipt/Export/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }

  /** `POST /CustomerReceipt/Delete/{id}` [POST-CustomerReceipt-Delete-id] — Deletes the specified Customer Receipt based on the identifier. If the Customer Receipt is not in use. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "CustomerReceipt",
      operation: "Delete",
      method: "POST",
      path: `/CustomerReceipt/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class CustomerReturnService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /CustomerReturn/Get` [GET-CustomerReturn-Get_includeDetail_includeCustomerDetails] — Gets a list of Customer Returns. */
  public async list(
    options?: RequestOptions & {
      readonly includeDetail?: boolean | undefined;
      readonly includeCustomerDetails?: boolean | undefined;
    },
  ): Promise<SagePage<z.infer<typeof CustomerReturnSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.includeDetail !== undefined) {
      baseQuery["includeDetail"] = options.includeDetail;
    }
    if (options?.includeCustomerDetails !== undefined) {
      baseQuery["includeCustomerDetails"] = options.includeCustomerDetails;
    }
    return this.executor.request({
      resource: "CustomerReturn",
      operation: "Get",
      method: "GET",
      path: "/CustomerReturn/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(CustomerReturnSchema),
      options,
    });
  }

  /** Async page iterator for `GET /CustomerReturn/Get`. */
  public pages(
    options?: RequestOptions & {
      readonly includeDetail?: boolean | undefined;
      readonly includeCustomerDetails?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof CustomerReturnSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /CustomerReturn/Get`. */
  public iterate(
    options?: RequestOptions & {
      readonly includeDetail?: boolean | undefined;
      readonly includeCustomerDetails?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof CustomerReturnSchema>, void, undefined> {
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

  /** `GET /CustomerReturn/Get/{id}` [GET-CustomerReturn-Get-id] — Gets the specified Customer Return based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof CustomerReturnSchema>> {
    return this.executor.request({
      resource: "CustomerReturn",
      operation: "GetById",
      method: "GET",
      path: `/CustomerReturn/Get/${encodeURIComponent(String(id))}`,
      responseSchema: CustomerReturnSchema,
      options,
    });
  }

  /** `POST /CustomerReturn/Save` [POST-CustomerReturn-Save_useSystemDocumentNumber] — Saves the specified Customer Return. */
  public async save(
    input: z.infer<typeof CustomerReturnSchema>,
    options?: RequestOptions & { readonly useSystemDocumentNumber?: boolean | undefined },
  ): Promise<z.infer<typeof CustomerReturnSchema>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.useSystemDocumentNumber !== undefined) {
      baseQuery["useSystemDocumentNumber"] = options.useSystemDocumentNumber;
    }
    return this.executor.request({
      resource: "CustomerReturn",
      operation: "Save",
      method: "POST",
      path: "/CustomerReturn/Save",
      query: buildQueryWithOData(baseQuery, options?.odata),
      body: input,
      requestSchema: CustomerReturnSchema,
      responseSchema: CustomerReturnSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /CustomerReturn/Calculate` [POST-CustomerReturn-Calculate] — Calculates the specified Customer Return total fields. */
  public async calculate(
    input: z.infer<typeof CustomerReturnSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof CustomerReturnSchema>> {
    return this.executor.request({
      resource: "CustomerReturn",
      operation: "Calculate",
      method: "POST",
      path: "/CustomerReturn/Calculate",
      body: input,
      requestSchema: CustomerReturnSchema,
      responseSchema: CustomerReturnSchema,
      options,
    });
  }

  /** `POST /CustomerReturn/Email` [POST-CustomerReturn-Email] — Emails the specified Customer Return. */
  public async email(
    input: z.infer<typeof EmailRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "CustomerReturn",
      operation: "Email",
      method: "POST",
      path: "/CustomerReturn/Email",
      body: input,
      requestSchema: EmailRequestModelSchema,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /CustomerReturn/Export/{id}` [GET-CustomerReturn-Export-id] — Downloads a copy of a Customer Return as a PDF file. */
  public async export(id: number | string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "CustomerReturn",
      operation: "Export",
      method: "GET",
      path: `/CustomerReturn/Export/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }
}

export class CustomerReturnAttachmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /CustomerReturnAttachment/Save` [POST-CustomerReturnAttachment-Save] — Saves the Attachment. The file data is transmitted as a multipart/form-data POST. In the query string of the Url or a parameter in the form post, a TransactionId is required. A TransactionId is the ID of the CustomerReturn that this attachment must be linked to. This is Required and is not optional. */
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
      resource: "CustomerReturnAttachment",
      operation: "Save",
      method: "POST",
      path: "/CustomerReturnAttachment/Save",
      query: buildQueryWithOData({ TransactionId: upload.TransactionId }, options?.odata),
      formData,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /CustomerReturnAttachment/Get/{id}` [GET-CustomerReturnAttachment-Get-id] — Gets the specified Attachment based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AttachmentSchema>>> {
    return this.executor.request({
      resource: "CustomerReturnAttachment",
      operation: "GetById",
      method: "GET",
      path: `/CustomerReturnAttachment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(AttachmentSchema),
      options,
    });
  }

  /** `GET /CustomerReturnAttachment/Download/{id}` [GET-CustomerReturnAttachment-Download-id] — Downloads the specified Attachment based on file identifier (Guid). */
  public async download(id: string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "CustomerReturnAttachment",
      operation: "Download",
      method: "GET",
      path: `/CustomerReturnAttachment/Download/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }

  /** `GET /CustomerReturnAttachment/GetCompanyStorageInformation` [GET-CustomerReturnAttachment-GetCompanyStorageInformation] — Gets the Company Storage Information. */
  public async getCompanyStorageInformation(
    options?: RequestOptions,
  ): Promise<z.infer<typeof StorageInformationSchema>> {
    return this.executor.request({
      resource: "CustomerReturnAttachment",
      operation: "GetCompanyStorageInformation",
      method: "GET",
      path: "/CustomerReturnAttachment/GetCompanyStorageInformation",
      responseSchema: StorageInformationSchema,
      options,
    });
  }

  /** `DELETE /CustomerReturnAttachment/Delete/{id}` [DELETE-CustomerReturnAttachment-Delete-id] — Deletes the specified Attachment based on file identifier (Guid). */
  public async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "CustomerReturnAttachment",
      operation: "Delete",
      method: "DELETE",
      path: `/CustomerReturnAttachment/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /CustomerReturnAttachment/DeleteAll/{id}` [DELETE-CustomerReturnAttachment-DeleteAll-id] — Deletes all Attachments based on the identifier. */
  public async deleteAll(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "CustomerReturnAttachment",
      operation: "DeleteAll",
      method: "DELETE",
      path: `/CustomerReturnAttachment/DeleteAll/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /CustomerReturnAttachment/Validate` [POST-CustomerReturnAttachment-Validate] — Validates the specified Entity. */
  public async validate(
    input: z.infer<typeof IBigModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "CustomerReturnAttachment",
      operation: "Validate",
      method: "POST",
      path: "/CustomerReturnAttachment/Validate",
      body: input,
      requestSchema: IBigModelSchema,
      responseType: "empty",
      options,
    });
  }
}

export class CustomerAdjustmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /CustomerAdjustment/Get` [GET-CustomerAdjustment-Get] — Gets a List of Customer Adjustments. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof CustomerAdjustmentSchema>>> {
    return this.executor.request({
      resource: "CustomerAdjustment",
      operation: "Get",
      method: "GET",
      path: "/CustomerAdjustment/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(CustomerAdjustmentSchema),
      options,
    });
  }

  /** Async page iterator for `GET /CustomerAdjustment/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof CustomerAdjustmentSchema>>,
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

  /** Async item iterator for `GET /CustomerAdjustment/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof CustomerAdjustmentSchema>, void, undefined> {
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

  /** `GET /CustomerAdjustment/Get/{id}` [GET-CustomerAdjustment-Get-id] — Gets the specified Customer Adjustment based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof CustomerAdjustmentSchema>> {
    return this.executor.request({
      resource: "CustomerAdjustment",
      operation: "GetById",
      method: "GET",
      path: `/CustomerAdjustment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: CustomerAdjustmentSchema,
      options,
    });
  }

  /** `POST /CustomerAdjustment/Save` [POST-CustomerAdjustment-Save] — Saves the specified Customer Adjustment. */
  public async save(
    input: z.infer<typeof CustomerAdjustmentSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof CustomerAdjustmentSchema>> {
    return this.executor.request({
      resource: "CustomerAdjustment",
      operation: "Save",
      method: "POST",
      path: "/CustomerAdjustment/Save",
      body: input,
      requestSchema: CustomerAdjustmentSchema,
      responseSchema: CustomerAdjustmentSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /CustomerAdjustment/Calculate` [POST-CustomerAdjustment-Calculate] — Calculates the specified Customer Adjustment total fields. */
  public async calculate(
    input: z.infer<typeof CustomerAdjustmentSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof CustomerAdjustmentSchema>> {
    return this.executor.request({
      resource: "CustomerAdjustment",
      operation: "Calculate",
      method: "POST",
      path: "/CustomerAdjustment/Calculate",
      body: input,
      requestSchema: CustomerAdjustmentSchema,
      responseSchema: CustomerAdjustmentSchema,
      options,
    });
  }
}

export class CustomerWriteOffService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /CustomerWriteOff/Get` [GET-CustomerWriteOff-Get] — Gets a List of Customer Write Offs. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof CustomerWriteOffSchema>>> {
    return this.executor.request({
      resource: "CustomerWriteOff",
      operation: "Get",
      method: "GET",
      path: "/CustomerWriteOff/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(CustomerWriteOffSchema),
      options,
    });
  }

  /** Async page iterator for `GET /CustomerWriteOff/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof CustomerWriteOffSchema>>,
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

  /** Async item iterator for `GET /CustomerWriteOff/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof CustomerWriteOffSchema>, void, undefined> {
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

  /** `POST /CustomerWriteOff/Save` [POST-CustomerWriteOff-Save_useSystemDocumentNumber] — Saves the specified Customer Write Off. */
  public async save(
    input: z.infer<typeof CustomerWriteOffSchema>,
    options?: RequestOptions & { readonly useSystemDocumentNumber?: boolean | undefined },
  ): Promise<z.infer<typeof CustomerWriteOffSchema>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.useSystemDocumentNumber !== undefined) {
      baseQuery["useSystemDocumentNumber"] = options.useSystemDocumentNumber;
    }
    return this.executor.request({
      resource: "CustomerWriteOff",
      operation: "Save",
      method: "POST",
      path: "/CustomerWriteOff/Save",
      query: buildQueryWithOData(baseQuery, options?.odata),
      body: input,
      requestSchema: CustomerWriteOffSchema,
      responseSchema: CustomerWriteOffSchema,
      isFinancialMutation: true,
      options,
    });
  }
}

export class AllocationService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /Allocation/Get` [GET-Allocation-Get] — Gets a list of Allocations. */
  public async list(options?: RequestOptions): Promise<SagePage<z.infer<typeof AllocationSchema>>> {
    return this.executor.request({
      resource: "Allocation",
      operation: "Get",
      method: "GET",
      path: "/Allocation/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(AllocationSchema),
      options,
    });
  }

  /** Async page iterator for `GET /Allocation/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof AllocationSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /Allocation/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof AllocationSchema>, void, undefined> {
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

  /** `GET /Allocation/Get/{id}` [GET-Allocation-Get-id] — Gets the specified Allocation based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AllocationSchema>> {
    return this.executor.request({
      resource: "Allocation",
      operation: "GetById",
      method: "GET",
      path: `/Allocation/Get/${encodeURIComponent(String(id))}`,
      responseSchema: AllocationSchema,
      options,
    });
  }

  /** `DELETE /Allocation/Delete/{id}` [DELETE-Allocation-Delete-id] — Deletes the specified Allocation. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "Allocation",
      operation: "Delete",
      method: "DELETE",
      path: `/Allocation/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /Allocation/GetCustomerAllocationsAndOutstandingDocuments` [POST-Allocation-GetCustomerAllocationsAndOutstandingDocuments] — Gets the customer Allocations and outstanding documents. */
  public async getCustomerAllocationsAndOutstandingDocuments(
    input: z.infer<typeof AllocationRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AllocatedCustomerDocumentSchema>>> {
    return this.executor.request({
      resource: "Allocation",
      operation: "GetCustomerAllocationsAndOutstandingDocuments",
      method: "POST",
      path: "/Allocation/GetCustomerAllocationsAndOutstandingDocuments",
      body: input,
      requestSchema: AllocationRequestModelSchema,
      responseSchema: z.array(AllocatedCustomerDocumentSchema),
      options,
    });
  }

  /** `POST /Allocation/GetSupplierAllocationsAndOutstandingDocuments` [POST-Allocation-GetSupplierAllocationsAndOutstandingDocuments] — Gets the supplier Allocations and outstanding documents. */
  public async getSupplierAllocationsAndOutstandingDocuments(
    input: z.infer<typeof AllocationRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AllocatedSupplierDocumentSchema>>> {
    return this.executor.request({
      resource: "Allocation",
      operation: "GetSupplierAllocationsAndOutstandingDocuments",
      method: "POST",
      path: "/Allocation/GetSupplierAllocationsAndOutstandingDocuments",
      body: input,
      requestSchema: AllocationRequestModelSchema,
      responseSchema: z.array(AllocatedSupplierDocumentSchema),
      options,
    });
  }

  /** `POST /Allocation/Save` [POST-Allocation-Save] — Saves the specified Allocation. */
  public async save(
    input: z.infer<typeof AllocationSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AllocationSchema>> {
    return this.executor.request({
      resource: "Allocation",
      operation: "Save",
      method: "POST",
      path: "/Allocation/Save",
      body: input,
      requestSchema: AllocationSchema,
      responseSchema: AllocationSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /Allocation/SaveBatch` [POST-Allocation-SaveBatch] — Saves the batch of Allocations. */
  public async saveBatch(
    input: readonly z.infer<typeof AllocationSchema>[],
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AllocationSchema>>> {
    return this.executor.request({
      resource: "Allocation",
      operation: "SaveBatch",
      method: "POST",
      path: "/Allocation/SaveBatch",
      body: input,
      requestSchema: z.array(AllocationSchema),
      responseSchema: z.array(AllocationSchema),
      isFinancialMutation: true,
      options,
    });
  }
}

export class OutstandingCustomerDocumentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /OutstandingCustomerDocument/Get` [POST-OutstandingCustomerDocument-Get] — Gets a list of Outstanding Customer Documents based on the request. */
  public async get(
    input: z.infer<typeof OutstandingCustomerDocumentRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof OutstandingCustomerDocumentSchema>>> {
    return this.executor.request({
      resource: "OutstandingCustomerDocument",
      operation: "Get",
      method: "POST",
      path: "/OutstandingCustomerDocument/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: OutstandingCustomerDocumentRequestModelSchema,
      responseSchema: createSagePageSchema(OutstandingCustomerDocumentSchema),
      options,
    });
  }
}

export class CustomerAgeingService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /CustomerAgeing/GetSummary` [POST-CustomerAgeing-GetSummary] — Gets the specified Customer Ageing Summary statement based on the request. */
  public async getSummary(
    input: z.infer<typeof CustomerAgeingRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof CustomerAgeingSchema>> {
    return this.executor.request({
      resource: "CustomerAgeing",
      operation: "GetSummary",
      method: "POST",
      path: "/CustomerAgeing/GetSummary",
      body: input,
      requestSchema: CustomerAgeingRequestModelSchema,
      responseSchema: CustomerAgeingSchema,
      options,
    });
  }

  /** `POST /CustomerAgeing/GetDetail` [POST-CustomerAgeing-GetDetail] — Gets a list of Customer Ageing statements based on the request. */
  public async getDetail(
    input: z.infer<typeof CustomerAgeingRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof CustomerAgeingSchema>>> {
    return this.executor.request({
      resource: "CustomerAgeing",
      operation: "GetDetail",
      method: "POST",
      path: "/CustomerAgeing/GetDetail",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: CustomerAgeingRequestModelSchema,
      responseSchema: createSagePageSchema(CustomerAgeingSchema),
      options,
    });
  }
}

export class CustomerTransactionListingService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /CustomerTransactionListing/GetCustomerTransactionListingReportingDetail` [POST-CustomerTransactionListing-GetCustomerTransactionListingReportingDetail] — Gets the Customer Transaction Listing. */
  public async getCustomerTransactionListingReportingDetail(
    input: z.infer<typeof CustomerTransactionListingRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof TransactionListingSchema>>> {
    return this.executor.request({
      resource: "CustomerTransactionListing",
      operation: "GetCustomerTransactionListingReportingDetail",
      method: "POST",
      path: "/CustomerTransactionListing/GetCustomerTransactionListingReportingDetail",
      body: input,
      requestSchema: CustomerTransactionListingRequestModelSchema,
      responseSchema: z.array(TransactionListingSchema),
      options,
    });
  }
}

export class CustomerSalesHistoryService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /CustomerSalesHistory/Get` [POST-CustomerSalesHistory-Get] — Gets the specified Customer Sales History. */
  public async get(
    input: z.infer<typeof CustomerSalesHistoryRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof CustomerSalesHistorySchema>>> {
    return this.executor.request({
      resource: "CustomerSalesHistory",
      operation: "Get",
      method: "POST",
      path: "/CustomerSalesHistory/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: CustomerSalesHistoryRequestModelSchema,
      responseSchema: createSagePageSchema(CustomerSalesHistorySchema),
      options,
    });
  }
}

export class CustomerZoneService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /CustomerZone/GetCustomerZoneInvoiceUrl` [POST-CustomerZone-GetCustomerZoneInvoiceUrl] — Gets the Customer Zone URL of a specified Invoice */
  public async getCustomerZoneInvoiceUrl(
    input: z.infer<typeof CustomerZoneUrlRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<string> {
    return this.executor.request({
      resource: "CustomerZone",
      operation: "GetCustomerZoneInvoiceUrl",
      method: "POST",
      path: "/CustomerZone/GetCustomerZoneInvoiceUrl",
      body: input,
      requestSchema: CustomerZoneUrlRequestModelSchema,
      responseSchema: z.string(),
      options,
    });
  }

  /** `POST /CustomerZone/GetCustomerZoneQuoteUrl` [POST-CustomerZone-GetCustomerZoneQuoteUrl] — Gets the Customer Zone URL of a specified Quote */
  public async getCustomerZoneQuoteUrl(
    input: z.infer<typeof CustomerZoneUrlRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<string> {
    return this.executor.request({
      resource: "CustomerZone",
      operation: "GetCustomerZoneQuoteUrl",
      method: "POST",
      path: "/CustomerZone/GetCustomerZoneQuoteUrl",
      body: input,
      requestSchema: CustomerZoneUrlRequestModelSchema,
      responseSchema: z.string(),
      options,
    });
  }
}

export class CustomerAdditionalContactDetailService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `DELETE /CustomerAdditionalContactDetail/Delete/{id}` [DELETE-CustomerAdditionalContactDetail-Delete-id] — Deletes the specified Customer Additional Contact Detail. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "CustomerAdditionalContactDetail",
      operation: "Delete",
      method: "DELETE",
      path: `/CustomerAdditionalContactDetail/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /CustomerAdditionalContactDetail/Get` [GET-CustomerAdditionalContactDetail-Get] — Gets a list of Customer Additional Contact Details. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof CustomerAdditionalContactDetailSchema>>> {
    return this.executor.request({
      resource: "CustomerAdditionalContactDetail",
      operation: "Get",
      method: "GET",
      path: "/CustomerAdditionalContactDetail/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(CustomerAdditionalContactDetailSchema),
      options,
    });
  }

  /** Async page iterator for `GET /CustomerAdditionalContactDetail/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof CustomerAdditionalContactDetailSchema>>,
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

  /** Async item iterator for `GET /CustomerAdditionalContactDetail/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof CustomerAdditionalContactDetailSchema>, void, undefined> {
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

  /** `GET /CustomerAdditionalContactDetail/Get/{id}` [GET-CustomerAdditionalContactDetail-Get-id] — Gets the specified Customer Additional Contact Detail based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof CustomerAdditionalContactDetailSchema>> {
    return this.executor.request({
      resource: "CustomerAdditionalContactDetail",
      operation: "GetById",
      method: "GET",
      path: `/CustomerAdditionalContactDetail/Get/${encodeURIComponent(String(id))}`,
      responseSchema: CustomerAdditionalContactDetailSchema,
      options,
    });
  }

  /** `POST /CustomerAdditionalContactDetail/Save` [POST-CustomerAdditionalContactDetail-Save] — Saves the specified Customer Additional Contact Detail. */
  public async save(
    input: z.infer<typeof CustomerAdditionalContactDetailSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof CustomerAdditionalContactDetailSchema>> {
    return this.executor.request({
      resource: "CustomerAdditionalContactDetail",
      operation: "Save",
      method: "POST",
      path: "/CustomerAdditionalContactDetail/Save",
      body: input,
      requestSchema: CustomerAdditionalContactDetailSchema,
      responseSchema: CustomerAdditionalContactDetailSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /CustomerAdditionalContactDetail/GetAdditionalContactDetails/{id}` [GET-CustomerAdditionalContactDetail-GetAdditionalContactDetails-id] — Gets the Additional Contacts Listing for a specific Customer. */
  public async getAdditionalContactDetails(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof CustomerAdditionalContactDetailSchema>>> {
    return this.executor.request({
      resource: "CustomerAdditionalContactDetail",
      operation: "GetAdditionalContactDetails",
      method: "GET",
      path: `/CustomerAdditionalContactDetail/GetAdditionalContactDetails/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(CustomerAdditionalContactDetailSchema),
      options,
    });
  }
}

export class CustomerAdditionalContactOptionsService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /CustomerAdditionalContactOptions/Get` [GET-CustomerAdditionalContactOptions-Get] — No documentation available. */
  public async list(
    options?: RequestOptions,
  ): Promise<z.infer<typeof CustomerAdditionalContactOptionDTOSchema>> {
    return this.executor.request({
      resource: "CustomerAdditionalContactOptions",
      operation: "Get",
      method: "GET",
      path: "/CustomerAdditionalContactOptions/Get",
      responseSchema: CustomerAdditionalContactOptionDTOSchema,
      options,
    });
  }

  /** `GET /CustomerAdditionalContactOptions/Get/{id}` [GET-CustomerAdditionalContactOptions-Get-id] — No documentation available. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof CustomerAdditionalContactOptionDTOSchema>> {
    return this.executor.request({
      resource: "CustomerAdditionalContactOptions",
      operation: "GetById",
      method: "GET",
      path: `/CustomerAdditionalContactOptions/Get/${encodeURIComponent(String(id))}`,
      responseSchema: CustomerAdditionalContactOptionDTOSchema,
      options,
    });
  }

  /** `POST /CustomerAdditionalContactOptions/SaveList` [POST-CustomerAdditionalContactOptions-SaveList] — No documentation available. */
  public async saveList(
    input: readonly z.infer<typeof CustomerAdditionalContactOptionDTOSchema>[],
    options?: RequestOptions,
  ): Promise<unknown> {
    return this.executor.request({
      resource: "CustomerAdditionalContactOptions",
      operation: "SaveList",
      method: "POST",
      path: "/CustomerAdditionalContactOptions/SaveList",
      body: input,
      requestSchema: z.array(CustomerAdditionalContactOptionDTOSchema),
      isFinancialMutation: true,
      options,
    });
  }
}

export class CustomerNoteAttachmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /CustomerNoteAttachment/Save` [POST-CustomerNoteAttachment-Save] — Saves the Attachment. The file data is transmitted as a multipart/form-data POST. In the query string of the Url or a parameter in the form post, a CustomerNoteId is required. A CustomerNoteId is the ID of the CustomerNote that this attachment must be linked to. This is Required and is not optional. */
  public async save(
    upload: {
      readonly CustomerNoteId: number | string;
      readonly file: Blob | Uint8Array | string;
      readonly fileName?: string | undefined;
      readonly fieldName?: string | undefined;
    },
    options?: RequestOptions,
  ): Promise<unknown> {
    const formData = new FormData();
    formData.set("CustomerNoteId", String(upload.CustomerNoteId));
    const blob =
      upload.file instanceof Blob
        ? upload.file
        : new Blob([typeof upload.file === "string" ? upload.file : new Uint8Array(upload.file)]);
    formData.set(upload.fieldName ?? "file", blob, upload.fileName ?? "attachment.bin");
    return this.executor.request({
      resource: "CustomerNoteAttachment",
      operation: "Save",
      method: "POST",
      path: "/CustomerNoteAttachment/Save",
      query: buildQueryWithOData({ CustomerNoteId: upload.CustomerNoteId }, options?.odata),
      formData,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /CustomerNoteAttachment/Get/{id}` [GET-CustomerNoteAttachment-Get-id] — Gets the specified Attachment based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AttachmentSchema>>> {
    return this.executor.request({
      resource: "CustomerNoteAttachment",
      operation: "GetById",
      method: "GET",
      path: `/CustomerNoteAttachment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(AttachmentSchema),
      options,
    });
  }

  /** `GET /CustomerNoteAttachment/Download/{id}` [GET-CustomerNoteAttachment-Download-id] — Downloads the specified Attachment based on file identifier (Guid). */
  public async download(id: string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "CustomerNoteAttachment",
      operation: "Download",
      method: "GET",
      path: `/CustomerNoteAttachment/Download/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }

  /** `GET /CustomerNoteAttachment/GetCompanyStorageInformation` [GET-CustomerNoteAttachment-GetCompanyStorageInformation] — Gets the Company Storage Information. */
  public async getCompanyStorageInformation(
    options?: RequestOptions,
  ): Promise<z.infer<typeof StorageInformationSchema>> {
    return this.executor.request({
      resource: "CustomerNoteAttachment",
      operation: "GetCompanyStorageInformation",
      method: "GET",
      path: "/CustomerNoteAttachment/GetCompanyStorageInformation",
      responseSchema: StorageInformationSchema,
      options,
    });
  }

  /** `DELETE /CustomerNoteAttachment/Delete/{id}` [DELETE-CustomerNoteAttachment-Delete-id] — Deletes the specified Attachment based on file identifier (Guid). */
  public async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "CustomerNoteAttachment",
      operation: "Delete",
      method: "DELETE",
      path: `/CustomerNoteAttachment/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /CustomerNoteAttachment/DeleteAll/{id}` [DELETE-CustomerNoteAttachment-DeleteAll-id] — Deletes all Attachments based on the identifier. */
  public async deleteAll(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "CustomerNoteAttachment",
      operation: "DeleteAll",
      method: "DELETE",
      path: `/CustomerNoteAttachment/DeleteAll/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /CustomerNoteAttachment/Validate` [POST-CustomerNoteAttachment-Validate] — Validates the specified Entity. */
  public async validate(
    input: z.infer<typeof IModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "CustomerNoteAttachment",
      operation: "Validate",
      method: "POST",
      path: "/CustomerNoteAttachment/Validate",
      body: input,
      requestSchema: IModelSchema,
      responseType: "empty",
      options,
    });
  }
}

export class DashboardDebtorsManagerService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /DashboardDebtorsManager/GetDashboardTiles` [GET-DashboardDebtorsManager-GetDashboardTiles] — No documentation available. */
  public async getDashboardTiles(options?: RequestOptions): Promise<unknown> {
    return this.executor.request({
      resource: "DashboardDebtorsManager",
      operation: "GetDashboardTiles",
      method: "GET",
      path: "/DashboardDebtorsManager/GetDashboardTiles",
      options,
    });
  }

  /** `GET /DashboardDebtorsManager/GetDashboardReminders` [GET-DashboardDebtorsManager-GetDashboardReminders] — No documentation available. */
  public async getDashboardReminders(options?: RequestOptions): Promise<unknown> {
    return this.executor.request({
      resource: "DashboardDebtorsManager",
      operation: "GetDashboardReminders",
      method: "GET",
      path: "/DashboardDebtorsManager/GetDashboardReminders",
      options,
    });
  }

  /** `GET /DashboardDebtorsManager/GetLongestOverdue` [GET-DashboardDebtorsManager-GetLongestOverdue] — No documentation available. */
  public async getLongestOverdue(options?: RequestOptions): Promise<unknown> {
    return this.executor.request({
      resource: "DashboardDebtorsManager",
      operation: "GetLongestOverdue",
      method: "GET",
      path: "/DashboardDebtorsManager/GetLongestOverdue",
      options,
    });
  }
}

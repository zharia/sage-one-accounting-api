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

export const AdditionalPriceListSchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string(),
    IsDefault: z.boolean().optional(),
  })
  .passthrough();
export type AdditionalPriceList = z.infer<typeof AdditionalPriceListSchema>;

export const AttachmentSchema = z
  .object({
    Name: z.string(),
    Size: z.number().int().optional(),
    AttachmentUID: z.string().optional(),
    Data: z.string().optional(),
  })
  .passthrough();
export type Attachment = z.infer<typeof AttachmentSchema>;

export const CommercialDocumentLineSchema = z
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
export type CommercialDocumentLine = z.infer<typeof CommercialDocumentLineSchema>;

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

export const DocumentFileAttachmentDeleteRequestModelSchema = z
  .object({
    FileUID: z.string().optional(),
    FileUserUID: z.string().optional(),
    BusinessBaseId: z.string().optional(),
  })
  .passthrough();
export type DocumentFileAttachmentDeleteRequestModel = z.infer<
  typeof DocumentFileAttachmentDeleteRequestModelSchema
>;

export const DocumentHeaderNoteSchema = z
  .object({
    ID: z.number().int().optional(),
    CompanyId: z.number().int().optional(),
    DocumentHeaderId: z.number().int().optional(),
    NoteTypeId: z.number().int().optional(),
    UserId: z.number().int().optional(),
    Username: z.string().optional(),
    Created: z.string().optional(),
    ActionDate: z.string().nullable().optional(),
    Note: z.string().optional(),
    Completed: z.boolean().optional(),
  })
  .passthrough();
export type DocumentHeaderNote = z.infer<typeof DocumentHeaderNoteSchema>;

export const DocumentHistorySchema = z
  .object({
    DocumentHistoryId: z.number().int().nullable().optional(),
    CompanyId: z.number().int().nullable().optional(),
    DocumentHeaderId: z.number().int().nullable().optional(),
    Date: z.string().nullable().optional(),
    UserId: z.number().int().nullable().optional(),
    Username: z.string().nullable().optional(),
    Change: z.string().nullable().optional(),
    Detail: z.string().nullable().optional(),
  })
  .passthrough();
export type DocumentHistory = z.infer<typeof DocumentHistorySchema>;

export const DocumentMessageSchema = z
  .object({
    ID: z.number().int().optional(),
    DocumentTypeId: z.number().int().optional(),
    Message: z.string().optional(),
  })
  .passthrough();
export type DocumentMessage = z.infer<typeof DocumentMessageSchema>;

export const DocumentNumberSchema = z
  .object({
    ID: z.number().int().optional(),
    DocumentTypeId: z.number().int().optional(),
    NextDocumentNumber: z.string().optional(),
  })
  .passthrough();
export type DocumentNumber = z.infer<typeof DocumentNumberSchema>;

export const DocumentUserDefinedFieldSchema = z
  .object({
    ID: z.number().int().nullable().optional(),
    DocumentTypeId: z.number().int().nullable().optional(),
    TextField1: z.string().nullable().optional(),
    TextField2: z.string().nullable().optional(),
    TextField3: z.string().nullable().optional(),
    DateField1: z.string().nullable().optional(),
    DateField2: z.string().nullable().optional(),
    DateField3: z.string().nullable().optional(),
  })
  .passthrough();
export type DocumentUserDefinedField = z.infer<typeof DocumentUserDefinedFieldSchema>;

export const DocumentUserDefinedFieldsEntrySchema = z
  .object({
    ID: z.number().int().optional(),
    DocumentHeaderId: z.number().int().optional(),
    TextField1: z.string().optional(),
    TextField2: z.string().optional(),
    TextField3: z.string().optional(),
    DateField1: z.string().nullable().optional(),
    DateField2: z.string().nullable().optional(),
    DateField3: z.string().nullable().optional(),
  })
  .passthrough();
export type DocumentUserDefinedFieldsEntry = z.infer<typeof DocumentUserDefinedFieldsEntrySchema>;

export const EmailRequestModelSchema = z
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
export type EmailRequestModel = z.infer<typeof EmailRequestModelSchema>;

export const EmailSignatureTemplateSchema = z
  .object({
    ID: z.number().int().optional(),
    CompanyId: z.number().int().optional(),
    EmailTemplateTypeId: z.number().int().optional(),
    EmailTemplateTypeDescription: z.string().optional(),
    Name: z.string(),
    Subject: z.string(),
    Template: z.string(),
  })
  .passthrough();
export type EmailSignatureTemplate = z.infer<typeof EmailSignatureTemplateSchema>;

export const EmailTemplatePlaceHolderSchema = z
  .object({
    ID: z.number().int().nullable().optional(),
    EmailTemplateTypeId: z.number().int().nullable().optional(),
    PlaceHolder: z.string().nullable().optional(),
    PropertyName: z.string().nullable().optional(),
    Type: z.string().nullable().optional(),
  })
  .passthrough();
export type EmailTemplatePlaceHolder = z.infer<typeof EmailTemplatePlaceHolderSchema>;

export const IBigModelSchema = z
  .object({
    ID: z.number().int().optional(),
  })
  .passthrough();
export type IBigModel = z.infer<typeof IBigModelSchema>;

export const QuickEnquiryQuoteSummarySchema = z
  .object({
    OutstandingCount: z.number().int().optional(),
    OutstandingTotal: z.number().optional(),
    TotalForYear: z.number().optional(),
    ExpiredCount: z.number().int().optional(),
    ExpiredTotal: z.number().optional(),
  })
  .passthrough();
export type QuickEnquiryQuoteSummary = z.infer<typeof QuickEnquiryQuoteSummarySchema>;

export const QuoteSchema = z
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
    ExpiryDate: z.string(),
    AllowOnlineAccept: z.boolean().nullable().optional(),
    Status: z.string().optional(),
    UseForeignCurrency: z.boolean().optional(),
    Lines: z.array(z.lazy(() => CommercialDocumentLineSchema)).optional(),
  })
  .passthrough();
export type Quote = z.infer<typeof QuoteSchema>;

export const RecurringInvoiceSchema = z
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
    Schedule: z.lazy(() => ScheduleSchema).optional(),
    RecurringProfile: z.lazy(() => RecurringProfileSchema).optional(),
    Lines: z.array(z.lazy(() => CommercialDocumentLineSchema)).optional(),
  })
  .passthrough();
export type RecurringInvoice = z.infer<typeof RecurringInvoiceSchema>;

export const RecurringProfileSchema = z
  .object({
    ID: z.number().int().optional(),
    AutoCreate: z.boolean(),
    DueDateMethodId: z.union([
      z.literal(0),
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
    ]),
    DueDateMethodValue: z.number().int(),
    EmailContent: z.string().optional(),
    CarbonCopySender: z.boolean().nullable().optional(),
    CarbonCopyEmail: z.string().optional(),
    EmailSignatureTemplateId: z.number().int().nullable().optional(),
  })
  .passthrough();
export type RecurringProfile = z.infer<typeof RecurringProfileSchema>;

export const SalesOrderSchema = z
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
    DeliveryDate: z.string(),
    AllowOnlineAccept: z.boolean().nullable().optional(), // read-only / system generated
    Status: z.string().optional(), // read-only / system generated
    UseForeignCurrency: z.boolean().optional(),
    FromDocument: z.string().optional(),
    FromDocumentId: z.number().int().optional(),
    FromDocumentTypeId: z.number().int().nullable().optional(),
    Lines: z.array(z.lazy(() => CommercialDocumentLineSchema)).optional(),
  })
  .passthrough();
export type SalesOrder = z.infer<typeof SalesOrderSchema>;

export const SalesRepresentativeSchema = z
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
export type SalesRepresentative = z.infer<typeof SalesRepresentativeSchema>;

export const SalesRepresentativeNoteSchema = z
  .object({
    ID: z.number().int(),
    Subject: z.string(),
    EntryDate: z.string().nullable().optional(),
    ActionDate: z.string(),
    Status: z.boolean().nullable().optional(),
    Note: z.string().optional(),
    SalesRepresentativeId: z.number().int().optional(),
    SalesRepresentativeNoteId: z.number().int().optional(),
    HasAttachments: z.boolean().nullable().optional(),
  })
  .passthrough();
export type SalesRepresentativeNote = z.infer<typeof SalesRepresentativeNoteSchema>;

export const ScheduleSchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string().optional(),
    ScheduleFrequencyId: z.number().int(),
    StartDate: z.string(),
    EndDate: z.string().nullable().optional(),
    Active: z.boolean().optional(),
  })
  .passthrough();
export type Schedule = z.infer<typeof ScheduleSchema>;

export const StorageInformationSchema = z
  .object({
    SizeUsed: z.number().int().optional(),
    MaxSizeAllowed: z.number().int().optional(),
  })
  .passthrough();
export type StorageInformation = z.infer<typeof StorageInformationSchema>;

export const TaxInvoiceSchema = z
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
export type TaxInvoice = z.infer<typeof TaxInvoiceSchema>;

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

export class QuoteService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /Quote/Get` [GET-Quote-Get_includeDetail_includeCustomerDetails] — Gets a list of quotes. */
  public async list(
    options?: RequestOptions & {
      readonly includeDetail?: boolean | undefined;
      readonly includeCustomerDetails?: boolean | undefined;
    },
  ): Promise<SagePage<z.infer<typeof QuoteSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.includeDetail !== undefined) {
      baseQuery["includeDetail"] = options.includeDetail;
    }
    if (options?.includeCustomerDetails !== undefined) {
      baseQuery["includeCustomerDetails"] = options.includeCustomerDetails;
    }
    return this.executor.request({
      resource: "Quote",
      operation: "Get",
      method: "GET",
      path: "/Quote/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(QuoteSchema),
      options,
    });
  }

  /** Async page iterator for `GET /Quote/Get`. */
  public pages(
    options?: RequestOptions & {
      readonly includeDetail?: boolean | undefined;
      readonly includeCustomerDetails?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof QuoteSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /Quote/Get`. */
  public iterate(
    options?: RequestOptions & {
      readonly includeDetail?: boolean | undefined;
      readonly includeCustomerDetails?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof QuoteSchema>, void, undefined> {
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

  /** `GET /Quote/Get/{id}` [GET-Quote-Get-id] — Gets the specified Quote based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof QuoteSchema>> {
    return this.executor.request({
      resource: "Quote",
      operation: "GetById",
      method: "GET",
      path: `/Quote/Get/${encodeURIComponent(String(id))}`,
      responseSchema: QuoteSchema,
      options,
    });
  }

  /** `POST /Quote/Save` [POST-Quote-Save_useSystemDocumentNumber] — Saves the specified Quote. */
  public async save(
    input: z.infer<typeof QuoteSchema>,
    options?: RequestOptions & { readonly useSystemDocumentNumber?: boolean | undefined },
  ): Promise<z.infer<typeof QuoteSchema>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.useSystemDocumentNumber !== undefined) {
      baseQuery["useSystemDocumentNumber"] = options.useSystemDocumentNumber;
    }
    return this.executor.request({
      resource: "Quote",
      operation: "Save",
      method: "POST",
      path: "/Quote/Save",
      query: buildQueryWithOData(baseQuery, options?.odata),
      body: input,
      requestSchema: QuoteSchema,
      responseSchema: QuoteSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /Quote/Calculate` [POST-Quote-Calculate] — Calculates the totals for the Quote, based on the document lines. */
  public async calculate(
    input: z.infer<typeof QuoteSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof QuoteSchema>> {
    return this.executor.request({
      resource: "Quote",
      operation: "Calculate",
      method: "POST",
      path: "/Quote/Calculate",
      body: input,
      requestSchema: QuoteSchema,
      responseSchema: QuoteSchema,
      options,
    });
  }

  /** `GET /Quote/Summary` [GET-Quote-Summary] — Summarize the information on all the outstanding quotes for all customers. */
  public async summary(
    options?: RequestOptions,
  ): Promise<z.infer<typeof QuickEnquiryQuoteSummarySchema>> {
    return this.executor.request({
      resource: "Quote",
      operation: "Summary",
      method: "GET",
      path: "/Quote/Summary",
      responseSchema: QuickEnquiryQuoteSummarySchema,
      options,
    });
  }

  /** `GET /Quote/Summary/{id}` [GET-Quote-Summary-id] — Summarize the information on all the outstanding quotes for a Customer based on the identifier passed through. */
  public async summaryByCustomerId(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof QuickEnquiryQuoteSummarySchema>> {
    return this.executor.request({
      resource: "Quote",
      operation: "Summary",
      method: "GET",
      path: `/Quote/Summary/${encodeURIComponent(String(id))}`,
      responseSchema: QuickEnquiryQuoteSummarySchema,
      options,
    });
  }

  /** `DELETE /Quote/Delete/{id}` [DELETE-Quote-Delete-id] — Deletes the specified Quote based on the identifier. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "Quote",
      operation: "Delete",
      method: "DELETE",
      path: `/Quote/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /Quote/Email` [POST-Quote-Email] — Emails the specified Quote based on the Email Request Model sent through. */
  public async email(
    input: z.infer<typeof EmailRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "Quote",
      operation: "Email",
      method: "POST",
      path: "/Quote/Email",
      body: input,
      requestSchema: EmailRequestModelSchema,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /Quote/Export/{id}` [GET-Quote-Export-id] — Downloads a copy of a Quote as a PDF file. */
  public async export(id: number | string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "Quote",
      operation: "Export",
      method: "GET",
      path: `/Quote/Export/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }
}

export class QuoteAttachmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /QuoteAttachment/Save` [POST-QuoteAttachment-Save] — Saves the Attachment. The file data is transmitted as a multipart/form-data POST. In the query string of the Url or a parameter in the form post, a TransactionId is required. A TransactionId is the ID of the Quote that this attachment must be linked to. This is Required and is not optional. */
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
      resource: "QuoteAttachment",
      operation: "Save",
      method: "POST",
      path: "/QuoteAttachment/Save",
      query: buildQueryWithOData({ TransactionId: upload.TransactionId }, options?.odata),
      formData,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /QuoteAttachment/Get/{id}` [GET-QuoteAttachment-Get-id] — Gets the specified Attachment based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AttachmentSchema>>> {
    return this.executor.request({
      resource: "QuoteAttachment",
      operation: "GetById",
      method: "GET",
      path: `/QuoteAttachment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(AttachmentSchema),
      options,
    });
  }

  /** `GET /QuoteAttachment/Download/{id}` [GET-QuoteAttachment-Download-id] — Downloads the specified Attachment based on file identifier (Guid). */
  public async download(id: string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "QuoteAttachment",
      operation: "Download",
      method: "GET",
      path: `/QuoteAttachment/Download/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }

  /** `GET /QuoteAttachment/GetCompanyStorageInformation` [GET-QuoteAttachment-GetCompanyStorageInformation] — Gets the Company Storage Information. */
  public async getCompanyStorageInformation(
    options?: RequestOptions,
  ): Promise<z.infer<typeof StorageInformationSchema>> {
    return this.executor.request({
      resource: "QuoteAttachment",
      operation: "GetCompanyStorageInformation",
      method: "GET",
      path: "/QuoteAttachment/GetCompanyStorageInformation",
      responseSchema: StorageInformationSchema,
      options,
    });
  }

  /** `DELETE /QuoteAttachment/Delete/{id}` [DELETE-QuoteAttachment-Delete-id] — Deletes the specified Attachment based on file identifier (Guid). */
  public async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "QuoteAttachment",
      operation: "Delete",
      method: "DELETE",
      path: `/QuoteAttachment/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /QuoteAttachment/DeleteAll/{id}` [DELETE-QuoteAttachment-DeleteAll-id] — Deletes all Attachments based on the identifier. */
  public async deleteAll(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "QuoteAttachment",
      operation: "DeleteAll",
      method: "DELETE",
      path: `/QuoteAttachment/DeleteAll/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /QuoteAttachment/Validate` [POST-QuoteAttachment-Validate] — Validates the specified Entity. */
  public async validate(
    input: z.infer<typeof IBigModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "QuoteAttachment",
      operation: "Validate",
      method: "POST",
      path: "/QuoteAttachment/Validate",
      body: input,
      requestSchema: IBigModelSchema,
      responseType: "empty",
      options,
    });
  }
}

export class TaxInvoiceService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /TaxInvoice/Get` [GET-TaxInvoice-Get_includeDetail_includeCustomerDetails] — Gets a list of Tax Invoices. */
  public async list(
    options?: RequestOptions & {
      readonly includeDetail?: boolean | undefined;
      readonly includeCustomerDetails?: boolean | undefined;
    },
  ): Promise<SagePage<z.infer<typeof TaxInvoiceSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.includeDetail !== undefined) {
      baseQuery["includeDetail"] = options.includeDetail;
    }
    if (options?.includeCustomerDetails !== undefined) {
      baseQuery["includeCustomerDetails"] = options.includeCustomerDetails;
    }
    return this.executor.request({
      resource: "TaxInvoice",
      operation: "Get",
      method: "GET",
      path: "/TaxInvoice/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(TaxInvoiceSchema),
      options,
    });
  }

  /** Async page iterator for `GET /TaxInvoice/Get`. */
  public pages(
    options?: RequestOptions & {
      readonly includeDetail?: boolean | undefined;
      readonly includeCustomerDetails?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof TaxInvoiceSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /TaxInvoice/Get`. */
  public iterate(
    options?: RequestOptions & {
      readonly includeDetail?: boolean | undefined;
      readonly includeCustomerDetails?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof TaxInvoiceSchema>, void, undefined> {
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

  /** `GET /TaxInvoice/Get/{id}` [GET-TaxInvoice-Get-id] — Gets the specified Tax Invoice based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof TaxInvoiceSchema>> {
    return this.executor.request({
      resource: "TaxInvoice",
      operation: "GetById",
      method: "GET",
      path: `/TaxInvoice/Get/${encodeURIComponent(String(id))}`,
      responseSchema: TaxInvoiceSchema,
      options,
    });
  }

  /** `POST /TaxInvoice/Save` [POST-TaxInvoice-Save_useSystemDocumentNumber] — Saves the specified Tax Invoice. */
  public async save(
    input: z.infer<typeof TaxInvoiceSchema>,
    options?: RequestOptions & { readonly useSystemDocumentNumber?: boolean | undefined },
  ): Promise<z.infer<typeof TaxInvoiceSchema>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.useSystemDocumentNumber !== undefined) {
      baseQuery["useSystemDocumentNumber"] = options.useSystemDocumentNumber;
    }
    return this.executor.request({
      resource: "TaxInvoice",
      operation: "Save",
      method: "POST",
      path: "/TaxInvoice/Save",
      query: buildQueryWithOData(baseQuery, options?.odata),
      body: input,
      requestSchema: TaxInvoiceSchema,
      responseSchema: TaxInvoiceSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /TaxInvoice/Calculate` [POST-TaxInvoice-Calculate] — Calculates the specified Tax Invoice total fields. */
  public async calculate(
    input: z.infer<typeof TaxInvoiceSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof TaxInvoiceSchema>> {
    return this.executor.request({
      resource: "TaxInvoice",
      operation: "Calculate",
      method: "POST",
      path: "/TaxInvoice/Calculate",
      body: input,
      requestSchema: TaxInvoiceSchema,
      responseSchema: TaxInvoiceSchema,
      options,
    });
  }

  /** `POST /TaxInvoice/Email` [POST-TaxInvoice-Email] — Emails the specified Tax Invoice. */
  public async email(
    input: z.infer<typeof EmailRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "TaxInvoice",
      operation: "Email",
      method: "POST",
      path: "/TaxInvoice/Email",
      body: input,
      requestSchema: EmailRequestModelSchema,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /TaxInvoice/EmailDeliveryNote` [POST-TaxInvoice-EmailDeliveryNote] — Emails the delivery note for a specific Tax Invoice */
  public async emailDeliveryNote(
    input: z.infer<typeof EmailRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "TaxInvoice",
      operation: "EmailDeliveryNote",
      method: "POST",
      path: "/TaxInvoice/EmailDeliveryNote",
      body: input,
      requestSchema: EmailRequestModelSchema,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /TaxInvoice/Export/{id}` [GET-TaxInvoice-Export-id] — Downloads a copy of a Tax Invoice as a PDF file. */
  public async export(id: number | string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "TaxInvoice",
      operation: "Export",
      method: "GET",
      path: `/TaxInvoice/Export/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }
}

export class TaxInvoiceAttachmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /TaxInvoiceAttachment/Save` [POST-TaxInvoiceAttachment-Save] — Saves the Attachment. The file data is transmitted as a multipart/form-data POST. In the query string of the Url or a parameter in the form post, a TransactionId is required. A TransactionId is the ID of the TaxInvoice that this attachment must be linked to. This is Required and is not optional. */
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
      resource: "TaxInvoiceAttachment",
      operation: "Save",
      method: "POST",
      path: "/TaxInvoiceAttachment/Save",
      query: buildQueryWithOData({ TransactionId: upload.TransactionId }, options?.odata),
      formData,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /TaxInvoiceAttachment/Get/{id}` [GET-TaxInvoiceAttachment-Get-id] — Gets the specified Attachment based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AttachmentSchema>>> {
    return this.executor.request({
      resource: "TaxInvoiceAttachment",
      operation: "GetById",
      method: "GET",
      path: `/TaxInvoiceAttachment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(AttachmentSchema),
      options,
    });
  }

  /** `GET /TaxInvoiceAttachment/Download/{id}` [GET-TaxInvoiceAttachment-Download-id] — Downloads the specified Attachment based on file identifier (Guid). */
  public async download(id: string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "TaxInvoiceAttachment",
      operation: "Download",
      method: "GET",
      path: `/TaxInvoiceAttachment/Download/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }

  /** `GET /TaxInvoiceAttachment/GetCompanyStorageInformation` [GET-TaxInvoiceAttachment-GetCompanyStorageInformation] — Gets the Company Storage Information. */
  public async getCompanyStorageInformation(
    options?: RequestOptions,
  ): Promise<z.infer<typeof StorageInformationSchema>> {
    return this.executor.request({
      resource: "TaxInvoiceAttachment",
      operation: "GetCompanyStorageInformation",
      method: "GET",
      path: "/TaxInvoiceAttachment/GetCompanyStorageInformation",
      responseSchema: StorageInformationSchema,
      options,
    });
  }

  /** `DELETE /TaxInvoiceAttachment/Delete/{id}` [DELETE-TaxInvoiceAttachment-Delete-id] — Deletes the specified Attachment based on file identifier (Guid). */
  public async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "TaxInvoiceAttachment",
      operation: "Delete",
      method: "DELETE",
      path: `/TaxInvoiceAttachment/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /TaxInvoiceAttachment/DeleteAll/{id}` [DELETE-TaxInvoiceAttachment-DeleteAll-id] — Deletes all Attachments based on the identifier. */
  public async deleteAll(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "TaxInvoiceAttachment",
      operation: "DeleteAll",
      method: "DELETE",
      path: `/TaxInvoiceAttachment/DeleteAll/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /TaxInvoiceAttachment/Validate` [POST-TaxInvoiceAttachment-Validate] — Validates the specified Entity. */
  public async validate(
    input: z.infer<typeof IBigModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "TaxInvoiceAttachment",
      operation: "Validate",
      method: "POST",
      path: "/TaxInvoiceAttachment/Validate",
      body: input,
      requestSchema: IBigModelSchema,
      responseType: "empty",
      options,
    });
  }
}

export class SalesOrderService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /SalesOrder/Get` [GET-SalesOrder-Get_includeDetail_includeCustomerDetails] — Gets a list of sales orders. */
  public async list(
    options?: RequestOptions & {
      readonly includeDetail?: boolean | undefined;
      readonly includeCustomerDetails?: boolean | undefined;
    },
  ): Promise<SagePage<z.infer<typeof SalesOrderSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.includeDetail !== undefined) {
      baseQuery["includeDetail"] = options.includeDetail;
    }
    if (options?.includeCustomerDetails !== undefined) {
      baseQuery["includeCustomerDetails"] = options.includeCustomerDetails;
    }
    return this.executor.request({
      resource: "SalesOrder",
      operation: "Get",
      method: "GET",
      path: "/SalesOrder/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(SalesOrderSchema),
      options,
    });
  }

  /** Async page iterator for `GET /SalesOrder/Get`. */
  public pages(
    options?: RequestOptions & {
      readonly includeDetail?: boolean | undefined;
      readonly includeCustomerDetails?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof SalesOrderSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /SalesOrder/Get`. */
  public iterate(
    options?: RequestOptions & {
      readonly includeDetail?: boolean | undefined;
      readonly includeCustomerDetails?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof SalesOrderSchema>, void, undefined> {
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

  /** `GET /SalesOrder/Get/{id}` [GET-SalesOrder-Get-id] — Gets the specified SalesOrder based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SalesOrderSchema>> {
    return this.executor.request({
      resource: "SalesOrder",
      operation: "GetById",
      method: "GET",
      path: `/SalesOrder/Get/${encodeURIComponent(String(id))}`,
      responseSchema: SalesOrderSchema,
      options,
    });
  }

  /** `POST /SalesOrder/Save` [POST-SalesOrder-Save_useSystemDocumentNumber] — Saves the specified Sales Order. */
  public async save(
    input: z.infer<typeof SalesOrderSchema>,
    options?: RequestOptions & { readonly useSystemDocumentNumber?: boolean | undefined },
  ): Promise<z.infer<typeof SalesOrderSchema>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.useSystemDocumentNumber !== undefined) {
      baseQuery["useSystemDocumentNumber"] = options.useSystemDocumentNumber;
    }
    return this.executor.request({
      resource: "SalesOrder",
      operation: "Save",
      method: "POST",
      path: "/SalesOrder/Save",
      query: buildQueryWithOData(baseQuery, options?.odata),
      body: input,
      requestSchema: SalesOrderSchema,
      responseSchema: SalesOrderSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /SalesOrder/Calculate` [POST-SalesOrder-Calculate] — Calculates the totals for the Sales Order, based on the document lines. */
  public async calculate(
    input: z.infer<typeof SalesOrderSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SalesOrderSchema>> {
    return this.executor.request({
      resource: "SalesOrder",
      operation: "Calculate",
      method: "POST",
      path: "/SalesOrder/Calculate",
      body: input,
      requestSchema: SalesOrderSchema,
      responseSchema: SalesOrderSchema,
      options,
    });
  }

  /** `DELETE /SalesOrder/Delete/{id}` [DELETE-SalesOrder-Delete-id] — Deletes the specified Sales Order based on the identifier. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SalesOrder",
      operation: "Delete",
      method: "DELETE",
      path: `/SalesOrder/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /SalesOrder/Email` [POST-SalesOrder-Email] — Emails the specified Sales Order based on the Email Request Model sent through. */
  public async email(
    input: z.infer<typeof EmailRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "SalesOrder",
      operation: "Email",
      method: "POST",
      path: "/SalesOrder/Email",
      body: input,
      requestSchema: EmailRequestModelSchema,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /SalesOrder/Export/{id}` [GET-SalesOrder-Export-id] — Downloads a copy of a Sales Order as a PDF file. */
  public async export(id: number | string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "SalesOrder",
      operation: "Export",
      method: "GET",
      path: `/SalesOrder/Export/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }
}

export class SalesOrderAttachmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /SalesOrderAttachment/Save` [POST-SalesOrderAttachment-Save] — Saves the Attachment. The file data is transmitted as a multipart/form-data POST. In the query string of the Url or a parameter in the form post, a TransactionId is required. A TransactionId is the ID of the Sales Order that this attachment must be linked to. This is Required and is not optional. */
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
      resource: "SalesOrderAttachment",
      operation: "Save",
      method: "POST",
      path: "/SalesOrderAttachment/Save",
      query: buildQueryWithOData({ TransactionId: upload.TransactionId }, options?.odata),
      formData,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /SalesOrderAttachment/Get/{id}` [GET-SalesOrderAttachment-Get-id] — Gets the specified Attachment based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AttachmentSchema>>> {
    return this.executor.request({
      resource: "SalesOrderAttachment",
      operation: "GetById",
      method: "GET",
      path: `/SalesOrderAttachment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(AttachmentSchema),
      options,
    });
  }

  /** `GET /SalesOrderAttachment/Download/{id}` [GET-SalesOrderAttachment-Download-id] — Downloads the specified Attachment based on file identifier (Guid). */
  public async download(id: string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "SalesOrderAttachment",
      operation: "Download",
      method: "GET",
      path: `/SalesOrderAttachment/Download/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }

  /** `GET /SalesOrderAttachment/GetCompanyStorageInformation` [GET-SalesOrderAttachment-GetCompanyStorageInformation] — Gets the Company Storage Information. */
  public async getCompanyStorageInformation(
    options?: RequestOptions,
  ): Promise<z.infer<typeof StorageInformationSchema>> {
    return this.executor.request({
      resource: "SalesOrderAttachment",
      operation: "GetCompanyStorageInformation",
      method: "GET",
      path: "/SalesOrderAttachment/GetCompanyStorageInformation",
      responseSchema: StorageInformationSchema,
      options,
    });
  }

  /** `DELETE /SalesOrderAttachment/Delete/{id}` [DELETE-SalesOrderAttachment-Delete-id] — Deletes the specified Attachment based on file identifier (Guid). */
  public async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SalesOrderAttachment",
      operation: "Delete",
      method: "DELETE",
      path: `/SalesOrderAttachment/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /SalesOrderAttachment/DeleteAll/{id}` [DELETE-SalesOrderAttachment-DeleteAll-id] — Deletes all Attachments based on the identifier. */
  public async deleteAll(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SalesOrderAttachment",
      operation: "DeleteAll",
      method: "DELETE",
      path: `/SalesOrderAttachment/DeleteAll/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /SalesOrderAttachment/Validate` [POST-SalesOrderAttachment-Validate] — Validates the specified Entity. */
  public async validate(
    input: z.infer<typeof IBigModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "SalesOrderAttachment",
      operation: "Validate",
      method: "POST",
      path: "/SalesOrderAttachment/Validate",
      body: input,
      requestSchema: IBigModelSchema,
      responseType: "empty",
      options,
    });
  }
}

export class RecurringInvoiceService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /RecurringInvoice/Get` [GET-RecurringInvoice-Get_includeDetail] — Gets a list of Recurring Invoices. */
  public async list(
    options?: RequestOptions & { readonly includeDetail?: boolean | undefined },
  ): Promise<Array<z.infer<typeof RecurringInvoiceSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.includeDetail !== undefined) {
      baseQuery["includeDetail"] = options.includeDetail;
    }
    return this.executor.request({
      resource: "RecurringInvoice",
      operation: "Get",
      method: "GET",
      path: "/RecurringInvoice/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: z.array(RecurringInvoiceSchema),
      options,
    });
  }

  /** `GET /RecurringInvoice/Get/{id}` [GET-RecurringInvoice-Get-id] — Gets the specified Recurring Invoice based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof RecurringInvoiceSchema>> {
    return this.executor.request({
      resource: "RecurringInvoice",
      operation: "GetById",
      method: "GET",
      path: `/RecurringInvoice/Get/${encodeURIComponent(String(id))}`,
      responseSchema: RecurringInvoiceSchema,
      options,
    });
  }

  /** `POST /RecurringInvoice/Save` [POST-RecurringInvoice-Save_useSystemDocumentNumber] — Saves the specified recurring Invoice. */
  public async save(
    input: z.infer<typeof RecurringInvoiceSchema>,
    options?: RequestOptions & { readonly useSystemDocumentNumber?: boolean | undefined },
  ): Promise<z.infer<typeof RecurringInvoiceSchema>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.useSystemDocumentNumber !== undefined) {
      baseQuery["useSystemDocumentNumber"] = options.useSystemDocumentNumber;
    }
    return this.executor.request({
      resource: "RecurringInvoice",
      operation: "Save",
      method: "POST",
      path: "/RecurringInvoice/Save",
      query: buildQueryWithOData(baseQuery, options?.odata),
      body: input,
      requestSchema: RecurringInvoiceSchema,
      responseSchema: RecurringInvoiceSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /RecurringInvoice/Delete/{id}` [POST-RecurringInvoice-Delete-id] — Deletes the specified Recurring Invoice based on the identifier. If the Recurring Invoice is not in use. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "RecurringInvoice",
      operation: "Delete",
      method: "POST",
      path: `/RecurringInvoice/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class SalesRepresentativeService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /SalesRepresentative/Save` [POST-SalesRepresentative-Save] — Saves the specified Sales Representative. */
  public async save(
    input: z.infer<typeof SalesRepresentativeSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SalesRepresentativeSchema>> {
    return this.executor.request({
      resource: "SalesRepresentative",
      operation: "Save",
      method: "POST",
      path: "/SalesRepresentative/Save",
      body: input,
      requestSchema: SalesRepresentativeSchema,
      responseSchema: SalesRepresentativeSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /SalesRepresentative/Get` [GET-SalesRepresentative-Get] — Gets a list of Sales Representatives. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof SalesRepresentativeSchema>>> {
    return this.executor.request({
      resource: "SalesRepresentative",
      operation: "Get",
      method: "GET",
      path: "/SalesRepresentative/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(SalesRepresentativeSchema),
      options,
    });
  }

  /** Async page iterator for `GET /SalesRepresentative/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof SalesRepresentativeSchema>>,
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

  /** Async item iterator for `GET /SalesRepresentative/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof SalesRepresentativeSchema>, void, undefined> {
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

  /** `GET /SalesRepresentative/Get/{id}` [GET-SalesRepresentative-Get-id] — Gets the specified Sales Representative based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SalesRepresentativeSchema>> {
    return this.executor.request({
      resource: "SalesRepresentative",
      operation: "GetById",
      method: "GET",
      path: `/SalesRepresentative/Get/${encodeURIComponent(String(id))}`,
      responseSchema: SalesRepresentativeSchema,
      options,
    });
  }

  /** `DELETE /SalesRepresentative/Delete/{id}` [DELETE-SalesRepresentative-Delete-id] — Deletes the specified Sales Representative based on the identifier. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SalesRepresentative",
      operation: "Delete",
      method: "DELETE",
      path: `/SalesRepresentative/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /SalesRepresentative/HasActivity/{id}` [GET-SalesRepresentative-HasActivity-id] — Determines whether the specified Sales Representative has activity. */
  public async hasActivity(id: number | string, options?: RequestOptions): Promise<boolean> {
    return this.executor.request({
      resource: "SalesRepresentative",
      operation: "HasActivity",
      method: "GET",
      path: `/SalesRepresentative/HasActivity/${encodeURIComponent(String(id))}`,
      responseSchema: z.boolean(),
      options,
    });
  }
}

export class SalesRepresentativeNoteService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /SalesRepresentativeNote/Save` [POST-SalesRepresentativeNote-Save] — Saves the specified Sales Representative Note. */
  public async save(
    input: z.infer<typeof SalesRepresentativeNoteSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SalesRepresentativeNoteSchema>> {
    return this.executor.request({
      resource: "SalesRepresentativeNote",
      operation: "Save",
      method: "POST",
      path: "/SalesRepresentativeNote/Save",
      body: input,
      requestSchema: SalesRepresentativeNoteSchema,
      responseSchema: SalesRepresentativeNoteSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /SalesRepresentativeNote/Get` [GET-SalesRepresentativeNote-Get] — Gets a list of Sales Representative Notes. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof SalesRepresentativeNoteSchema>>> {
    return this.executor.request({
      resource: "SalesRepresentativeNote",
      operation: "Get",
      method: "GET",
      path: "/SalesRepresentativeNote/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(SalesRepresentativeNoteSchema),
      options,
    });
  }

  /** Async page iterator for `GET /SalesRepresentativeNote/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof SalesRepresentativeNoteSchema>>,
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

  /** Async item iterator for `GET /SalesRepresentativeNote/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof SalesRepresentativeNoteSchema>, void, undefined> {
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

  /** `GET /SalesRepresentativeNote/Get/{id}` [GET-SalesRepresentativeNote-Get-id] — Gets the specified Sales Representative Note based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SalesRepresentativeNoteSchema>> {
    return this.executor.request({
      resource: "SalesRepresentativeNote",
      operation: "GetById",
      method: "GET",
      path: `/SalesRepresentativeNote/Get/${encodeURIComponent(String(id))}`,
      responseSchema: SalesRepresentativeNoteSchema,
      options,
    });
  }

  /** `GET /SalesRepresentativeNote/RefreshHasAttachments/{id}` [GET-SalesRepresentativeNote-RefreshHasAttachments-id] — Refreshes Has Attachment status of the specified Sales Representative Note based on the identifier. */
  public async refreshHasAttachments(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SalesRepresentativeNoteSchema>> {
    return this.executor.request({
      resource: "SalesRepresentativeNote",
      operation: "RefreshHasAttachments",
      method: "GET",
      path: `/SalesRepresentativeNote/RefreshHasAttachments/${encodeURIComponent(String(id))}`,
      responseSchema: SalesRepresentativeNoteSchema,
      options,
    });
  }

  /** `DELETE /SalesRepresentativeNote/Delete/{id}` [DELETE-SalesRepresentativeNote-Delete-id] — Deletes the specified Sales Representative Note based on the identifier. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SalesRepresentativeNote",
      operation: "Delete",
      method: "DELETE",
      path: `/SalesRepresentativeNote/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class DocumentNumberService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /DocumentNumber/Get` [GET-DocumentNumber-Get] — Gets a List of Document Numbers. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof DocumentNumberSchema>>> {
    return this.executor.request({
      resource: "DocumentNumber",
      operation: "Get",
      method: "GET",
      path: "/DocumentNumber/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(DocumentNumberSchema),
      options,
    });
  }

  /** Async page iterator for `GET /DocumentNumber/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof DocumentNumberSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /DocumentNumber/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof DocumentNumberSchema>, void, undefined> {
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

  /** `GET /DocumentNumber/Get/{id}` [GET-DocumentNumber-Get-id] — Gets the specified Document Number based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof DocumentNumberSchema>> {
    return this.executor.request({
      resource: "DocumentNumber",
      operation: "GetById",
      method: "GET",
      path: `/DocumentNumber/Get/${encodeURIComponent(String(id))}`,
      responseSchema: DocumentNumberSchema,
      options,
    });
  }

  /** `POST /DocumentNumber/Save` [POST-DocumentNumber-Save] — Updates existing Document Number. */
  public async save(
    input: z.infer<typeof DocumentNumberSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof DocumentNumberSchema>> {
    return this.executor.request({
      resource: "DocumentNumber",
      operation: "Save",
      method: "POST",
      path: "/DocumentNumber/Save",
      body: input,
      requestSchema: DocumentNumberSchema,
      responseSchema: DocumentNumberSchema,
      isFinancialMutation: true,
      options,
    });
  }
}

export class DocumentMessageService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /DocumentMessage/Get` [GET-DocumentMessage-Get] — Gets a List of Document Messages. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof DocumentMessageSchema>>> {
    return this.executor.request({
      resource: "DocumentMessage",
      operation: "Get",
      method: "GET",
      path: "/DocumentMessage/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(DocumentMessageSchema),
      options,
    });
  }

  /** Async page iterator for `GET /DocumentMessage/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof DocumentMessageSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /DocumentMessage/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof DocumentMessageSchema>, void, undefined> {
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

  /** `GET /DocumentMessage/Get/{id}` [GET-DocumentMessage-Get-id] — Gets the specified Document Message based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof DocumentMessageSchema>> {
    return this.executor.request({
      resource: "DocumentMessage",
      operation: "GetById",
      method: "GET",
      path: `/DocumentMessage/Get/${encodeURIComponent(String(id))}`,
      responseSchema: DocumentMessageSchema,
      options,
    });
  }

  /** `POST /DocumentMessage/Save` [POST-DocumentMessage-Save] — Saves the specified Customer. */
  public async save(
    input: z.infer<typeof DocumentMessageSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof DocumentMessageSchema>> {
    return this.executor.request({
      resource: "DocumentMessage",
      operation: "Save",
      method: "POST",
      path: "/DocumentMessage/Save",
      body: input,
      requestSchema: DocumentMessageSchema,
      responseSchema: DocumentMessageSchema,
      isFinancialMutation: true,
      options,
    });
  }
}

export class DocumentHeaderNoteService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /DocumentHeaderNote/Save` [POST-DocumentHeaderNote-Save] — Saves the specified Document Header Note. */
  public async save(
    input: z.infer<typeof DocumentHeaderNoteSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof DocumentHeaderNoteSchema>> {
    return this.executor.request({
      resource: "DocumentHeaderNote",
      operation: "Save",
      method: "POST",
      path: "/DocumentHeaderNote/Save",
      body: input,
      requestSchema: DocumentHeaderNoteSchema,
      responseSchema: DocumentHeaderNoteSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /DocumentHeaderNote/Get` [GET-DocumentHeaderNote-Get] — Gets a list of Document Header Notes. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof DocumentHeaderNoteSchema>>> {
    return this.executor.request({
      resource: "DocumentHeaderNote",
      operation: "Get",
      method: "GET",
      path: "/DocumentHeaderNote/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(DocumentHeaderNoteSchema),
      options,
    });
  }

  /** Async page iterator for `GET /DocumentHeaderNote/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof DocumentHeaderNoteSchema>>,
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

  /** Async item iterator for `GET /DocumentHeaderNote/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof DocumentHeaderNoteSchema>, void, undefined> {
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

  /** `GET /DocumentHeaderNote/Get/{id}` [GET-DocumentHeaderNote-Get-id] — Gets the specified Document Header Note based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof DocumentHeaderNoteSchema>> {
    return this.executor.request({
      resource: "DocumentHeaderNote",
      operation: "GetById",
      method: "GET",
      path: `/DocumentHeaderNote/Get/${encodeURIComponent(String(id))}`,
      responseSchema: DocumentHeaderNoteSchema,
      options,
    });
  }
}

export class DocumentHistoryService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /DocumentHistory/Get` [GET-DocumentHistory-Get_documentHeaderId_documentTypeId] — Gets the specified Transactions Document History. */
  public async list(
    options?: RequestOptions & {
      readonly documentHeaderId?: number | undefined;
      readonly documentTypeId?: number | undefined;
    },
  ): Promise<SagePage<z.infer<typeof DocumentHistorySchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.documentHeaderId !== undefined) {
      baseQuery["documentHeaderId"] = options.documentHeaderId;
    }
    if (options?.documentTypeId !== undefined) {
      baseQuery["documentTypeId"] = options.documentTypeId;
    }
    return this.executor.request({
      resource: "DocumentHistory",
      operation: "Get",
      method: "GET",
      path: "/DocumentHistory/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(DocumentHistorySchema),
      options,
    });
  }

  /** Async page iterator for `GET /DocumentHistory/Get`. */
  public pages(
    options?: RequestOptions & {
      readonly documentHeaderId?: number | undefined;
      readonly documentTypeId?: number | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof DocumentHistorySchema>>, void, undefined> {
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

  /** Async item iterator for `GET /DocumentHistory/Get`. */
  public iterate(
    options?: RequestOptions & {
      readonly documentHeaderId?: number | undefined;
      readonly documentTypeId?: number | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof DocumentHistorySchema>, void, undefined> {
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

export class DocumentUserDefinedFieldsService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /DocumentUserDefinedFields/Get` [GET-DocumentUserDefinedFields-Get] — Gets a list of Document User Defined Fields */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof DocumentUserDefinedFieldSchema>>> {
    return this.executor.request({
      resource: "DocumentUserDefinedFields",
      operation: "Get",
      method: "GET",
      path: "/DocumentUserDefinedFields/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(DocumentUserDefinedFieldSchema),
      options,
    });
  }

  /** Async page iterator for `GET /DocumentUserDefinedFields/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof DocumentUserDefinedFieldSchema>>,
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

  /** Async item iterator for `GET /DocumentUserDefinedFields/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof DocumentUserDefinedFieldSchema>, void, undefined> {
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

  /** `GET /DocumentUserDefinedFields/GetEntries` [GET-DocumentUserDefinedFields-GetEntries] — Gets a list of Document User Defined Field Entries */
  public async getEntries(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof DocumentUserDefinedFieldsEntrySchema>>> {
    return this.executor.request({
      resource: "DocumentUserDefinedFields",
      operation: "GetEntries",
      method: "GET",
      path: "/DocumentUserDefinedFields/GetEntries",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(DocumentUserDefinedFieldsEntrySchema),
      options,
    });
  }

  /** `GET /DocumentUserDefinedFields/GetEntryByDocumentId` [GET-DocumentUserDefinedFields-GetEntryByDocumentId_documentId] — Gets a specific Document User Defined Field Entry */
  public async getEntryByDocumentId(
    options?: RequestOptions & { readonly documentId?: number | undefined },
  ): Promise<z.infer<typeof DocumentUserDefinedFieldsEntrySchema>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.documentId !== undefined) {
      baseQuery["documentId"] = options.documentId;
    }
    return this.executor.request({
      resource: "DocumentUserDefinedFields",
      operation: "GetEntryByDocumentId",
      method: "GET",
      path: "/DocumentUserDefinedFields/GetEntryByDocumentId",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: DocumentUserDefinedFieldsEntrySchema,
      options,
    });
  }

  /** `POST /DocumentUserDefinedFields/Save` [POST-DocumentUserDefinedFields-Save] — Saves a specific Document User Defined Field Entry */
  public async save(
    input: z.infer<typeof DocumentUserDefinedFieldsEntrySchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof DocumentUserDefinedFieldsEntrySchema>> {
    return this.executor.request({
      resource: "DocumentUserDefinedFields",
      operation: "Save",
      method: "POST",
      path: "/DocumentUserDefinedFields/Save",
      body: input,
      requestSchema: DocumentUserDefinedFieldsEntrySchema,
      responseSchema: DocumentUserDefinedFieldsEntrySchema,
      isFinancialMutation: true,
      options,
    });
  }
}

export class DocumentFileAttachmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /DocumentFileAttachment/GetWithFilter` [POST-DocumentFileAttachment-GetWithFilter] — No documentation available. */
  public async getWithFilter(input?: unknown, options?: RequestOptions): Promise<unknown> {
    return this.executor.request({
      resource: "DocumentFileAttachment",
      operation: "GetWithFilter",
      method: "POST",
      path: "/DocumentFileAttachment/GetWithFilter",
      body: input,
      options,
    });
  }

  /** `DELETE /DocumentFileAttachment/Delete` [DELETE-DocumentFileAttachment-Delete] — No documentation available. */
  public async delete(
    input: z.infer<typeof DocumentFileAttachmentDeleteRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<string> {
    return this.executor.request({
      resource: "DocumentFileAttachment",
      operation: "Delete",
      method: "DELETE",
      path: "/DocumentFileAttachment/Delete",
      body: input,
      requestSchema: DocumentFileAttachmentDeleteRequestModelSchema,
      responseSchema: z.string(),
      isFinancialMutation: true,
      options,
    });
  }
}

export class AttachmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /Attachment/GetCompanyStorageInformation` [GET-Attachment-GetCompanyStorageInformation] — Gets the Company Storage Information. */
  public async getCompanyStorageInformation(
    options?: RequestOptions,
  ): Promise<z.infer<typeof StorageInformationSchema>> {
    return this.executor.request({
      resource: "Attachment",
      operation: "GetCompanyStorageInformation",
      method: "GET",
      path: "/Attachment/GetCompanyStorageInformation",
      responseSchema: StorageInformationSchema,
      options,
    });
  }
}

export class EmailSignatureTemplateService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `DELETE /EmailSignatureTemplate/Delete/{id}` [DELETE-EmailSignatureTemplate-Delete-id] — Deletes the specified Email Signature based on the identifier. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "EmailSignatureTemplate",
      operation: "Delete",
      method: "DELETE",
      path: `/EmailSignatureTemplate/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /EmailSignatureTemplate/Get` [GET-EmailSignatureTemplate-Get_includeDefaults] — Gets a list of the Email Signature Templates. */
  public async list(
    options?: RequestOptions & { readonly includeDefaults?: boolean | undefined },
  ): Promise<SagePage<z.infer<typeof EmailSignatureTemplateSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.includeDefaults !== undefined) {
      baseQuery["includeDefaults"] = options.includeDefaults;
    }
    return this.executor.request({
      resource: "EmailSignatureTemplate",
      operation: "Get",
      method: "GET",
      path: "/EmailSignatureTemplate/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(EmailSignatureTemplateSchema),
      options,
    });
  }

  /** Async page iterator for `GET /EmailSignatureTemplate/Get`. */
  public pages(
    options?: RequestOptions & {
      readonly includeDefaults?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof EmailSignatureTemplateSchema>>,
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

  /** Async item iterator for `GET /EmailSignatureTemplate/Get`. */
  public iterate(
    options?: RequestOptions & {
      readonly includeDefaults?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof EmailSignatureTemplateSchema>, void, undefined> {
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

  /** `GET /EmailSignatureTemplate/Get/{id}` [GET-EmailSignatureTemplate-Get-id] — Gets the Email Signature Template based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof EmailSignatureTemplateSchema>> {
    return this.executor.request({
      resource: "EmailSignatureTemplate",
      operation: "GetById",
      method: "GET",
      path: `/EmailSignatureTemplate/Get/${encodeURIComponent(String(id))}`,
      responseSchema: EmailSignatureTemplateSchema,
      options,
    });
  }

  /** `GET /EmailSignatureTemplate/EmailSignatureTemplateInUse/{id}` [GET-EmailSignatureTemplate-EmailSignatureTemplateInUse-id] — Checks if the Email Signature Template based on the identifier is currently being used. */
  public async emailSignatureTemplateInUse(
    id: number | string,
    options?: RequestOptions,
  ): Promise<boolean> {
    return this.executor.request({
      resource: "EmailSignatureTemplate",
      operation: "EmailSignatureTemplateInUse",
      method: "GET",
      path: `/EmailSignatureTemplate/EmailSignatureTemplateInUse/${encodeURIComponent(String(id))}`,
      responseSchema: z.boolean(),
      options,
    });
  }

  /** `POST /EmailSignatureTemplate/Save` [POST-EmailSignatureTemplate-Save] — Saves the specified Email Signature Template. */
  public async save(
    input: z.infer<typeof EmailSignatureTemplateSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof EmailSignatureTemplateSchema>> {
    return this.executor.request({
      resource: "EmailSignatureTemplate",
      operation: "Save",
      method: "POST",
      path: "/EmailSignatureTemplate/Save",
      body: input,
      requestSchema: EmailSignatureTemplateSchema,
      responseSchema: EmailSignatureTemplateSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /EmailSignatureTemplate/GetPopulatedSignatureByDocumentId/{id}` [GET-EmailSignatureTemplate-GetPopulatedSignatureByDocumentId-id] — Gets the default Email Signature Template with placeholders replaced. */
  public async getPopulatedSignatureByDocumentId(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof EmailSignatureTemplateSchema>> {
    return this.executor.request({
      resource: "EmailSignatureTemplate",
      operation: "GetPopulatedSignatureByDocumentId",
      method: "GET",
      path: `/EmailSignatureTemplate/GetPopulatedSignatureByDocumentId/${encodeURIComponent(String(id))}`,
      responseSchema: EmailSignatureTemplateSchema,
      options,
    });
  }
}

export class EmailTemplatePlaceHolderService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /EmailTemplatePlaceHolder/Get` [GET-EmailTemplatePlaceHolder-Get] — Gets a list of Email Template Place Holders. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof EmailTemplatePlaceHolderSchema>>> {
    return this.executor.request({
      resource: "EmailTemplatePlaceHolder",
      operation: "Get",
      method: "GET",
      path: "/EmailTemplatePlaceHolder/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(EmailTemplatePlaceHolderSchema),
      options,
    });
  }

  /** Async page iterator for `GET /EmailTemplatePlaceHolder/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof EmailTemplatePlaceHolderSchema>>,
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

  /** Async item iterator for `GET /EmailTemplatePlaceHolder/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof EmailTemplatePlaceHolderSchema>, void, undefined> {
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

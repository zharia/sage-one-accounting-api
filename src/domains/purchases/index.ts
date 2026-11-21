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

const AttachmentSchema = z
  .object({
    Name: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Size: z.union([z.number().int(), z.string()]).nullable().optional(),
    AttachmentUID: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Data: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
  })
  .passthrough();

const EmailRequestModelSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    EmailAddress: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CCAddress: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    BCCAddress: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Subject: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Message: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Attachments: z
      .array(z.union([z.string(), z.record(z.string(), z.unknown())]))
      .nullable()
      .optional(),
  })
  .passthrough();

const IBigModelSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();

export const OutstandingSupplierDocumentSchema = z
  .object({
    DocumentTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    DueDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ExpectedPaymentDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    SupplierId: z.union([z.number().int(), z.string()]).nullable().optional(),
    SupplierName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Supplier: z.unknown().optional(),
    Modified: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Created: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    StatusId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Supplier_CurrencyId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Supplier_ExchangeRate: z.union([z.number().int(), z.string()]).nullable().optional(),
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Inclusive: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    DiscountPercentage: z.union([z.number(), z.string()]).nullable().optional(),
    TaxReference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DocumentNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Reference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Message: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Discount: z.union([z.number().int(), z.string()]).nullable().optional(),
    Exclusive: z.union([z.number().int(), z.string()]).nullable().optional(),
    Tax: z.union([z.number().int(), z.string()]).nullable().optional(),
    Rounding: z.union([z.number().int(), z.string()]).nullable().optional(),
    Total: z.union([z.number().int(), z.string()]).nullable().optional(),
    AmountDue: z.union([z.number().int(), z.string()]).nullable().optional(),
    PostalAddress01: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PostalAddress02: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PostalAddress03: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PostalAddress04: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PostalAddress05: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress01: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress02: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress03: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress04: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress05: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Printed: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    TaxPeriodId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Editable: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasAttachments: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasNotes: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasAnticipatedDate: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasSpecialCountryTax: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    AnticipatedDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ExternalReference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    UID: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Lines: z.array(z.unknown()).nullable().optional(),
  })
  .passthrough();
export type OutstandingSupplierDocument = z.infer<typeof OutstandingSupplierDocumentSchema>;

export const OutstandingSupplierDocumentRequestModelSchema = z
  .object({
    SupplierId: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type OutstandingSupplierDocumentRequestModel = z.infer<
  typeof OutstandingSupplierDocumentRequestModelSchema
>;

export const PurchaseOrderSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Inclusive: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    DiscountPercentage: z.union([z.number(), z.string()]).nullable().optional(),
    TaxReference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DocumentNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Reference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Message: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Discount: z.union([z.number(), z.string()]).nullable().optional(),
    Exclusive: z.union([z.number(), z.string()]).nullable().optional(),
    Tax: z.union([z.number(), z.string()]).nullable().optional(),
    Rounding: z.union([z.number(), z.string()]).nullable().optional(),
    Total: z.union([z.number(), z.string()]).nullable().optional(),
    AmountDue: z.union([z.number(), z.string()]).nullable().optional(),
    PostalAddress01: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PostalAddress02: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PostalAddress03: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PostalAddress04: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PostalAddress05: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress01: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress02: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress03: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress04: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress05: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    TaxPeriodId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Editable: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasAttachments: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasNotes: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasAnticipatedDate: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasSpecialCountryTax: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    AnticipatedDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ExternalReference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    UID: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    SupplierId: z.union([z.number().int(), z.string()]).nullable().optional(),
    SupplierName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Supplier: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    Modified: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Created: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    StatusId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Supplier_CurrencyId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Supplier_ExchangeRate: z.union([z.number(), z.string()]).nullable().optional(),
    DeliveryDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Status: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Lines: z.array(z.unknown()).nullable().optional(),
  })
  .passthrough();
export type PurchaseOrder = z.infer<typeof PurchaseOrderSchema>;

const StorageInformationSchema = z
  .object({
    SizeUsed: z.union([z.number().int(), z.string()]).nullable().optional(),
    MaxSizeAllowed: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();

export const SupplierAdjustmentSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    SupplierId: z.union([z.number().int(), z.string()]).nullable().optional(),
    DocumentNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Reference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    TaxTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Exclusive: z.union([z.number(), z.string()]).nullable().optional(),
    Tax: z.union([z.number(), z.string()]).nullable().optional(),
    Total: z.union([z.number(), z.string()]).nullable().optional(),
    ContraAccountId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Memo: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    HasAttachments: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Supplier: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    AccountName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    AnalysisCategoryId1: z.union([z.number().int(), z.string()]).nullable().optional(),
    AnalysisCategoryId2: z.union([z.number().int(), z.string()]).nullable().optional(),
    AnalysisCategoryId3: z.union([z.number().int(), z.string()]).nullable().optional(),
    Account: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    Locked: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    TaxPeriodId: z.union([z.number().int(), z.string()]).nullable().optional(),
    TotalOutstanding: z.union([z.number(), z.string()]).nullable().optional(),
    Inclusive: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Supplier_CurrencyId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Supplier_ExchangeRate: z.union([z.number(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type SupplierAdjustment = z.infer<typeof SupplierAdjustmentSchema>;

export const SupplierAgeingSchema = z
  .object({
    Current: z.union([z.number(), z.string()]).nullable().optional(),
    Days120Plus: z.union([z.number(), z.string()]).nullable().optional(),
    Days30: z.union([z.number(), z.string()]).nullable().optional(),
    Days60: z.union([z.number(), z.string()]).nullable().optional(),
    Days90: z.union([z.number(), z.string()]).nullable().optional(),
    Total: z.union([z.number(), z.string()]).nullable().optional(),
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Supplier: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    AgeingTransactions: z.array(z.unknown()).nullable().optional(),
  })
  .passthrough();
export type SupplierAgeing = z.infer<typeof SupplierAgeingSchema>;

export const SupplierAgeingRequestModelSchema = z
  .object({
    SupplierId: z.union([z.number().int(), z.string()]).nullable().optional(),
    ToDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Summary: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    AgeingPeriod: z.union([z.number().int(), z.string()]).nullable().optional(),
    FromSupplier: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToSupplier: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    FromCategory: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToCategory: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    IncludeActive: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IncludeInactive: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    BasedOnDueDate: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    ExcludeZeroBalance: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    UseForeignCurrency: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type SupplierAgeingRequestModel = z.infer<typeof SupplierAgeingRequestModelSchema>;

export const SupplierInvoiceSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Inclusive: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    DiscountPercentage: z.union([z.number(), z.string()]).nullable().optional(),
    TaxReference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DocumentNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Reference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Message: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Discount: z.union([z.number(), z.string()]).nullable().optional(),
    Exclusive: z.union([z.number(), z.string()]).nullable().optional(),
    Tax: z.union([z.number(), z.string()]).nullable().optional(),
    Rounding: z.union([z.number(), z.string()]).nullable().optional(),
    Total: z.union([z.number(), z.string()]).nullable().optional(),
    AmountDue: z.union([z.number(), z.string()]).nullable().optional(),
    PostalAddress01: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PostalAddress02: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PostalAddress03: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PostalAddress04: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PostalAddress05: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress01: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress02: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress03: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress04: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress05: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    TaxPeriodId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Editable: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasAttachments: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasNotes: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasAnticipatedDate: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasSpecialCountryTax: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    AnticipatedDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ExternalReference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    UID: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    SupplierId: z.union([z.number().int(), z.string()]).nullable().optional(),
    SupplierName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Supplier: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    Modified: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Created: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    StatusId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Supplier_CurrencyId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Supplier_ExchangeRate: z.union([z.number(), z.string()]).nullable().optional(),
    DueDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Paid: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Status: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    FromDocument: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Locked: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasAdditionalCost: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Lines: z.array(z.unknown()).nullable().optional(),
  })
  .passthrough();
export type SupplierInvoice = z.infer<typeof SupplierInvoiceSchema>;

export const SupplierPaymentSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    SupplierId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Payee: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DocumentNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Reference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Comments: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Total: z.union([z.number(), z.string()]).nullable().optional(),
    Discount: z.union([z.number(), z.string()]).nullable().optional(),
    TotalUnallocated: z.union([z.number(), z.string()]).nullable().optional(),
    Reconciled: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    BankAccountId: z.union([z.number().int(), z.string()]).nullable().optional(),
    PaymentMethod: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    Status: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    TaxPeriodId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Editable: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Accepted: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Locked: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    AnalysisCategoryId1: z.union([z.number().int(), z.string()]).nullable().optional(),
    AnalysisCategoryId2: z.union([z.number().int(), z.string()]).nullable().optional(),
    AnalysisCategoryId3: z.union([z.number().int(), z.string()]).nullable().optional(),
    Printed: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    BankUniqueIdentifier: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ImportTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    BankImportMappingId: z.union([z.number().int(), z.string()]).nullable().optional(),
    BankAccount_CurrencyId: z.union([z.number().int(), z.string()]).nullable().optional(),
    BankAccount_ExchangeRate: z.union([z.number(), z.string()]).nullable().optional(),
    Supplier_CurrencyId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Supplier_ExchangeRate: z.union([z.number(), z.string()]).nullable().optional(),
    Supplier: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    BankAccount: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    Modified: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Created: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    UID: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
  })
  .passthrough();
export type SupplierPayment = z.infer<typeof SupplierPaymentSchema>;

export const SupplierPurchaseHistorySchema = z
  .object({
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Supplier: z.unknown().optional(),
    Exclusive: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type SupplierPurchaseHistory = z.infer<typeof SupplierPurchaseHistorySchema>;

export const SupplierPurchaseHistoryRequestModelSchema = z
  .object({
    FromDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    SupplierId: z.union([z.number().int(), z.string()]).nullable().optional(),
    IncludeSupplierReturns: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    GroupingType: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type SupplierPurchaseHistoryRequestModel = z.infer<
  typeof SupplierPurchaseHistoryRequestModelSchema
>;

export const SupplierReturnSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Inclusive: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    DiscountPercentage: z.union([z.number(), z.string()]).nullable().optional(),
    TaxReference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DocumentNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Reference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Message: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Discount: z.union([z.number(), z.string()]).nullable().optional(),
    Exclusive: z.union([z.number(), z.string()]).nullable().optional(),
    Tax: z.union([z.number(), z.string()]).nullable().optional(),
    Rounding: z.union([z.number(), z.string()]).nullable().optional(),
    Total: z.union([z.number(), z.string()]).nullable().optional(),
    AmountDue: z.union([z.number(), z.string()]).nullable().optional(),
    PostalAddress01: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PostalAddress02: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PostalAddress03: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PostalAddress04: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PostalAddress05: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress01: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress02: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress03: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress04: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DeliveryAddress05: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    TaxPeriodId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Editable: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasAttachments: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasNotes: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasAnticipatedDate: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasSpecialCountryTax: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    AnticipatedDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ExternalReference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    UID: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    SupplierId: z.union([z.number().int(), z.string()]).nullable().optional(),
    SupplierName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Supplier: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    Modified: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Created: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    StatusId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Supplier_CurrencyId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Supplier_ExchangeRate: z.union([z.number(), z.string()]).nullable().optional(),
    FromDocument: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Locked: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Lines: z.array(z.unknown()).nullable().optional(),
  })
  .passthrough();
export type SupplierReturn = z.infer<typeof SupplierReturnSchema>;

export const SupplierTransactionListingRequestModelSchema = z
  .object({
    FromSupplier: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToSupplier: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    FromCategory: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToCategory: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    FromDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    IncludeActive: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IncludeInactive: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    TransactionType: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ShowOpeningBalance: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    UseForeignCurrency: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type SupplierTransactionListingRequestModel = z.infer<
  typeof SupplierTransactionListingRequestModelSchema
>;

export const TransactionListingSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Name: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CurrencySymbol: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    OpeningBalanceDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    OpeningBalance: z.union([z.number().int(), z.string()]).nullable().optional(),
    ClosingBalanceDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ClosingBalance: z.union([z.number().int(), z.string()]).nullable().optional(),
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

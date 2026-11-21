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

export const BalanceSheetReportingLevelSchema = z
  .object({
    Total: z.union([z.number().int(), z.string()]).nullable().optional(),
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Category: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CategoryId: z.union([z.number().int(), z.string()]).nullable().optional(),
    AccountTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Children: z.array(z.unknown()).nullable().optional(),
    ReportingLevelType: z.union([z.number().int(), z.string()]).nullable().optional(),
    AccountCategoryId: z.union([z.number().int(), z.string()]).nullable().optional(),
    AccountCategoryOrder: z.union([z.number().int(), z.string()]).nullable().optional(),
    AccountNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ItemReportingGroupTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type BalanceSheetReportingLevel = z.infer<typeof BalanceSheetReportingLevelSchema>;

export const BalanceSheetRequestModelSchema = z
  .object({
    RunAtDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DisplayReportingGroupDetail: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type BalanceSheetRequestModel = z.infer<typeof BalanceSheetRequestModelSchema>;

const CustomerSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Name: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Category: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    SalesRepresentativeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    SalesRepresentative: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    TaxReference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ContactName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Telephone: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Fax: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Mobile: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Email: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    WebAddress: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Active: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IsObfuscated: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Balance: z.union([z.number(), z.string()]).nullable().optional(),
    CreditLimit: z.union([z.number(), z.string()]).nullable().optional(),
    CommunicationMethod: z.union([z.number().int(), z.string()]).nullable().optional(),
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
    AutoAllocateToOldestInvoice: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    EnableCustomerZone: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    CustomerZoneGuid: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CashSale: z.union([z.boolean(), z.number().int()]).nullable().optional(),
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
    DefaultPriceListId: z.union([z.number().int(), z.string()]).nullable().optional(),
    DefaultPriceList: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    DefaultPriceListName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    AcceptsElectronicInvoices: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Modified: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Created: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    BusinessRegistrationNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    TaxStatusVerified: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CurrencyId: z.union([z.number().int(), z.string()]).nullable().optional(),
    CurrencySymbol: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    HasActivity: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    DefaultDiscountPercentage: z.union([z.number(), z.string()]).nullable().optional(),
    DefaultTaxTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    DefaultTaxType: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    DueDateMethodId: z.union([z.number().int(), z.string()]).nullable().optional(),
    DueDateMethodValue: z.union([z.number().int(), z.string()]).nullable().optional(),
    CityId: z.union([z.number().int(), z.string()]).nullable().optional(),
    AccountingAgreement: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasSpecialCountryTaxActivity: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    OutstandingInvoices: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    OverdueInvoices: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    OnHold: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    ExcludeFromDebtorsManager: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    SubjectToDRCVat: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();

export const IncomeVsExpenseSchema = z
  .object({
    FromDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Periods: z.array(z.unknown()).nullable().optional(),
    IsComparative: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    UsePurchases: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type IncomeVsExpense = z.infer<typeof IncomeVsExpenseSchema>;

export const IncomeVsExpenseRequestModelSchema = z
  .object({
    FromDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    UsePurchases: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    PeriodGroupingLength: z.union([z.number().int(), z.string()]).nullable().optional(),
    Comparative: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type IncomeVsExpenseRequestModel = z.infer<typeof IncomeVsExpenseRequestModelSchema>;

export const ProfitAndLossReportingLevelSchema = z
  .object({
    Total: z
      .array(z.union([z.number().int(), z.string()]))
      .nullable()
      .optional(),
    Variance: z.union([z.number().int(), z.string()]).nullable().optional(),
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Category: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CategoryId: z.union([z.number().int(), z.string()]).nullable().optional(),
    AccountTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Children: z.array(z.unknown()).nullable().optional(),
    ReportingLevelType: z.union([z.number().int(), z.string()]).nullable().optional(),
    AccountCategoryId: z.union([z.number().int(), z.string()]).nullable().optional(),
    AccountCategoryOrder: z.union([z.number().int(), z.string()]).nullable().optional(),
    AccountNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ItemReportingGroupTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type ProfitAndLossReportingLevel = z.infer<typeof ProfitAndLossReportingLevelSchema>;

export const ProfitAndLossStatementRequestModelSchema = z
  .object({
    FromDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    UsePurchases: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    DisplayReportingGroupDetail: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Comparative: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    BudgetId: z.union([z.number().int(), z.string()]).nullable().optional(),
    ShowVariance: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type ProfitAndLossStatementRequestModel = z.infer<
  typeof ProfitAndLossStatementRequestModelSchema
>;

export const SalesBySalesRepresentativeSchema = z
  .object({
    DocumentHeaderId: z.union([z.number().int(), z.string()]).nullable().optional(),
    DocumentTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    SalesRepresentativeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    DocumentNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    UnitPriceExclusive: z.union([z.number().int(), z.string()]).nullable().optional(),
    Quantity: z.union([z.number().int(), z.string()]).nullable().optional(),
    TotalCost: z.union([z.number().int(), z.string()]).nullable().optional(),
    Total: z.union([z.number().int(), z.string()]).nullable().optional(),
    Name: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CustomerName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    GPAmount: z.union([z.number().int(), z.string()]).nullable().optional(),
    GPPercentage: z.union([z.number(), z.string()]).nullable().optional(),
    TotalGroupAverage: z.union([z.number().int(), z.string()]).nullable().optional(),
    TotalReportAverage: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type SalesBySalesRepresentative = z.infer<typeof SalesBySalesRepresentativeSchema>;

export const SalesBySalesRepresentativeRequestModelSchema = z
  .object({
    FromSalesRepresentative: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToSalesRepresentative: z
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
    IncludeCreditNotes: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IncludeItems: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IncludeTime: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IncludeAccounts: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    UseLastCost: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type SalesBySalesRepresentativeRequestModel = z.infer<
  typeof SalesBySalesRepresentativeRequestModelSchema
>;

const SupplierSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Name: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Category: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    TaxReference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ContactName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Telephone: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Fax: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Mobile: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Email: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    WebAddress: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Active: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IsObfuscated: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Balance: z.union([z.number(), z.string()]).nullable().optional(),
    CreditLimit: z.union([z.number(), z.string()]).nullable().optional(),
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
    AutoAllocateToOldestInvoice: z.union([z.boolean(), z.number().int()]).nullable().optional(),
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
    AccountingAgreement: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasSpecialCountryTaxActivity: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Modified: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Created: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    BusinessRegistrationNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    RMCDApprovalNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    TaxStatusVerified: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CurrencyId: z.union([z.number().int(), z.string()]).nullable().optional(),
    CurrencySymbol: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    HasActivity: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    DefaultDiscountPercentage: z.union([z.number(), z.string()]).nullable().optional(),
    DefaultTaxTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    DefaultTaxType: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    DueDateMethodId: z.union([z.number().int(), z.string()]).nullable().optional(),
    DueDateMethodValue: z.union([z.number().int(), z.string()]).nullable().optional(),
    SubjectToDRCVat: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();

export const TopCustomersByOutstandingBalanceRequestModelSchema = z
  .object({
    ViewTop: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TopCustomersByOutstandingBalanceRequestModel = z.infer<
  typeof TopCustomersByOutstandingBalanceRequestModelSchema
>;

export const TopCustomersBySalesSchema = z
  .object({
    CustomerId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Name: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Exclusive: z.union([z.number().int(), z.string()]).nullable().optional(),
    Total: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TopCustomersBySales = z.infer<typeof TopCustomersBySalesSchema>;

export const TopCustomersBySalesRequestModelSchema = z
  .object({
    FromDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CustomerId: z.union([z.number().int(), z.string()]).nullable().optional(),
    IncludeCreditNotes: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    ViewTop: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TopCustomersBySalesRequestModel = z.infer<typeof TopCustomersBySalesRequestModelSchema>;

export const TopPurchasedItemSchema = z
  .object({
    ItemId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Exclusive: z.union([z.number().int(), z.string()]).nullable().optional(),
    Total: z.union([z.number().int(), z.string()]).nullable().optional(),
    Quantity: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TopPurchasedItem = z.infer<typeof TopPurchasedItemSchema>;

export const TopPurchasedItemRequestModelSchema = z
  .object({
    FromDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    IncludeOption: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    ViewTop: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TopPurchasedItemRequestModel = z.infer<typeof TopPurchasedItemRequestModelSchema>;

export const TopSellingItemSchema = z
  .object({
    ItemId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Exclusive: z.union([z.number().int(), z.string()]).nullable().optional(),
    Total: z.union([z.number().int(), z.string()]).nullable().optional(),
    Quantity: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TopSellingItem = z.infer<typeof TopSellingItemSchema>;

export const TopSellingItemByValueOnHandSchema = z
  .object({
    ItemId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    QuantityOnHand: z.union([z.number().int(), z.string()]).nullable().optional(),
    AverageCost: z.union([z.number().int(), z.string()]).nullable().optional(),
    ValueOnHand: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TopSellingItemByValueOnHand = z.infer<typeof TopSellingItemByValueOnHandSchema>;

export const TopSellingItemByValueOnHandRequestModelSchema = z
  .object({
    RunAtDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    UseLastCost: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    ViewTop: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TopSellingItemByValueOnHandRequestModel = z.infer<
  typeof TopSellingItemByValueOnHandRequestModelSchema
>;

export const TopSellingItemRequestModelSchema = z
  .object({
    FromDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    IncludeOption: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    ViewTop: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TopSellingItemRequestModel = z.infer<typeof TopSellingItemRequestModelSchema>;

export const TopSuppliersByOutstandingBalanceRequestModelSchema = z
  .object({
    ViewTop: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TopSuppliersByOutstandingBalanceRequestModel = z.infer<
  typeof TopSuppliersByOutstandingBalanceRequestModelSchema
>;

export const TopSuppliersByPurchasesSchema = z
  .object({
    Name: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Exclusive: z.union([z.number().int(), z.string()]).nullable().optional(),
    Total: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TopSuppliersByPurchases = z.infer<typeof TopSuppliersByPurchasesSchema>;

export const TopSuppliersByPurchasesRequestModelSchema = z
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
    ViewTop: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TopSuppliersByPurchasesRequestModel = z.infer<
  typeof TopSuppliersByPurchasesRequestModelSchema
>;

export const TrialBalanceExportMappingSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    AccountId: z.union([z.number().int(), z.string()]).nullable().optional(),
    AccountNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    AccountTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    TrialBalanceAccountTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    ExportCode: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
  })
  .passthrough();
export type TrialBalanceExportMapping = z.infer<typeof TrialBalanceExportMappingSchema>;

export const TrialBalanceRequestModelSchema = z
  .object({
    FromDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ShowMovement: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    DisplayReportingGroupDetail: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Comparative: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    CurrencyId: z.union([z.number().int(), z.string()]).nullable().optional(),
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

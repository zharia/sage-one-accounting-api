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

export const TimeTrackingExpenseSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    TimeTrackingProjectId: z.union([z.number().int(), z.string()]).nullable().optional(),
    DocumentHeaderId: z.union([z.number().int(), z.string()]).nullable().optional(),
    BillingMethod: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Payee: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Expense: z.union([z.number(), z.string()]).nullable().optional(),
    Recharge: z.union([z.number(), z.string()]).nullable().optional(),
    MarkupPercentage: z.union([z.number(), z.string()]).nullable().optional(),
    IsBilled: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type TimeTrackingExpense = z.infer<typeof TimeTrackingExpenseSchema>;

export const TimeTrackingExpenseExtendedSchema = z
  .object({
    Name: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Exclusive: z.union([z.number().int(), z.string()]).nullable().optional(),
    Total: z.union([z.number().int(), z.string()]).nullable().optional(),
    RechargeDescription: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    LinkedDocumentHeaderId: z.union([z.number().int(), z.string()]).nullable().optional(),
    LinkedDocumentTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    LinkedDocumentNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    TimeTrackingProjectId: z.union([z.number().int(), z.string()]).nullable().optional(),
    DocumentHeaderId: z.union([z.number().int(), z.string()]).nullable().optional(),
    BillingMethod: z.union([z.number().int(), z.string()]).nullable().optional(),
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Payee: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Expense: z.union([z.number().int(), z.string()]).nullable().optional(),
    Recharge: z.union([z.number().int(), z.string()]).nullable().optional(),
    MarkupPercentage: z.union([z.number(), z.string()]).nullable().optional(),
    IsBilled: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type TimeTrackingExpenseExtended = z.infer<typeof TimeTrackingExpenseExtendedSchema>;

export const TimeTrackingFilterRequestModelSchema = z
  .object({
    CustomerId: z.union([z.number().int(), z.string()]).nullable().optional(),
    ProjectId: z.union([z.number().int(), z.string()]).nullable().optional(),
    TaskId: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TimeTrackingFilterRequestModel = z.infer<typeof TimeTrackingFilterRequestModelSchema>;

export const TimeTrackingProjectSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Name: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CustomerID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Customer: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    BillingMethodID: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    InvoicingMethodID: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    EstimatedHours: z.union([z.number(), z.string()]).nullable().optional(),
    EstimatedValue: z.union([z.number(), z.string()]).nullable().optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    FixedRate: z.union([z.number(), z.string()]).nullable().optional(),
    RatePerHour: z.union([z.number(), z.string()]).nullable().optional(),
    PONumber: z
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
    LastInvoiceDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    LastInvoiceDocumentHeaderId: z.union([z.number().int(), z.string()]).nullable().optional(),
    AmountInvoiced: z.union([z.number(), z.string()]).nullable().optional(),
    ToBeInvoiced: z.union([z.number(), z.string()]).nullable().optional(),
    TotalHours: z.union([z.number(), z.string()]).nullable().optional(),
    UnbilledHours: z.union([z.number(), z.string()]).nullable().optional(),
    NonBillableHours: z.union([z.number(), z.string()]).nullable().optional(),
    BillableHours: z.union([z.number(), z.string()]).nullable().optional(),
    BillableAmount: z.union([z.number(), z.string()]).nullable().optional(),
    BudgetedHours: z.union([z.number(), z.string()]).nullable().optional(),
    ProjectTasks: z.array(z.unknown()).nullable().optional(),
    ProjectStaff: z.array(z.unknown()).nullable().optional(),
    Tasks: z.array(z.unknown()).nullable().optional(),
    Billable: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Active: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    InvoicedHours: z.union([z.number(), z.string()]).nullable().optional(),
    WrittenOffTime: z.union([z.number(), z.string()]).nullable().optional(),
    BudgetBasedOn: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TimeTrackingProject = z.infer<typeof TimeTrackingProjectSchema>;

export const TimeTrackingProjectInvoiceSchema = z
  .object({
    DocumentHeaderId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Date: z
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
    Status: z.union([z.number().int(), z.string()]).nullable().optional(),
    Paid: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    DueDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DocumentTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    ProjectExclusive: z.union([z.number().int(), z.string()]).nullable().optional(),
    ProjectTotal: z.union([z.number().int(), z.string()]).nullable().optional(),
    InvoiceExclusive: z.union([z.number().int(), z.string()]).nullable().optional(),
    InvoiceTotal: z.union([z.number().int(), z.string()]).nullable().optional(),
    TotalOutstanding: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TimeTrackingProjectInvoice = z.infer<typeof TimeTrackingProjectInvoiceSchema>;

export const TimeTrackingProjectListingSummarySchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    TimeTrackingProjectId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Name: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CustomerID: z.union([z.number().int(), z.string()]).nullable().optional(),
    CustomerName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Active: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Billable: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    BillingMethod: z.union([z.number().int(), z.string()]).nullable().optional(),
    BillableHours: z.union([z.number().int(), z.string()]).nullable().optional(),
    ToBeInvoiced: z.union([z.number().int(), z.string()]).nullable().optional(),
    BillableAmount: z.union([z.number().int(), z.string()]).nullable().optional(),
    UnbilledHours: z.union([z.number().int(), z.string()]).nullable().optional(),
    AmountInvoiced: z.union([z.number().int(), z.string()]).nullable().optional(),
    NonBillableHours: z.union([z.number().int(), z.string()]).nullable().optional(),
    InvoicedHours: z.union([z.number().int(), z.string()]).nullable().optional(),
    TotalHours: z.union([z.number().int(), z.string()]).nullable().optional(),
    WrittenOffTime: z.union([z.number().int(), z.string()]).nullable().optional(),
    BudgetedHours: z.union([z.number().int(), z.string()]).nullable().optional(),
    LastInvoiceDocumentHeaderId: z.union([z.number().int(), z.string()]).nullable().optional(),
    LastInvoiceDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    EstimatedHours: z.union([z.number().int(), z.string()]).nullable().optional(),
    EstimatedValue: z.union([z.number().int(), z.string()]).nullable().optional(),
    CustomerOnHold: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type TimeTrackingProjectListingSummary = z.infer<
  typeof TimeTrackingProjectListingSummarySchema
>;

export const TimeTrackingProjectStaffSchema = z
  .object({
    ProjectID: z.union([z.number().int(), z.string()]).nullable().optional(),
    TimeTrackingUserId: z.union([z.number().int(), z.string()]).nullable().optional(),
    BillingRate: z.union([z.number(), z.string()]).nullable().optional(),
    CostPerHour: z.union([z.number(), z.string()]).nullable().optional(),
    UserType: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TimeTrackingProjectStaff = z.infer<typeof TimeTrackingProjectStaffSchema>;

export const TimeTrackingProjectSummarySchema = z
  .object({
    BillableHours: z.union([z.number().int(), z.string()]).nullable().optional(),
    NonBillableHours: z.union([z.number().int(), z.string()]).nullable().optional(),
    DayPart: z.union([z.number().int(), z.string()]).nullable().optional(),
    MonthWeekPart: z.union([z.number().int(), z.string()]).nullable().optional(),
    YearPart: z.union([z.number().int(), z.string()]).nullable().optional(),
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
  })
  .passthrough();
export type TimeTrackingProjectSummary = z.infer<typeof TimeTrackingProjectSummarySchema>;

export const TimeTrackingProjectTaskSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    ProjectID: z.union([z.number().int(), z.string()]).nullable().optional(),
    TaskID: z.union([z.number().int(), z.string()]).nullable().optional(),
    BillToClient: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    BillingRate: z.union([z.number(), z.string()]).nullable().optional(),
    BudgetedHours: z.union([z.number(), z.string()]).nullable().optional(),
    TotalHoursLogged: z.union([z.number(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TimeTrackingProjectTask = z.infer<typeof TimeTrackingProjectTaskSchema>;

export const TimeTrackingSummaryEntrySchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Name: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Email: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    LastTimesheetEntry: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    HoursCaptured: z.union([z.number().int(), z.string()]).nullable().optional(),
    BillableHours: z.union([z.number().int(), z.string()]).nullable().optional(),
    BillableAmount: z.union([z.number().int(), z.string()]).nullable().optional(),
    WrittenOffHours: z.union([z.number().int(), z.string()]).nullable().optional(),
    WrittenOffAmount: z.union([z.number().int(), z.string()]).nullable().optional(),
    InvoicedAmount: z.union([z.number().int(), z.string()]).nullable().optional(),
    InvoicedDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    LinkedDocumentHeaderId: z.union([z.number().int(), z.string()]).nullable().optional(),
    LinkedDocumentTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    LinkedDocumentNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    BillingMethodId: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TimeTrackingSummaryEntry = z.infer<typeof TimeTrackingSummaryEntrySchema>;

export const TimeTrackingSummaryEntryRequestModelSchema = z
  .object({
    Type: z.union([z.number().int(), z.string()]).nullable().optional(),
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    RangeType: z.union([z.number().int(), z.string()]).nullable().optional(),
    CustomerId: z.union([z.number().int(), z.string()]).nullable().optional(),
    ProjectId: z.union([z.number().int(), z.string()]).nullable().optional(),
    TaskId: z.union([z.number().int(), z.string()]).nullable().optional(),
    FilterId: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TimeTrackingSummaryEntryRequestModel = z.infer<
  typeof TimeTrackingSummaryEntryRequestModelSchema
>;

export const TimeTrackingTaskSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Name: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    BillingRate: z.union([z.number(), z.string()]).nullable().optional(),
    BillToClient: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    DefaultTask: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Active: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    ProjectTasks: z.array(z.unknown()).nullable().optional(),
  })
  .passthrough();
export type TimeTrackingTask = z.infer<typeof TimeTrackingTaskSchema>;

export const TimeTrackingTimesheetSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    TimeTrackingUserId: z.union([z.number().int(), z.string()]).nullable().optional(),
    TimeTrackingProjectId: z.union([z.number().int(), z.string()]).nullable().optional(),
    TimeTrackingTaskId: z.union([z.number().int(), z.string()]).nullable().optional(),
    TimeTrackingCustomerId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Hours: z.union([z.number(), z.string()]).nullable().optional(),
    Comments: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    SystemGenerated: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    BilledAmount: z.union([z.number(), z.string()]).nullable().optional(),
    BilledHours: z.union([z.number(), z.string()]).nullable().optional(),
    WrittenOffHours: z.union([z.number(), z.string()]).nullable().optional(),
    WrittenOffAmount: z.union([z.number(), z.string()]).nullable().optional(),
    WeeklyEntries: z.array(z.unknown()).nullable().optional(),
    MonthlyEntries: z.array(z.unknown()).nullable().optional(),
    Locked: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    LockedPartially: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    BillableHours: z.union([z.number(), z.string()]).nullable().optional(),
    BillableAmount: z.union([z.number(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TimeTrackingTimesheet = z.infer<typeof TimeTrackingTimesheetSchema>;

export const TimeTrackingTimesheetRequestModelSchema = z
  .object({
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    TimeTrackingUserId: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TimeTrackingTimesheetRequestModel = z.infer<
  typeof TimeTrackingTimesheetRequestModelSchema
>;

export const TimeTrackingUpdateProjectRequestModelSchema = z
  .object({
    TimeTrackingProject: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    UpdateRecurringInvoices: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type TimeTrackingUpdateProjectRequestModel = z.infer<
  typeof TimeTrackingUpdateProjectRequestModelSchema
>;

export const TimeTrackingUpdateRecurringInvoicesRequestModelSchema = z
  .object({
    TaskIds: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ProjectId: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type TimeTrackingUpdateRecurringInvoicesRequestModel = z.infer<
  typeof TimeTrackingUpdateRecurringInvoicesRequestModelSchema
>;

export const TimeTrackingUpdateTaskRequestModelSchema = z
  .object({
    TimeTrackingTask: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    UpdateProjectTasks: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    UpdateRecurringInvoices: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type TimeTrackingUpdateTaskRequestModel = z.infer<
  typeof TimeTrackingUpdateTaskRequestModelSchema
>;

export const TimeTrackingUserSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    UserId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Email: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    FirstName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    LastName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    FullName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DefaultUser: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    BillingRate: z.union([z.number(), z.string()]).nullable().optional(),
    CostPerHour: z.union([z.number(), z.string()]).nullable().optional(),
    Deleted: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    UserProjects: z.array(z.unknown()).nullable().optional(),
  })
  .passthrough();
export type TimeTrackingUser = z.infer<typeof TimeTrackingUserSchema>;

export class TimeTrackingCustomerService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /TimeTrackingCustomer/Get` [GET-TimeTrackingCustomer-Get] — Retrieves Time Tracking Customers. */
  public async list(options?: RequestOptions): Promise<SagePage<z.infer<typeof CustomerSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingCustomer",
      operation: "Get",
      method: "GET",
      path: "/TimeTrackingCustomer/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(CustomerSchema),
      options,
    });
  }

  /** Async page iterator for `GET /TimeTrackingCustomer/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof CustomerSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /TimeTrackingCustomer/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof CustomerSchema>, void, undefined> {
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

export class TimeTrackingExpenseService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /TimeTrackingExpense/Get` [GET-TimeTrackingExpense-Get] — Gets a list of Time Tracking Expenses. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof TimeTrackingExpenseSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingExpense",
      operation: "Get",
      method: "GET",
      path: "/TimeTrackingExpense/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(TimeTrackingExpenseSchema),
      options,
    });
  }

  /** Async page iterator for `GET /TimeTrackingExpense/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof TimeTrackingExpenseSchema>>,
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

  /** Async item iterator for `GET /TimeTrackingExpense/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof TimeTrackingExpenseSchema>, void, undefined> {
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

  /** `GET /TimeTrackingExpense/Get/{id}` [GET-TimeTrackingExpense-Get-id] — Gets the specified Time Tracking Expense based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof TimeTrackingExpenseSchema>> {
    return this.executor.request({
      resource: "TimeTrackingExpense",
      operation: "GetById",
      method: "GET",
      path: `/TimeTrackingExpense/Get/${encodeURIComponent(String(id))}`,
      responseSchema: TimeTrackingExpenseSchema,
      options,
    });
  }

  /** `POST /TimeTrackingExpense/Save` [POST-TimeTrackingExpense-Save] — Saves the specified Time Tracking Expense and updates it if it exists. */
  public async save(
    input: z.infer<typeof TimeTrackingExpenseSchema>,
    options?: RequestOptions,
  ): Promise<unknown> {
    return this.executor.request({
      resource: "TimeTrackingExpense",
      operation: "Save",
      method: "POST",
      path: "/TimeTrackingExpense/Save",
      body: input,
      requestSchema: TimeTrackingExpenseSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /TimeTrackingExpense/GetByDocumentHeader/{id}` [GET-TimeTrackingExpense-GetByDocumentHeader-id] — Gets the specified Time Tracking Expense based on the DocumentHeader linked to it. */
  public async getByDocumentHeader(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof TimeTrackingExpenseSchema>> {
    return this.executor.request({
      resource: "TimeTrackingExpense",
      operation: "GetByDocumentHeader",
      method: "GET",
      path: `/TimeTrackingExpense/GetByDocumentHeader/${encodeURIComponent(String(id))}`,
      responseSchema: TimeTrackingExpenseSchema,
      options,
    });
  }

  /** `POST /TimeTrackingExpense/Delete/{id}` [POST-TimeTrackingExpense-Delete-id] — Deletes the specified Time Tracking Expense based on the identifier, if the TimeTrackingExpense is not in use. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "TimeTrackingExpense",
      operation: "Delete",
      method: "POST",
      path: `/TimeTrackingExpense/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class TimeTrackingProjectService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /TimeTrackingProject/Get` [GET-TimeTrackingProject-Get_includeDetail] — Gets a list of Time Tracking Projects. */
  public async list(
    options?: RequestOptions & { readonly includeDetail?: boolean | undefined },
  ): Promise<SagePage<z.infer<typeof TimeTrackingProjectSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.includeDetail !== undefined) {
      baseQuery["includeDetail"] = options.includeDetail;
    }
    return this.executor.request({
      resource: "TimeTrackingProject",
      operation: "Get",
      method: "GET",
      path: "/TimeTrackingProject/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(TimeTrackingProjectSchema),
      options,
    });
  }

  /** Async page iterator for `GET /TimeTrackingProject/Get`. */
  public pages(
    options?: RequestOptions & { readonly includeDetail?: boolean | undefined } & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof TimeTrackingProjectSchema>>,
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

  /** Async item iterator for `GET /TimeTrackingProject/Get`. */
  public iterate(
    options?: RequestOptions & { readonly includeDetail?: boolean | undefined } & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof TimeTrackingProjectSchema>, void, undefined> {
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

  /** `GET /TimeTrackingProject/Get/{id}` [GET-TimeTrackingProject-Get-id] — Gets the specified Time Tracking Project based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof TimeTrackingProjectSchema>> {
    return this.executor.request({
      resource: "TimeTrackingProject",
      operation: "GetById",
      method: "GET",
      path: `/TimeTrackingProject/Get/${encodeURIComponent(String(id))}`,
      responseSchema: TimeTrackingProjectSchema,
      options,
    });
  }

  /** `POST /TimeTrackingProject/GetByIdsWithTasks` [POST-TimeTrackingProject-GetByIdsWithTasks] — Gets Time Tracking Projects with Tasks based on provided ProjectId's */
  public async getByIdsWithTasks(
    input: readonly (number | string | Record<string, unknown>)[],
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof TimeTrackingProjectSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingProject",
      operation: "GetByIdsWithTasks",
      method: "POST",
      path: "/TimeTrackingProject/GetByIdsWithTasks",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: z.array(z.union([z.number(), z.string(), z.record(z.string(), z.unknown())])),
      responseSchema: createSagePageSchema(TimeTrackingProjectSchema),
      options,
    });
  }

  /** `GET /TimeTrackingProject/GetProjectListingSummary` [GET-TimeTrackingProject-GetProjectListingSummary] — Gets a list of Time Tracking Projects in summary form. */
  public async getProjectListingSummary(
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof TimeTrackingProjectListingSummarySchema>>> {
    return this.executor.request({
      resource: "TimeTrackingProject",
      operation: "GetProjectListingSummary",
      method: "GET",
      path: "/TimeTrackingProject/GetProjectListingSummary",
      responseSchema: z.array(TimeTrackingProjectListingSummarySchema),
      options,
    });
  }

  /** `GET /TimeTrackingProject/GetActiveProjects` [GET-TimeTrackingProject-GetActiveProjects] — Gets a list of active Time Tracking Projects. */
  public async getActiveProjects(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof TimeTrackingProjectSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingProject",
      operation: "GetActiveProjects",
      method: "GET",
      path: "/TimeTrackingProject/GetActiveProjects",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(TimeTrackingProjectSchema),
      options,
    });
  }

  /** `POST /TimeTrackingProject/Save` [POST-TimeTrackingProject-Save] — Saves the specified Time Tracking Project if it doesn't exist or updates it if it does. */
  public async save(
    input: z.infer<typeof TimeTrackingUpdateProjectRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<unknown> {
    return this.executor.request({
      resource: "TimeTrackingProject",
      operation: "Save",
      method: "POST",
      path: "/TimeTrackingProject/Save",
      body: input,
      requestSchema: TimeTrackingUpdateProjectRequestModelSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /TimeTrackingProject/Delete/{id}` [DELETE-TimeTrackingProject-Delete-id] — Deletes the specified Time Tracking Project based on the identifier. If the TimeTrackingProject is not in use. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "TimeTrackingProject",
      operation: "Delete",
      method: "DELETE",
      path: `/TimeTrackingProject/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /TimeTrackingProject/Delete` [POST-TimeTrackingProject-Delete] — Deletes an array of Time Tracking Projects */
  public async deleteProjects(
    input: readonly z.infer<typeof TimeTrackingProjectSchema>[],
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "TimeTrackingProject",
      operation: "Delete",
      method: "POST",
      path: "/TimeTrackingProject/Delete",
      body: input,
      requestSchema: z.array(TimeTrackingProjectSchema),
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /TimeTrackingProject/DeleteByIds` [POST-TimeTrackingProject-DeleteByIds] — Deletes Time Tracking Projects based on provided ProjectId's */
  public async deleteByIds(
    input: readonly (number | string | Record<string, unknown>)[],
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "TimeTrackingProject",
      operation: "DeleteByIds",
      method: "POST",
      path: "/TimeTrackingProject/DeleteByIds",
      body: input,
      requestSchema: z.array(z.union([z.number(), z.string(), z.record(z.string(), z.unknown())])),
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `PUT /TimeTrackingProject/RemoveProjectTasks/{id}` [PUT-TimeTrackingProject-RemoveProjectTasks-id] — Deletes an array of Project Tasks from a Project */
  public async removeProjectTasks(
    id: number | string,
    input: readonly z.infer<typeof TimeTrackingProjectTaskSchema>[],
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "TimeTrackingProject",
      operation: "RemoveProjectTasks",
      method: "PUT",
      path: `/TimeTrackingProject/RemoveProjectTasks/${encodeURIComponent(String(id))}`,
      body: input,
      requestSchema: z.array(TimeTrackingProjectTaskSchema),
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `PUT /TimeTrackingProject/RemoveProjectStaff/{id}` [PUT-TimeTrackingProject-RemoveProjectStaff-id] — Deletes an array of Project Staff from a Project */
  public async removeProjectStaff(
    id: number | string,
    input: readonly z.infer<typeof TimeTrackingProjectStaffSchema>[],
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "TimeTrackingProject",
      operation: "RemoveProjectStaff",
      method: "PUT",
      path: `/TimeTrackingProject/RemoveProjectStaff/${encodeURIComponent(String(id))}`,
      body: input,
      requestSchema: z.array(TimeTrackingProjectStaffSchema),
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /TimeTrackingProject/GetUserProjects/{id}` [GET-TimeTrackingProject-GetUserProjects-id] — Retrieves an array of Time Tracking Projects for a User */
  public async getUserProjects(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof TimeTrackingProjectSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingProject",
      operation: "GetUserProjects",
      method: "GET",
      path: `/TimeTrackingProject/GetUserProjects/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(TimeTrackingProjectSchema),
      options,
    });
  }

  /** `GET /TimeTrackingProject/GetProjectsLookupListing/{id}` [GET-TimeTrackingProject-GetProjectsLookupListing-id] — Get custom project models that are used exclusively for the project combos. This include additional description entries that can be used in multi line combos. */
  public async getProjectsLookupListing(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof TimeTrackingProjectSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingProject",
      operation: "GetProjectsLookupListing",
      method: "GET",
      path: `/TimeTrackingProject/GetProjectsLookupListing/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(TimeTrackingProjectSchema),
      options,
    });
  }

  /** `GET /TimeTrackingProject/GetProjectsExpenseLookupListing/{id}` [GET-TimeTrackingProject-GetProjectsExpenseLookupListing-id] — Get custom project models that are used exclusivley for the project combos. This include additional description entries that can be used in multi line combos. */
  public async getProjectsExpenseLookupListing(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof TimeTrackingProjectSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingProject",
      operation: "GetProjectsExpenseLookupListing",
      method: "GET",
      path: `/TimeTrackingProject/GetProjectsExpenseLookupListing/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(TimeTrackingProjectSchema),
      options,
    });
  }

  /** `GET /TimeTrackingProject/GetProjectInvoices/{id}` [GET-TimeTrackingProject-GetProjectInvoices-id] — Get project invoices. */
  public async getProjectInvoices(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof TimeTrackingProjectInvoiceSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingProject",
      operation: "GetProjectInvoices",
      method: "GET",
      path: `/TimeTrackingProject/GetProjectInvoices/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(TimeTrackingProjectInvoiceSchema),
      options,
    });
  }

  /** `GET /TimeTrackingProject/GetProjectExpenses/{id}` [GET-TimeTrackingProject-GetProjectExpenses-id] — Get project expenses by project ID. */
  public async getProjectExpenses(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof TimeTrackingExpenseExtendedSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingProject",
      operation: "GetProjectExpenses",
      method: "GET",
      path: `/TimeTrackingProject/GetProjectExpenses/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(TimeTrackingExpenseExtendedSchema),
      options,
    });
  }

  /** `GET /TimeTrackingProject/GetProjectSummary/{id}` [GET-TimeTrackingProject-GetProjectSummary-id_methodId] — Get project summary by duration specified by the methodId. The methodId has options of 1 for daily, 2 for weekly and 3 for monthly. Currently only daily and monthly (i.e. 1 and 3 respectively) are supported. */
  public async getProjectSummary(
    id: number | string,
    options?: RequestOptions & { readonly methodId?: number | undefined },
  ): Promise<Array<z.infer<typeof TimeTrackingProjectSummarySchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.methodId !== undefined) {
      baseQuery["methodId"] = options.methodId;
    }
    return this.executor.request({
      resource: "TimeTrackingProject",
      operation: "GetProjectSummary",
      method: "GET",
      path: `/TimeTrackingProject/GetProjectSummary/${encodeURIComponent(String(id))}`,
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: z.array(TimeTrackingProjectSummarySchema),
      options,
    });
  }
}

export class TimeTrackingTaskService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /TimeTrackingTask/Get` [GET-TimeTrackingTask-Get_includeProjectTasks] — Gets a list of Time Tracking Tasks. */
  public async list(
    options?: RequestOptions & { readonly includeProjectTasks?: boolean | undefined },
  ): Promise<SagePage<z.infer<typeof TimeTrackingTaskSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.includeProjectTasks !== undefined) {
      baseQuery["includeProjectTasks"] = options.includeProjectTasks;
    }
    return this.executor.request({
      resource: "TimeTrackingTask",
      operation: "Get",
      method: "GET",
      path: "/TimeTrackingTask/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(TimeTrackingTaskSchema),
      options,
    });
  }

  /** Async page iterator for `GET /TimeTrackingTask/Get`. */
  public pages(
    options?: RequestOptions & {
      readonly includeProjectTasks?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof TimeTrackingTaskSchema>>,
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

  /** Async item iterator for `GET /TimeTrackingTask/Get`. */
  public iterate(
    options?: RequestOptions & {
      readonly includeProjectTasks?: boolean | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof TimeTrackingTaskSchema>, void, undefined> {
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

  /** `GET /TimeTrackingTask/Get/{id}` [GET-TimeTrackingTask-Get-id] — Gets the specified Time Tracking Task based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof TimeTrackingTaskSchema>> {
    return this.executor.request({
      resource: "TimeTrackingTask",
      operation: "GetById",
      method: "GET",
      path: `/TimeTrackingTask/Get/${encodeURIComponent(String(id))}`,
      responseSchema: TimeTrackingTaskSchema,
      options,
    });
  }

  /** `POST /TimeTrackingTask/Save` [POST-TimeTrackingTask-Save] — Saves the specified Time Tracking Task and does not update Project task Rates. */
  public async save(
    input: z.infer<typeof TimeTrackingTaskSchema>,
    options?: RequestOptions,
  ): Promise<unknown> {
    return this.executor.request({
      resource: "TimeTrackingTask",
      operation: "Save",
      method: "POST",
      path: "/TimeTrackingTask/Save",
      body: input,
      requestSchema: TimeTrackingTaskSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /TimeTrackingTask/Delete/{id}` [POST-TimeTrackingTask-Delete-id] — Deletes the specified Time Tracking Task based on the identifier. If the TimeTrackingTask is not in use. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "TimeTrackingTask",
      operation: "Delete",
      method: "POST",
      path: `/TimeTrackingTask/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /TimeTrackingTask/DeleteTasks` [POST-TimeTrackingTask-DeleteTasks] — Delete a list of Time Tracking Tasks */
  public async deleteTasks(
    input: readonly z.infer<typeof TimeTrackingTaskSchema>[],
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "TimeTrackingTask",
      operation: "DeleteTasks",
      method: "POST",
      path: "/TimeTrackingTask/DeleteTasks",
      body: input,
      requestSchema: z.array(TimeTrackingTaskSchema),
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `PUT /TimeTrackingTask/RemoveProjectsFromTask/{id}` [PUT-TimeTrackingTask-RemoveProjectsFromTask-id] — Deletes the specified list of project tasks from the Task. */
  public async removeProjectsFromTask(
    id: number | string,
    input: readonly z.infer<typeof TimeTrackingProjectTaskSchema>[],
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "TimeTrackingTask",
      operation: "RemoveProjectsFromTask",
      method: "PUT",
      path: `/TimeTrackingTask/RemoveProjectsFromTask/${encodeURIComponent(String(id))}`,
      body: input,
      requestSchema: z.array(TimeTrackingProjectTaskSchema),
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /TimeTrackingTask/GetTasksFiltered` [POST-TimeTrackingTask-GetTasksFiltered] — Gets the filtered tasks by customer ID and project ID. */
  public async getTasksFiltered(
    input: z.infer<typeof TimeTrackingFilterRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof TimeTrackingTaskSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingTask",
      operation: "GetTasksFiltered",
      method: "POST",
      path: "/TimeTrackingTask/GetTasksFiltered",
      body: input,
      requestSchema: TimeTrackingFilterRequestModelSchema,
      responseSchema: z.array(TimeTrackingTaskSchema),
      options,
    });
  }

  /** `POST /TimeTrackingTask/GetUsersFiltered` [POST-TimeTrackingTask-GetUsersFiltered] — Gets the users filtered by the customer ID, project ID and Task ID. */
  public async getUsersFiltered(
    input: z.infer<typeof TimeTrackingFilterRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof TimeTrackingUserSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingTask",
      operation: "GetUsersFiltered",
      method: "POST",
      path: "/TimeTrackingTask/GetUsersFiltered",
      body: input,
      requestSchema: TimeTrackingFilterRequestModelSchema,
      responseSchema: z.array(TimeTrackingUserSchema),
      options,
    });
  }

  /** `POST /TimeTrackingTask/SaveAndUpdateProjectTaskRate` [POST-TimeTrackingTask-SaveAndUpdateProjectTaskRate] — Saves the Task and provides options to update project task rates for all projects making use of the task. */
  public async saveAndUpdateProjectTaskRate(
    input: z.infer<typeof TimeTrackingUpdateTaskRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<unknown> {
    return this.executor.request({
      resource: "TimeTrackingTask",
      operation: "SaveAndUpdateProjectTaskRate",
      method: "POST",
      path: "/TimeTrackingTask/SaveAndUpdateProjectTaskRate",
      body: input,
      requestSchema: TimeTrackingUpdateTaskRequestModelSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /TimeTrackingTask/CheckForRecurringInvoices/{id}` [GET-TimeTrackingTask-CheckForRecurringInvoices-id] — Checks if the Task specified by the identifier is linked to any Recurring Invoices. */
  public async checkForRecurringInvoices(
    id: number | string,
    options?: RequestOptions,
  ): Promise<boolean> {
    return this.executor.request({
      resource: "TimeTrackingTask",
      operation: "CheckForRecurringInvoices",
      method: "GET",
      path: `/TimeTrackingTask/CheckForRecurringInvoices/${encodeURIComponent(String(id))}`,
      responseSchema: z.boolean(),
      options,
    });
  }

  /** `POST /TimeTrackingTask/CheckForRecurringInvoicesByTasksAndProject` [POST-TimeTrackingTask-CheckForRecurringInvoicesByTasksAndProject] — Checks all recurring invoices for occurences of the tasks from the task ID list with the given project ID from the request. */
  public async checkForRecurringInvoicesByTasksAndProject(
    input: z.infer<typeof TimeTrackingUpdateRecurringInvoicesRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<boolean> {
    return this.executor.request({
      resource: "TimeTrackingTask",
      operation: "CheckForRecurringInvoicesByTasksAndProject",
      method: "POST",
      path: "/TimeTrackingTask/CheckForRecurringInvoicesByTasksAndProject",
      body: input,
      requestSchema: TimeTrackingUpdateRecurringInvoicesRequestModelSchema,
      responseSchema: z.boolean(),
      options,
    });
  }
}

export class TimeTrackingTimesheetService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /TimeTrackingTimesheet/Get` [GET-TimeTrackingTimesheet-Get] — Gets a list of Time Tracking Timesheets. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof TimeTrackingTimesheetSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingTimesheet",
      operation: "Get",
      method: "GET",
      path: "/TimeTrackingTimesheet/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(TimeTrackingTimesheetSchema),
      options,
    });
  }

  /** Async page iterator for `GET /TimeTrackingTimesheet/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof TimeTrackingTimesheetSchema>>,
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

  /** Async item iterator for `GET /TimeTrackingTimesheet/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof TimeTrackingTimesheetSchema>, void, undefined> {
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

  /** `GET /TimeTrackingTimesheet/Get/{id}` [GET-TimeTrackingTimesheet-Get-id] — Gets the specified Time Tracking Timesheet based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof TimeTrackingTimesheetSchema>> {
    return this.executor.request({
      resource: "TimeTrackingTimesheet",
      operation: "GetById",
      method: "GET",
      path: `/TimeTrackingTimesheet/Get/${encodeURIComponent(String(id))}`,
      responseSchema: TimeTrackingTimesheetSchema,
      options,
    });
  }

  /** `POST /TimeTrackingTimesheet/Save` [POST-TimeTrackingTimesheet-Save] — Saves the specified Time Tracking Timesheet. */
  public async save(
    input: z.infer<typeof TimeTrackingTimesheetSchema>,
    options?: RequestOptions,
  ): Promise<unknown> {
    return this.executor.request({
      resource: "TimeTrackingTimesheet",
      operation: "Save",
      method: "POST",
      path: "/TimeTrackingTimesheet/Save",
      body: input,
      requestSchema: TimeTrackingTimesheetSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /TimeTrackingTimesheet/GetByDateAndUser` [POST-TimeTrackingTimesheet-GetByDateAndUser] — Gets a list of Time Tracking Timesheets by Date and user. */
  public async getByDateAndUser(
    input: z.infer<typeof TimeTrackingTimesheetRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof TimeTrackingTimesheetSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingTimesheet",
      operation: "GetByDateAndUser",
      method: "POST",
      path: "/TimeTrackingTimesheet/GetByDateAndUser",
      body: input,
      requestSchema: TimeTrackingTimesheetRequestModelSchema,
      responseSchema: z.array(TimeTrackingTimesheetSchema),
      options,
    });
  }

  /** `POST /TimeTrackingTimesheet/GetWeeklyByDateAndUser` [POST-TimeTrackingTimesheet-GetWeeklyByDateAndUser] — Gets a list of Time Tracking Time Sheet entries for one week by Date and User. */
  public async getWeeklyByDateAndUser(
    input: z.infer<typeof TimeTrackingTimesheetRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof TimeTrackingTimesheetSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingTimesheet",
      operation: "GetWeeklyByDateAndUser",
      method: "POST",
      path: "/TimeTrackingTimesheet/GetWeeklyByDateAndUser",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: TimeTrackingTimesheetRequestModelSchema,
      responseSchema: createSagePageSchema(TimeTrackingTimesheetSchema),
      options,
    });
  }

  /** `POST /TimeTrackingTimesheet/GetWeeklyByDate` [POST-TimeTrackingTimesheet-GetWeeklyByDate] — Get a list of Time Tracking Time Sheet entries for one week by Date. */
  public async getWeeklyByDate(
    input: z.infer<typeof TimeTrackingTimesheetRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof TimeTrackingTimesheetSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingTimesheet",
      operation: "GetWeeklyByDate",
      method: "POST",
      path: "/TimeTrackingTimesheet/GetWeeklyByDate",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: TimeTrackingTimesheetRequestModelSchema,
      responseSchema: createSagePageSchema(TimeTrackingTimesheetSchema),
      options,
    });
  }

  /** `POST /TimeTrackingTimesheet/GetMonthlyByDateAndUser` [POST-TimeTrackingTimesheet-GetMonthlyByDateAndUser] — Get a list of Time Tracking Time Sheet entries for one month by Date and User. */
  public async getMonthlyByDateAndUser(
    input: z.infer<typeof TimeTrackingTimesheetRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof TimeTrackingTimesheetSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingTimesheet",
      operation: "GetMonthlyByDateAndUser",
      method: "POST",
      path: "/TimeTrackingTimesheet/GetMonthlyByDateAndUser",
      body: input,
      requestSchema: TimeTrackingTimesheetRequestModelSchema,
      responseSchema: z.array(TimeTrackingTimesheetSchema),
      options,
    });
  }

  /** `POST /TimeTrackingTimesheet/GetMonthlyByDate` [POST-TimeTrackingTimesheet-GetMonthlyByDate] — Get a list of Time Tracking Time Sheet entries for one month by Date. */
  public async getMonthlyByDate(
    input: z.infer<typeof TimeTrackingTimesheetRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof TimeTrackingTimesheetSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingTimesheet",
      operation: "GetMonthlyByDate",
      method: "POST",
      path: "/TimeTrackingTimesheet/GetMonthlyByDate",
      body: input,
      requestSchema: TimeTrackingTimesheetRequestModelSchema,
      responseSchema: z.array(TimeTrackingTimesheetSchema),
      options,
    });
  }

  /** `POST /TimeTrackingTimesheet/GetByProjects` [POST-TimeTrackingTimesheet-GetByProjects] — Get a list of Time Tracking Time Sheet entries for selected projects. */
  public async getByProjects(
    input: readonly (number | string | Record<string, unknown>)[],
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof TimeTrackingTimesheetSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingTimesheet",
      operation: "GetByProjects",
      method: "POST",
      path: "/TimeTrackingTimesheet/GetByProjects",
      body: input,
      requestSchema: z.array(z.union([z.number(), z.string(), z.record(z.string(), z.unknown())])),
      responseSchema: z.array(TimeTrackingTimesheetSchema),
      options,
    });
  }

  /** `POST /TimeTrackingTimesheet/GetBilledByProjects` [POST-TimeTrackingTimesheet-GetBilledByProjects] — Gets billed Timesheets by projects. */
  public async getBilledByProjects(
    input: readonly (number | string | Record<string, unknown>)[],
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof TimeTrackingTimesheetSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingTimesheet",
      operation: "GetBilledByProjects",
      method: "POST",
      path: "/TimeTrackingTimesheet/GetBilledByProjects",
      body: input,
      requestSchema: z.array(z.union([z.number(), z.string(), z.record(z.string(), z.unknown())])),
      responseSchema: z.array(TimeTrackingTimesheetSchema),
      options,
    });
  }

  /** `POST /TimeTrackingTimesheet/GetWrittenOffByProjects` [POST-TimeTrackingTimesheet-GetWrittenOffByProjects] — Gets list of written off time sheet entries for selected projects. Written off time is set when time on a time sheet is unbillable. */
  public async getWrittenOffByProjects(
    input: readonly (number | string | Record<string, unknown>)[],
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof TimeTrackingTimesheetSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingTimesheet",
      operation: "GetWrittenOffByProjects",
      method: "POST",
      path: "/TimeTrackingTimesheet/GetWrittenOffByProjects",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: z.array(z.union([z.number(), z.string(), z.record(z.string(), z.unknown())])),
      responseSchema: createSagePageSchema(TimeTrackingTimesheetSchema),
      options,
    });
  }

  /** `POST /TimeTrackingTimesheet/WriteOffHours` [POST-TimeTrackingTimesheet-WriteOffHours] — Write off hours for selected timesheet entries. */
  public async writeOffHours(
    input: readonly z.infer<typeof TimeTrackingTimesheetSchema>[],
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "TimeTrackingTimesheet",
      operation: "WriteOffHours",
      method: "POST",
      path: "/TimeTrackingTimesheet/WriteOffHours",
      body: input,
      requestSchema: z.array(TimeTrackingTimesheetSchema),
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /TimeTrackingTimesheet/Delete/{id}` [DELETE-TimeTrackingTimesheet-Delete-id] — Deletes the specified Time Tracking Timesheet based on the identifier. If the TimeTrackingTimesheet is not in use. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "TimeTrackingTimesheet",
      operation: "Delete",
      method: "DELETE",
      path: `/TimeTrackingTimesheet/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /TimeTrackingTimesheet/GetTimesheetSummaryDetail` [POST-TimeTrackingTimesheet-GetTimesheetSummaryDetail] — Gets the timesheet summary detail. The request model type can be either Customers=1, Projects=2, Tasks=3 or Users=4. The dateRangeType can be either All=0, Monthly=1, Weekly=2 or Daily=3 */
  public async getTimesheetSummaryDetail(
    input: z.infer<typeof TimeTrackingSummaryEntryRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof TimeTrackingSummaryEntrySchema>>> {
    return this.executor.request({
      resource: "TimeTrackingTimesheet",
      operation: "GetTimesheetSummaryDetail",
      method: "POST",
      path: "/TimeTrackingTimesheet/GetTimesheetSummaryDetail",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: TimeTrackingSummaryEntryRequestModelSchema,
      responseSchema: createSagePageSchema(TimeTrackingSummaryEntrySchema),
      options,
    });
  }
}

export class TimeTrackingUserService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /TimeTrackingUser/Get` [GET-TimeTrackingUser-Get] — Gets a list of Time Tracking Users. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof TimeTrackingUserSchema>>> {
    return this.executor.request({
      resource: "TimeTrackingUser",
      operation: "Get",
      method: "GET",
      path: "/TimeTrackingUser/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(TimeTrackingUserSchema),
      options,
    });
  }

  /** Async page iterator for `GET /TimeTrackingUser/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof TimeTrackingUserSchema>>,
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

  /** Async item iterator for `GET /TimeTrackingUser/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof TimeTrackingUserSchema>, void, undefined> {
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

  /** `GET /TimeTrackingUser/Get/{id}` [GET-TimeTrackingUser-Get-id] — Gets the specified Time Tracking User based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof TimeTrackingUserSchema>> {
    return this.executor.request({
      resource: "TimeTrackingUser",
      operation: "GetById",
      method: "GET",
      path: `/TimeTrackingUser/Get/${encodeURIComponent(String(id))}`,
      responseSchema: TimeTrackingUserSchema,
      options,
    });
  }
}

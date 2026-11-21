/**
 * Customers domain services and wire schemas (M004):
 * - Customer (4 operations)
 * - CustomerCategory (4 operations)
 * - CustomerOpeningBalance (4 operations)
 * - CustomerStatement (2 operations)
 * - CustomerNote (4 operations)
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
import { TaxTypeSchema } from "../taxation/index.js";

export const CustomerCategorySchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string().optional(),
    Modified: z.string().nullable().optional(),
    Created: z.string().nullable().optional(),
  })
  .passthrough();

export type CustomerCategory = z.infer<typeof CustomerCategorySchema>;

export const CustomerCategorySaveRequestSchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string(),
    Modified: z.string().nullable().optional(),
    Created: z.string().nullable().optional(),
  })
  .strict();

export type CustomerCategorySaveRequest = z.infer<typeof CustomerCategorySaveRequestSchema>;

export const CustomerCategoryPageSchema = createSagePageSchema(CustomerCategorySchema);

export const SalesRepresentativeRefSchema = z
  .object({
    ID: z.number().int().optional(),
    FirstName: z.string().optional(),
    LastName: z.string().optional(),
    Name: z.string().optional(),
    Active: z.boolean().optional(),
    Email: z.string().optional(),
    Mobile: z.string().optional(),
    Telephone: z.string().optional(),
    Created: z.string().optional(),
    Modified: z.string().nullable().optional(),
  })
  .passthrough();

export type SalesRepresentativeRef = z.infer<typeof SalesRepresentativeRefSchema>;

export const AdditionalPriceListRefSchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string().optional(),
    IsDefault: z.boolean().optional(),
  })
  .passthrough();

export type AdditionalPriceListRef = z.infer<typeof AdditionalPriceListRefSchema>;

export const CustomerSchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string(),
    Category: CustomerCategorySchema.nullable().optional(),
    SalesRepresentativeId: z.number().int().nullable().optional(),
    SalesRepresentative: SalesRepresentativeRefSchema.nullable().optional(),
    TaxReference: z.string().optional(),
    ContactName: z.string().optional(),
    Telephone: z.string().optional(),
    Fax: z.string().optional(),
    Mobile: z.string().optional(),
    Email: z.string().optional(),
    WebAddress: z.string().optional(),
    Active: z.boolean().optional(),
    IsObfuscated: z.boolean().optional(),
    Balance: z.number().optional(),
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
    CustomerZoneGuid: z.string().nullable().optional(),
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
    DefaultPriceList: AdditionalPriceListRefSchema.nullable().optional(),
    DefaultPriceListName: z.string().optional(),
    AcceptsElectronicInvoices: z.boolean().optional(),
    Modified: z.string().nullable().optional(),
    Created: z.string().optional(),
    BusinessRegistrationNumber: z.string().optional(),
    TaxStatusVerified: z.string().nullable().optional(),
    CurrencyId: z.number().int().nullable().optional(),
    CurrencySymbol: z.string().optional(),
    HasActivity: z.boolean().optional(),
    DefaultDiscountPercentage: z.number().nullable().optional(),
    DefaultTaxTypeId: z.number().int().nullable().optional(),
    DefaultTaxType: TaxTypeSchema.nullable().optional(),
    DueDateMethodId: z.number().int().nullable().optional(),
    DueDateMethodValue: z.number().int().nullable().optional(),
    CityId: z.number().int().nullable().optional(),
    AccountingAgreement: z.boolean().nullable().optional(),
    HasSpecialCountryTaxActivity: z.boolean().optional(),
    OutstandingInvoices: z.boolean().nullable().optional(),
    OverdueInvoices: z.boolean().nullable().optional(),
    OnHold: z.boolean().nullable().optional(),
    ExcludeFromDebtorsManager: z.boolean().nullable().optional(),
    SubjectToDRCVat: z.boolean().optional(),
  })
  .passthrough();

export type Customer = z.infer<typeof CustomerSchema>;

export const CustomerSaveRequestSchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string(),
    Category: CustomerCategorySchema.nullable().optional(),
    SalesRepresentativeId: z.number().int().nullable().optional(),
    SalesRepresentative: SalesRepresentativeRefSchema.nullable().optional(),
    TaxReference: z.string().optional(),
    ContactName: z.string().optional(),
    Telephone: z.string().optional(),
    Fax: z.string().optional(),
    Mobile: z.string().optional(),
    Email: z.string().optional(),
    WebAddress: z.string().optional(),
    Active: z.boolean().optional(),
    IsObfuscated: z.boolean().optional(),
    Balance: z.number().optional(),
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
    CustomerZoneGuid: z.string().nullable().optional(),
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
    DefaultPriceList: AdditionalPriceListRefSchema.nullable().optional(),
    DefaultPriceListName: z.string().optional(),
    AcceptsElectronicInvoices: z.boolean().optional(),
    Modified: z.string().nullable().optional(),
    Created: z.string().optional(),
    BusinessRegistrationNumber: z.string().optional(),
    TaxStatusVerified: z.string().nullable().optional(),
    CurrencyId: z.number().int().nullable().optional(),
    CurrencySymbol: z.string().optional(),
    HasActivity: z.boolean().optional(),
    DefaultDiscountPercentage: z.number().nullable().optional(),
    DefaultTaxTypeId: z.number().int().nullable().optional(),
    DefaultTaxType: TaxTypeSchema.nullable().optional(),
    DueDateMethodId: z.number().int().nullable().optional(),
    DueDateMethodValue: z.number().int().nullable().optional(),
    CityId: z.number().int().nullable().optional(),
    AccountingAgreement: z.boolean().nullable().optional(),
    HasSpecialCountryTaxActivity: z.boolean().optional(),
    OutstandingInvoices: z.boolean().nullable().optional(),
    OverdueInvoices: z.boolean().nullable().optional(),
    OnHold: z.boolean().nullable().optional(),
    ExcludeFromDebtorsManager: z.boolean().nullable().optional(),
    SubjectToDRCVat: z.boolean().optional(),
  })
  .strict();

export type CustomerSaveRequest = z.infer<typeof CustomerSaveRequestSchema>;

export const CustomerPageSchema = createSagePageSchema(CustomerSchema);

export const CustomerOpeningBalanceSchema = z
  .object({
    ID: z.number().int().optional(),
    CustomerId: z.number().int(),
    Customer_CurrencyId: z.number().int().nullable().optional(),
    Customer_ExchangeRate: z.number().nullable().optional(),
    Balance: z.number(),
    Reason: z.string().optional(),
    Date: z.string(),
  })
  .passthrough();

export type CustomerOpeningBalance = z.infer<typeof CustomerOpeningBalanceSchema>;

export const CustomerOpeningBalanceSaveRequestSchema = z
  .object({
    ID: z.number().int().optional(),
    CustomerId: z.number().int(),
    Customer_CurrencyId: z.number().int().nullable().optional(),
    Customer_ExchangeRate: z.number().nullable().optional(),
    Balance: z.number(),
    Reason: z.string().optional(),
    Date: z.string(),
  })
  .strict();

export type CustomerOpeningBalanceSaveRequest = z.infer<
  typeof CustomerOpeningBalanceSaveRequestSchema
>;

export const CustomerOpeningBalancePageSchema = createSagePageSchema(CustomerOpeningBalanceSchema);

export const CustomerStatementRequestSchema = z
  .object({
    FromDate: z.string(),
    ToDate: z.string(),
    FromCustomer: z.string().optional(),
    ToCustomer: z.string().optional(),
    FromCategory: z.string().optional(),
    ToCategory: z.string().optional(),
    IncludeActive: z.boolean().optional(),
    IncludeInactive: z.boolean().optional(),
    CommunicationMethod: z.number().int().optional(),
    ExcludeZeroBalanceAccounts: z.boolean().optional(),
    Detailed: z.boolean().optional(),
    ExcludeFullyAllocated: z.boolean().optional(),
    ShowBalanceBroughtForward: z.boolean().optional(),
    ExcludeNegativeBalance: z.boolean().optional(),
    UseMinimumBalance: z.boolean().optional(),
    MinimumBalance: z.number().optional(),
    UseForeignCurrency: z.boolean().optional(),
  })
  .strict();

export type CustomerStatementRequest = z.infer<typeof CustomerStatementRequestSchema>;

export const CustomerStatementLineSchema = z
  .object({
    DocumentHeaderId: z.number().int().optional(),
    DocumentTypeId: z.number().int().optional(),
    Date: z.string().optional(),
    DocumentNumber: z.string().optional(),
    Reference: z.string().optional(),
    Description: z.string().optional(),
    Comment: z.string().optional(),
    Debit: z.number().optional(),
    Credit: z.number().optional(),
    Total: z.number().optional(),
  })
  .passthrough();

export type CustomerStatementLine = z.infer<typeof CustomerStatementLineSchema>;

export const CustomerStatementSchema = z
  .object({
    Customer: CustomerSchema.optional(),
    StatementLines: z.array(CustomerStatementLineSchema).optional(),
    Date: z.string().optional(),
    TotalDue: z.number().optional(),
    TotalPaid: z.number().optional(),
    Current: z.number().optional(),
    Days30: z.number().optional(),
    Days60: z.number().optional(),
    Days90: z.number().optional(),
    Days120Plus: z.number().optional(),
  })
  .passthrough();

export type CustomerStatement = z.infer<typeof CustomerStatementSchema>;

export const CustomerStatementListSchema = z.array(CustomerStatementSchema);

export const CustomerNoteSchema = z
  .object({
    ID: z.number().int().optional(),
    CustomerId: z.number().int().optional(),
    CustomerName: z.string().optional(),
    Subject: z.string(),
    EntryDate: z.string().nullable().optional(),
    ActionDate: z.string(),
    Status: z.boolean().nullable().optional(),
    Note: z.string().optional(),
    HasAttachments: z.boolean().nullable().optional(),
    NotePriority: z.number().int().nullable().optional(),
    NoteType: z.number().int().nullable().optional(),
    Priority: z.number().int().nullable().optional(),
    UserTaskCategoryId: z.number().int().nullable().optional(),
    NotifyAssignee: z.boolean().nullable().optional(),
  })
  .passthrough();

export type CustomerNote = z.infer<typeof CustomerNoteSchema>;

export const CustomerNoteSaveRequestSchema = z
  .object({
    ID: z.number().int().optional(),
    CustomerId: z.number().int().optional(),
    CustomerName: z.string().optional(),
    Subject: z.string(),
    EntryDate: z.string().nullable().optional(),
    ActionDate: z.string(),
    Status: z.boolean().nullable().optional(),
    Note: z.string().optional(),
    HasAttachments: z.boolean().nullable().optional(),
    NotePriority: z.number().int().nullable().optional(),
    NoteType: z.number().int().nullable().optional(),
    Priority: z.number().int().nullable().optional(),
    UserTaskCategoryId: z.number().int().nullable().optional(),
    NotifyAssignee: z.boolean().nullable().optional(),
  })
  .strict();

export type CustomerNoteSaveRequest = z.infer<typeof CustomerNoteSaveRequestSchema>;

export const CustomerNotePageSchema = createSagePageSchema(CustomerNoteSchema);

export interface CustomerListOptions extends RequestOptions {
  readonly includeSalesRepDetails?: boolean | undefined;
}

export class CustomersService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /Customer/Get?includeSalesRepDetails={includeSalesRepDetails}` — Gets a list of Customers. */
  public async list(options?: CustomerListOptions): Promise<SagePage<Customer>> {
    return this.executor.request({
      resource: "Customer",
      operation: "Get",
      method: "GET",
      path: "/Customer/Get",
      query: buildQueryWithOData(
        options?.includeSalesRepDetails !== undefined
          ? { includeSalesRepDetails: options.includeSalesRepDetails }
          : undefined,
        options?.odata,
      ),
      responseSchema: CustomerPageSchema,
      options,
    });
  }

  /** Async page iterator for `GET /Customer/Get`. */
  public pages(
    options?: CustomerListOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<Customer>, void, undefined> {
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

  /** Async item iterator for `GET /Customer/Get`. */
  public iterate(
    options?: CustomerListOptions & PaginationOptions,
  ): AsyncGenerator<Customer, void, undefined> {
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

  /** `GET /Customer/Get/{id}` — Gets the specified Customer based on the identifier. */
  public async get(id: number, options?: RequestOptions): Promise<Customer> {
    return this.executor.request({
      resource: "Customer",
      operation: "GetById",
      method: "GET",
      path: `/Customer/Get/${encodeURIComponent(String(id))}`,
      responseSchema: CustomerSchema,
      options,
    });
  }

  /** `POST /Customer/Save` — Saves the specified Customer. */
  public async save(input: CustomerSaveRequest, options?: RequestOptions): Promise<Customer> {
    return this.executor.request({
      resource: "Customer",
      operation: "Save",
      method: "POST",
      path: "/Customer/Save",
      body: input,
      requestSchema: CustomerSaveRequestSchema,
      responseSchema: CustomerSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /Customer/Delete/{id}` — Deletes the specified Customer. Only succeeds if the Customer is not in use. */
  public async delete(id: number, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "Customer",
      operation: "Delete",
      method: "DELETE",
      path: `/Customer/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class CustomerCategoriesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /CustomerCategory/Get` — Gets a list of Customer Categories. */
  public async list(options?: RequestOptions): Promise<SagePage<CustomerCategory>> {
    return this.executor.request({
      resource: "CustomerCategory",
      operation: "Get",
      method: "GET",
      path: "/CustomerCategory/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: CustomerCategoryPageSchema,
      options,
    });
  }

  /** `GET /CustomerCategory/Get/{id}` — Gets the specified Customer Category based on the identifier. */
  public async get(id: number, options?: RequestOptions): Promise<CustomerCategory> {
    return this.executor.request({
      resource: "CustomerCategory",
      operation: "GetById",
      method: "GET",
      path: `/CustomerCategory/Get/${encodeURIComponent(String(id))}`,
      responseSchema: CustomerCategorySchema,
      options,
    });
  }

  /** `POST /CustomerCategory/Save` — Saves the specified Customer Category. */
  public async save(
    input: CustomerCategorySaveRequest,
    options?: RequestOptions,
  ): Promise<CustomerCategory> {
    return this.executor.request({
      resource: "CustomerCategory",
      operation: "Save",
      method: "POST",
      path: "/CustomerCategory/Save",
      body: input,
      requestSchema: CustomerCategorySaveRequestSchema,
      responseSchema: CustomerCategorySchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /CustomerCategory/Delete/{id}` — Deletes the specified Customer Category based on the identifier. */
  public async delete(id: number, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "CustomerCategory",
      operation: "Delete",
      method: "DELETE",
      path: `/CustomerCategory/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class CustomerOpeningBalancesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /CustomerOpeningBalance/Get` — Gets a list of Customer Opening Balances. */
  public async list(options?: RequestOptions): Promise<SagePage<CustomerOpeningBalance>> {
    return this.executor.request({
      resource: "CustomerOpeningBalance",
      operation: "Get",
      method: "GET",
      path: "/CustomerOpeningBalance/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: CustomerOpeningBalancePageSchema,
      options,
    });
  }

  /** `GET /CustomerOpeningBalance/Get/{id}` — Gets the specified Customer Opening Balance based on the identifier. */
  public async get(id: number, options?: RequestOptions): Promise<CustomerOpeningBalance> {
    return this.executor.request({
      resource: "CustomerOpeningBalance",
      operation: "GetById",
      method: "GET",
      path: `/CustomerOpeningBalance/Get/${encodeURIComponent(String(id))}`,
      responseSchema: CustomerOpeningBalanceSchema,
      options,
    });
  }

  /** `GET /CustomerOpeningBalance/GetByCustomerId/{id}` — Gets the specified Customer Opening Balance based on the CustomerId. */
  public async getByCustomerId(
    customerId: number,
    options?: RequestOptions,
  ): Promise<CustomerOpeningBalance> {
    return this.executor.request({
      resource: "CustomerOpeningBalance",
      operation: "GetByCustomerId",
      method: "GET",
      path: `/CustomerOpeningBalance/GetByCustomerId/${encodeURIComponent(String(customerId))}`,
      responseSchema: CustomerOpeningBalanceSchema,
      options,
    });
  }

  /** `POST /CustomerOpeningBalance/Save` — Saves the specified Customer Opening Balance. */
  public async save(
    input: CustomerOpeningBalanceSaveRequest,
    options?: RequestOptions,
  ): Promise<CustomerOpeningBalance> {
    return this.executor.request({
      resource: "CustomerOpeningBalance",
      operation: "Save",
      method: "POST",
      path: "/CustomerOpeningBalance/Save",
      body: input,
      requestSchema: CustomerOpeningBalanceSaveRequestSchema,
      responseSchema: CustomerOpeningBalanceSchema,
      isFinancialMutation: true,
      options,
    });
  }
}

export class CustomerStatementsService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /CustomerStatement/Get` — Gets a Customer Statement collection based on the request model. */
  public async get(
    input: CustomerStatementRequest,
    options?: RequestOptions,
  ): Promise<CustomerStatement[]> {
    return this.executor.request({
      resource: "CustomerStatement",
      operation: "Get",
      method: "POST",
      path: "/CustomerStatement/Get",
      body: input,
      requestSchema: CustomerStatementRequestSchema,
      responseSchema: CustomerStatementListSchema,
      options,
    });
  }

  /** `POST /CustomerStatement/Export` — Export a customer statement as a PDF (`application/octet-stream`). */
  public async export(
    input: CustomerStatementRequest,
    options?: RequestOptions,
  ): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "CustomerStatement",
      operation: "Export",
      method: "POST",
      path: "/CustomerStatement/Export",
      body: input,
      requestSchema: CustomerStatementRequestSchema,
      responseType: "binary",
      options,
    });
  }
}

export class CustomerNotesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /CustomerNote/Get` — Gets a list of Customer Notes. */
  public async list(options?: RequestOptions): Promise<SagePage<CustomerNote>> {
    return this.executor.request({
      resource: "CustomerNote",
      operation: "Get",
      method: "GET",
      path: "/CustomerNote/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: CustomerNotePageSchema,
      options,
    });
  }

  /** `GET /CustomerNote/Get/{id}` — Gets the specified Customer Note based on the identifier. */
  public async get(id: number, options?: RequestOptions): Promise<CustomerNote> {
    return this.executor.request({
      resource: "CustomerNote",
      operation: "GetById",
      method: "GET",
      path: `/CustomerNote/Get/${encodeURIComponent(String(id))}`,
      responseSchema: CustomerNoteSchema,
      options,
    });
  }

  /** `POST /CustomerNote/Save` — Saves the specified Customer Note. */
  public async save(
    input: CustomerNoteSaveRequest,
    options?: RequestOptions,
  ): Promise<CustomerNote> {
    return this.executor.request({
      resource: "CustomerNote",
      operation: "Save",
      method: "POST",
      path: "/CustomerNote/Save",
      body: input,
      requestSchema: CustomerNoteSaveRequestSchema,
      responseSchema: CustomerNoteSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /CustomerNote/Delete/{id}` — Deletes the specified Customer Note. */
  public async delete(id: number, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "CustomerNote",
      operation: "Delete",
      method: "DELETE",
      path: `/CustomerNote/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export * from "./m005.js";

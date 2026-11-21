/**
 * Suppliers domain services and wire schemas (M004):
 * - Supplier (4 operations)
 * - SupplierCategory (4 operations)
 * - SupplierOpeningBalance (4 operations)
 * - SupplierStatement (1 operation)
 * - SupplierNote (4 operations)
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

export const SupplierCategorySchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string().optional(),
    Modified: z.string().nullable().optional(),
    Created: z.string().nullable().optional(),
  })
  .passthrough();

export type SupplierCategory = z.infer<typeof SupplierCategorySchema>;

export const SupplierCategorySaveRequestSchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string(),
    Modified: z.string().nullable().optional(),
    Created: z.string().nullable().optional(),
  })
  .strict();

export type SupplierCategorySaveRequest = z.infer<typeof SupplierCategorySaveRequestSchema>;

export const SupplierCategoryPageSchema = createSagePageSchema(SupplierCategorySchema);

export const SupplierSchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string().optional(),
    Category: SupplierCategorySchema.nullable().optional(),
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
    HasSpecialCountryTaxActivity: z.boolean().optional(),
    Modified: z.string().nullable().optional(),
    Created: z.string().optional(),
    BusinessRegistrationNumber: z.string().optional(),
    RMCDApprovalNumber: z.string().optional(),
    TaxStatusVerified: z.string().nullable().optional(),
    CurrencyId: z.number().int().nullable().optional(),
    CurrencySymbol: z.string().optional(),
    HasActivity: z.boolean().optional(),
    DefaultDiscountPercentage: z.number().nullable().optional(),
    DefaultTaxTypeId: z.number().int().nullable().optional(),
    DefaultTaxType: TaxTypeSchema.nullable().optional(),
    DueDateMethodId: z.number().int().nullable().optional(),
    DueDateMethodValue: z.number().int().nullable().optional(),
    SubjectToDRCVat: z.boolean().optional(),
  })
  .passthrough();

export type Supplier = z.infer<typeof SupplierSchema>;

export const SupplierSaveRequestSchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string(),
    Category: SupplierCategorySchema.nullable().optional(),
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
    HasSpecialCountryTaxActivity: z.boolean().optional(),
    Modified: z.string().nullable().optional(),
    Created: z.string().optional(),
    BusinessRegistrationNumber: z.string().optional(),
    RMCDApprovalNumber: z.string().optional(),
    TaxStatusVerified: z.string().nullable().optional(),
    CurrencyId: z.number().int().nullable().optional(),
    CurrencySymbol: z.string().optional(),
    HasActivity: z.boolean().optional(),
    DefaultDiscountPercentage: z.number().nullable().optional(),
    DefaultTaxTypeId: z.number().int().nullable().optional(),
    DefaultTaxType: TaxTypeSchema.nullable().optional(),
    DueDateMethodId: z.number().int().nullable().optional(),
    DueDateMethodValue: z.number().int().nullable().optional(),
    SubjectToDRCVat: z.boolean().optional(),
  })
  .strict();

export type SupplierSaveRequest = z.infer<typeof SupplierSaveRequestSchema>;

export const SupplierPageSchema = createSagePageSchema(SupplierSchema);

export const SupplierOpeningBalanceSchema = z
  .object({
    ID: z.number().int().optional(),
    SupplierId: z.number().int(),
    Supplier_CurrencyId: z.number().int().nullable().optional(),
    Supplier_ExchangeRate: z.number().nullable().optional(),
    Balance: z.number(),
    Reason: z.string().optional(),
    Date: z.string(),
  })
  .passthrough();

export type SupplierOpeningBalance = z.infer<typeof SupplierOpeningBalanceSchema>;

export const SupplierOpeningBalanceSaveRequestSchema = z
  .object({
    ID: z.number().int().optional(),
    SupplierId: z.number().int(),
    Supplier_CurrencyId: z.number().int().nullable().optional(),
    Supplier_ExchangeRate: z.number().nullable().optional(),
    Balance: z.number(),
    Reason: z.string().optional(),
    Date: z.string(),
  })
  .strict();

export type SupplierOpeningBalanceSaveRequest = z.infer<
  typeof SupplierOpeningBalanceSaveRequestSchema
>;

export const SupplierOpeningBalancePageSchema = createSagePageSchema(SupplierOpeningBalanceSchema);

export const SupplierStatementRequestSchema = z
  .object({
    FromDate: z.string(),
    ToDate: z.string(),
    FromSupplier: z.string().optional(),
    ToSupplier: z.string().optional(),
    FromCategory: z.string().optional(),
    ToCategory: z.string().optional(),
    IncludeActive: z.boolean().optional(),
    IncludeInactive: z.boolean().optional(),
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

export type SupplierStatementRequest = z.infer<typeof SupplierStatementRequestSchema>;

export const SupplierStatementLineSchema = z
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

export type SupplierStatementLine = z.infer<typeof SupplierStatementLineSchema>;

export const SupplierStatementSchema = z
  .object({
    Supplier: SupplierSchema.optional(),
    StatementLines: z.array(SupplierStatementLineSchema).optional(),
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

export type SupplierStatement = z.infer<typeof SupplierStatementSchema>;

export const SupplierStatementPageSchema = createSagePageSchema(SupplierStatementSchema);

export const SupplierNoteSchema = z
  .object({
    ID: z.number().int().optional(),
    SupplierId: z.number().int().optional(),
    SupplierName: z.string().optional(),
    Subject: z.string(),
    EntryDate: z.string().nullable().optional(),
    ActionDate: z.string(),
    Status: z.boolean().nullable().optional(),
    Note: z.string().optional(),
    HasAttachments: z.boolean().nullable().optional(),
    Priority: z.number().int().nullable().optional(),
    UserTaskCategoryId: z.number().int().nullable().optional(),
    NotifyAssignee: z.boolean().nullable().optional(),
  })
  .passthrough();

export type SupplierNote = z.infer<typeof SupplierNoteSchema>;

export const SupplierNoteSaveRequestSchema = z
  .object({
    ID: z.number().int().optional(),
    SupplierId: z.number().int().optional(),
    SupplierName: z.string().optional(),
    Subject: z.string(),
    EntryDate: z.string().nullable().optional(),
    ActionDate: z.string(),
    Status: z.boolean().nullable().optional(),
    Note: z.string().optional(),
    HasAttachments: z.boolean().nullable().optional(),
    Priority: z.number().int().nullable().optional(),
    UserTaskCategoryId: z.number().int().nullable().optional(),
    NotifyAssignee: z.boolean().nullable().optional(),
  })
  .strict();

export type SupplierNoteSaveRequest = z.infer<typeof SupplierNoteSaveRequestSchema>;

export const SupplierNotePageSchema = createSagePageSchema(SupplierNoteSchema);

export class SuppliersService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /Supplier/Get` — Gets a list of Suppliers. Supports OData and paging. */
  public async list(options?: RequestOptions): Promise<SagePage<Supplier>> {
    return this.executor.request({
      resource: "Supplier",
      operation: "Get",
      method: "GET",
      path: "/Supplier/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: SupplierPageSchema,
      options,
    });
  }

  /** Async page iterator for `GET /Supplier/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<Supplier>, void, undefined> {
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

  /** Async item iterator for `GET /Supplier/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<Supplier, void, undefined> {
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

  /** `GET /Supplier/Get/{id}` — Gets the specified Supplier based on the identifier. */
  public async get(id: number, options?: RequestOptions): Promise<Supplier> {
    return this.executor.request({
      resource: "Supplier",
      operation: "GetById",
      method: "GET",
      path: `/Supplier/Get/${encodeURIComponent(String(id))}`,
      responseSchema: SupplierSchema,
      options,
    });
  }

  /** `POST /Supplier/Save` — Saves the specified Supplier. */
  public async save(input: SupplierSaveRequest, options?: RequestOptions): Promise<Supplier> {
    return this.executor.request({
      resource: "Supplier",
      operation: "Save",
      method: "POST",
      path: "/Supplier/Save",
      body: input,
      requestSchema: SupplierSaveRequestSchema,
      responseSchema: SupplierSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /Supplier/Delete/{id}` — Deletes the specified Supplier, when not in use. */
  public async delete(id: number, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "Supplier",
      operation: "Delete",
      method: "DELETE",
      path: `/Supplier/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class SupplierCategoriesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /SupplierCategory/Get` — Gets a list of Supplier Categories. */
  public async list(options?: RequestOptions): Promise<SagePage<SupplierCategory>> {
    return this.executor.request({
      resource: "SupplierCategory",
      operation: "Get",
      method: "GET",
      path: "/SupplierCategory/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: SupplierCategoryPageSchema,
      options,
    });
  }

  /** `GET /SupplierCategory/Get/{id}` — Gets the specified Supplier Category based on the identifier. */
  public async get(id: number, options?: RequestOptions): Promise<SupplierCategory> {
    return this.executor.request({
      resource: "SupplierCategory",
      operation: "GetById",
      method: "GET",
      path: `/SupplierCategory/Get/${encodeURIComponent(String(id))}`,
      responseSchema: SupplierCategorySchema,
      options,
    });
  }

  /** `POST /SupplierCategory/Save` — Saves the specified Supplier Category. */
  public async save(
    input: SupplierCategorySaveRequest,
    options?: RequestOptions,
  ): Promise<SupplierCategory> {
    return this.executor.request({
      resource: "SupplierCategory",
      operation: "Save",
      method: "POST",
      path: "/SupplierCategory/Save",
      body: input,
      requestSchema: SupplierCategorySaveRequestSchema,
      responseSchema: SupplierCategorySchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /SupplierCategory/Delete/{id}` — Deletes the specified Supplier Category. */
  public async delete(id: number, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SupplierCategory",
      operation: "Delete",
      method: "DELETE",
      path: `/SupplierCategory/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class SupplierOpeningBalancesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /SupplierOpeningBalance/Get` — Gets a list of Supplier Opening Balances. */
  public async list(options?: RequestOptions): Promise<SagePage<SupplierOpeningBalance>> {
    return this.executor.request({
      resource: "SupplierOpeningBalance",
      operation: "Get",
      method: "GET",
      path: "/SupplierOpeningBalance/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: SupplierOpeningBalancePageSchema,
      options,
    });
  }

  /** `GET /SupplierOpeningBalance/Get/{id}` — Gets the specified Supplier Opening Balance based on the identifier. */
  public async get(id: number, options?: RequestOptions): Promise<SupplierOpeningBalance> {
    return this.executor.request({
      resource: "SupplierOpeningBalance",
      operation: "GetById",
      method: "GET",
      path: `/SupplierOpeningBalance/Get/${encodeURIComponent(String(id))}`,
      responseSchema: SupplierOpeningBalanceSchema,
      options,
    });
  }

  /** `GET /SupplierOpeningBalance/GetBySupplierId/{id}` — Gets the specified Supplier Opening Balance based on the SupplierId. */
  public async getBySupplierId(
    supplierId: number,
    options?: RequestOptions,
  ): Promise<SupplierOpeningBalance> {
    return this.executor.request({
      resource: "SupplierOpeningBalance",
      operation: "GetBySupplierId",
      method: "GET",
      path: `/SupplierOpeningBalance/GetBySupplierId/${encodeURIComponent(String(supplierId))}`,
      responseSchema: SupplierOpeningBalanceSchema,
      options,
    });
  }

  /** `POST /SupplierOpeningBalance/Save` — Saves the specified Supplier Opening Balance. */
  public async save(
    input: SupplierOpeningBalanceSaveRequest,
    options?: RequestOptions,
  ): Promise<SupplierOpeningBalance> {
    return this.executor.request({
      resource: "SupplierOpeningBalance",
      operation: "Save",
      method: "POST",
      path: "/SupplierOpeningBalance/Save",
      body: input,
      requestSchema: SupplierOpeningBalanceSaveRequestSchema,
      responseSchema: SupplierOpeningBalanceSchema,
      isFinancialMutation: true,
      options,
    });
  }
}

export class SupplierStatementsService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /SupplierStatement/Get` — Gets the specified Supplier Statement based on the request model. */
  public async get(
    input: SupplierStatementRequest,
    options?: RequestOptions,
  ): Promise<SagePage<SupplierStatement>> {
    return this.executor.request({
      resource: "SupplierStatement",
      operation: "Get",
      method: "POST",
      path: "/SupplierStatement/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: SupplierStatementRequestSchema,
      responseSchema: SupplierStatementPageSchema,
      options,
    });
  }
}

export class SupplierNotesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /SupplierNote/Get` — Gets a list of Supplier Notes. */
  public async list(options?: RequestOptions): Promise<SagePage<SupplierNote>> {
    return this.executor.request({
      resource: "SupplierNote",
      operation: "Get",
      method: "GET",
      path: "/SupplierNote/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: SupplierNotePageSchema,
      options,
    });
  }

  /** `GET /SupplierNote/Get/{id}` — Gets the specified Supplier Note based on the identifier. */
  public async get(id: number, options?: RequestOptions): Promise<SupplierNote> {
    return this.executor.request({
      resource: "SupplierNote",
      operation: "GetById",
      method: "GET",
      path: `/SupplierNote/Get/${encodeURIComponent(String(id))}`,
      responseSchema: SupplierNoteSchema,
      options,
    });
  }

  /** `POST /SupplierNote/Save` — Saves the specified Supplier Note. */
  public async save(
    input: SupplierNoteSaveRequest,
    options?: RequestOptions,
  ): Promise<SupplierNote> {
    return this.executor.request({
      resource: "SupplierNote",
      operation: "Save",
      method: "POST",
      path: "/SupplierNote/Save",
      body: input,
      requestSchema: SupplierNoteSaveRequestSchema,
      responseSchema: SupplierNoteSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /SupplierNote/Delete/{id}` — Deletes the specified Supplier Note. */
  public async delete(id: number, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SupplierNote",
      operation: "Delete",
      method: "DELETE",
      path: `/SupplierNote/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export * from "./m005.js";

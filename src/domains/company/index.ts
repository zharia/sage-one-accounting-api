/**
 * Company domain services and wire schemas (M004):
 * - Company (4 operations)
 * - CompanyEntityType (2 operations)
 * - CompanyNote (5 operations)
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

export const CompanyLogoSchema = z
  .object({
    ID: z.number().int().optional(),
    Image: z.union([z.string(), z.array(z.number().int())]).optional(),
    Timestamp: z.union([z.string(), z.array(z.number().int())]).optional(),
  })
  .passthrough();

export type CompanyLogo = z.infer<typeof CompanyLogoSchema>;

export const CompanySchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string(),
    CurrencySymbol: z.string().optional(),
    CurrencyDecimalDigits: z.number().int().optional(),
    NumberDecimalDigits: z.number().int().optional(),
    DecimalSeparator: z.string().optional(),
    HoursDecimalDigits: z.number().int().optional(),
    ItemCostPriceDecimalDigits: z.number().int().optional(),
    ItemSellingPriceDecimalDigits: z.number().int().optional(),
    PostalAddress1: z.string().optional(),
    PostalAddress2: z.string().optional(),
    PostalAddress3: z.string().optional(),
    PostalAddress4: z.string().optional(),
    PostalAddress5: z.string().optional(),
    GroupSeparator: z.string().optional(),
    RoundingValue: z.number().int().optional(),
    TaxSystem: z.number().int().optional(),
    RoundingType: z.number().int().optional(),
    AgeMonthly: z.boolean().optional(),
    DisplayInactiveItems: z.boolean().optional(),
    WarnWhenItemCostIsZero: z.boolean().optional(),
    DoNotAllowProcessingIntoNegativeQuantities: z.boolean().nullable().optional(),
    WarnWhenItemQuantityIsZero: z.boolean().optional(),
    WarnWhenItemSellingBelowCost: z.boolean().optional(),
    CountryId: z.number().int().optional(),
    CompanyEntityTypeId: z.number().int().nullable().optional(),
    TakeOnBalanceDate: z.string().nullable().optional(),
    EnableCustomerZone: z.boolean().optional(),
    EnableAutomaticBankFeedRefresh: z.boolean().optional(),
    ContactName: z.string().optional(),
    Telephone: z.string().optional(),
    Fax: z.string().optional(),
    Mobile: z.string().optional(),
    Email: z.string().optional(),
    IsPrimarySendingEmail: z.boolean().optional(),
    PostalAddress01: z.string().optional(),
    PostalAddress02: z.string().optional(),
    PostalAddress03: z.string().optional(),
    PostalAddress04: z.string().optional(),
    PostalAddress05: z.string().optional(),
    CompanyInfo01: z.string().optional(),
    CompanyInfo02: z.string().optional(),
    CompanyInfo03: z.string().optional(),
    CompanyInfo04: z.string().optional(),
    CompanyInfo05: z.string().optional(),
    IsOwner: z.boolean().optional(),
    UseCCEmail: z.boolean().nullable().optional(),
    CCEmail: z.string().optional(),
    DateFormatId: z.number().int().optional(),
    CheckForDuplicateCustomerReferences: z.boolean().optional(),
    CheckForDuplicateSupplierReferences: z.boolean().optional(),
    DisplayName: z.string().optional(),
    DisplayInactiveCustomers: z.boolean().optional(),
    DisplayInactiveSuppliers: z.boolean().optional(),
    DisplayInactiveTimeProjects: z.boolean().optional(),
    UseInclusiveProcessingByDefault: z.boolean().optional(),
    LockProcessing: z.boolean().optional(),
    LockProcessingDate: z.string().nullable().optional(),
    LockTimesheetProcessing: z.boolean().optional(),
    LockTimesheetProcessingDate: z.string().nullable().optional(),
    LockedForConversion: z.boolean().nullable().optional(),
    LockedForTransfer: z.boolean().nullable().optional(),
    TaxPeriodFrequency: z.number().int().nullable().optional(),
    PreviousTaxPeriodEndDate: z.string().nullable().optional(),
    PreviousTaxReturnDate: z.string().nullable().optional(),
    UseNoreplyEmail: z.boolean().optional(),
    AgeingBasedOnDueDate: z.boolean().optional(),
    UseLogoOnEmails: z.boolean().optional(),
    UseLogoOnCustomerZone: z.boolean().optional(),
    City: z.string().optional(),
    State: z.string().optional(),
    Country: z.string().optional(),
    HomeCurrencyId: z.number().int().nullable().optional(),
    CurrencyId: z.number().int().nullable().optional(),
    Created: z.string().optional(),
    Modified: z.string().nullable().optional(),
    Active: z.boolean().optional(),
    TaxNumber: z.string().optional(),
    RegisteredName: z.string().optional(),
    RegistrationNumber: z.string().optional(),
    IsPracticeAccount: z.boolean().optional(),
    LogoPositionID: z.number().int().optional(),
    Attachment: CompanyLogoSchema.nullable().optional(),
    CompanyTaxNumber: z.string().optional(),
    TaxOffice: z.string().optional(),
    CustomerZoneGuid: z.string().nullable().optional(),
    ClientTypeId: z.number().int().optional(),
    DisplayTotalTypeId: z.number().int().optional(),
    DisplayInCompanyConsole: z.boolean().optional(),
    LastLoginDate: z.string().nullable().optional(),
    Status: z.union([z.number().int(), z.string()]).optional(),
    TaxReportingTypeId: z.number().int().optional(),
    SalesOrdersReserveItemQuantities: z.boolean().optional(),
    PrescribedGoodsTrader: z.boolean().optional(),
    DisplayInactiveItemBundles: z.boolean().nullable().optional(),
    CompanyTransferStatus: z.union([z.number().int(), z.string()]).optional(),
    InventoryTypeId: z.number().int().optional(),
  })
  .passthrough();

export type Company = z.infer<typeof CompanySchema>;

export const CompanyPageSchema = createSagePageSchema(CompanySchema);

export const CompanyEntityTypeSchema = z
  .object({
    ID: z.number().int().optional(),
    CountryId: z.number().int().optional(),
    Name: z.string().optional(),
    OwnershipDescription: z.string().optional(),
    HoldingDescription: z.string().optional(),
    HoldingUnit: z.string().optional(),
    Created: z.string().optional(),
    CanIssueShares: z.boolean().optional(),
  })
  .passthrough();

export type CompanyEntityType = z.infer<typeof CompanyEntityTypeSchema>;

export const CompanyEntityTypePageSchema = createSagePageSchema(CompanyEntityTypeSchema);

export const CompanyNoteSchema = z
  .object({
    ID: z.number().int().optional(),
    Subject: z.string(),
    EntryDate: z.string().nullable().optional(),
    ActionDate: z.string(),
    Status: z.boolean().nullable().optional(),
    Note: z.string().optional(),
    HasAttachments: z.boolean().nullable().optional(),
  })
  .passthrough();

export type CompanyNote = z.infer<typeof CompanyNoteSchema>;

export const CompanyNoteSaveRequestSchema = z
  .object({
    ID: z.number().int().optional(),
    Subject: z.string(),
    EntryDate: z.string().nullable().optional(),
    ActionDate: z.string(),
    Status: z.boolean().nullable().optional(),
    Note: z.string().optional(),
    HasAttachments: z.boolean().nullable().optional(),
  })
  .strict();

export type CompanyNoteSaveRequest = z.infer<typeof CompanyNoteSaveRequestSchema>;

export const CompanyNotePageSchema = createSagePageSchema(CompanyNoteSchema);

export interface CompanyListOptions extends RequestOptions {
  readonly includeStatus?: boolean | undefined;
}

export class CompanyService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /Company/Get?includeStatus={includeStatus}` — Retrieves a paged list of Companies. */
  public async list(options?: CompanyListOptions): Promise<SagePage<Company>> {
    return this.executor.request({
      resource: "Company",
      operation: "Get",
      method: "GET",
      path: "/Company/Get",
      query: buildQueryWithOData(
        options?.includeStatus !== undefined ? { includeStatus: options.includeStatus } : undefined,
        options?.odata,
      ),
      responseSchema: CompanyPageSchema,
      options,
    });
  }

  /** Async page iterator for `GET /Company/Get`. */
  public pages(
    options?: CompanyListOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<Company>, void, undefined> {
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

  /** Async item iterator for `GET /Company/Get`. */
  public iterate(
    options?: CompanyListOptions & PaginationOptions,
  ): AsyncGenerator<Company, void, undefined> {
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

  /** `GET /Company/Get/{id}` — Retrieves a specific Company. */
  public async get(id: number, options?: RequestOptions): Promise<Company> {
    return this.executor.request({
      resource: "Company",
      operation: "GetById",
      method: "GET",
      path: `/Company/Get/${encodeURIComponent(String(id))}`,
      responseSchema: CompanySchema,
      options,
    });
  }

  /** `GET /Company/GetUserCompanyCount` — Retrieves a count of the companies the current user owns. */
  public async getUserCompanyCount(options?: RequestOptions): Promise<number> {
    return this.executor.request({
      resource: "Company",
      operation: "GetUserCompanyCount",
      method: "GET",
      path: "/Company/GetUserCompanyCount",
      responseSchema: z.number().int(),
      options,
    });
  }

  /** `GET /Company/Current` — Retrieves the current Company. */
  public async current(options?: RequestOptions): Promise<Company> {
    return this.executor.request({
      resource: "Company",
      operation: "Current",
      method: "GET",
      path: "/Company/Current",
      responseSchema: CompanySchema,
      options,
    });
  }
}

export class CompanyEntityTypesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /CompanyEntityType/Get` — Gets a list of Company Entity Types. */
  public async list(options?: RequestOptions): Promise<SagePage<CompanyEntityType>> {
    return this.executor.request({
      resource: "CompanyEntityType",
      operation: "Get",
      method: "GET",
      path: "/CompanyEntityType/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: CompanyEntityTypePageSchema,
      options,
    });
  }

  /** `GET /CompanyEntityType/Get/{id}` — Gets a specified Company's Entity Type based on the identifier. */
  public async get(id: number, options?: RequestOptions): Promise<CompanyEntityType> {
    return this.executor.request({
      resource: "CompanyEntityType",
      operation: "GetById",
      method: "GET",
      path: `/CompanyEntityType/Get/${encodeURIComponent(String(id))}`,
      responseSchema: CompanyEntityTypeSchema,
      options,
    });
  }
}

export class CompanyNotesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /CompanyNote/Get` — Gets a list of Company Notes. */
  public async list(options?: RequestOptions): Promise<SagePage<CompanyNote>> {
    return this.executor.request({
      resource: "CompanyNote",
      operation: "Get",
      method: "GET",
      path: "/CompanyNote/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: CompanyNotePageSchema,
      options,
    });
  }

  /** `GET /CompanyNote/Get/{id}` — Gets the specified Company Note based on the identifier. */
  public async get(id: number, options?: RequestOptions): Promise<CompanyNote> {
    return this.executor.request({
      resource: "CompanyNote",
      operation: "GetById",
      method: "GET",
      path: `/CompanyNote/Get/${encodeURIComponent(String(id))}`,
      responseSchema: CompanyNoteSchema,
      options,
    });
  }

  /** `GET /CompanyNote/GetCompanyNotes/{id}` — Gets a list of Company Notes for the specified company ID. */
  public async getCompanyNotes(
    companyId: number,
    options?: RequestOptions,
  ): Promise<SagePage<CompanyNote>> {
    return this.executor.request({
      resource: "CompanyNote",
      operation: "GetCompanyNotes",
      method: "GET",
      path: `/CompanyNote/GetCompanyNotes/${encodeURIComponent(String(companyId))}`,
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: CompanyNotePageSchema,
      options,
    });
  }

  /** `POST /CompanyNote/Save` — Saves the specified Company Note. */
  public async save(input: CompanyNoteSaveRequest, options?: RequestOptions): Promise<CompanyNote> {
    return this.executor.request({
      resource: "CompanyNote",
      operation: "Save",
      method: "POST",
      path: "/CompanyNote/Save",
      body: input,
      requestSchema: CompanyNoteSaveRequestSchema,
      responseSchema: CompanyNoteSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /CompanyNote/Delete/{id}` — Deletes the specified Company Note. */
  public async delete(id: number, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "CompanyNote",
      operation: "Delete",
      method: "DELETE",
      path: `/CompanyNote/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export * from "./m006.js";

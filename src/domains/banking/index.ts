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

const AccountNoteSchema = z
  .object({
    ID: z.number().int(),
    Subject: z.string(),
    EntryDate: z.string().nullable().optional(),
    ActionDate: z.string(),
    Status: z.boolean().nullable().optional(),
    Note: z.string().optional(),
    HasAttachments: z.boolean().nullable().optional(),
    AccountId: z.number().int().optional(),
    UserId: z.number().int().nullable().optional(),
  })
  .passthrough();

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

export const BankAccountNoteSchema = z
  .object({
    ID: z.number().int(),
    Subject: z.string(),
    EntryDate: z.string().nullable().optional(),
    ActionDate: z.string(),
    Status: z.boolean().nullable().optional(),
    Note: z.string().optional(),
    HasAttachments: z.boolean().nullable().optional(),
    BankAccountId: z.number().int().optional(),
  })
  .passthrough();
export type BankAccountNote = z.infer<typeof BankAccountNoteSchema>;

export const BankAccountOpeningBalanceSchema = z
  .object({
    ID: z.number().int().optional(),
    Balance: z.number().optional(),
    Reason: z.string().optional(),
    Date: z.string().optional(),
    BankAccountId: z.number().int().optional(),
    BankAccount_CurrencyId: z.number().int().nullable().optional(),
    BankAccount_ExchangeRate: z.number().nullable().optional(),
  })
  .passthrough();
export type BankAccountOpeningBalance = z.infer<typeof BankAccountOpeningBalanceSchema>;

export const BankAccountTransactionListingSchema = z
  .object({
    ID: z.number().int().nullable().optional(),
    OpeningBalanceDate: z.string().nullable().optional(),
    OpeningBalance: z.number().int().nullable().optional(),
    ClosingBalanceDate: z.string().nullable().optional(),
    ClosingBalance: z.number().int().nullable().optional(),
    Name: z.string().nullable().optional(),
    CurrencySymbol: z.string().nullable().optional(),
  })
  .passthrough();
export type BankAccountTransactionListing = z.infer<typeof BankAccountTransactionListingSchema>;

export const BankAccountTransactionListingRequestModelSchema = z
  .object({
    FromBankAccount: z.string().optional(),
    ToBankAccount: z.string().optional(),
    FromAccount: z.string().optional(),
    ToAccount: z.string().optional(),
    FromBankAccountCategory: z.string().optional(),
    ToBankAccountCategory: z.string().optional(),
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    Active: z.boolean().optional(),
    Inactive: z.boolean().optional(),
    TransactionType: z.string().optional(),
    UseForeignCurrency: z.boolean().optional(),
  })
  .passthrough();
export type BankAccountTransactionListingRequestModel = z.infer<
  typeof BankAccountTransactionListingRequestModelSchema
>;

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

export const BankImportMappingSchema = z
  .object({
    ID: z.number().int().optional(),
    LinkTypeId: z.number().int().optional(),
    LinkId: z.number().int().optional(),
    TaxTypeId: z.number().int().optional(),
    SearchString: z.string(),
    Priority: z.boolean().optional(),
    DisplayDescription: z.string().optional(),
    Payee: z.string().optional(),
    AnalysisCategoryId1: z.number().int().nullable().optional(),
    AnalysisCategoryId2: z.number().int().nullable().optional(),
    AnalysisCategoryId3: z.number().int().nullable().optional(),
  })
  .passthrough();
export type BankImportMapping = z.infer<typeof BankImportMappingSchema>;

export const BankImportMappingSettingsSchema = z
  .object({
    BankStatementMatchingOption: z.union([z.literal(0), z.literal(1), z.literal(2)]).optional(),
    BankStatementMatchingOnNewTransactions: z.boolean().optional(),
  })
  .passthrough();
export type BankImportMappingSettings = z.infer<typeof BankImportMappingSettingsSchema>;

export const BankStatementTransactionSchema = z
  .object({
    ID: z.number().int().nullable().optional(),
    Date: z.string().nullable().optional(),
    BankAccountId: z.number().int().nullable().optional(),
    BankAccount: z.record(z.string(), z.unknown()).nullable().optional(),
    Selection: z.record(z.string(), z.unknown()).nullable().optional(),
    Reference: z.string().nullable().optional(),
    Description: z.string().nullable().optional(),
    Tax: z.number().int().nullable().optional(),
    Total: z.number().int().nullable().optional(),
    BankUniqueIdentifier: z.string().nullable().optional(),
    MatchedBankTransactionID: z.number().int().nullable().optional(),
  })
  .passthrough();
export type BankStatementTransaction = z.infer<typeof BankStatementTransactionSchema>;

export const BaseBankTransactionSchema = z
  .object({
    ID: z.number().int().optional(),
    ParentId: z.number().int().optional(),
    Description: z.string().optional(),
    BankUniqueIdentifier: z.string().optional(),
    Editable: z.boolean().optional(), // read-only / system generated
    get SplitTransactions() {
      return z.array(BaseBankTransactionSchema).optional();
    },
    Duplicate: z.boolean().optional(), // read-only / system generated
    Matched: z.boolean().optional(), // read-only / system generated
    HasAllocations: z.boolean().optional(), // read-only / system generated
    ImportTypeId: z.number().int().nullable().optional(),
    ImportActionDate: z.string().nullable().optional(),
    HasManualDiscountAllocations: z.boolean().optional(),
    DiscountAllocationChanged: z.boolean().optional(),
    SelectionId: z.number().int().nullable().optional(),
    SelectionName: z.string().optional(),
    Selection_CurrencyId: z.number().int().nullable().optional(),
    Selection_ExchangeRate: z.number().nullable().optional(),
    SelectionIsObfuscated: z.boolean().optional(),
    ParentTrackingCode: z.string().optional(),
    Type: z
      .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)])
      .optional(),
    TaxTypeId: z.number().int().nullable().optional(),
    TaxPeriodId: z.number().int().nullable().optional(),
    Payee: z.string().optional(),
    Reconciled: z.boolean().optional(),
    Accepted: z.boolean().optional(),
    AnalysisCategoryId1: z.number().int().nullable().optional(),
    AnalysisCategoryId2: z.number().int().nullable().optional(),
    AnalysisCategoryId3: z.number().int().nullable().optional(),
    BankAccountId: z.number().int().nullable().optional(),
    Date: z.string().optional(),
    Memo: z.string().optional(),
    DocumentNumber: z.string().optional(),
    Reference: z.string().optional(),
    Link_CurrencyId: z.number().int().nullable().optional(),
    Link_ExchangeRate: z.number().nullable().optional(),
    HasAttachments: z.boolean().nullable().optional(), // read-only / system generated
    Discount: z.number().nullable().optional(),
    DiscountPercentage: z.number().nullable().optional(),
    Rounding: z.number().nullable().optional(),
    Exclusive: z.number().optional(),
    Tax: z.number().optional(),
    Total: z.number().optional(),
    BankAccount_CurrencyId: z.number().int().nullable().optional(),
    BankAccount_ExchangeRate: z.number().nullable().optional(),
    PaymentMethodId: z.number().int().nullable().optional(),
    StatusId: z.number().int().nullable().optional(), // read-only / system generated
    BankImportMappingId: z.number().int().nullable().optional(),
    Locked: z.boolean().optional(), // read-only / system generated
    TimeTrackingProjectId: z.number().int().nullable().optional(),
    TimeTrackingExpenseId: z.number().int().nullable().optional(),
    BillingMethodId: z.number().int().nullable().optional(),
    Recharge: z.number().nullable().optional(),
    MarkupPercentage: z.number().nullable().optional(),
    DocumentHeaderLinkTypeId: z.number().int().nullable().optional(),
  })
  .passthrough();
export type BaseBankTransaction = z.infer<typeof BaseBankTransactionSchema>;

export const CashMovementSchema = z
  .object({
    BankAccount: z.record(z.string(), z.unknown()).nullable().optional(),
    Date: z.string().nullable().optional(),
    Total: z.number().int().nullable().optional(),
  })
  .passthrough();
export type CashMovement = z.infer<typeof CashMovementSchema>;

export const CashMovementRequestModelSchema = z
  .object({
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    BankAccountId: z.number().int().nullable().optional(),
    GroupingType: z.number().int().nullable().optional(),
  })
  .passthrough();
export type CashMovementRequestModel = z.infer<typeof CashMovementRequestModelSchema>;

const IBigModelSchema = z
  .object({
    ID: z.number().int().optional(),
  })
  .passthrough();

const IModelSchema = z
  .object({
    ID: z.number().int().optional(),
  })
  .passthrough();

export const ProcessBankAndCreditCardMappingSchema = z
  .object({
    ID: z.number().int().optional(),
    LinkTypeId: z.number().int().optional(),
    LinkId: z.number().int().optional(),
    TaxTypeId: z.number().int().optional(),
    SearchString: z.string().optional(),
    Payee: z.string().optional(),
  })
  .passthrough();
export type ProcessBankAndCreditCardMapping = z.infer<typeof ProcessBankAndCreditCardMappingSchema>;

export const ProcessBankAndCreditCardMappingSettingsSchema = z
  .object({
    AutomaticallyRememberBankAndCreditCardDescriptions: z.boolean().optional(),
  })
  .passthrough();
export type ProcessBankAndCreditCardMappingSettings = z.infer<
  typeof ProcessBankAndCreditCardMappingSettingsSchema
>;

const StorageInformationSchema = z
  .object({
    SizeUsed: z.number().int().optional(),
    MaxSizeAllowed: z.number().int().optional(),
  })
  .passthrough();

export class BankAccountService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /BankAccount/Get` [GET-BankAccount-Get] — Gets a list of Bank Accounts. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof BankAccountSchema>>> {
    return this.executor.request({
      resource: "BankAccount",
      operation: "Get",
      method: "GET",
      path: "/BankAccount/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(BankAccountSchema),
      options,
    });
  }

  /** Async page iterator for `GET /BankAccount/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof BankAccountSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /BankAccount/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof BankAccountSchema>, void, undefined> {
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

  /** `GET /BankAccount/Get/{id}` [GET-BankAccount-Get-id] — Gets the specified Bank Account based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof BankAccountSchema>> {
    return this.executor.request({
      resource: "BankAccount",
      operation: "GetById",
      method: "GET",
      path: `/BankAccount/Get/${encodeURIComponent(String(id))}`,
      responseSchema: BankAccountSchema,
      options,
    });
  }

  /** `POST /BankAccount/Save` [POST-BankAccount-Save] — Saves the specified bank account. */
  public async save(
    input: z.infer<typeof BankAccountSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof BankAccountSchema>> {
    return this.executor.request({
      resource: "BankAccount",
      operation: "Save",
      method: "POST",
      path: "/BankAccount/Save",
      body: input,
      requestSchema: BankAccountSchema,
      responseSchema: BankAccountSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /BankAccount/Delete/{id}` [DELETE-BankAccount-Delete-id] — Deletes the specified Bank Account. Only succeeds if the Bank Account is not in use. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "BankAccount",
      operation: "Delete",
      method: "DELETE",
      path: `/BankAccount/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /BankAccount/Validate` [POST-BankAccount-Validate] — Validates the specified Bank Account. */
  public async validate(
    input: z.infer<typeof BankAccountSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "BankAccount",
      operation: "Validate",
      method: "POST",
      path: "/BankAccount/Validate",
      body: input,
      requestSchema: BankAccountSchema,
      responseType: "empty",
      options,
    });
  }
}

export class BankAccountCategoryService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /BankAccountCategory/Save` [POST-BankAccountCategory-Save] — Saves the specified Bank Account Category. */
  public async save(
    input: z.infer<typeof BankAccountCategorySchema>,
    options?: RequestOptions,
  ): Promise<unknown> {
    return this.executor.request({
      resource: "BankAccountCategory",
      operation: "Save",
      method: "POST",
      path: "/BankAccountCategory/Save",
      body: input,
      requestSchema: BankAccountCategorySchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /BankAccountCategory/Get` [GET-BankAccountCategory-Get] — Gets a list of Bank Account Categories. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof BankAccountCategorySchema>>> {
    return this.executor.request({
      resource: "BankAccountCategory",
      operation: "Get",
      method: "GET",
      path: "/BankAccountCategory/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(BankAccountCategorySchema),
      options,
    });
  }

  /** Async page iterator for `GET /BankAccountCategory/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof BankAccountCategorySchema>>,
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

  /** Async item iterator for `GET /BankAccountCategory/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof BankAccountCategorySchema>, void, undefined> {
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

  /** `GET /BankAccountCategory/Get/{id}` [GET-BankAccountCategory-Get-id] — Gets the specified Bank Account Category based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof BankAccountCategorySchema>> {
    return this.executor.request({
      resource: "BankAccountCategory",
      operation: "GetById",
      method: "GET",
      path: `/BankAccountCategory/Get/${encodeURIComponent(String(id))}`,
      responseSchema: BankAccountCategorySchema,
      options,
    });
  }

  /** `DELETE /BankAccountCategory/Delete/{id}` [DELETE-BankAccountCategory-Delete-id] — Deletes the specified Bank Account Category. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "BankAccountCategory",
      operation: "Delete",
      method: "DELETE",
      path: `/BankAccountCategory/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class BankAccountNoteService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /BankAccountNote/Save` [POST-BankAccountNote-Save] — Saves the specified Bank Account Note. */
  public async save(
    input: z.infer<typeof BankAccountNoteSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof BankAccountNoteSchema>> {
    return this.executor.request({
      resource: "BankAccountNote",
      operation: "Save",
      method: "POST",
      path: "/BankAccountNote/Save",
      body: input,
      requestSchema: BankAccountNoteSchema,
      responseSchema: BankAccountNoteSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /BankAccountNote/Get` [GET-BankAccountNote-Get] — Gets a list of Bank Account Notes. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof AccountNoteSchema>>> {
    return this.executor.request({
      resource: "BankAccountNote",
      operation: "Get",
      method: "GET",
      path: "/BankAccountNote/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(AccountNoteSchema),
      options,
    });
  }

  /** Async page iterator for `GET /BankAccountNote/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof AccountNoteSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /BankAccountNote/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof AccountNoteSchema>, void, undefined> {
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

  /** `GET /BankAccountNote/Get/{id}` [GET-BankAccountNote-Get-id] — Gets the specified Bank Account Note based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof BankAccountNoteSchema>> {
    return this.executor.request({
      resource: "BankAccountNote",
      operation: "GetById",
      method: "GET",
      path: `/BankAccountNote/Get/${encodeURIComponent(String(id))}`,
      responseSchema: BankAccountNoteSchema,
      options,
    });
  }

  /** `DELETE /BankAccountNote/Delete/{id}` [DELETE-BankAccountNote-Delete-id] — Deletes the specified Bank Account Note. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "BankAccountNote",
      operation: "Delete",
      method: "DELETE",
      path: `/BankAccountNote/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class BankAccountNoteAttachmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /BankAccountNoteAttachment/Save` [POST-BankAccountNoteAttachment-Save] — Saves the Attachment. The file data is transmitted as a multipart/form-data POST. In the query string of the Url or a parameter in the form post, a BankAccountNoteId is required. A BankAccountNoteId is the ID of the BankAccountNote that this attachment must be linked to. This is Required and is not optional. */
  public async save(
    upload: {
      readonly BankAccountNoteId: number | string;
      readonly file: Blob | Uint8Array | string;
      readonly fileName?: string | undefined;
      readonly fieldName?: string | undefined;
    },
    options?: RequestOptions,
  ): Promise<unknown> {
    const formData = new FormData();
    formData.set("BankAccountNoteId", String(upload.BankAccountNoteId));
    const blob =
      upload.file instanceof Blob
        ? upload.file
        : new Blob([typeof upload.file === "string" ? upload.file : new Uint8Array(upload.file)]);
    formData.set(upload.fieldName ?? "file", blob, upload.fileName ?? "attachment.bin");
    return this.executor.request({
      resource: "BankAccountNoteAttachment",
      operation: "Save",
      method: "POST",
      path: "/BankAccountNoteAttachment/Save",
      query: buildQueryWithOData({ BankAccountNoteId: upload.BankAccountNoteId }, options?.odata),
      formData,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /BankAccountNoteAttachment/Get/{id}` [GET-BankAccountNoteAttachment-Get-id] — Gets the specified Attachment based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AttachmentSchema>>> {
    return this.executor.request({
      resource: "BankAccountNoteAttachment",
      operation: "GetById",
      method: "GET",
      path: `/BankAccountNoteAttachment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(AttachmentSchema),
      options,
    });
  }

  /** `GET /BankAccountNoteAttachment/Download/{id}` [GET-BankAccountNoteAttachment-Download-id] — Downloads the specified Attachment based on file identifier (Guid). */
  public async download(id: string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "BankAccountNoteAttachment",
      operation: "Download",
      method: "GET",
      path: `/BankAccountNoteAttachment/Download/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }

  /** `GET /BankAccountNoteAttachment/GetCompanyStorageInformation` [GET-BankAccountNoteAttachment-GetCompanyStorageInformation] — Gets the Company Storage Information. */
  public async getCompanyStorageInformation(
    options?: RequestOptions,
  ): Promise<z.infer<typeof StorageInformationSchema>> {
    return this.executor.request({
      resource: "BankAccountNoteAttachment",
      operation: "GetCompanyStorageInformation",
      method: "GET",
      path: "/BankAccountNoteAttachment/GetCompanyStorageInformation",
      responseSchema: StorageInformationSchema,
      options,
    });
  }

  /** `DELETE /BankAccountNoteAttachment/Delete/{id}` [DELETE-BankAccountNoteAttachment-Delete-id] — Deletes the specified Attachment based on file identifier (Guid). */
  public async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "BankAccountNoteAttachment",
      operation: "Delete",
      method: "DELETE",
      path: `/BankAccountNoteAttachment/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /BankAccountNoteAttachment/DeleteAll/{id}` [DELETE-BankAccountNoteAttachment-DeleteAll-id] — Deletes all Attachments based on the identifier. */
  public async deleteAll(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "BankAccountNoteAttachment",
      operation: "DeleteAll",
      method: "DELETE",
      path: `/BankAccountNoteAttachment/DeleteAll/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /BankAccountNoteAttachment/Validate` [POST-BankAccountNoteAttachment-Validate] — Validates the specified Entity. */
  public async validate(
    input: z.infer<typeof IModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "BankAccountNoteAttachment",
      operation: "Validate",
      method: "POST",
      path: "/BankAccountNoteAttachment/Validate",
      body: input,
      requestSchema: IModelSchema,
      responseType: "empty",
      options,
    });
  }
}

export class BankAccountOpeningBalanceService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /BankAccountOpeningBalance/Save` [POST-BankAccountOpeningBalance-Save] — Saves the specified Bank Account Opening Balance. */
  public async save(
    input: z.infer<typeof BankAccountOpeningBalanceSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof BankAccountOpeningBalanceSchema>> {
    return this.executor.request({
      resource: "BankAccountOpeningBalance",
      operation: "Save",
      method: "POST",
      path: "/BankAccountOpeningBalance/Save",
      body: input,
      requestSchema: BankAccountOpeningBalanceSchema,
      responseSchema: BankAccountOpeningBalanceSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /BankAccountOpeningBalance/Get` [GET-BankAccountOpeningBalance-Get] — Gets a list of Bank Account Opening Balances. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof BankAccountOpeningBalanceSchema>>> {
    return this.executor.request({
      resource: "BankAccountOpeningBalance",
      operation: "Get",
      method: "GET",
      path: "/BankAccountOpeningBalance/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(BankAccountOpeningBalanceSchema),
      options,
    });
  }

  /** Async page iterator for `GET /BankAccountOpeningBalance/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof BankAccountOpeningBalanceSchema>>,
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

  /** Async item iterator for `GET /BankAccountOpeningBalance/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof BankAccountOpeningBalanceSchema>, void, undefined> {
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

  /** `GET /BankAccountOpeningBalance/Get/{id}` [GET-BankAccountOpeningBalance-Get-id] — Gets the specified Bank Account Opening Balance based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof BankAccountOpeningBalanceSchema>> {
    return this.executor.request({
      resource: "BankAccountOpeningBalance",
      operation: "GetById",
      method: "GET",
      path: `/BankAccountOpeningBalance/Get/${encodeURIComponent(String(id))}`,
      responseSchema: BankAccountOpeningBalanceSchema,
      options,
    });
  }

  /** `GET /BankAccountOpeningBalance/GetByBankAccountId/{id}` [GET-BankAccountOpeningBalance-GetByBankAccountId-id] — Gets the specified Bank Account Opening Balance based on the BankAccountId. */
  public async getByBankAccountId(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof BankAccountOpeningBalanceSchema>> {
    return this.executor.request({
      resource: "BankAccountOpeningBalance",
      operation: "GetByBankAccountId",
      method: "GET",
      path: `/BankAccountOpeningBalance/GetByBankAccountId/${encodeURIComponent(String(id))}`,
      responseSchema: BankAccountOpeningBalanceSchema,
      options,
    });
  }
}

export class BankAccountTransactionListingService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /BankAccountTransactionListing/GetBankAccountTransactionListingReportingDetail` [POST-BankAccountTransactionListing-GetBankAccountTransactionListingReportingDetail] — Gets the Bank Account Transaction Listing. */
  public async getBankAccountTransactionListingReportingDetail(
    input: z.infer<typeof BankAccountTransactionListingRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof BankAccountTransactionListingSchema>>> {
    return this.executor.request({
      resource: "BankAccountTransactionListing",
      operation: "GetBankAccountTransactionListingReportingDetail",
      method: "POST",
      path: "/BankAccountTransactionListing/GetBankAccountTransactionListingReportingDetail",
      body: input,
      requestSchema: BankAccountTransactionListingRequestModelSchema,
      responseSchema: z.array(BankAccountTransactionListingSchema),
      options,
    });
  }
}

export class BankImportMappingService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `DELETE /BankImportMapping/Delete/{id}` [DELETE-BankImportMapping-Delete-id] — Deletes the specified Bank Import Mapping. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "BankImportMapping",
      operation: "Delete",
      method: "DELETE",
      path: `/BankImportMapping/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /BankImportMapping/Get` [GET-BankImportMapping-Get] — Gets a list of Bank Import Mappings. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof BankImportMappingSchema>>> {
    return this.executor.request({
      resource: "BankImportMapping",
      operation: "Get",
      method: "GET",
      path: "/BankImportMapping/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(BankImportMappingSchema),
      options,
    });
  }

  /** Async page iterator for `GET /BankImportMapping/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof BankImportMappingSchema>>,
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

  /** Async item iterator for `GET /BankImportMapping/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof BankImportMappingSchema>, void, undefined> {
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

  /** `GET /BankImportMapping/Get/{id}` [GET-BankImportMapping-Get-id] — Gets the specified Bank Import Mapping based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof BankImportMappingSchema>> {
    return this.executor.request({
      resource: "BankImportMapping",
      operation: "GetById",
      method: "GET",
      path: `/BankImportMapping/Get/${encodeURIComponent(String(id))}`,
      responseSchema: BankImportMappingSchema,
      options,
    });
  }

  /** `POST /BankImportMapping/Save` [POST-BankImportMapping-Save] — Saves the specified Bank Import Mapping. */
  public async save(
    input: z.infer<typeof BankImportMappingSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof BankImportMappingSchema>> {
    return this.executor.request({
      resource: "BankImportMapping",
      operation: "Save",
      method: "POST",
      path: "/BankImportMapping/Save",
      body: input,
      requestSchema: BankImportMappingSchema,
      responseSchema: BankImportMappingSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /BankImportMapping/SaveBatch` [POST-BankImportMapping-SaveBatch] — Saves the batch of Bank Import Mappings. */
  public async saveBatch(
    input: readonly z.infer<typeof BankImportMappingSchema>[],
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof BankImportMappingSchema>>> {
    return this.executor.request({
      resource: "BankImportMapping",
      operation: "SaveBatch",
      method: "POST",
      path: "/BankImportMapping/SaveBatch",
      body: input,
      requestSchema: z.array(BankImportMappingSchema),
      responseSchema: z.array(BankImportMappingSchema),
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /BankImportMapping/DeleteBatch` [POST-BankImportMapping-DeleteBatch] — Delete the batch of Bank Import Mappings. */
  public async deleteBatch(
    input: readonly (number | string | Record<string, unknown>)[],
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "BankImportMapping",
      operation: "DeleteBatch",
      method: "POST",
      path: "/BankImportMapping/DeleteBatch",
      body: input,
      requestSchema: z.array(z.union([z.number(), z.string(), z.record(z.string(), z.unknown())])),
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /BankImportMapping/GetSettings` [GET-BankImportMapping-GetSettings] — Retrieves settings for Bank Import Mappings. */
  public async getSettings(
    options?: RequestOptions,
  ): Promise<z.infer<typeof BankImportMappingSettingsSchema>> {
    return this.executor.request({
      resource: "BankImportMapping",
      operation: "GetSettings",
      method: "GET",
      path: "/BankImportMapping/GetSettings",
      responseSchema: BankImportMappingSettingsSchema,
      options,
    });
  }

  /** `POST /BankImportMapping/SaveSettings` [POST-BankImportMapping-SaveSettings] — Saves settings for Bank Import Mappings. */
  public async saveSettings(
    input: z.infer<typeof BankImportMappingSettingsSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "BankImportMapping",
      operation: "SaveSettings",
      method: "POST",
      path: "/BankImportMapping/SaveSettings",
      body: input,
      requestSchema: BankImportMappingSettingsSchema,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class BankStatementTransactionService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /BankStatementTransaction/Get` [GET-BankStatementTransaction-Get] — Retrieves a collection of Bank Statement Transactions. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof BankStatementTransactionSchema>>> {
    return this.executor.request({
      resource: "BankStatementTransaction",
      operation: "Get",
      method: "GET",
      path: "/BankStatementTransaction/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(BankStatementTransactionSchema),
      options,
    });
  }

  /** Async page iterator for `GET /BankStatementTransaction/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof BankStatementTransactionSchema>>,
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

  /** Async item iterator for `GET /BankStatementTransaction/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof BankStatementTransactionSchema>, void, undefined> {
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

export class BankTransactionService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /BankTransaction/Get` [GET-BankTransaction-Get] — Gets a list of Bank Transactions. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof BaseBankTransactionSchema>>> {
    return this.executor.request({
      resource: "BankTransaction",
      operation: "Get",
      method: "GET",
      path: "/BankTransaction/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(BaseBankTransactionSchema),
      options,
    });
  }

  /** Async page iterator for `GET /BankTransaction/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof BaseBankTransactionSchema>>,
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

  /** Async item iterator for `GET /BankTransaction/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof BaseBankTransactionSchema>, void, undefined> {
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

  /** `GET /BankTransaction/Get/{id}` [GET-BankTransaction-Get-id] — Gets the specified Bank Transaction based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof BaseBankTransactionSchema>> {
    return this.executor.request({
      resource: "BankTransaction",
      operation: "GetById",
      method: "GET",
      path: `/BankTransaction/Get/${encodeURIComponent(String(id))}`,
      responseSchema: BaseBankTransactionSchema,
      options,
    });
  }

  /** `POST /BankTransaction/ProcessBankStatementsAsUnacceptedTransactions` [POST-BankTransaction-ProcessBankStatementsAsUnacceptedTransactions] — Process Bank Statements As Unaccepted Transactions */
  public async processBankStatementsAsUnacceptedTransactions(
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "BankTransaction",
      operation: "ProcessBankStatementsAsUnacceptedTransactions",
      method: "POST",
      path: "/BankTransaction/ProcessBankStatementsAsUnacceptedTransactions",
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /BankTransaction/Delete/{id}` [DELETE-BankTransaction-Delete-id] — Deletes the specified Bank Transaction based on the identifier. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "BankTransaction",
      operation: "Delete",
      method: "DELETE",
      path: `/BankTransaction/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /BankTransaction/DeleteBatch` [POST-BankTransaction-DeleteBatch] — Deletes the batch of Bank Transactions. */
  public async deleteBatch(
    input: readonly (number | string | Record<string, unknown>)[],
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "BankTransaction",
      operation: "DeleteBatch",
      method: "POST",
      path: "/BankTransaction/DeleteBatch",
      body: input,
      requestSchema: z.array(z.union([z.number(), z.string(), z.record(z.string(), z.unknown())])),
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /BankTransaction/SaveBatch` [POST-BankTransaction-SaveBatch] — Saves the list of Bank Transactions. */
  public async saveBatch(
    input: readonly z.infer<typeof BaseBankTransactionSchema>[],
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof BaseBankTransactionSchema>>> {
    return this.executor.request({
      resource: "BankTransaction",
      operation: "SaveBatch",
      method: "POST",
      path: "/BankTransaction/SaveBatch",
      body: input,
      requestSchema: z.array(BaseBankTransactionSchema),
      responseSchema: z.array(BaseBankTransactionSchema),
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /BankTransaction/Save` [POST-BankTransaction-Save] — Saves the specified Bank Transaction. */
  public async save(
    input: z.infer<typeof BaseBankTransactionSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof BaseBankTransactionSchema>> {
    return this.executor.request({
      resource: "BankTransaction",
      operation: "Save",
      method: "POST",
      path: "/BankTransaction/Save",
      body: input,
      requestSchema: BaseBankTransactionSchema,
      responseSchema: BaseBankTransactionSchema,
      isFinancialMutation: true,
      options,
    });
  }
}

export class BankTransactionAttachmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /BankTransactionAttachment/Save` [POST-BankTransactionAttachment-Save] — Saves the Attachment. The file data is transmitted as a multipart/form-data POST. In the query string of the Url or a parameter in the form post, a BankTransactionId is required. A BankTransactionId is the ID of the BankTransaction that this attachment must be linked to. This is Required and is not optional. */
  public async save(
    upload: {
      readonly BankTransactionId: number | string;
      readonly file: Blob | Uint8Array | string;
      readonly fileName?: string | undefined;
      readonly fieldName?: string | undefined;
    },
    options?: RequestOptions,
  ): Promise<unknown> {
    const formData = new FormData();
    formData.set("BankTransactionId", String(upload.BankTransactionId));
    const blob =
      upload.file instanceof Blob
        ? upload.file
        : new Blob([typeof upload.file === "string" ? upload.file : new Uint8Array(upload.file)]);
    formData.set(upload.fieldName ?? "file", blob, upload.fileName ?? "attachment.bin");
    return this.executor.request({
      resource: "BankTransactionAttachment",
      operation: "Save",
      method: "POST",
      path: "/BankTransactionAttachment/Save",
      query: buildQueryWithOData({ BankTransactionId: upload.BankTransactionId }, options?.odata),
      formData,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /BankTransactionAttachment/Get/{id}` [GET-BankTransactionAttachment-Get-id] — Gets the specified Attachment based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AttachmentSchema>>> {
    return this.executor.request({
      resource: "BankTransactionAttachment",
      operation: "GetById",
      method: "GET",
      path: `/BankTransactionAttachment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(AttachmentSchema),
      options,
    });
  }

  /** `GET /BankTransactionAttachment/Download/{id}` [GET-BankTransactionAttachment-Download-id] — Downloads the specified Attachment based on file identifier (Guid). */
  public async download(id: string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "BankTransactionAttachment",
      operation: "Download",
      method: "GET",
      path: `/BankTransactionAttachment/Download/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }

  /** `GET /BankTransactionAttachment/GetCompanyStorageInformation` [GET-BankTransactionAttachment-GetCompanyStorageInformation] — Gets the Company Storage Information. */
  public async getCompanyStorageInformation(
    options?: RequestOptions,
  ): Promise<z.infer<typeof StorageInformationSchema>> {
    return this.executor.request({
      resource: "BankTransactionAttachment",
      operation: "GetCompanyStorageInformation",
      method: "GET",
      path: "/BankTransactionAttachment/GetCompanyStorageInformation",
      responseSchema: StorageInformationSchema,
      options,
    });
  }

  /** `DELETE /BankTransactionAttachment/Delete/{id}` [DELETE-BankTransactionAttachment-Delete-id] — Deletes the specified Attachment based on file identifier (Guid). */
  public async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "BankTransactionAttachment",
      operation: "Delete",
      method: "DELETE",
      path: `/BankTransactionAttachment/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /BankTransactionAttachment/DeleteAll/{id}` [DELETE-BankTransactionAttachment-DeleteAll-id] — Deletes all Attachments based on the identifier. */
  public async deleteAll(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "BankTransactionAttachment",
      operation: "DeleteAll",
      method: "DELETE",
      path: `/BankTransactionAttachment/DeleteAll/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /BankTransactionAttachment/Validate` [POST-BankTransactionAttachment-Validate] — Validates the specified Entity. */
  public async validate(
    input: z.infer<typeof IBigModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "BankTransactionAttachment",
      operation: "Validate",
      method: "POST",
      path: "/BankTransactionAttachment/Validate",
      body: input,
      requestSchema: IBigModelSchema,
      responseType: "empty",
      options,
    });
  }
}

export class ProcessBankAndCreditCardMappingService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `DELETE /ProcessBankAndCreditCardMapping/Delete/{id}` [DELETE-ProcessBankAndCreditCardMapping-Delete-id] — Deletes a specified Process Bank and Credit Card Mapping. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "ProcessBankAndCreditCardMapping",
      operation: "Delete",
      method: "DELETE",
      path: `/ProcessBankAndCreditCardMapping/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /ProcessBankAndCreditCardMapping/Get` [GET-ProcessBankAndCreditCardMapping-Get] — Retrieves a collection of Process Bank and Credit Card Mappings. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof ProcessBankAndCreditCardMappingSchema>>> {
    return this.executor.request({
      resource: "ProcessBankAndCreditCardMapping",
      operation: "Get",
      method: "GET",
      path: "/ProcessBankAndCreditCardMapping/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(ProcessBankAndCreditCardMappingSchema),
      options,
    });
  }

  /** Async page iterator for `GET /ProcessBankAndCreditCardMapping/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof ProcessBankAndCreditCardMappingSchema>>,
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

  /** Async item iterator for `GET /ProcessBankAndCreditCardMapping/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof ProcessBankAndCreditCardMappingSchema>, void, undefined> {
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

  /** `GET /ProcessBankAndCreditCardMapping/Get/{id}` [GET-ProcessBankAndCreditCardMapping-Get-id] — Retrieves a specific Process Bank and Credit Card Mapping. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof ProcessBankAndCreditCardMappingSchema>> {
    return this.executor.request({
      resource: "ProcessBankAndCreditCardMapping",
      operation: "GetById",
      method: "GET",
      path: `/ProcessBankAndCreditCardMapping/Get/${encodeURIComponent(String(id))}`,
      responseSchema: ProcessBankAndCreditCardMappingSchema,
      options,
    });
  }

  /** `POST /ProcessBankAndCreditCardMapping/Save` [POST-ProcessBankAndCreditCardMapping-Save] — Saves a specified Process Bank and Credit Card Mapping. */
  public async save(
    input: z.infer<typeof ProcessBankAndCreditCardMappingSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof ProcessBankAndCreditCardMappingSchema>> {
    return this.executor.request({
      resource: "ProcessBankAndCreditCardMapping",
      operation: "Save",
      method: "POST",
      path: "/ProcessBankAndCreditCardMapping/Save",
      body: input,
      requestSchema: ProcessBankAndCreditCardMappingSchema,
      responseSchema: ProcessBankAndCreditCardMappingSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /ProcessBankAndCreditCardMapping/SaveBatch` [POST-ProcessBankAndCreditCardMapping-SaveBatch] — Saves a collection of Process Bank and Credit Card Mappings. */
  public async saveBatch(
    input: readonly z.infer<typeof ProcessBankAndCreditCardMappingSchema>[],
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof ProcessBankAndCreditCardMappingSchema>>> {
    return this.executor.request({
      resource: "ProcessBankAndCreditCardMapping",
      operation: "SaveBatch",
      method: "POST",
      path: "/ProcessBankAndCreditCardMapping/SaveBatch",
      body: input,
      requestSchema: z.array(ProcessBankAndCreditCardMappingSchema),
      responseSchema: z.array(ProcessBankAndCreditCardMappingSchema),
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /ProcessBankAndCreditCardMapping/DeleteBatch` [POST-ProcessBankAndCreditCardMapping-DeleteBatch] — Deletes a collection of Process Bank and Credit Card Mappings. */
  public async deleteBatch(
    input: readonly (number | string | Record<string, unknown>)[],
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "ProcessBankAndCreditCardMapping",
      operation: "DeleteBatch",
      method: "POST",
      path: "/ProcessBankAndCreditCardMapping/DeleteBatch",
      body: input,
      requestSchema: z.array(z.union([z.number(), z.string(), z.record(z.string(), z.unknown())])),
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /ProcessBankAndCreditCardMapping/GetSettings` [GET-ProcessBankAndCreditCardMapping-GetSettings] — Retrieves settings for Process Bank and Credit Card Mappings. */
  public async getSettings(
    options?: RequestOptions,
  ): Promise<z.infer<typeof ProcessBankAndCreditCardMappingSettingsSchema>> {
    return this.executor.request({
      resource: "ProcessBankAndCreditCardMapping",
      operation: "GetSettings",
      method: "GET",
      path: "/ProcessBankAndCreditCardMapping/GetSettings",
      responseSchema: ProcessBankAndCreditCardMappingSettingsSchema,
      options,
    });
  }

  /** `POST /ProcessBankAndCreditCardMapping/SaveSettings` [POST-ProcessBankAndCreditCardMapping-SaveSettings] — Saves settings for Process Bank and Credit Card Mappings. */
  public async saveSettings(
    input: z.infer<typeof ProcessBankAndCreditCardMappingSettingsSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "ProcessBankAndCreditCardMapping",
      operation: "SaveSettings",
      method: "POST",
      path: "/ProcessBankAndCreditCardMapping/SaveSettings",
      body: input,
      requestSchema: ProcessBankAndCreditCardMappingSettingsSchema,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class CashMovementService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /CashMovement/Get` [POST-CashMovement-Get] — Gets the specified Cash Movement. */
  public async get(
    input: z.infer<typeof CashMovementRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof CashMovementSchema>>> {
    return this.executor.request({
      resource: "CashMovement",
      operation: "Get",
      method: "POST",
      path: "/CashMovement/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: CashMovementRequestModelSchema,
      responseSchema: createSagePageSchema(CashMovementSchema),
      options,
    });
  }
}

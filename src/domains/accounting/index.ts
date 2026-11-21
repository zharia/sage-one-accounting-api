/**
 * Accounting domain services and wire schemas (M004):
 * - Account (9 operations)
 * - AccountCategory (2 operations)
 * - AccountBalance (3 operations)
 * - AccountOpeningBalance (4 operations)
 * - AccountNote (4 operations)
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

export const AccountCategorySchema = z
  .object({
    ID: z.number().int(),
    Description: z.string().optional(),
    Comment: z.string().optional(),
    Order: z.number().int().optional(),
    Modified: z.string().nullable().optional(),
    Created: z.string().nullable().optional(),
  })
  .passthrough();

export type AccountCategory = z.infer<typeof AccountCategorySchema>;

export const AccountCategoryPageSchema = createSagePageSchema(AccountCategorySchema);

export const AccountSchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string().optional(),
    Category: AccountCategorySchema.optional(),
    Active: z.boolean().optional(),
    Balance: z.number().optional(),
    Description: z.string().optional(),
    ReportingGroupId: z.number().int().nullable().optional(),
    UnallocatedAccount: z.boolean().optional(),
    IsTaxLocked: z.boolean().optional(),
    Modified: z.string().nullable().optional(),
    Created: z.string().optional(),
    AccountType: z.number().int().optional(),
    HasActivity: z.boolean().optional(),
    DefaultTaxTypeId: z.number().int().nullable().optional(),
    DefaultTaxType: TaxTypeSchema.nullable().optional(),
  })
  .passthrough();

export type Account = z.infer<typeof AccountSchema>;

export const AccountSaveRequestSchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string(),
    Category: AccountCategorySchema.optional(),
    Active: z.boolean().optional(),
    Balance: z.number().optional(),
    Description: z.string().optional(),
    ReportingGroupId: z.number().int().nullable().optional(),
    UnallocatedAccount: z.boolean().optional(),
    IsTaxLocked: z.boolean().optional(),
    Modified: z.string().nullable().optional(),
    Created: z.string().optional(),
    AccountType: z.number().int().optional(),
    HasActivity: z.boolean().optional(),
    DefaultTaxTypeId: z.number().int().nullable().optional(),
    DefaultTaxType: TaxTypeSchema.nullable().optional(),
  })
  .strict();

export type AccountSaveRequest = z.infer<typeof AccountSaveRequestSchema>;

export const AccountPageSchema = createSagePageSchema(AccountSchema);

export const DateRangeRequestSchema = z
  .object({
    FromDate: z.string(),
    ToDate: z.string(),
  })
  .strict();

export type DateRangeRequest = z.infer<typeof DateRangeRequestSchema>;

export const BudgetItemPeriodSchema = z
  .object({
    ID: z.number().int().optional(),
    Date: z.string().optional(),
    Total: z.number().optional(),
  })
  .passthrough();

export type BudgetItemPeriod = z.infer<typeof BudgetItemPeriodSchema>;

export const AccountBalanceSchema = z
  .object({
    ID: z.number().int().optional(),
    Type: z.number().int().optional(),
    Date: z.string().optional(),
    Description: z.string().optional(),
    CategoryId: z.number().int().optional(),
    CategoryDescription: z.string().optional(),
    AnalysisCategoryId: z.number().int().nullable().optional(),
    AnalysisCategoryDescription: z.string().optional(),
    Debit: z.number().optional(),
    Credit: z.number().optional(),
    Total: z.number().optional(),
    BudgetItemPeriods: z.array(BudgetItemPeriodSchema).optional(),
  })
  .passthrough();

export type AccountBalance = z.infer<typeof AccountBalanceSchema>;

export const AccountBalancePageSchema = createSagePageSchema(AccountBalanceSchema);

export const BudgetAccountBalanceSchema = z
  .object({
    ID: z.number().int().optional(),
    AccountBalances: z.array(AccountBalanceSchema).optional(),
  })
  .passthrough();

export type BudgetAccountBalance = z.infer<typeof BudgetAccountBalanceSchema>;

export const BudgetAccountBalancePageSchema = createSagePageSchema(BudgetAccountBalanceSchema);

export const AccountOpeningBalanceSchema = z
  .object({
    ID: z.number().int().optional(),
    AccountId: z.number().int(),
    Balance: z.number(),
    Reason: z.string().optional(),
    Date: z.string(),
  })
  .passthrough();

export type AccountOpeningBalance = z.infer<typeof AccountOpeningBalanceSchema>;

export const AccountOpeningBalanceSaveRequestSchema = z
  .object({
    ID: z.number().int().optional(),
    AccountId: z.number().int(),
    Balance: z.number(),
    Reason: z.string().optional(),
    Date: z.string(),
  })
  .strict();

export type AccountOpeningBalanceSaveRequest = z.infer<
  typeof AccountOpeningBalanceSaveRequestSchema
>;

export const AccountOpeningBalancePageSchema = createSagePageSchema(AccountOpeningBalanceSchema);

export const AccountNoteSchema = z
  .object({
    ID: z.number().int().optional(),
    AccountId: z.number().int().optional(),
    UserId: z.number().int().nullable().optional(),
    Subject: z.string(),
    EntryDate: z.string().nullable().optional(),
    ActionDate: z.string(),
    Status: z.boolean().nullable().optional(),
    Note: z.string().optional(),
    HasAttachments: z.boolean().nullable().optional(),
  })
  .passthrough();

export type AccountNote = z.infer<typeof AccountNoteSchema>;

export const AccountNoteSaveRequestSchema = z
  .object({
    ID: z.number().int().optional(),
    AccountId: z.number().int().optional(),
    UserId: z.number().int().nullable().optional(),
    Subject: z.string(),
    EntryDate: z.string().nullable().optional(),
    ActionDate: z.string(),
    Status: z.boolean().nullable().optional(),
    Note: z.string().optional(),
    HasAttachments: z.boolean().nullable().optional(),
  })
  .strict();

export type AccountNoteSaveRequest = z.infer<typeof AccountNoteSaveRequestSchema>;

export const AccountNotePageSchema = createSagePageSchema(AccountNoteSchema);

export class AccountsService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /Account/Get` — Gets a list of Accounts. Supports OData and paging. */
  public async list(options?: RequestOptions): Promise<SagePage<Account>> {
    return this.executor.request({
      resource: "Account",
      operation: "Get",
      method: "GET",
      path: "/Account/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: AccountPageSchema,
      options,
    });
  }

  /** Async page iterator for `GET /Account/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<Account>, void, undefined> {
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

  /** Async item iterator for `GET /Account/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<Account, void, undefined> {
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

  /** `GET /Account/Get/{id}` — Gets the specified Account based on the identifier. */
  public async get(id: number, options?: RequestOptions): Promise<Account> {
    return this.executor.request({
      resource: "Account",
      operation: "GetById",
      method: "GET",
      path: `/Account/Get/${encodeURIComponent(String(id))}`,
      responseSchema: AccountSchema,
      options,
    });
  }

  /** `GET /Account/GetPayrollTypeOfAccounts` — Gets a list of Expense, Current Liability and Cost of Sale Accounts. */
  public async getPayrollTypeOfAccounts(options?: RequestOptions): Promise<SagePage<Account>> {
    return this.executor.request({
      resource: "Account",
      operation: "GetPayrollTypeOfAccounts",
      method: "GET",
      path: "/Account/GetPayrollTypeOfAccounts",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: AccountPageSchema,
      options,
    });
  }

  /** `GET /Account/GetServiceAccounts` — Gets a list of Cost of Sales and Expenses Accounts. */
  public async getServiceAccounts(options?: RequestOptions): Promise<SagePage<Account>> {
    return this.executor.request({
      resource: "Account",
      operation: "GetServiceAccounts",
      method: "GET",
      path: "/Account/GetServiceAccounts",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: AccountPageSchema,
      options,
    });
  }

  /** `GET /Account/GetWithSystemAccounts` — Gets the list of Accounts including system accounts. */
  public async getWithSystemAccounts(options?: RequestOptions): Promise<SagePage<Account>> {
    return this.executor.request({
      resource: "Account",
      operation: "GetWithSystemAccounts",
      method: "GET",
      path: "/Account/GetWithSystemAccounts",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: AccountPageSchema,
      options,
    });
  }

  /** `GET /Account/GetAccountsByCategoryId/{id}` — Gets a list of Accounts based on the Category identifier. */
  public async getAccountsByCategoryId(
    categoryId: number,
    options?: RequestOptions,
  ): Promise<SagePage<Account>> {
    return this.executor.request({
      resource: "Account",
      operation: "GetAccountsByCategoryId",
      method: "GET",
      path: `/Account/GetAccountsByCategoryId/${encodeURIComponent(String(categoryId))}`,
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: AccountPageSchema,
      options,
    });
  }

  /** `GET /Account/GetChartofAccounts` — Get a list of all accounts. */
  public async getChartOfAccounts(options?: RequestOptions): Promise<SagePage<Account>> {
    return this.executor.request({
      resource: "Account",
      operation: "GetChartofAccounts",
      method: "GET",
      path: "/Account/GetChartofAccounts",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: AccountPageSchema,
      options,
    });
  }

  /** `POST /Account/Save` — Saves the specified Account. */
  public async save(input: AccountSaveRequest, options?: RequestOptions): Promise<Account> {
    return this.executor.request({
      resource: "Account",
      operation: "Save",
      method: "POST",
      path: "/Account/Save",
      body: input,
      requestSchema: AccountSaveRequestSchema,
      responseSchema: AccountSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /Account/Delete/{id}` — Deletes the specified Account. Only succeeds if the Account is not in use. */
  public async delete(id: number, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "Account",
      operation: "Delete",
      method: "DELETE",
      path: `/Account/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class AccountCategoriesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /AccountCategory/Get` — Gets a list of Account Categories. */
  public async list(options?: RequestOptions): Promise<SagePage<AccountCategory>> {
    return this.executor.request({
      resource: "AccountCategory",
      operation: "Get",
      method: "GET",
      path: "/AccountCategory/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: AccountCategoryPageSchema,
      options,
    });
  }

  /** `GET /AccountCategory/Get/{id}` — Gets the specified Account Category based on the identifier. */
  public async get(id: number, options?: RequestOptions): Promise<AccountCategory> {
    return this.executor.request({
      resource: "AccountCategory",
      operation: "GetById",
      method: "GET",
      path: `/AccountCategory/Get/${encodeURIComponent(String(id))}`,
      responseSchema: AccountCategorySchema,
      options,
    });
  }
}

export class AccountBalancesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /AccountBalance/Get` — Retrieves Account Balances for the specified date range. */
  public async get(
    input: DateRangeRequest,
    options?: RequestOptions,
  ): Promise<SagePage<AccountBalance>> {
    return this.executor.request({
      resource: "AccountBalance",
      operation: "Get",
      method: "POST",
      path: "/AccountBalance/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: DateRangeRequestSchema,
      responseSchema: AccountBalancePageSchema,
      options,
    });
  }

  /** `GET /AccountBalance/GetAccountBudgetsById?budgetId={budgetId}` — Retrieves Account Budgets for a specific budget ID. */
  public async getAccountBudgetsById(
    budgetId: number,
    options?: RequestOptions,
  ): Promise<SagePage<AccountBalance>> {
    return this.executor.request({
      resource: "AccountBalance",
      operation: "GetAccountBudgetsById",
      method: "GET",
      path: "/AccountBalance/GetAccountBudgetsById",
      query: buildQueryWithOData({ budgetId }, options?.odata),
      responseSchema: AccountBalancePageSchema,
      options,
    });
  }

  /** `GET /AccountBalance/GetAccountBudgets` — Retrieves Budget Account Balances. */
  public async getAccountBudgets(
    options?: RequestOptions,
  ): Promise<SagePage<BudgetAccountBalance>> {
    return this.executor.request({
      resource: "AccountBalance",
      operation: "GetAccountBudgets",
      method: "GET",
      path: "/AccountBalance/GetAccountBudgets",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: BudgetAccountBalancePageSchema,
      options,
    });
  }
}

export class AccountOpeningBalancesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /AccountOpeningBalance/Get` — Gets a list of Account Opening Balances. */
  public async list(options?: RequestOptions): Promise<SagePage<AccountOpeningBalance>> {
    return this.executor.request({
      resource: "AccountOpeningBalance",
      operation: "Get",
      method: "GET",
      path: "/AccountOpeningBalance/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: AccountOpeningBalancePageSchema,
      options,
    });
  }

  /** `GET /AccountOpeningBalance/Get/{id}` — Gets the specified Account Opening Balance based on the identifier. */
  public async get(id: number, options?: RequestOptions): Promise<AccountOpeningBalance> {
    return this.executor.request({
      resource: "AccountOpeningBalance",
      operation: "GetById",
      method: "GET",
      path: `/AccountOpeningBalance/Get/${encodeURIComponent(String(id))}`,
      responseSchema: AccountOpeningBalanceSchema,
      options,
    });
  }

  /** `GET /AccountOpeningBalance/GetByAccountId/{id}` — Gets the specified Account Opening Balance based on the AccountId. */
  public async getByAccountId(
    accountId: number,
    options?: RequestOptions,
  ): Promise<AccountOpeningBalance> {
    return this.executor.request({
      resource: "AccountOpeningBalance",
      operation: "GetByAccountId",
      method: "GET",
      path: `/AccountOpeningBalance/GetByAccountId/${encodeURIComponent(String(accountId))}`,
      responseSchema: AccountOpeningBalanceSchema,
      options,
    });
  }

  /** `POST /AccountOpeningBalance/Save` — Saves the specified Account Opening Balance. */
  public async save(
    input: AccountOpeningBalanceSaveRequest,
    options?: RequestOptions,
  ): Promise<AccountOpeningBalance> {
    return this.executor.request({
      resource: "AccountOpeningBalance",
      operation: "Save",
      method: "POST",
      path: "/AccountOpeningBalance/Save",
      body: input,
      requestSchema: AccountOpeningBalanceSaveRequestSchema,
      responseSchema: AccountOpeningBalanceSchema,
      isFinancialMutation: true,
      options,
    });
  }
}

export class AccountNotesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /AccountNote/Get` — Gets a list of Account Notes. */
  public async list(options?: RequestOptions): Promise<SagePage<AccountNote>> {
    return this.executor.request({
      resource: "AccountNote",
      operation: "Get",
      method: "GET",
      path: "/AccountNote/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: AccountNotePageSchema,
      options,
    });
  }

  /** `GET /AccountNote/Get/{id}` — Gets the specified Account Note based on the identifier. */
  public async get(id: number, options?: RequestOptions): Promise<AccountNote> {
    return this.executor.request({
      resource: "AccountNote",
      operation: "GetById",
      method: "GET",
      path: `/AccountNote/Get/${encodeURIComponent(String(id))}`,
      responseSchema: AccountNoteSchema,
      options,
    });
  }

  /** `POST /AccountNote/Save` — Saves the specified Account Note. */
  public async save(input: AccountNoteSaveRequest, options?: RequestOptions): Promise<AccountNote> {
    return this.executor.request({
      resource: "AccountNote",
      operation: "Save",
      method: "POST",
      path: "/AccountNote/Save",
      body: input,
      requestSchema: AccountNoteSaveRequestSchema,
      responseSchema: AccountNoteSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /AccountNote/Delete/{id}` — Deletes the specified Account Note. */
  public async delete(id: number, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "AccountNote",
      operation: "Delete",
      method: "DELETE",
      path: `/AccountNote/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export * from "./m006.js";

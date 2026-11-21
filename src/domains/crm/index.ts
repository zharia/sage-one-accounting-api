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

export const AccountantEventSchema = z
  .object({
    CompanyId: z.union([z.number().int(), z.string()]).nullable().optional(),
    TotalTasks: z.union([z.number().int(), z.string()]).nullable().optional(),
    TotalNotes: z.union([z.number().int(), z.string()]).nullable().optional(),
    EventDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type AccountantEvent = z.infer<typeof AccountantEventSchema>;

export const AccountantEventRequestModelSchema = z
  .object({
    CompanyId: z.union([z.number().int(), z.string()]).nullable().optional(),
    UserId: z.union([z.number().int(), z.string()]).nullable().optional(),
    FromDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ImpersonateUserId: z.union([z.number().int(), z.string()]).nullable().optional(),
    ActiveConsoleCompanies: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type AccountantEventRequestModel = z.infer<typeof AccountantEventRequestModelSchema>;

export const AccountantNoteSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Subject: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    EntryDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ActionDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Status: z.union([z.number().int(), z.string()]).nullable().optional(),
    Note: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    HasAttachments: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    UserId: z.union([z.number().int(), z.string()]).nullable().optional(),
    CompanyId: z.union([z.number().int(), z.string()]).nullable().optional(),
    ToAccountant: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    StatusText: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CreatedByUserId: z.union([z.number().int(), z.string()]).nullable().optional(),
    CreatedBy: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    LastModified: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CategoryId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Category: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DocumentHeaderId: z.union([z.number().int(), z.string()]).nullable().optional(),
    IsOwner: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type AccountantNote = z.infer<typeof AccountantNoteSchema>;

export const AccountantNoteRequestModelSchema = z
  .object({
    Subject: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    EntryDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ActionDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Status: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Note: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    HasAttachments: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    CompanyId: z.union([z.number().int(), z.string()]).nullable().optional(),
    UserId: z.union([z.number().int(), z.string()]).nullable().optional(),
    CreatedByUserId: z.union([z.number().int(), z.string()]).nullable().optional(),
    CreatedBy: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    LastModified: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CategoryId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Category: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DocumentHeaderId: z.union([z.number().int(), z.string()]).nullable().optional(),
    SendEmailToAccountant: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type AccountantNoteRequestModel = z.infer<typeof AccountantNoteRequestModelSchema>;

export const AccountantTaskSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    AccountantTaskRecurrenceId: z.union([z.number().int(), z.string()]).nullable().optional(),
    CompanyId: z.union([z.number().int(), z.string()]).nullable().optional(),
    CompanyName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    UserId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Name: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Notes: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    StatusType: z.union([z.number().int(), z.string()]).nullable().optional(),
    ReminderType: z.union([z.number().int(), z.string()]).nullable().optional(),
    ReminderDaysBefore: z.union([z.number().int(), z.string()]).nullable().optional(),
    AutomaticallyChangeStatusWhenStart: z
      .union([z.boolean(), z.number().int()])
      .nullable()
      .optional(),
    NotificationDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Notified: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    StartDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    EndDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Duration: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type AccountantTask = z.infer<typeof AccountantTaskSchema>;

export const AccountantTaskDueInDateRangeRequestModelSchema = z
  .object({
    FromDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
  })
  .passthrough();
export type AccountantTaskDueInDateRangeRequestModel = z.infer<
  typeof AccountantTaskDueInDateRangeRequestModelSchema
>;

export const AccountantTaskRecurrenceSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    CompanyId: z.union([z.number().int(), z.string()]).nullable().optional(),
    FrequencyType: z.union([z.number().int(), z.string()]).nullable().optional(),
    FrequencyInterval: z.union([z.number().int(), z.string()]).nullable().optional(),
    FrequencyRelativeInterval: z.union([z.number().int(), z.string()]).nullable().optional(),
    FrequencyRecurrenceFactor: z.union([z.number().int(), z.string()]).nullable().optional(),
    FrequencyYearlyMonth: z.union([z.number().int(), z.string()]).nullable().optional(),
    RecurrenceRangeType: z.union([z.number().int(), z.string()]).nullable().optional(),
    StartDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    EndDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    NumberOfOccurrences: z.union([z.number().int(), z.string()]).nullable().optional(),
    TaskDuration: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type AccountantTaskRecurrence = z.infer<typeof AccountantTaskRecurrenceSchema>;

export const AccountantTaskRequestModelSchema = z
  .object({
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CompanyId: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type AccountantTaskRequestModel = z.infer<typeof AccountantTaskRequestModelSchema>;

export const AccountantTaskUpdateStatusRequestModelSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    StatusType: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type AccountantTaskUpdateStatusRequestModel = z.infer<
  typeof AccountantTaskUpdateStatusRequestModelSchema
>;

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

export const CRMActivitySchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    UserId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Username: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CRMActivityTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Type: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Priority: z.union([z.number().int(), z.string()]).nullable().optional(),
    Category: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CRMActivityCategoryId: z.union([z.number().int(), z.string()]).nullable().optional(),
    CRMPriorityId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Outline: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Body: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ActionDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Reference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    LinkId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Modified: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Created: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CRMActivityNotes: z.array(z.unknown()).nullable().optional(),
  })
  .passthrough();
export type CRMActivity = z.infer<typeof CRMActivitySchema>;

export const CRMActivityCategorySchema = z
  .object({
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Modified: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Created: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
  })
  .passthrough();
export type CRMActivityCategory = z.infer<typeof CRMActivityCategorySchema>;

const IModelSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();

const StorageInformationSchema = z
  .object({
    SizeUsed: z.union([z.number().int(), z.string()]).nullable().optional(),
    MaxSizeAllowed: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();

export const ToDoListItemSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    ToDoListCategory: z.union([z.number().int(), z.string()]).nullable().optional(),
    Name: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DueDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Printed: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Amount: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type ToDoListItem = z.infer<typeof ToDoListItemSchema>;

export class CRMActivityService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /CRMActivity/Save` [POST-CRMActivity-Save] — Saves the specified CRMActivity. */
  public async save(
    input: z.infer<typeof CRMActivitySchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof CRMActivitySchema>> {
    return this.executor.request({
      resource: "CRMActivity",
      operation: "Save",
      method: "POST",
      path: "/CRMActivity/Save",
      body: input,
      requestSchema: CRMActivitySchema,
      responseSchema: CRMActivitySchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /CRMActivity/Get` [GET-CRMActivity-Get] — Gets a list of CRMActivitys. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof CRMActivitySchema>>> {
    return this.executor.request({
      resource: "CRMActivity",
      operation: "Get",
      method: "GET",
      path: "/CRMActivity/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(CRMActivitySchema),
      options,
    });
  }

  /** Async page iterator for `GET /CRMActivity/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof CRMActivitySchema>>, void, undefined> {
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

  /** Async item iterator for `GET /CRMActivity/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof CRMActivitySchema>, void, undefined> {
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

  /** `GET /CRMActivity/Get/{id}` [GET-CRMActivity-Get-id] — Gets the specified CRMActivity based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof CRMActivitySchema>> {
    return this.executor.request({
      resource: "CRMActivity",
      operation: "GetById",
      method: "GET",
      path: `/CRMActivity/Get/${encodeURIComponent(String(id))}`,
      responseSchema: CRMActivitySchema,
      options,
    });
  }

  /** `DELETE /CRMActivity/Delete/{id}` [DELETE-CRMActivity-Delete-id] — Deletes the specified CRMActivity. Only succeeds if the CRMActivity is not in use. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "CRMActivity",
      operation: "Delete",
      method: "DELETE",
      path: `/CRMActivity/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class CRMActivityCategoryService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /CRMActivityCategory/Save` [POST-CRMActivityCategory-Save] — Saves the specified CRMActivity Category. */
  public async save(
    input: z.infer<typeof CRMActivityCategorySchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof CRMActivityCategorySchema>> {
    return this.executor.request({
      resource: "CRMActivityCategory",
      operation: "Save",
      method: "POST",
      path: "/CRMActivityCategory/Save",
      body: input,
      requestSchema: CRMActivityCategorySchema,
      responseSchema: CRMActivityCategorySchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /CRMActivityCategory/Get` [GET-CRMActivityCategory-Get] — Gets a list of CRMActivity Categories. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof CRMActivityCategorySchema>>> {
    return this.executor.request({
      resource: "CRMActivityCategory",
      operation: "Get",
      method: "GET",
      path: "/CRMActivityCategory/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(CRMActivityCategorySchema),
      options,
    });
  }

  /** Async page iterator for `GET /CRMActivityCategory/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof CRMActivityCategorySchema>>,
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

  /** Async item iterator for `GET /CRMActivityCategory/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof CRMActivityCategorySchema>, void, undefined> {
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

  /** `GET /CRMActivityCategory/Get/{id}` [GET-CRMActivityCategory-Get-id] — Gets the specified CRMActivity Category based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof CRMActivityCategorySchema>> {
    return this.executor.request({
      resource: "CRMActivityCategory",
      operation: "GetById",
      method: "GET",
      path: `/CRMActivityCategory/Get/${encodeURIComponent(String(id))}`,
      responseSchema: CRMActivityCategorySchema,
      options,
    });
  }

  /** `DELETE /CRMActivityCategory/Delete/{id}` [DELETE-CRMActivityCategory-Delete-id] — Deletes the specified CRMActivity Category based on the identifier. If the CRMActivity Category is not in use. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "CRMActivityCategory",
      operation: "Delete",
      method: "DELETE",
      path: `/CRMActivityCategory/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class AccountantEventService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /AccountantEvent/GetEventsInDateRange` [POST-AccountantEvent-GetEventsInDateRange] — Gets a list of Accountant Events in the specified date range. */
  public async getEventsInDateRange(
    input: z.infer<typeof AccountantEventRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof AccountantEventSchema>>> {
    return this.executor.request({
      resource: "AccountantEvent",
      operation: "GetEventsInDateRange",
      method: "POST",
      path: "/AccountantEvent/GetEventsInDateRange",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: AccountantEventRequestModelSchema,
      responseSchema: createSagePageSchema(AccountantEventSchema),
      options,
    });
  }
}

export class AccountantNoteService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /AccountantNote/Save` [POST-AccountantNote-Save] — Saves the specified Accountant Note. */
  public async save(
    input: z.infer<typeof AccountantNoteRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AccountantNoteSchema>> {
    return this.executor.request({
      resource: "AccountantNote",
      operation: "Save",
      method: "POST",
      path: "/AccountantNote/Save",
      body: input,
      requestSchema: AccountantNoteRequestModelSchema,
      responseSchema: AccountantNoteSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /AccountantNote/Delete/{id}` [DELETE-AccountantNote-Delete-id] — No documentation available. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "AccountantNote",
      operation: "Delete",
      method: "DELETE",
      path: `/AccountantNote/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /AccountantNote/Get` [GET-AccountantNote-Get] — No documentation available. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof AccountantNoteSchema>>> {
    return this.executor.request({
      resource: "AccountantNote",
      operation: "Get",
      method: "GET",
      path: "/AccountantNote/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(AccountantNoteSchema),
      options,
    });
  }

  /** Async page iterator for `GET /AccountantNote/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof AccountantNoteSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /AccountantNote/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof AccountantNoteSchema>, void, undefined> {
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

  /** `GET /AccountantNote/Get/{id}` [GET-AccountantNote-Get-id] — No documentation available. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AccountantNoteSchema>> {
    return this.executor.request({
      resource: "AccountantNote",
      operation: "GetById",
      method: "GET",
      path: `/AccountantNote/Get/${encodeURIComponent(String(id))}`,
      responseSchema: AccountantNoteSchema,
      options,
    });
  }

  /** `GET /AccountantNote/GetLatest` [GET-AccountantNote-GetLatest_count] — No documentation available. */
  public async getLatest(
    options?: RequestOptions & { readonly count?: number | undefined },
  ): Promise<SagePage<z.infer<typeof AccountantNoteSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.count !== undefined) {
      baseQuery["count"] = options.count;
    }
    return this.executor.request({
      resource: "AccountantNote",
      operation: "GetLatest",
      method: "GET",
      path: "/AccountantNote/GetLatest",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(AccountantNoteSchema),
      options,
    });
  }
}

export class AccountantNoteAttachmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /AccountantNoteAttachment/Save` [POST-AccountantNoteAttachment-Save] — Saves the Attachment. The file data is transmitted as a multipart/form-data POST. In the query string of the Url or a parameter in the form post, a AccountantNoteId is required. An AccountantNoteId is the ID of the AccountantNote that this attachment must be linked to. This is Required and is not optional. */
  public async save(
    upload: {
      readonly AccountantNoteId: number | string;
      readonly file: Blob | Uint8Array | string;
      readonly fileName?: string | undefined;
      readonly fieldName?: string | undefined;
    },
    options?: RequestOptions,
  ): Promise<unknown> {
    const formData = new FormData();
    formData.set("AccountantNoteId", String(upload.AccountantNoteId));
    const blob =
      upload.file instanceof Blob
        ? upload.file
        : new Blob([typeof upload.file === "string" ? upload.file : new Uint8Array(upload.file)]);
    formData.set(upload.fieldName ?? "file", blob, upload.fileName ?? "attachment.bin");
    return this.executor.request({
      resource: "AccountantNoteAttachment",
      operation: "Save",
      method: "POST",
      path: "/AccountantNoteAttachment/Save",
      query: buildQueryWithOData({ AccountantNoteId: upload.AccountantNoteId }, options?.odata),
      formData,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /AccountantNoteAttachment/Get/{id}` [GET-AccountantNoteAttachment-Get-id] — Gets the specified Attachment based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AttachmentSchema>>> {
    return this.executor.request({
      resource: "AccountantNoteAttachment",
      operation: "GetById",
      method: "GET",
      path: `/AccountantNoteAttachment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(AttachmentSchema),
      options,
    });
  }

  /** `GET /AccountantNoteAttachment/Download/{id}` [GET-AccountantNoteAttachment-Download-id] — Downloads the specified Attachment based on file identifier (Guid). */
  public async download(id: string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "AccountantNoteAttachment",
      operation: "Download",
      method: "GET",
      path: `/AccountantNoteAttachment/Download/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }

  /** `GET /AccountantNoteAttachment/GetCompanyStorageInformation` [GET-AccountantNoteAttachment-GetCompanyStorageInformation] — Gets the Company Storage Information. */
  public async getCompanyStorageInformation(
    options?: RequestOptions,
  ): Promise<z.infer<typeof StorageInformationSchema>> {
    return this.executor.request({
      resource: "AccountantNoteAttachment",
      operation: "GetCompanyStorageInformation",
      method: "GET",
      path: "/AccountantNoteAttachment/GetCompanyStorageInformation",
      responseSchema: StorageInformationSchema,
      options,
    });
  }

  /** `DELETE /AccountantNoteAttachment/Delete/{id}` [DELETE-AccountantNoteAttachment-Delete-id] — Deletes the specified Attachment based on file identifier (Guid). */
  public async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "AccountantNoteAttachment",
      operation: "Delete",
      method: "DELETE",
      path: `/AccountantNoteAttachment/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /AccountantNoteAttachment/DeleteAll/{id}` [DELETE-AccountantNoteAttachment-DeleteAll-id] — Deletes all Attachments based on the identifier. */
  public async deleteAll(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "AccountantNoteAttachment",
      operation: "DeleteAll",
      method: "DELETE",
      path: `/AccountantNoteAttachment/DeleteAll/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /AccountantNoteAttachment/Validate` [POST-AccountantNoteAttachment-Validate] — Validates the specified Entity. */
  public async validate(
    input: z.infer<typeof IModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "AccountantNoteAttachment",
      operation: "Validate",
      method: "POST",
      path: "/AccountantNoteAttachment/Validate",
      body: input,
      requestSchema: IModelSchema,
      responseType: "empty",
      options,
    });
  }
}

export class AccountantTaskService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `DELETE /AccountantTask/Delete/{id}` [DELETE-AccountantTask-Delete-id] — Deletes the specified Accountant Task. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "AccountantTask",
      operation: "Delete",
      method: "DELETE",
      path: `/AccountantTask/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /AccountantTask/Get` [GET-AccountantTask-Get] — Gets a list Accountant Tasks. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof AccountantTaskSchema>>> {
    return this.executor.request({
      resource: "AccountantTask",
      operation: "Get",
      method: "GET",
      path: "/AccountantTask/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(AccountantTaskSchema),
      options,
    });
  }

  /** Async page iterator for `GET /AccountantTask/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof AccountantTaskSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /AccountantTask/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof AccountantTaskSchema>, void, undefined> {
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

  /** `GET /AccountantTask/Get/{id}` [GET-AccountantTask-Get-id] — Gets the specified Accountant Task based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AccountantTaskSchema>> {
    return this.executor.request({
      resource: "AccountantTask",
      operation: "GetById",
      method: "GET",
      path: `/AccountantTask/Get/${encodeURIComponent(String(id))}`,
      responseSchema: AccountantTaskSchema,
      options,
    });
  }

  /** `POST /AccountantTask/Save` [POST-AccountantTask-Save] — Saves the specified Accountant Task. */
  public async save(
    input: z.infer<typeof AccountantTaskSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AccountantTaskSchema>> {
    return this.executor.request({
      resource: "AccountantTask",
      operation: "Save",
      method: "POST",
      path: "/AccountantTask/Save",
      body: input,
      requestSchema: AccountantTaskSchema,
      responseSchema: AccountantTaskSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /AccountantTask/GetTasksForSpecificDate` [POST-AccountantTask-GetTasksForSpecificDate] — Gets a list Accountant Tasks for the specified date. */
  public async getTasksForSpecificDate(
    input: z.infer<typeof AccountantTaskRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof AccountantTaskSchema>>> {
    return this.executor.request({
      resource: "AccountantTask",
      operation: "GetTasksForSpecificDate",
      method: "POST",
      path: "/AccountantTask/GetTasksForSpecificDate",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: AccountantTaskRequestModelSchema,
      responseSchema: createSagePageSchema(AccountantTaskSchema),
      options,
    });
  }

  /** `POST /AccountantTask/GetTasksDueSpecificDate` [POST-AccountantTask-GetTasksDueSpecificDate] — Gets a list Accountant Tasks due on the specific date. */
  public async getTasksDueSpecificDate(
    input: z.infer<typeof AccountantTaskRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AccountantTaskSchema>>> {
    return this.executor.request({
      resource: "AccountantTask",
      operation: "GetTasksDueSpecificDate",
      method: "POST",
      path: "/AccountantTask/GetTasksDueSpecificDate",
      body: input,
      requestSchema: AccountantTaskRequestModelSchema,
      responseSchema: z.array(AccountantTaskSchema),
      options,
    });
  }

  /** `POST /AccountantTask/GetTasksDueInDateRange` [POST-AccountantTask-GetTasksDueInDateRange] — Gets a list Accountant Tasks due in the specified date range. */
  public async getTasksDueInDateRange(
    input: z.infer<typeof AccountantTaskDueInDateRangeRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AccountantTaskSchema>>> {
    return this.executor.request({
      resource: "AccountantTask",
      operation: "GetTasksDueInDateRange",
      method: "POST",
      path: "/AccountantTask/GetTasksDueInDateRange",
      body: input,
      requestSchema: AccountantTaskDueInDateRangeRequestModelSchema,
      responseSchema: z.array(AccountantTaskSchema),
      options,
    });
  }

  /** `GET /AccountantTask/GetLatest` [GET-AccountantTask-GetLatest_count] — Gets a specified number of Accountant Tasks. */
  public async getLatest(
    options?: RequestOptions & { readonly count?: number | undefined },
  ): Promise<SagePage<z.infer<typeof AccountantTaskSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.count !== undefined) {
      baseQuery["count"] = options.count;
    }
    return this.executor.request({
      resource: "AccountantTask",
      operation: "GetLatest",
      method: "GET",
      path: "/AccountantTask/GetLatest",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(AccountantTaskSchema),
      options,
    });
  }

  /** `POST /AccountantTask/UpdateTaskStatus` [POST-AccountantTask-UpdateTaskStatus] — Update the status of the Accountant Task. */
  public async updateTaskStatus(
    input: z.infer<typeof AccountantTaskUpdateStatusRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "AccountantTask",
      operation: "UpdateTaskStatus",
      method: "POST",
      path: "/AccountantTask/UpdateTaskStatus",
      body: input,
      requestSchema: AccountantTaskUpdateStatusRequestModelSchema,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class AccountantTaskRecurrenceService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `DELETE /AccountantTaskRecurrence/Delete/{id}` [DELETE-AccountantTaskRecurrence-Delete-id] — Deletes the specified Accountant Task Recurrence. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "AccountantTaskRecurrence",
      operation: "Delete",
      method: "DELETE",
      path: `/AccountantTaskRecurrence/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /AccountantTaskRecurrence/Get` [GET-AccountantTaskRecurrence-Get] — Gets a list Accountant Tasks Recurrences. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof AccountantTaskRecurrenceSchema>>> {
    return this.executor.request({
      resource: "AccountantTaskRecurrence",
      operation: "Get",
      method: "GET",
      path: "/AccountantTaskRecurrence/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(AccountantTaskRecurrenceSchema),
      options,
    });
  }

  /** Async page iterator for `GET /AccountantTaskRecurrence/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof AccountantTaskRecurrenceSchema>>,
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

  /** Async item iterator for `GET /AccountantTaskRecurrence/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof AccountantTaskRecurrenceSchema>, void, undefined> {
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

  /** `GET /AccountantTaskRecurrence/Get/{id}` [GET-AccountantTaskRecurrence-Get-id] — Gets the specified Accountant Task Recurrence based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AccountantTaskRecurrenceSchema>> {
    return this.executor.request({
      resource: "AccountantTaskRecurrence",
      operation: "GetById",
      method: "GET",
      path: `/AccountantTaskRecurrence/Get/${encodeURIComponent(String(id))}`,
      responseSchema: AccountantTaskRecurrenceSchema,
      options,
    });
  }
}

export class ToDoListService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /ToDoList/Get` [GET-ToDoList-Get] — Gets a list of To Do list items. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof ToDoListItemSchema>>> {
    return this.executor.request({
      resource: "ToDoList",
      operation: "Get",
      method: "GET",
      path: "/ToDoList/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(ToDoListItemSchema),
      options,
    });
  }

  /** Async page iterator for `GET /ToDoList/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof ToDoListItemSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /ToDoList/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof ToDoListItemSchema>, void, undefined> {
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

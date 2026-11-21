/**
 * Inventory domain services and wire schemas (M004):
 * - Item (4 operations)
 * - ItemCategory (4 operations)
 * - ItemOpeningBalance (4 operations)
 * - ItemNote (4 operations)
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
import { AccountCategorySchema, AccountSchema } from "../accounting/index.js";
import { buildQueryWithOData, type SageRequestExecutor } from "../executor.js";
import { TaxTypeSchema } from "../taxation/index.js";

export const ItemCategorySchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string().optional(),
    Modified: z.string().nullable().optional(),
    Created: z.string().nullable().optional(),
  })
  .passthrough();

export type ItemCategory = z.infer<typeof ItemCategorySchema>;

export const ItemCategorySaveRequestSchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string(),
    Modified: z.string().nullable().optional(),
    Created: z.string().nullable().optional(),
  })
  .strict();

export type ItemCategorySaveRequest = z.infer<typeof ItemCategorySaveRequestSchema>;

export const ItemCategoryPageSchema = createSagePageSchema(ItemCategorySchema);

export const ItemReportGroupRefSchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string().optional(),
    ItemReportingGroupTypeId: z.number().int().optional(),
    ItemReportingGroupType: z.string().optional(),
    ReportingGroupId: z.number().int().nullable().optional(),
    AccountCategoryId: z.number().int().nullable().optional(),
    AccountCategory: AccountCategorySchema.nullable().optional(),
  })
  .passthrough();

export type ItemReportGroupRef = z.infer<typeof ItemReportGroupRefSchema>;

export const AdditionalItemPriceRefSchema = z
  .object({
    ID: z.number().int().optional(),
    ItemId: z.number().int().optional(),
    PriceInclusive: z.number().optional(),
    PriceExclusive: z.number().optional(),
    AdditionalPriceListId: z.number().int().optional(),
  })
  .passthrough();

export type AdditionalItemPriceRef = z.infer<typeof AdditionalItemPriceRefSchema>;

export const AttachmentRefSchema = z
  .object({
    Name: z.string().optional(),
    Size: z.number().int().optional(),
    AttachmentUID: z.string().nullable().optional(),
    Data: z
      .union([z.string(), z.array(z.number().int())])
      .nullable()
      .optional(),
  })
  .passthrough();

export type AttachmentRef = z.infer<typeof AttachmentRefSchema>;

export const ItemSchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string(),
    Category: ItemCategorySchema.nullable().optional(),
    Code: z.string(),
    Active: z.boolean().optional(),
    PriceInclusive: z.number().optional(),
    PriceExclusive: z.number().optional(),
    Physical: z.boolean().optional(),
    TaxTypeIdSales: z.number().int().nullable().optional(),
    TaxTypeSales: TaxTypeSchema.nullable().optional(),
    TaxTypeIdPurchases: z.number().int().nullable().optional(),
    TaxTypePurchases: TaxTypeSchema.nullable().optional(),
    LastCost: z.number().optional(),
    AverageCost: z.number().optional(),
    QuantityOnHand: z.number().nullable().optional(),
    HasAttachments: z.boolean().nullable().optional(),
    HasActivity: z.boolean().optional(),
    Unit: z.string().optional(),
    ItemReportingGroupId_Sales: z.number().int().nullable().optional(),
    ItemReportingGroupSales: ItemReportGroupRefSchema.nullable().optional(),
    ItemReportingGroupId_Purchases: z.number().int().nullable().optional(),
    ItemReportingGroupPurchases: ItemReportGroupRefSchema.nullable().optional(),
    ItemReportingGroupId_Inventory: z.number().int().nullable().optional(),
    ItemReportingGroupInventory: ItemReportGroupRefSchema.nullable().optional(),
    ItemReportingGroupId_ItemAdjustments: z.number().int().nullable().optional(),
    AccountId_ServiceItemRecovery: z.number().int().nullable().optional(),
    ItemReportingGroupItemAdjustments: ItemReportGroupRefSchema.nullable().optional(),
    AccountServiceItemRecovery: AccountSchema.nullable().optional(),
    TextUserField1: z.string().optional(),
    TextUserField2: z.string().optional(),
    TextUserField3: z.string().optional(),
    NumericUserField1: z.number().nullable().optional(),
    NumericUserField2: z.number().nullable().optional(),
    NumericUserField3: z.number().nullable().optional(),
    DateUserField1: z.string().nullable().optional(),
    DateUserField2: z.string().nullable().optional(),
    DateUserField3: z.string().nullable().optional(),
    YesNoUserField1: z.boolean().nullable().optional(),
    YesNoUserField2: z.boolean().nullable().optional(),
    YesNoUserField3: z.boolean().nullable().optional(),
    Modified: z.string().nullable().optional(),
    Created: z.string().optional(),
    MajorIndustryCodeId: z.number().int().nullable().optional(),
    AdditionalItemPrices: z.array(AdditionalItemPriceRefSchema).optional(),
    GPPercentage: z.number().nullable().optional(),
    GPAmount: z.number().nullable().optional(),
    ItemReportingGroupPurchasesName: z.string().optional(),
    ItemReportingGroupSalesName: z.string().optional(),
    ItemReportingGroupInventoryName: z.string().optional(),
    ItemReportingGroupItemAdjustmentsName: z.string().optional(),
    AccountServiceItemRecoveryName: z.string().optional(),
    Attachments: z.array(AttachmentRefSchema).nullable().optional(),
    PrescribedGoods: z.boolean().optional(),
    QuantityReserved: z.number().nullable().optional(),
    HasSpecialCountryTaxActivity: z.boolean().optional(),
  })
  .passthrough();

export type Item = z.infer<typeof ItemSchema>;

export const ItemSaveRequestSchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string(),
    Category: ItemCategorySchema.nullable().optional(),
    Code: z.string(),
    Active: z.boolean().optional(),
    PriceInclusive: z.number().optional(),
    PriceExclusive: z.number().optional(),
    Physical: z.boolean().optional(),
    TaxTypeIdSales: z.number().int().nullable().optional(),
    TaxTypeSales: TaxTypeSchema.nullable().optional(),
    TaxTypeIdPurchases: z.number().int().nullable().optional(),
    TaxTypePurchases: TaxTypeSchema.nullable().optional(),
    LastCost: z.number().optional(),
    AverageCost: z.number().optional(),
    QuantityOnHand: z.number().nullable().optional(),
    HasAttachments: z.boolean().nullable().optional(),
    HasActivity: z.boolean().optional(),
    Unit: z.string().optional(),
    ItemReportingGroupId_Sales: z.number().int().nullable().optional(),
    ItemReportingGroupSales: ItemReportGroupRefSchema.nullable().optional(),
    ItemReportingGroupId_Purchases: z.number().int().nullable().optional(),
    ItemReportingGroupPurchases: ItemReportGroupRefSchema.nullable().optional(),
    ItemReportingGroupId_Inventory: z.number().int().nullable().optional(),
    ItemReportingGroupInventory: ItemReportGroupRefSchema.nullable().optional(),
    ItemReportingGroupId_ItemAdjustments: z.number().int().nullable().optional(),
    AccountId_ServiceItemRecovery: z.number().int().nullable().optional(),
    ItemReportingGroupItemAdjustments: ItemReportGroupRefSchema.nullable().optional(),
    AccountServiceItemRecovery: AccountSchema.nullable().optional(),
    TextUserField1: z.string().optional(),
    TextUserField2: z.string().optional(),
    TextUserField3: z.string().optional(),
    NumericUserField1: z.number().nullable().optional(),
    NumericUserField2: z.number().nullable().optional(),
    NumericUserField3: z.number().nullable().optional(),
    DateUserField1: z.string().nullable().optional(),
    DateUserField2: z.string().nullable().optional(),
    DateUserField3: z.string().nullable().optional(),
    YesNoUserField1: z.boolean().nullable().optional(),
    YesNoUserField2: z.boolean().nullable().optional(),
    YesNoUserField3: z.boolean().nullable().optional(),
    Modified: z.string().nullable().optional(),
    Created: z.string().optional(),
    MajorIndustryCodeId: z.number().int().nullable().optional(),
    AdditionalItemPrices: z.array(AdditionalItemPriceRefSchema).optional(),
    GPPercentage: z.number().nullable().optional(),
    GPAmount: z.number().nullable().optional(),
    ItemReportingGroupPurchasesName: z.string().optional(),
    ItemReportingGroupSalesName: z.string().optional(),
    ItemReportingGroupInventoryName: z.string().optional(),
    ItemReportingGroupItemAdjustmentsName: z.string().optional(),
    AccountServiceItemRecoveryName: z.string().optional(),
    Attachments: z.array(AttachmentRefSchema).nullable().optional(),
    PrescribedGoods: z.boolean().optional(),
    QuantityReserved: z.number().nullable().optional(),
    HasSpecialCountryTaxActivity: z.boolean().optional(),
  })
  .strict();

export type ItemSaveRequest = z.infer<typeof ItemSaveRequestSchema>;

export const ItemPageSchema = createSagePageSchema(ItemSchema);

export const ItemOpeningBalanceSchema = z
  .object({
    ID: z.number().int().optional(),
    ItemId: z.number().int(),
    Reason: z.string().optional(),
    Date: z.string(),
    Quantity: z.number(),
    Cost: z.number(),
    Created: z.string().optional(),
    Modified: z.string().nullable().optional(),
  })
  .passthrough();

export type ItemOpeningBalance = z.infer<typeof ItemOpeningBalanceSchema>;

export const ItemOpeningBalanceSaveRequestSchema = z
  .object({
    ID: z.number().int().optional(),
    ItemId: z.number().int(),
    Reason: z.string().optional(),
    Date: z.string(),
    Quantity: z.number(),
    Cost: z.number(),
    Created: z.string().optional(),
    Modified: z.string().nullable().optional(),
  })
  .strict();

export type ItemOpeningBalanceSaveRequest = z.infer<typeof ItemOpeningBalanceSaveRequestSchema>;

export const ItemOpeningBalancePageSchema = createSagePageSchema(ItemOpeningBalanceSchema);

export const ItemNoteSchema = z
  .object({
    ID: z.number().int().optional(),
    ItemId: z.number().int().optional(),
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

export type ItemNote = z.infer<typeof ItemNoteSchema>;

export const ItemNoteSaveRequestSchema = z
  .object({
    ID: z.number().int().optional(),
    ItemId: z.number().int().optional(),
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

export type ItemNoteSaveRequest = z.infer<typeof ItemNoteSaveRequestSchema>;

export const ItemNotePageSchema = createSagePageSchema(ItemNoteSchema);

export interface ItemListOptions extends RequestOptions {
  readonly includeAdditionalItemPrices?: boolean | undefined;
  readonly includeAttachments?: boolean | undefined;
}

export class ItemsService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /Item/Get?includeAdditionalItemPrices={...}&includeAttachments={...}` — Gets a list of Items. */
  public async list(options?: ItemListOptions): Promise<SagePage<Item>> {
    const baseQuery: Record<string, boolean | undefined> = {};
    if (options?.includeAdditionalItemPrices !== undefined) {
      baseQuery["includeAdditionalItemPrices"] = options.includeAdditionalItemPrices;
    }
    if (options?.includeAttachments !== undefined) {
      baseQuery["includeAttachments"] = options.includeAttachments;
    }

    return this.executor.request({
      resource: "Item",
      operation: "Get",
      method: "GET",
      path: "/Item/Get",
      query: buildQueryWithOData(
        Object.keys(baseQuery).length > 0 ? baseQuery : undefined,
        options?.odata,
      ),
      responseSchema: ItemPageSchema,
      options,
    });
  }

  /** Async page iterator for `GET /Item/Get`. */
  public pages(
    options?: ItemListOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<Item>, void, undefined> {
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

  /** Async item iterator for `GET /Item/Get`. */
  public iterate(
    options?: ItemListOptions & PaginationOptions,
  ): AsyncGenerator<Item, void, undefined> {
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

  /** `GET /Item/Get/{id}` — Gets the specified Item based on the identifier. */
  public async get(id: number, options?: RequestOptions): Promise<Item> {
    return this.executor.request({
      resource: "Item",
      operation: "GetById",
      method: "GET",
      path: `/Item/Get/${encodeURIComponent(String(id))}`,
      responseSchema: ItemSchema,
      options,
    });
  }

  /** `POST /Item/Save` — Saves the specified Item. */
  public async save(input: ItemSaveRequest, options?: RequestOptions): Promise<Item> {
    return this.executor.request({
      resource: "Item",
      operation: "Save",
      method: "POST",
      path: "/Item/Save",
      body: input,
      requestSchema: ItemSaveRequestSchema,
      responseSchema: ItemSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /Item/Delete/{id}` — Deletes the specified Item based on the identifier. */
  public async delete(id: number, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "Item",
      operation: "Delete",
      method: "DELETE",
      path: `/Item/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class ItemCategoriesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /ItemCategory/Get` — Gets a list of Item Categories. */
  public async list(options?: RequestOptions): Promise<SagePage<ItemCategory>> {
    return this.executor.request({
      resource: "ItemCategory",
      operation: "Get",
      method: "GET",
      path: "/ItemCategory/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: ItemCategoryPageSchema,
      options,
    });
  }

  /** `GET /ItemCategory/Get/{id}` — Gets the specified Item Category based on the identifier. */
  public async get(id: number, options?: RequestOptions): Promise<ItemCategory> {
    return this.executor.request({
      resource: "ItemCategory",
      operation: "GetById",
      method: "GET",
      path: `/ItemCategory/Get/${encodeURIComponent(String(id))}`,
      responseSchema: ItemCategorySchema,
      options,
    });
  }

  /** `POST /ItemCategory/Save` — Saves the specified Item Category. */
  public async save(
    input: ItemCategorySaveRequest,
    options?: RequestOptions,
  ): Promise<ItemCategory> {
    return this.executor.request({
      resource: "ItemCategory",
      operation: "Save",
      method: "POST",
      path: "/ItemCategory/Save",
      body: input,
      requestSchema: ItemCategorySaveRequestSchema,
      responseSchema: ItemCategorySchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /ItemCategory/Delete/{id}` — Deletes the specified Item Category based on the identifier. */
  public async delete(id: number, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "ItemCategory",
      operation: "Delete",
      method: "DELETE",
      path: `/ItemCategory/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class ItemOpeningBalancesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /ItemOpeningBalance/Get` — Gets a list of Opening Balances. */
  public async list(options?: RequestOptions): Promise<SagePage<ItemOpeningBalance>> {
    return this.executor.request({
      resource: "ItemOpeningBalance",
      operation: "Get",
      method: "GET",
      path: "/ItemOpeningBalance/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: ItemOpeningBalancePageSchema,
      options,
    });
  }

  /** `GET /ItemOpeningBalance/Get/{id}` — Gets the specified Opening Balance based on the identifier. */
  public async get(id: number, options?: RequestOptions): Promise<ItemOpeningBalance> {
    return this.executor.request({
      resource: "ItemOpeningBalance",
      operation: "GetById",
      method: "GET",
      path: `/ItemOpeningBalance/Get/${encodeURIComponent(String(id))}`,
      responseSchema: ItemOpeningBalanceSchema,
      options,
    });
  }

  /** `GET /ItemOpeningBalance/GetByItemId/{id}` — Gets the specified Opening Balance based on the ItemId. */
  public async getByItemId(itemId: number, options?: RequestOptions): Promise<ItemOpeningBalance> {
    return this.executor.request({
      resource: "ItemOpeningBalance",
      operation: "GetByItemId",
      method: "GET",
      path: `/ItemOpeningBalance/GetByItemId/${encodeURIComponent(String(itemId))}`,
      responseSchema: ItemOpeningBalanceSchema,
      options,
    });
  }

  /** `POST /ItemOpeningBalance/Save` — Saves the specified Item Opening Balance. */
  public async save(
    input: ItemOpeningBalanceSaveRequest,
    options?: RequestOptions,
  ): Promise<ItemOpeningBalance> {
    return this.executor.request({
      resource: "ItemOpeningBalance",
      operation: "Save",
      method: "POST",
      path: "/ItemOpeningBalance/Save",
      body: input,
      requestSchema: ItemOpeningBalanceSaveRequestSchema,
      responseSchema: ItemOpeningBalanceSchema,
      isFinancialMutation: true,
      options,
    });
  }
}

export class ItemNotesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /ItemNote/Get` — Gets a list of all the Item Notes. */
  public async list(options?: RequestOptions): Promise<SagePage<ItemNote>> {
    return this.executor.request({
      resource: "ItemNote",
      operation: "Get",
      method: "GET",
      path: "/ItemNote/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: ItemNotePageSchema,
      options,
    });
  }

  /** `GET /ItemNote/Get/{id}` — Gets the specified Item Note based on the identifier. */
  public async get(id: number, options?: RequestOptions): Promise<ItemNote> {
    return this.executor.request({
      resource: "ItemNote",
      operation: "GetById",
      method: "GET",
      path: `/ItemNote/Get/${encodeURIComponent(String(id))}`,
      responseSchema: ItemNoteSchema,
      options,
    });
  }

  /** `POST /ItemNote/Save` — Saves the specified Item Note. */
  public async save(input: ItemNoteSaveRequest, options?: RequestOptions): Promise<ItemNote> {
    return this.executor.request({
      resource: "ItemNote",
      operation: "Save",
      method: "POST",
      path: "/ItemNote/Save",
      body: input,
      requestSchema: ItemNoteSaveRequestSchema,
      responseSchema: ItemNoteSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /ItemNote/Delete/{id}` — Deletes the specified Item Note based on the identifier. */
  public async delete(id: number, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "ItemNote",
      operation: "Delete",
      method: "DELETE",
      path: `/ItemNote/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export * from "./m005.js";

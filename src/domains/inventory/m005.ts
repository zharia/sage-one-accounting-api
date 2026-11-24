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

const AccountSchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string().optional(),
    Category: z.lazy(() => AccountCategorySchema).optional(),
    Active: z.boolean().optional(),
    Balance: z.number().optional(), // read-only / system generated
    Description: z.string().optional(),
    ReportingGroupId: z.number().int().nullable().optional(),
    UnallocatedAccount: z.boolean().optional(), // read-only / system generated
    IsTaxLocked: z.boolean().optional(), // read-only / system generated
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().optional(), // read-only / system generated
    AccountType: z.number().int().optional(), // read-only / system generated
    HasActivity: z.boolean().optional(), // read-only / system generated
    DefaultTaxTypeId: z.number().int().nullable().optional(),
    DefaultTaxType: z.lazy(() => TaxTypeSchema).optional(),
  })
  .passthrough();

const AccountCategorySchema = z
  .object({
    Description: z.string().optional(),
    ID: z.number().int(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().nullable().optional(), // read-only / system generated
    Comment: z.string().optional(),
    Order: z.number().int().optional(),
  })
  .passthrough();

export const AdditionalItemPriceSchema = z
  .object({
    ID: z.number().int().optional(),
    ItemId: z.number().int().optional(),
    PriceInclusive: z.number().optional(),
    PriceExclusive: z.number().optional(),
    AdditionalPriceListId: z.number().int().optional(),
  })
  .passthrough();
export type AdditionalItemPrice = z.infer<typeof AdditionalItemPriceSchema>;

const AdditionalPriceListSchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string(),
    IsDefault: z.boolean().optional(),
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

const IModelSchema = z
  .object({
    ID: z.number().int().optional(),
  })
  .passthrough();

const ItemSchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string(),
    Category: z.lazy(() => ItemCategorySchema).optional(),
    Code: z.string(),
    Active: z.boolean().optional(),
    PriceInclusive: z.number().optional(),
    PriceExclusive: z.number().optional(),
    Physical: z.boolean().optional(),
    TaxTypeIdSales: z.number().int().nullable().optional(),
    TaxTypeSales: z.lazy(() => TaxTypeSchema).optional(),
    TaxTypeIdPurchases: z.number().int().nullable().optional(),
    TaxTypePurchases: z.lazy(() => TaxTypeSchema).optional(),
    LastCost: z.number().optional(),
    AverageCost: z.number().optional(), // read-only / system generated
    QuantityOnHand: z.number().nullable().optional(), // read-only / system generated
    HasAttachments: z.boolean().nullable().optional(),
    HasActivity: z.boolean().optional(), // read-only / system generated
    Unit: z.string().optional(),
    ItemReportingGroupId_Sales: z.number().int().nullable().optional(),
    ItemReportingGroupSales: z.lazy(() => ItemReportGroupSchema).optional(),
    ItemReportingGroupId_Purchases: z.number().int().nullable().optional(),
    ItemReportingGroupPurchases: z.lazy(() => ItemReportGroupSchema).optional(),
    ItemReportingGroupId_Inventory: z.number().int().nullable().optional(),
    ItemReportingGroupInventory: z.lazy(() => ItemReportGroupSchema).optional(),
    ItemReportingGroupId_ItemAdjustments: z.number().int().nullable().optional(),
    AccountId_ServiceItemRecovery: z.number().int().nullable().optional(),
    ItemReportingGroupItemAdjustments: z.lazy(() => ItemReportGroupSchema).optional(),
    AccountServiceItemRecovery: z.lazy(() => AccountSchema).optional(),
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
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().optional(), // read-only / system generated
    MajorIndustryCodeId: z.number().int().nullable().optional(),
    AdditionalItemPrices: z.array(z.lazy(() => AdditionalItemPriceSchema)).optional(),
    GPPercentage: z.number().nullable().optional(),
    GPAmount: z.number().nullable().optional(),
    ItemReportingGroupPurchasesName: z.string().optional(),
    ItemReportingGroupSalesName: z.string().optional(),
    ItemReportingGroupInventoryName: z.string().optional(),
    ItemReportingGroupItemAdjustmentsName: z.string().optional(),
    AccountServiceItemRecoveryName: z.string().optional(),
    Attachments: z.array(z.lazy(() => AttachmentSchema)).optional(), // read-only / system generated
    PrescribedGoods: z.boolean().optional(),
    QuantityReserved: z.number().nullable().optional(), // read-only / system generated
    HasSpecialCountryTaxActivity: z.boolean().optional(),
  })
  .passthrough();

export const ItemAdjustmentSchema = z
  .object({
    ID: z.number().int().optional(),
    Date: z.string().optional(),
    ItemId: z.number().int().optional(),
    AverageCost: z.number().optional(),
    Quantity: z.number().optional(),
    Reason: z.string().optional(),
    Created: z.string().optional(),
    Modified: z.string().nullable().optional(),
  })
  .passthrough();
export type ItemAdjustment = z.infer<typeof ItemAdjustmentSchema>;

export const ItemBundleSchema = z
  .object({
    ID: z.number().int().optional(),
    Active: z.boolean().optional(),
    BundleCode: z.string(),
    Description: z.string(),
    ItemBundleItems: z.array(z.lazy(() => ItemBundleItemSchema)).optional(),
    CodeAndDescription: z.string().optional(),
  })
  .passthrough();
export type ItemBundle = z.infer<typeof ItemBundleSchema>;

export const ItemBundleItemSchema = z
  .object({
    ID: z.number().int().optional(),
    ItemId: z.number().int().optional(),
    Code: z.string().optional(),
    Description: z.string().optional(),
    Quantity: z.number().optional(),
    AverageCost: z.number().optional(),
    BundleCode: z.string().optional(),
    BundleDescription: z.string().optional(),
    PriceListCostExclusive: z.number().optional(),
    PriceListCostInclusive: z.number().optional(),
  })
  .passthrough();
export type ItemBundleItem = z.infer<typeof ItemBundleItemSchema>;

const ItemCategorySchema = z
  .object({
    Description: z.string().optional(),
    ID: z.number().int(),
    Modified: z.string().nullable().optional(), // read-only / system generated
    Created: z.string().nullable().optional(), // read-only / system generated
  })
  .passthrough();

export const ItemMovementSchema = z
  .object({
    ID: z.number().int().nullable().optional(),
    Date: z.string().nullable().optional(),
    Reference: z.string().nullable().optional(),
    Quantity: z.number().int().nullable().optional(),
    DocumentTypeId: z.number().int().nullable().optional(),
    Name: z.string().nullable().optional(),
    DocumentNumber: z.string().nullable().optional(),
    ItemCode: z.string().nullable().optional(),
    ItemDescription: z.string().nullable().optional(),
  })
  .passthrough();
export type ItemMovement = z.infer<typeof ItemMovementSchema>;

export const ItemMovementRequestModelSchema = z
  .object({
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    FromItem: z.string().optional(),
    ToItem: z.string().optional(),
    FromCategory: z.string().optional(),
    ToCategory: z.string().optional(),
    IncludeActive: z.boolean().optional(),
    IncludeInactive: z.boolean().optional(),
    IncludePhysical: z.boolean().optional(),
    IncludeService: z.boolean().optional(),
  })
  .passthrough();
export type ItemMovementRequestModel = z.infer<typeof ItemMovementRequestModelSchema>;

export const ItemReportGroupSchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string(),
    ItemReportingGroupTypeId: z.number().int().optional(),
    ItemReportingGroupType: z.string().optional(),
    ReportingGroupId: z.number().int().nullable().optional(),
    AccountCategoryId: z.number().int().nullable().optional(),
    AccountCategory: z.lazy(() => AccountCategorySchema).optional(),
  })
  .passthrough();
export type ItemReportGroup = z.infer<typeof ItemReportGroupSchema>;

export const PriceListReportLineSchema = z
  .object({
    ID: z.number().int().nullable().optional(),
    Code: z.string().nullable().optional(),
    Description: z.string().nullable().optional(),
    CategoryDescription: z.string().nullable().optional(),
    Unit: z.string().nullable().optional(),
    PriceListReportLineItems: z.array(z.record(z.string(), z.unknown()).nullable()).optional(),
  })
  .passthrough();
export type PriceListReportLine = z.infer<typeof PriceListReportLineSchema>;

export const PriceListReportRequestModelSchema = z
  .object({
    FromItem: z.string().optional(),
    ToItem: z.string().optional(),
    FromCategory: z.string().optional(),
    ToCategory: z.string().optional(),
    PriceListIds: z.array(z.number().int()).optional(),
    Exclusive: z.boolean().optional(),
    IncludeServiceItems: z.boolean().optional(),
    IncludePhysicalItems: z.boolean().optional(),
    IncludeActive: z.boolean().optional(),
    IncludeInactive: z.boolean().optional(),
  })
  .passthrough();
export type PriceListReportRequestModel = z.infer<typeof PriceListReportRequestModelSchema>;

export const PurchasesByItemSchema = z
  .object({
    ID: z.number().int().optional(),
    TransactionID: z.number().int().optional(),
    DocumentTypeId: z.number().int().optional(),
    DocumentNumber: z.string().optional(),
    SupplierName: z.string().optional(),
    ItemCode: z.string().optional(),
    ItemDescription: z.string().optional(),
    ItemCodeAndDescription: z.string().optional(),
    UnitPriceExclusive: z.number().optional(),
    Quantity: z.number().optional(),
    TotalPurchases: z.number().optional(),
    Date: z.string().optional(),
    PriceExclusive: z.number().optional(),
  })
  .passthrough();
export type PurchasesByItem = z.infer<typeof PurchasesByItemSchema>;

export const PurchasesByItemRequestModelSchema = z
  .object({
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    FromItem: z.string().optional(),
    ToItem: z.string().optional(),
    FromCategory: z.string().optional(),
    ToCategory: z.string().optional(),
    IncludeService: z.boolean().optional(),
    IncludePhysical: z.boolean().optional(),
    IncludeActive: z.boolean().optional(),
    IncludeInactive: z.boolean().optional(),
    AnalysisCategoryId1: z.number().int().nullable().optional(),
    AnalysisCategoryId2: z.number().int().nullable().optional(),
    AnalysisCategoryId3: z.number().int().nullable().optional(),
    ReportGroupAccount: z.string().optional(),
    IncludeReturns: z.boolean().optional(),
    Limit: z.number().int().optional(),
  })
  .passthrough();
export type PurchasesByItemRequestModel = z.infer<typeof PurchasesByItemRequestModelSchema>;

export const SalesByItemSchema = z
  .object({
    ID: z.number().int().nullable().optional(),
    TransactionID: z.number().int().nullable().optional(),
    DocumentTypeId: z.number().int().nullable().optional(),
    DocumentNumber: z.string().nullable().optional(),
    CustomerName: z.string().nullable().optional(),
    ItemCode: z.string().nullable().optional(),
    ItemDescription: z.string().nullable().optional(),
    ItemCodeAndDescription: z.string().nullable().optional(),
    UnitPriceExclusive: z.number().int().nullable().optional(),
    Quantity: z.number().int().nullable().optional(),
    TotalCost: z.number().int().nullable().optional(),
    TotalSelling: z.number().int().nullable().optional(),
    Date: z.string().nullable().optional(),
    LastCost: z.number().int().nullable().optional(),
    PriceExclusive: z.number().int().nullable().optional(),
    GPAmount: z.number().int().nullable().optional(),
    GPPercentage: z.number().nullable().optional(),
  })
  .passthrough();
export type SalesByItem = z.infer<typeof SalesByItemSchema>;

export const SalesByItemRequestModelSchema = z
  .object({
    FromDate: z.string().optional(),
    ToDate: z.string().optional(),
    FromItem: z.string().optional(),
    ToItem: z.string().optional(),
    FromCategory: z.string().optional(),
    ToCategory: z.string().optional(),
    IncludeService: z.boolean().optional(),
    IncludePhysical: z.boolean().optional(),
    IncludeActive: z.boolean().optional(),
    IncludeInactive: z.boolean().optional(),
    AnalysisCategoryId1: z.number().int().nullable().optional(),
    AnalysisCategoryId2: z.number().int().nullable().optional(),
    AnalysisCategoryId3: z.number().int().nullable().optional(),
    ReportGroupAccount: z.string().optional(),
    IncludeCreditNotes: z.boolean().optional(),
    Detailed: z.boolean().optional(),
    UseLastCost: z.boolean().optional(),
    Limit: z.number().int().optional(),
  })
  .passthrough();
export type SalesByItemRequestModel = z.infer<typeof SalesByItemRequestModelSchema>;

const StorageInformationSchema = z
  .object({
    SizeUsed: z.number().int().optional(),
    MaxSizeAllowed: z.number().int().optional(),
  })
  .passthrough();

const TaxTypeSchema = z
  .object({
    ID: z.number().int().optional(),
    Name: z.string().optional(),
    Percentage: z.number().optional(),
    IsDefault: z.boolean().optional(),
    HasActivity: z.boolean().optional(), // read-only / system generated
    IsManualTax: z.boolean().optional(),
    Active: z.boolean().optional(),
    Created: z.string().optional(), // read-only / system generated
    Modified: z.string().nullable().optional(), // read-only / system generated
    TaxTypeDefaultUID: z.string().optional(), // read-only / system generated
    CompanyId: z.number().int().optional(),
  })
  .passthrough();

export class ItemAdjustmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /ItemAdjustment/Get` [GET-ItemAdjustment-Get] — Gets a list of Item Adjustments. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof ItemAdjustmentSchema>>> {
    return this.executor.request({
      resource: "ItemAdjustment",
      operation: "Get",
      method: "GET",
      path: "/ItemAdjustment/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(ItemAdjustmentSchema),
      options,
    });
  }

  /** Async page iterator for `GET /ItemAdjustment/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof ItemAdjustmentSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /ItemAdjustment/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof ItemAdjustmentSchema>, void, undefined> {
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

  /** `GET /ItemAdjustment/Get/{id}` [GET-ItemAdjustment-Get-id] — Gets the specified Item Adjustment based on the identifier sent through. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof ItemAdjustmentSchema>> {
    return this.executor.request({
      resource: "ItemAdjustment",
      operation: "GetById",
      method: "GET",
      path: `/ItemAdjustment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: ItemAdjustmentSchema,
      options,
    });
  }

  /** `POST /ItemAdjustment/Save` [POST-ItemAdjustment-Save] — Saves a Item Adjustment based on the Item Adjustment object sent through. */
  public async save(
    input: z.infer<typeof ItemAdjustmentSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof ItemAdjustmentSchema>> {
    return this.executor.request({
      resource: "ItemAdjustment",
      operation: "Save",
      method: "POST",
      path: "/ItemAdjustment/Save",
      body: input,
      requestSchema: ItemAdjustmentSchema,
      responseSchema: ItemAdjustmentSchema,
      isFinancialMutation: true,
      options,
    });
  }
}

export class ItemAttachmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /ItemAttachment/Get/{id}` [GET-ItemAttachment-Get-id] — Gets a list of Item Attachments for the specified Item. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AttachmentSchema>>> {
    return this.executor.request({
      resource: "ItemAttachment",
      operation: "GetById",
      method: "GET",
      path: `/ItemAttachment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(AttachmentSchema),
      options,
    });
  }

  /** `GET /ItemAttachment/Download/{id}` [GET-ItemAttachment-Download-id] — Downloads the specified Item Attachment based on file identifier (GUID). */
  public async download(id: string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "ItemAttachment",
      operation: "Download",
      method: "GET",
      path: `/ItemAttachment/Download/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }

  /** `GET /ItemAttachment/GetCompanyStorageInformation` [GET-ItemAttachment-GetCompanyStorageInformation] — Gets the Company Storage Information. */
  public async getCompanyStorageInformation(
    options?: RequestOptions,
  ): Promise<z.infer<typeof StorageInformationSchema>> {
    return this.executor.request({
      resource: "ItemAttachment",
      operation: "GetCompanyStorageInformation",
      method: "GET",
      path: "/ItemAttachment/GetCompanyStorageInformation",
      responseSchema: StorageInformationSchema,
      options,
    });
  }

  /** `POST /ItemAttachment/Save` [POST-ItemAttachment-Save] — Saves the Attachment. The file data is transmitted as a multipart/form-data POST. In the query string of the Url or a parameter in the form post, a ItemId is required. An ItemId is the ID of the Item that this attachment must be linked to. This is Required and is not optional. */
  public async save(
    upload: {
      readonly ItemId: number | string;
      readonly file: Blob | Uint8Array | string;
      readonly fileName?: string | undefined;
      readonly fieldName?: string | undefined;
    },
    options?: RequestOptions,
  ): Promise<unknown> {
    const formData = new FormData();
    formData.set("ItemId", String(upload.ItemId));
    const blob =
      upload.file instanceof Blob
        ? upload.file
        : new Blob([typeof upload.file === "string" ? upload.file : new Uint8Array(upload.file)]);
    formData.set(upload.fieldName ?? "file", blob, upload.fileName ?? "attachment.bin");
    return this.executor.request({
      resource: "ItemAttachment",
      operation: "Save",
      method: "POST",
      path: "/ItemAttachment/Save",
      query: buildQueryWithOData({ ItemId: upload.ItemId }, options?.odata),
      formData,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /ItemAttachment/Delete/{id}` [DELETE-ItemAttachment-Delete-id] — Deletes the specified Item Attachment based on file identifier (GUID). */
  public async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "ItemAttachment",
      operation: "Delete",
      method: "DELETE",
      path: `/ItemAttachment/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /ItemAttachment/Validate` [POST-ItemAttachment-Validate] — Validates the specified Item. */
  public async validate(
    input: z.infer<typeof ItemSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "ItemAttachment",
      operation: "Validate",
      method: "POST",
      path: "/ItemAttachment/Validate",
      body: input,
      requestSchema: ItemSchema,
      responseType: "empty",
      options,
    });
  }
}

export class ItemBundleService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /ItemBundle/Get/{id}` [GET-ItemBundle-Get-id] — Gets a specific Item Bundle based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof ItemBundleSchema>> {
    return this.executor.request({
      resource: "ItemBundle",
      operation: "GetById",
      method: "GET",
      path: `/ItemBundle/Get/${encodeURIComponent(String(id))}`,
      responseSchema: ItemBundleSchema,
      options,
    });
  }

  /** `GET /ItemBundle/Get` [GET-ItemBundle-Get_includeDetail] — Gets a list of Item Bundles. */
  public async list(
    options?: RequestOptions & { readonly includeDetail?: boolean | undefined },
  ): Promise<SagePage<z.infer<typeof ItemBundleSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.includeDetail !== undefined) {
      baseQuery["includeDetail"] = options.includeDetail;
    }
    return this.executor.request({
      resource: "ItemBundle",
      operation: "Get",
      method: "GET",
      path: "/ItemBundle/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(ItemBundleSchema),
      options,
    });
  }

  /** Async page iterator for `GET /ItemBundle/Get`. */
  public pages(
    options?: RequestOptions & { readonly includeDetail?: boolean | undefined } & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof ItemBundleSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /ItemBundle/Get`. */
  public iterate(
    options?: RequestOptions & { readonly includeDetail?: boolean | undefined } & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof ItemBundleSchema>, void, undefined> {
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

  /** `POST /ItemBundle/Save` [POST-ItemBundle-Save] — Saves the specified Item Bundle. */
  public async save(
    input: z.infer<typeof ItemBundleSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof ItemBundleSchema>> {
    return this.executor.request({
      resource: "ItemBundle",
      operation: "Save",
      method: "POST",
      path: "/ItemBundle/Save",
      body: input,
      requestSchema: ItemBundleSchema,
      responseSchema: ItemBundleSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /ItemBundle/Delete/{id}` [DELETE-ItemBundle-Delete-id] — Deletes the specified Item Bundle. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "ItemBundle",
      operation: "Delete",
      method: "DELETE",
      path: `/ItemBundle/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class ItemMovementService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /ItemMovement/Get` [POST-ItemMovement-Get] — Retrieves a collection of Item Movement Transactions */
  public async get(
    input: z.infer<typeof ItemMovementRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof ItemMovementSchema>>> {
    return this.executor.request({
      resource: "ItemMovement",
      operation: "Get",
      method: "POST",
      path: "/ItemMovement/Get",
      body: input,
      requestSchema: ItemMovementRequestModelSchema,
      responseSchema: z.array(ItemMovementSchema),
      options,
    });
  }
}

export class ItemNoteAttachmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /ItemNoteAttachment/Save` [POST-ItemNoteAttachment-Save] — Saves the Attachment. The file data is transmitted as a multipart/form-data POST. In the query string of the Url or a parameter in the form post, a TransactionId is required. An ItemNoteId is the ID of the ItemNote that this attachment must be linked to. This is Required and is not optional. */
  public async save(
    upload: {
      readonly TransactionId: number | string;
      readonly file: Blob | Uint8Array | string;
      readonly fileName?: string | undefined;
      readonly fieldName?: string | undefined;
    },
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AttachmentSchema>>> {
    const formData = new FormData();
    formData.set("TransactionId", String(upload.TransactionId));
    const blob =
      upload.file instanceof Blob
        ? upload.file
        : new Blob([typeof upload.file === "string" ? upload.file : new Uint8Array(upload.file)]);
    formData.set(upload.fieldName ?? "file", blob, upload.fileName ?? "attachment.bin");
    return this.executor.request({
      resource: "ItemNoteAttachment",
      operation: "Save",
      method: "POST",
      path: "/ItemNoteAttachment/Save",
      query: buildQueryWithOData({ TransactionId: upload.TransactionId }, options?.odata),
      formData,
      responseSchema: z.array(AttachmentSchema),
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /ItemNoteAttachment/Get/{id}` [GET-ItemNoteAttachment-Get-id] — Gets the specified Attachment based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AttachmentSchema>>> {
    return this.executor.request({
      resource: "ItemNoteAttachment",
      operation: "GetById",
      method: "GET",
      path: `/ItemNoteAttachment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(AttachmentSchema),
      options,
    });
  }

  /** `GET /ItemNoteAttachment/Download/{id}` [GET-ItemNoteAttachment-Download-id] — Downloads the specified Attachment based on file identifier (Guid). */
  public async download(id: string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "ItemNoteAttachment",
      operation: "Download",
      method: "GET",
      path: `/ItemNoteAttachment/Download/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }

  /** `GET /ItemNoteAttachment/GetCompanyStorageInformation` [GET-ItemNoteAttachment-GetCompanyStorageInformation] — Gets the Company Storage Information. */
  public async getCompanyStorageInformation(
    options?: RequestOptions,
  ): Promise<z.infer<typeof StorageInformationSchema>> {
    return this.executor.request({
      resource: "ItemNoteAttachment",
      operation: "GetCompanyStorageInformation",
      method: "GET",
      path: "/ItemNoteAttachment/GetCompanyStorageInformation",
      responseSchema: StorageInformationSchema,
      options,
    });
  }

  /** `DELETE /ItemNoteAttachment/Delete/{id}` [DELETE-ItemNoteAttachment-Delete-id] — Deletes the specified Attachment based on file identifier (Guid). */
  public async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "ItemNoteAttachment",
      operation: "Delete",
      method: "DELETE",
      path: `/ItemNoteAttachment/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /ItemNoteAttachment/DeleteAll/{id}` [DELETE-ItemNoteAttachment-DeleteAll-id] — Deletes all Attachments based on the identifier. */
  public async deleteAll(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "ItemNoteAttachment",
      operation: "DeleteAll",
      method: "DELETE",
      path: `/ItemNoteAttachment/DeleteAll/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /ItemNoteAttachment/Validate` [POST-ItemNoteAttachment-Validate] — Validates the specified Entity. */
  public async validate(
    input: z.infer<typeof IModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "ItemNoteAttachment",
      operation: "Validate",
      method: "POST",
      path: "/ItemNoteAttachment/Validate",
      body: input,
      requestSchema: IModelSchema,
      responseType: "empty",
      options,
    });
  }
}

export class ItemReportGroupService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `DELETE /ItemReportGroup/Delete/{id}` [DELETE-ItemReportGroup-Delete-id] — Deletes a specified Item Report Group. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "ItemReportGroup",
      operation: "Delete",
      method: "DELETE",
      path: `/ItemReportGroup/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /ItemReportGroup/Get` [GET-ItemReportGroup-Get] — Retrieves a collection of Item Report Groups. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof ItemReportGroupSchema>>> {
    return this.executor.request({
      resource: "ItemReportGroup",
      operation: "Get",
      method: "GET",
      path: "/ItemReportGroup/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(ItemReportGroupSchema),
      options,
    });
  }

  /** Async page iterator for `GET /ItemReportGroup/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof ItemReportGroupSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /ItemReportGroup/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof ItemReportGroupSchema>, void, undefined> {
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

  /** `GET /ItemReportGroup/Get/{id}` [GET-ItemReportGroup-Get-id] — Retrieves a specific Item Report Group. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof ItemReportGroupSchema>> {
    return this.executor.request({
      resource: "ItemReportGroup",
      operation: "GetById",
      method: "GET",
      path: `/ItemReportGroup/Get/${encodeURIComponent(String(id))}`,
      responseSchema: ItemReportGroupSchema,
      options,
    });
  }

  /** `POST /ItemReportGroup/Save` [POST-ItemReportGroup-Save] — Saves the specified Item Report Group. */
  public async save(
    input: z.infer<typeof ItemReportGroupSchema>,
    options?: RequestOptions,
  ): Promise<unknown> {
    return this.executor.request({
      resource: "ItemReportGroup",
      operation: "Save",
      method: "POST",
      path: "/ItemReportGroup/Save",
      body: input,
      requestSchema: ItemReportGroupSchema,
      isFinancialMutation: true,
      options,
    });
  }
}

export class AdditionalItemPriceService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /AdditionalItemPrice/Get` [GET-AdditionalItemPrice-Get] — Gets a list of Additional Item Prices. This excludes items connected to the default price list or with a price of zero. Default price list is the pricing on the Items. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof AdditionalItemPriceSchema>>> {
    return this.executor.request({
      resource: "AdditionalItemPrice",
      operation: "Get",
      method: "GET",
      path: "/AdditionalItemPrice/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(AdditionalItemPriceSchema),
      options,
    });
  }

  /** Async page iterator for `GET /AdditionalItemPrice/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof AdditionalItemPriceSchema>>,
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

  /** Async item iterator for `GET /AdditionalItemPrice/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof AdditionalItemPriceSchema>, void, undefined> {
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

  /** `GET /AdditionalItemPrice/Get/{id}` [GET-AdditionalItemPrice-Get-id] — Gets the specified Additional Item Price based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AdditionalItemPriceSchema>> {
    return this.executor.request({
      resource: "AdditionalItemPrice",
      operation: "GetById",
      method: "GET",
      path: `/AdditionalItemPrice/Get/${encodeURIComponent(String(id))}`,
      responseSchema: AdditionalItemPriceSchema,
      options,
    });
  }

  /** `POST /AdditionalItemPrice/Save` [POST-AdditionalItemPrice-Save] — Saves the specified Additional Item Price. */
  public async save(
    input: z.infer<typeof AdditionalItemPriceSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AdditionalItemPriceSchema>> {
    return this.executor.request({
      resource: "AdditionalItemPrice",
      operation: "Save",
      method: "POST",
      path: "/AdditionalItemPrice/Save",
      body: input,
      requestSchema: AdditionalItemPriceSchema,
      responseSchema: AdditionalItemPriceSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /AdditionalItemPrice/Delete/{id}` [DELETE-AdditionalItemPrice-Delete-id] — Deletes the specified Additional Item Price based on the identifier. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "AdditionalItemPrice",
      operation: "Delete",
      method: "DELETE",
      path: `/AdditionalItemPrice/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class AdditionalPriceListService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /AdditionalPriceList/Get` [GET-AdditionalPriceList-Get] — Gets a list of Additional Price Lists. This includes the default price list. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof AdditionalPriceListSchema>>> {
    return this.executor.request({
      resource: "AdditionalPriceList",
      operation: "Get",
      method: "GET",
      path: "/AdditionalPriceList/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(AdditionalPriceListSchema),
      options,
    });
  }

  /** Async page iterator for `GET /AdditionalPriceList/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof AdditionalPriceListSchema>>,
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

  /** Async item iterator for `GET /AdditionalPriceList/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof AdditionalPriceListSchema>, void, undefined> {
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

  /** `GET /AdditionalPriceList/Get/{id}` [GET-AdditionalPriceList-Get-id] — Gets the specified Additional Price List based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AdditionalPriceListSchema>> {
    return this.executor.request({
      resource: "AdditionalPriceList",
      operation: "GetById",
      method: "GET",
      path: `/AdditionalPriceList/Get/${encodeURIComponent(String(id))}`,
      responseSchema: AdditionalPriceListSchema,
      options,
    });
  }

  /** `POST /AdditionalPriceList/Get` [POST-AdditionalPriceList-Get] — Gets a list of Additional Price Lists based on the list of identifiers. */
  public async getByIds(
    input: readonly (number | string | Record<string, unknown>)[],
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof AdditionalPriceListSchema>>> {
    return this.executor.request({
      resource: "AdditionalPriceList",
      operation: "Get",
      method: "POST",
      path: "/AdditionalPriceList/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: z.array(z.union([z.number(), z.string(), z.record(z.string(), z.unknown())])),
      responseSchema: createSagePageSchema(AdditionalPriceListSchema),
      options,
    });
  }

  /** `POST /AdditionalPriceList/Save` [POST-AdditionalPriceList-Save] — Saves the specified Additional Price List. */
  public async save(
    input: z.infer<typeof AdditionalPriceListSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof AdditionalPriceListSchema>> {
    return this.executor.request({
      resource: "AdditionalPriceList",
      operation: "Save",
      method: "POST",
      path: "/AdditionalPriceList/Save",
      body: input,
      requestSchema: AdditionalPriceListSchema,
      responseSchema: AdditionalPriceListSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /AdditionalPriceList/Delete/{id}` [DELETE-AdditionalPriceList-Delete-id] — Deletes the specified Additional Price List based on the identifier. If the Additional Price List is not in use. The default price list cannot be deleted. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "AdditionalPriceList",
      operation: "Delete",
      method: "DELETE",
      path: `/AdditionalPriceList/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /AdditionalPriceList/AllowDelete` [POST-AdditionalPriceList-AllowDelete] — Confirms if Additional Price List is in use by an Additional Item Price or a Customer. */
  public async allowDelete(
    input: z.infer<typeof AdditionalPriceListSchema>,
    options?: RequestOptions,
  ): Promise<boolean> {
    return this.executor.request({
      resource: "AdditionalPriceList",
      operation: "AllowDelete",
      method: "POST",
      path: "/AdditionalPriceList/AllowDelete",
      body: input,
      requestSchema: AdditionalPriceListSchema,
      responseSchema: z.boolean(),
      options,
    });
  }
}

export class PurchasesByItemService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /PurchasesByItem/Get` [POST-PurchasesByItem-Get] — Gets the specified request. */
  public async get(
    input: z.infer<typeof PurchasesByItemRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof PurchasesByItemSchema>>> {
    return this.executor.request({
      resource: "PurchasesByItem",
      operation: "Get",
      method: "POST",
      path: "/PurchasesByItem/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: PurchasesByItemRequestModelSchema,
      responseSchema: createSagePageSchema(PurchasesByItemSchema),
      options,
    });
  }
}

export class SalesByItemService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /SalesByItem/Get` [POST-SalesByItem-Get] — Gets the specified request. */
  public async get(
    input: z.infer<typeof SalesByItemRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof SalesByItemSchema>>> {
    return this.executor.request({
      resource: "SalesByItem",
      operation: "Get",
      method: "POST",
      path: "/SalesByItem/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      body: input,
      requestSchema: SalesByItemRequestModelSchema,
      responseSchema: createSagePageSchema(SalesByItemSchema),
      options,
    });
  }
}

export class PriceListingReportService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /PriceListingReport/Get` [POST-PriceListingReport-Get] — No documentation available. */
  public async get(
    input: z.infer<typeof PriceListReportRequestModelSchema>,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof PriceListReportLineSchema>>> {
    return this.executor.request({
      resource: "PriceListingReport",
      operation: "Get",
      method: "POST",
      path: "/PriceListingReport/Get",
      body: input,
      requestSchema: PriceListReportRequestModelSchema,
      responseSchema: z.array(PriceListReportLineSchema),
      options,
    });
  }
}

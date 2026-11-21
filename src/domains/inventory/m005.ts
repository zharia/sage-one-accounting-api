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

export const AdditionalItemPriceSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    ItemId: z.union([z.number().int(), z.string()]).nullable().optional(),
    PriceInclusive: z.union([z.number(), z.string()]).nullable().optional(),
    PriceExclusive: z.union([z.number(), z.string()]).nullable().optional(),
    AdditionalPriceListId: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type AdditionalItemPrice = z.infer<typeof AdditionalItemPriceSchema>;

export const AdditionalPriceListSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    IsDefault: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type AdditionalPriceList = z.infer<typeof AdditionalPriceListSchema>;

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

const IModelSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();

const ItemSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Category: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    Code: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Active: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    PriceInclusive: z.union([z.number(), z.string()]).nullable().optional(),
    PriceExclusive: z.union([z.number(), z.string()]).nullable().optional(),
    Physical: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    TaxTypeIdSales: z.union([z.number().int(), z.string()]).nullable().optional(),
    TaxTypeSales: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    TaxTypeIdPurchases: z.union([z.number().int(), z.string()]).nullable().optional(),
    TaxTypePurchases: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    LastCost: z.union([z.number(), z.string()]).nullable().optional(),
    AverageCost: z.union([z.number(), z.string()]).nullable().optional(),
    QuantityOnHand: z.union([z.number(), z.string()]).nullable().optional(),
    HasAttachments: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    HasActivity: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Unit: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ItemReportingGroupId_Sales: z.union([z.number().int(), z.string()]).nullable().optional(),
    ItemReportingGroupSales: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    ItemReportingGroupId_Purchases: z.union([z.number().int(), z.string()]).nullable().optional(),
    ItemReportingGroupPurchases: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    ItemReportingGroupId_Inventory: z.union([z.number().int(), z.string()]).nullable().optional(),
    ItemReportingGroupInventory: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    ItemReportingGroupId_ItemAdjustments: z
      .union([z.number().int(), z.string()])
      .nullable()
      .optional(),
    AccountId_ServiceItemRecovery: z.union([z.number().int(), z.string()]).nullable().optional(),
    ItemReportingGroupItemAdjustments: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    AccountServiceItemRecovery: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
    TextUserField1: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    TextUserField2: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    TextUserField3: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    NumericUserField1: z.union([z.number(), z.string()]).nullable().optional(),
    NumericUserField2: z.union([z.number(), z.string()]).nullable().optional(),
    NumericUserField3: z.union([z.number(), z.string()]).nullable().optional(),
    DateUserField1: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DateUserField2: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DateUserField3: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    YesNoUserField1: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    YesNoUserField2: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    YesNoUserField3: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Modified: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Created: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    MajorIndustryCodeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    AdditionalItemPrices: z.array(z.unknown()).nullable().optional(),
    GPPercentage: z.union([z.number(), z.string()]).nullable().optional(),
    GPAmount: z.union([z.number(), z.string()]).nullable().optional(),
    ItemReportingGroupPurchasesName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ItemReportingGroupSalesName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ItemReportingGroupInventoryName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ItemReportingGroupItemAdjustmentsName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    AccountServiceItemRecoveryName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Attachments: z.array(z.unknown()).nullable().optional(),
    PrescribedGoods: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    QuantityReserved: z.union([z.number(), z.string()]).nullable().optional(),
    HasSpecialCountryTaxActivity: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();

export const ItemAdjustmentSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ItemId: z.union([z.number().int(), z.string()]).nullable().optional(),
    AverageCost: z.union([z.number(), z.string()]).nullable().optional(),
    Quantity: z.union([z.number(), z.string()]).nullable().optional(),
    Reason: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Created: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Modified: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
  })
  .passthrough();
export type ItemAdjustment = z.infer<typeof ItemAdjustmentSchema>;

export const ItemBundleSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Active: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    BundleCode: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ItemBundleItems: z.array(z.unknown()).nullable().optional(),
    CodeAndDescription: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
  })
  .passthrough();
export type ItemBundle = z.infer<typeof ItemBundleSchema>;

export const ItemMovementSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Reference: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Quantity: z.union([z.number().int(), z.string()]).nullable().optional(),
    DocumentTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    Name: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    DocumentNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ItemCode: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ItemDescription: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
  })
  .passthrough();
export type ItemMovement = z.infer<typeof ItemMovementSchema>;

export const ItemMovementRequestModelSchema = z
  .object({
    FromDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    FromItem: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToItem: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    FromCategory: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToCategory: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    IncludeActive: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IncludeInactive: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IncludePhysical: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IncludeService: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type ItemMovementRequestModel = z.infer<typeof ItemMovementRequestModelSchema>;

export const ItemReportGroupSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Name: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ItemReportingGroupTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    ItemReportingGroupType: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ReportingGroupId: z.union([z.number().int(), z.string()]).nullable().optional(),
    AccountCategoryId: z.union([z.number().int(), z.string()]).nullable().optional(),
    AccountCategory: z
      .union([z.record(z.string(), z.unknown()), z.number(), z.string(), z.boolean()])
      .nullable()
      .optional(),
  })
  .passthrough();
export type ItemReportGroup = z.infer<typeof ItemReportGroupSchema>;

export const PriceListReportLineSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    Code: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Description: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CategoryDescription: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    Unit: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PriceListReportLineItems: z.array(z.unknown()).nullable().optional(),
  })
  .passthrough();
export type PriceListReportLine = z.infer<typeof PriceListReportLineSchema>;

export const PriceListReportRequestModelSchema = z
  .object({
    FromItem: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToItem: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    FromCategory: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToCategory: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PriceListIds: z
      .array(z.union([z.number().int(), z.string()]))
      .nullable()
      .optional(),
    Exclusive: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IncludeServiceItems: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IncludePhysicalItems: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IncludeActive: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IncludeInactive: z.union([z.boolean(), z.number().int()]).nullable().optional(),
  })
  .passthrough();
export type PriceListReportRequestModel = z.infer<typeof PriceListReportRequestModelSchema>;

export const PurchasesByItemSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    TransactionID: z.union([z.number().int(), z.string()]).nullable().optional(),
    DocumentTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    DocumentNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    SupplierName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ItemCode: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ItemDescription: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ItemCodeAndDescription: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    UnitPriceExclusive: z.union([z.number().int(), z.string()]).nullable().optional(),
    Quantity: z.union([z.number().int(), z.string()]).nullable().optional(),
    TotalPurchases: z.union([z.number().int(), z.string()]).nullable().optional(),
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    PriceExclusive: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type PurchasesByItem = z.infer<typeof PurchasesByItemSchema>;

export const PurchasesByItemRequestModelSchema = z
  .object({
    FromDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    FromItem: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToItem: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    FromCategory: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToCategory: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    IncludeService: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IncludePhysical: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IncludeActive: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IncludeInactive: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    AnalysisCategoryId1: z.union([z.number().int(), z.string()]).nullable().optional(),
    AnalysisCategoryId2: z.union([z.number().int(), z.string()]).nullable().optional(),
    AnalysisCategoryId3: z.union([z.number().int(), z.string()]).nullable().optional(),
    ReportGroupAccount: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    IncludeReturns: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Limit: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type PurchasesByItemRequestModel = z.infer<typeof PurchasesByItemRequestModelSchema>;

export const SalesByItemSchema = z
  .object({
    ID: z.union([z.number().int(), z.string()]).nullable().optional(),
    TransactionID: z.union([z.number().int(), z.string()]).nullable().optional(),
    DocumentTypeId: z.union([z.number().int(), z.string()]).nullable().optional(),
    DocumentNumber: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    CustomerName: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ItemCode: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ItemDescription: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ItemCodeAndDescription: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    UnitPriceExclusive: z.union([z.number().int(), z.string()]).nullable().optional(),
    Quantity: z.union([z.number().int(), z.string()]).nullable().optional(),
    TotalCost: z.union([z.number().int(), z.string()]).nullable().optional(),
    TotalSelling: z.union([z.number().int(), z.string()]).nullable().optional(),
    Date: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    LastCost: z.union([z.number().int(), z.string()]).nullable().optional(),
    PriceExclusive: z.union([z.number().int(), z.string()]).nullable().optional(),
    GPAmount: z.union([z.number().int(), z.string()]).nullable().optional(),
    GPPercentage: z.union([z.number(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type SalesByItem = z.infer<typeof SalesByItemSchema>;

export const SalesByItemRequestModelSchema = z
  .object({
    FromDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToDate: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    FromItem: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToItem: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    FromCategory: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    ToCategory: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    IncludeService: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IncludePhysical: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IncludeActive: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    IncludeInactive: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    AnalysisCategoryId1: z.union([z.number().int(), z.string()]).nullable().optional(),
    AnalysisCategoryId2: z.union([z.number().int(), z.string()]).nullable().optional(),
    AnalysisCategoryId3: z.union([z.number().int(), z.string()]).nullable().optional(),
    ReportGroupAccount: z
      .union([z.string(), z.number(), z.record(z.string(), z.unknown())])
      .nullable()
      .optional(),
    IncludeCreditNotes: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Detailed: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    UseLastCost: z.union([z.boolean(), z.number().int()]).nullable().optional(),
    Limit: z.union([z.number().int(), z.string()]).nullable().optional(),
  })
  .passthrough();
export type SalesByItemRequestModel = z.infer<typeof SalesByItemRequestModelSchema>;

const StorageInformationSchema = z
  .object({
    SizeUsed: z.union([z.number().int(), z.string()]).nullable().optional(),
    MaxSizeAllowed: z.union([z.number().int(), z.string()]).nullable().optional(),
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

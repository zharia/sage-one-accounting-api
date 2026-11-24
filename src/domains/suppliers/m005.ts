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

const StorageInformationSchema = z
  .object({
    SizeUsed: z.number().int().optional(),
    MaxSizeAllowed: z.number().int().optional(),
  })
  .passthrough();

export const SupplierAdditionalContactDetailSchema = z
  .object({
    ID: z.number().int().optional(),
    SupplierId: z.number().int().optional(),
    ContactName: z.string().optional(),
    Designation: z.string().optional(),
    Telephone: z.string().optional(),
    Fax: z.string().optional(),
    Mobile: z.string().optional(),
    Email: z.string().optional(),
  })
  .passthrough();
export type SupplierAdditionalContactDetail = z.infer<typeof SupplierAdditionalContactDetailSchema>;

export const SupplierBankDetailSchema = z
  .object({
    ID: z.number().int(),
    SupplierId: z.number().int(),
    BankAccountHolder: z.string(),
    BankAccountNumber: z.string(),
    BankName: z.string(),
    BankBranchCode: z.string(),
    BankAccountType: z.number().int().nullable().optional(),
  })
  .passthrough();
export type SupplierBankDetail = z.infer<typeof SupplierBankDetailSchema>;

export class SupplierAdditionalContactDetailService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `DELETE /SupplierAdditionalContactDetail/Delete/{id}` [DELETE-SupplierAdditionalContactDetail-Delete-id] — Deletes the specified Supplier Additional Contact Detail. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SupplierAdditionalContactDetail",
      operation: "Delete",
      method: "DELETE",
      path: `/SupplierAdditionalContactDetail/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /SupplierAdditionalContactDetail/Get` [GET-SupplierAdditionalContactDetail-Get] — Gets a list of Supplier Additional Contact Details. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof SupplierAdditionalContactDetailSchema>>> {
    return this.executor.request({
      resource: "SupplierAdditionalContactDetail",
      operation: "Get",
      method: "GET",
      path: "/SupplierAdditionalContactDetail/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(SupplierAdditionalContactDetailSchema),
      options,
    });
  }

  /** Async page iterator for `GET /SupplierAdditionalContactDetail/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof SupplierAdditionalContactDetailSchema>>,
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

  /** Async item iterator for `GET /SupplierAdditionalContactDetail/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof SupplierAdditionalContactDetailSchema>, void, undefined> {
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

  /** `GET /SupplierAdditionalContactDetail/Get/{id}` [GET-SupplierAdditionalContactDetail-Get-id] — Gets the specified Supplier Additional Contact Detail based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SupplierAdditionalContactDetailSchema>> {
    return this.executor.request({
      resource: "SupplierAdditionalContactDetail",
      operation: "GetById",
      method: "GET",
      path: `/SupplierAdditionalContactDetail/Get/${encodeURIComponent(String(id))}`,
      responseSchema: SupplierAdditionalContactDetailSchema,
      options,
    });
  }

  /** `POST /SupplierAdditionalContactDetail/Save` [POST-SupplierAdditionalContactDetail-Save] — Saves the specified Supplier Additional Contact Detail. */
  public async save(
    input: z.infer<typeof SupplierAdditionalContactDetailSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SupplierAdditionalContactDetailSchema>> {
    return this.executor.request({
      resource: "SupplierAdditionalContactDetail",
      operation: "Save",
      method: "POST",
      path: "/SupplierAdditionalContactDetail/Save",
      body: input,
      requestSchema: SupplierAdditionalContactDetailSchema,
      responseSchema: SupplierAdditionalContactDetailSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /SupplierAdditionalContactDetail/GetAdditionalContactDetails/{id}` [GET-SupplierAdditionalContactDetail-GetAdditionalContactDetails-id] — Gets the Additional Contacts listing for a specific Supplier. */
  public async getAdditionalContactDetails(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof SupplierAdditionalContactDetailSchema>>> {
    return this.executor.request({
      resource: "SupplierAdditionalContactDetail",
      operation: "GetAdditionalContactDetails",
      method: "GET",
      path: `/SupplierAdditionalContactDetail/GetAdditionalContactDetails/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(SupplierAdditionalContactDetailSchema),
      options,
    });
  }
}

export class SupplierBankDetailService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /SupplierBankDetail/Save` [POST-SupplierBankDetail-Save] — Saves the specified Supplier Bank Detail. */
  public async save(
    input: z.infer<typeof SupplierBankDetailSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SupplierBankDetailSchema>> {
    return this.executor.request({
      resource: "SupplierBankDetail",
      operation: "Save",
      method: "POST",
      path: "/SupplierBankDetail/Save",
      body: input,
      requestSchema: SupplierBankDetailSchema,
      responseSchema: SupplierBankDetailSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /SupplierBankDetail/Get` [GET-SupplierBankDetail-Get] — Gets a List of Supplier Bank Details. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof SupplierBankDetailSchema>>> {
    return this.executor.request({
      resource: "SupplierBankDetail",
      operation: "Get",
      method: "GET",
      path: "/SupplierBankDetail/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(SupplierBankDetailSchema),
      options,
    });
  }

  /** Async page iterator for `GET /SupplierBankDetail/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof SupplierBankDetailSchema>>,
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

  /** Async item iterator for `GET /SupplierBankDetail/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof SupplierBankDetailSchema>, void, undefined> {
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

  /** `GET /SupplierBankDetail/Get/{id}` [GET-SupplierBankDetail-Get-id] — Gets the specified Supplier Bank Detail based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SupplierBankDetailSchema>> {
    return this.executor.request({
      resource: "SupplierBankDetail",
      operation: "GetById",
      method: "GET",
      path: `/SupplierBankDetail/Get/${encodeURIComponent(String(id))}`,
      responseSchema: SupplierBankDetailSchema,
      options,
    });
  }

  /** `DELETE /SupplierBankDetail/Delete/{id}` [DELETE-SupplierBankDetail-Delete-id] — Deletes the specified Supplier Bank Detail, when not in use. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SupplierBankDetail",
      operation: "Delete",
      method: "DELETE",
      path: `/SupplierBankDetail/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class SupplierNoteAttachmentService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /SupplierNoteAttachment/Save` [POST-SupplierNoteAttachment-Save] — Saves the Attachment. The file data is transmitted as a multipart/form-data POST. In the query string of the Url or a parameter in the form post, a SupplierNoteId is required. A SupplierNoteId is the ID of the SupplierNote that this attachment must be linked to. This is Required and is not optional. */
  public async save(
    upload: {
      readonly SupplierNoteId: number | string;
      readonly file: Blob | Uint8Array | string;
      readonly fileName?: string | undefined;
      readonly fieldName?: string | undefined;
    },
    options?: RequestOptions,
  ): Promise<unknown> {
    const formData = new FormData();
    formData.set("SupplierNoteId", String(upload.SupplierNoteId));
    const blob =
      upload.file instanceof Blob
        ? upload.file
        : new Blob([typeof upload.file === "string" ? upload.file : new Uint8Array(upload.file)]);
    formData.set(upload.fieldName ?? "file", blob, upload.fileName ?? "attachment.bin");
    return this.executor.request({
      resource: "SupplierNoteAttachment",
      operation: "Save",
      method: "POST",
      path: "/SupplierNoteAttachment/Save",
      query: buildQueryWithOData({ SupplierNoteId: upload.SupplierNoteId }, options?.odata),
      formData,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /SupplierNoteAttachment/Get/{id}` [GET-SupplierNoteAttachment-Get-id] — Gets the specified Attachment based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof AttachmentSchema>>> {
    return this.executor.request({
      resource: "SupplierNoteAttachment",
      operation: "GetById",
      method: "GET",
      path: `/SupplierNoteAttachment/Get/${encodeURIComponent(String(id))}`,
      responseSchema: z.array(AttachmentSchema),
      options,
    });
  }

  /** `GET /SupplierNoteAttachment/Download/{id}` [GET-SupplierNoteAttachment-Download-id] — Downloads the specified Attachment based on file identifier (Guid). */
  public async download(id: string, options?: RequestOptions): Promise<ArrayBuffer> {
    return this.executor.request({
      resource: "SupplierNoteAttachment",
      operation: "Download",
      method: "GET",
      path: `/SupplierNoteAttachment/Download/${encodeURIComponent(String(id))}`,
      responseType: "binary",
      options,
    });
  }

  /** `GET /SupplierNoteAttachment/GetCompanyStorageInformation` [GET-SupplierNoteAttachment-GetCompanyStorageInformation] — Gets the Company Storage Information. */
  public async getCompanyStorageInformation(
    options?: RequestOptions,
  ): Promise<z.infer<typeof StorageInformationSchema>> {
    return this.executor.request({
      resource: "SupplierNoteAttachment",
      operation: "GetCompanyStorageInformation",
      method: "GET",
      path: "/SupplierNoteAttachment/GetCompanyStorageInformation",
      responseSchema: StorageInformationSchema,
      options,
    });
  }

  /** `DELETE /SupplierNoteAttachment/Delete/{id}` [DELETE-SupplierNoteAttachment-Delete-id] — Deletes the specified Attachment based on file identifier (Guid). */
  public async delete(id: string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SupplierNoteAttachment",
      operation: "Delete",
      method: "DELETE",
      path: `/SupplierNoteAttachment/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /SupplierNoteAttachment/DeleteAll/{id}` [DELETE-SupplierNoteAttachment-DeleteAll-id] — Deletes all Attachments based on the identifier. */
  public async deleteAll(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SupplierNoteAttachment",
      operation: "DeleteAll",
      method: "DELETE",
      path: `/SupplierNoteAttachment/DeleteAll/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /SupplierNoteAttachment/Validate` [POST-SupplierNoteAttachment-Validate] — Validates the specified Entity. */
  public async validate(
    input: z.infer<typeof IModelSchema>,
    options?: RequestOptions,
  ): Promise<void> {
    await this.executor.request({
      resource: "SupplierNoteAttachment",
      operation: "Validate",
      method: "POST",
      path: "/SupplierNoteAttachment/Validate",
      body: input,
      requestSchema: IModelSchema,
      responseType: "empty",
      options,
    });
  }
}

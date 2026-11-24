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

export const SecretarialCompanyRoleSchema = z
  .object({
    ID: z.number().int().optional(),
    Description: z.string(),
  })
  .passthrough();
export type SecretarialCompanyRole = z.infer<typeof SecretarialCompanyRoleSchema>;

export const SecretarialShareClassSchema = z
  .object({
    ID: z.number().int().nullable().optional(),
    ShareClass: z.string().nullable().optional(),
    QuantityOfShares: z.number().int().nullable().optional(),
    NominalValue: z.number().int().nullable().optional(),
    ValueOfShares: z.number().int().nullable().optional(),
  })
  .passthrough();
export type SecretarialShareClass = z.infer<typeof SecretarialShareClassSchema>;

export const SecretarialShareholderSchema = z
  .object({
    ID: z.number().int().nullable().optional(),
    Name: z.string().nullable().optional(),
    IDNumber: z.string().nullable().optional(),
    DateOfBirth: z.string().nullable().optional(),
    Nationality: z.string().nullable().optional(),
    TaxNumber: z.string().nullable().optional(),
    HasOwnership: z.boolean().nullable().optional(),
    OwnershipAppointmentDate: z.string().nullable().optional(),
    OwnershipResignationDate: z.string().nullable().optional(),
    OwnershipHoldingAmount: z.number().int().nullable().optional(),
    Active: z.boolean().nullable().optional(),
    IsPerson: z.boolean().nullable().optional(),
    PostalAddress01: z.string().nullable().optional(),
    PostalAddress02: z.string().nullable().optional(),
    PostalAddress03: z.string().nullable().optional(),
    PostalAddress04: z.string().nullable().optional(),
    PostalAddress05: z.string().nullable().optional(),
    PhysicalAddress01: z.string().nullable().optional(),
    PhysicalAddress02: z.string().nullable().optional(),
    PhysicalAddress03: z.string().nullable().optional(),
    PhysicalAddress04: z.string().nullable().optional(),
    PhysicalAddress05: z.string().nullable().optional(),
    BusinessAddress01: z.string().nullable().optional(),
    BusinessAddress02: z.string().nullable().optional(),
    BusinessAddress03: z.string().nullable().optional(),
    BusinessAddress04: z.string().nullable().optional(),
    BusinessAddress05: z.string().nullable().optional(),
    Telephone: z.string().nullable().optional(),
    Mobile: z.string().nullable().optional(),
    Email: z.string().nullable().optional(),
  })
  .passthrough();
export type SecretarialShareholder = z.infer<typeof SecretarialShareholderSchema>;

export const SecretarialStakeHolderSchema = z
  .object({
    ID: z.number().int().nullable().optional(),
    Name: z.string().nullable().optional(),
    IDNumber: z.string().nullable().optional(),
    DateOfBirth: z.string().nullable().optional(),
    Nationality: z.string().nullable().optional(),
    TaxNumber: z.string().nullable().optional(),
    HasOwnership: z.boolean().nullable().optional(),
    OwnershipAppointmentDate: z.string().nullable().optional(),
    OwnershipResignationDate: z.string().nullable().optional(),
    OwnershipHoldingAmount: z.number().int().nullable().optional(),
    Active: z.boolean().nullable().optional(),
    IsPerson: z.boolean().nullable().optional(),
    PostalAddress01: z.string().nullable().optional(),
    PostalAddress02: z.string().nullable().optional(),
    PostalAddress03: z.string().nullable().optional(),
    PostalAddress04: z.string().nullable().optional(),
    PostalAddress05: z.string().nullable().optional(),
    PhysicalAddress01: z.string().nullable().optional(),
    PhysicalAddress02: z.string().nullable().optional(),
    PhysicalAddress03: z.string().nullable().optional(),
    PhysicalAddress04: z.string().nullable().optional(),
    PhysicalAddress05: z.string().nullable().optional(),
    BusinessAddress01: z.string().nullable().optional(),
    BusinessAddress02: z.string().nullable().optional(),
    BusinessAddress03: z.string().nullable().optional(),
    BusinessAddress04: z.string().nullable().optional(),
    BusinessAddress05: z.string().nullable().optional(),
    Telephone: z.string().nullable().optional(),
    Mobile: z.string().nullable().optional(),
    Email: z.string().nullable().optional(),
  })
  .passthrough();
export type SecretarialStakeHolder = z.infer<typeof SecretarialStakeHolderSchema>;

export class SecretarialCompanyRoleService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `DELETE /SecretarialCompanyRole/Delete/{id}` [DELETE-SecretarialCompanyRole-Delete-id] — Deletes the specified Secretarial Company Role based on the identifier. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SecretarialCompanyRole",
      operation: "Delete",
      method: "DELETE",
      path: `/SecretarialCompanyRole/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /SecretarialCompanyRole/Get` [GET-SecretarialCompanyRole-Get] — Gets a list of all the Secretarial Company Roles. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof SecretarialCompanyRoleSchema>>> {
    return this.executor.request({
      resource: "SecretarialCompanyRole",
      operation: "Get",
      method: "GET",
      path: "/SecretarialCompanyRole/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(SecretarialCompanyRoleSchema),
      options,
    });
  }

  /** Async page iterator for `GET /SecretarialCompanyRole/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof SecretarialCompanyRoleSchema>>,
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

  /** Async item iterator for `GET /SecretarialCompanyRole/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof SecretarialCompanyRoleSchema>, void, undefined> {
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

  /** `GET /SecretarialCompanyRole/Get/{id}` [GET-SecretarialCompanyRole-Get-id] — Gets the specified Secretarial Company Role based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof SecretarialCompanyRoleSchema>> {
    return this.executor.request({
      resource: "SecretarialCompanyRole",
      operation: "GetById",
      method: "GET",
      path: `/SecretarialCompanyRole/Get/${encodeURIComponent(String(id))}`,
      responseSchema: SecretarialCompanyRoleSchema,
      options,
    });
  }
}

export class SecretarialShareClassService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `DELETE /SecretarialShareClass/Delete/{id}` [DELETE-SecretarialShareClass-Delete-id] — Deletes the specified Secretarial Share Class based on the identifier. If the Secretarial Share Class is not in use. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SecretarialShareClass",
      operation: "Delete",
      method: "DELETE",
      path: `/SecretarialShareClass/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /SecretarialShareClass/Get` [GET-SecretarialShareClass-Get] — Gets a list of Secretarial Share Classes. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof SecretarialShareClassSchema>>> {
    return this.executor.request({
      resource: "SecretarialShareClass",
      operation: "Get",
      method: "GET",
      path: "/SecretarialShareClass/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(SecretarialShareClassSchema),
      options,
    });
  }

  /** Async page iterator for `GET /SecretarialShareClass/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof SecretarialShareClassSchema>>,
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

  /** Async item iterator for `GET /SecretarialShareClass/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof SecretarialShareClassSchema>, void, undefined> {
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

export class SecretarialShareholderService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /SecretarialShareholder/Get` [GET-SecretarialShareholder-Get] — Gets a list of Secretarial Shareholders. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof SecretarialShareholderSchema>>> {
    return this.executor.request({
      resource: "SecretarialShareholder",
      operation: "Get",
      method: "GET",
      path: "/SecretarialShareholder/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(SecretarialShareholderSchema),
      options,
    });
  }

  /** Async page iterator for `GET /SecretarialShareholder/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof SecretarialShareholderSchema>>,
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

  /** Async item iterator for `GET /SecretarialShareholder/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof SecretarialShareholderSchema>, void, undefined> {
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

export class SecretarialStakeHolderService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `DELETE /SecretarialStakeHolder/Delete/{id}` [DELETE-SecretarialStakeHolder-Delete-id] — Deletes the specified Secretarial Stake Holder. */
  public async delete(id: number | string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "SecretarialStakeHolder",
      operation: "Delete",
      method: "DELETE",
      path: `/SecretarialStakeHolder/Delete/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /SecretarialStakeHolder/Get` [GET-SecretarialStakeHolder-Get] — Gets a list of Secretarial Stake Holders. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof SecretarialStakeHolderSchema>>> {
    return this.executor.request({
      resource: "SecretarialStakeHolder",
      operation: "Get",
      method: "GET",
      path: "/SecretarialStakeHolder/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(SecretarialStakeHolderSchema),
      options,
    });
  }

  /** Async page iterator for `GET /SecretarialStakeHolder/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof SecretarialStakeHolderSchema>>,
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

  /** Async item iterator for `GET /SecretarialStakeHolder/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof SecretarialStakeHolderSchema>, void, undefined> {
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

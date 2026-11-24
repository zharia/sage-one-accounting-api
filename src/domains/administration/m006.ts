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

export const CitySchema = z
  .object({
    ID: z.number().int().optional(),
    CountryId: z.number().int().optional(),
    Name: z.string().optional(),
  })
  .passthrough();
export type City = z.infer<typeof CitySchema>;

export const CurrencyResponseSchema = z
  .object({
    ID: z.number().int().nullable().optional(),
    Code: z.string().nullable().optional(),
    Description: z.string().nullable().optional(),
    Symbol: z.string().nullable().optional(),
  })
  .passthrough();
export type CurrencyResponse = z.infer<typeof CurrencyResponseSchema>;

export const DateFormatSchema = z
  .object({
    ID: z.number().int().optional(),
    DisplayAs: z.string().optional(),
    DotNetFormat: z.string().optional(),
    DotNetAltFormats: z.string().optional(),
    JSFormat: z.string().optional(),
    JSAltFormats: z.string().optional(),
  })
  .passthrough();
export type DateFormat = z.infer<typeof DateFormatSchema>;

export const DeveloperDataSchema = z
  .object({
    Key: z.string().optional(),
    Data: z.string().optional(),
    Created: z.string().optional(),
    Modified: z.string().optional(),
  })
  .passthrough();
export type DeveloperData = z.infer<typeof DeveloperDataSchema>;

export const ExchangeRateResponseSchema = z
  .object({
    IsBaseCurrency: z.boolean().nullable().optional(),
    BaseCurrencyCode: z.string().nullable().optional(),
    CurrencyCode: z.string().nullable().optional(),
    CurrencyDescription: z.string().nullable().optional(),
    CurrencySymbol: z.string().nullable().optional(),
    HasActivity: z.boolean().nullable().optional(),
    IsFutureRate: z.boolean().nullable().optional(),
    RateInverse: z.number().nullable().optional(),
    OriginalRateInverse: z.number().nullable().optional(),
    GroupId: z.string().nullable().optional(),
    RateDate: z.string().nullable().optional(),
    ExchangeRateId: z.number().int().nullable().optional(),
    CurrencyId: z.number().int().nullable().optional(),
    Rate: z.number().int().nullable().optional(),
    OriginalRate: z.number().int().nullable().optional(),
    HasManualRate: z.boolean().nullable().optional(),
    Note: z.string().nullable().optional(),
  })
  .passthrough();
export type ExchangeRateResponse = z.infer<typeof ExchangeRateResponseSchema>;

export const ScheduleFrequencySchema = z
  .object({
    ID: z.number().int().nullable().optional(),
    Description: z.string().nullable().optional(),
  })
  .passthrough();
export type ScheduleFrequency = z.infer<typeof ScheduleFrequencySchema>;

export const SupportRequestUrlAuditTrailSchema = z
  .object({
    ID: z.number().int().optional(),
    Username: z.string().optional(),
    SupportRequestUID: z.string().optional(),
    CompanyId: z.number().int().optional(),
    UserId: z.number().int().optional(),
    Title: z.string().optional(),
    Url: z.string().optional(),
    Created: z.string().optional(),
  })
  .passthrough();
export type SupportRequestUrlAuditTrail = z.infer<typeof SupportRequestUrlAuditTrailSchema>;

export const UserDefinedFieldSchema = z
  .object({
    ID: z.number().int().nullable().optional(),
    UserDefinedType: z.number().int().nullable().optional(),
    TextField1: z.string().nullable().optional(),
    TextField2: z.string().nullable().optional(),
    TextField3: z.string().nullable().optional(),
    NumberField1: z.string().nullable().optional(),
    NumberField2: z.string().nullable().optional(),
    NumberField3: z.string().nullable().optional(),
    BoolField1: z.string().nullable().optional(),
    BoolField2: z.string().nullable().optional(),
    BoolField3: z.string().nullable().optional(),
    DateField1: z.string().nullable().optional(),
    DateField2: z.string().nullable().optional(),
    DateField3: z.string().nullable().optional(),
  })
  .passthrough();
export type UserDefinedField = z.infer<typeof UserDefinedFieldSchema>;

export const UserExistanceSchema = z
  .object({
    UserInSageId: z.boolean().optional(),
  })
  .passthrough();
export type UserExistance = z.infer<typeof UserExistanceSchema>;

export class CityService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /City/Get` [GET-City-Get] — Gets a list of Cities. */
  public async list(options?: RequestOptions): Promise<SagePage<z.infer<typeof CitySchema>>> {
    return this.executor.request({
      resource: "City",
      operation: "Get",
      method: "GET",
      path: "/City/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(CitySchema),
      options,
    });
  }

  /** Async page iterator for `GET /City/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof CitySchema>>, void, undefined> {
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

  /** Async item iterator for `GET /City/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof CitySchema>, void, undefined> {
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

  /** `GET /City/Get/{id}` [GET-City-Get-id] — Gets the specified identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof CitySchema>> {
    return this.executor.request({
      resource: "City",
      operation: "GetById",
      method: "GET",
      path: `/City/Get/${encodeURIComponent(String(id))}`,
      responseSchema: CitySchema,
      options,
    });
  }
}

export class CurrencyService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /Currency/Get` [GET-Currency-Get] — Get all currencies for the company. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof CurrencyResponseSchema>>> {
    return this.executor.request({
      resource: "Currency",
      operation: "Get",
      method: "GET",
      path: "/Currency/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(CurrencyResponseSchema),
      options,
    });
  }

  /** Async page iterator for `GET /Currency/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof CurrencyResponseSchema>>,
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

  /** Async item iterator for `GET /Currency/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof CurrencyResponseSchema>, void, undefined> {
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

  /** `GET /Currency/Get/{id}` [GET-Currency-Get-id] — Gets the specified Currency based on the identifier. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof CurrencyResponseSchema>>> {
    return this.executor.request({
      resource: "Currency",
      operation: "GetById",
      method: "GET",
      path: `/Currency/Get/${encodeURIComponent(String(id))}`,
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(CurrencyResponseSchema),
      options,
    });
  }
}

export class DateFormatService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /DateFormat/Get` [GET-DateFormat-Get] — Gets a list of Date Formats. */
  public async list(options?: RequestOptions): Promise<SagePage<z.infer<typeof DateFormatSchema>>> {
    return this.executor.request({
      resource: "DateFormat",
      operation: "Get",
      method: "GET",
      path: "/DateFormat/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(DateFormatSchema),
      options,
    });
  }

  /** Async page iterator for `GET /DateFormat/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<PageIterationEnvelope<z.infer<typeof DateFormatSchema>>, void, undefined> {
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

  /** Async item iterator for `GET /DateFormat/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof DateFormatSchema>, void, undefined> {
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

  /** `GET /DateFormat/Get/{id}` [GET-DateFormat-Get-id] — Gets a specified Date Format. */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof DateFormatSchema>> {
    return this.executor.request({
      resource: "DateFormat",
      operation: "GetById",
      method: "GET",
      path: `/DateFormat/Get/${encodeURIComponent(String(id))}`,
      responseSchema: DateFormatSchema,
      options,
    });
  }
}

export class DeveloperDataService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /DeveloperData/SaveUserData` [POST-DeveloperData-SaveUserData] — No documentation available. */
  public async saveUserData(
    input: z.infer<typeof DeveloperDataSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof DeveloperDataSchema>> {
    return this.executor.request({
      resource: "DeveloperData",
      operation: "SaveUserData",
      method: "POST",
      path: "/DeveloperData/SaveUserData",
      body: input,
      requestSchema: DeveloperDataSchema,
      responseSchema: DeveloperDataSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /DeveloperData/SaveRegistrationData` [POST-DeveloperData-SaveRegistrationData] — No documentation available. */
  public async saveRegistrationData(
    input: z.infer<typeof DeveloperDataSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof DeveloperDataSchema>> {
    return this.executor.request({
      resource: "DeveloperData",
      operation: "SaveRegistrationData",
      method: "POST",
      path: "/DeveloperData/SaveRegistrationData",
      body: input,
      requestSchema: DeveloperDataSchema,
      responseSchema: DeveloperDataSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `POST /DeveloperData/SaveCompanyData` [POST-DeveloperData-SaveCompanyData] — No documentation available. */
  public async saveCompanyData(
    input: z.infer<typeof DeveloperDataSchema>,
    options?: RequestOptions,
  ): Promise<z.infer<typeof DeveloperDataSchema>> {
    return this.executor.request({
      resource: "DeveloperData",
      operation: "SaveCompanyData",
      method: "POST",
      path: "/DeveloperData/SaveCompanyData",
      body: input,
      requestSchema: DeveloperDataSchema,
      responseSchema: DeveloperDataSchema,
      isFinancialMutation: true,
      options,
    });
  }

  /** `GET /DeveloperData/GetUserData` [GET-DeveloperData-GetUserData] — No documentation available. */
  public async listUserData(
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof DeveloperDataSchema>>> {
    return this.executor.request({
      resource: "DeveloperData",
      operation: "GetUserData",
      method: "GET",
      path: "/DeveloperData/GetUserData",
      responseSchema: z.array(DeveloperDataSchema),
      options,
    });
  }

  /** `GET /DeveloperData/GetUserData/{id}` [GET-DeveloperData-GetUserData-id] — No documentation available. */
  public async getUserDataById(
    id: string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof DeveloperDataSchema>> {
    return this.executor.request({
      resource: "DeveloperData",
      operation: "GetUserData",
      method: "GET",
      path: `/DeveloperData/GetUserData/${encodeURIComponent(String(id))}`,
      responseSchema: DeveloperDataSchema,
      options,
    });
  }

  /** `GET /DeveloperData/GetRegistrationData` [GET-DeveloperData-GetRegistrationData] — No documentation available. */
  public async listRegistrationData(
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof DeveloperDataSchema>>> {
    return this.executor.request({
      resource: "DeveloperData",
      operation: "GetRegistrationData",
      method: "GET",
      path: "/DeveloperData/GetRegistrationData",
      responseSchema: z.array(DeveloperDataSchema),
      options,
    });
  }

  /** `GET /DeveloperData/GetRegistrationData/{id}` [GET-DeveloperData-GetRegistrationData-id] — No documentation available. */
  public async getRegistrationDataById(
    id: string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof DeveloperDataSchema>> {
    return this.executor.request({
      resource: "DeveloperData",
      operation: "GetRegistrationData",
      method: "GET",
      path: `/DeveloperData/GetRegistrationData/${encodeURIComponent(String(id))}`,
      responseSchema: DeveloperDataSchema,
      options,
    });
  }

  /** `GET /DeveloperData/GetCompanyData` [GET-DeveloperData-GetCompanyData] — No documentation available. */
  public async listCompanyData(
    options?: RequestOptions,
  ): Promise<Array<z.infer<typeof DeveloperDataSchema>>> {
    return this.executor.request({
      resource: "DeveloperData",
      operation: "GetCompanyData",
      method: "GET",
      path: "/DeveloperData/GetCompanyData",
      responseSchema: z.array(DeveloperDataSchema),
      options,
    });
  }

  /** `GET /DeveloperData/GetCompanyData/{id}` [GET-DeveloperData-GetCompanyData-id] — No documentation available. */
  public async getCompanyDataById(
    id: string,
    options?: RequestOptions,
  ): Promise<z.infer<typeof DeveloperDataSchema>> {
    return this.executor.request({
      resource: "DeveloperData",
      operation: "GetCompanyData",
      method: "GET",
      path: `/DeveloperData/GetCompanyData/${encodeURIComponent(String(id))}`,
      responseSchema: DeveloperDataSchema,
      options,
    });
  }

  /** `DELETE /DeveloperData/DeleteUserData/{id}` [DELETE-DeveloperData-DeleteUserData-id] — No documentation available. */
  public async deleteUserData(id: string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "DeveloperData",
      operation: "DeleteUserData",
      method: "DELETE",
      path: `/DeveloperData/DeleteUserData/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /DeveloperData/DeleteRegistrationData/{id}` [DELETE-DeveloperData-DeleteRegistrationData-id] — No documentation available. */
  public async deleteRegistrationData(id: string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "DeveloperData",
      operation: "DeleteRegistrationData",
      method: "DELETE",
      path: `/DeveloperData/DeleteRegistrationData/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }

  /** `DELETE /DeveloperData/DeleteCompanyData/{id}` [DELETE-DeveloperData-DeleteCompanyData-id] — No documentation available. */
  public async deleteCompanyData(id: string, options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "DeveloperData",
      operation: "DeleteCompanyData",
      method: "DELETE",
      path: `/DeveloperData/DeleteCompanyData/${encodeURIComponent(String(id))}`,
      responseType: "empty",
      isFinancialMutation: true,
      options,
    });
  }
}

export class ExchangeRatesService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /ExchangeRates/Get` [GET-ExchangeRates-Get_date_currencyIds] — Gets the Exchange Rates for the Date and comma seperated Currency IDs (if supplied). If not it returns all currencies with today's exchange rate. */
  public async list(
    options?: RequestOptions & {
      readonly date?: string | number | undefined;
      readonly currencyIds?: string | number | undefined;
    },
  ): Promise<SagePage<z.infer<typeof ExchangeRateResponseSchema>>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.date !== undefined) {
      baseQuery["date"] = options.date;
    }
    if (options?.currencyIds !== undefined) {
      baseQuery["currencyIds"] = options.currencyIds;
    }
    return this.executor.request({
      resource: "ExchangeRates",
      operation: "Get",
      method: "GET",
      path: "/ExchangeRates/Get",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: createSagePageSchema(ExchangeRateResponseSchema),
      options,
    });
  }

  /** Async page iterator for `GET /ExchangeRates/Get`. */
  public pages(
    options?: RequestOptions & {
      readonly date?: string | number | undefined;
      readonly currencyIds?: string | number | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof ExchangeRateResponseSchema>>,
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

  /** Async item iterator for `GET /ExchangeRates/Get`. */
  public iterate(
    options?: RequestOptions & {
      readonly date?: string | number | undefined;
      readonly currencyIds?: string | number | undefined;
    } & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof ExchangeRateResponseSchema>, void, undefined> {
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

export class LocalizationService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /Localization/Get` [POST-Localization-Get] — No documentation available. */
  public async get(input: number, options?: RequestOptions): Promise<unknown> {
    return this.executor.request({
      resource: "Localization",
      operation: "Get",
      method: "POST",
      path: "/Localization/Get",
      body: input,
      requestSchema: z.number(),
      options,
    });
  }
}

export class ScheduleFrequencyService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /ScheduleFrequency/Get` [GET-ScheduleFrequency-Get] — Retrieves a collection of Schedule Frequencies. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof ScheduleFrequencySchema>>> {
    return this.executor.request({
      resource: "ScheduleFrequency",
      operation: "Get",
      method: "GET",
      path: "/ScheduleFrequency/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(ScheduleFrequencySchema),
      options,
    });
  }

  /** Async page iterator for `GET /ScheduleFrequency/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof ScheduleFrequencySchema>>,
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

  /** Async item iterator for `GET /ScheduleFrequency/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof ScheduleFrequencySchema>, void, undefined> {
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

export class UserDefinedFieldService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /UserDefinedField/Get` [GET-UserDefinedField-Get] — Gets a list of User Defined Fields. */
  public async list(
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof UserDefinedFieldSchema>>> {
    return this.executor.request({
      resource: "UserDefinedField",
      operation: "Get",
      method: "GET",
      path: "/UserDefinedField/Get",
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(UserDefinedFieldSchema),
      options,
    });
  }

  /** Async page iterator for `GET /UserDefinedField/Get`. */
  public pages(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<
    PageIterationEnvelope<z.infer<typeof UserDefinedFieldSchema>>,
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

  /** Async item iterator for `GET /UserDefinedField/Get`. */
  public iterate(
    options?: RequestOptions & PaginationOptions,
  ): AsyncGenerator<z.infer<typeof UserDefinedFieldSchema>, void, undefined> {
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

  /** `GET /UserDefinedField/Get/{id}` [GET-UserDefinedField-Get-id] — Gets User Defined Field for the specified id */
  public async get(
    id: number | string,
    options?: RequestOptions,
  ): Promise<SagePage<z.infer<typeof UserDefinedFieldSchema>>> {
    return this.executor.request({
      resource: "UserDefinedField",
      operation: "GetById",
      method: "GET",
      path: `/UserDefinedField/Get/${encodeURIComponent(String(id))}`,
      query: buildQueryWithOData(undefined, options?.odata),
      responseSchema: createSagePageSchema(UserDefinedFieldSchema),
      options,
    });
  }
}

export class SageIdUserService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /SageIdUser/SageIdWithEmail` [GET-SageIdUser-SageIdWithEmail_username] — No documentation available. */
  public async sageIdWithEmail(
    options?: RequestOptions & { readonly username?: string | number | undefined },
  ): Promise<z.infer<typeof UserExistanceSchema>> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.username !== undefined) {
      baseQuery["username"] = options.username;
    }
    return this.executor.request({
      resource: "SageIdUser",
      operation: "SageIdWithEmail",
      method: "GET",
      path: "/SageIdUser/SageIdWithEmail",
      query: buildQueryWithOData(baseQuery, options?.odata),
      responseSchema: UserExistanceSchema,
      requiresAuthentication: false,
      options,
    });
  }
}

export class SupportLoginAuditService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /SupportLoginAudit/Save` [POST-SupportLoginAudit-Save] — No documentation available. */
  public async save(
    input: z.infer<typeof SupportRequestUrlAuditTrailSchema>,
    options?: RequestOptions,
  ): Promise<unknown> {
    return this.executor.request({
      resource: "SupportLoginAudit",
      operation: "Save",
      method: "POST",
      path: "/SupportLoginAudit/Save",
      body: input,
      requestSchema: SupportRequestUrlAuditTrailSchema,
      requiresAuthentication: false,
      isFinancialMutation: true,
      options,
    });
  }
}

export class CoreEventsService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `PUT /CoreEvents/Subscribe` [PUT-CoreEvents-Subscribe] — No documentation available. */
  public async subscribe(options?: RequestOptions): Promise<void> {
    await this.executor.request({
      resource: "CoreEvents",
      operation: "Subscribe",
      method: "PUT",
      path: "/CoreEvents/Subscribe",
      responseType: "empty",
      requiresAuthentication: false,
      isFinancialMutation: true,
      options,
    });
  }
}

export class CoreTokensService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `DELETE /CoreTokens/Delete` [DELETE-CoreTokens-Delete_token] — No documentation available. */
  public async delete(
    options?: RequestOptions & { readonly token?: string | number | undefined },
  ): Promise<unknown> {
    const baseQuery: Record<string, string | number | boolean | undefined> = {};
    if (options?.token !== undefined) {
      baseQuery["token"] = options.token;
    }
    return this.executor.request({
      resource: "CoreTokens",
      operation: "Delete",
      method: "DELETE",
      path: "/CoreTokens/Delete",
      query: buildQueryWithOData(baseQuery, options?.odata),
      requiresAuthentication: false,
      isFinancialMutation: true,
      options,
    });
  }
}

export class PayrollService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `POST /Payroll/ReceivePayrollWebhook` [POST-Payroll-ReceivePayrollWebhook] — No documentation available. */
  public async receivePayrollWebhook(input?: unknown, options?: RequestOptions): Promise<unknown> {
    return this.executor.request({
      resource: "Payroll",
      operation: "ReceivePayrollWebhook",
      method: "POST",
      path: "/Payroll/ReceivePayrollWebhook",
      body: input,
      requiresAuthentication: false,
      isFinancialMutation: true,
      options,
    });
  }
}

export class TestService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /** `GET /Test/Get` [GET-Test-Get] — No documentation available. */
  public async get(options?: RequestOptions): Promise<unknown> {
    return this.executor.request({
      resource: "Test",
      operation: "Get",
      method: "GET",
      path: "/Test/Get",
      requiresAuthentication: false,
      options,
    });
  }

  /** `GET /Test/Policy` [GET-Test-Policy] — No documentation available. */
  public async policy(options?: RequestOptions): Promise<unknown> {
    return this.executor.request({
      resource: "Test",
      operation: "Policy",
      method: "GET",
      path: "/Test/Policy",
      requiresAuthentication: false,
      options,
    });
  }
}

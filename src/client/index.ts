/**
 * Primary developer-facing client for `@bytemoney/sage-one` (spec §12, ADR-001).
 */

import {
  type AuthenticationResult,
  BasicAndApiKeyAuthenticator,
  type SageAuthenticator,
} from "../auth/index.js";
import {
  type ResolvedSageOneConfig,
  resolveConfig,
  type SageOneConfigInput,
} from "../config/index.js";
import {
  AccountBalancesService,
  AccountCategoriesService,
  AccountNotesService,
  AccountOpeningBalancesService,
  AccountsService,
} from "../domains/accounting/index.js";
import { LoginService } from "../domains/administration/index.js";
import {
  CompanyEntityTypesService,
  CompanyNotesService,
  CompanyService,
} from "../domains/company/index.js";
import {
  CustomerCategoriesService,
  CustomerNotesService,
  CustomerOpeningBalancesService,
  CustomersService,
  CustomerStatementsService,
} from "../domains/customers/index.js";
import type { DomainOperationSpec, SageRequestExecutor } from "../domains/executor.js";
import {
  ItemCategoriesService,
  ItemNotesService,
  ItemOpeningBalancesService,
  ItemsService,
} from "../domains/inventory/index.js";
import {
  SupplierCategoriesService,
  SupplierNotesService,
  SupplierOpeningBalancesService,
  SuppliersService,
  SupplierStatementsService,
} from "../domains/suppliers/index.js";
import { TaxTypesService } from "../domains/taxation/index.js";
import {
  createPinoLogger,
  NOOP_LOGGER,
  RedactingLogger,
  type SageLogger,
} from "../logging/index.js";
import { SageTransport } from "../transport/index.js";

export interface SageOneClientConfig extends SageOneConfigInput {
  readonly authenticator?: SageAuthenticator | undefined;
  readonly logger?: SageLogger | undefined;
}

export class SageOneClient implements SageRequestExecutor {
  public readonly config: ResolvedSageOneConfig;
  public readonly authenticator: SageAuthenticator;
  public readonly logger: SageLogger;
  public readonly transport: SageTransport;

  public readonly login: LoginService;
  public readonly accounts: AccountsService;
  public readonly accountCategories: AccountCategoriesService;
  public readonly accountBalances: AccountBalancesService;
  public readonly accountOpeningBalances: AccountOpeningBalancesService;
  public readonly accountNotes: AccountNotesService;

  public readonly company: CompanyService;
  public readonly companyEntityTypes: CompanyEntityTypesService;
  public readonly companyNotes: CompanyNotesService;

  public readonly customers: CustomersService;
  public readonly customerCategories: CustomerCategoriesService;
  public readonly customerOpeningBalances: CustomerOpeningBalancesService;
  public readonly customerStatements: CustomerStatementsService;
  public readonly customerNotes: CustomerNotesService;

  public readonly suppliers: SuppliersService;
  public readonly supplierCategories: SupplierCategoriesService;
  public readonly supplierOpeningBalances: SupplierOpeningBalancesService;
  public readonly supplierStatements: SupplierStatementsService;
  public readonly supplierNotes: SupplierNotesService;

  public readonly taxTypes: TaxTypesService;

  public readonly items: ItemsService;
  public readonly itemCategories: ItemCategoriesService;
  public readonly itemOpeningBalances: ItemOpeningBalancesService;
  public readonly itemNotes: ItemNotesService;

  public constructor(configInput: SageOneClientConfig = {}) {
    const { authenticator: customAuthenticator, logger: customLogger, ...rawConfig } = configInput;
    this.config = resolveConfig(rawConfig);

    if (customLogger) {
      this.logger = new RedactingLogger(
        customLogger,
        this.config.logging.enabled ? this.config.logging.level : "warn",
      );
    } else if (this.config.logging.enabled) {
      this.logger = createPinoLogger(this.config.logging.level);
    } else {
      this.logger = NOOP_LOGGER;
    }

    this.authenticator =
      customAuthenticator ??
      new BasicAndApiKeyAuthenticator({
        credentials: this.config.credentials,
        apiKey: this.config.apiKey,
        companyId: this.config.companyId,
        logger: this.logger,
      });

    this.transport = new SageTransport({
      config: this.config,
      authenticator: this.authenticator,
      logger: this.logger,
    });

    this.login = new LoginService(this);
    this.accounts = new AccountsService(this);
    this.accountCategories = new AccountCategoriesService(this);
    this.accountBalances = new AccountBalancesService(this);
    this.accountOpeningBalances = new AccountOpeningBalancesService(this);
    this.accountNotes = new AccountNotesService(this);

    this.company = new CompanyService(this);
    this.companyEntityTypes = new CompanyEntityTypesService(this);
    this.companyNotes = new CompanyNotesService(this);

    this.customers = new CustomersService(this);
    this.customerCategories = new CustomerCategoriesService(this);
    this.customerOpeningBalances = new CustomerOpeningBalancesService(this);
    this.customerStatements = new CustomerStatementsService(this);
    this.customerNotes = new CustomerNotesService(this);

    this.suppliers = new SuppliersService(this);
    this.supplierCategories = new SupplierCategoriesService(this);
    this.supplierOpeningBalances = new SupplierOpeningBalancesService(this);
    this.supplierStatements = new SupplierStatementsService(this);
    this.supplierNotes = new SupplierNotesService(this);

    this.taxTypes = new TaxTypesService(this);

    this.items = new ItemsService(this);
    this.itemCategories = new ItemCategoriesService(this);
    this.itemOpeningBalances = new ItemOpeningBalancesService(this);
    this.itemNotes = new ItemNotesService(this);
  }

  /**
   * Executes a domain operation through the shared HTTP transport pipeline.
   */
  public async request<TReq = unknown, TRes = unknown>(
    spec: DomainOperationSpec<TReq, TRes>,
  ): Promise<TRes> {
    return this.transport.execute<TReq, TRes>({
      resource: spec.resource,
      operation: spec.operation,
      method: spec.method,
      path: spec.path,
      query: spec.query,
      body: spec.body,
      formData: spec.formData,
      requestSchema: spec.requestSchema,
      responseSchema: spec.responseSchema,
      responseType: spec.responseType,
      requiresAuthentication: spec.requiresAuthentication,
      isFinancialMutation: spec.isFinancialMutation,
      companyId: spec.options?.companyId,
      timeout: spec.options?.timeout,
      signal: spec.options?.signal,
      headers: spec.options?.headers,
    });
  }

  /**
   * Verifies configured credentials against `POST /Login/Validate` via the active `SageAuthenticator`.
   */
  public async verifyAuthentication(options?: {
    readonly signal?: AbortSignal | undefined;
  }): Promise<AuthenticationResult> {
    return this.authenticator.authenticate({
      baseUrl: this.config.baseUrl,
      apiKey: this.config.apiKey,
      companyId: this.config.companyId,
      fetch: this.config.fetch,
      signal: options?.signal,
    });
  }
}


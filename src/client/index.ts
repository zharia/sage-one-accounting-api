/**
 * Primary developer-facing client for `@bytemoney/sage-one` (spec §12, ADR-001).
 * Exposes all 162 catalogued Sage One Accounting API 2.0.0 services (622 operations).
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
  AccountNoteAttachmentService,
  AccountNotesService,
  AccountOpeningBalancesService,
  AccountPaymentService,
  AccountReceiptService,
  AccountsService,
  AnalysisCategoryService,
  AnalysisTypeService,
  BudgetService,
  DetailedLedgerTransactionService,
  FinancialYearService,
  JournalEntryService,
  RecurringJournalService,
  ReportingGroupService,
  TakeOnBalanceService,
} from "../domains/accounting/index.js";
import {
  CityService,
  CoreEventsService,
  CoreTokensService,
  CurrencyService,
  DateFormatService,
  DeveloperDataService,
  ExchangeRatesService,
  LocalizationService,
  LoginService,
  PayrollService,
  SageIdUserService,
  ScheduleFrequencyService,
  SupportLoginAuditService,
  TestService,
  UserDefinedFieldService,
} from "../domains/administration/index.js";
import {
  AssetCategoryService,
  AssetLocationService,
  AssetNoteService,
  AssetService,
} from "../domains/assets/index.js";
import {
  BankAccountCategoryService,
  BankAccountNoteAttachmentService,
  BankAccountNoteService,
  BankAccountOpeningBalanceService,
  BankAccountService,
  BankAccountTransactionListingService,
  BankImportMappingService,
  BankStatementTransactionService,
  BankTransactionAttachmentService,
  BankTransactionService,
  CashMovementService,
  ProcessBankAndCreditCardMappingService,
} from "../domains/banking/index.js";
import {
  CompanyEntityTypesService,
  CompanyNotesService,
  CompanyService,
  SecretarialCompanyRoleService,
  SecretarialShareClassService,
  SecretarialShareholderService,
  SecretarialStakeHolderService,
} from "../domains/company/index.js";
import {
  AccountantEventService,
  AccountantNoteAttachmentService,
  AccountantNoteService,
  AccountantTaskRecurrenceService,
  AccountantTaskService,
  CRMActivityCategoryService,
  CRMActivityService,
  ToDoListService,
} from "../domains/crm/index.js";
import {
  AllocationService,
  CustomerAdditionalContactDetailService,
  CustomerAdditionalContactOptionsService,
  CustomerAdjustmentService,
  CustomerAgeingService,
  CustomerCategoriesService,
  CustomerNoteAttachmentService,
  CustomerNotesService,
  CustomerOpeningBalancesService,
  CustomerReceiptService,
  CustomerReturnAttachmentService,
  CustomerReturnService,
  CustomerSalesHistoryService,
  CustomerStatementsService,
  CustomerTransactionListingService,
  CustomerWriteOffService,
  CustomerZoneService,
  CustomersService,
  DashboardDebtorsManagerService,
  OutstandingCustomerDocumentService,
} from "../domains/customers/index.js";
import {
  AdditionalItemPriceService,
  AdditionalPriceListService,
  ItemAdjustmentService,
  ItemAttachmentService,
  ItemBundleService,
  ItemCategoriesService,
  ItemMovementService,
  ItemNoteAttachmentService,
  ItemNotesService,
  ItemOpeningBalancesService,
  ItemReportGroupService,
  ItemsService,
  PriceListingReportService,
  PurchasesByItemService,
  SalesByItemService,
} from "../domains/inventory/index.js";
import {
  OutstandingSupplierDocumentService,
  PurchaseOrderAttachmentService,
  PurchaseOrderService,
  SupplierAdjustmentService,
  SupplierAgeingService,
  SupplierInvoiceAttachmentService,
  SupplierInvoiceService,
  SupplierPaymentService,
  SupplierPurchaseHistoryService,
  SupplierReturnAttachmentService,
  SupplierReturnService,
  SupplierTransactionListingService,
} from "../domains/purchases/index.js";
import {
  BalanceSheetService,
  FinalAccountsService,
  IncomeVsExpenseService,
  ProfitAndLossService,
  SalesBySalesRepresentativeService,
  TopCustomersByOutstandingBalanceService,
  TopCustomersBySalesService,
  TopPurchasedItemsService,
  TopSellingItemsByValueOnHandService,
  TopSellingItemsService,
  TopSuppliersByOutstandingBalanceService,
  TopSuppliersByPurchasesService,
  TrialBalanceExportMappingService,
  TrialBalanceService,
} from "../domains/reporting/index.js";
import {
  AttachmentService,
  DocumentFileAttachmentService,
  DocumentHeaderNoteService,
  DocumentHistoryService,
  DocumentMessageService,
  DocumentNumberService,
  DocumentUserDefinedFieldsService,
  EmailSignatureTemplateService,
  EmailTemplatePlaceHolderService,
  QuoteAttachmentService,
  QuoteService,
  RecurringInvoiceService,
  SalesOrderAttachmentService,
  SalesOrderService,
  SalesRepresentativeNoteService,
  SalesRepresentativeService,
  TaxInvoiceAttachmentService,
  TaxInvoiceService,
} from "../domains/sales/index.js";
import {
  SupplierAdditionalContactDetailService,
  SupplierBankDetailService,
  SupplierCategoriesService,
  SupplierNoteAttachmentService,
  SupplierNotesService,
  SupplierOpeningBalancesService,
  SupplierStatementsService,
  SuppliersService,
} from "../domains/suppliers/index.js";
import {
  BASReportService,
  TaxAdjustmentService,
  TaxPeriodService,
  TaxRateAdjustmentService,
  TaxTypesService,
  VAT201ReportService,
} from "../domains/taxation/index.js";
import {
  TimeTrackingCustomerService,
  TimeTrackingExpenseService,
  TimeTrackingProjectService,
  TimeTrackingTaskService,
  TimeTrackingTimesheetService,
  TimeTrackingUserService,
} from "../domains/time-tracking/index.js";
import type { DomainOperationSpec, SageRequestExecutor } from "../domains/executor.js";
import {
  createPinoLogger,
  NOOP_LOGGER,
  RedactingLogger,
  type SageLogger,
} from "../logging/index.js";
import { SageTransport, type SchedulerSnapshot } from "../transport/index.js";

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
  public readonly quotes: QuoteService;
  public readonly quoteAttachments: QuoteAttachmentService;
  public readonly taxInvoices: TaxInvoiceService;
  public readonly taxInvoiceAttachments: TaxInvoiceAttachmentService;
  public readonly salesOrders: SalesOrderService;
  public readonly salesOrderAttachments: SalesOrderAttachmentService;
  public readonly recurringInvoices: RecurringInvoiceService;
  public readonly salesRepresentatives: SalesRepresentativeService;
  public readonly salesRepresentativeNotes: SalesRepresentativeNoteService;
  public readonly documentNumbers: DocumentNumberService;
  public readonly documentMessages: DocumentMessageService;
  public readonly documentHeaderNotes: DocumentHeaderNoteService;
  public readonly documentHistories: DocumentHistoryService;
  public readonly documentUserDefinedFields: DocumentUserDefinedFieldsService;
  public readonly documentFileAttachments: DocumentFileAttachmentService;
  public readonly attachments: AttachmentService;
  public readonly emailSignatureTemplates: EmailSignatureTemplateService;
  public readonly emailTemplatePlaceHolders: EmailTemplatePlaceHolderService;
  public readonly purchaseOrders: PurchaseOrderService;
  public readonly purchaseOrderAttachments: PurchaseOrderAttachmentService;
  public readonly supplierInvoices: SupplierInvoiceService;
  public readonly supplierInvoiceAttachments: SupplierInvoiceAttachmentService;
  public readonly supplierPayments: SupplierPaymentService;
  public readonly supplierReturns: SupplierReturnService;
  public readonly supplierReturnAttachments: SupplierReturnAttachmentService;
  public readonly supplierAdjustments: SupplierAdjustmentService;
  public readonly outstandingSupplierDocuments: OutstandingSupplierDocumentService;
  public readonly supplierAgeing: SupplierAgeingService;
  public readonly supplierTransactionListing: SupplierTransactionListingService;
  public readonly supplierPurchaseHistories: SupplierPurchaseHistoryService;
  public readonly customerReceipts: CustomerReceiptService;
  public readonly customerReturns: CustomerReturnService;
  public readonly customerReturnAttachments: CustomerReturnAttachmentService;
  public readonly customerAdjustments: CustomerAdjustmentService;
  public readonly customerWriteOffs: CustomerWriteOffService;
  public readonly allocations: AllocationService;
  public readonly outstandingCustomerDocuments: OutstandingCustomerDocumentService;
  public readonly customerAgeing: CustomerAgeingService;
  public readonly customerTransactionListing: CustomerTransactionListingService;
  public readonly customerSalesHistories: CustomerSalesHistoryService;
  public readonly customerZones: CustomerZoneService;
  public readonly customerAdditionalContactDetails: CustomerAdditionalContactDetailService;
  public readonly customerAdditionalContactOptions: CustomerAdditionalContactOptionsService;
  public readonly customerNoteAttachments: CustomerNoteAttachmentService;
  public readonly dashboardDebtorsManager: DashboardDebtorsManagerService;
  public readonly supplierAdditionalContactDetails: SupplierAdditionalContactDetailService;
  public readonly supplierBankDetails: SupplierBankDetailService;
  public readonly supplierNoteAttachments: SupplierNoteAttachmentService;
  public readonly itemAdjustments: ItemAdjustmentService;
  public readonly itemAttachments: ItemAttachmentService;
  public readonly itemBundles: ItemBundleService;
  public readonly itemMovements: ItemMovementService;
  public readonly itemNoteAttachments: ItemNoteAttachmentService;
  public readonly itemReportGroups: ItemReportGroupService;
  public readonly additionalItemPrices: AdditionalItemPriceService;
  public readonly additionalPriceLists: AdditionalPriceListService;
  public readonly purchasesByItems: PurchasesByItemService;
  public readonly salesByItems: SalesByItemService;
  public readonly priceListingReport: PriceListingReportService;
  public readonly bankAccounts: BankAccountService;
  public readonly bankAccountCategories: BankAccountCategoryService;
  public readonly bankAccountNotes: BankAccountNoteService;
  public readonly bankAccountNoteAttachments: BankAccountNoteAttachmentService;
  public readonly bankAccountOpeningBalance: BankAccountOpeningBalanceService;
  public readonly bankAccountTransactionListing: BankAccountTransactionListingService;
  public readonly bankImportMappings: BankImportMappingService;
  public readonly bankStatementTransactions: BankStatementTransactionService;
  public readonly bankTransactions: BankTransactionService;
  public readonly bankTransactionAttachments: BankTransactionAttachmentService;
  public readonly processBankAndCreditCardMappings: ProcessBankAndCreditCardMappingService;
  public readonly cashMovements: CashMovementService;
  public readonly accountPayments: AccountPaymentService;
  public readonly accountReceipts: AccountReceiptService;
  public readonly accountNoteAttachments: AccountNoteAttachmentService;
  public readonly journalEntries: JournalEntryService;
  public readonly recurringJournals: RecurringJournalService;
  public readonly detailedLedgerTransactions: DetailedLedgerTransactionService;
  public readonly financialYears: FinancialYearService;
  public readonly budgets: BudgetService;
  public readonly takeOnBalance: TakeOnBalanceService;
  public readonly analysisCategories: AnalysisCategoryService;
  public readonly analysisTypes: AnalysisTypeService;
  public readonly reportingGroups: ReportingGroupService;
  public readonly assets: AssetService;
  public readonly assetCategories: AssetCategoryService;
  public readonly assetLocations: AssetLocationService;
  public readonly assetNotes: AssetNoteService;
  public readonly taxAdjustments: TaxAdjustmentService;
  public readonly taxRateAdjustments: TaxRateAdjustmentService;
  public readonly taxPeriods: TaxPeriodService;
  public readonly basReports: BASReportService;
  public readonly vat201Reports: VAT201ReportService;
  public readonly balanceSheet: BalanceSheetService;
  public readonly profitAndLoss: ProfitAndLossService;
  public readonly trialBalance: TrialBalanceService;
  public readonly trialBalanceExportMappings: TrialBalanceExportMappingService;
  public readonly finalAccounts: FinalAccountsService;
  public readonly incomeVsExpense: IncomeVsExpenseService;
  public readonly salesBySalesRepresentatives: SalesBySalesRepresentativeService;
  public readonly topCustomersByOutstandingBalance: TopCustomersByOutstandingBalanceService;
  public readonly topCustomersBySales: TopCustomersBySalesService;
  public readonly topPurchasedItems: TopPurchasedItemsService;
  public readonly topSellingItems: TopSellingItemsService;
  public readonly topSellingItemsByValueOnHands: TopSellingItemsByValueOnHandService;
  public readonly topSuppliersByOutstandingBalance: TopSuppliersByOutstandingBalanceService;
  public readonly topSuppliersByPurchases: TopSuppliersByPurchasesService;
  public readonly timeTrackingCustomers: TimeTrackingCustomerService;
  public readonly timeTrackingExpense: TimeTrackingExpenseService;
  public readonly timeTrackingProjects: TimeTrackingProjectService;
  public readonly timeTrackingTasks: TimeTrackingTaskService;
  public readonly timeTrackingTimesheets: TimeTrackingTimesheetService;
  public readonly timeTrackingUsers: TimeTrackingUserService;
  public readonly crmActivities: CRMActivityService;
  public readonly crmActivityCategories: CRMActivityCategoryService;
  public readonly accountantEvents: AccountantEventService;
  public readonly accountantNotes: AccountantNoteService;
  public readonly accountantNoteAttachments: AccountantNoteAttachmentService;
  public readonly accountantTasks: AccountantTaskService;
  public readonly accountantTaskRecurrences: AccountantTaskRecurrenceService;
  public readonly toDoLists: ToDoListService;
  public readonly secretarialCompanyRoles: SecretarialCompanyRoleService;
  public readonly secretarialShareClass: SecretarialShareClassService;
  public readonly secretarialShareholders: SecretarialShareholderService;
  public readonly secretarialStakeHolders: SecretarialStakeHolderService;
  public readonly cities: CityService;
  public readonly currencies: CurrencyService;
  public readonly dateFormats: DateFormatService;
  public readonly developerData: DeveloperDataService;
  public readonly exchangeRates: ExchangeRatesService;
  public readonly localizations: LocalizationService;
  public readonly scheduleFrequencies: ScheduleFrequencyService;
  public readonly userDefinedFields: UserDefinedFieldService;
  public readonly sageIdUsers: SageIdUserService;
  public readonly supportLoginAudits: SupportLoginAuditService;
  public readonly coreEvents: CoreEventsService;
  public readonly coreTokens: CoreTokensService;
  public readonly payrolls: PayrollService;
  public readonly tests: TestService;
  /** Alias for `taxInvoices` (`TaxInvoice` service). */
  public readonly invoices: TaxInvoiceService;

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
    this.quotes = new QuoteService(this);
    this.quoteAttachments = new QuoteAttachmentService(this);
    this.taxInvoices = new TaxInvoiceService(this);
    this.taxInvoiceAttachments = new TaxInvoiceAttachmentService(this);
    this.salesOrders = new SalesOrderService(this);
    this.salesOrderAttachments = new SalesOrderAttachmentService(this);
    this.recurringInvoices = new RecurringInvoiceService(this);
    this.salesRepresentatives = new SalesRepresentativeService(this);
    this.salesRepresentativeNotes = new SalesRepresentativeNoteService(this);
    this.documentNumbers = new DocumentNumberService(this);
    this.documentMessages = new DocumentMessageService(this);
    this.documentHeaderNotes = new DocumentHeaderNoteService(this);
    this.documentHistories = new DocumentHistoryService(this);
    this.documentUserDefinedFields = new DocumentUserDefinedFieldsService(this);
    this.documentFileAttachments = new DocumentFileAttachmentService(this);
    this.attachments = new AttachmentService(this);
    this.emailSignatureTemplates = new EmailSignatureTemplateService(this);
    this.emailTemplatePlaceHolders = new EmailTemplatePlaceHolderService(this);
    this.purchaseOrders = new PurchaseOrderService(this);
    this.purchaseOrderAttachments = new PurchaseOrderAttachmentService(this);
    this.supplierInvoices = new SupplierInvoiceService(this);
    this.supplierInvoiceAttachments = new SupplierInvoiceAttachmentService(this);
    this.supplierPayments = new SupplierPaymentService(this);
    this.supplierReturns = new SupplierReturnService(this);
    this.supplierReturnAttachments = new SupplierReturnAttachmentService(this);
    this.supplierAdjustments = new SupplierAdjustmentService(this);
    this.outstandingSupplierDocuments = new OutstandingSupplierDocumentService(this);
    this.supplierAgeing = new SupplierAgeingService(this);
    this.supplierTransactionListing = new SupplierTransactionListingService(this);
    this.supplierPurchaseHistories = new SupplierPurchaseHistoryService(this);
    this.customerReceipts = new CustomerReceiptService(this);
    this.customerReturns = new CustomerReturnService(this);
    this.customerReturnAttachments = new CustomerReturnAttachmentService(this);
    this.customerAdjustments = new CustomerAdjustmentService(this);
    this.customerWriteOffs = new CustomerWriteOffService(this);
    this.allocations = new AllocationService(this);
    this.outstandingCustomerDocuments = new OutstandingCustomerDocumentService(this);
    this.customerAgeing = new CustomerAgeingService(this);
    this.customerTransactionListing = new CustomerTransactionListingService(this);
    this.customerSalesHistories = new CustomerSalesHistoryService(this);
    this.customerZones = new CustomerZoneService(this);
    this.customerAdditionalContactDetails = new CustomerAdditionalContactDetailService(this);
    this.customerAdditionalContactOptions = new CustomerAdditionalContactOptionsService(this);
    this.customerNoteAttachments = new CustomerNoteAttachmentService(this);
    this.dashboardDebtorsManager = new DashboardDebtorsManagerService(this);
    this.supplierAdditionalContactDetails = new SupplierAdditionalContactDetailService(this);
    this.supplierBankDetails = new SupplierBankDetailService(this);
    this.supplierNoteAttachments = new SupplierNoteAttachmentService(this);
    this.itemAdjustments = new ItemAdjustmentService(this);
    this.itemAttachments = new ItemAttachmentService(this);
    this.itemBundles = new ItemBundleService(this);
    this.itemMovements = new ItemMovementService(this);
    this.itemNoteAttachments = new ItemNoteAttachmentService(this);
    this.itemReportGroups = new ItemReportGroupService(this);
    this.additionalItemPrices = new AdditionalItemPriceService(this);
    this.additionalPriceLists = new AdditionalPriceListService(this);
    this.purchasesByItems = new PurchasesByItemService(this);
    this.salesByItems = new SalesByItemService(this);
    this.priceListingReport = new PriceListingReportService(this);
    this.bankAccounts = new BankAccountService(this);
    this.bankAccountCategories = new BankAccountCategoryService(this);
    this.bankAccountNotes = new BankAccountNoteService(this);
    this.bankAccountNoteAttachments = new BankAccountNoteAttachmentService(this);
    this.bankAccountOpeningBalance = new BankAccountOpeningBalanceService(this);
    this.bankAccountTransactionListing = new BankAccountTransactionListingService(this);
    this.bankImportMappings = new BankImportMappingService(this);
    this.bankStatementTransactions = new BankStatementTransactionService(this);
    this.bankTransactions = new BankTransactionService(this);
    this.bankTransactionAttachments = new BankTransactionAttachmentService(this);
    this.processBankAndCreditCardMappings = new ProcessBankAndCreditCardMappingService(this);
    this.cashMovements = new CashMovementService(this);
    this.accountPayments = new AccountPaymentService(this);
    this.accountReceipts = new AccountReceiptService(this);
    this.accountNoteAttachments = new AccountNoteAttachmentService(this);
    this.journalEntries = new JournalEntryService(this);
    this.recurringJournals = new RecurringJournalService(this);
    this.detailedLedgerTransactions = new DetailedLedgerTransactionService(this);
    this.financialYears = new FinancialYearService(this);
    this.budgets = new BudgetService(this);
    this.takeOnBalance = new TakeOnBalanceService(this);
    this.analysisCategories = new AnalysisCategoryService(this);
    this.analysisTypes = new AnalysisTypeService(this);
    this.reportingGroups = new ReportingGroupService(this);
    this.assets = new AssetService(this);
    this.assetCategories = new AssetCategoryService(this);
    this.assetLocations = new AssetLocationService(this);
    this.assetNotes = new AssetNoteService(this);
    this.taxAdjustments = new TaxAdjustmentService(this);
    this.taxRateAdjustments = new TaxRateAdjustmentService(this);
    this.taxPeriods = new TaxPeriodService(this);
    this.basReports = new BASReportService(this);
    this.vat201Reports = new VAT201ReportService(this);
    this.balanceSheet = new BalanceSheetService(this);
    this.profitAndLoss = new ProfitAndLossService(this);
    this.trialBalance = new TrialBalanceService(this);
    this.trialBalanceExportMappings = new TrialBalanceExportMappingService(this);
    this.finalAccounts = new FinalAccountsService(this);
    this.incomeVsExpense = new IncomeVsExpenseService(this);
    this.salesBySalesRepresentatives = new SalesBySalesRepresentativeService(this);
    this.topCustomersByOutstandingBalance = new TopCustomersByOutstandingBalanceService(this);
    this.topCustomersBySales = new TopCustomersBySalesService(this);
    this.topPurchasedItems = new TopPurchasedItemsService(this);
    this.topSellingItems = new TopSellingItemsService(this);
    this.topSellingItemsByValueOnHands = new TopSellingItemsByValueOnHandService(this);
    this.topSuppliersByOutstandingBalance = new TopSuppliersByOutstandingBalanceService(this);
    this.topSuppliersByPurchases = new TopSuppliersByPurchasesService(this);
    this.timeTrackingCustomers = new TimeTrackingCustomerService(this);
    this.timeTrackingExpense = new TimeTrackingExpenseService(this);
    this.timeTrackingProjects = new TimeTrackingProjectService(this);
    this.timeTrackingTasks = new TimeTrackingTaskService(this);
    this.timeTrackingTimesheets = new TimeTrackingTimesheetService(this);
    this.timeTrackingUsers = new TimeTrackingUserService(this);
    this.crmActivities = new CRMActivityService(this);
    this.crmActivityCategories = new CRMActivityCategoryService(this);
    this.accountantEvents = new AccountantEventService(this);
    this.accountantNotes = new AccountantNoteService(this);
    this.accountantNoteAttachments = new AccountantNoteAttachmentService(this);
    this.accountantTasks = new AccountantTaskService(this);
    this.accountantTaskRecurrences = new AccountantTaskRecurrenceService(this);
    this.toDoLists = new ToDoListService(this);
    this.secretarialCompanyRoles = new SecretarialCompanyRoleService(this);
    this.secretarialShareClass = new SecretarialShareClassService(this);
    this.secretarialShareholders = new SecretarialShareholderService(this);
    this.secretarialStakeHolders = new SecretarialStakeHolderService(this);
    this.cities = new CityService(this);
    this.currencies = new CurrencyService(this);
    this.dateFormats = new DateFormatService(this);
    this.developerData = new DeveloperDataService(this);
    this.exchangeRates = new ExchangeRatesService(this);
    this.localizations = new LocalizationService(this);
    this.scheduleFrequencies = new ScheduleFrequencyService(this);
    this.userDefinedFields = new UserDefinedFieldService(this);
    this.sageIdUsers = new SageIdUserService(this);
    this.supportLoginAudits = new SupportLoginAuditService(this);
    this.coreEvents = new CoreEventsService(this);
    this.coreTokens = new CoreTokensService(this);
    this.payrolls = new PayrollService(this);
    this.tests = new TestService(this);
    this.invoices = this.taxInvoices;
  }

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

  /**
   * Observable central-scheduler queue state (M008 WP008.2 §5.2.3):
   * active/pending counts and per-company lane suspension — no credentials,
   * headers or payloads.
   */
  public schedulerSnapshot(): SchedulerSnapshot {
    return this.transport.schedulerSnapshot();
  }

  /**
   * Graceful shutdown (M008 WP008.2 §5.2.3): stop admitting new requests
   * (they reject with `SAGE_SCHEDULER_SHUTDOWN`), let queued and in-flight
   * requests finish. In-flight requests remain cancellable via their signals.
   */
  public shutdown(): Promise<void> {
    return this.transport.shutdown();
  }
}

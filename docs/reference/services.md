# Service reference

All **162 catalogued Sage One Accounting API `2.0.0` services (622 operations)** are implemented and exposed as strongly typed properties on `SageOneClient`. Every service uses the shared `SageRequestExecutor` transport, Zod runtime validation, and OData query/pagination support.

## Domain Barrels & Client Properties

### 1. Financial Accounting (`src/domains/accounting/`) — 21 Services, 75 Operations

| Client Property | Service Class | Sage Service | Milestone |
|---|---|---|---|
| `sage.accounts` | `AccountsService` | `Account` | M004 |
| `sage.accountCategories` | `AccountCategoriesService` | `AccountCategory` | M004 |
| `sage.accountBalances` | `AccountBalancesService` | `AccountBalance` | M004 |
| `sage.accountOpeningBalances` | `AccountOpeningBalancesService` | `AccountOpeningBalance` | M004 |
| `sage.accountNotes` | `AccountNotesService` | `AccountNote` | M004 |
| `sage.accountNoteAttachments` | `AccountNoteAttachmentService` | `AccountNoteAttachment` | M006 |
| `sage.accountPayments` | `AccountPaymentService` | `AccountPayment` | M006 |
| `sage.accountReceipts` | `AccountReceiptService` | `AccountReceipt` | M006 |
| `sage.journalEntries` | `JournalEntryService` | `JournalEntry` | M006 |
| `sage.recurringJournals` | `RecurringJournalService` | `RecurringJournal` | M006 |
| `sage.detailedLedgerTransactions` | `DetailedLedgerTransactionService` | `DetailedLedgerTransaction` | M006 |
| `sage.detailedGeneralLedgerTransactions` | `DetailedGeneralLedgerTransactionService` | `DetailedGeneralLedgerTransaction` | M006 |
| `sage.financialYears` | `FinancialYearService` | `FinancialYear` | M006 |
| `sage.budgets` | `BudgetService` | `Budget` | M006 |
| `sage.takeOnBalances` | `TakeOnBalanceService` | `TakeOnBalance` | M006 |
| `sage.analysisCategories` | `AnalysisCategoryService` | `AnalysisCategory` | M006 |
| `sage.analysisTypes` | `AnalysisTypeService` | `AnalysisType` | M006 |

### 2. Sales & Document Management (`src/domains/sales/`) — 18 Services, 82 Operations

| Client Property | Service Class | Sage Service | Milestone |
|---|---|---|---|
| `sage.quotes` | `QuoteService` | `Quote` | M005 |
| `sage.quoteAttachments` | `QuoteAttachmentService` | `QuoteAttachment` | M005 |
| `sage.taxInvoices` (`sage.invoices`) | `TaxInvoiceService` | `TaxInvoice` | M005 |
| `sage.taxInvoiceAttachments` | `TaxInvoiceAttachmentService` | `TaxInvoiceAttachment` | M005 |
| `sage.salesOrders` | `SalesOrderService` | `SalesOrder` | M005 |
| `sage.salesOrderAttachments` | `SalesOrderAttachmentService` | `SalesOrderAttachment` | M005 |
| `sage.recurringInvoices` | `RecurringInvoiceService` | `RecurringInvoice` | M005 |
| `sage.salesRepresentatives` | `SalesRepresentativeService` | `SalesRepresentative` | M005 |
| `sage.salesRepresentativeNotes` | `SalesRepresentativeNoteService` | `SalesRepresentativeNote` | M005 |
| `sage.documentNumbers` | `DocumentNumberService` | `DocumentNumber` | M005 |
| `sage.documentMessages` | `DocumentMessageService` | `DocumentMessage` | M005 |
| `sage.documentHeaderNotes` | `DocumentHeaderNoteService` | `DocumentHeaderNote` | M005 |
| `sage.documentHistories` | `DocumentHistoryService` | `DocumentHistory` | M005 |
| `sage.documentUserDefinedFields` | `DocumentUserDefinedFieldsService` | `DocumentUserDefinedFields` | M005 |
| `sage.documentFileAttachments` | `DocumentFileAttachmentService` | `DocumentFileAttachment` | M005 |
| `sage.attachments` | `AttachmentService` | `Attachment` | M005 |
| `sage.emailSignatureTemplates` | `EmailSignatureTemplateService` | `EmailSignatureTemplate` | M005 |
| `sage.emailTemplatePlaceHolders` | `EmailTemplatePlaceHolderService` | `EmailTemplatePlaceHolder` | M005 |

### 3. Purchases (`src/domains/purchases/`) — 12 Services, 55 Operations

| Client Property | Service Class | Sage Service | Milestone |
|---|---|---|---|
| `sage.purchaseOrders` | `PurchaseOrderService` | `PurchaseOrder` | M005 |
| `sage.purchaseOrderAttachments` | `PurchaseOrderAttachmentService` | `PurchaseOrderAttachment` | M005 |
| `sage.supplierInvoices` | `SupplierInvoiceService` | `SupplierInvoice` | M005 |
| `sage.supplierInvoiceAttachments` | `SupplierInvoiceAttachmentService` | `SupplierInvoiceAttachment` | M005 |
| `sage.supplierPayments` | `SupplierPaymentService` | `SupplierPayment` | M005 |
| `sage.supplierReturns` | `SupplierReturnService` | `SupplierReturn` | M005 |
| `sage.supplierReturnAttachments` | `SupplierReturnAttachmentService` | `SupplierReturnAttachment` | M005 |
| `sage.supplierAdjustments` | `SupplierAdjustmentService` | `SupplierAdjustment` | M005 |
| `sage.outstandingSupplierDocuments` | `OutstandingSupplierDocumentService` | `OutstandingSupplierDocument` | M005 |
| `sage.supplierAgeings` | `SupplierAgeingService` | `SupplierAgeing` | M005 |
| `sage.supplierTransactionListings` | `SupplierTransactionListingService` | `SupplierTransactionListing` | M005 |
| `sage.supplierPurchaseHistories` | `SupplierPurchaseHistoryService` | `SupplierPurchaseHistory` | M005 |

### 4. Customers (`src/domains/customers/`) — 20 Services, 74 Operations

| Client Property | Service Class | Sage Service | Milestone |
|---|---|---|---|
| `sage.customers` | `CustomersService` | `Customer` | M004 |
| `sage.customerCategories` | `CustomerCategoriesService` | `CustomerCategory` | M004 |
| `sage.customerOpeningBalances` | `CustomerOpeningBalancesService` | `CustomerOpeningBalance` | M004 |
| `sage.customerStatements` | `CustomerStatementsService` | `CustomerStatement` | M004 |
| `sage.customerNotes` | `CustomerNotesService` | `CustomerNote` | M004 |
| `sage.customerReceipts` | `CustomerReceiptService` | `CustomerReceipt` | M005 |
| `sage.customerReturns` | `CustomerReturnService` | `CustomerReturn` | M005 |
| `sage.customerReturnAttachments` | `CustomerReturnAttachmentService` | `CustomerReturnAttachment` | M005 |
| `sage.customerAdjustments` | `CustomerAdjustmentService` | `CustomerAdjustment` | M005 |
| `sage.customerWriteOffs` | `CustomerWriteOffService` | `CustomerWriteOff` | M005 |
| `sage.allocations` | `AllocationService` | `Allocation` | M005 |
| `sage.outstandingCustomerDocuments` | `OutstandingCustomerDocumentService` | `OutstandingCustomerDocument` | M005 |
| `sage.customerAgeings` | `CustomerAgeingService` | `CustomerAgeing` | M005 |
| `sage.customerTransactionListings` | `CustomerTransactionListingService` | `CustomerTransactionListing` | M005 |
| `sage.customerSalesHistories` | `CustomerSalesHistoryService` | `CustomerSalesHistory` | M005 |
| `sage.customerZones` | `CustomerZoneService` | `CustomerZone` | M005 |
| `sage.customerAdditionalContactDetails` | `CustomerAdditionalContactDetailService` | `CustomerAdditionalContactDetail` | M005 |
| `sage.customerAdditionalContactOptions` | `CustomerAdditionalContactOptionsService` | `CustomerAdditionalContactOptions` | M005 |
| `sage.customerNoteAttachments` | `CustomerNoteAttachmentService` | `CustomerNoteAttachment` | M005 |
| `sage.dashboardDebtorsManagers` | `DashboardDebtorsManagerService` | `DashboardDebtorsManager` | M005 |

### 5. Suppliers (`src/domains/suppliers/`) — 8 Services, 33 Operations

| Client Property | Service Class | Sage Service | Milestone |
|---|---|---|---|
| `sage.suppliers` | `SuppliersService` | `Supplier` | M004 |
| `sage.supplierCategories` | `SupplierCategoriesService` | `SupplierCategory` | M004 |
| `sage.supplierOpeningBalances` | `SupplierOpeningBalancesService` | `SupplierOpeningBalance` | M004 |
| `sage.supplierStatements` | `SupplierStatementsService` | `SupplierStatement` | M004 |
| `sage.supplierNotes` | `SupplierNotesService` | `SupplierNote` | M004 |
| `sage.supplierAdditionalContactDetails` | `SupplierAdditionalContactDetailService` | `SupplierAdditionalContactDetail` | M005 |
| `sage.supplierBankDetails` | `SupplierBankDetailService` | `SupplierBankDetail` | M005 |
| `sage.supplierNoteAttachments` | `SupplierNoteAttachmentService` | `SupplierNoteAttachment` | M005 |

### 6. Inventory (`src/domains/inventory/`) — 15 Services, 54 Operations

| Client Property | Service Class | Sage Service | Milestone |
|---|---|---|---|
| `sage.items` | `ItemsService` | `Item` | M004 |
| `sage.itemCategories` | `ItemCategoriesService` | `ItemCategory` | M004 |
| `sage.itemOpeningBalances` | `ItemOpeningBalancesService` | `ItemOpeningBalance` | M004 |
| `sage.itemNotes` | `ItemNotesService` | `ItemNote` | M004 |
| `sage.itemAdjustments` | `ItemAdjustmentService` | `ItemAdjustment` | M005 |
| `sage.itemAttachments` | `ItemAttachmentService` | `ItemAttachment` | M005 |
| `sage.itemBundles` | `ItemBundleService` | `ItemBundle` | M005 |
| `sage.itemMovements` | `ItemMovementService` | `ItemMovement` | M005 |
| `sage.itemNoteAttachments` | `ItemNoteAttachmentService` | `ItemNoteAttachment` | M005 |
| `sage.itemReportGroups` | `ItemReportGroupService` | `ItemReportGroup` | M005 |
| `sage.additionalItemPrices` | `AdditionalItemPriceService` | `AdditionalItemPrice` | M005 |
| `sage.additionalPriceLists` | `AdditionalPriceListService` | `AdditionalPriceList` | M005 |
| `sage.purchasesByItems` | `PurchasesByItemService` | `PurchasesByItem` | M005 |
| `sage.salesByItems` | `SalesByItemService` | `SalesByItem` | M005 |
| `sage.priceListingReports` | `PriceListingReportService` | `PriceListingReport` | M005 |

### 7. Banking (`src/domains/banking/`) — 12 Services, 57 Operations

| Client Property | Service Class | Sage Service | Milestone |
|---|---|---|---|
| `sage.bankAccounts` | `BankAccountService` | `BankAccount` | M006 |
| `sage.bankAccountCategories` | `BankAccountCategoryService` | `BankAccountCategory` | M006 |
| `sage.bankAccountNotes` | `BankAccountNoteService` | `BankAccountNote` | M006 |
| `sage.bankAccountNoteAttachments` | `BankAccountNoteAttachmentService` | `BankAccountNoteAttachment` | M006 |
| `sage.bankAccountOpeningBalances` | `BankAccountOpeningBalanceService` | `BankAccountOpeningBalance` | M006 |
| `sage.bankAccountTransactionListings` | `BankAccountTransactionListingService` | `BankAccountTransactionListing` | M006 |
| `sage.bankStatementTransactions` | `BankStatementTransactionService` | `BankStatementTransaction` | M006 |
| `sage.bankTransactions` | `BankTransactionService` | `BankTransaction` | M006 |
| `sage.bankTransactionAttachments` | `BankTransactionAttachmentService` | `BankTransactionAttachment` | M006 |
| `sage.bankImportMappings` | `BankImportMappingService` | `BankImportMapping` | M006 |
| `sage.processBankAndCreditCardMappings` | `ProcessBankAndCreditCardMappingService` | `ProcessBankAndCreditCardMapping` | M006 |
| `sage.cashMovements` | `CashMovementService` | `CashMovement` | M006 |

### 8. Assets (`src/domains/assets/`) — 4 Services, 16 Operations

| Client Property | Service Class | Sage Service | Milestone |
|---|---|---|---|
| `sage.assets` | `AssetService` | `Asset` | M006 |
| `sage.assetCategories` | `AssetCategoryService` | `AssetCategory` | M006 |
| `sage.assetLocations` | `AssetLocationService` | `AssetLocation` | M006 |
| `sage.assetNotes` | `AssetNoteService` | `AssetNote` | M006 |

### 9. Taxation (`src/domains/taxation/`) — 6 Services, 22 Operations

| Client Property | Service Class | Sage Service | Milestone |
|---|---|---|---|
| `sage.taxTypes` | `TaxTypesService` | `TaxType` | M004 |
| `sage.taxAdjustments` | `TaxAdjustmentService` | `TaxAdjustment` | M006 |
| `sage.taxRateAdjustments` | `TaxRateAdjustmentService` | `TaxRateAdjustment` | M006 |
| `sage.taxPeriods` | `TaxPeriodService` | `TaxPeriod` | M006 |
| `sage.basReports` | `BASReportService` | `BASReport` | M006 |
| `sage.vat201Reports` | `VAT201ReportService` | `VAT201Report` | M006 |

### 10. Financial Statements & Reporting (`src/domains/reporting/`) — 14 Services, 20 Operations

| Client Property | Service Class | Sage Service | Milestone |
|---|---|---|---|
| `sage.trialBalances` | `TrialBalanceService` | `TrialBalance` | M006 |
| `sage.balanceSheets` | `BalanceSheetService` | `BalanceSheet` | M006 |
| `sage.profitAndLosses` | `ProfitAndLossService` | `ProfitAndLoss` | M006 |
| `sage.finalAccounts` | `FinalAccountsService` | `FinalAccounts` | M006 |
| `sage.cashFlowStatements` | `CashFlowStatementService` | `CashFlowStatement` | M006 |
| `sage.reportingGroups` | `ReportingGroupService` | `ReportingGroup` | M006 |
| `sage.adjustmentAuditTrailReports` | `AdjustmentAuditTrailReportService` | `AdjustmentAuditTrailReport` | M006 |
| `sage.inventoryTransactionsListings` | `InventoryTransactionsListingService` | `InventoryTransactionsListing` | M006 |
| `sage.dashboards` | `DashboardService` | `Dashboard` | M006 |
| `sage.accountantDashboards` | `AccountantDashboardService` | `AccountantDashboard` | M006 |
| `sage.ledgerLives` | `LedgerLiveService` | `LedgerLive` | M006 |
| `sage.checkLists` | `CheckListService` | `CheckList` | M006 |
| `sage.checkListCategories` | `CheckListCategoryService` | `CheckListCategory` | M006 |
| `sage.completeSetupWizards` | `CompleteSetupWizardService` | `CompleteSetupWizard` | M006 |

### 11. Time Tracking (`src/domains/time-tracking/`) — 6 Services, 50 Operations

| Client Property | Service Class | Sage Service | Milestone |
|---|---|---|---|
| `sage.timeTrackingCustomers` | `TimeTrackingCustomerService` | `TimeTrackingCustomer` | M006 |
| `sage.timeTrackingExpenses` | `TimeTrackingExpenseService` | `TimeTrackingExpense` | M006 |
| `sage.timeTrackingProjects` | `TimeTrackingProjectService` | `TimeTrackingProject` | M006 |
| `sage.timeTrackingTasks` | `TimeTrackingTaskService` | `TimeTrackingTask` | M006 |
| `sage.timeTrackingTimesheets` | `TimeTrackingTimesheetService` | `TimeTrackingTimesheet` | M006 |
| `sage.timeTrackingUsers` | `TimeTrackingUserService` | `TimeTrackingUser` | M006 |

### 12. CRM & Practice Management (`src/domains/crm/`) — 8 Services, 34 Operations

| Client Property | Service Class | Sage Service | Milestone |
|---|---|---|---|
| `sage.crmActivities` | `CRMActivityService` | `CRMActivity` | M006 |
| `sage.crmActivityCategories` | `CRMActivityCategoryService` | `CRMActivityCategory` | M006 |
| `sage.accountantEvents` | `AccountantEventService` | `AccountantEvent` | M006 |
| `sage.accountantNotes` | `AccountantNoteService` | `AccountantNote` | M006 |
| `sage.accountantNoteAttachments` | `AccountantNoteAttachmentService` | `AccountantNoteAttachment` | M006 |
| `sage.accountantTasks` | `AccountantTaskService` | `AccountantTask` | M006 |
| `sage.accountantTaskRecurrences` | `AccountantTaskRecurrenceService` | `AccountantTaskRecurrence` | M006 |
| `sage.toDoLists` | `ToDoListService` | `ToDoList` | M006 |

### 13. Company & Secretarial (`src/domains/company/`) — 7 Services, 19 Operations

| Client Property | Service Class | Sage Service | Milestone |
|---|---|---|---|
| `sage.company` | `CompanyService` | `Company` | M004 |
| `sage.companyEntityTypes` | `CompanyEntityTypesService` | `CompanyEntityType` | M004 |
| `sage.companyNotes` | `CompanyNotesService` | `CompanyNote` | M004 |
| `sage.shareCapitals` | `ShareCapitalService` | `ShareCapital` | M006 |
| `sage.shareHolders` | `ShareHolderService` | `ShareHolder` | M006 |
| `sage.directEntrySettings` | `DirectEntrySettingService` | `DirectEntrySetting` | M006 |
| `sage.migrations` | `MigrationService` | `Migration` | M006 |

### 14. Administration, Localization & Reference Data (`src/domains/administration/`) — 15 Services, 31 Operations

| Client Property | Service Class | Sage Service | Milestone |
|---|---|---|---|
| `sage.login` | `LoginService` | `Login` | M004 |
| `sage.users` | `UserService` | `User` | M006 |
| `sage.userCompanies` | `UserCompanyService` | `UserCompany` | M006 |
| `sage.userDefinedFields` | `UserDefinedFieldsService` | `UserDefinedFields` | M006 |
| `sage.developerData` | `DeveloperDataService` | `DeveloperData` | M006 |
| `sage.pluginData` | `PluginDataService` | `PluginData` | M006 |
| `sage.localizations` | `LocalizationService` | `Localization` | M006 |
| `sage.continents` | `ContinentService` | `Continent` | M006 |
| `sage.countries` | `CountryService` | `Country` | M006 |
| `sage.currencies` | `CurrencyService` | `Currency` | M006 |
| `sage.exchangeRates` | `ExchangeRateService` | `ExchangeRate` | M006 |
| `sage.dateFormats` | `DateFormatService` | `DateFormat` | M006 |
| `sage.dateFormatTypes` | `DateFormatTypeService` | `DateFormatType` | M006 |
| `sage.customerEntityTypes` | `CustomerEntityTypeService` | `CustomerEntityType` | M006 |
| `sage.supplierEntityTypes` | `SupplierEntityTypeService` | `SupplierEntityType` | M006 |
| `sage.tradeClassifications` | `TradeClassificationService` | `TradeClassification` | M006 |

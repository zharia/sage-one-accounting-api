# API coverage matrix

Machine-readable twin: [`contracts/sage-api/endpoint-catalogue.json`](../../contracts/sage-api/endpoint-catalogue.json).

Dimensions per endpoint (spec §24): Discovered · Contract · Type definitions · Runtime schemas · Implementation · Unit tests · Contract tests · Documentation — each `Missing` / `Partial` / `Complete` (Discovered: `Pending`/`Complete`).

## Summary (as of M004 completion — 2026-11-21)

| Metric | Count |
|---|---|
| Total discovered services | 162 |
| Total discovered endpoints | 622 |
| Fully documented endpoints (`full`) | 552 |
| Partially documented endpoints (`partial`) | 56 |
| Untyped / experimental endpoints (`experimental`) | 8 |
| Endpoints with no model documentation (`none`) | 6 |
| Implemented endpoints (M003 + M004) | 89 (across 24 services) |
| Fully typed endpoints | 89 |
| Validated endpoints (Zod request/response schemas) | 89 |
| Contract-tested endpoints (`tests/contract/` + `contracts/fixtures/`) | 89 |
| Known API limitations | see [known-limitations.md](./known-limitations.md) |

## M003 & M004 Implemented Services (24 services, 89 operations — 100% Complete across all 8 dimensions)

Legend: 🟩 Complete · 🟨 Partial · ⬜ Planned (M005/M006) · ⚠️ Undocumented

| Service | Domain | Operations | Discovered | Contract | Types | Schemas | Impl | Unit Tests | Contract Tests | Docs |
|---|---|---:|---|---|---|---|---|---|---|---|
| `Login` | Administration / Auth | 1 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `Account` | Financial accounting | 9 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `AccountCategory` | Financial accounting | 2 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `AccountBalance` | Financial accounting | 3 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `AccountOpeningBalance` | Financial accounting | 4 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `AccountNote` | Financial accounting | 4 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `Company` | Company & admin | 4 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `CompanyEntityType` | Company & admin | 2 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `CompanyNote` | Company & admin | 5 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `Customer` | Customers | 4 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `CustomerCategory` | Customers | 4 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `CustomerOpeningBalance` | Customers | 4 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `CustomerStatement` | Customers | 2 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `CustomerNote` | Customers | 4 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `Supplier` | Suppliers | 4 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `SupplierCategory` | Suppliers | 4 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `SupplierOpeningBalance` | Suppliers | 4 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `SupplierStatement` | Suppliers | 1 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `SupplierNote` | Suppliers | 4 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `TaxType` | Taxation | 4 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `Item` | Inventory | 4 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `ItemCategory` | Inventory | 4 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `ItemOpeningBalance` | Inventory | 4 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| `ItemNote` | Inventory | 4 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |

## Status by Service Group (All 162 Discovered Services)

| Service group | Total Services | Discovered | Contract | M004 Services | Remaining (M005–M006) |
|---|---:|---|---|---|---|
| Financial accounting | 21 | 🟩 (100%) | 🟩 | `Account`, `AccountCategory`, `AccountBalance`, `AccountOpeningBalance`, `AccountNote` (22 ops) | `AccountPayment`, `AccountReceipt`, `JournalEntry`, `RecurringJournal`, `DetailedLedgerTransaction`, `FinancialYear`, `TrialBalance`, `BalanceSheet`, `ProfitAndLoss`, `FinalAccounts`, `Budget`, `TakeOnBalance`, `ReportingGroup`, `AnalysisCategory`, `AnalysisType`, `AccountNoteAttachment` |
| Customers and sales | 28 | 🟩 (100%) | 🟩 | `Customer`, `CustomerCategory`, `CustomerOpeningBalance`, `CustomerStatement`, `CustomerNote` (18 ops) | `Quote`, `TaxInvoice`, `SalesOrder`, `RecurringInvoice`, `CustomerReceipt`, `CustomerReturn`, `CustomerAdjustment`, `CustomerWriteOff`, `CustomerAgeing`, `CustomerTransactionListing`, `CustomerSalesHistory`, `OutstandingCustomerDocument`, `Allocation`, `SalesRepresentative`, etc. (M005) |
| Suppliers and purchases | 20 | 🟩 (100%) | 🟩 | `Supplier`, `SupplierCategory`, `SupplierOpeningBalance`, `SupplierStatement`, `SupplierNote` (17 ops) | `SupplierInvoice`, `SupplierPayment`, `SupplierReturn`, `SupplierAdjustment`, `PurchaseOrder`, `SupplierAgeing`, `SupplierTransactionListing`, `SupplierPurchaseHistory`, `OutstandingSupplierDocument`, `SupplierBankDetail`, etc. (M005) |
| Banking | 12 | 🟩 (100%) | 🟩 | — | `BankAccount`, `BankAccountCategory`, `BankAccountNote`, `BankAccountOpeningBalance`, `BankAccountTransactionListing`, `BankStatementTransaction`, `BankTransaction`, `BankImportMapping`, `ProcessBankAndCreditCardMapping`, `CashMovement`, etc. (M006) |
| Inventory | 18 | 🟩 (100%) | 🟩 | `Item`, `ItemCategory`, `ItemOpeningBalance`, `ItemNote` (16 ops) | `ItemAdjustment`, `ItemAttachment`, `ItemBundle`, `ItemMovement`, `ItemReportGroup`, `AdditionalItemPrice`, `AdditionalPriceList`, `PurchasesByItem`, `SalesByItem`, `PriceListingReport`, etc. (M005/M006) |
| Taxation | 6 | 🟩 (100%) | 🟩 | `TaxType` (4 ops) | `TaxAdjustment`, `TaxRateAdjustment`, `TaxPeriod`, `BASReport`, `VAT201Report` (M006) |
| Assets | 4 | 🟩 (100%) | 🟩 | — | `Asset`, `AssetCategory`, `AssetLocation`, `AssetNote` (M006) |
| CRM and administration | 18 | 🟩 (100%) | 🟩 | `Login`, `Company`, `CompanyEntityType`, `CompanyNote` (12 ops) | `CRMActivity`, `CRMActivityCategory`, `AccountantEvent`, `AccountantNote`, `AccountantTask`, `AccountantTaskRecurrence`, `ToDoList`, `DeveloperData`, etc. (M006) |
| Time tracking | 6 | 🟩 (100%) | 🟩 | — | `TimeTrackingCustomer`, `TimeTrackingExpense`, `TimeTrackingProject`, `TimeTrackingTask`, `TimeTrackingTimesheet`, `TimeTrackingUser` (M006) |
| Other services | 29 | 🟩 (100%) | 🟩 | — | Document attachments, localization, exchange rates, secretarial, dashboard reports, user defined fields (M005/M006) |

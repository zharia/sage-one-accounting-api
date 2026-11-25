# API coverage matrix

Machine-readable twin: [`contracts/sage-api/endpoint-catalogue.json`](../../contracts/sage-api/endpoint-catalogue.json).

Dimensions per endpoint (spec §24): Discovered · Contract · Type definitions · Runtime schemas · Implementation · Unit tests · Contract tests · Documentation — each `Missing` / `Partial` / `Complete` (Discovered: `Pending`/`Complete`).

## Summary (as of M006 completion — 2026-11-21)

| Metric | Count |
|---|---|
| Total discovered services | 162 |
| Total discovered endpoints | 622 |
| Fully documented endpoints (`full`) | 552 |
| Partially documented endpoints (`partial`) | 56 |
| Untyped / experimental endpoints (`experimental`) | 8 |
| Endpoints with no model documentation (`none`) | 6 |
| Implemented endpoints (M003 + M004 + M005 + M006) | **622 / 622 (100% across all 162 services)** |
| Fully typed endpoints | **622 / 622 (100%)** |
| Validated endpoints (Zod request/response schemas) | **622 / 622 (100%)** |
| Contract-tested endpoints (`tests/contract/` + `contracts/fixtures/`) | **622 / 622 (100%)** |
| Known API limitations | see [known-limitations.md](./known-limitations.md) |

## Verification status per operation (M008 WP008.3)

Statuses are reported **individually** — implemented ≠ verified, and no single
collapsed coverage percentage is authoritative (spec §5.3.4). Evidence model:
[`docs/architecture/verification-levels.md`](../architecture/verification-levels.md).

| Status | Count | Meaning | Evidence |
|---|---:|---|---|
| Discovered | 622 | Present in the endpoint catalogue | `contracts/sage-api/endpoint-catalogue.json` |
| Documented | 616 | Help-page documentation exists (552 `full` + 56 `partial` + 8 `experimental`); 6 `none` have no model documentation | `documentationCompleteness` per endpoint |
| Modelled | 622 | Wire types + Zod schemas generated and validated | `src/domains/**`, `tests/unit/generate/` (V1/V2) |
| Implemented | 622 | Domain service method callable through the SDK | `tests/contract/all-endpoints-contract.test.ts` (V3 over V4) |
| Fixture-verified | 622 | Recorded fixture executed: method, route, query, body, response schema | `contracts/fixtures/**` (provenance: `contracts/fixtures/PROVENANCE.md`) |
| Live-verified | **0** | Verified against the live Sage API (V5) | pending WP008.4 — `pnpm test:live` stage |
| Unsupported | 0 | Known-unsupported operations | none recorded |
| Deprecated | 0 | Deprecated or unavailable operations | none recorded |

Documentation completeness split (revalidated against the catalogue by `tests/unit/coverage-reconciliation.test.ts`): 552 `full` · 56 `partial` · 8 `experimental` · 6 `none` = 622.

## Status by Service Group (All 162 Discovered Services — 622 Operations — 100% Complete)

Legend: 🟩 Complete · 🟨 Partial · ⬜ Planned · ⚠️ Undocumented

| Service group | Total Services | Discovered | Contract | Types | Schemas | Impl | Unit Tests | Contract Tests | Docs | Services Included |
|---|---:|---|---|---|---|---|---|---|---|---|
| Financial accounting | 21 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | `Account`, `AccountCategory`, `AccountBalance`, `AccountOpeningBalance`, `AccountNote`, `AccountNoteAttachment`, `AccountPayment`, `AccountReceipt`, `JournalEntry`, `RecurringJournal`, `DetailedLedgerTransaction`, `FinancialYear`, `TrialBalance`, `BalanceSheet`, `ProfitAndLoss`, `FinalAccounts`, `Budget`, `TakeOnBalance`, `ReportingGroup`, `AnalysisCategory`, `AnalysisType` |
| Customers and sales | 28 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | `Customer`, `CustomerCategory`, `CustomerOpeningBalance`, `CustomerStatement`, `CustomerNote`, `CustomerNoteAttachment`, `CustomerReceipt`, `CustomerReturn`, `CustomerReturnAttachment`, `CustomerAdjustment`, `CustomerWriteOff`, `CustomerAgeing`, `CustomerTransactionListing`, `CustomerSalesHistory`, `OutstandingCustomerDocument`, `CustomerZone`, `CustomerAdditionalContactDetail`, `CustomerAdditionalContactOptions`, `Allocation`, `Quote`, `QuoteAttachment`, `TaxInvoice`, `TaxInvoiceAttachment`, `SalesOrder`, `SalesOrderAttachment`, `RecurringInvoice`, `SalesRepresentative`, `SalesRepresentativeNote` |
| Suppliers and purchases | 20 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | `Supplier`, `SupplierCategory`, `SupplierOpeningBalance`, `SupplierStatement`, `SupplierNote`, `SupplierNoteAttachment`, `SupplierAdditionalContactDetail`, `SupplierBankDetail`, `PurchaseOrder`, `PurchaseOrderAttachment`, `SupplierInvoice`, `SupplierInvoiceAttachment`, `SupplierPayment`, `SupplierReturn`, `SupplierReturnAttachment`, `SupplierAdjustment`, `OutstandingSupplierDocument`, `SupplierAgeing`, `SupplierTransactionListing`, `SupplierPurchaseHistory` |
| Banking | 12 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | `BankAccount`, `BankAccountCategory`, `BankAccountNote`, `BankAccountNoteAttachment`, `BankAccountOpeningBalance`, `BankAccountTransactionListing`, `BankStatementTransaction`, `BankTransaction`, `BankTransactionAttachment`, `BankImportMapping`, `ProcessBankAndCreditCardMapping`, `CashMovement` |
| Inventory | 18 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | `Item`, `ItemCategory`, `ItemOpeningBalance`, `ItemNote`, `ItemNoteAttachment`, `ItemAdjustment`, `ItemAttachment`, `ItemBundle`, `ItemMovement`, `ItemReportGroup`, `AdditionalItemPrice`, `AdditionalPriceList`, `PurchasesByItem`, `SalesByItem`, `PriceListingReport` |
| Taxation | 6 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | `TaxType`, `TaxAdjustment`, `TaxRateAdjustment`, `TaxPeriod`, `BASReport`, `VAT201Report` |
| Assets | 4 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | `Asset`, `AssetCategory`, `AssetLocation`, `AssetNote` |
| CRM and administration | 18 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | `Login`, `Company`, `CompanyEntityType`, `CompanyNote`, `CRMActivity`, `CRMActivityCategory`, `AccountantEvent`, `AccountantNote`, `AccountantNoteAttachment`, `AccountantTask`, `AccountantTaskRecurrence`, `ToDoList`, `DeveloperData`, `User`, `UserCompany`, `UserDefinedFields`, `ShareCapital`, `ShareHolder` |
| Time tracking | 6 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | `TimeTrackingCustomer`, `TimeTrackingExpense`, `TimeTrackingProject`, `TimeTrackingTask`, `TimeTrackingTimesheet`, `TimeTrackingUser` |
| Other services | 29 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | `DocumentNumber`, `DocumentMessage`, `DocumentHeaderNote`, `DocumentHistory`, `DocumentUserDefinedFields`, `DocumentFileAttachment`, `Attachment`, `EmailSignatureTemplate`, `EmailTemplatePlaceHolder`, `AccountantDashboard`, `AdjustmentAuditTrailReport`, `CashFlowStatement`, `CheckList`, `CheckListCategory`, `CompleteSetupWizard`, `Continent`, `Country`, `Currency`, `CustomerEntityType`, `Dashboard`, `DashboardDebtorsManager`, `DateFormat`, `DateFormatType`, `DetailedGeneralLedgerTransaction`, `DirectEntrySetting`, `ExchangeRate`, `InventoryTransactionsListing`, `LedgerLive`, `Localization`, `Migration`, `PluginData`, `SupplierEntityType`, `TradeClassification` |

## Milestone Breakdown

| Milestone | Scope | Services | Operations | Status |
|---|---|---:|---:|---|
| M003 + M004 | Foundational accounting, company, customers, suppliers, tax types, inventory, login | 24 | 89 | 🟩 Complete |
| M005 | Commercial transactions (sales, purchases, customer/supplier receipts & payments, allocations, inventory movements, attachments) | 59 | 247 | 🟩 Complete |
| M006 | Banking, GL journals, financial statements, assets, tax filings, reporting, time tracking, CRM, administration | 79 | 286 | 🟩 Complete |
| **Total** | **Full Sage One Accounting API 2.0.0 surface** | **162** | **622** | **🟩 100% Complete** |

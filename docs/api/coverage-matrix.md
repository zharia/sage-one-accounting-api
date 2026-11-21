# API coverage matrix

Machine-readable twin: `contracts/sage-api/endpoint-catalogue.json` (status `pending` until M002).

Dimensions per endpoint (spec §24): Discovered · Contract · Type definitions · Runtime schemas · Implementation · Unit tests · Contract tests · Documentation — each `Missing` / `Partial` / `Complete` (Discovered: `Pending`/`Complete`).

## Summary

| Metric | Count |
|---|---|
| Total discovered endpoints | 0 |
| Implemented endpoints | 0 |
| Fully typed endpoints | 0 |
| Validated endpoints | 0 |
| Contract-tested endpoints | 0 |
| Undocumented endpoints (known) | TBD (M002) |
| Known API limitations | see [known-limitations.md](./known-limitations.md) |

## Status by service group

Legend: ⬜ not started · 🟨 partial · 🟩 complete · ⚠️ blocked/undocumented

| Service group | Services (spec §2.2) | Discovered | Contract | Types | Schemas | Impl | Tests | Docs |
|---|---|---|---|---|---|---|---|---|
| Financial accounting | Account, Account Category, Account Balance, Account Opening Balance, Account Payment, Account Receipt, Journal Entry, Detailed Ledger Transaction, Financial Year, Trial Balance, Balance Sheet, Profit and Loss, Final Accounts, Budget | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Customers and sales | Customer, Customer Category, Customer Adjustment, Customer Receipt, Customer Return, Customer Statement, Customer Transaction Listing, Customer Ageing, Customer Opening Balance, Customer Write Off, Customer Sales History, Outstanding Customer Document, Quote, Tax Invoice, Sales Order, Recurring Invoice | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Suppliers and purchases | Supplier, Supplier Category, Supplier Adjustment, Supplier Invoice, Supplier Payment, Supplier Return, Supplier Statement, Supplier Transaction Listing, Supplier Ageing, Supplier Opening Balance, Supplier Purchase History, Outstanding Supplier Document, Purchase Order | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Banking | Bank Account, Bank Account Category, Bank Account Transaction Listing, Bank Statement Transaction, Bank Transaction, Bank Import Mapping, Process Bank And Credit Card Mapping, Cash Movement | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Inventory | Item, Item Category, Item Adjustment, Item Bundle, Item Movement, Item Opening Balance, Item Report Group, Additional Item Price, Additional Price List, Purchases By Item, Sales By Item, Price Listing Report | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Taxation | Tax Type, Tax Adjustment, Tax Rate Adjustment, Tax Period, BAS Report, VAT201 Report, Tax Invoice | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Assets | Asset, Asset Category, Asset Location, Asset Note | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| CRM and administration | CRM Activity, CRM Activity Category, Accountant Event, Accountant Note, Accountant Task, Accountant Task Recurrence, Company, Company Note, Sage Id User, To Do List | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Time tracking | Time Tracking Customer, Expense, Project, Task, Timesheet, User | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Other services | Reports, document attachments, localization, exchange rates, secretarial, developer data, reference data | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

## Rules

- A resource is not "complete" because one operation works (spec §24).
- Every `🟩` requires a traceable contract source (docs URL + date, or verified live observation).
- Endpoint-level rows are added when M002 lands the catalogue; until then this table tracks service groups only.

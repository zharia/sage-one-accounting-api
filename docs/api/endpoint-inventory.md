# Endpoint inventory

**Status: pending M002.** Authoritative machine-readable form will be `contracts/sage-api/endpoint-catalogue.json`; this file mirrors it for humans.

Discovery source: https://accounting.sageone.co.za/api/2.0.0/help
Discovery date: _not yet performed_

## Planned catalogue record fields (spec §6.1)

service · resource · operation · HTTP method · relative route · query parameters · path parameters · request content type · request schema · response content type · response schema · authentication requirement · paging behaviour · OData support · file handling · documentation URL · documentation completeness · implementation status · test status.

## Documentation completeness classes

1. Fully documented
2. Partially documented
3. No model documentation
4. Requires experimental verification against the live API

## Service groups (seed list from spec §2.2 — not yet verified against live inventory)

| Group | Services |
|---|---|
| Financial accounting | Account, Account Category, Account Balance, Account Opening Balance, Account Payment, Account Receipt, Journal Entry, Detailed Ledger Transaction, Financial Year, Trial Balance, Balance Sheet, Profit and Loss, Final Accounts, Budget |
| Customers and sales | Customer, Customer Category, Customer Adjustment, Customer Receipt, Customer Return, Customer Statement, Customer Transaction Listing, Customer Ageing, Customer Opening Balance, Customer Write Off, Customer Sales History, Outstanding Customer Document, Quote, Tax Invoice, Sales Order, Recurring Invoice |
| Suppliers and purchases | Supplier, Supplier Category, Supplier Adjustment, Supplier Invoice, Supplier Payment, Supplier Return, Supplier Statement, Supplier Transaction Listing, Supplier Ageing, Supplier Opening Balance, Supplier Purchase History, Outstanding Supplier Document, Purchase Order |
| Banking | Bank Account, Bank Account Category, Bank Account Transaction Listing, Bank Statement Transaction, Bank Transaction, Bank Import Mapping, Process Bank And Credit Card Mapping, Cash Movement |
| Inventory | Item, Item Category, Item Adjustment, Item Bundle, Item Movement, Item Opening Balance, Item Report Group, Additional Item Price, Additional Price List, Purchases By Item, Sales By Item, Price Listing Report |
| Taxation | Tax Type, Tax Adjustment, Tax Rate Adjustment, Tax Period, BAS Report, VAT201 Report, Tax Invoice |
| Assets | Asset, Asset Category, Asset Location, Asset Note |
| CRM and administration | CRM Activity, CRM Activity Category, Accountant Event, Accountant Note, Accountant Task, Accountant Task Recurrence, Company, Company Note, Sage Id User, To Do List |
| Time tracking | Time Tracking Customer, Expense, Project, Task, Timesheet, User |
| Other services | Reports, attachments, localization, exchange rates, secretarial, developer data, reference data |

This list is an initial domain classification, **not** a replacement for the live endpoint inventory (spec §2.2). Names, operations and counts change once discovery runs.

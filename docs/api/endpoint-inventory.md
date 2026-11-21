# Endpoint inventory

**Status: Complete (M002 discovery — 2026-11-21).** Authoritative machine-readable catalogue: [`contracts/sage-api/endpoint-catalogue.json`](../../contracts/sage-api/endpoint-catalogue.json).

- **Discovery source:** https://accounting.sageone.co.za/api/2.0.0/help
- **Discovery date:** 2026-11-21
- **Total services:** 162
- **Total operations:** 622

## Completeness Breakdown

| Completeness Class | Count | Description |
|---|---:|---|
| `full` | 552 | Complete summary, URI/body parameter tables, typed resource model, and JSON sample |
| `partial` | 56 | Typed model or sample present, but missing summary text or uses `HttpResponseMessage` wrapper |
| `experimental` | 8 | Untyped `IHttpActionResult` or `Object` payload without summary (`Payroll/ReceivePayrollWebhook`, etc.) |
| `none` | 6 | No description, no request body schema, and no response model (`CoreEvents/Subscribe`, `Test/Get`, `Test/Policy`, etc.) |

## Discovered Services Summary (162 Services)

| Service ID | Title | Operations | Auth Required | M004 Implemented |
|---|---|---:|---|---|
| `Account` | Account | 9 | Yes | Yes (`sage.accounts`) |
| `AccountCategory` | Account Category | 2 | Yes | Yes (`sage.accountCategories`) |
| `AccountBalance` | Account Balance | 3 | Yes | Yes (`sage.accountBalances`) |
| `AccountOpeningBalance` | Account Opening Balance | 4 | Yes | Yes (`sage.accountOpeningBalances`) |
| `AccountNote` | Account Note | 4 | Yes | Yes (`sage.accountNotes`) |
| `Company` | Company | 4 | Yes | Yes (`sage.company`) |
| `CompanyEntityType` | Company Entity Type | 2 | Yes | Yes (`sage.companyEntityTypes`) |
| `CompanyNote` | Company Note | 5 | Yes | Yes (`sage.companyNotes`) |
| `Customer` | Customer | 4 | Yes | Yes (`sage.customers`) |
| `CustomerCategory` | Customer Category | 4 | Yes | Yes (`sage.customerCategories`) |
| `CustomerOpeningBalance` | Customer Opening Balance | 4 | Yes | Yes (`sage.customerOpeningBalances`) |
| `CustomerStatement` | Customer Statement | 2 | Yes | Yes (`sage.customerStatements`) |
| `CustomerNote` | Customer Note | 4 | Yes | Yes (`sage.customerNotes`) |
| `Supplier` | Supplier | 4 | Yes | Yes (`sage.suppliers`) |
| `SupplierCategory` | Supplier Category | 4 | Yes | Yes (`sage.supplierCategories`) |
| `SupplierOpeningBalance` | Supplier Opening Balance | 4 | Yes | Yes (`sage.supplierOpeningBalances`) |
| `SupplierStatement` | Supplier Statement | 1 | Yes | Yes (`sage.supplierStatements`) |
| `SupplierNote` | Supplier Note | 4 | Yes | Yes (`sage.supplierNotes`) |
| `TaxType` | Tax Type | 4 | Yes | Yes (`sage.taxTypes`) |
| `Item` | Item | 4 | Yes | Yes (`sage.items`) |
| `ItemCategory` | Item Category | 4 | Yes | Yes (`sage.itemCategories`) |
| `ItemOpeningBalance` | Item Opening Balance | 4 | Yes | Yes (`sage.itemOpeningBalances`) |
| `ItemNote` | Item Note | 4 | Yes | Yes (`sage.itemNotes`) |
| `Login` | Login | 1 | No | Yes (`sage.login`) |
| _Remaining 138 services_ | _Catalogued in `endpoint-catalogue.json`_ | _533_ | _130 Yes / 8 No_ | _Scheduled M005–M006_ |

See [`contracts/sage-api/endpoint-catalogue.json`](../../contracts/sage-api/endpoint-catalogue.json) for the full 622-record machine-readable inventory.

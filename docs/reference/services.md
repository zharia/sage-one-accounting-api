# Service reference

Implemented services as of M004 (24 services, 89 operations). All services are exposed as stable properties on `SageOneClient` and use the shared transport and validation pipeline.

## Summary of Client Services

| Client Property | Service Class | Sage Service | Operations |
|---|---|---|---:|
| `sage.login` | `LoginService` | `Login` | `validate` |
| `sage.accounts` | `AccountsService` | `Account` | `list`, `pages`, `iterate`, `get`, `getPayrollTypeOfAccounts`, `getServiceAccounts`, `getWithSystemAccounts`, `getAccountsByCategoryId`, `getChartOfAccounts`, `save`, `delete` |
| `sage.accountCategories` | `AccountCategoriesService` | `AccountCategory` | `list`, `get` |
| `sage.accountBalances` | `AccountBalancesService` | `AccountBalance` | `get`, `getAccountBudgetsById`, `getAccountBudgets` |
| `sage.accountOpeningBalances` | `AccountOpeningBalancesService` | `AccountOpeningBalance` | `list`, `get`, `getByAccountId`, `save` |
| `sage.accountNotes` | `AccountNotesService` | `AccountNote` | `list`, `get`, `save`, `delete` |
| `sage.company` | `CompanyService` | `Company` | `list`, `pages`, `iterate`, `get`, `getUserCompanyCount`, `current` |
| `sage.companyEntityTypes` | `CompanyEntityTypesService` | `CompanyEntityType` | `list`, `get` |
| `sage.companyNotes` | `CompanyNotesService` | `CompanyNote` | `list`, `get`, `getCompanyNotes`, `save`, `delete` |
| `sage.customers` | `CustomersService` | `Customer` | `list`, `pages`, `iterate`, `get`, `save`, `delete` |
| `sage.customerCategories` | `CustomerCategoriesService` | `CustomerCategory` | `list`, `get`, `save`, `delete` |
| `sage.customerOpeningBalances` | `CustomerOpeningBalancesService` | `CustomerOpeningBalance` | `list`, `get`, `getByCustomerId`, `save` |
| `sage.customerStatements` | `CustomerStatementsService` | `CustomerStatement` | `get`, `export` (PDF `ArrayBuffer`) |
| `sage.customerNotes` | `CustomerNotesService` | `CustomerNote` | `list`, `get`, `save`, `delete` |
| `sage.suppliers` | `SuppliersService` | `Supplier` | `list`, `pages`, `iterate`, `get`, `save`, `delete` |
| `sage.supplierCategories` | `SupplierCategoriesService` | `SupplierCategory` | `list`, `get`, `save`, `delete` |
| `sage.supplierOpeningBalances` | `SupplierOpeningBalancesService` | `SupplierOpeningBalance` | `list`, `get`, `getBySupplierId`, `save` |
| `sage.supplierStatements` | `SupplierStatementsService` | `SupplierStatement` | `get` |
| `sage.supplierNotes` | `SupplierNotesService` | `SupplierNote` | `list`, `get`, `save`, `delete` |
| `sage.taxTypes` | `TaxTypesService` | `TaxType` | `list`, `pages`, `iterate`, `get`, `save`, `delete` |
| `sage.items` | `ItemsService` | `Item` | `list`, `pages`, `iterate`, `get`, `save`, `delete` |
| `sage.itemCategories` | `ItemCategoriesService` | `ItemCategory` | `list`, `get`, `save`, `delete` |
| `sage.itemOpeningBalances` | `ItemOpeningBalancesService` | `ItemOpeningBalance` | `list`, `get`, `getByItemId`, `save` |
| `sage.itemNotes` | `ItemNotesService` | `ItemNote` | `list`, `get`, `save`, `delete` |

## Contract Fidelity & Non-Negotiables

- Only operations documented in `/api/2.0.0/help` are exposed (e.g., `AccountCategory` and `CompanyEntityType` are read-only `list`/`get` because Sage does not expose `Save` or `Delete` on those controllers).
- Financial mutations (`save`, `delete`) set `isFinancialMutation: true` and are never automatically retried.
- All list endpoints return `SagePage<T>` (`{ TotalResults, ReturnedResults, Results }`) and support typed OData queries via `options.odata`.

# Service reference

> One section per implemented service with operations, request/response models, query parameters, auth, pagination and limitations (spec §19.3). Generated from TypeDoc + coverage matrix in M003+.

**Status: no services implemented yet (M001).** Planned service groups from the client surface (spec §12):

```
sage.accounts          sage.customers        sage.suppliers
sage.invoices          sage.quotes           sage.salesOrders
sage.purchaseOrders    sage.bankAccounts     sage.bankTransactions
sage.journalEntries    sage.taxTypes         sage.taxPeriods
sage.items             sage.assets           sage.reports
sage.company
```

Naming is idiomatic TypeScript while preserving Sage terminology. Each service exposes only operations Sage actually provides — no fabricated CRUD (spec §12).

## Per-service template (used when services land)

### `<service>`

- **Sage resource:** …
- **Contract source:** docs URL + discovery date
- **Operations:** method · route · request schema · response schema · query params · auth · paging · OData · notes
- **Limitations:** undocumented behaviour, experimental verification results
- **Coverage:** matrix row link

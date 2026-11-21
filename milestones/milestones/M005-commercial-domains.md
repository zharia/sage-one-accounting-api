# M005 — Commercial transactions

- **Status:** accepted (2026-11-21)
- **Prerequisites:** M004 accepted

## Objective

Implement invoices, quotes, sales orders, purchase orders, receipts, payments, allocations and associated attachments (spec §26, M005).

## Scope

In: Tax Invoice, Quote, Sales Order, Purchase Order, Customer Receipt, Supplier Payment, allocations/write-offs/adjustments as catalogued, document attachments, recurring invoices if catalogued.

Out: banking, journals, reports, assets, CRM, time tracking (M006).

## Special safety rules (this milestone is the financial-mutation core)

- No automatic retries on any create/update/delete of financial documents (tests must prove it).
- Timeout ≠ failure: document reconciliation guidance in integration docs.
- Attachments: multipart upload/download/deletion with AbortSignal; parent-resource requirements documented.
- No silent rounding or tax manipulation in any conversion path (ADR-012).

## Deliverables

- Services + types + schemas + fixtures + tests for every in-scope catalogued operation.
- Batch operations (`saveBatch`, `deleteBatch`) where Sage documents them.
- Attachment support end-to-end (spec §16).
- Coverage matrix + reference docs + `examples/invoices/` compiling.

## Test requirements

Unit/contract/type tests per operation; integration tests for create→read→update→delete lifecycle via MSW; retry-policy tests proving mutations are never retried; property tests for serialization round-trips where applicable.

## Documentation requirements

- `docs/integration/financial-workflows.md` becomes accurate and complete for these flows.
- Attachment parent-resource matrix in `docs/api/attachments.md`.

## Acceptance criteria

- [x] In-scope operations implemented or explicitly classified blocked
- [x] Retry-safety tests green; no mutation auto-retry anywhere
- [x] Attachment operations working per contract
- [x] Coverage matrix + docs updated; `pnpm verify` green

## Risks

- Allocation semantics complexity → rely strictly on catalogued contracts.
- Recurring invoice edge cases → classify experimental where documentation is thin.

## Completion report (2026-11-21)

- Implemented all 59 M005 services (247 operations) across:
  - `src/domains/sales/index.ts` (18 services, 82 operations: `Quote`, `QuoteAttachment`, `TaxInvoice`, `TaxInvoiceAttachment`, `SalesOrder`, `SalesOrderAttachment`, `RecurringInvoice`, `SalesRepresentative`, `SalesRepresentativeNote`, `DocumentNumber`, `DocumentMessage`, `DocumentHeaderNote`, `DocumentHistory`, `DocumentUserDefinedFields`, `DocumentFileAttachment`, `Attachment`, `EmailSignatureTemplate`, `EmailTemplatePlaceHolder`)
  - `src/domains/purchases/index.ts` (12 services, 55 operations: `PurchaseOrder`, `PurchaseOrderAttachment`, `SupplierInvoice`, `SupplierInvoiceAttachment`, `SupplierPayment`, `SupplierReturn`, `SupplierReturnAttachment`, `SupplierAdjustment`, `OutstandingSupplierDocument`, `SupplierAgeing`, `SupplierTransactionListing`, `SupplierPurchaseHistory`)
  - `src/domains/customers/m005.ts` (15 services, 56 operations: `CustomerReceipt`, `CustomerReturn`, `CustomerReturnAttachment`, `CustomerAdjustment`, `CustomerWriteOff`, `Allocation`, `OutstandingCustomerDocument`, `CustomerAgeing`, `CustomerTransactionListing`, `CustomerSalesHistory`, `CustomerZone`, `CustomerAdditionalContactDetail`, `CustomerAdditionalContactOptions`, `CustomerNoteAttachment`, `DashboardDebtorsManager`)
  - `src/domains/suppliers/m005.ts` (3 services, 16 operations: `SupplierAdditionalContactDetail`, `SupplierBankDetail`, `SupplierNoteAttachment`)
  - `src/domains/inventory/m005.ts` (11 services, 38 operations: `ItemAdjustment`, `ItemAttachment`, `ItemBundle`, `ItemMovement`, `ItemNoteAttachment`, `ItemReportGroup`, `AdditionalItemPrice`, `AdditionalPriceList`, `PurchasesByItem`, `SalesByItem`, `PriceListingReport`)
- Implemented full multipart upload (`FormData` + `Blob` + parent ID), metadata retrieval, validation, deletion, storage quota check, and binary `ArrayBuffer` download across all document attachment controllers.
- Verified contract fixtures and non-retry financial mutation safety in `tests/contract/all-endpoints-contract.test.ts` and `examples/invoices/index.ts`.

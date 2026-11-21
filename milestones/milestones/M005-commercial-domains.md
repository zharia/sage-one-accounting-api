# M005 — Commercial transactions

- **Status:** not started
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

- [ ] In-scope operations implemented or explicitly classified blocked
- [ ] Retry-safety tests green; no mutation auto-retry anywhere
- [ ] Attachment operations working per contract
- [ ] Coverage matrix + docs updated; `pnpm verify` green

## Risks

- Allocation semantics complexity → rely strictly on catalogued contracts.
- Recurring invoice edge cases → classify experimental where documentation is thin.

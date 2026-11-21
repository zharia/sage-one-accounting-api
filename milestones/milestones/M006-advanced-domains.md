# M006 — Banking, reporting and advanced domains

- **Status:** not started
- **Prerequisites:** M004 and M005 accepted

## Objective

Implement banking, journals, assets, taxation, reporting, time tracking, CRM and remaining service areas (spec §26, M006).

## Scope

In: Bank accounts/transactions/statements/import mapping/cash movement; Journal entries and detailed ledger transactions; financial statements (trial balance, balance sheet, P&L, final accounts, budgets); Assets (+category/location/notes); Tax adjustments/periods/BAS/VAT201; Time tracking (6 services); CRM + administration (activities, accountant events/notes/tasks, company notes, users, to-do); remaining "other services" from the catalogue (localization, exchange rates, secretarial, developer data, reference data).

Out: 100% polish + release automation (M007).

## Deliverables

- Services per catalogue with full type/schema/test/doc treatment.
- Report endpoints: response models validated where documented; binary/export handling as applicable.
- Coverage matrix approaching 100% of discoverable inventory.

## Test requirements

Standard suite per operation; extra care: report response shapes (large, nested), exchange-rate precision, journal balance constraints as documented (no SDK-side accounting rules — validate structure only).

## Documentation requirements

- `docs/reference/services.md` complete for implemented services.
- `examples/banking/`, `examples/reporting/` compile.

## Acceptance criteria

- [ ] Every catalogued service has an implementation decision (done/blocked+reason)
- [ ] Coverage report per spec §24 generated and accurate
- [ ] `pnpm verify` green

## Risks

- Breadth → quality drift; mitigate by strict per-operation checklist and coverage dimensions.
- Report payload size → memory/streaming considerations for exports.

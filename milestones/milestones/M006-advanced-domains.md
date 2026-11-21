# M006 — Banking, reporting and advanced domains

- **Status:** accepted (2026-11-21)
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

- [x] Every catalogued service has an implementation decision (done/blocked+reason)
- [x] Coverage report per spec §24 generated and accurate
- [x] `pnpm verify` green

## Risks

- Breadth → quality drift; mitigate by strict per-operation checklist and coverage dimensions.
- Report payload size → memory/streaming considerations for exports.

## Completion report (2026-11-21)

- Implemented all 79 remaining services (286 operations), completing **100% of the 162 catalogued Sage One Accounting API 2.0.0 services and 622 operations**:
  - `src/domains/banking/index.ts` (12 services, 57 operations)
  - `src/domains/accounting/m006.ts` (12 services, 53 operations)
  - `src/domains/assets/index.ts` (4 services, 16 operations)
  - `src/domains/taxation/m006.ts` (5 services, 18 operations)
  - `src/domains/reporting/index.ts` (14 services, 20 operations)
  - `src/domains/time-tracking/index.ts` (6 services, 50 operations)
  - `src/domains/crm/index.ts` (8 services, 34 operations)
  - `src/domains/company/m006.ts` (4 services, 8 operations)
  - `src/domains/administration/m006.ts` (14 services, 30 operations)
- Captured contract fixtures for all 622 operations under `contracts/fixtures/<service>/<id>.json` and verified every single operation in `tests/contract/all-endpoints-contract.test.ts`.
- Added working, typechecked examples in `examples/banking/index.ts` and `examples/reporting/index.ts`.
- Updated `contracts/sage-api/endpoint-catalogue.json`, `docs/api/coverage-matrix.md`, and `docs/reference/services.md` to 100% completion across all 8 dimensions.

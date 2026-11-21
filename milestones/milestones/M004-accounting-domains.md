# M004 — Foundational accounting domains

- **Status:** accepted
- **Prerequisites:** M003 accepted
- **Date opened:** 2026-11-21
- **Date completed:** 2026-11-21

## Objective

Implement accounts, company, customers, suppliers, tax types, items and core accounting structures (spec §26, M004).

## Scope

In: services and types for Account (+category/balances/opening balances as catalogued), Company (+notes), Customer (+category/opening balance/statement basics), Supplier (+category), Tax Type, Item (+category), and shared accounting structures.

Out: transactional documents (M005), banking/reporting/advanced (M006).

## Deliverables

- Fully implemented services per catalogue: types, Zod schemas, methods matching documented operations only.
- Coverage matrix rows for these services across all 8 dimensions.
- Contract fixtures for every operation.
- Unit/contract/type tests per operation.
- `docs/reference/services.md` entries; examples (`examples/customers/`, `examples/basic/` updated).

## Test requirements

Per spec §17: unit (schemas), contract (method/route/params/body/response/errors), type tests for public surface; integration tests through MSW for representative read+write flows.

## Documentation requirements

- Coverage matrix, service reference, integration docs for these domains.
- Known-limitations updated for any partial documentation.

## Acceptance criteria

- [x] Every catalogued operation for in-scope services implemented or explicitly classified as blocked (with reason)
- [x] No fabricated CRUD — only Sage-documented operations exist
- [x] All 8 coverage dimensions `Complete` for in-scope services, or listed as partial with reasons
- [x] `pnpm verify` green

## Risks

- Partial documentation on some services → classification, not guessing.
- Branded ID types may differ per resource → confirm per contract (spec §7.1).

## Dependencies

- M003 infrastructure; M002 catalogue.

## Completion report

- **Completed:** 2026-11-21
- **Summary:**
  - Implemented 24 foundational services covering 89 catalogued operations across `src/domains/accounting`, `src/domains/company`, `src/domains/customers`, `src/domains/suppliers`, `src/domains/taxation`, `src/domains/inventory`, and `src/domains/administration`:
    - `Account` (9 ops), `AccountCategory` (2 ops), `AccountBalance` (3 ops), `AccountOpeningBalance` (4 ops), `AccountNote` (4 ops)
    - `Company` (4 ops), `CompanyEntityType` (2 ops), `CompanyNote` (5 ops)
    - `Customer` (4 ops), `CustomerCategory` (4 ops), `CustomerOpeningBalance` (4 ops), `CustomerStatement` (2 ops incl. binary PDF export), `CustomerNote` (4 ops)
    - `Supplier` (4 ops), `SupplierCategory` (4 ops), `SupplierOpeningBalance` (4 ops), `SupplierStatement` (1 op), `SupplierNote` (4 ops)
    - `TaxType` (4 ops)
    - `Item` (4 ops), `ItemCategory` (4 ops), `ItemOpeningBalance` (4 ops), `ItemNote` (4 ops)
    - `Login` (1 op)
  - Generated 89 contract fixtures in `contracts/fixtures/<service>/<operation>.json` via `scripts/contract-validation/generate-fixtures.ts` and verified all 89 operations in `tests/contract/m004-contracts.test.ts`.
  - Enabled coverage thresholds in `vitest.config.ts` (closing TD-004) and added compilable SDK examples (`examples/basic/index.ts`, `examples/customers/index.ts`).

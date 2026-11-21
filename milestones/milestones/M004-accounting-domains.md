# M004 — Foundational accounting domains

- **Status:** not started
- **Prerequisites:** M003 accepted

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

- [ ] Every catalogued operation for in-scope services implemented or explicitly classified as blocked (with reason)
- [ ] No fabricated CRUD — only Sage-documented operations exist
- [ ] All 8 coverage dimensions `Complete` for in-scope services, or listed as partial with reasons
- [ ] `pnpm verify` green

## Risks

- Partial documentation on some services → classification, not guessing.
- Branded ID types may differ per resource → confirm per contract (spec §7.1).

## Dependencies

- M003 infrastructure; M002 catalogue.

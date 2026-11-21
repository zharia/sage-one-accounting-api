# Agent implementation guide

Read first: root [`AGENTS.md`](../../AGENTS.md) (authoritative), then this.

## Order of work

Current milestone: **M001 → M002 → M003 …** (`milestones/roadmap.md`). Never start a milestone whose prerequisites are open.

## Implementing an endpoint (full checklist)

1. **Discover** — retrieve the Sage help page for the endpoint; record URL + date in `contracts/sage-api/source-manifest.json`.
2. **Catalogue** — add/update the record in `contracts/sage-api/endpoint-catalogue.json` (all fields per spec §6.1; classification: full/partial/none/experimental).
3. **Fixture** — save sanitized request/response samples to `contracts/fixtures/<service>/<operation>.json`.
4. **Types** — wire types (PascalCase, exact) + branded IDs where the contract confirms them.
5. **Schemas** — Zod request/response/query/enum schemas; derive types with `z.infer` only.
6. **Service method** — through shared request context; descriptive names for non-CRUD ops (`calculate`, `getStatement`, `saveBatch`, …).
7. **Tests** — unit (schemas), contract (method/route/params/body/response/errors), type test for the public export.
8. **Docs** — coverage matrix row, `docs/reference/services.md` entry, known-limitations if any gap.
9. **Verify** — `pnpm verify`.
10. **Report** — changed files, verification performed, remaining gaps.

## Non-negotiables

- No invented endpoint behaviour, ever.
- No financial-mutation retries; no silent rounding/tax changes.
- No secrets anywhere (code, logs, errors, fixtures, commits).
- Boundaries: domains never call `fetch`; transport never knows domain semantics.
- `any` banned in `src/` public surface.

## When blocked

Record in `milestones/technical-debt.md` (with disposition) or `docs/api/known-limitations.md`, then ask/report — do not guess.

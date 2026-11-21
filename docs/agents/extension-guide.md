# Agent extension guide

How to extend the SDK beyond endpoint coverage (new layers, cross-cutting features).

## Prerequisites

1. Read `docs/architecture/module-boundaries.md` and `AGENTS.md`.
2. Confirm the change doesn't violate an ADR — if it does, write a new ADR (or amend with a new number) before coding.
3. Check `milestones/technical-debt.md` — you may be solving tracked debt.

## Procedure

1. **Specify** — short design note: problem, options, decision, test plan. Significant decisions → ADR in `docs/architecture/adr/` with all 9 required fields (spec §21).
2. **Boundaries** — state which modules are touched and prove dependency direction stays acyclic.
3. **Implement** — smallest change satisfying the spec; no drive-by refactors.
4. **Tests** — unit + integration as applicable; type tests if the public surface changed.
5. **Docs** — update `docs/architecture/*`, `docs/reference/*`, README if user-facing.
6. **Verify** — `pnpm verify`; PR template checklist must be satisfiable.
7. **Debt** — record anything deferred with a disposition.

## Codegen changes (if touching `scripts/generate/`)

- Generated files: header with source + generator, reproducible output.
- Never let generation overwrite hand-written logic (spec §6.4).
- Regeneration diff must be reviewable.

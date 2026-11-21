# AGENTS.md — authoritative agent instructions

**This file is the single source of truth for AI agents working on this repository.**
CLAUDE.md, GEMINI.md and `.github/copilot-instructions.md` reference this file; do not duplicate policy there.

## Read before doing anything

1. `README.md` — project purpose and layout.
2. `__init_spec_01.md` — the project-level implementation authority (spec v0.1.0).
3. `docs/architecture/overview.md` and `docs/architecture/module-boundaries.md`.
4. The current milestone in `milestones/milestones/` and, if sprint work, the sprint spec in `milestones/sprints/`.
5. Relevant existing code before changing it — never scaffold over unknown files.

## Hard rules

1. **Never invent Sage API behaviour.** Undocumented means undocumented: record gaps in `docs/api/known-limitations.md` and `docs/api/coverage-matrix.md`.
2. **Preserve API contract fidelity.** The raw contract layer keeps Sage's PascalCase wire names; camelCase convenience is a separate, explicit layer.
3. **No automatic retries of financial mutations** (invoices, payments, receipts, journals, bank transactions).
4. **Never log or embed credentials, tokens or Authorization headers.** No secrets in errors, logs, fixtures or commits.
5. **Never silently round monetary amounts or alter tax values.**
6. Follow module boundaries in `docs/architecture/module-boundaries.md`. Domain services never implement their own HTTP clients.
7. `any` is banned in public API declarations without a documented exception.
8. Financial and date values: never transform silently; preserve wire representation.

## Workflow for every change

```text
Research -> Contract Discovery -> Domain Modelling -> Technical Specification
-> Implementation -> Unit Tests -> Contract Tests -> Integration Tests
-> Documentation -> Verification -> Milestone Acceptance
```

- Add tests with every implementation change.
- Update documentation alongside code.
- Update `docs/api/coverage-matrix.md` for endpoint work.
- Record significant decisions as numbered ADRs in `docs/architecture/adr/`.
- Track unfinished work in `milestones/technical-debt.md`.
- Run `pnpm verify` — it must pass. Compiling is not "done".
- Report what you changed, what you verified, and what remains.

## Environment

```bash
nix develop          # Node 24 LTS + pnpm pinned by packageManager
pnpm install         # --frozen-lockfile in CI
pnpm verify          # full verification (spec §17.7)
```

- Package manager is pnpm only. Never npm/yarn. Commit `pnpm-lock.yaml`.
- Node.js >= 24. Native ESM only (`"type": "module"`, `.js` extensions in relative imports).
- TypeScript strictness flags are mandatory — do not relax `tsconfig.json`.

## Where things go

| Change | Location |
|---|---|
| SDK source | `src/` (client, auth, transport, config, logging, errors, validation, types, domains, internal) |
| Raw API contract / endpoint catalogue | `contracts/` — never mixed with generated or hand-written SDK code |
| Tests | `tests/{unit,integration,contract,type-tests,property,e2e,live,fixtures,mocks}` |
| Docs | `docs/` (architecture, api, development, integration, reference, agents, decisions) |
| Plan / progress | `milestones/` (roadmap, M001–M007, sprints, technical debt) |
| Discovery / release / verification scripts | `scripts/` |
| Examples | `examples/` — must compile against the public SDK |

## Implementing a new resource (checklist)

1. Confirm the endpoint in the Sage help docs (URL + access date) — add record to `contracts/sage-api/endpoint-catalogue.json`.
2. Capture a contract fixture under `contracts/fixtures/` traceable to docs or verified live observation.
3. Define wire types + Zod schemas colocated with the resource.
4. Implement the domain service method; use only the shared transport.
5. Unit test schemas and mapping; contract test method, route, query params, body, response.
6. Update coverage matrix, API reference docs and examples.
7. `pnpm verify`.

## Milestones

M001 foundation → M002 API discovery → M003 core SDK → M004 accounting domains → M005 commercial transactions → M006 banking/reporting/advanced → M007 production release.
Do not start a milestone before its prerequisites land. Do not overwrite completed milestone specs; append amendments and completion reports.

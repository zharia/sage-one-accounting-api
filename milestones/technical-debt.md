# Technical debt

Explicit, prioritised, with dispositions (spec §22). Dispositions: `accept` (live with it), `schedule` (milestone assigned), `repay` (fix now), `wontfix` (recorded rationale).

| ID | Debt | Priority | Raised | Disposition | Notes |
|---|---|---|---|---|---|
| TD-001 | Structural import-boundary enforcement (dependency-cruiser/eslint-plugin-boundaries) — boundaries only documented today | medium | M001 | `schedule` → M003 | `docs/architecture/module-boundaries.md` is unenforced by tooling |
| TD-002 | Git hooks (Lefthook or equivalent) absent — no pre-commit format/lint gate locally | low | M001 | `schedule` → M003 | CI still gates; local DX gap only |
| TD-003 | TypeDoc API reference not wired (docs/reference placeholders) | medium | M001 | `schedule` → M003 | documentation.yml has placeholder step |
| TD-004 | Coverage thresholds unset (informational coverage only) | low | M001 | `schedule` → M004 | set once enough tests exist to be meaningful |
| TD-005 | Vite+ evaluation outstanding (spec §4.4) | low | M001 | `schedule` → M007 | ADR-014 records current stance |
| TD-006 | Live test suite needs dedicated test company + credential flow | high (for M007) | M001 | `schedule` → M003/M007 | blocks "optional live tests established" DoD item |
| TD-007 | `PROGRESS.md` is a session artefact — remove or fold into milestones after M001 closes | low | M001 | `repay` at M001 completion | avoid stale duplicate status sources |

## Rules

- New debt gets an ID, priority, disposition and (if scheduled) a target milestone in the same change that creates it.
- Closing debt references the commit/PR that repaid it.
- Milestone acceptance reviews outstanding debt for that milestone — debt without disposition blocks acceptance.

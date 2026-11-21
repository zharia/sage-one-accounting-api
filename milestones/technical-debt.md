# Technical debt

Explicit, prioritised, with dispositions (spec §22). Dispositions: `accept` (live with it), `schedule` (milestone assigned), `repay` (fix now), `wontfix` (recorded rationale).

| ID | Debt | Priority | Raised | Disposition | Notes |
|---|---|---|---|---|---|
| TD-001 | Structural import-boundary enforcement (dependency-cruiser/eslint-plugin-boundaries) — boundaries only documented today | medium | M001 | `closed` (M003) | Implemented `scripts/verification/check-boundaries.ts` and wired into `verify.sh` + contract test suite |
| TD-002 | Git hooks (Lefthook or equivalent) absent — no pre-commit format/lint gate locally | low | M001 | `schedule` → M007 | CI and `pnpm verify` gate every change |
| TD-003 | TypeDoc automated HTML site generation not wired (`docs/reference/` manually curated) | medium | M001 | `schedule` → M007 | `docs/reference/*` populated with M003/M004 reference tables; automated TypeDoc HTML generation scheduled for M007 |
| TD-004 | Coverage thresholds unset (informational coverage only) | low | M001 | `closed` (M004) | Configured coverage thresholds in `vitest.config.ts` (`statements: 85`, `lines: 85`, `functions: 85`, `branches: 70`) |
| TD-005 | Vite+ evaluation outstanding (spec §4.4) | low | M001 | `schedule` → M007 | ADR-014 records current stance |
| TD-006 | Live test suite needs dedicated test company + credential flow | high (for M007) | M001 | `schedule` → M007 | Opt-in live test harness created at `tests/live/live-smoke.test.ts` (`SAGE_LIVE_TESTS=true`); live sandbox company execution scheduled for M007 |
| TD-007 | `PROGRESS.md` is a session artefact — remove or fold into milestones after M001 closes | low | M001 | `closed` (M001 acceptance) | Removed `PROGRESS.md`; status tracked exclusively in `milestones/` |

## Rules

- New debt gets an ID, priority, disposition and (if scheduled) a target milestone in the same change that creates it.
- Closing debt references the commit/PR that repaid it.
- Milestone acceptance reviews outstanding debt for that milestone — debt without disposition blocks acceptance.

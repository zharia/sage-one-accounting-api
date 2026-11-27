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
| TD-008 | Model/enum help pages still unfetched (help-site throttling: HTTP 200 error pages) — unresolved references keep the `z.record(z.string(), z.unknown())` fallback | medium | M008 | `schedule` → M008.4 | 51 unresolved at WP008.1 close (2026-11-23); zero published-sample conflicts (recursive audit of 670 sample objects). Resumable + checkpointed: `pnpm discover:models`; re-run after throttle window, then regenerate |
| TD-009 | Cross-instance/cross-process rate-limit coordination absent — one scheduler per `SageOneClient`, no shared state (ADR-017 Amendment §5–§7) | low | M008 (WP008.2R) | `accept` | Deliberate: spec §11 forbids distributed scheduling infrastructure and transport architecture must be preserved; single-client consumers unaffected; document limitation (done in transport.md/ADR-017) |
| TD-010 | Scheduler not injectable into the transport — no public seam for consumer-supplied schedulers | low | M008 (WP008.2R) | `accept` | Spec §6.4 allows explicit deferral; no demonstrated need yet (constraint: no speculative API) |
| TD-011 | `NPM_TOKEN` repository secret was empty/absent — `changesets/action` publish path would fail (run #16 logged an empty token) | medium | M008 (WP008.2R) | `closed` (WP008.5, 2026-11-27) | Secret set by owner; auth delivered via `~/.npmrc` write + `npm whoami` preflight in `release.yml`; publish path validated end-to-end by run #24 (`@bytemoney/sage-one-accounting-api@0.2.0-next.0` on npm) |

## Rules

- New debt gets an ID, priority, disposition and (if scheduled) a target milestone in the same change that creates it.
- Closing debt references the commit/PR that repaid it.
- Milestone acceptance reviews outstanding debt for that milestone — debt without disposition blocks acceptance.

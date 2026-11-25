# Test verification levels

Status: adopted (M008 WP008.3, spec §5.3). Policy companion: ADR-013.

## The model

Every test suite and verification report is classified by what it **actually
establishes** — not by where it happens to live.

| Level | Verification type | What it establishes |
|---|---|---|
| V0 | Static and compile-time | Code quality, compilation and type constraints |
| V1 | Unit | Correctness of isolated functions and components |
| V2 | Generated contract | Schema and type correctness against recorded source contracts |
| V3 | Fixture-based integration | Behaviour against representative recorded request/response fixtures |
| V4 | Mocked transport integration | Behaviour across SDK components using controlled simulated responses |
| V5 | Live API integration | Compatibility with the actual Sage API |

**Evidence rule:** a lower verification level must never be presented as
evidence for a higher one. Passing V1–V4 suites proves nothing about live Sage
compatibility (V5) until the live stage has run.

## Suite classification

| Suite | Path | Level | Notes |
|---|---|---|---|
| Type tests | `tests/type-tests/exports.test-d.ts` | **V0** | Compile-time only (vitest `--typecheck`) |
| Module-boundary check | `scripts/verification/check-boundaries.ts` (also asserted in `tests/contract/m004-contracts.test.ts`) | **V0** | Static architecture rule; canonical run is verify step 2 |
| Package entry | `tests/unit/index.test.ts` | **V1** | Exported literals |
| Core SDK | `tests/unit/core-sdk.test.ts` | **V1** | Config, logging, auth single-flight, OData/pagination, transport retry/timeout/error mapping (injected `fetch`) |
| API discovery parser | `tests/unit/api-discovery.test.ts` | **V1** | Help-page parsing + committed catalogue/manifest integrity |
| Scheduler | `tests/unit/transport-scheduler.test.ts` | **V1** | Queue mechanics, Retry-After, backoff — fake timers, injected `fetch` |
| Generator field schemas | `tests/unit/generate/field-schema.test.ts` | **V1** | `fieldToZodExpr` mapping rules |
| Coverage reconciliation | `tests/unit/coverage-reconciliation.test.ts` | **V1** | Catalogue ↔ fixtures ↔ coverage-matrix figure consistency |
| Fixture provenance | `tests/unit/fixture-provenance.test.ts` | **V1** | Every fixture carries source + date (see `contracts/fixtures/PROVENANCE.md`) |
| Property tests | `tests/property/core-properties.test.ts` | **V1** | fast-check invariants (decimal, OData, pagination) |
| M003/M004 contract suite | `tests/contract/m004-contracts.test.ts` | **V3** over **V4** | Fixtures drive requests; responses served by injected `fetch` harness |
| Full 622-endpoint contract suite | `tests/contract/all-endpoints-contract.test.ts` | **V3** over **V4** | Every `contracts/fixtures/**` operation: method, route, query, body, response-schema validation |
| MSW integration flows | `tests/integration/msw-integration.test.ts` | **V4** | Multi-component flows (auth → pagination → errors) over MSW-simulated responses |
| Live smoke | `tests/live/live-smoke.test.ts` | **V5** | Read-only auth + company list against real Sage; separate stage (below) |

**V2 note:** generated contract evidence is the schema/type layer itself —
`scripts/generate/` output validated by `tests/unit/generate/*` (V1 against
recorded sources in `contracts/sage-api/snapshots/`). No separate V2 runner is
registered; the level exists so generated-schema claims are never reported as
fixture or live verification.

## Live stage (V5) — separate and explicit

- Config: `vitest.live.config.ts` · Script: `pnpm test:live`.
- Requires `SAGE_USERNAME`, `SAGE_PASSWORD`, `SAGE_API_KEY` (optional
  `SAGE_COMPANY_ID`, `SAGE_BASE_URL`).
- Never part of `pnpm verify`, never in ordinary CI (ADR-013). Manual
  dispatch only: `.github/workflows/live-tests.yml`.
- Until the live stage runs, every operation is **Live-verified: 0** — see
  `docs/api/coverage-matrix.md`.

## Test reporting (spec §5.3.5)

| Question | Where answered |
|---|---|
| Which API operations have automated tests? | `docs/api/coverage-matrix.md` → Contract-tested 622/622 (`tests/contract/all-endpoints-contract.test.ts` executes every fixture) |
| Which resource schemas have validation tests? | `tests/unit/generate/field-schema.test.ts` (generation rules) + contract suite response validation per operation |
| Which workflows have fixture coverage? | `contracts/fixtures/` — 622 fixtures, one per operation; provenance in `contracts/fixtures/PROVENANCE.md` |
| Which workflows have mocked integration coverage? | `tests/integration/msw-integration.test.ts` (auth, pagination, error mapping) + contract harnesses |
| Which workflows have live verification? | `tests/live/` — currently 0 operations live-verified |
| Which operations remain unverified? | Coverage matrix "Live-verified" column: all 622, pending WP008.4 |

CI runs the non-live suites only (`pnpm verify` in `ci.yml`); no Sage
credentials are required or present. The live stage is a separate,
explicitly configured workflow.

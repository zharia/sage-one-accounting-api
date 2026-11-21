# ADR-013: Testing architecture

- **Status:** accepted
- **Date:** 2026-11-21

## Context

Spec §17 mandates unit, integration, contract, type, property and opt-in live tests, plus one comprehensive verification command.

## Problem

Organize test suites, tooling and gates so every change is provable and CI stays deterministic.

## Options considered

1. Vitest as runner for all suites; MSW for HTTP mocking; fast-check for properties; vitest typecheck for type tests; opt-in live suite.
2. Jest + separate type-test tool (`tsd`) + nock for HTTP.
3. Node built-in test runner + custom harness.

## Decision

Option 1.

| Suite | Location | Tool | Runs |
|---|---|---|---|
| Unit | `tests/unit` | vitest | always |
| Integration | `tests/integration` | vitest + MSW | always |
| Contract | `tests/contract` | vitest + MSW | always |
| Type | `tests/type-tests` | vitest `--typecheck` | always (verify) |
| Property | `tests/property` | fast-check via vitest | always |
| E2E | `tests/e2e` | vitest | when meaningful (pre-release) |
| Live | `tests/live` | vitest | explicit `SAGE_LIVE_TESTS=true` only |

Fixtures in `tests/fixtures` and `contracts/fixtures` must be traceable to Sage docs (URL+date) or verified live observations. Live tests never run in ordinary CI, avoid destructive operations, and never use production data.

`pnpm verify` (spec §17.7) is the single gate: format → lint → typecheck → tests → type tests → build → attw → docs presence → package contents.

## Rationale

- One runner for everything minimizes config drift; vitest typecheck replaces `tsd` (spec allows either).
- MSW intercepts at fetch level — matches our injectable-fetch design (ADR-006).
- Live isolation prevents accidental financial mutations in CI (spec §17.6, §25).

## Consequences

- Coverage reporting via `@vitest/coverage-v8` (informational; coverage thresholds deferred to M003+).
- Property tests required for OData encoding, pagination progression, decimal utilities, id parsing.
- Live suite needs a documented dedicated test company and credentials flow.

## Rejected alternatives

- Jest: slower ESM/TS story, second config ecosystem alongside vitest.
- tsd: extra tool; vitest typecheck covers the same assertions.
- nock: socket-level mocking conflicts with undici/fetch; MSW fits better.

## References

Spec §17; `scripts/verification/verify.sh`; `.agents/verification.md`.

# M003 — Core SDK infrastructure

- **Status:** accepted
- **Prerequisites:** M002 accepted (contract + auth verified)
- **Date opened:** 2026-11-21
- **Date completed:** 2026-11-21

## Objective

Implement client, configuration, transport, authentication abstraction, logging, errors, validation framework and shared types (spec §26, M003).

## Scope

In: everything under `src/` except `domains/**` resource implementations (one reference resource may be implemented to prove the pipeline end-to-end).

Out: broad domain coverage (M004+).

## Prerequisites

- M002 accepted: verified auth, catalogue, wire formats.

## Deliverables

- `SageOneClient` with injected config/auth/transport/logger; resource-service wiring pattern.
- Zod-validated `SageOneConfig` (precedence rules, secret handling).
- Transport: native fetch pipeline — headers, auth injection, JSON/multipart/binary, timeouts, AbortSignal, correlation IDs, conservative retry policy, deterministic error mapping, logging hooks.
- `SageAuthenticator` + verified concrete implementation (per M002 findings) + single-flight concurrency.
- `SageLogger` interface + pino adapter + redaction.
- Full `SageError` hierarchy with context preservation.
- Shared types: branded IDs/dates, paging envelope, money wire types + explicit decimal utilities (per accepted ADR-012).
- OData builder (ADR-010) + pagination iterator with limits (ADR-011).
- TypeDoc wiring; git hooks (repay TD-001/002); coverage thresholds decision (TD-004).

## Technical tasks

Layer-by-layer with tests as specified in spec §17. End-to-end proof: one real resource (e.g. Company or Account) fully implemented through the catalogue checklist.

## Test requirements

- Unit: config, auth (incl. concurrency), transport (timeouts/retries/abort via MSW), error mapping, logging redaction, OData encoding (fast-check), pagination progression (fast-check), decimal round-trip.
- Contract + integration tests for the reference resource.
- Type tests for public exports, branded distinctness, no `any` leaks.

## Documentation requirements

- Architecture docs updated from provisional → verified where M002/M003 confirmed things.
- `docs/reference/*` populated for implemented pieces; integration quick-start becomes accurate.
- Examples: `examples/basic/` compiles.

## Acceptance criteria

- [x] `pnpm verify` green incl. type tests and attw
- [x] Reference resource passes the full endpoint checklist (catalogue → fixture → types → schemas → service → tests → docs)
- [x] No unverified auth claims anywhere
- [x] Retry policy provably never retries mutations (test)
- [x] Redaction tests prove no secrets in logs/errors

## Risks

- Auth implementation mismatch with interface assumptions → revisit ADR-007 with evidence.
- Validation performance → toggles + measurement.

## Dependencies

- M002 outputs.

## Outstanding technical debt

_TD-001 (structural boundary enforcement) and TD-006 (opt-in live test suite) closed in M003; see `milestones/technical-debt.md`._

## Completion report

- **Completed:** 2026-11-21
- **Summary:**
  - Implemented `src/common` (branded identifiers, dates, `FixedDecimal`, `toDecimal`/`fromDecimal`), `src/errors` (12-class `SageError` hierarchy with secret sanitization), `src/logging` (`SageLogger`, `RedactingLogger`, `createPinoLogger`), `src/config` (Zod-validated `SageOneConfig`), `src/auth` (`SageAuthenticator` + `BasicAndApiKeyAuthenticator` with single-flight concurrency), `src/validation` (Zod request/response boundary validators), `src/types` (`ODataQueryBuilder`, `SagePage<T>`, `paginatePages`, `paginateItems`), `src/transport` (`SageTransport` with GET-only retries, timeouts, `AbortSignal`, correlation IDs, binary/JSON/multipart support), and `src/client` (`SageOneClient`).
  - Added structural import-boundary enforcement (`scripts/verification/check-boundaries.ts` wired into `verify.sh`, closing TD-001) and opt-in live test harness (`tests/live/live-smoke.test.ts`, addressing TD-006).
  - Verified with unit tests (`tests/unit/core-sdk.test.ts`), property-based tests (`tests/property/core-properties.test.ts`), MSW integration tests (`tests/integration/msw-integration.test.ts`), and compile-time type tests (`tests/type-tests/exports.test-d.ts`).

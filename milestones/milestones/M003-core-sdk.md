# M003 — Core SDK infrastructure

- **Status:** not started
- **Prerequisites:** M002 accepted (contract + auth verified)

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

- [ ] `pnpm verify` green incl. type tests and attw
- [ ] Reference resource passes the full endpoint checklist (catalogue → fixture → types → schemas → service → tests → docs)
- [ ] No unverified auth claims anywhere
- [ ] Retry policy provably never retries mutations (test)
- [ ] Redaction tests prove no secrets in logs/errors

## Risks

- Auth implementation mismatch with interface assumptions → revisit ADR-007 with evidence.
- Validation performance → toggles + measurement.

## Dependencies

- M002 outputs.

## Outstanding technical debt

_Typical: TD-001, TD-002, TD-003, TD-006 scheduled here._

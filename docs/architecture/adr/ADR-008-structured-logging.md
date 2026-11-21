# ADR-008: Structured logging

- **Status:** accepted
- **Date:** 2026-11-21

## Context

The SDK must be observable (correlation IDs, durations, retries, auth events) without forcing a logging library on consumers or leaking sensitive data (spec §13).

## Problem

Choose a logging abstraction and default implementation with strict redaction.

## Options considered

1. `SageLogger` interface (debug/info/warn/error) + pino as bundled default adapter.
2. Depend on pino directly throughout the SDK.
3. Use `console` with a level filter.
4. Accept `console`-compatible/loglevel-style objects only.

## Decision

Option 1. All modules log through the `SageLogger` interface; pino is the default adapter when `config.logging` enables logging and no custom logger is injected. Redaction happens before context reaches any logger. Defaults: minimal (warn/error) or disabled in production unless opted in; debug requires explicit opt-in.

## Rationale

- Consumer choice preserved (spec §13: "must not force consumers to use Pino directly").
- Pino is the spec-preferred implementation (§4.5) — fast, structured, mature redaction support.
- Interface is trivial to adapt to winston, bunyan, opentelemetry, or no-op.

## Consequences

- Redaction logic lives in the adapter boundary — tested explicitly (`tests/unit/logging`).
- Event catalogue fixed in `docs/architecture/logging.md`; new events documented there first.
- pino stays a runtime dependency (small, server-side only).

## Rejected alternatives

- Direct pino: couples every module to pino types; harder for consumers with existing logging stacks.
- console: no levels/structure/redaction guarantees; noisy in libraries.
- OpenTelemetry-only: useful later as an optional exporter, not a replacement for message logging.

## References

Spec §13, §4.5; `docs/architecture/logging.md`.

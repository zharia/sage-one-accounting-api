# ADR-001: SDK architectural model

- **Status:** accepted
- **Date:** 2026-11-21

## Context

The SDK must expose the full Sage One Accounting API surface (spec §2) while remaining maintainable across ~100 services. Two broad models exist: a flat request-builder API, or a layered client with domain service modules.

## Problem

Provide an idiomatic, discoverable interface without concealing Sage's semantics, and keep layers separable for testing and evolution.

## Options considered

1. Flat function API (`request(sage, "GET", "/Customers", …)`).
2. Single god-client class with inline logic.
3. Layered client: public SDK → domain services → contracts → validation → transport (+ auth/config/logging/errors).
4. Codegen-everything model where services are purely generated with no hand-written layer.

## Decision

Option 3 (layered), with codegen allowed only inside the contract/domain definitions (ADR-003).

## Rationale

- Matches spec §5.1 exactly.
- Domain services give discoverable properties (`sage.customers`, `sage.invoices`) with operation-specific methods.
- Transport/auth/logging/errors become single replaceable points — required for testing, retries, redaction.
- Contract fidelity isolated in one layer (spec §6.3).

## Consequences

- Strict dependency direction (`docs/architecture/module-boundaries.md`) must be policed.
- Cross-layer features (e.g., pagination iterators) need explicit design, not ad-hoc wiring.
- Slightly more boilerplate per resource than a flat API.

## Rejected alternatives

- Flat API: undiscoverable, untyped in practice, invites consumers to hand-build routes.
- God-client: untestable, no boundary for auth/transport injection.
- Pure codegen: can't express operation-specific semantics and documented per-endpoint differences reliably.

## References

Spec §5.1, §6.3; `docs/architecture/overview.md`.

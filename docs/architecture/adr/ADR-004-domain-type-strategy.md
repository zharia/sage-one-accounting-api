# ADR-004: Domain type strategy

- **Status:** accepted
- **Date:** 2026-11-21

## Context

Sage responses are JSON with PascalCase field names, numeric identifiers (to be confirmed per resource), JSON-number amounts and date strings. Consumers need strong types without silent semantic drift (spec §7).

## Problem

How to model identifiers, dates, money, enums, optionality, and the wire/SDK duality.

## Options considered

1. Plain primitives everywhere (`number`, `string`, `Record<string, unknown>`).
2. Branded types for identifiers/dates + literal-union enums + separate wire/SDK type layers.
3. Class-based domain model with methods (ORM style).

## Decision

Option 2:

- Branded types (`SageId`, `ISODateString`, …) built only via validated constructors.
- Identifier type per resource confirmed from the contract before branding (never assumed numeric).
- Enums as literal unions with forward-compatible parsing (unknown values tolerated).
- Five-state optionality preserved (required/optional/nullable/omitted/null) under `exactOptionalPropertyTypes`.
- Wire types (PascalCase, exact) kept distinct from SDK convenience types; conversion at explicit boundaries; default favours fidelity.
- Money: wire representation preserved; decimal-safe conversions explicit (ADR-012).

## Rationale

- Compile-time protection against swapping `CustomerId` for `SupplierId`.
- Matches spec §7.1–7.5 exactly.
- Forward-compatible enums prevent catastrophic failures when Sage adds values.

## Consequences

- More type definitions up front; constructors must be carefully designed.
- Conversion boundaries add explicit mapping code (documented, testable).
- Type tests (`tests/type-tests`) must guard distinctness and export surface.

## Rejected alternatives

- Primitives: no protection, invites ID mix-ups in financial code.
- Classes/ORM: implies behaviour Sage doesn't guarantee (no transactional/idempotency guarantees, spec §2.4); heavier serialization surface.

## References

Spec §7; `docs/architecture/domain-model.md`.

## Amendment — WP008.1 constrained enums (2026-11-23)

The decision line "Enums as literal unions with forward-compatible parsing
(unknown values tolerated)" is **reversed** for generated wire schemas: enum
fields now emit constrained literal unions from the published enum pages
(`contracts/sage-api/snapshots/model-extensions.json`), per M008 §5.1.3
(constrained representation; zero unexplained broad unions).

Rationale: the published enum pages are the contract; tolerating unknown enum
values weakened runtime validation (WP008.1). Forward compatibility is
preserved at the object level via `.passthrough()` — additional response
properties are accepted — without widening known enum definitions.

Reversal condition: WP008.4 live evidence that production responses contain
undocumented enum values; revisit this amendment then. See ADR-016.

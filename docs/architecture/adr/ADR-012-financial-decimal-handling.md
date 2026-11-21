# ADR-012: Financial decimal handling

- **Status:** provisional — pending confirmation of Sage's wire representation (M002)
- **Date:** 2026-11-21

## Context

Sage serializes monetary values as JSON numbers. Spec §7.2 forbids binary floating point as the authoritative representation for financial calculations and forbids silent rounding.

## Problem

Preserve exact wire values while enabling safe arithmetic, without imposing local accounting rules.

## Options considered

1. Preserve wire number verbatim as `Money`; provide explicit decimal-library conversion utilities for arithmetic; no implicit coercion.
2. Convert all amounts to `decimal.js` `Decimal` at parse time.
3. Convert all amounts to integer minor units at parse time.
4. Keep `number` and document "don't do arithmetic".

## Decision

Option 1 (provisional). Wire representation (JSON number / string if discovery shows strings) is preserved as-is in parsed structures. Explicit conversion functions (`toDecimal`, `fromDecimal`, formatting helpers) are the only path to arithmetic; they are visible at call sites. Never silently round or alter tax values. Final representation confirmed after M002 inspects real payloads (number vs string, precision, negative amounts, tax-inclusive/exclusive fields).

## Rationale

- Round-tripping without drift: any parse→serialize cycle must return the identical wire value.
- Explicit conversions make financial logic auditable (spec: "explicit conversion utilities").
- Avoids committing to a decimal library's semantics before we know the data (spec §21: decimal handling provisional until discovery).

## Consequences

- M002 must confirm: number vs string encoding, decimal places, rounding modes Sage itself applies, currency-specific precision.
- On confirmation: choose decimal library (`decimal.js` candidate), update this ADR to `accepted`, add property tests (round-trip, no precision loss).
- Consumers doing arithmetic must opt into conversion utilities — documented loudly in integration guides.

## Rejected alternatives

- Eager `Decimal` conversion: changes wire values on re-serialize risk; heavier parse path; hides original data.
- Integer minor units: assumes uniform scale across currencies/fields; Sage may send scaled or unscaled numbers — unverified.
- "Just use number": violates spec §7.2 outright.

## References

Spec §7.2, §21, §25; `docs/architecture/domain-model.md`.

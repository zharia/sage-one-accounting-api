# ADR-012: Financial decimal handling

- **Status:** accepted
- **Date:** 2026-11-21

## Context

Spec §7.2 and §25 forbid binary floating-point arithmetic as the authoritative representation for financial calculations and forbid silent rounding or tax alteration. During M002 discovery we inspected all 153 extracted resource models and 484 JSON payload samples across the 622 endpoints.

## Problem

Preserve exact wire values across parse/serialize round-trips while providing exact base-10 decimal arithmetic utilities without imposing local accounting rules.

## Verified findings (M002)

1. **Wire encoding:** Sage One serializes all `decimal` fields (`Balance`, `CreditLimit`, `Percentage`, `Total`, `Debit`, `Credit`, `PriceInclusive`, `PriceExclusive`, `Quantity`, `Cost`, `ExchangeRate`) as JSON numbers (e.g. `4.0`, `3.1`, `11.0`).
2. **Company-specific precision:** `Company` defines `CurrencyDecimalDigits`, `NumberDecimalDigits`, `HoursDecimalDigits`, `ItemCostPriceDecimalDigits`, `ItemSellingPriceDecimalDigits` (each `0..4`), `RoundingType`, and `RoundingValue`. Precision is therefore company- and field-dependent rather than a fixed global 2-decimal minor unit.

## Options considered

1. Preserve wire `number` (`WireMoney`) verbatim in parsed wire types and Zod schemas; provide `FixedDecimal` (arbitrary-precision base-10 `unscaled * 10^-scale` backed by `BigInt`) plus explicit `toDecimal` / `fromDecimal` conversion functions.
2. Eagerly transform all numbers to `FixedDecimal` inside Zod schemas.
3. Convert all amounts to integer cents (scale 2) at parse time.

## Decision

Option 1. Wire schemas keep `z.number()` so JSON round-tripping never mutates wire representations. `src/common/index.ts` provides `FixedDecimal`, `toDecimal(value)`, and `fromDecimal(decimal)` for exact base-10 addition, subtraction, multiplication, comparison, and explicit formatting (`toFixed(digits)`).

## Rationale

- Zero wire drift: parsing and re-serializing an entity preserves exact JSON number representation.
- `BigInt`-backed `FixedDecimal` handles arbitrary decimal places (`0..4+`) without binary floating-point error (`0.1 + 0.2 === 0.3`) and requires zero third-party runtime dependencies.
- Satisfies spec §7.2 and §25: conversions and rounding are always explicit at the call site.

## Consequences

- Property tests (`tests/property/core-properties.test.ts`) verify round-trip fidelity, commutativity, associativity, and additive inverse across arbitrary decimal values.
- Consumers use `toDecimal()` when aggregating or computing monetary amounts (demonstrated in `examples/customers/index.ts`).

## Rejected alternatives

- Option 2: Breaks wire-type compatibility with JSON payloads.
- Option 3: Fails for 4-decimal unit prices, quantities, and exchange rates documented on `Company` and `Item`.

## References

Spec §7.2, §21, §25; `src/common/index.ts`; `docs/architecture/domain-model.md`.

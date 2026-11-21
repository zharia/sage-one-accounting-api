# Domain model

Status: strategy fixed (ADR-004); concrete types grow with M002/M004.

## Principles

- Meaningful domain types over primitives: `CustomerId`, `AccountId`, `TaxTypeId` are distinct even when all are numeric on the wire.
- **Branded types** constructed only through validated parsing or explicit safe constructors.
- Identifier type per resource is **confirmed from the contract**, never assumed numeric (spec §7.1).

## Shared domain types (planned)

| Group | Types |
|---|---|
| Identifiers | `SageId`, `CompanyId`, `CustomerId`, `SupplierId`, `AccountId`, `TaxTypeId`, `InvoiceId`, … |
| Dates | `ISODateString`, `ISODateTimeString` (branded, validated) |
| Money | `Money` wire representation + explicit decimal conversion utilities |
| Tax | tax rate, tax amount, tax code references |
| Accounting | account code, account category, debit/credit, document number, exchange rate, financial period, ledger entry, document status |
| Enumerations | literal unions with forward-compatible parsing (unknown values tolerated, not fatal) |

## Money and decimals (ADR-012 — provisional until M002 confirms wire format)

- Sage serializes amounts as JSON numbers. **The wire value is preserved verbatim.**
- Binary floating point is never the authoritative representation for calculations.
- Decimal-safe arithmetic uses an explicit decimal library through dedicated conversion utilities — conversions are visible, never implicit.
- No silent rounding, no silent tax alteration (spec §25).

## Optional vs nullable (spec §7.4)

Required, optional, explicitly-nullable, omitted-from-request and returned-as-`null` are five distinct states. `exactOptionalPropertyTypes` enforces the distinction at compile time; Zod enforces it at runtime.

## Wire vs SDK types (spec §7.5)

- **Wire types:** exact Sage request/response representations, PascalCase, unmodified.
- **SDK types:** idiomatic, validated structures exposed to consumers.
- Conversion happens at explicit, documented boundaries only. Default behaviour favours API fidelity; any camelCase convenience layer must be opt-in and deterministic.

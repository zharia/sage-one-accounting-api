# Type reference

> TypeDoc API reference wires up in M003 (`docs/reference/` generated output). Until then, the public surface is `src/index.ts`.

## Planned public type groups (spec §19.3)

| Group | Examples | Defined in |
|---|---|---|
| Identifiers (branded) | `SageId`, `CompanyId`, `CustomerId`, `SupplierId`, `AccountId`, `TaxTypeId`, `InvoiceId` | `src/types` |
| Date/time (branded) | `ISODateString`, `ISODateTimeString` | `src/types` |
| Money & tax | wire amount types, explicit decimal conversion utilities | `src/types` (ADR-012 provisional) |
| Enums | account types, tax types, document statuses, transaction types, payment methods, currency codes, periods, recurrence | `src/types` (forward-compatible) |
| Paging | `SagePage<T>` envelope | `src/types` (ADR-011) |
| Queries | OData builder types | `src/types` (ADR-010) |
| Config | `SageOneConfig` | `src/config` |
| Logging | `SageLogger`, `LogLevel` | `src/logging` |
| Auth | `SageAuthenticator`, `AuthenticationContext`, `AuthenticationResult` | `src/auth` |
| Errors | full hierarchy | `src/errors` |

## Rules

- No `any` in public declarations (spec §4.6) — enforced by lint + type tests.
- Wire types (PascalCase) vs SDK convenience types documented side by side where both exist.
- Branded types construct only via validated parsers; type tests assert distinctness.

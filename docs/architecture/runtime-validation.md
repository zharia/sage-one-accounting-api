# Runtime validation

Status: approach fixed (ADR-005); schema inventory grows from M002.

## Framework

Zod. TypeScript types derive from schemas via `z.infer` — one definition per structure, no parallel hand-maintained duplicates.

## Per-resource schema set

- request schema
- response schema
- create/update schema where applicable
- query parameter schema
- enumeration schemas
- nested object schemas

## Validation points (minimum)

1. Configuration at client construction.
2. Structured request input before serialization.
3. Request serialization output (shape actually sent).
4. Received API responses where a schema exists.
5. Generated/transformed domain objects.

## Compatibility strategy

- **Responses:** preserve unknown fields; new Sage fields must not break consumers. Schemas use non-strict object parsing for responses where forward compatibility matters.
- **Requests:** strict — unknown properties indicate a bug and fail validation.
- **Enumerations:** forward-compatible — unknown future values parse into an `unknown`/passthrough variant instead of throwing catastrophically.

## Error content

Resource, operation, failing field path, expected structure, received value where safe. **Never secrets.** Mapped to `SageValidationError` (SDK-side) so consumers can distinguish from Sage-side rejections (`SageApiError`).

## Toggles

`config.validation.validateRequests` / `validateResponses` — default on; disabling is an explicit performance trade-off, documented as such.

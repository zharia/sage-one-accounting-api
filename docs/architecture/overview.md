# Architecture overview

Status: M001 skeleton — decisions provisional until M002 (contract discovery) and M003 (core SDK) complete.

## Purpose

`@bytemoney/sage-one-accounting-api` is a strongly typed TypeScript SDK for the Sage One Accounting API (South Africa, `2.0.0`). It hides HTTP mechanics from consumers while preserving Sage's semantics exactly.

## Layer model

```text
Consuming Application
        |
        v
Public TypeScript SDK            src/index.ts, src/client
        |
        v
Domain Service Modules           src/domains/*  (accounts, customers, invoices, ...)
        |
        v
API Contract / Request Models    src/types, colocated wire types (PascalCase preserved)
        |
        v
Runtime Validation               src/validation (Zod schemas, z.infer)
        |
        v
HTTP Transport                   src/transport (fetch, timeouts, retries, correlation IDs)
        |
        +------ Authentication    src/auth (SageAuthenticator interface)
        +------ Configuration     src/config (Zod-validated, injected)
        +------ Logging           src/logging (SageLogger interface, pino adapter)
        +------ Error Mapping     src/errors (SageError hierarchy)
        |
        v
Sage One Accounting API
```

## Responsibility summary

| Layer | Owns | Never owns |
|---|---|---|
| Public SDK | Client construction, stable service properties, public types, error classes | HTTP details, auth mechanics |
| Domain services | Typed operations per Sage resource, operation-specific names | HTTP clients, retries, logging |
| API contracts | Wire request/response shapes, Sage field names, endpoint-specific differences | Normalized alternative data models |
| Validation | Request/response schemas, boundary checks, structured validation errors | Business rules |
| Transport | Request construction, headers, auth injection, serialization, timeouts, cancellation, retries, error conversion, logging | Domain semantics |
| Auth | Credential application, renewal, concurrency-safe caching | Logging secrets, inventing OAuth |
| Config | Validation, defaults, precedence | Reading env vars implicitly |
| Logging | Interface, levels, redaction | Forcing pino on consumers |
| Errors | Hierarchy, context, retryability, cause preservation | Dropping original Sage responses |

## Non-negotiable invariants

1. Domain services never issue HTTP directly (ADR-001, ADR-006).
2. Wire fidelity: PascalCase names, no silent transformation of money, IDs, dates, enumerations (ADR-004).
3. Retries: GET-only by default; financial mutations never auto-retried (spec §10.1).
4. Secrets never appear in logs, errors or fixtures (spec §13, §25).
5. Validation derives TypeScript types from Zod — one definition per structure (ADR-005).

## Related documents

- [Design principles](./design-principles.md)
- [Module boundaries](./module-boundaries.md)
- [Authentication](./authentication.md) — provisional, discovery pending (M002)
- [Transport](./transport.md), [Error handling](./error-handling.md), [Logging](./logging.md)
- [Configuration](./configuration.md), [Domain model](./domain-model.md), [Runtime validation](./runtime-validation.md)
- [ADRs](./adr/)

# Architecture guide for agents

Authoritative policy: [`AGENTS.md`](../AGENTS.md). Design details: [`docs/architecture/`](../docs/architecture/overview.md).

## Layer model (strict top-down dependencies)

```text
Consuming Application
  -> Public SDK (src/index.ts, client/)
    -> Domain services (src/domains/*)
      -> API contracts + Zod schemas (src/types, colocated schemas)
        -> Runtime validation (src/validation)
          -> HTTP transport (src/transport)
             + auth (src/auth) + config (src/config) + logging (src/logging) + errors (src/errors)
          -> Sage One Accounting API
```

## Dependency rules

1. `src/domains/**` may import from `types`, `validation`, `errors`, `common` and the client request context — **never** from `transport` directly to issue HTTP, never `fetch`/`axios`.
2. `src/transport/**` owns all HTTP: headers, auth injection, serialization, timeouts, retries, logging, error conversion.
3. `src/auth/**` implements `SageAuthenticator`-style interface only; no domain knowledge.
4. `src/internal/**` is never exported from the package entry point.
5. `contracts/` is data (catalogue, snapshots, fixtures) — no SDK code imports from it at runtime.
6. Wire types (PascalCase, Sage field names) live apart from SDK convenience types; conversion happens at explicit boundaries.

## Key invariants

- One transport, one config, one logger interface — injected, replaceable.
- Zod schemas are the single source of truth for a structure: derive types with `z.infer`, never maintain parallel hand-written duplicates.
- Errors map deterministically to the hierarchy in `docs/architecture/error-handling.md`.
- Retry policy is transport-owned and conservative: GET-only unless explicitly configured otherwise; mutations never retried by default.
- Financial values keep their wire representation; decimal utilities are explicit conversions, not implicit coercions.

## Adding a layer-crossing feature

Record an ADR first (see `docs/decisions/decision-index.md`), update `docs/architecture/module-boundaries.md`, then implement.

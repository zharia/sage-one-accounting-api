# ADR-006: HTTP transport using Fetch

- **Status:** accepted
- **Date:** 2026-11-21

## Context

The transport layer must support JSON, multipart, binary responses, timeouts, `AbortSignal`, retries, correlation IDs and injectable implementations (spec §10).

## Problem

Select the default HTTP client without locking consumers into a dependency, while supporting MSW-based testing.

## Options considered

1. Node.js native `fetch` (undici) as default, injectable Fetch-compatible implementation.
2. Axios as the client.
3. Node `http`/`https` with a hand-rolled wrapper.
4. ky / ofetch / similar Fetch wrappers.

## Decision

Option 1. Native `fetch` by default; `config.transport.fetch` accepts any Fetch-compatible implementation (tests inject MSW-covered fetch; consumers may inject instrumentation). Axios is not introduced (spec §10: "unless a concrete technical requirement emerges").

## Rationale

- Zero-dependency, standard across Node ≥18, first-class `AbortSignal`.
- Fetch-compatible injection is exactly what MSW needs for integration tests (spec §17.2).
- Avoids dual abstraction layers (Fetch + Axios) with divergent semantics.

## Consequences

- Must compose timeouts ourselves (`AbortSignal.timeout` + `AbortSignal.any`) — careful with Node version differences.
- No request/response interceptors out of the box; logging/retry live in our pipeline by design.
- Multipart via native `FormData`; binary via `arrayBuffer()`/`Blob()`.

## Rejected alternatives

- Axios: extra dependency, its own error/cancel semantics to re-map; spec discourages.
- Raw `http`: re-implements redirects, connection pooling, HTTP/2 details for no benefit.
- ky/ofetch: thin wrappers today, another dependency and upgrade cadence to track.

## References

Spec §10, §4.5 (HTTP: native Fetch API); `docs/architecture/transport.md`.

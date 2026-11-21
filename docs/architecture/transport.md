# HTTP transport

Status: design final, implementation lands in M003.

## Choices

- **Default:** Node.js native `fetch` (undici). No Axios dependency (ADR-006).
- **Injectable:** any Fetch-compatible implementation via `config.transport.fetch` — required for MSW in tests and for consumer-supplied instrumentation.

## Responsibilities (transport owns all of these)

| Concern | Behaviour |
|---|---|
| Base URL | Configurable; per-request relative routes only |
| Headers | Content-type negotiation, correlation ID, custom headers from config |
| Auth injection | Delegates to `SageAuthenticator.apply` — transport never reads credentials |
| Serialization | JSON default; multipart for attachments; binary responses as `ArrayBuffer`/`Blob` |
| Timeouts | Client default + per-request override; `AbortSignal` composition |
| Cancellation | `AbortSignal` support; aborted requests map to distinguishable `SageTimeoutError`/abort error |
| Retries | Conservative, policy-driven (below) |
| Errors | Deterministic mapping into `SageError` hierarchy; original response preserved |
| Logging | `SageLogger` events: method, path, status, duration, attempt, correlation ID — never bodies by default |

## Retry policy (spec §10.1)

- **Default:** retries disabled for mutations; GET retried only for transient failures (network reset, 429, 502/503/504) with capped attempts and jittered backoff.
- **Never auto-retried:** invoice, supplier payment, customer receipt, journal entry, bank transaction creation — any financial mutation.
- Rationale: a timeout does not prove Sage failed to process a mutation; careless retries duplicate financial transactions.
- Per-request opt-in required to extend retry to anything else; documented as the caller's responsibility.

## Logging events

Request start/end, status, duration, retry attempt, auth refresh (without credentials), abort. Correlation ID generated per request and echoed in errors.

## Testing

MSW handlers in `tests/mocks` exercise timeouts, retries, aborts, non-JSON bodies and error mapping without network access.

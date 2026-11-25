# HTTP transport

Status: design final, implementation lands in M003; central scheduler added in M008 (WP008.2, ADR-017).

## Choices

- **Default:** Node.js native `fetch` (undici). No Axios dependency (ADR-006).
- **Injectable:** any Fetch-compatible implementation via `config.transport.fetch` — required for MSW in tests and for consumer-supplied instrumentation.
- **Scheduling:** every attempt acquires a permit from the central `RequestScheduler` before the timeout timer starts (ADR-017).

## Responsibilities (transport owns all of these)

| Concern | Behaviour |
|---|---|
| Base URL | Configurable; per-request relative routes only |
| Headers | Content-type negotiation, correlation ID, custom headers from config |
| Auth injection | Delegates to `SageAuthenticator.apply` — transport never reads credentials (auth preflight is the one scheduler bypass) |
| Serialization | JSON default; multipart for attachments; binary responses as `ArrayBuffer`/`Blob` |
| Timeouts | Client default + per-request override; `AbortSignal` composition; queue wait excluded |
| Cancellation | `AbortSignal` support while queued (never dispatched) and in flight; aborted requests map to `SageTimeoutError { isAborted }` |
| Scheduling | Global concurrency cap, per-company lane isolation, FIFO + round-robin fairness, pacing, lane suspension, graceful shutdown (ADR-017) |
| Retries | Conservative, policy-driven (below) |
| Errors | Deterministic mapping into `SageError` hierarchy; original response preserved |
| Logging | `SageLogger` events: method, path, status, duration, attempt, correlation ID, scheduler queue wait — never bodies or credentials |

## Retry policy (spec §10.1, §5.2.4–§5.2.5)

- **Default:** retries disabled for mutations; GET/HEAD retried only for transient failures (network reset, 429, 502/503/504) with capped attempts.
- **Unsafe methods** (PUT/DELETE/POST) retry only with explicit `allowRetry: true`.
- **Never auto-retried:** invoice, supplier payment, customer receipt, journal entry, bank transaction creation — any financial mutation.
- **`Retry-After`:** honoured on 429 — delta-seconds and HTTP-date both parsed (`parseRetryAfterMs`); invalid values fall back to backoff. The affected company lane is suspended for the delay so unrelated lanes keep running; a delay beyond `scheduler.maxRetryAfterMs` preserves the original `SageRateLimitError` (with `retryAfterSeconds`).
- **Backoff:** full jitter — `random() * min(scheduler.maxBackoffMs, retry.baseDelayMs * 2^(attempt-1))`; abortable.
- Rationale: a timeout does not prove Sage failed to process a mutation; careless retries duplicate financial transactions.
- Per-request opt-in required to extend retry to anything else; documented as the caller's responsibility.

## Scheduler observability

`client.schedulerSnapshot()` returns active/pending counts and per-lane suspension state (no headers, tokens or payloads). `client.shutdown()` stops admitting new requests (`SAGE_SCHEDULER_SHUTDOWN`), drains queued and in-flight work, then resolves.

## Logging events

Request start/end, status, duration, retry attempt, scheduler enqueue/dispatch/cancel, rate-limit suspension, auth refresh (without credentials), abort. Correlation ID generated per request and echoed in errors.

## Testing

MSW handlers in `tests/mocks` exercise timeouts, retries, aborts, non-JSON bodies and error mapping without network access. Scheduler behaviour (concurrency, lanes, cancellation, Retry-After, backoff, shutdown) is covered deterministically with fake timers in `tests/unit/transport-scheduler.test.ts`.

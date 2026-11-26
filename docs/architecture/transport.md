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
| Auth injection | Delegates to `SageAuthenticator.apply` — transport never reads credentials. `verifyAuthentication()` uses a single-flight raw fetch outside the scheduler; `Login/Validate` via the login service still passes through it (ADR-017 Amendment §3) |
| Serialization | JSON default; multipart for attachments; binary responses as `ArrayBuffer`/`Blob` |
| Timeouts | Client default + per-request override; `AbortSignal` composition; queue wait excluded |
| Cancellation | `AbortSignal` support while queued (never dispatched) and in flight; aborted requests map to `SageTimeoutError { isAborted }` |
| Scheduling | Global concurrency cap, per-company lane isolation, FIFO + round-robin fairness, pacing, lane suspension, graceful shutdown (ADR-017) |
| Retries | Conservative, policy-driven (below) |
| Errors | Deterministic mapping into `SageError` hierarchy; original response preserved |
| Logging | `SageLogger` events: method, path, status, duration, attempt, correlation ID, scheduler queue wait — never bodies or credentials |

## Retry policy (spec §10.1, §5.2.4–§5.2.5)

- **Default:** retries disabled for mutations; GET/HEAD retried only for transient failures (network reset, 502/503/504) with capped attempts. HTTP 429 is **not** a transient retry status — it has its own suspension policy (below).
- **Unsafe methods** (PUT/DELETE/POST) retry only with explicit `allowRetry: true`.
- **Never auto-retried:** invoice, supplier payment, customer receipt, journal entry, bank transaction creation — any financial mutation.
- **Pacing:** default `scheduler.minIntervalMs` = **1 000 ms** per company lane — Sage's published ≤1 req/s guidance (developer-api page, accessed 2026-11-25); client-side safeguard, explicit override allowed (ADR-017 Amendment §1).
- **429 / `Retry-After`:** any resource-request 429 suspends its company lane regardless of retry configuration. Delta-seconds and HTTP-date both parsed (`parseRetryAfterMs`). Valid delay ≤ `scheduler.maxRetryAfterMs` with retries remaining → caller retries only after the full suspension; valid delay > max → lane suspended for the **full** server delay and the original `SageRateLimitError` (with `retryAfterSeconds`) thrown; **missing/invalid header → lane suspended for `scheduler.rateLimitFallbackMs` (default 1 h, the documented block) and `SageRateLimitError` thrown immediately — never backoff-probed.** `Login/Validate` 429 maps to `SageAuthenticationError` (20 failed logins/hour → 24 h username block) with no resource-lane suspension.
- **Backoff:** full jitter — `random() * min(scheduler.maxBackoffMs, retry.baseDelayMs * 2^(attempt-1))`; abortable; caller abort during backoff rejects with `SageTimeoutError { isAborted: true }` and never dispatches again.
- Rationale: a timeout does not prove Sage failed to process a mutation; careless retries duplicate financial transactions.
- Per-request opt-in required to extend retry to anything else; documented as the caller's responsibility.

## Scheduler observability

`client.schedulerSnapshot()` returns active/pending counts and per-lane suspension state (no headers, tokens or payloads). `client.shutdown()` stops admitting new requests (`SAGE_SCHEDULER_SHUTDOWN`), drains queued and in-flight work, then resolves.

**Scope:** one scheduler per `SageOneClient` — separate clients (even in one process) do not share pacing or suspensions, and separate processes do not coordinate. Cross-instance coordination is the application's responsibility; distributed coordination is explicitly deferred (ADR-017 Amendment §5–§7).

## Logging events

Request start/end, status, duration, retry attempt, scheduler enqueue/dispatch/cancel, rate-limit suspension, auth refresh (without credentials), abort. Correlation ID generated per request and echoed in errors.

## Testing

MSW handlers in `tests/mocks` exercise timeouts, retries, aborts, non-JSON bodies and error mapping without network access. Scheduler behaviour (concurrency, lanes, cancellation, Retry-After, backoff, shutdown) is covered deterministically with fake timers in `tests/unit/transport-scheduler.test.ts`.

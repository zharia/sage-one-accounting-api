# ADR-017: Central request scheduler

- **Status:** accepted
- **Date:** 2026-11-25

## Context

WP008.2 (M008 §5.2) found that `SageTransport.execute` was the single choke
point for every API request but had no coordination: independent callers could
generate concurrent traffic, HTTP 429 responses were mapped to
`SageRateLimitError` yet the `Retry-After` header was parsed and then ignored
(no wait before the next attempt), backoff was fixed exponential with no
jitter and no abort support, and nothing stopped one company's rate limit from
affecting another company's requests.

## Problem

Coordinate all API requests through one scheduling point that honours
server-provided rate-limit hints, bounds retry delays, isolates companies, and
supports cancellation and graceful shutdown — without inventing undocumented
Sage API limits and without ever auto-retrying financial mutations
(spec §5.2.2–§5.2.7).

## Decision

A `RequestScheduler` (`src/transport/scheduler.ts`) is composed into
`SageTransport`'s constructor; every attempt calls `acquire()` **before** the
request-timeout timer starts (queue wait never consumes the timeout) and
releases the permit in `finally` (idempotent — retry paths release explicitly
before sleeping, then release again safely).

1. **Lanes.** Key = `request.companyId ?? config.companyId ?? "default"`.
   A suspension (429) applies only to that lane; unrelated lanes keep
   dispatching. FIFO within a lane, round-robin fairness between lanes.
2. **Concurrency and pacing.** Global cap `scheduler.maxConcurrency`
   (default 4) plus optional per-lane spacing `scheduler.minIntervalMs`
   (default 0). The documented 100 req/min per-company limit is expressible
   as `minIntervalMs: 600` — no undocumented threshold is assumed.
3. **429 handling.** Suspension engages only on the retry path
   (`canRetry && attempt < maxAttempts`), so a request with retries disabled
   fails fast instead of hanging. `Retry-After` (delta-seconds **or**
   HTTP-date, RFC 9110 §10.2.3) is parsed by `parseRetryAfterMs`; invalid
   values fall back to backoff rather than guessing. If the server demands a
   wait longer than `scheduler.maxRetryAfterMs` (default 60 s), the lane is
   suspended for the **full** server delay and the original
   `SageRateLimitError` (with `retryAfterSeconds`) is thrown — the documented
   max-wait policy is honoured without discarding the server's instruction.
4. **Backoff.** Full jitter: `random() * min(maxBackoffMs, base * 2^(attempt-1))`
   (`computeBackoffDelayMs`, injectable `random` for tests), bounded by
   `scheduler.maxBackoffMs` (default 30 s), abortable via the caller's
   `AbortSignal`.
5. **Retry safety.** GET/HEAD retry transient failures automatically;
   PUT/DELETE/POST require explicit `allowRetry: true`; financial mutations
   never retry (unchanged hard rule). `HEAD` added to `HttpMethod` for the
   safe-method policy.
6. **Cancellation and shutdown.** Queued requests are cancellable via
   `AbortSignal` (removed from the queue, never dispatched; rejects with
   `SageTimeoutError { isAborted: true }`). `shutdown()` stops admitting new
   requests (`SAGE_SCHEDULER_SHUTDOWN` error code), drains queued and
   in-flight work, then resolves. Public surface: `client.shutdown()` and
   `client.schedulerSnapshot()` (counts and lane state only — no headers,
   tokens or payloads).
7. **Logging.** `scheduler.enqueue` / `scheduler.dispatch` /
   `scheduler.cancel` / `scheduler.rate_limit` events carry lane, method,
   resource, operation, correlation ID, queue wait and delay — never
   credentials or bodies.

### Exception: authentication preflight

`Login/Validate` runs once inside `SageAuthenticator.authenticate` at client
construction, before any other request exists — it bypasses the scheduler
because there is nothing to coordinate against yet. Any request issued after
construction goes through the scheduler.

### Configuration

New `scheduler` config block (`maxConcurrency`, `minIntervalMs`,
`maxRetryAfterMs`, `maxBackoffMs`, `jitter`), Zod-validated, defaults
described above.

## Consequences

- All domain services inherit scheduling for free; none may implement their
  own rate-limit handling (spec §5.2.2).
- `docs/architecture/transport.md` and `docs/reference/configuration.md`
  document the scheduler and retry policy; `docs/integration/error-handling.md`
  points consumers at `retryAfterSeconds`.
- Deterministic tests (`tests/unit/transport-scheduler.test.ts`, fake
  timers only) cover the §5.2.8 list; no real-world delays.
- Queue wait is observable (`schedulerSnapshot()`) but deliberately excluded
  from request timeouts.

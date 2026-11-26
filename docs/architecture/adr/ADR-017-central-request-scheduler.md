# ADR-017: Central request scheduler

- **Status:** accepted (amended by WP008.2R, 2026-11-25 — see Amendment below)
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
   (default 4) plus per-lane spacing `scheduler.minIntervalMs`
   (default 1 000 ms — Sage's published ≤1 req/s guidance; see Amendment).
   The documented 100 req/min per-company limit is expressible as
   `minIntervalMs: 600` — no undocumented threshold is assumed.
3. **429 handling (original WP008.2 semantics — superseded in part by the
   Amendment below).** Suspension engaged only on the retry path, invalid
   `Retry-After` fell back to exponential backoff, and the Login/Validate
   throttle was not distinguished from a resource rate limit. The amended
   policy is: every non-auth 429 suspends the lane regardless of retry
   configuration; a missing/invalid `Retry-After` suspends for the
   documented one-hour block and surfaces `SageRateLimitError` immediately
   (never backoff-probing); a valid delay longer than
   `scheduler.maxRetryAfterMs` suspends the lane for the **full** server
   delay and throws the original `SageRateLimitError` (with
   `retryAfterSeconds`).
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

### Exception: authentication (corrected in Amendment)

`Login/Validate` does **not** run at client construction — construction
performs no network I/O. `client.verifyAuthentication()` triggers
`BasicAndApiKeyAuthenticator.authenticate`, a single-flight raw `fetch`
that never enters the scheduler (single attempt, no retry loop).
`client.login.validate()` goes through `SageTransport` and therefore the
scheduler, but its 429 is the documented failed-login throttle and is
handled per the Amendment (error mapping, no lane suspension).

### Configuration

New `scheduler` config block (`maxConcurrency`, `minIntervalMs`,
`maxRetryAfterMs`, `rateLimitFallbackMs`, `maxBackoffMs`, `jitter`),
Zod-validated, defaults described above.

## Amendment — WP008.2R (2026-11-25)

Remediation of WP008.2 against verified Sage guidance. Supersedes any
conflicting wording above; decision otherwise unchanged.

**Official source (rate-limit claims):** Sage South Africa, *Developer API*,
https://www.sage.com/en-za/sage-business-cloud/accounting/developer-api/,
accessed **2026-11-25** (also Sage Tech Marketplace request-limits page).
Published: 100 requests/min per company; **≤1 request/sec advised**; breach
→ HTTP 429 with a documented **one-hour block** during which "you must not
continue to make requests" (continued requests may extend the block);
failed logins 20/hour → HTTP 429 with a **24-hour username block**; blocks
scoped to API key + Company ID + User (company isolation). **No
`Retry-After` behaviour is documented by Sage** — the SDK parses the header
when present (RFC 9110 §10.2.3) but never assumes it exists.

1. **Default pacing.** `minIntervalMs` default changed `0` → **1 000 ms**,
   reflecting the ≤1 req/s guidance. Client-side safeguard only, not a Sage
   protocol guarantee; explicit `scheduler: { minIntervalMs: … }` overrides
   it (tests pin `0` for speed). Global concurrency cap (`maxConcurrency`,
   default 4) and per-company pacing are independent: the cap bounds
   in-flight work across all lanes, pacing bounds dispatch rate inside one
   lane.
2. **429 suspension semantics.** A 429 on a resource request **always**
   suspends its company lane (full computed suspension), independent of
   retry configuration — the server said stop, so the lane stops. Retry
   policy only decides whether *this caller* waits and retries:
   - valid `Retry-After` ≤ `scheduler.maxRetryAfterMs` (60 s), retries
     enabled, attempts left → lane suspended for the delay; caller retries
     only after it fully elapses (next `acquire` cannot dispatch earlier);
   - valid `Retry-After` > max → lane suspended for the **full** server
     delay; original `SageRateLimitError` thrown (never shorten a
     server instruction);
   - **missing or invalid `Retry-After` → lane suspended for
     `scheduler.rateLimitFallbackMs` (default 3 600 000 ms = the documented
     1 h block; 0 disables, max 24 h) and `SageRateLimitError` thrown
     immediately — no exponential-backoff probing of a service that may be
     blocking us.** 429 was removed from `TRANSIENT_HTTP_STATUSES`.
3. **Authentication throttle separation.** `Login/Validate` 429 maps to
   `SageAuthenticationError` (status 429, login-throttle message citing the
   20/hour → 24 h block) and does **not** suspend any resource lane —
   the failed-login block is scoped to the username, not the company's
   request quota. `verifyAuthentication()` stays single-flight with exactly
   one fetch and no retry loop; repeated invalid-credential construction
   performs one attempt each (tested).
4. **Cancellation/timeout during backoff.** Every backoff/suspension wait
   is preceded by `clearTimeout` on the attempt timer (a timeout never
   consumes the backoff window — each retry gets a fresh timeout). A caller
   abort during backoff rejects with `SageTimeoutError { isAborted: true }`
   (never a bare `Error`), terminates the retry sequence, and no further
   request is dispatched. Abort listeners are removed when the wait
   resolves (`removeEventListener` verified by test).
5. **Ownership and lifecycle.** One `RequestScheduler` instance per
   `SageTransport` (one per `SageOneClient`), created in the transport
   constructor, shut down via `client.shutdown()`. No process-global
   singleton: **two clients in one process do not share pacing or
   suspensions**, and **two processes do not coordinate at all** — limits
   are enforced per instance. Callers needing cross-instance coordination
   must serialize externally.
6. **Lane key.** `String(request.companyId ?? config.companyId ??
   "default")` — matches Sage's documented isolation scope (API key +
   Company ID + User); a suspension affects only that lane.
7. **Deferred: distributed coordination.** Cross-process / cross-instance
   rate-limit coordination (shared store, leader election, etc.) is
   explicitly **out of scope** — spec §11 forbids distributed scheduling
   infrastructure and the transport architecture must be preserved.
   Tracked in `milestones/technical-debt.md`.
8. **Release-pipeline correction (R.6).** `changesets/action@v2` requires
   Changesets CLI v3; the repo was pinned to `@changesets/cli@2.29.8`,
   causing the hard failure observed in run #16 (id 45566758443). Fixed:
   CLI → `3.0.3`, action inputs renamed `publish`/`version` →
   `publish-script`/`version-script`. `NPM_TOKEN` repo secret is empty —
   publish path deferred (Version-PR path does not need it); recorded in
   technical debt.

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

# How it works

This page walks one API call from your code down to Sage and back. For the
full design, see the
[architecture overview](../architecture/overview.md) and the
[ADR index](../decisions/decision-index.md).

## The shape of the client

```typescript
const sage = new SageOneClient({ credentials, apiKey, companyId, ... });
```

`SageOneClient` is a composition root. Its constructor wires four layers
and then hands you **domain services** — one property per Sage service:

```
your code
  └─ domain service          sage.accounts, sage.invoices, sage.journalEntries, …
       └─ SageTransport      HTTP, timeouts, retries, scheduling, error mapping
            └─ authenticator Basic auth + apikey + CompanyId injection
                 └─ fetch    native Node.js fetch (or anything you inject)
```

- **162 domain services, 622 operations** are generated from the archived
  endpoint catalogue, then hand-refined — so the client surface tracks the
  real API rather than a curated subset.
- Construction performs **no network I/O**. Nothing happens until you call
  a method.

## A request, step by step

Take `sage.accounts.list({ odata: … })`:

1. **Query construction.** The typed `odata<Account>()` builder turns
   fluent calls into an OData query string (`$filter`, `$orderby`, `$top`,
   `$skip`). No string concatenation, no untyped parameters.

2. **Validation (outbound).** If you passed a request body, its Zod schema
   validates it *before* anything is sent — a typo in a field name fails in
   your process, not against the live API.

3. **Authentication.** The authenticator decorates the request:
   `Authorization: Basic …` header, `apikey` and `CompanyId` query
   parameters. The transport never reads your credentials itself.

4. **Scheduling.** The request enters the central
   [request scheduler](#the-request-scheduler) — it may wait for a
   concurrency slot, for its company's pacing interval, or for a
   rate-limit suspension to expire. Queue wait does **not** consume your
   timeout budget.

5. **Dispatch.** `fetch` fires with a correlation ID attached. A timeout
   timer starts only now.

6. **Response handling.**
   - `2xx` → parsed, then **validated (inbound)** by the response Zod
     schema (toggleable), then returned as a typed object with Sage's own
     field names intact.
   - `4xx/5xx` → mapped into the structured error hierarchy
     (`SageRateLimitError`, `SageNotFoundError`, `SageConflictError`,
     …) preserving status, response body and correlation ID.

7. **Retry policy (conservative by design).**
   - `GET`/`HEAD` may retry transient failures (network errors, 502/503/504)
     with capped, jittered backoff.
   - **Financial mutations never auto-retry** — a timeout does not prove
     Sage failed to process a payment, so replaying one could duplicate a
     real transaction.
   - `429` has its own policy (below), never generic backoff.

## The request scheduler

Every attempt passes through one scheduler instance per client
([ADR-017](../architecture/adr/ADR-017-central-request-scheduler.md)):

- **Per-company lanes.** Lane key = company ID. A suspension for one
  company never stalls another.
- **Pacing.** Default **1 request/second per company** — Sage's published
  guidance; configurable.
- **Concurrency cap.** Default 4 in-flight requests globally.
- **HTTP 429 handling.** The lane suspends using the server's
  `Retry-After` when present (delta-seconds or HTTP-date); when the header
  is missing or invalid, it falls back to Sage's documented one-hour block
  and surfaces `SageRateLimitError` immediately instead of probing the
  service. A server-directed delay is never shortened.
- **Cancellation.** Cancel a queued or backing-off request with an
  `AbortSignal`; you get `SageTimeoutError { isAborted: true }` and the
  request is never dispatched.
- **Graceful shutdown.** `await sage.shutdown()` stops admitting new
  requests, drains queued and in-flight work, and resolves.
- **Observability.** `sage.schedulerSnapshot()` reports counts and lane
  state — no headers, tokens or payloads.

## Authentication

Two distinct mechanisms, deliberately separate:

- **Every request** carries HTTP Basic credentials plus the `apikey` and
  `CompanyId` query parameters (Sage's documented scheme).
- **`sage.verifyAuthentication()`** actively validates credentials against
  `POST /Login/Validate` — single-flight, exactly one attempt, no retry
  loop. Repeated failures never turn into a retry storm, and a login
  throttle (Sage blocks the username for 24 hours after 20 failed logins
  per hour) surfaces as an authentication error, not a generic rate limit.

See [authentication guide](../integration/authentication.md).

## Cross-cutting concerns

| Concern | Behaviour |
|---|---|
| **Errors** | One `SageError` hierarchy with stable `code`s; original response context preserved ([errors](../integration/error-handling.md)) |
| **Logging** | Pluggable logger; sensitive keys and credentials redacted before anything reaches your sink |
| **Pagination** | `for await (… of service.iterate())` walks pages transparently |
| **Financial values** | Money and dates pass through untransformed — no silent rounding or reformatting (ADR-012) |
| **Config** | Zod-validated at construction; unknown or invalid fields throw `SageConfigurationError` with field-level, secret-free messages ([configuration](../integration/configuration.md)) |

Next: [Why use it?](./why-use-it.md)

# Why use it?

The short version: **the SDK does the boring, dangerous parts correctly, so
your application code only contains accounting logic.**

## The alternative

Without an SDK, a Sage One integration is a pile of `fetch` calls:

```typescript
// The same list operation, hand-rolled — and this is the good version
const res = await fetch(
  `https://accounting.sageone.co.za/api/2.0.0/Account/Get?` +
    new URLSearchParams({ apikey, CompanyId: "12345", $filter: "Active eq true" }),
  {
    headers: { Authorization: `Basic ${btoa(`${user}:${pass}`)}` },
    signal: AbortSignal.timeout(30_000),
  },
);
if (res.status === 429) { /* … now what? */ }
const json = await res.json(); // typed how? validated how? paginated how?
```

Every integration then re-implements — and re-defects — the same layer:
authentication quirks, pagination, `Retry-After` parsing, error shapes,
timeout handling. The SDK replaces all of it with a tested, typed surface.

## What you get

### 1. Complete, honest coverage

All **622 discovered operations** across 162 services are implemented,
typed, runtime-validated and contract-tested. The
[coverage matrix](../api/coverage-matrix.md) reports what is implemented,
what is fixture-verified and what is live-verified — no ambiguous
percentages. Where Sage's own documentation is incomplete, the
[known-limitations register](../api/known-limitations.md) says so.

### 2. Financial safety by default

- Financial mutations are **never automatically retried** — a network
  timeout cannot prove a payment wasn't processed, so the SDK refuses to
  gamble with duplicate transactions.
- Monetary values and dates are **never silently rounded or rewritten**;
  wire representation survives the round trip (ADR-012, property-tested).
- Request and response boundaries are **Zod-validated** — corrupt or
  unexpected payloads become structured errors instead of downstream
  surprises.

### 3. Production transport behaviour, built in

The [request scheduler](./how-it-works.md#the-request-scheduler) gives you
Sage-compliant pacing (1 req/s default), per-company isolation, correct
`Retry-After` handling, a conservative 429 lockout policy derived from
Sage's published guidance, cancellable backoff, timeouts that survive
retries, and graceful shutdown — each property covered by deterministic
fake-clock tests, not hope.

### 4. Types that match the API

Generated request/response models mirror Sage's PascalCase wire names
(`InvoiceNumber`, `DueDate`) instead of inventing a parallel vocabulary.
Autocomplete, refactor safety and compile-time checks over the operations
you actually use — with OData queries typed against the same models.

### 5. Errors you can act on

A structured hierarchy with stable codes
(`SAGE_RATE_LIMIT_ERROR`, `SAGE_TIMEOUT_ERROR`, …), correlation IDs, and
preserved response context — so alerting and retry logic key off codes,
not message strings. See
[error handling](../integration/error-handling.md).

### 6. Engineering discipline you can audit

| Practice | Evidence in the repo |
|---|---|
| Nothing invented | Endpoint catalogue + fixtures traceable to official docs ([provenance](../../contracts/fixtures/PROVENANCE.md)) |
| Decisions recorded | 17 [ADRs](../decisions/decision-index.md) |
| Verification explicit | [Verification levels](../architecture/verification-levels.md) V0–V5 per operation |
| Every change tested | 105-test suite: unit, contract, integration, type and property tests; `pnpm verify` gates every commit |
| CI on every push | Test, lint, typecheck, build, package-export and content checks, dependency audit, CodeQL |
| Secrets never leak | Redacting logger; credential-free errors and logs |

### 7. Independence and licence

Apache-2.0, developed in public by Byte Money, not locked to a vendor
roadmap. If the API changes, the contract archive and discovery scripts let
the surface be re-verified and regenerated.

## Cost of adoption

Being straight about the trade-offs:

- **Beta, pre-1.0** — follow the [roadmap](../../milestones/roadmap.md);
  pin exact versions.
- **Not yet published to npm** — install from source until the release
  milestone lands.
- **South African Sage One only** — see [who it is for](./who-its-for.md).
- **Live verification pending** — contract fixtures today, live suite
  scheduled for the release milestone.

## Summary

| | Hand-rolled client | `@bytemoney/sage-one-accounting-api` |
|---|---|---|
| Coverage | Whatever you implemented | All 622 operations |
| Types | Ad-hoc or none | Full, generated, checked |
| Validation | None | Zod at both boundaries |
| Rate limits | Your improvisation | Scheduler per Sage's published guidance |
| Mutation retries | Often accidental | Never, by hard rule |
| Error handling | String matching | Stable codes + context |
| API drift | Silent breakage | Archived contracts + coverage matrix |
| Audit trail | None | ADRs, provenance, verification levels |

**Next:** [Integration quick start](../integration/quick-start.md) ·
[Configuration](../integration/configuration.md) ·
[Common workflows](../integration/common-workflows.md)

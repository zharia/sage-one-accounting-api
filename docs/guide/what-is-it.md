# What is it?

**`@bytemoney/sage-one-accounting-api`** is a strongly typed TypeScript SDK for the
**Sage One Accounting API 2.0.0 (South Africa)** — the REST interface Sage
exposes for its South African cloud accounting product
(`accounting.sageone.co.za`).

Instead of every integrating application hand-rolling HTTP requests,
parsing untyped JSON, wiring up Basic authentication and re-implementing
pagination, the SDK puts all of that behind one typed client:

```typescript
import { type Account, odata, SageOneClient } from "@bytemoney/sage-one-accounting-api";

const sage = new SageOneClient({
  credentials: { username: user, password: pass },
  apiKey: apiToken,
  companyId: 12345,
});

const accounts = await sage.accounts.list({
  odata: odata<Account>().filter("Active", "eq", true).orderBy("Name", "asc"),
});
```

What you see at the call site is deliberate: typed request and response
models, runtime validation at every boundary, and Sage's own field names
(`Name`, `Balance`, `DueDate`) preserved exactly as they appear on the
wire.

## Independence

The project is developed by **Byte Money** and is an **independent open-source
project**. It is not an official Sage product and is not affiliated with,
endorsed by or sponsored by The Sage Group plc. Sage, Sage One and related
marks are trademarks of The Sage Group plc or its licensors; this project
uses those names solely to identify the API it is designed to work with.

## Where it came from

Sage publishes a help site for the API but **no official SDK and no
machine-readable specification** for it. The project began because Byte
Money needed to build accounting integrations on Sage One and found that
every consumer of this API faced the same problem: reconstruct the contract
from documentation, then defend it against drift.

The SDK was therefore built **contract-first**, in public, under a written
project specification (`__init_spec_01.md`) and a milestone plan:

| Phase | What was established |
|---|---|
| **M001 — Foundation** | Repository, toolchain, documentation structure, CI |
| **M002 — API discovery** | The full surface catalogued from the official help site: **162 services, 622 operations**, with archived contract snapshots in `contracts/` |
| **M003 — Core infrastructure** | Client, configuration, HTTP transport, authentication, logging, error hierarchy, validation |
| **M004–M006 — Domain coverage** | Every discovered operation implemented across accounting, commercial, banking, reporting and supporting domains |
| **M007/M008 — Production readiness** | Release automation, verification levels, scheduler/rate-limit hardening, documentation — the current phase, leading to 1.0 |

Key properties of that process:

- **Nothing is invented.** Every endpoint, field and behaviour is traceable
  to the official Sage help documentation or an archived contract snapshot.
  Undocumented gaps are recorded as such in the
  [known-limitations register](../api/known-limitations.md) rather than
  papered over.
- **Contracts are archived.** Request/response fixtures and the endpoint
  catalogue live in [`contracts/`](../../contracts/), with documented
  provenance, so behaviour can be re-verified as Sage's API evolves.
- **Decisions are recorded.** 17 numbered
  [architecture decision records](../decisions/decision-index.md) explain
  why the SDK looks the way it does — from transport and auth to decimal
  handling and testing strategy.
- **Verification is explicit.** Each operation carries a
  [verification status](../api/coverage-matrix.md) (implemented,
  fixture-verified, live-verified) — the project never claims more certainty
  than its evidence supports.

## Status today

- **Implemented:** all 622 discovered operations — typed, Zod-validated and
  contract-tested.
- **Published:** not yet on npm; the package is in beta while the
  production-readiness milestone completes. Follow the repository for
  release announcements.
- **Live-verified:** 0 operations against a real Sage company — contract
  tests run against archived fixtures, and the live suite is opt-in and
  scheduled for the release milestone. See
  [verification levels](../architecture/verification-levels.md).

Next: [Who is it for?](./who-its-for.md)

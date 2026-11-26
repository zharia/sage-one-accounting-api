# Who is it for?

## Built for

**Engineering teams shipping products that read or write Sage One
accounting data in South Africa.** Concretely:

| Audience | Typical use |
|---|---|
| **Fintechs and payment platforms** | Reading balances, customers and invoices; creating receipts and payments against Sage One companies |
| **E-commerce and POS integrators** | Pushing sales, invoices and stock movements into Sage One as the book of record |
| **Accounting and bookkeeping practices** | Tools that automate data collection, reconciliation or month-end workflows across client companies |
| **BI and reporting pipelines** | Extracting general-ledger, tax and aged-analysis data into a warehouse |
| **Developers maintaining existing integrations** | Replacing brittle hand-rolled HTTP code with a typed, tested client |

## What you need to use it

- **Node.js 24 or later** (native ESM; no CommonJS build).
- **TypeScript fluency** — the value is in the types. Plain JavaScript works,
  but you forfeit the main benefit.
- **Sage One South Africa credentials** — a company on
  `accounting.sageone.co.za`, plus username/password, developer API key and
  company ID. See [authentication](../integration/authentication.md).

## When it is the right choice

- You want **compile-time safety** over Sage's 622 operations instead of
  stringly-typed `fetch` calls.
- You want **runtime validation** so malformed API responses surface as
  structured errors, not silent `undefined`s.
- You handle **money** and need the SDK to refuse to auto-retry financial
  mutations or round monetary values.
- You run **many requests** and want per-company rate-limit pacing,
  `Retry-After` handling and graceful shutdown built in rather than
  improvised.
- You value **auditability**: documented decisions, archived contracts,
  honest coverage matrices, and known-limitations registers.

## When it is not the right choice

| Situation | Why |
|---|---|
| **Non–South-African Sage products** (Sage 50, Sage Intacct, other regional Sage One instances) | This SDK targets the South African Sage One API 2.0.0 only — endpoints and semantics differ per product |
| **You need a vendor-supported SDK** | This is an independent community project; support is via GitHub issues, not Sage |
| **A quick one-off script against one endpoint** | A single `fetch` call may be less ceremony — the SDK pays off when you touch multiple operations or maintain the integration |
| **You cannot run Node.js ≥ 24** | ESM-only package on a modern runtime floor |
| **Live-API assurance is required today** | Verification is contract-fixture-based; the live suite is opt-in and not yet routinely executed (see [verification levels](../architecture/verification-levels.md)) |

## Responsibilities that stay yours

The SDK removes accidental complexity, not domain decisions:

- **Credentials and secrets** — supply them from your secret manager;
  never hard-code or commit them.
- **Accounting correctness** — the SDK preserves values; deciding what a
  journal entry *should* contain is your application's job.
- **Company access control** — which of your users may touch which Sage
  company.
- **Rate-limit strategy across processes** — scheduling is per client
  instance; multiple processes do not coordinate (see
  [how it works](./how-it-works.md#the-request-scheduler)).

Next: [How it works](./how-it-works.md)

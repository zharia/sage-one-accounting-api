# Roadmap

Spec §26. Dependencies are strict — a milestone starts only when its prerequisites are accepted.

```text
M001 Project foundation          ← current
   │
   ▼
M002 Sage API discovery          (catalogue, auth verification, contract snapshots)
   │
   ▼
M003 Core SDK infrastructure     (client, config, transport, auth impl, logging, errors, validation, shared types)
   │
   ├──────────────────┐
   ▼                  ▼
M004 Foundational    M005 Commercial transactions
accounting domains   (invoices, quotes, orders, receipts,
(accounts, company,   payments, allocations, attachments)
customers, suppliers,
tax types, items)
   │                  │
   └────────┬─────────┘
            ▼
M006 Banking, reporting, advanced domains
(banking, journals, assets, taxation, reporting, time tracking, CRM, remaining)
            │
            ▼
M007 Production readiness        (100% coverage, docs, package verification, release automation, 1.0)
```

## Release progression

| Milestone | User-visible outcome |
|---|---|
| M001 | Repository, toolchain, docs and CI exist; package not yet useful |
| M002 | Verified contract + coverage matrix (no SDK yet) |
| M003 | First usable client (config/auth/transport/errors) — `0.x` preview possible |
| M004–M006 | Expanding endpoint coverage — minor releases per Changesets |
| M007 | Feature-complete vs documented API → `1.0.0` |

## Current status

- **M001: in progress (session checklist in `PROGRESS.md` at repo root)**
- M002–M007: not started

## Risk register (top)

| Risk | Milestone | Mitigation |
|---|---|---|
| Authentication mechanism differs from assumptions | M002 | Interface-first design (ADR-007); no claims until verified |
| No machine-readable Sage spec → scraping fragile | M002 | Archive snapshots, scripted retrieval, diffing; classify undocumented gaps |
| Decimal/wire format surprises | M002→M012 (ADR-012) | Provisional ADR; round-trip property tests |
| Scope creep before foundation is solid | all | Hard dependency order; acceptance criteria per milestone |

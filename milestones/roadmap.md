# Roadmap

Spec §26. Dependencies are strict — a milestone starts only when its prerequisites are accepted.

```text
M001 Project foundation          (accepted 2026-11-21)
   │
   ▼
M002 Sage API discovery          (accepted 2026-11-21 — 162 services, 622 endpoints catalogued)
   │
   ▼
M003 Core SDK infrastructure     (accepted 2026-11-21 — client, config, transport, auth, logging, errors, validation, types)
   │
   ├──────────────────┐
   ▼                  ▼
M004 Foundational    M005 Commercial transactions
accounting domains   (accepted 2026-11-21 — 59 services, 247 ops:
(accepted 2026-11-21  invoices, quotes, orders, receipts,
 24 services, 89 ops) payments, allocations, attachments)
   │                  │
   └────────┬─────────┘
            ▼
M006 Banking, reporting, advanced domains
(accepted 2026-11-21 — 79 services, 286 ops; 100% of 162 services / 622 endpoints complete)
            │
            ▼
M007 Production readiness        (100% coverage, docs, package verification, release automation, 1.0) ← next
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

- **M001 (Project foundation): accepted (2026-11-21)**
- **M002 (Sage API discovery): accepted (2026-11-21)**
- **M003 (Core SDK infrastructure): accepted (2026-11-21)**
- **M004 (Foundational accounting domains): accepted (2026-11-21)**
- **M005 (Commercial transactions): accepted (2026-11-21)**
- **M006 (Banking, reporting, and advanced domains): accepted (2026-11-21)**
- M007: next

## Risk register (top)

| Risk | Milestone | Mitigation |
|---|---|---|
| Authentication mechanism differs from assumptions | M002 | Interface-first design (ADR-007); no claims until verified |
| No machine-readable Sage spec → scraping fragile | M002 | Archive snapshots, scripted retrieval, diffing; classify undocumented gaps |
| Decimal/wire format surprises | M002→M012 (ADR-012) | Accepted ADR-012; round-trip property tests |
| Scope creep before foundation is solid | all | Hard dependency order; acceptance criteria per milestone |

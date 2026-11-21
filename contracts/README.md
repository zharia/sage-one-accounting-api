# Sage API contract data

Machine-readable contract artefacts — **kept strictly separate from SDK source** (spec §6.2).

```text
contracts/
├── sage-api/
│   ├── source-manifest.json     # sources: URL, date, method, content hash
│   ├── endpoint-catalogue.json  # every endpoint + statuses (spec §6.1 fields)
│   └── snapshots/               # archived raw documentation / official spec
└── fixtures/                    # sanitized request/response samples per operation
    └── <service>/<operation>.json
```

## Rules

- **Data, not code.** Nothing in `src/` imports from `contracts/` at runtime. Generators and tests read it.
- **Never hand-edit snapshots.** Regenerate via `scripts/api-discovery/`; diffs must be reviewable.
- **Traceability mandatory.** Every fixture records: source (docs URL or "live observation"), date, and whether documentation was full/partial/none.
- **No secrets, no production data.** Sanitize headers/credentials/real customer records out of live captures.
- **Discovery date + source URL** recorded per spec §6.2 — a snapshot without provenance is worthless.

## Status

**M002 has not started.** Directory exists per spec §3; files populate during discovery.

| File | State |
|---|---|
| `source-manifest.json` | pending M002 |
| `endpoint-catalogue.json` | pending M002 (schema documented in `docs/api/endpoint-inventory.md`) |
| `snapshots/` | pending M002 |
| `fixtures/` | pending M002 (first fixtures with M003 reference resource) |

## Catalogue record (spec §6.1)

service · resource · operation · method · route · query params · path params · request content type · request schema · response content type · response schema · auth requirement · paging behaviour · OData support · file handling · documentation URL · documentation completeness · implementation status · test status.

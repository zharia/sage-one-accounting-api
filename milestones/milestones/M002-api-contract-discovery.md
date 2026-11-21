# M002 — Sage API discovery

- **Status:** not started
- **Prerequisites:** M001 accepted

## Objective

Catalogue all service areas, operations, models, authentication requirements and endpoint-specific behaviours (spec §26, M002).

## Scope

In: documentation retrieval/archival, machine-readable spec investigation, endpoint catalogue, contract snapshots, authentication verification, pagination/OData/attachment behaviour per endpoint, coverage matrix baseline.

Out: SDK implementation (M003+).

## Prerequisites

- M001 accepted (toolchain + verification in place).

## Deliverables

- `contracts/sage-api/source-manifest.json` — sources, URLs, dates, hashes.
- `contracts/sage-api/endpoint-catalogue.json` — every endpoint with all spec §6.1 fields and completeness classification (full/partial/none/experimental).
- `contracts/sage-api/snapshots/` — archived help content / official spec if found.
- `scripts/api-discovery/` — retrieval, extraction, snapshot-diff and reporting scripts (reproducible).
- Verified authentication findings → `docs/architecture/authentication.md` + `docs/api/authentication.md`; ADR-007 flips to accepted (or records a revised mechanism).
- Confirmed wire format for money/dates/IDs → ADR-012 accepted (or revised).
- Baseline coverage matrix + endpoint inventory + known-limitations with real data.

## Technical tasks

1. Investigate OpenAPI/Swagger/API metadata availability (record result either way).
2. Build retrieval pipeline for help pages; archive raw content with dates.
3. Extract services/operations/models into catalogue schema; classify documentation completeness.
4. Diff tooling for snapshot comparison (future re-discovery).
5. Auth investigation: headers, token/session, company context, app headers, login side effects — with sanitized evidence.
6. Per-endpoint paging and OData support notes.
7. Wire-format confirmation: identifier types, money encoding, date formats, enum values.

## Test requirements

- Scripts have unit tests (extraction, diffing).
- Every catalogue record validates against the catalogue schema.
- Auth claims backed by sanitized request/response evidence files (never real credentials).

## Documentation requirements

- Update `docs/api/*`, `docs/architecture/authentication.md`, ADR-003/007/012, `docs/api/contract-sources.md`.

## Acceptance criteria

- [ ] Catalogue covers 100% of discoverable documented endpoints (spec §24 target basis)
- [ ] Every record traceable to source + date
- [ ] Authentication mechanism verified or explicitly documented as unresolved with evidence of attempts
- [ ] Undocumented endpoints classified, limitations recorded
- [ ] `pnpm verify` green

## Risks

- No machine-readable spec → scraping fragility (mitigation: archive + diff).
- Auth may be non-standard or undocumented → interface-first design absorbs it (ADR-007).
- Help docs may be incomplete → classification system handles it; no guessing.

## Dependencies

- Access to Sage documentation (public help site).

## Outstanding technical debt

_Carried from M001; new debt recorded on discovery._

# M002 — Sage API discovery

- **Status:** accepted
- **Prerequisites:** M001 accepted
- **Date opened:** 2026-11-21
- **Date completed:** 2026-11-21

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

- [x] Catalogue covers 100% of discoverable documented endpoints (spec §24 target basis)
- [x] Every record traceable to source + date
- [x] Authentication mechanism verified or explicitly documented as unresolved with evidence of attempts
- [x] Undocumented endpoints classified, limitations recorded
- [x] `pnpm verify` green

## Risks

- No machine-readable spec → scraping fragility (mitigation: archive + diff).
- Auth may be non-standard or undocumented → interface-first design absorbs it (ADR-007).
- Help docs may be incomplete → classification system handles it; no guessing.

## Dependencies

- Access to Sage documentation (public help site).

## Outstanding technical debt

_Carried from M001; see `milestones/technical-debt.md`._

## Completion report

- **Completed:** 2026-11-21
- **Summary:**
  - Probed OpenAPI/Swagger endpoints (`/api/2.0.0/swagger/docs/v1` and `v2`, both returned HTTP `403 Forbidden`) and recorded the findings in `contracts/sage-api/source-manifest.json`.
  - Built reproducible discovery and diffing tooling (`scripts/api-discovery/parse-help.ts`, `scripts/api-discovery/discover.ts`, `scripts/api-discovery/diff-catalogue.ts`) with unit test coverage (`tests/unit/api-discovery.test.ts`).
  - Archived raw contract snapshots (`contracts/sage-api/snapshots/help-index.html`, `developer-program.html`, `resource-models.json`) and built `contracts/sage-api/endpoint-catalogue.json` covering 100% of the 162 services and 622 operations (`552` full, `56` partial, `8` experimental, `6` none).
  - Verified the authentication and company-scoping mechanism (`Authorization: Basic`, `apikey` query parameter, `CompanyId` query parameter, `POST /Login/Validate`, and rate/lockout limits) from `DeveloperProgram.aspx`; updated `docs/architecture/authentication.md`, `docs/api/authentication.md`, and flipped ADR-003, ADR-007, and ADR-012 from `provisional` to `accepted`.

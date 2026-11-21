# ADR-003: API contract discovery and generation

- **Status:** accepted
- **Date:** 2026-11-21

## Context

The SDK must cover the published Sage One API `2.0.0` (spec §6). During M002 discovery we probed `/api/2.0.0/swagger/docs/v1` and `/api/2.0.0/swagger/docs/v2` (both returned HTTP `403 Forbidden`), and retrieved the published ASP.NET Web API Help Pages at `https://accounting.sageone.co.za/api/2.0.0/help` plus the Developer Program overview (`https://accounting.sageone.co.za/Marketing/DeveloperProgram.aspx`).

## Problem

Establish a reproducible pipeline from the official documentation to a machine-readable endpoint catalogue, contract snapshots, and traceable contract fixtures without inventing undocumented behaviour.

## Options considered

1. Find and archive an official OpenAPI/Swagger contract; generate everything possible from it.
2. Scrape help pages into a catalogue; hand-write all SDK code.
3. Hybrid: scripted extraction from official ASP.NET Web API Help Pages into a canonical catalogue (`contracts/sage-api/endpoint-catalogue.json`), generate contract fixtures (`contracts/fixtures/`), and maintain explicit wire schemas + domain service methods traced to catalogue IDs.
4. Fully hand-written, no catalogue.

## Decision

Option 3:

- `scripts/api-discovery/discover.ts` retrieves the help index, developer program page, and all 622 endpoint detail pages across 162 services, writing `contracts/sage-api/source-manifest.json`, `contracts/sage-api/endpoint-catalogue.json`, and raw snapshots under `contracts/sage-api/snapshots/`.
- `scripts/api-discovery/diff-catalogue.ts` compares catalogue versions to detect added, removed, or modified endpoints.
- `scripts/contract-validation/generate-fixtures.ts` extracts traceable per-operation fixtures under `contracts/fixtures/<service>/<operation>.json`.
- Raw contract data (`contracts/`) stays strictly separate from `src/` (enforced by `scripts/verification/check-boundaries.ts`).

## Verified discovery findings (M002)

- **OpenAPI/Swagger:** Not publicly exposed (`403 Forbidden` on `/api/2.0.0/swagger/docs/v1` and `v2`).
- **Help page structure:** Deterministic ASP.NET Web API Help Pages with 162 services and 622 operations (`552` full, `56` partial, `6` none, `8` experimental).

## Rationale

- Spec §6.1–6.4 mandate catalogue completeness, fidelity, and traceability.
- Scripted extraction and diffing provide deterministic contract snapshots and automated completeness classification.

## Consequences

- `contracts/sage-api/endpoint-catalogue.json` is the single machine-readable source of truth for all 622 endpoints.
- Every implemented endpoint has a corresponding fixture in `contracts/fixtures/` and contract tests verifying method, route, query params, body, and response schema.

## Rejected alternatives

- Option 1: Blocked by HTTP 403 on Swagger endpoints.
- Option 2/4: Loses machine-readable coverage tracking and reproducibility.

## References

Spec §6, §24; `contracts/README.md`; `docs/api/contract-sources.md`.

# ADR-003: API contract discovery and generation

- **Status:** provisional — pending M002 discovery evidence
- **Date:** 2026-11-21

## Context

The SDK must cover the published Sage One API `2.0.0` (spec §6). Machine-readable specs (OpenAPI/Swagger) may or may not exist; the help site https://accounting.sageone.co.za/api/2.0.0/help is the primary source.

## Problem

Establish a reproducible pipeline from documentation to a machine-readable endpoint catalogue and (optionally) generated SDK definitions, without inventing undocumented behaviour.

## Options considered

1. Find and archive an official OpenAPI/Swagger contract; generate everything possible from it.
2. Scrape help pages into a catalogue; hand-write all SDK code.
3. Hybrid: catalogue from docs (or official spec if found), generate wire types/schemas, hand-write service logic and operations.
4. Fully hand-written, no catalogue.

## Decision

Option 3, with a hard rule: the raw contract (`contracts/sage-api/`) stays separate from SDK source, every generated file carries a source/generator header, and generation never overwrites hand-written logic. If M002 discovers an official machine-readable spec, option 1 becomes the input to the same pipeline.

## Options still open (M002)

- Existence of OpenAPI/Swagger/API metadata endpoints.
- Feasibility and stability of help-page scraping (structure, rate limits).
- How much of request/response modelling is derivable vs experimentally verified.

## Rationale

- Spec §6.1–6.4 mandate catalogue completeness, fidelity and traceability.
- Generation materially reduces repetition for ~100 services, but operation-specific semantics (spec §6.1 item 4) need human judgment.
- Provisional status prevents fake completeness claims before discovery.

## Consequences

- M002 deliverables: `endpoint-catalogue.json`, `source-manifest.json`, discovery scripts, snapshots, documented completeness classes (full / partial / none / experimental).
- Coverage matrix (spec §24) consumes the catalogue.
- Until M002 completes, no domain resource implementation may be claimed done.

## Rejected alternatives

- Option 2/4: loses machine-readable coverage tracking and reproducibility; high drift risk.
- Blind generation from names: explicitly forbidden (spec §6.1 — never infer semantics from naming conventions).

## References

Spec §6, §24; `contracts/README.md`; `docs/api/contract-sources.md`.

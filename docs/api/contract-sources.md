# Contract sources

Where API contract data comes from, and how to trust it.

## Primary source

| Source | URL | Accessed | Notes |
|---|---|---|---|
| Sage One Accounting API help (2.0.0) | https://accounting.sageone.co.za/api/2.0.0/help | not yet retrieved | Spec-designated primary source |

## Source precedence

1. Official machine-readable specification (OpenAPI/Swagger/API metadata) — **existence unverified, checked first in M002**.
2. Published help pages (scraped/archived by `scripts/api-discovery/`).
3. Verified live observations (recorded with date, request/response samples, test company).
4. Never: guesses from naming conventions (spec §6.1).

## Archive rules

- Raw contract lives in `contracts/sage-api/` (`source-manifest.json`, `endpoint-catalogue.json`, `snapshots/`).
- Every snapshot records: source URL, discovery date, retrieval method, content hash.
- Contract snapshots are never edited by hand; regeneration is scripted and diffable.
- SDK source never imports contract data at runtime — the contract layer feeds generators and tests only.

## Version pinning

Target API version `2.0.0` (spec §2.3). On a Sage API version bump: re-run discovery, diff catalogues (scripted, per spec §6.2), record changes in `docs/api/known-limitations.md` and the changelog. ADR-015 governs versioning policy.

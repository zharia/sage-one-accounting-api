# Contract sources

Where API contract data comes from, and how to trust it.

## Primary sources (retrieved 2026-11-21)

| Source | URL | Accessed | Snapshot |
|---|---|---|---|
| Sage One Accounting API Help (`2.0.0`) | https://accounting.sageone.co.za/api/2.0.0/help | 2026-11-21 | `contracts/sage-api/snapshots/help-index.html` |
| Sage One Developer Program Overview | https://accounting.sageone.co.za/Marketing/DeveloperProgram.aspx | 2026-11-21 | `contracts/sage-api/snapshots/developer-program.html` |
| 622 Endpoint Detail Pages | `https://accounting.sageone.co.za/api/2.0.0/Help/Api/{id}` | 2026-11-21 | `contracts/sage-api/endpoint-catalogue.json` |
| 153 Resource Model Pages | `https://accounting.sageone.co.za/api/2.0.0/Help/ResourceModel?modelName={name}` | 2026-11-21 | `contracts/sage-api/snapshots/resource-models.json` |

## OpenAPI / Swagger Investigation

Probed on 2026-11-21 (`contracts/sage-api/source-manifest.json`):

- `https://accounting.sageone.co.za/api/2.0.0/swagger/docs/v1` → HTTP `403 Forbidden`
- `https://accounting.sageone.co.za/api/2.0.0/swagger/docs/v2` → HTTP `403 Forbidden`

The published ASP.NET Web API Help Pages at `/api/2.0.0/help` are therefore the authoritative public contract source.

## Archive rules

- Raw contract lives in `contracts/sage-api/` (`source-manifest.json`, `endpoint-catalogue.json`, `snapshots/`).
- Every snapshot records: source URL, discovery date, retrieval method, and SHA-256 content hash.
- Contract snapshots are regenerated via `node scripts/api-discovery/discover.ts` and diffed via `scripts/api-discovery/diff-catalogue.ts`.
- SDK source never imports contract data at runtime (enforced by `scripts/verification/check-boundaries.ts`).

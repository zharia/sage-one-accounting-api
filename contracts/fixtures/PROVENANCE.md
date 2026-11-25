# Fixture provenance

Classification per M008 §5.3.3. Machine-enforced by
`tests/unit/fixture-provenance.test.ts`.

## Classification: all current fixtures are synthetic

Every fixture under `contracts/fixtures/` (622 files, one per discovered
operation) is **synthetic and documentation-derived** — none is a live capture.

| Attribute | Value |
|---|---|
| Kind | `synthetic` (help-page documentation sample) |
| Source endpoint | Recorded per file in `sourceUrl` (Sage One help page for the operation) |
| API operation | Recorded per file in `id`, `service`, `operation`, `method`, `route` |
| Date acquired | Recorded per file in `discoveredAt` (UTC ISO-8601; bulk discovery 2026-11-21, model-extension pages 2026-11-23) |
| Documentation reference | Same as `sourceUrl`; completeness in `documentationCompleteness` (`full` / `partial` / `none` / `experimental`) |
| Redaction | **Not required** — samples are ASP.NET help-page placeholders (`"sample string 1"`, sequential dates). Verified by test: no credential-shaped or personal values in any fixture |
| Transformations | Extraction of the help-page request/response sample tables into structured JSON (`queryParameters`, `pathParameters`, `requestSample`, `responseSample`); no value edits |

Provenance of the raw sources (URLs, retrieval method, content hashes) is in
`contracts/sage-api/source-manifest.json`.

## Rules for captured fixtures (future, WP008.4+)

Live-captured fixtures must additionally record:

- `"fixtureKind": "captured"`
- Capture date and the fact of live observation (`sourceUrl` may be omitted
  only when the URL itself is sensitive — then record `source: "live observation"`)
- `redacted: true` plus which transformations were applied (header stripping,
  identifier/PII masking)

Captured fixtures must never contain credentials, personal information or
confidential financial data. The provenance test rejects any fixture claiming
`fixtureKind: "captured"` that lacks these fields.

## Enforcement

`tests/unit/fixture-provenance.test.ts` asserts, for all 622 fixtures:

1. `sourceUrl`, `discoveredAt`, `documentationCompleteness` present.
2. `id` matches the file name; `service` matches the directory; `method`
   matches the `id` prefix.
3. No captured-kind fixture without redaction/transform metadata.
4. No credential-shaped or personal values in samples.

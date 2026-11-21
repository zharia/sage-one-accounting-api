# Agent API coverage guide

How to keep the coverage matrix truthful (spec §24).

## Sources of truth

| Artefact | Role |
|---|---|
| `contracts/sage-api/endpoint-catalogue.json` | Machine-readable endpoint records + statuses |
| `docs/api/coverage-matrix.md` | Human-readable rollup |
| `docs/api/known-limitations.md` | Honest gaps |

The catalogue is generated/maintained by discovery scripts; the matrix summarizes it. Never mark the matrix without a catalogue record.

## Per-endpoint dimensions

Discovered (Pending/Complete) · Contract · Type definitions · Runtime schemas · Implementation · Unit tests · Contract tests · Documentation (Missing/Partial/Complete).

## Rules

1. A resource is not complete because one operation works.
2. `Complete` requires a traceable contract source (docs URL + date, or verified live observation).
3. Undocumented endpoints get classified (full/partial/none/experimental) — never silently skipped, never guessed.
4. Experimental verification results: record date + sanitized samples + who verified.
5. Partial implementations are `Partial`, not `Complete`, even if tests pass.

## Updating

```bash
# after adding/changing an endpoint
$EDITOR contracts/sage-api/endpoint-catalogue.json
$EDITOR docs/api/coverage-matrix.md   # rollup counts + group row
# update docs/api/known-limitations.md if a gap remains
pnpm verify
```

## Reporting (spec §24)

Total discovered · implemented · fully typed · validated · contract-tested · undocumented · known limitations — refresh the Summary table in the matrix whenever it changes.

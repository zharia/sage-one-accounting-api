# ADR-016: Generator schema fidelity

- **Status:** accepted
- **Date:** 2026-11-23

## Context

WP008.1 (M008 §5.1) found that `scripts/generate/generate-domains.ts` emitted
overly permissive Zod schemas: broad string/number/record unions for scalar
fields, `z.array(z.unknown())` collections, unconditional
`.nullable().optional()` modifiers, and model references widened to
object/primitive unions. The authoritative contract sources are the help-page
property tables (`contracts/sage-api/snapshots/resource-models.json`), the
published enumeration pages (`contracts/sage-api/snapshots/model-extensions.json`),
and the published JSON samples (`contracts/sage-api/endpoint-catalogue.json`).

## Problem

Map source metadata to wire schemas without inventing Sage API behaviour,
while preserving required/optional/nullable semantics, precise primitives,
strongly typed nested models, typed collections, constrained enumerations and
deterministic regeneration (M008 §5.1.2–§5.1.7).

## Decision

Field mapping lives in the pure module `scripts/generate/field-schema.ts`
(`fieldToZodExpr(field, ctx, modelName)`), exercised by the regression suite
`tests/unit/generate/field-schema.test.ts`:

1. **Modifiers** are `<base> [.nullable() [.optional()]]`; optional is
   `!required || readOnly` (read-only fields are response-only data and are
   never request-required).
2. **Primitives map precisely:** `integer`/`byte` → `z.number().int()`,
   `decimal` → `z.number()` (ADR-012, sample-verified: `"Balance": 4.0`),
   `bool` → `z.boolean()`, `string`/`date`/`globally unique identifier` →
   `z.string()`.
3. **Model references** emit `z.lazy(() => XSchema)`; each module also emits
   the transitive closure of nested model references so every lazy reference
   resolves within the module.
4. **Self-referential fields** are emitted as an object getter with a direct
   reference (`get SplitTransactions() { return z.array(BaseBankTransactionSchema).optional(); }`).
   A `const` cannot reference itself inside its own initializer
   (TS7022/TS7024), while a reference inside a function body defers type
   inference and evaluates only after initialization (runtime-verified with
   `z.object` shape access occurring at parse time).
5. **Enumerations** become constrained literal unions from the published enum
   pages (`z.union([z.literal(1), z.literal(2), …)]`; integers on the wire —
   `"PaymentMethod": 1`). This amends ADR-004 (see that ADR's amendment).
6. **Collections retain element types** (`Collection of integer` →
   `z.array(z.number().int())`). `Collection of byte` maps to `z.string()`:
   .NET `byte[]` serialises as one base64 JSON string — every published
   sample shows `"QEA="` — while scalar `byte` stays a JSON number
   (`Company.InventoryTypeId: 64`).
7. **Documented source contradictions** (property table and published sample
   for the same field disagree) resolve to a union of both published forms
   via the explicit `CONTRADICTION_OVERRIDES` table — currently only
   `AccountantNoteRequestModel.Status` (property table `nullable bool`,
   published request/response sample `1`, sister response model
   `AccountantNote.Status` `nullable integer`). No side is invented; each
   entry is a candidate for collapse once live evidence exists (WP008.4).
   **Unresolved model references with scalar sample evidence** resolve to the
   evidenced primitive via `UNRESOLVED_REF_OVERRIDES` — currently
   `BASReport.TaxReportingType` and `TakeOnAccountBalance.AccountType` (enum
   help pages unfetched, TD-008; published samples show `0` and `1`,
   sister id fields documented integers). The value set stays unconstrained
   until the page is fetched, at which point the entry is removed and the
   literal-union mapping applies.
8. **Unknown source metadata** is returned as `unsupported` and printed by the
   generator's unsupported-field report — never silently widened into a
   permissive union. Sample-inferred fields whose sample carried no type
   evidence (JSON `null`) map to an explicit `z.unknown()`.
9. **Deterministic output:** generated files are formatted with the
   repository Prettier config (`printWidth` 100) and models are emitted in
   sorted order; repeated generation is byte-identical.
10. **Model/enum discovery** is additive, resumable and interruption-safe:
    `scripts/api-discovery/fetch-model-extensions.ts` classifies each missing
    ResourceModel help page as a property table, an enumeration page, or
    unresolved (rate-limited/error page) — unresolved is reported in
    `model-extensions.json`, never guessed. The script checkpoints the output
    file after every attempt, flushes on SIGINT/SIGTERM, seeds carried
    failures across runs, and reports each round as
    `new refs + carried failures + retries` so throttle noise is
    distinguishable from genuine transitive-reference discovery.
11. **Script module resolution:** files under `scripts/` are executed directly
    by Node's native type stripping (`node scripts/… .ts`), which does not
    rewrite `.js` specifiers to `.ts` — so relative imports inside `scripts/`
    use `.ts` specifiers (verified: `.js` value imports fail with
    `ERR_MODULE_NOT_FOUND` on Node 24 and 26). `src/` keeps `.js` specifiers
    (it is compiled by `tsc`). This is why `tsconfig.json` (typecheck-only,
    `noEmit: true`) enables `allowImportingTsExtensions` while
    `tsconfig.build.json` explicitly disables it.

## Consequences

- Validation is strict at the SDK boundary: request payloads and responses
  that violate documented types are rejected (`SageValidationError` /
  `SageResponseError`). All 622 contract fixtures pass.
- Unresolved model references keep the `z.record(z.string(), z.unknown())`
  fallback and are recorded in `model-extensions.json` and
  `docs/api/known-limitations.md`.
- Forward compatibility stays object-level (`.passthrough()`): additional
  response properties are accepted without weakening known property
  definitions (M008 §5.1.5).
- Enum tolerance (ADR-004) is reversed for wire schemas; reversal condition:
  WP008.4 live evidence of undocumented enum values in production responses.

# ADR-002: TypeScript module and packaging strategy

- **Status:** accepted
- **Date:** 2026-11-21

## Context

The package must be consumable by Node.js applications (spec §18): ESM, declarations, source maps, correct `exports`, reproducible output, no dev-tooling requirements at runtime.

## Problem

Choose module format, bundling strategy and toolchain so the package installs and imports cleanly under pnpm, without shipping toolchain assumptions.

## Options considered

1. `tsc`-only build (ESM + `.d.ts` + source maps, no bundler).
2. Bundler library build (Vite library mode / tsup) with externalized dependencies.
3. Dual ESM+CJS output.
4. Vite+ unified toolchain build (spec §4.4 evaluation).

## Decision

Option 1: `tsc -p tsconfig.build.json` as the build. ESM-only (`"type": "module"`), `exports` map with `types`+`import`, `files: ["dist", …]`, `sideEffects: false`, `engines.node >= 24`. Vite+ evaluation documented in ADR-014 — not required for a library build.

## Rationale

- A Node library needs no bundling: consumers' package managers resolve `dependencies` (`zod`, `pino`) directly.
- `tsc` output is deterministic and needs zero extra plugins for declarations/source maps.
- Dual ESM+CJS doubles surface for export-map bugs (attw catches these; we run attw in verify).
- Fewer moving parts = reproducible builds (spec §1.2 principle 7).

## Consequences

- No bundle-size optimization; acceptable for an API client.
- Consumers on CJS must use dynamic import (documented in integration docs).
- `pnpm verify` runs `attw --pack` to guard export/type correctness.

## Rejected alternatives

- Bundler builds: unnecessary complexity, declaration-generation plugins, drift between JS and types.
- Dual format: interop hazards, larger test matrix; revisit only with consumer demand.
- Browser bundling: explicitly out of scope — this is a Node.js library (spec §4.4).

## References

Spec §4.4, §18; ADR-014.

# ADR-014: Build and release tooling

- **Status:** accepted
- **Date:** 2026-11-21

## Context

Spec §4.4 asks to evaluate the Vite+ unified toolchain from VoidZero; §18 defines package output; §23.4 requires Changesets releases.

## Problem

Pick a build/verify/release toolchain that is stable today, without adopting unstable tooling for fashion (spec §4.4), and define where Vite+ fits.

## Options considered

1. `tsc` for build + Vitest + ESLint + Prettier as discrete tools; Vite+ evaluated later for orchestration only.
2. Adopt Vite+ as the single entry point for dev/build/test/lint/format now.
3. tsup/esbuild bundling + changesets + lefthook.

## Decision

Option 1 for M001, with an explicit Vite+ evaluation gate before M007:

- Build: `tsc -p tsconfig.build.json` (ADR-002).
- Test: Vitest (already Vite-based — most of the Vite toolchain value is realized here).
- Lint: ESLint 10 + typescript-eslint; Format: Prettier.
- Release: Changesets (`pnpm changeset` → version → publish), semantic versioning; breaking public TS interface changes are breaking even if Sage's API didn't change (spec §23.4).
- CI: GitHub Actions inside the Nix shell; Dependabot + CodeQL.
- Git hooks (Lefthook or equivalent): deferred — tracked in `milestones/technical-debt.md`.

## Rationale

- Spec permits dedicated tools where Vite+ lacks a required capability, provided the boundary is documented (this ADR).
- Library builds don't need a bundler (ADR-002); Vite+'s dev-server/browser focus is irrelevant here.
- Discrete, mature tools = deterministic, debuggable pipeline today.

## Consequences

- Vite+ evaluation is an explicit M007 task: if stable and capable (esp. unified commands, lib build, lint/format parity), migration is a tooling-only change documented here.
- Verification command (`scripts/verification/verify.sh`) abstracts tool choice — it survives a migration.
- Release notes and changelog come from Changesets; `NPM_TOKEN` secret required before first publish.

## Rejected alternatives

- Option 2 now: spec itself warns against unstable adoption; Vite+ maturity/feature parity unverified at project start.
- Option 3: esbuild bundling unnecessary for a Node lib; adds output-fidelity risk.

## References

Spec §4.4, §4.5, §18, §23.4; ADR-002; `docs/development/toolchain.md`.

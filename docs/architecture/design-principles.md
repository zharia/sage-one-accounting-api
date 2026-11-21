# Design principles

From the specification (§1.2), binding on all implementation work:

1. **API fidelity before convenience.** The SDK mirrors Sage behaviour; convenience layers are optional and explicit.
2. **Strong typing before generic abstractions.** Prefer concrete resource types over `Record<string, unknown>`.
3. **Explicit behaviour before implicit behaviour.** No magic defaults that change semantics silently.
4. **Runtime validation at system boundaries.** Config, requests, responses, derived domain objects.
5. **Domain-specific structures over generic JSON.** `Invoice` beats `JsonObject`.
6. **Separation of transport, authentication, API contracts and domain services.**
7. **Deterministic builds and reproducible development.** Nix, pinned toolchain, committed lockfile.
8. **Comprehensive automated verification.** `pnpm verify` gates every change.
9. **Documentation as an integral part of implementation.** Docs ship with code, not after.
10. **Incremental development with measurable completion criteria.** Milestones with acceptance criteria.

## Corollaries for day-to-day work

- Undocumented ≠ implementable: record gaps, do not guess (spec §6.1).
- Generated code is reproducible, headered, and never overwrites hand-written logic (spec §6.4).
- Unknown enum values and new response fields must not catastrophically break parsing (spec §7.3, §8).
- Distinguish required / optional / nullable / omitted / null — never collapse (spec §7.4).
- Compiling is not completion: tests, docs and verification are part of done (spec §20.3).

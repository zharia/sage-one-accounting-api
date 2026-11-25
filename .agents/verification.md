# Verification guide for agents

Authoritative policy: [`AGENTS.md`](../AGENTS.md). Definition of Done: spec §27.

## Single command

```bash
pnpm verify
```

Runs, in order (spec §17.7): format check → lint → typecheck → unit/integration/contract tests → type tests → build → package export check (attw) → documentation presence → package contents.

Non-live only (verification levels V0–V4, see
`docs/architecture/verification-levels.md`). The live stage (V5) is separate:
`pnpm test:live` / `.github/workflows/live-tests.yml` — never part of
`verify`, never in ordinary CI.

## What each step proves

| Step | Tool | Failure means |
|---|---|---|
| Formatting | `prettier --check` | style drift |
| Lint | eslint | unsafe pattern, `any`, import hygiene |
| Typecheck | `tsc --noEmit` | type contract broken |
| Tests | vitest | behaviour regression |
| Type tests | vitest `--typecheck` | public API surface wrong |
| Build | `tsc -p tsconfig.build.json` | package cannot ship |
| attw | `@arethetypeswrong/cli` | broken exports/types for consumers |
| Docs check | verify.sh | required documentation missing |

## Claiming a task complete

A change is done only when:

1. `pnpm verify` passes locally.
2. Tests exist for the changed behaviour (not just adjacent code).
3. Coverage matrix / docs updated if endpoints, public types or behaviour changed.
4. New ADRs for significant decisions; technical debt recorded.
5. Implementation report lists: changed files, verification performed, known gaps.

Compiling is not done. Tests passing without documentation is not done.

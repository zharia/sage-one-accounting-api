# Toolchain

Pinned in `package.json` / `flake.nix` / `flake.lock`. Full rationale: ADR-014.

| Concern | Choice | Version (pinned) |
|---|---|---|
| Language | TypeScript (strict) | 6.0.3 — capped below 7.x until typescript-eslint supports the native compiler |
| Runtime | Node.js LTS | 24 (engines `>=24`; CI matrix also tests 26) |
| Package manager | pnpm | 11.26.0 (`packageManager`, corepack-enforced) |
| Environment | Nix Flakes | nixos-unstable locked |
| Testing | Vitest (+ MSW, fast-check, coverage-v8) | 5.1.x / 3.x / 4.x |
| HTTP | Native Fetch | Node built-in |
| Runtime schemas | Zod | 4.x |
| Logging | Pino (behind `SageLogger`) | 10.x |
| Lint / format | ESLint + typescript-eslint / Prettier | 10.x / 8.x / 3.x |
| Release | Changesets | 2.x |
| Package check | `@arethetypeswrong/cli` | 0.18.x |
| Docs API reference | TypeDoc | **wired in M003** |
| Unified toolchain | Vite+ | **evaluated at M007 (ADR-014)** |

## Rules

- pnpm only — never npm/yarn; `pnpm-lock.yaml` committed; `--frozen-lockfile` in CI.
- Exact versions (`save-exact=true` in `.npmrc`).
- No dev dependencies in runtime `dependencies`.
- Upgrades are deliberate PRs: Dependabot weekly, review + `pnpm verify`.

## Type tests

Vitest type testing (`--typecheck`, `*.test-d.ts`) — chosen over `tsd` to keep one runner (ADR-013).

## Vite+ boundary

Spec §4.4 prefers Vite+ where stable. This project uses Vite-ecosystem tooling (Vitest) already; full Vite+ adoption is gated on M007 evaluation to avoid unstable tooling (spec §4.4 final paragraph). The verification script abstracts tool choice so migration stays cheap.

# Development guide for agents

Authoritative policy: [`AGENTS.md`](../AGENTS.md).

## Commands

```bash
nix develop              # toolchain: Node 24 LTS + pinned pnpm
pnpm install             # pnpm install --frozen-lockfile in CI
pnpm build               # tsc -> dist/ (ESM + d.ts + source maps)
pnpm typecheck           # strict check, no emit
pnpm test                # unit + integration + contract
pnpm test:watch
pnpm lint                # eslint
pnpm format              # prettier --write
pnpm verify              # everything (spec §17.7) — run before claiming done
```

## Conventions

- Native ESM: relative imports end in `.js` (`import { x } from "./y.js"`).
- Inline type imports (`import { type Foo }`) — enforced by lint.
- No `any` in `src/`; tests may use it. No non-null assertions in `src/`.
- File naming: `kebab-case.ts`; tests `*.test.ts`; type tests `*.test-d.ts`.
- Branded domain types (`SageId`, `ISODateString`, …) constructed only via validated parsers.
- Optional vs nullable vs omitted: keep the distinction (`exactOptionalPropertyTypes` is on).
- Exports: anything public must be re-exported from `src/index.ts`; internal stays internal.

## Adding a resource (short form)

1. Discovery record → `contracts/sage-api/endpoint-catalogue.json` (+ snapshot if response shape known).
2. Fixture → `contracts/fixtures/<service>/<operation>.json`, sourced from docs (URL + date) or live observation.
3. Types + Zod schemas colocated (`src/domains/<domain>/<resource>.ts` or `src/types/`).
4. Service class using shared request context — no fetch.
5. Tests: unit (schema), contract (method/route/params/body/response), type test for public surface.
6. Docs: coverage matrix row, `docs/reference/services.md` entry, example if user-facing.
7. `pnpm verify`.

## Environment variables

The SDK never reads env vars itself. Examples may read `SAGE_USERNAME` / `SAGE_PASSWORD` / `SAGE_COMPANY_ID` — see `.env.example`. Never commit `.env`.

## When unsure

Stop and record the question in `milestones/technical-debt.md` or `docs/api/known-limitations.md`. Do not guess endpoint semantics.

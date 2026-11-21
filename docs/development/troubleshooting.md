# Troubleshooting

## Nix

| Problem | Solution |
|---|---|
| `Path 'flake.nix' ... not tracked by Git` | `git add -N .` — nix only exposes git-tracked files |
| `nix develop` re-downloads everything | Normal first run; `flake.lock` pins paths. Check disk: `/nix/store` |
| corepack wants to download pnpm | Expected: corepack fetches the pinned `pnpm@11.26.0` once into `.corepack/` |
| Flakes disabled error | Enable in `~/.config/nix/nix.conf`: `experimental-features = nix-command flakes` |
| `nix flake check` fails after edit | Run `nix flake check` locally; ensure `flake.lock` committed |

## pnpm

| Problem | Solution |
|---|---|
| Version mismatch / wrong pnpm | Run inside `nix develop`; corepack shim enforces `packageManager` |
| `pnpm install` wants to modify lockfile in CI | Lockfile out of sync — run `pnpm install` locally, commit `pnpm-lock.yaml` |
| Mixed npm/yarn artifacts (`package-lock.json`, `yarn.lock`) | Delete them; pnpm only |
| Frozen lockfile fails after dep edit | Re-run `pnpm install` locally to update lockfile, commit both |

## TypeScript / lint

| Problem | Solution |
|---|---|
| `Cannot find module './x.js'` (typecheck) | Import with `.js` extension; file is `x.ts` (NodeNext ESM) |
| `TS5097: .js import requires allowImportingTsExtensions` | Do **not** import `.ts` — use `.js` specifier |
| `exactOptionalPropertyTypes` failures | Omit key vs set `undefined`; five-state optionality is intentional |
| Lint `no-explicit-any` | Add real types; tests may use `any`, `src/` may not |

## Tests

| Problem | Solution |
|---|---|
| Live tests skip | Intentional: set `SAGE_LIVE_TESTS=true` (never in CI) |
| MSW "real network" warnings | Ensure handlers registered before request; check `tests/mocks` |
| Coverage empty | `pnpm test:coverage`; coverage excludes `src/internal` |

## Still stuck

1. `pnpm verify` output first — which step fails?
2. Check [known-limitations](../api/known-limitations.md) and open issues.
3. File an issue with reproduction (synthetic data only).

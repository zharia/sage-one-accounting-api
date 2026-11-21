# Build

## Command

```bash
pnpm build        # tsc -p tsconfig.build.json -> dist/
```

## Output

| Artifact | Notes |
|---|---|
| `dist/**/*.js` | Native ESM (NodeNext resolution, `.js` extensions in imports) |
| `dist/**/*.d.ts` + `.d.ts.map` | Type declarations + maps |
| `dist/**/*.js.map` | Source maps |

No bundler (ADR-002): consumers resolve `dependencies` (`zod`, `pino`) through their own package manager.

## Configuration

- `tsconfig.json` — strict typecheck of `src` + `tests` + config files, `noEmit`.
- `tsconfig.build.json` — extends it; emits only `src/**` to `dist/`, excludes tests.

Strict flags are mandatory (spec §4.6): `strict`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax`, `isolatedModules`, `useUnknownInCatchVariables`, etc. Do not relax.

## Package verification

```bash
pnpm attw          # arethetypeswrong — export map / types correctness
pnpm pack --dry-run
```

Both run inside `pnpm verify`. The package must not require Vite, Nix or pnpm at runtime (spec §18).

## Clean

```bash
pnpm clean         # removes dist/, coverage/, tsbuildinfo
```

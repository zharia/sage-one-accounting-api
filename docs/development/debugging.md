# Debugging

## General flow

1. Reproduce with `pnpm test:watch` and a focused file: `pnpm exec vitest run tests/unit/foo.test.ts`.
2. Enable diagnostic logging in the failing test/client: `logging: { enabled: true, level: "debug" }` — correlation IDs, method, path, status, duration. Bodies are off by default; secrets are never logged.
3. For HTTP issues: MSW handlers in `tests/mocks/` show exactly what the transport sent/received.
4. For type issues: `pnpm typecheck` gives the strict-mode error; type tests pin the public surface.

## Common problems

| Symptom | Likely cause | Fix |
|---|---|---|
| Import resolves at runtime but not typecheck (or vice versa) | Missing `.js` extension in relative ESM import | Use `./x.js` in imports (NodeNext) |
| `verbatimModuleSyntax` errors | Value import of a type | Inline `import { type X }` (lint enforces) |
| `exactOptionalPropertyTypes` errors | Assigning `undefined` to optional prop | Omit the key instead of passing `undefined` |
| Test hits real network | MSW handler missing / server not started | Add handler; check `tests/mocks` setup |
| `nix` can't see flake files | Untracked files | `git add -N .` |
| pnpm version mismatch warning | Running host pnpm outside shell | Use `nix develop` first |

## Never do

- Debug by disabling validation or tests.
- Paste real customer/financial data into logs, issues or fixtures.
- "Fix" a contract test by loosening it — the contract is the truth, the SDK adapts.

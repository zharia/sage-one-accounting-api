# Testing

Full policy: ADR-013 and `.agents/verification.md`. Spec §17.

## Suites

```bash
pnpm test               # unit + integration + contract
pnpm test:watch         # watch mode
pnpm test:coverage      # v8 coverage -> coverage/
pnpm exec vitest run --typecheck.enabled --typecheck.only tests/type-tests   # type tests (in verify)
pnpm exec vitest run --project live # NOT used — live tests are env-gated, see below
```

| Suite | Path | Tool | Gate |
|---|---|---|---|
| Unit | `tests/unit` | vitest | always |
| Integration | `tests/integration` | vitest + MSW | always |
| Contract | `tests/contract` | vitest + MSW | always |
| Type | `tests/type-tests` (`*.test-d.ts`) | vitest typecheck | always |
| Property | `tests/property` | fast-check | always |
| E2E | `tests/e2e` | vitest | pre-release |
| Live | `tests/live` | vitest | `SAGE_LIVE_TESTS=true` only, never ordinary CI |

## Fixtures

- `tests/fixtures/` — realistic Sage request/response samples for tests.
- `contracts/fixtures/` — traceable contract fixtures (docs URL + date, or verified live observation).
- **Never** production accounting data; synthetic only.

## Live tests

- Explicit opt-in, environment credentials, dedicated test company.
- Destructive/financial-mutation operations flagged and off by default.
- Excluded from the default vitest include list.

## Writing tests

- Test the changed behaviour, not adjacent code.
- Contract tests verify: method, route, query params, content type, body, response structure, error behaviour.
- MSW handlers live in `tests/mocks/` — reusable, realistic, no real network.

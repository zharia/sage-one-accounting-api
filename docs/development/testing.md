# Testing

Full policy: ADR-013 and `.agents/verification.md`. Spec §17.
Verification levels (V0–V5) and suite classification: [`docs/architecture/verification-levels.md`](../architecture/verification-levels.md).

## Suites

```bash
pnpm test               # unit + integration + contract + property (non-live, V0–V4)
pnpm test:watch         # watch mode
pnpm test:coverage      # v8 coverage -> coverage/
pnpm test:live          # LIVE stage (V5) — separate config, needs Sage credentials
pnpm exec vitest run --typecheck.enabled --typecheck.only tests/type-tests   # type tests (in verify)
```

| Suite | Path | Tool | Level | Gate |
|---|---|---|---|---|
| Unit | `tests/unit` | vitest | V1 | always |
| Integration | `tests/integration` | vitest + MSW | V4 | always |
| Contract | `tests/contract` | vitest + injected fetch | V3 over V4 | always |
| Type | `tests/type-tests` (`*.test-d.ts`) | vitest typecheck | V0 | always |
| Property | `tests/property` | fast-check | V1 | always |
| E2E | `tests/e2e` | vitest | V3/V4 | pre-release (reserved, empty) |
| Live | `tests/live` | vitest (`vitest.live.config.ts`) | V5 | `pnpm test:live` only, never ordinary CI |

The default `pnpm test` run (and `pnpm verify`, and CI) **cannot** reach the
live API: `vitest.config.ts` excludes `tests/live/**`, and live tests are
additionally gated on `SAGE_LIVE_TESTS` (set by `vitest.live.config.ts`).

## Fixtures

- `contracts/fixtures/` — 622 traceable contract fixtures, one per discovered
  operation. Provenance and synthetic/captured rules:
  [`contracts/fixtures/PROVENANCE.md`](../../contracts/fixtures/PROVENANCE.md),
  enforced by `tests/unit/fixture-provenance.test.ts`.
- `tests/fixtures/` — reserved for test-local samples; currently empty.
- **Never** production accounting data; synthetic only.

## Live tests

- Separate stage: `pnpm test:live` (config `vitest.live.config.ts`,
  workflow `.github/workflows/live-tests.yml` — manual dispatch with
  `SAGE_*` secrets).
- Explicit opt-in, environment credentials, dedicated test company.
- Destructive/financial-mutation operations flagged and off by default.
- Excluded from the default vitest include list and from `pnpm verify`.

## Writing tests

- Test the changed behaviour, not adjacent code.
- Contract tests verify: method, route, query params, content type, body, response structure, error behaviour.
- MSW handlers are defined inline in `tests/integration/msw-integration.test.ts`
  (the `tests/mocks/` directory is reserved for shared handlers).
- Classify new suites at the correct verification level in
  `docs/architecture/verification-levels.md` — never present a lower level as
  evidence for a higher one.

# Module boundaries

Enforced by review and lint conventions (`@typescript-eslint/no-explicit-any`, import hygiene). Structural enforcement (eslint `import` boundaries or dependency-cruiser) is tracked as technical debt in `milestones/technical-debt.md`.

## Source tree ownership

| Module | Responsibility | May import | Must not import |
|---|---|---|---|
| `src/index.ts` | Public surface | `client`, `errors`, `types`, public re-exports | `internal`, test utilities |
| `src/client` | `SageOneClient`, service wiring | all service layers, `config`, `auth`, `transport`, `logging` | — |
| `src/domains/**` | Resource services | `types`, `validation`, `errors`, `common`, client request context | `transport` request issuing, `fetch`, other domains' internals |
| `src/types` | Wire + SDK types, branded IDs | `common` | runtime modules |
| `src/validation` | Zod schemas, parse helpers | `types`, `errors` | `transport` |
| `src/transport` | HTTP pipeline | `auth`, `config`, `logging`, `errors` | `domains/**` |
| `src/auth` | Credential application, renewal | `config`, `errors`, `logging` | `domains/**`, `transport` internals |
| `src/config` | Config schema, defaults, precedence | `errors` | env auto-loading side effects |
| `src/logging` | `SageLogger` interface + pino adapter | — | forced pino exposure to consumers |
| `src/errors` | Error hierarchy, mapping | `common` | — |
| `src/common` | Shared primitives (money, dates, ids) | — | anything above it |
| `src/internal` | Non-exported helpers | anything below public surface | must not be re-exported |
| `contracts/` | Raw contract data | — (data only, not imported at runtime) | SDK source |

## Dependency direction

```text
client -> domains -> (types, validation, errors, common)
transport -> (auth, config, logging, errors)
```

No cycles. Lower layers never import higher layers.

## Test boundaries

- `tests/mocks`, `tests/fixtures` — reserved for shared MSW handlers and test-local samples; never imported by `src/`. (MSW handlers currently live inline in `tests/integration/msw-integration.test.ts`.)
- `tests/live` — opt-in, env-gated, excluded from default vitest run.
- Contract fixtures traceable to Sage docs URL/date or verified live observation.

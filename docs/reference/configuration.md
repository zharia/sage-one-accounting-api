# Configuration reference

Consumer guide: `docs/integration/configuration.md` · Design: `docs/architecture/configuration.md`.

## `SageOneConfig` (planned — final fields follow verified auth, M002)

| Field | Type | Default | Notes |
|---|---|---|---|
| `baseUrl` | `string` | Sage production URL | Tests/proxies |
| `credentials` | `{ username, password }` | — | Or `authenticator` |
| `authenticator` | `SageAuthenticator` | built-in | Custom implementations |
| `companyId` | `CompanyId` | — | Conveyance pending auth discovery |
| `timeout` | `number` (ms) | finite, documented | Client default; per-request override |
| `retry` | `{ enabled, maxAttempts }` | mutations **off** | GET-only conservative policy (spec §10.1) |
| `logging` | `{ enabled, level }` | minimal/off | `SageLogger` injectable |
| `validation` | `{ validateRequests, validateResponses }` | on | Boundary validation toggles |
| `transport.fetch` | Fetch-compatible | native fetch | Injection point for tests/instrumentation |

## Rules

- Validated with Zod at construction → `SageConfigurationError` on failure (field-level, secret-free messages).
- Precedence: per-request > client config > default.
- No implicit `process.env` access; no `.env` loading (application-owned — see `.env.example`).
- Secrets: memory-only, excluded from logs/serialization/errors.

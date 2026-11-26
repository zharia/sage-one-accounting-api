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
| `retry` | `{ enabled, maxAttempts, baseDelayMs }` | mutations **off** | GET/HEAD conservative policy (spec §10.1) |
| `scheduler` | `{ maxConcurrency, minIntervalMs, maxRetryAfterMs, rateLimitFallbackMs, maxBackoffMs, jitter }` | `4`, `1000`, `60000`, `3600000`, `30000`, `true` | Central scheduler: concurrency, per-company pacing (Sage ≤1 req/s guidance), Retry-After cap, 429 fallback suspension (documented 1 h block; 0 disables), backoff cap, full jitter (ADR-017) |
| `logging` | `{ enabled, level }` | minimal/off | `SageLogger` injectable |
| `validation` | `{ validateRequests, validateResponses }` | on | Boundary validation toggles |
| `transport.fetch` | Fetch-compatible | native fetch | Injection point for tests/instrumentation |

## Rules

- Validated with Zod at construction → `SageConfigurationError` on failure (field-level, secret-free messages).
- Precedence: per-request > client config > default.
- No implicit `process.env` access; no `.env` loading (application-owned — see `.env.example`).
- Secrets: memory-only, excluded from logs/serialization/errors.

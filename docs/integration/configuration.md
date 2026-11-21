# Configuration guide

Reference: `docs/architecture/configuration.md` (design) · Planned type: `SageOneConfig`.

## Options (planned)

| Option | Default | Purpose |
|---|---|---|
| `baseUrl` | Sage production URL | Override for tests/proxies |
| `credentials` | — | Username/password (application-supplied) |
| `companyId` | — | Company context (conveyance pending auth discovery) |
| `timeout` | sensible finite value | Client-wide request timeout (ms) |
| `retry` | mutations off, GET conservative | Retry policy (spec §10.1) |
| `logging` | minimal/off | Level + enable flag |
| `validation` | on | `validateRequests`, `validateResponses` |
| `transport.fetch` | native fetch | Inject Fetch-compatible implementation |

## Precedence

`per-request option > client config > built-in default` — explicit, documented, never ambiguous.

## Environment variables (application-owned)

Copy `.env.example` → `.env` (gitignored). The SDK performs **no** implicit env reads or `.env` loading.

```bash
SAGE_USERNAME=...
SAGE_PASSWORD=...
SAGE_COMPANY_ID=12345
SAGE_BASE_URL=            # optional override
SAGE_LIVE_TESTS=false     # enable tests/live only when true
```

## Validation

Configuration is Zod-validated at construction; failures throw `SageConfigurationError` with field-level, secret-free messages.

## Secrets

- Pass at construction; held in memory only.
- Never logged, never in errors, never persisted by the SDK.
- Rotate via your secret manager; see `docs/integration/production-guidelines.md`.

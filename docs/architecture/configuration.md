# Configuration

Status: schema shape fixed (ADR-005 applies); final fields follow verified authentication (M002).

## Shape (illustrative, spec §14)

```typescript
interface SageOneConfig {
  baseUrl?: string;
  credentials?: { username: string; password: string };
  companyId?: CompanyId;
  timeout?: number; // ms, client default
  retry?: { enabled: boolean; maxAttempts: number; baseDelayMs: number };
  scheduler?: {
    maxConcurrency: number; // global in-flight cap
    minIntervalMs: number; // per-company request pacing
    maxRetryAfterMs: number; // cap on honoured Retry-After
    maxBackoffMs: number; // cap on one backoff delay
    jitter: boolean; // full jitter
  };
  logging?: { enabled: boolean; level: LogLevel };
  validation?: { validateRequests: boolean; validateResponses: boolean };
  transport?: { fetch?: typeof fetch };
}
```

## Rules

1. **Validated with Zod** at client construction; failures throw `SageConfigurationError` with field-level messages.
2. **No implicit environment access.** The SDK never reads `process.env`, never loads `.env`, never does so as a side effect of import. Applications pass config explicitly (see `.env.example` for the *application-level* pattern).
3. **Explicit precedence:** per-request option > client config > built-in default. Never merge ambiguously.
4. **Secrets:** held in memory only; never persisted by the SDK; excluded from `toJSON`, logs and errors.
5. **Defaults** are conservative: timeouts on, retries off for mutations, response validation on in development / configurable in production, logging minimal.
6. **Errors are actionable:** which field, what was expected, what was received (secret-free).

## Environment variables (application-owned)

| Variable | Purpose |
|---|---|
| `SAGE_USERNAME` | Login username (application passes to config) |
| `SAGE_PASSWORD` | Password (application passes to config) |
| `SAGE_COMPANY_ID` | Company context |
| `SAGE_BASE_URL` | Override base URL (tests/proxies) |
| `SAGE_LIVE_TESTS` | `true` to enable `tests/live` — never set in ordinary CI |

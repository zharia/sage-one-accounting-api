# Production guidelines

## Credentials

- Source from your secret manager (Vault, AWS SM, systemd credentials, KMS-backed env injection) — never from committed files.
- Separate credentials per environment; dedicated Sage test company for non-production.
- Rotate on schedule and on staff changes; revoke immediately on suspected exposure.
- Least privilege where Sage supports it.

## Runtime

- Pin the SDK version; review changelogs for breaking TS-interface changes (semver, spec §23.4).
- Set explicit `timeout` values appropriate to your workload; always wire `AbortSignal` for request-scoped cancellation.
- Leave `validateResponses` on unless you have measured a reason not to — it is your schema tripwire.
- Logging: `warn`/`error` default in production; `debug` only for short, explicit diagnostics (redaction still applies).

## Reliability

- **Do not retry financial mutations automatically.** On timeout/`SageNetworkError`, reconcile by querying before any re-send.
- Handle `SageRateLimitError` with backoff (manual).
- Circuit-breaking and bulkheads belong to your application, not the SDK.
- Track `requestId` from errors into your logs/tickets — it correlates with SDK debug logs.

## Observability

- Inject your own `SageLogger` to route SDK events into your stack (structured context includes method, path, status, duration, correlation ID).
- Alert on: elevated 5xx rate, auth failures, schema-mismatch warnings (`response.schema_mismatch` — early sign of an API change).

## Data safety

- Never send production accounting data to third-party diagnostics.
- Fixtures and test data are synthetic only (spec §17.6).
- The SDK stores nothing on disk — keep it that way in your deployment.

## Upgrades

```bash
pnpm update @bytemoney/sage-one-accounting-api
pnpm verify   # if you vendor/build; otherwise run your test suite
```

Read CHANGELOG.md first; treat major bumps as migration events.

# Logging and observability

Status: interface design fixed (ADR-008); adapter lands in M003.

## Interface

```typescript
export interface SageLogger {
  debug(message: string, context?: object): void;
  info(message: string, context?: object): void;
  warn(message: string, context?: object): void;
  error(message: string, context?: object): void;
}
```

Consumers may inject any implementation. Pino is the bundled default adapter — consumers are never forced to use pino directly.

## Event catalogue

| Event | Level | Fields |
|---|---|---|
| request.start | debug | correlationId, method, path (no query secrets) |
| request.end | debug | correlationId, status, durationMs |
| request.retry | warn | correlationId, attempt, reason |
| request.abort | warn | correlationId, reason |
| auth.authenticate | debug | operation (never credentials) |
| auth.failure | warn | reason category |
| validation.failure | warn | resource, operation, field path |
| response.schema_mismatch | warn | resource, operation, expected/actual summary |

## Redaction (mandatory)

Never logged: passwords, tokens, Authorization/Cookie headers, full financial payloads by default, personal information not required for the event.

Redaction is applied in the adapter and in `context` serialization — a custom logger receives already-redacted context.

## Defaults

- Production default: minimal (warn/error only), or disabled if no logger injected.
- Diagnostic detail (debug, bodies, timing breakdown) requires explicit opt-in via `config.logging`.
- Correlation IDs make support tickets traceable without verbose logging.

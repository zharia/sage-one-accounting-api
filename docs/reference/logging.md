# Logging reference

Consumer guide: `docs/architecture/logging.md` · ADR-008.

## Interface (planned)

```typescript
interface SageLogger {
  debug(message: string, context?: object): void;
  info(message: string, context?: object): void;
  warn(message: string, context?: object): void;
  error(message: string, context?: object): void;
}
```

## Injecting your logger

```typescript
const sage = new SageOneClient({
  logging: { enabled: true, level: "info" },
  logger: myLogger, // any SageLogger-compatible object
});
```

Pino is the bundled default adapter; consumers are never forced to use it.

## Levels

| Config | Typical use |
|---|---|
| disabled / minimal (default) | Production default — warn/error only |
| `info` | Operational visibility (request summaries) |
| `debug` | Short diagnostic windows; bodies still off by default |

## Redaction guarantees

Never emitted: passwords, tokens, Authorization/Cookie headers, full financial payloads by default, unnecessary PII. Redaction occurs before context reaches *any* logger — including custom ones.

## Event catalogue

See `docs/architecture/logging.md` (request start/end/retry/abort, auth events, validation failures, schema mismatches).

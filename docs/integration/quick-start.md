# Integration quick start

> **Pre-alpha (M001).** No client implementation exists yet — this documents the planned shape. Working examples land with M003/M004 in `examples/` and must compile against the real public API.

## Install

```bash
pnpm add @bytemoney/sage-one
# requires Node.js >= 24; ESM only
```

## Planned setup

```typescript
import { SageOneClient } from "@bytemoney/sage-one";

const sage = new SageOneClient({
  credentials: {
    username: process.env.SAGE_USERNAME!,
    password: process.env.SAGE_PASSWORD!,
  },
  companyId: 12345,
  timeout: 30_000,
  logging: { enabled: true, level: "warn" },
});

const accounts = await sage.accounts.list();
```

## Next steps

- [Node.js integration](./nodejs.md)
- [Configuration](./configuration.md)
- [Authentication](./authentication.md) — mechanism pending discovery
- [Common workflows](./common-workflows.md)
- [Error handling](./error-handling.md)
- [Production guidelines](./production-guidelines.md)

## Status

| Area | State |
|---|---|
| Client, services, auth | not implemented (M003) |
| Discovery of endpoints | not started (M002) |
| Docs content accuracy | pending — do not treat planned APIs as final |

# Integration quick start

> **Beta (M007/M008).** The client, all 162 services and all 622 operations
> are implemented and contract-tested. The package is published on npm as a
> prerelease — see [Install](#install) below. New to the SDK? Read the
> [guide](../guide/README.md) first.

## Install

```bash
# requires Node.js >= 24; ESM only
npm install @bytemoney/sage-one-accounting-api
# or: pnpm add @bytemoney/sage-one-accounting-api
```

Current release: **`0.2.0-next.0`** (prerelease). Pin the exact version in
production; stable `1.0.0` arrives with the release milestone.

## Setup

```typescript
import { SageOneClient } from "@bytemoney/sage-one-accounting-api";

const sage = new SageOneClient({
  credentials: {
    username: process.env.SAGE_USERNAME!,
    password: process.env.SAGE_PASSWORD!,
  },
  apiKey: process.env.SAGE_API_KEY!,
  companyId: 12345,
  timeout: 30_000,
  logging: { enabled: true, level: "warn" },
});

const accounts = await sage.accounts.list();
```

Construction performs no network I/O; credentials are injected per request.
Never hard-code secrets — supply them through your application's
secret-management mechanism.

## Next steps

- [Node.js integration](./nodejs.md)
- [Configuration](./configuration.md)
- [Authentication](./authentication.md)
- [Common workflows](./common-workflows.md)
- [Error handling](./error-handling.md)
- [Production guidelines](./production-guidelines.md)

## Status

| Area | State |
|---|---|
| Client, services, auth | implemented — 162 services / 622 operations |
| Discovery of endpoints | complete (M002) — catalogued in `contracts/` |
| Contract verification | fixture-based, all 622 operations |
| Live verification | opt-in suite; not yet routinely executed |

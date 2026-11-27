# Integration quick start

> **Beta (M007/M008).** The client, all 162 services and all 622 operations
> are implemented and contract-tested. The package is not yet published to
> npm — install from source until the release milestone lands (see
> [package availability](../../README.md#package-availability)).
> New to the SDK? Read the [guide](../guide/README.md) first.

## Install

The package is not yet published to npm. Until the release milestone lands,
install from a local checkout (the SDK ships compiled `dist/`, so it must
be built first):

```bash
git clone https://github.com/zharia/sage-one-accounting-api.git
cd sage-one-accounting-api
pnpm install && pnpm build

# in your application:
pnpm add /path/to/sage-one-accounting-api
# requires Node.js >= 24; ESM only
```

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

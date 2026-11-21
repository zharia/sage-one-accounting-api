# Node.js integration

## Requirements

- Node.js `>= 24` (`package.json` `engines`)
- ESM only (`"type": "module"`). CommonJS consumers use dynamic import:

```javascript
const { SageOneClient } = await import("@bytemoney/sage-one");
```

- No bundler, Nix or pnpm required at runtime (spec §18).

## Patterns

### Explicit configuration (recommended)

```typescript
import { SageOneClient } from "@bytemoney/sage-one";

const sage = new SageOneClient({
  credentials: { username: env.SAGE_USERNAME, password: env.SAGE_PASSWORD },
  companyId: Number(env.SAGE_COMPANY_ID),
});
```

The SDK never reads environment variables itself — your application owns that boundary.

### Graceful shutdown / cancellation

Every operation accepts `AbortSignal`:

```typescript
const ac = new AbortController();
setTimeout(() => ac.abort(), 5_000);
await sage.accounts.list({ signal: ac.signal });
```

### TypeScript

The package ships declarations; no `@types/*` needed. Strict mode recommended to benefit from branded types.

## Examples

Runnable samples live in `examples/` (basic, customers, invoices, banking, reporting) and compile against the public SDK once M003/M004 land.

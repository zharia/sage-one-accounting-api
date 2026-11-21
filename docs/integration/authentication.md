# Authentication guide

> **Status: unverified (M002 pending).** The mechanism below is the SDK's *interface* design, not a claim about Sage's API. See `docs/api/authentication.md`.

## Planned usage

```typescript
const sage = new SageOneClient({
  credentials: { username, password },
  companyId,
});

// or custom implementation
const sage = new SageOneClient({
  authenticator: myAuthenticator, // implements SageAuthenticator
});
```

## Guarantees (binding regardless of mechanism)

- Credentials supplied by your application — never hard-coded, never read from env implicitly.
- Never logged, never exposed in errors or debug output.
- Concurrent requests share authentication safely (single-flight — no duplicate logins).
- Renewal handled transparently if the verified mechanism requires it.
- Custom `SageAuthenticator` implementations supported.

## Verification operation

The SDK will expose an explicit authentication/verification call where Sage supports one — usable as a startup health check.

## What you should NOT assume

- No OAuth unless Sage documents it.
- No token format/lifetime assumptions until discovery completes.
- Do not build retry-on-401 logic until the verified behaviour is documented here.

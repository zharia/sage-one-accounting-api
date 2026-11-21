# Authentication — PROVISIONAL (discovery pending, M002)

**Status:** Unverified. The published `Login/Validate` endpoint documents a username/password request returning a boolean. That does **not** establish how subsequent requests authenticate. Nothing in this document may be treated as fact until confirmed against the live API or authoritative documentation.

## Open questions (must be answered in M002)

- Which header(s) carry authentication on normal requests?
- Is a token issued? Format, lifetime, renewal mechanism?
- Session handling: cookie, header, explicit session id?
- Company context: how is `CompanyId` conveyed (path, query, header)?
- Required application headers (User-Agent, API key, product identifier)?
- Any signing or credential mechanism beyond username/password?
- Does `Login/Validate` mutate server state (session creation)?

## Planned architecture (stable regardless of mechanism)

```typescript
export interface SageAuthenticator {
  authenticate(context: AuthenticationContext): Promise<AuthenticationResult>;
  apply(request: RequestInit): Promise<RequestInit>;
}
```

Requirements (binding):

- Behind a dedicated interface; custom implementations injectable.
- Never hard-code, log or expose credentials; no secrets in errors.
- Environment-based configuration supplied by the *application*, never read implicitly by the SDK.
- Concurrency-safe: concurrent requests must not trigger duplicate authentication (single-flight).
- Support renewal if the real mechanism requires it.
- Do not invent OAuth behaviour unless Sage documents it.

## Verification

An explicit authentication verification operation will be exposed where the API supports it. Findings move here from M002 with evidence (request/response samples, dates), and ADR-007 flips from `provisional` to `accepted`.

# Authentication — Verified Architecture (M002 / M003)

**Status:** Verified against Sage One Accounting API (`2.0.0`) and Developer Program specification (`contracts/sage-api/snapshots/developer-program.html`). ADR-007 is `accepted`.

## Verified Mechanism

1. **HTTP Basic Authentication:**
   - Every authenticated request carries `Authorization: Basic <base64(username:password)>`.
2. **Application API Key (`apikey`):**
   - Issued by Sage One Developer Program and appended as a query parameter (`?apikey={guid}`).
3. **Company Context (`CompanyId`):**
   - Company-scoped endpoints accept `CompanyId` in the query string (`&CompanyId=12345`).
   - Can be configured at the client level (`config.companyId`) or overridden per request (`options.companyId`).
4. **Credential Verification (`POST /Login/Validate`):**
   - Accepts `{ "Username": "...", "Password": "..." }` and returns `true` or `false`.
   - Exposed via `client.login.validate(credentials)` and `client.verifyAuthentication()`.
5. **Rate Limits & Account Lockout:**
   - **100 requests / minute** per user per company (exceeding returns HTTP `429` and blocks the IP for 1 hour).
   - **5,000 requests / day** per user account.
   - **20 failed login attempts / hour** (exceeding returns HTTP `429` and blocks the username for 24 hours).

## SDK Architecture

```typescript
export interface SageAuthenticator {
  authenticate(context: AuthenticationContext): Promise<AuthenticationResult>;
  apply(request: AuthenticableRequest): Promise<AuthenticableRequest>;
}
```

`BasicAndApiKeyAuthenticator` is the default implementation wired by `SageOneClient`:

- Coalesces concurrent `authenticate()` calls into a single network request (single-flight concurrency).
- Injects `Authorization`, `apikey`, and `CompanyId` without mutating caller objects.
- Never logs or exposes credentials in errors.

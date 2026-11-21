# ADR-007: Authentication architecture

- **Status:** accepted
- **Date:** 2026-11-21

## Context

In M001 the authentication mechanism for requests after `POST /Login/Validate` was unverified. During M002 discovery we archived and inspected the official Sage One Developer Program documentation (`https://accounting.sageone.co.za/Marketing/DeveloperProgram.aspx`, archived at `contracts/sage-api/snapshots/developer-program.html`) and the `/api/2.0.0/help` endpoint specifications.

## Problem

Implement the verified Sage One authentication and company-scoping mechanism behind the pluggable `SageAuthenticator` interface without exposing secrets in logs or errors.

## Verified findings (M002)

1. **HTTP Basic Authentication:** Every authenticated API call uses standard HTTP Basic authentication (`Authorization: Basic base64(username:password)`).
2. **Application API Key (`apikey`):** All API calls include the developer `apikey` query parameter (`?apikey={guid}`) issued by Sage One.
3. **Company Context (`CompanyId`):** All company-scoped calls pass the `CompanyId` (or `companyid`) query parameter (`&CompanyId=12345`).
4. **Credential Verification (`POST /Login/Validate`):** Accepts `{ Username, Password }` in the JSON body (without requiring an existing `Authorization` header) and returns a JSON boolean (`true`/`false`).
5. **Rate & Lockout Limits:** 100 requests/minute per user per company (1-hour IP block on HTTP 429), 5,000 requests/day, and 20 failed login attempts/hour (24-hour username block on HTTP 429).

## Options considered

1. Hard-code Basic Auth and query parameters directly in the transport layer.
2. Keep the `SageAuthenticator` interface (`authenticate` + `apply`) and provide `BasicAndApiKeyAuthenticator` as the default verified implementation with single-flight concurrency on `authenticate()`.

## Decision

Option 2. `SageAuthenticator` remains the transport boundary; `BasicAndApiKeyAuthenticator` implements HTTP Basic header injection, `apikey` and `CompanyId` query parameter injection, and single-flight `POST /Login/Validate` verification via `client.verifyAuthentication()`.

## Rationale

- Preserves clean separation between transport and authentication (`docs/architecture/module-boundaries.md`).
- Allows custom authenticators (e.g., proxy token injectors or test doubles) while providing the verified Sage One mechanism out of the box.
- Single-flight concurrency prevents duplicate `Login/Validate` calls from burning the 20/hour failed-login quota.

## Consequences

- `SageOneClient` accepts `credentials: { username, password }`, `apiKey`, and `companyId` (or a custom `authenticator`).
- `RedactingLogger` and error sanitization strip `Authorization` headers, `apikey` query parameters, and passwords from all logs and error messages.

## Rejected alternatives

- Option 1: Couples transport to credential structure and prevents custom authenticator injection.

## References

Spec §9; `docs/architecture/authentication.md`; `docs/api/authentication.md`.

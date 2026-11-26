# Authentication (API)

> Verified in M002 from `https://accounting.sageone.co.za/Marketing/DeveloperProgram.aspx` and `/api/2.0.0/help`. See also `docs/architecture/authentication.md` and ADR-007.

## Request Requirements

| Component | Location | Format | Required |
|---|---|---|---|
| User credentials | Header `Authorization` | `Basic <base64(username:password)>` | Yes (153 of 162 services) |
| Developer API key | Query parameter `apikey` | `{guid}` | Yes |
| Company ID | Query parameter `CompanyId` | Positive integer | Yes (all company-scoped resources) |

## Services Not Requiring Basic Auth Header

In the `/api/2.0.0/help` specification, 9 services omit the `"This service requires authentication"` requirement on the index page:

- `Login` (`POST /Login/Validate` — validates credentials in request body)
- `CoreEvents`, `CoreTokens`, `Payroll`, `SageIdUser`, `SupportLoginAudit`, `Test`

## Rate Limits (HTTP 429)

Verified against Sage South Africa, *Developer API*
(https://www.sage.com/en-za/sage-business-cloud/accounting/developer-api/),
accessed **2026-11-25**:

- **100 requests per minute** per company; **≤1 request/second advised**.
  Breach → HTTP 429 and a documented **one-hour block** — Sage instructs
  clients not to continue making requests until the block is lifted.
- **20 failed login attempts per hour** → HTTP 429 and a **24-hour block**
  of the username. Isolation scope: API key + Company ID + User (one
  company's block does not affect others).
- **5,000 requests per day** per Accounting account; list methods return a
  maximum of 100 results per minute.
- Sage publishes **no `Retry-After` behaviour**.

### SDK behaviour (ADR-017 Amendment)

- Resource-request 429 → company lane suspended (full `Retry-After` when
  valid, else `scheduler.rateLimitFallbackMs` = 1 h default);
  `SageRateLimitError` surfaced immediately unless a valid, within-budget
  `Retry-After` allows one bounded wait-and-retry. Never auto-retried on
  missing/invalid header; financial mutations are never auto-retried.
- `Login/Validate` 429 → `SageAuthenticationError` (status 429,
  login-throttle message); no resource-lane suspension, no retry.
- `client.verifyAuthentication()` makes **exactly one** validation attempt
  per call (single-flight, no retry loop); invalid credentials never
  produce uncontrolled retries.

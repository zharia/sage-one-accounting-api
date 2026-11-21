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

- **100 requests per minute** per user per company (1-hour IP block if exceeded).
- **20 failed login attempts per hour** (24-hour username block if exceeded).
- **5,000 requests per day** per Accounting account.

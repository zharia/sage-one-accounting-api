# Known limitations

Record every gap honestly (spec §6.1, §24). Nothing is removed from this file without evidence.

## SDK-level

| Limitation | Status | Notes |
|---|---|---|
| M005 (Commercial transactions) and M006 (Banking/reporting/advanced) services pending | by design | 24 services (89 endpoints) implemented in M003–M004; remaining 138 services (533 endpoints) catalogued for M005–M006 |
| Vite+ toolchain not adopted | deliberate | Evaluated at M007 (ADR-014); discrete tools (`tsc`, `vitest`, `eslint`, `prettier`) used meanwhile |
| Git hooks (Lefthook) absent | deferred | Tracked in `milestones/technical-debt.md` (TD-002) |

## API-level (Sage One Accounting API `2.0.0` — Discovered in M002)

| Limitation | Affected Endpoints | Classification | Notes |
|---|---|---|---|
| No public OpenAPI/Swagger specification | `/api/2.0.0/swagger/docs/v1`, `v2` | Verified (`403 Forbidden`) | Contract must be extracted from ASP.NET Web API Help Pages (`/api/2.0.0/help`) |
| OData `$filter` and `$orderby` string restriction | All 138 OData-enabled `Get` endpoints | Documented limitation | Developer Program page states: *"NOTE: Filter and Orderby will not work for string values of any kind. Specific methods are exposed to allow querying on string values where applicable."* |
| Hard maximum page size of 100 items | All 138 paged collection endpoints | Documented limitation | *"A maximum of 100 results will be returned for list methods, regardless of the parameter sent through."* |
| Strict rate & lockout limits | All endpoints | Documented limitation | 100 requests/min per user per company (1-hour IP block on HTTP 429); 20 failed login attempts/hour (24-hour username block on HTTP 429); 5,000 requests/day |
| Missing summary text on index (`"No documentation available."`) despite valid schema & sample on detail page | 44 endpoints (including `POST AccountBalance/Get`, `GET AccountBalance/GetAccountBudgetsById`, `GET AccountBalance/GetAccountBudgets`, `GET Company/Get`) | `partial` | Detail page provides full parameter tables and JSON samples; classified as `partial` in `endpoint-catalogue.json` |
| Untyped `HttpResponseMessage` model on attachment upload/download and PDF export | Attachment `Save` / `Download` endpoints, `POST CustomerStatement/Export` | `partial` | Help page renders ASP.NET `HttpResponseMessage` properties (`Version`, `Content`, `StatusCode`) rather than the wire `application/octet-stream` binary body |
| Completely undocumented internal endpoints | `PUT CoreEvents/Subscribe`, `DELETE CoreTokens/Delete`, `GET Test/Get`, `GET Test/Policy`, `POST Payroll/ReceivePayrollWebhook`, `POST SupportLoginAudit/Save` | `none` / `experimental` | No description and untyped `IHttpActionResult` / `{}` samples |

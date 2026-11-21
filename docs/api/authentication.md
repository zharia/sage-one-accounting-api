# Authentication (API) — PROVISIONAL

> Mirrors `docs/architecture/authentication.md`. **Mechanism unverified.** Discovery is milestone M002's first priority.

## Known from documentation

- A `Login/Validate`-style endpoint accepts username/password and returns a boolean.
- That is all that is established. How subsequent requests authenticate is **unknown**.

## Unknown (must verify)

- Auth header name/format, token issuance, token lifetime, renewal
- Session handling (cookie / header / session id)
- Company context conveyance (`CompanyId`)
- Required application headers
- Any signing scheme
- Whether login mutates server state

## SDK behaviour until verified

- Authentication is behind `SageAuthenticator` (ADR-007); a fake implementation is used in tests.
- No documentation or code may assert a concrete mechanism.
- Credentials are supplied by the application; never logged, never persisted, never embedded in errors.

## Update procedure

When M002 verifies the mechanism: record evidence (sanitized request/response samples + date), update this file and `docs/architecture/authentication.md`, flip ADR-007 to `accepted`, implement the authenticator, add contract + live tests.

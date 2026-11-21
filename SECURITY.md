# Security Policy

## Reporting a vulnerability

Report security issues privately via GitHub Security Advisories on the `zharia/sage-one-typescript` repository. Do not open a public issue for security vulnerabilities.

Include:

- Affected version(s)
- Description and impact
- Reproduction steps (with synthetic data only)
- Suggested fix, if any

You should receive an acknowledgement within 5 business days.

## Supported versions

Pre-1.0 versions receive security fixes only on the latest minor. After 1.0, the two most recent minor lines receive fixes.

## Credential handling rules (binding on this codebase)

- Never hard-code, log, or expose credentials, passwords, tokens or Authorization headers.
- Validation and error messages must never include secrets.
- Redact sensitive fields in structured logs by default.
- The SDK must not persist credentials to disk or hidden storage.
- No `.env` file is required by the SDK; it must never auto-load environment variables as a side effect.
- No live API secrets, tokens or production financial data may be committed — ever.

## Financial safety

This SDK interfaces with an accounting system:

- No automatic retries of financial mutations (invoices, payments, receipts, journals, bank transactions).
- A timeout does not prove the remote mutation failed — never assume it did.
- Never silently round monetary amounts or alter tax values.
- Preserve original Sage error responses.

## Dependency security

- Dependabot and CodeQL run via GitHub Actions.
- `pnpm audit` runs in CI; lockfile changes are reviewed in PRs.
- Runtime dependencies are kept minimal; dev tooling never ships in `dependencies`.

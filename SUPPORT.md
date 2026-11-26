# Support

## Where to get help

| Need | Channel |
|---|---|
| Bug reports | [GitHub Issues](https://github.com/zharia/sage-one-accounting-api/issues) |
| Security vulnerabilities | [SECURITY.md](./SECURITY.md) — private disclosure only |
| Usage questions | GitHub Discussions (when enabled) |
| Sage API questions | [Sage One API documentation](https://accounting.sageone.co.za/api/2.0.0/help) |

## Before filing an issue

1. Confirm you are on the latest version.
2. Check [`docs/api/known-limitations.md`](./docs/api/known-limitations.md) and the [coverage matrix](./docs/api/coverage-matrix.md) — the endpoint may not be implemented yet.
3. Search existing issues.

## Issue template requirements

- SDK version (`pnpm list @bytemoney/sage-one` or lockfile)
- Node.js version and OS
- Minimal reproduction using **synthetic data only**
- Expected behaviour, referencing the Sage documentation URL if applicable
- Actual behaviour, with sanitized logs (never paste credentials or real financial data)

## Project status

Pre-1.0: the public API may change between minor versions. All breaking changes are recorded in [CHANGELOG.md](./CHANGELOG.md).

## No formal SLA

This is a community/open-source project. Response times are best-effort.

# Release plan

## Versioning

- Semver for the npm package `@bytemoney/sage-one-accounting-api` (ADR-015).
- Pre-1.0 (`0.x`): minor may break; documented in SUPPORT.md.
- `1.0.0` gate = M007 acceptance (spec §27 Definition of Done).
- Public TypeScript interface changes can be breaking even when Sage's API didn't change (spec §23.4).

## Release gates (every release)

1. `pnpm verify` green (format, lint, typecheck, tests, type tests, build, attw, docs, package contents).
2. CI green on `main`.
3. Changeset present; CHANGELOG updated.
4. Version-compatibility review: `SAGE_API_VERSION` still correct for the contract snapshot in use.
5. Release notes from changesets.

## Channels

| Track | Branch | Trigger |
|---|---|---|
| Preview (`0.x`) | `main` | changesets/action on push |
| Stable (`1.0+`) | `main` | M007 acceptance + manual approval |

## First publish checklist

- [ ] `NPM_TOKEN` secret configured
- [ ] npm org/package access for `@bytemoney/sage-one-accounting-api`
- [ ] README/LICENSE/NOTICE/CHANGELOG in package `files`
- [ ] `pnpm verify` includes `attw` (already)
- [ ] Auth verified (M002) — no unverified claims in published README

## Post-release

- Tag created by Changesets; changelog committed by version PR.
- Verify install from npm in a scratch project with pnpm (spec §18).

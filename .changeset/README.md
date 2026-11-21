# Changesets

Release management (ADR-014, spec §23.4).

- `pnpm changeset` — describe your change (major/minor/patch) when opening a PR.
- CI (`release.yml`) opens a version PR; merging it publishes.

Pre-1.0: minor bumps may contain breaking changes (documented in SUPPORT.md).

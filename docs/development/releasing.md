# Releasing

Tooling: Changesets (ADR-014). Policy: spec §23.4.

## Flow

```bash
pnpm changeset          # describe the change (major/minor/patch) — with the PR
pnpm version-packages   # apply changesets -> version bump + CHANGELOG update (or CI does it)
pnpm release            # build + changeset publish
```

CI (`.github/workflows/release.yml`) on push to `main`:

1. Nix environment + frozen-lockfile install
2. `pnpm verify` (must pass)
3. `changesets/action` — opens a **Version PR** while changesets accumulate; when merged with publish configured, publishes to npm

## Requirements before first publish

- [ ] `NPM_TOKEN` repository secret configured
- [ ] npm package name `@bytemoney/sage-one` access confirmed (org publishing rights)
- [ ] README/CHANGELOG/LICENSE/NOTICE in package `files` (already set)
- [ ] `pnpm verify` green including `attw`

## Rules

- Semantic versioning; a public TypeScript interface change may be breaking even when Sage's API did not change (spec §23.4).
- Updated changelog + passing CI required for every release.
- Version compatibility review: does the SDK still target the intended Sage API version (`SAGE_API_VERSION`)?
- Release notes generated from changesets.
- Pre-1.0: minor bumps may break; documented in SUPPORT.md.

# M001 — Project foundation

- **Status:** in progress
- **Date opened:** 2026-11-21

## Objective

Establish repository, toolchain, documentation structure, Nix environment, GitHub configuration and CI (spec §26, M001).

## Scope

In: repo layout (spec §3), pnpm/TypeScript/Vitest/ESLint/Prettier toolchain, Nix Flakes dev environment, root + architecture + API + development + integration + reference + agent documentation skeletons, ADR-001..015, milestone plan, GitHub workflows/templates/dependabot, verification command.

Out: API discovery (M002), client/transport/auth implementation (M003), any endpoint implementation.

## Prerequisites

- None (first milestone).

## Deliverables

- Git repository on `main` with committed structure per spec §3.
- `flake.nix` + `flake.lock`: `nix develop` provides Node 24 LTS, pinned pnpm, git — verified working on Arch Linux without NixOS.
- `package.json` (name `@bytemoney/sage-one`, engines `>=24`, `packageManager pnpm@11.26.0`), workspace, committed lockfile.
- Strict `tsconfig.json` (all §4.6 flags) + `tsconfig.build.json`.
- `pnpm verify` implementing spec §17.7 steps.
- Root docs set (README, CONTRIBUTING, SECURITY, CHANGELOG, LICENSE Apache-2.0, NOTICE, SUPPORT, AGENTS.md, CODE_OF_CONDUCT).
- `.agents/` + CLAUDE/GEMINI/copilot entry files referencing AGENTS.md.
- GitHub: ci.yml, release.yml, security.yml, documentation.yml, issue/PR templates, dependabot.
- Docs tree per spec §3 (architecture incl. 15 ADRs, api, development, integration, reference, agents, decisions).
- Milestones: README, roadmap, release-plan, technical-debt, M001..M007, sprint template.

## Technical tasks

1. Repo + hygiene files (gitignore, editorconfig, npmrc).
2. Directory skeleton with separation of src/contracts/tests/docs/milestones.
3. Toolchain pins and configs (eslint, prettier, vitest, tsconfig).
4. Nix flake with corepack-managed pnpm pin.
5. Documentation authoring (this milestone's main effort).
6. ADRs 001–015 (003/007/012 provisional per spec §21).
7. CI workflows + templates + dependabot.
8. Verification script; run it green; initial commit.

## Test requirements

- `tests/unit/index.test.ts` smoke test for the public entry point (grows with M003).
- CI validates flake + frozen-lockfile install + full verify on Node 24 and 26.

## Documentation requirements

All deliverable docs listed above exist with real content (not empty stubs); scaffolds explicitly marked with their milestone (e.g. auth marked provisional).

## Acceptance criteria

- [ ] `nix develop` works on Arch Linux (no NixOS) with pinned Node/pnpm
- [ ] `pnpm verify` passes end-to-end locally
- [ ] `nix flake check` passes
- [ ] CI workflows present and equivalent to local verify
- [ ] Spec §3 layout present (refinements documented)
- [ ] All root docs + docs tree + ADRs + milestones exist
- [ ] No secrets, no `.env` committed
- [ ] Initial commit on `main`

## Risks

- Nix + corepack interplay on non-NixOS hosts → mitigated with writable shim dir, documented in `docs/development/nix.md`.
- Doc scaffolds mistaken for verified fact → every provisional doc carries explicit status banners.

## Dependencies

- None.

## Outstanding technical debt

See `milestones/technical-debt.md` (TD-001..TD-007 raised at M001).

## Completion report

_Appended when accepted._

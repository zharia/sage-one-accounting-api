# Progress — M001 Project Foundation

Live checklist for current session. Updated as work completes.

## M001 tasks

- [x] 1. Git repo init, .gitignore, .editorconfig, .npmrc
- [x] 2. Directory skeleton (src/tests/docs/milestones/contracts/scripts/examples/.agents/.github)
- [x] 3. package.json + pnpm workspace + lockfile install
- [x] 4. tsconfig (strict, per spec 4.6) + tsconfig.build.json
- [x] 5. Build toolchain (library build, vitest, eslint, prettier) + verify script
- [x] 6. Nix flake (nodejs 24 LTS pinned, pnpm, git) + flake.lock — `nix develop` verified: node v24.22.2, pnpm 11.26.0
- [x] 7. Skeleton src (public entry `src/index.ts`, module dirs preserved via .gitkeep — core stubs are M003 scope)
- [x] 8. Root docs (README, CONTRIBUTING, SECURITY, CHANGELOG, LICENSE, NOTICE, SUPPORT, AGENTS.md)
- [x] 9. .agents/ + agent files (CLAUDE.md, GEMINI.md, copilot-instructions)
- [x] 10. .github/ (ci, release, security, documentation workflows, templates, dependabot)
- [x] 11. docs/ skeleton (architecture, api, development, integration, reference, agents, decisions)
- [x] 12. ADR-001..015 initial records
- [x] 13. milestones/ (README, roadmap, M001..M007, sprint template)
- [x] 14. contracts/ skeleton + fixtures dir (README documents pending-M002 state)
- [x] 15. examples/ skeleton (5 dirs with honest placeholder READMEs) + .env.example + .changeset
- [x] 16. Run full verification — `pnpm verify` 10/10 green, `nix flake check` green
- [ ] 17. Initial commit

## Session notes

- Environment: nix 2.35.2, pnpm 11.26.0, node 26.8.2 (host), git 2.55.0
- Pinned Node: 24 LTS (nixpkgs nodejs_24 = 24.22.2), engines >=24
- Toolchain decision: tsc build (no bundler), vitest, eslint, prettier — Vite+ evaluation deferred, documented in ADR-014

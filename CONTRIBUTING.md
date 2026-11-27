# Contributing

Thank you for contributing to `@bytemoney/sage-one-accounting-api`.

## Ground rules

1. The specification (`__init_spec_01.md`) is the project-level implementation authority.
2. Never invent Sage API behaviour. If the documentation is silent, record the gap in `docs/api/known-limitations.md` and the coverage matrix instead of guessing.
3. Every implementation change ships with tests and documentation updates.
4. API contract fidelity beats convenience. Raw contract layer keeps Sage's PascalCase wire names.
5. Financial mutations are high-consequence: no automatic retries, no silent rounding, no hidden business rules.

## Development environment

```bash
nix develop        # Node 24 LTS, pnpm pinned by packageManager, git
pnpm install
pnpm verify        # must pass before review
```

Do not mix npm, Yarn and pnpm. Commit `pnpm-lock.yaml`.

## Workflow

1. Branch from `main` (`feat/<milestone>-<topic>`, `fix/<topic>`, `docs/<topic>`).
2. Read the current milestone in `milestones/` and the relevant `docs/` pages before coding.
3. Implement, test, document — in that order of completeness, not in that order of priority.
4. Run `pnpm verify`.
5. Open a pull request using the template. All changes to `main` go through a PR.

## Tests

- Unit tests: `tests/unit/`
- Integration tests (MSW): `tests/integration/`
- Contract tests: `tests/contract/`
- Type tests: `tests/type-tests/`
- Property tests: `tests/property/`
- Live API tests: `tests/live/` — opt-in only, never in ordinary CI

New endpoints require contract fixtures traceable to Sage documentation or verified live observations.

## Commits and releases

- Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`, `chore:`, `refactor:`).
- Releases are managed with Changesets: run `pnpm changeset` for user-facing changes.
- Semantic versioning: a public TypeScript interface change can be breaking even when the Sage API did not change.

## Documentation

- Update `docs/` alongside code.
- Record significant decisions as ADRs in `docs/architecture/adr/`.
- Update the API coverage matrix (`docs/api/coverage-matrix.md`) for any endpoint work.

## Reporting bugs

Use GitHub issues. Include SDK version, Node version, minimal reproduction, and whether the behaviour matches the Sage documentation. Never paste credentials or production financial data.

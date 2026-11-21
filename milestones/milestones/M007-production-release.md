# M007 — Production readiness

- **Status:** not started
- **Prerequisites:** M006 accepted

## Objective

Complete endpoint coverage, tests, documentation, package verification, release automation and first stable release (spec §26, M007; DoD = spec §27).

## Scope

In: coverage closure, documentation completion, live test suite, release pipeline hardening, Vite+ evaluation, 1.0.0 release.

## Deliverables

- 100% coverage of discoverable documented endpoints, or recorded classifications for the remainder.
- Full docs set (spec §19) — all examples compile against the real SDK.
- Optional live suite (`tests/live`) established: env-gated, dedicated test company, destructive ops flagged (TD-006).
- TypeDoc API reference published (`documentation.yml` real build — TD-003).
- Vite+ evaluation completed and recorded in ADR-014 (TD-005).
- Release automation verified end-to-end: changeset → version PR → npm publish → install check.
- Technical debt reviewed: all items repaid or explicitly accepted (TD-001..N).

## Test requirements

- All suites green in CI; live suite documented and demonstrated (non-destructive path).
- Package consumption test: fresh pnpm project installs and imports the published artifact.

## Documentation requirements

- Spec §19 checklist: root docs, architecture docs, API docs (every service/operation), integration docs, agent docs.
- Coverage report: total/implemented/typed/validated/contract-tested/undocumented/limitations.

## Acceptance criteria (spec §27 — all 20 items)

- [ ] Entire documented endpoint inventory catalogued
- [ ] All discoverable endpoints have strongly typed bindings (or recorded limitations)
- [ ] Undocumented limitations explicitly recorded
- [ ] Runtime schemas for supported contracts
- [ ] Authentication verified against actual API
- [ ] Transport supports required content types/response formats
- [ ] Pagination + OData tested
- [ ] Attachments + binary downloads supported
- [ ] Logging + redaction verified
- [ ] Decimal handling documented + tested
- [ ] Unit/integration/contract/type tests pass
- [ ] Optional live tests established
- [ ] Package builds; consumable without dev toolchain
- [ ] All required documentation exists
- [ ] Agent instructions complete
- [ ] Architectural decisions recorded
- [ ] Milestones + technical debt documented
- [ ] GitHub CI passes
- [ ] Reproducible Arch Linux environment via Nix Flakes
- [ ] First stable release (`1.0.0`) published to npm with release notes

## Risks

- Late discovery of undocumented endpoints → mitigated by M002 classification discipline.
- Release credentials/org setup last-minute → prepare NPM_TOKEN early (release-plan.md).

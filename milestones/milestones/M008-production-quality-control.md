# M008 — Quality and Production Assurance

**Project:** Sage One Accounting API — TypeScript SDK  
**Repository:** `zharia/sage-one-accounting-api`  
**Milestone:** M008  
**Status:** In progress (WP008.1 complete — 2026-11-24; WP008.2 complete — 2026-11-25; WP008.3 complete — 2026-11-25; WP008.2R complete — 2026-11-25, release pipeline recovered: run #18 success https://github.com/zharia/sage-one-accounting-api/actions/runs/45763375541, Version PR #7 open)  
**Priority:** Critical  
**Predecessor:** M006 — API Coverage and SDK Implementation  
**Successor:** M007 — Production Release  
**Milestone objective:** Establish and demonstrate the technical correctness, operational resilience, API compatibility and release integrity required before the SDK can be considered production-ready.

---

## 1. Executive Summary

M008 is a dedicated quality and production-assurance milestone for the Sage One Accounting API TypeScript SDK.

The project has established a substantial implementation foundation, including API discovery, generated domain bindings, transport abstractions, authentication support, financial utilities, tests, documentation and automated build infrastructure.

However, completion of the implementation and API coverage milestones does not, by itself, establish production readiness.

The current implementation review identified several material deficiencies requiring resolution:

1. Generated resource schemas do not consistently preserve the underlying API's type, required-field and nullability semantics.
2. Rate-limit handling recognises HTTP 429 responses but does not provide a sufficiently robust, centrally coordinated request-scheduling mechanism.
3. Release automation is failing due to incompatibilities in the Changesets workflow configuration and publishing configuration.
4. Live Sage API compatibility has not yet been demonstrated through an adequately controlled integration test programme.
5. Documentation, coverage records and repository metadata contain inconsistencies that undermine the reliability of the project's own technical records.
6. The distinction between fixture-based tests, mocked integration tests, documented contract verification and genuine live API verification needs to be made explicit.

M008 addresses these deficiencies through a controlled sequence of implementation, verification and evidence-based acceptance activities.

**M008 is not a rewrite of the SDK.** Existing architecture, implementation decisions and completed work must be preserved unless a specific defect or demonstrable architectural limitation justifies modification.

The milestone is complete only when its acceptance criteria have been demonstrated through reproducible tests and recorded evidence.

---

## 2. Objectives

M008 has the following objectives.

### 2.1 Contract and type fidelity

Ensure generated TypeScript types and Zod schemas accurately represent the documented Sage API contracts.

The generator must preserve:

- Primitive field types.
- Required and optional fields.
- Nullable and non-nullable fields.
- Nested model references.
- Collection types.
- Enumerations.
- Decimal and financial representations.
- Read-only and response-only properties.
- Forward-compatible handling of undocumented fields.

Generated resource models must be meaningfully typed rather than relying on permissive unions or indiscriminate optionality.

### 2.2 Request scheduling and rate-limit resilience

Implement a central request-management mechanism that can coordinate API requests and respond correctly to Sage API rate limits.

The mechanism must support:

- Per-company request coordination.
- Configurable concurrency.
- Request queuing.
- Rate-limit suspension.
- HTTP `Retry-After` handling.
- Exponential backoff with jitter where appropriate.
- Request cancellation.
- Safe retry policies.
- Observable scheduling and retry behaviour.

### 2.3 Verification integrity

Establish an explicit and auditable testing hierarchy.

The project must distinguish between:

- Static and compile-time verification.
- Unit tests.
- Generated-schema tests.
- Fixture-based contract tests.
- Mocked transport and integration tests.
- Live Sage API integration tests.

A successful mocked test must never be represented as proof of live Sage API compatibility.

### 2.4 Live API verification

Demonstrate that the SDK can successfully authenticate against the actual Sage One Accounting South Africa API and execute representative business workflows.

This must include controlled verification of accounting operations, including customer and invoice workflows.

### 2.5 Release pipeline integrity

Repair the automated release process and demonstrate that the repository can produce a valid, controlled prerelease.

### 2.6 Documentation and governance integrity

Reconcile technical documentation, milestone records, API coverage information, repository metadata and implementation status.

All project documentation must reflect the actual implementation state.

---

## 3. Scope

### 3.1 Included

M008 includes:

- Type-generation correctness.
- Generated model and schema verification.
- Request scheduling and rate-limit handling.
- Retry and cancellation semantics.
- Contract-test improvements.
- Live Sage API integration testing.
- Release automation repair.
- Package metadata reconciliation.
- Documentation reconciliation.
- Vite+ tooling decision.
- Test coverage and quality reporting.
- Technical-debt review.
- Production-readiness assessment.

### 3.2 Excluded

M008 does not include:

- A wholesale rewrite of the SDK.
- Replacement of the existing transport architecture without demonstrable necessity.
- Unnecessary redesign of existing public APIs.
- Expansion into unrelated Sage products or accounting platforms.
- A complete redesign of the generated domain modules.
- Introduction of additional runtime dependencies without a demonstrated benefit.
- Production deployment or general availability publication.
- Uncontrolled financial transactions against production Sage accounts.

New API operations may be added where necessary to complete a representative verification workflow or correct an identified implementation defect. Such additions must remain within the existing project scope and be documented.

---

## 4. Architectural Constraints

The existing repository is the authoritative implementation baseline.

All M008 work must preserve the following architectural principles unless an approved Architecture Decision Record (ADR) explicitly supersedes them.

| Area | Architectural direction |
|---|---|
| Language | TypeScript, strict mode |
| Runtime | Node.js 24 baseline |
| Package manager | pnpm |
| Toolchain | Nix flakes |
| Build | Existing TypeScript build pipeline |
| Validation | Zod |
| HTTP | Native Fetch-based transport |
| Logging | Pino |
| Testing | Existing Vitest infrastructure |
| Versioning | Changesets |
| API integration | Existing `SageRequestExecutor` abstraction |
| Financial arithmetic | BigInt-backed fixed-decimal utilities |
| CI/CD | GitHub Actions |
| Documentation | Existing repository documentation structure |

The existing separation between domain modules and transport execution must be maintained.

Domain modules must not introduce their own independent HTTP clients or bypass the central request-execution abstraction.

The generator remains the authoritative source for generated domain models. Generated files must not be manually patched to compensate for generator defects.

---

# 5. Work Packages

M008 is divided into six work packages.

Each work package must be completed and independently verified before the milestone can be closed.

## WP008.1 — Contract and Type Generator Fidelity

**Priority:** Critical  
**Classification:** P1  
**Primary area:** `scripts/generate/`

### 5.1.1 Problem statement

The existing type generator does not consistently preserve the semantics of the Sage API model definitions.

The implementation of `fieldToZodExpr()` in:

`scripts/generate/generate-domains.ts`

requires particular attention.

The observed implementation can generate overly permissive schemas, including:

- Known scalar fields represented as broad unions of strings, numbers and arbitrary records.
- Collection fields represented using `z.array(z.unknown())`.
- Model references represented using unnecessarily broad object and primitive unions.
- Fields treated as optional and nullable without reliably respecting the source contract.
- Decimal representations that conflict with the project's documented wire-format assumptions.

This weakens the principal value proposition of the SDK: reliable, domain-specific typing.

### 5.1.2 Requirements

The generator must correctly interpret and preserve source metadata.

For every field, the generator must account for:

| Property | Required behaviour |
|---|---|
| Primitive type | Generate the appropriate TypeScript and Zod type |
| Required | Preserve whether the field is required |
| Optional | Preserve whether the field may be omitted |
| Nullable | Preserve whether the field may explicitly be `null` |
| Collection | Generate a typed array or collection |
| Model reference | Resolve the referenced model where possible |
| Enumeration | Generate a constrained representation |
| Read-only | Preserve response-only semantics where applicable |
| Unknown metadata | Record and report unsupported cases rather than silently weakening types |

The generator must distinguish the following concepts:

- A property that is required and non-nullable.
- A property that is required but nullable.
- A property that is optional but non-nullable when supplied.
- A property that is optional and nullable.

These are distinct API contracts and must remain distinct in generated schemas.

### 5.1.3 Nested model generation

Where a field references another known model:

- Generate or reuse the corresponding model schema.
- Preserve the referenced model's actual structure.
- Avoid replacing known nested structures with `z.unknown()`.
- Avoid arbitrary unions unless the source contract genuinely describes a union.
- Handle circular model references without generating invalid TypeScript or runtime schema definitions.

Collections of referenced models must retain their element types.

### 5.1.4 Decimal and financial types

The generated wire schemas must reflect the actual Sage API representation.

ADR-012 states that Sage serialises decimal values as JSON numbers.

This assumption must be verified against the available API documentation and representative live responses.

If confirmed:

- Wire-level decimal fields must use `z.number()`.
- Generated TypeScript wire types must use `number`.
- Internal financial calculations must continue to use the existing fixed-decimal utilities.
- Conversion between wire values and internal decimal representations must be explicit.
- Do not silently permit string representations in wire schemas merely to accommodate internal arithmetic.

If live evidence contradicts ADR-012, update the ADR and implement the verified contract consistently.

### 5.1.5 Forward compatibility

The SDK should tolerate additional API response properties where appropriate without weakening known property definitions.

Forward compatibility must not be achieved by making every known property arbitrary.

The implementation must distinguish:

- Known, strongly typed fields.
- Unknown additional fields.
- Unsupported or ambiguous source definitions.

Unknown fields should be handled according to a documented schema policy.

### 5.1.6 Generator regression tests

Add automated generator tests covering at least:

1. Required primitive field.
2. Optional primitive field.
3. Nullable primitive field.
4. Optional nullable field.
5. Typed collection.
6. Collection of nested models.
7. Nested model reference.
8. Enumeration.
9. Decimal field.
10. Read-only field.
11. Circular model reference.
12. Unknown or unsupported source metadata.

Tests must verify both the generated TypeScript representation and the resulting Zod validation behaviour.

Include negative tests demonstrating that invalid values are rejected.

### 5.1.7 Regeneration

After generator corrections:

- Regenerate all affected domain modules.
- Verify generated output is deterministic.
- Verify repeated generation produces no unexplained differences.
- Run the complete build and test suite.
- Update generated coverage and model statistics.

The existing endpoint catalogue and API documentation must remain available as the source of truth.

### 5.1.8 Acceptance criteria

- [x] Required and optional semantics are preserved.
- [x] Nullable and non-nullable semantics are preserved.
- [x] Known primitive types are not unnecessarily widened.
- [x] Known nested models are strongly typed.
- [x] Collections retain their element types.
- [x] Enumerations are represented appropriately.
- [x] Decimal wire representation is supported by documented evidence.
- [x] Generator regression tests pass.
- [x] All affected generated modules have been regenerated.
- [x] Generation is deterministic.
- [x] No unexplained broad unions remain in ordinary resource fields.
- [x] Existing public SDK functionality remains intact.

**Evidence (2026-11-23/24):** `scripts/generate/field-schema.ts` mapping with 17/17 regression tests (`tests/unit/generate/field-schema.test.ts`, covering all 12 cases of §5.1.6); all domain modules regenerated; two consecutive regenerations byte-identical (sha256); constrained literal unions from 21 published enum pages (ADR-004 amendment); documented exceptions in `CONTRADICTION_OVERRIDES` / `UNRESOLVED_REF_OVERRIDES` (ADR-016); remaining unresolved references recorded in `model-extensions.json`, `known-limitations.md` and TD-008; `pnpm verify` 10/10 with 55/55 tests including all 622 contract-fixture operations.

**Deliverable:** Corrected generator, regenerated models, regression tests and an updated generator design record.

---

## WP008.2 — Central Request Scheduler and Rate-Limit Management

**Priority:** Critical  
**Classification:** P1  
**Primary area:** `src/transport/`

### 5.2.1 Problem statement

The current transport recognises HTTP 429 responses and maps them to `SageRateLimitError`.

However, rate-limit handling is not yet sufficiently coordinated.

The current implementation includes retry and exponential-backoff behaviour, but it does not adequately honour `Retry-After` or coordinate requests at company level.

Independent callers can therefore generate unnecessary concurrent traffic and retry storms.

### 5.2.2 Architectural requirement

Implement a central request scheduler integrated into the existing `SageRequestExecutor` execution path.

The scheduler must be the common coordination point for API requests.

Domain services must not implement their own rate-limit handling.

The scheduler must be designed to accommodate Sage API limits without assuming undocumented limits or inventing fixed thresholds.

### 5.2.3 Request scheduling

The scheduler must support:

- Configurable maximum concurrency.
- A request queue.
- Per-company scheduling isolation.
- Configurable request pacing.
- Queue cancellation.
- Graceful shutdown.
- Request timeouts.
- Observable queue state.
- Fair scheduling between callers where practical.

Company-level isolation is important because a single SDK process may service multiple Sage companies.

A rate limit affecting one company must not automatically suspend unrelated companies unless the API contract indicates a shared limit.

### 5.2.4 Retry-After handling

Implement correct handling of the HTTP `Retry-After` response header.

Support both standard representations:

1. Delta seconds.
2. HTTP-date.

The scheduler must:

- Parse the header safely.
- Calculate the appropriate suspension interval.
- Respect the server-provided delay.
- Avoid retrying before the delay expires.
- Apply a documented maximum wait policy.
- Preserve the original error when a retry is not appropriate.

Where the header is missing or invalid, use a configurable exponential-backoff strategy with jitter.

### 5.2.5 Retry safety

Retries must be operation-aware.

At minimum, distinguish:

| Operation | Default retry policy |
|---|---|
| GET | Retry eligible transient failures |
| HEAD | Retry eligible transient failures |
| PUT | Retry only where idempotency is established |
| DELETE | Retry only where outcome semantics are established |
| POST | Do not automatically retry ambiguous outcomes |
| Other mutations | Require an explicit retry policy |

An HTTP response failure does not necessarily mean that a financial mutation was not processed by Sage.

The SDK must not create duplicate invoices, payments, journals or other accounting transactions because of an indiscriminate retry.

Where supported by Sage, idempotency mechanisms may be used. Do not invent or assume server-side idempotency support.

### 5.2.6 Cancellation and timeouts

The scheduler must support `AbortSignal` propagation.

A cancelled queued request must not be dispatched.

An active request should be cancelled where supported by the underlying transport.

Request timeout behaviour must be consistent and documented.

### 5.2.7 Observability

Expose useful operational information without leaking credentials or sensitive accounting data.

Logging and diagnostics should include, where appropriate:

- Company identifier or safe company reference.
- Request method.
- API resource or endpoint.
- Queue wait duration.
- Request execution duration.
- Retry count.
- Rate-limit response.
- Retry delay.
- Cancellation.
- Final request outcome.

Sensitive headers, tokens, API keys and confidential payloads must remain redacted.

### 5.2.8 Testing

Add deterministic tests for:

- Concurrent request limits.
- Per-company isolation.
- Queue ordering.
- Request cancellation before dispatch.
- Cancellation during execution.
- Delta-seconds `Retry-After`.
- HTTP-date `Retry-After`.
- Invalid `Retry-After`.
- Exponential backoff.
- Jitter bounds.
- 429 suspension.
- GET retry behaviour.
- Mutation retry restrictions.
- Timeout behaviour.
- Scheduler shutdown.

Use fake clocks or equivalent deterministic timing controls where possible. Tests must not depend on arbitrary real-world delays.

### 5.2.9 Acceptance criteria

- [x] All API requests pass through the central scheduler — every attempt in `SageTransport.execute` awaits `scheduler.acquire()` before the timeout timer starts; the auth `Login/Validate` preflight is the documented single-request exception (ADR-017).
- [x] Per-company request coordination works — lane key `request.companyId ?? config.companyId ?? "default"`; test "suspends only the affected company lane on 429" proves isolation.
- [x] Concurrency limits are configurable — `scheduler.maxConcurrency` (default 4), Zod-validated; test "enforces the configurable concurrency limit".
- [x] Queued requests can be cancelled — `AbortSignal` removes the entry pre-dispatch (never runs) and aborts in-flight attempts; tests "cancels a queued request before dispatch" + "cancels an in-flight request via caller AbortSignal".
- [x] `Retry-After` delta seconds are honoured — `parseRetryAfterMs("60")` → 60 000 ms; transport test advances the fake clock and asserts no early retry.
- [x] `Retry-After` HTTP-date is honoured — `Date.parse` relative to now, past dates clamp to 0; transport test asserts retry only after the computed delay.
- [x] Backoff uses bounded, documented behaviour — full jitter `random() * min(maxBackoffMs, base * 2^(attempt-1))`, `scheduler.maxBackoffMs` default 30 s, invalid `Retry-After` falls back to backoff (all tested with injectable `random`).
- [x] Mutation retry policies prevent ambiguous duplicate transactions — POST/PUT/DELETE require `allowRetry: true`, `isFinancialMutation` never retries; test "never auto-retries mutations (POST 503 = single attempt)".
- [x] Logging is useful and appropriately redacted — `scheduler.enqueue/dispatch/cancel/rate_limit` events carry lane, method, resource, operation, correlation ID, queue wait, delay; test asserts no credential-shaped keys.
- [x] Scheduler tests are deterministic — `tests/unit/transport-scheduler.test.ts` uses `vi.useFakeTimers()` only; no real-world delays.
- [x] Existing transport and service tests pass — full suite 81/81 green (55 pre-existing + 26 new).

**Deliverable:** Central scheduler, rate-limit handling, retry-policy implementation, operational documentation and automated tests.

---

## WP008.3 — Contract Verification and Test Integrity

**Priority:** High  
**Classification:** P1  
**Primary areas:** `tests/`, `docs/`

### 5.3.1 Problem statement

The project has a substantial testing foundation, but the nature of the evidence must be made explicit.

Fixture-based tests and mocked integration tests are valuable. They do not, however, demonstrate that the SDK is compatible with the live Sage API.

M008 must establish a clear verification model.

### 5.3.2 Verification classification

Every test suite and verification report must be classified according to the following levels.

| Level | Verification type | What it establishes |
|---|---|---|
| V0 | Static and compile-time | Code quality, compilation and type constraints |
| V1 | Unit | Correctness of isolated functions and components |
| V2 | Generated contract | Schema and type correctness against recorded source contracts |
| V3 | Fixture-based integration | Behaviour against representative recorded request/response fixtures |
| V4 | Mocked transport integration | Behaviour across SDK components using controlled simulated responses |
| V5 | Live API integration | Compatibility with the actual Sage API |

A lower verification level must not be presented as evidence for a higher one.

### 5.3.3 Contract fixtures

Review the existing fixtures and ensure that each has traceable provenance.

Where practical, record:

- Source endpoint.
- API operation.
- Date acquired.
- API documentation or source reference.
- Whether the fixture is synthetic or captured.
- Whether sensitive values have been redacted.
- Any transformations applied.

Synthetic fixtures must be clearly identified.

Captured fixtures must not contain credentials, personal information or confidential financial data.

### 5.3.4 API contract coverage

Reconcile the existing API coverage information.

The current implementation records approximately:

- 622 discovered API operations.
- 552 fully documented operations.
- 56 partially documented operations.
- 8 experimental operations.
- 6 undocumented operations.

These figures must be revalidated against the current repository before being treated as authoritative.

For every operation, establish an accurate status:

- Discovered.
- Documented.
- Modelled.
- Implemented.
- Fixture-verified.
- Live-verified.
- Unsupported.
- Deprecated or otherwise unavailable.

Do not collapse these statuses into a single ambiguous coverage percentage.

### 5.3.5 Test reporting

The test reporting system must make it possible to determine:

- Which API operations have automated tests.
- Which resource schemas have validation tests.
- Which workflows have fixture coverage.
- Which workflows have mocked integration coverage.
- Which workflows have live verification.
- Which operations remain unverified.

The test suite must remain runnable in CI without live Sage credentials.

Live verification must be a separate, explicitly configured test stage.

### 5.3.6 Acceptance criteria

- [x] Test verification levels are documented — V0–V5 table + evidence rule in `docs/architecture/verification-levels.md`; ADR-013 amended.
- [x] Existing tests are classified correctly — every one of the 11 test files classified in the suite-classification table (same doc); boundary check identified as V0.
- [x] Synthetic fixtures are identifiable — `contracts/fixtures/PROVENANCE.md` classifies all 622 as synthetic/docs-derived; test rejects stray `captured` claims.
- [x] Captured fixtures have provenance — per-fixture `sourceUrl` + `discoveredAt` + `documentationCompleteness` enforced by `tests/unit/fixture-provenance.test.ts` (622/622); captured-kind rules defined and enforced for future WP008.4 captures.
- [x] API operation coverage is reconciled — `tests/unit/coverage-reconciliation.test.ts` revalidates 162 services / 622 operations, 552/56/8/6 split, per-service counts, and fixture↔catalogue bijection against the repo.
- [x] Test reports distinguish implemented from verified operations — `docs/api/coverage-matrix.md` "Verification status per operation" table reports the 8 statuses individually (Implemented 622, Fixture-verified 622, **Live-verified 0**), no collapsed percentage.
- [x] No mocked test is described as live verification — verification-levels doc classifies MSW/contract suites as V3/V4; live = V5 only; stale docs claiming `tests/mocks`/`tests/fixtures` content and `--project live` fixed.
- [x] CI can execute the non-live test suites independently — `ci.yml` runs `pnpm verify` with no Sage credentials (live excluded by `vitest.config.ts`); live stage is a separate manual workflow (`live-tests.yml`) + `pnpm test:live`.

**Deliverable:** Verification strategy, updated fixtures and coverage records, and an auditable test classification.

---

## WP008.4 — Live Sage API Integration Verification

**Priority:** Critical  
**Classification:** P1  
**Primary areas:** `tests/live/`, `docs/testing/`

### 5.4.1 Objective

Demonstrate that the SDK operates correctly against the actual Sage One Accounting South Africa API.

This work package must use a dedicated Sage test company or other explicitly authorised non-production environment.

Do not use a production accounting company for uncontrolled testing.

### 5.4.2 Configuration

Live tests must be opt-in and separately configured.

Required configuration should be supplied through environment variables or the project's established configuration mechanism.

The exact variable names must be documented consistently with the existing authentication implementation.

Secrets must never be committed to the repository, written to fixtures or exposed in CI logs.

Live tests must fail clearly when required credentials are absent.

### 5.4.3 Authentication verification

Verify:

- API authentication.
- API key handling.
- Company context.
- Authentication failure handling.
- Expired or invalid credential behaviour where testable.
- Secure logging and credential redaction.

The test must establish that the SDK is communicating with the intended Sage company.

### 5.4.4 Representative read operations

Verify representative operations including:

- Company information.
- Chart of accounts.
- Customer retrieval.
- Supplier retrieval.
- Tax information where applicable.
- Invoice retrieval.
- Pagination.
- OData filtering and query construction.

Use actual Sage responses to validate the generated models and schemas.

Where a specific resource is unavailable in the test company, document the limitation rather than fabricating a successful result.

### 5.4.5 Controlled write workflows

Implement a controlled accounting workflow.

At minimum:

1. Create a uniquely identifiable test customer.
2. Retrieve the customer.
3. Validate the returned customer model.
4. Create a test tax invoice for that customer.
5. Retrieve the invoice.
6. Validate the returned invoice model.
7. Verify the relevant financial values and totals.
8. Record the Sage response and verification result.

The workflow must use valid test-company tax, account and customer data.

Do not assume that every Sage account has identical tax codes, account codes or configuration.

Use discovery and validation before creating financial records.

Where supported and appropriate, mark test records clearly in their descriptions or references.

### 5.4.6 Financial correctness

Verify that:

- Amounts are represented consistently.
- Tax values are interpreted correctly.
- Decimal conversion does not introduce unexpected rounding.
- Invoice totals are consistent with the returned Sage values.
- Internal fixed-decimal calculations remain distinct from wire-format values.

Do not assume that the SDK's own calculated total is correct merely because it matches another SDK-generated calculation.

Compare against Sage's returned values and the applicable documented accounting rules.

### 5.4.7 Error verification

Where safely testable, verify:

- Invalid credentials.
- Invalid company context.
- Invalid resource identifiers.
- Invalid request payloads.
- Validation failures.
- Rate-limit responses, using controlled simulation if a live 429 would be unsafe to provoke.

Do not deliberately exhaust a real Sage rate limit merely to test scheduler behaviour.

### 5.4.8 Attachments and downloads

Where the test environment supports these operations, verify:

- Attachment upload.
- Attachment retrieval.
- Download handling.
- Content-type handling.
- Error handling for unavailable resources.

If these operations cannot be verified safely or the required Sage functionality is unavailable, record them as unverified.

### 5.4.9 Cleanup and financial safety

Tests must not assume that deleting a financial record is always possible or appropriate.

Use a dedicated test company.

Where test records cannot safely be removed, retain them with a clear test identifier and document the cleanup policy.

The live test harness must:

- Avoid destructive operations.
- Avoid duplicate transactions on retry.
- Prevent accidental execution against production.
- Require explicit opt-in.
- Record the target company.
- Produce a clear execution summary.

### 5.4.10 Acceptance criteria

- [ ] Dedicated test-company configuration is documented.
- [ ] Authentication succeeds against live Sage.
- [ ] Company context is verified.
- [ ] Representative read operations succeed.
- [ ] Customer create/retrieve workflow succeeds.
- [ ] Invoice create/retrieve workflow succeeds.
- [ ] Returned schemas validate actual responses.
- [ ] Financial values are reconciled.
- [ ] Pagination and OData behaviour are verified.
- [ ] Error handling is verified where safe.
- [ ] No duplicate financial transactions result from retry behaviour.
- [ ] Test execution is opt-in and safely isolated.
- [ ] Live test results are recorded as evidence.

**Deliverable:** Live integration test suite, configuration documentation, and a dated live-verification report.

---

## WP008.5 — Release Pipeline and Package Integrity

**Priority:** Critical  
**Classification:** P1  
**Primary areas:** `.github/workflows/`, `package.json`, `.changeset/`

### 5.5.1 Problem statement

The latest observed release workflow failed.

The failure investigation identified configuration inconsistencies involving:

- Changesets CLI version compatibility.
- Incorrect action input names.
- Missing or empty npm publishing credentials.

The release pipeline must be repaired and demonstrated to work.

### 5.5.2 Changesets compatibility

Inspect the installed Changesets CLI version and the version of `changesets/action` used by the workflow.

Select a compatible configuration.

Do not assume that the workflow's documented inputs are interchangeable across action versions.

Verify the action's actual supported inputs.

### 5.5.3 Workflow configuration

Review `.github/workflows/release.yml`.

Correct the workflow configuration, including any invalid inputs such as:

- `publish`
- `version`

Use the supported action interface and the appropriate scripts, such as `publish-script` and `version-script`, where applicable to the selected action version.

The implementation must be consistent with the installed Changesets CLI.

### 5.5.4 Publishing credentials

Configure npm publishing credentials through GitHub Actions secrets.

Requirements:

- No credentials in source control.
- No credentials in workflow output.
- No credentials in package files.
- Clear failure when credentials are unavailable.
- Appropriate permissions for the release workflow.

A failed publishing configuration must not be represented as a successful release.

### 5.5.5 Package metadata

Correct all repository metadata references.

The reviewed project contains references to:

`zharia/sage-one-typescript`

The actual repository is:

`zharia/sage-one-accounting-api`

Review and correct, where applicable:

- Repository URL.
- Homepage.
- Issues URL.
- Documentation links.
- Package metadata.
- README references.
- Workflow references.
- Release documentation.

### 5.5.6 Release verification

Demonstrate a controlled prerelease.

The prerelease must establish that:

- Changesets can identify pending changes.
- Versioning operates correctly.
- Package build succeeds.
- Package contents are correct.
- Package metadata is correct.
- The intended package can be published or the publishing process can be fully validated in an appropriate non-publication environment.

Do not publish an unintended stable release merely to test automation.

### 5.5.7 Package inspection

Verify the contents of the distributable package.

Check:

- Compiled JavaScript.
- TypeScript declarations.
- Export maps.
- Package entry points.
- Runtime dependencies.
- Peer dependencies, if applicable.
- Included documentation or licences.
- Exclusion of development-only files.
- Correct package name and version.

Where practical, install the packed artifact into a minimal external consumer project and verify that it can be imported and used.

### 5.5.8 Acceptance criteria

- [ ] Changesets CLI and GitHub Action are compatible.
- [ ] Workflow inputs are valid.
- [ ] npm publishing credentials are correctly configured.
- [ ] Release workflow completes successfully.
- [ ] Controlled prerelease is demonstrated.
- [ ] Package metadata references the correct repository.
- [ ] Packed package contents are verified.
- [ ] External consumer installation test succeeds.
- [ ] No accidental stable publication occurs.

**Deliverable:** Corrected release workflow, validated package artifact and prerelease evidence.

---

## WP008.6 — Documentation, Governance and Toolchain Reconciliation

**Priority:** High  
**Classification:** P2  
**Primary areas:** `docs/`, project root, milestone records

### 5.6.1 Documentation reconciliation

Review the project's documentation for inconsistencies between implementation and recorded status.

In particular, reconcile:

`docs/api/known-limitations.md`

The current document contains stale M005/M006 pending language, including references to earlier operation counts, despite M006 being marked complete.

Review all affected documentation.

Documentation must distinguish:

- Planned functionality.
- Implemented functionality.
- Generated functionality.
- Tested functionality.
- Live-verified functionality.
- Known limitations.

### 5.6.2 API coverage reconciliation

Update the operation and resource coverage records using the actual current repository state.

The operation catalogue, generated modules and coverage matrix must agree.

Where discrepancies remain, record them explicitly.

Do not silently adjust figures to make coverage appear more complete.

### 5.6.3 Vite+ decision

The original project direction requested evaluation or adoption of Vite+.

The current project uses Vitest and TypeScript tooling, with a recorded decision to defer Vite+ evaluation.

M008 must resolve this outstanding decision.

The project must:

1. Evaluate whether Vite+ provides a material advantage for this SDK.
2. Consider compatibility with the existing Nix and pnpm toolchain.
3. Consider build reproducibility.
4. Consider CI integration.
5. Consider test-runner compatibility.
6. Consider migration cost and maintenance implications.

The decision must be recorded in an ADR.

Possible outcomes:

- Adopt Vite+ where it provides a demonstrated benefit.
- Retain the existing toolchain and document why.
- Defer adoption with an explicit rationale and review condition.

**Vitest and Vite+ are not interchangeable names.** Existing use of Vitest does not, by itself, satisfy the original Vite+ evaluation requirement.

### 5.6.4 End-to-end testing

The current `tests/e2e/` directory contains no substantive end-to-end suite.

M008 must determine and implement the appropriate end-to-end verification strategy.

At minimum, provide an automated consumer-level test that:

- Imports the SDK as a package.
- Configures authentication or a controlled mock equivalent.
- Invokes a representative domain service.
- Exercises the transport layer.
- Validates the returned model.
- Demonstrates correct error propagation.

The test must operate against the packed package where practical, rather than relying exclusively on internal source imports.

This test is distinct from the live Sage API test suite.

### 5.6.5 TypeDoc and developer documentation

Review the existing TypeDoc status.

Determine whether generated API reference documentation should be enabled as part of M008 or explicitly deferred.

If implemented:

- Generate documentation from the public SDK API.
- Ensure public exports are documented.
- Verify internal implementation details are not unnecessarily exposed.
- Include documentation generation in CI where appropriate.

If deferred, record the reason and a future acceptance condition.

### 5.6.6 Repository governance

Review:

- Agent instructions.
- Contribution guidelines.
- ADR records.
- Milestone definitions.
- Technical-debt records.
- Release procedures.
- Test execution instructions.

Ensure that AI agents and human contributors have consistent instructions.

The project should make it easy to determine:

- What is authoritative.
- What is generated.
- What may be modified.
- How to verify changes.
- How to document architectural decisions.
- How to report incomplete work.

### 5.6.7 Acceptance criteria

- [ ] Stale documentation is corrected.
- [ ] API coverage figures are reconciled.
- [ ] Known limitations reflect actual implementation.
- [ ] Vite+ decision is documented in an ADR.
- [ ] End-to-end consumer verification exists.
- [ ] TypeDoc decision is documented.
- [ ] Repository metadata is consistent.
- [ ] Agent and contributor instructions are current.
- [ ] Technical-debt records are reconciled.

**Deliverable:** Reconciled documentation, updated governance records, toolchain ADR and consumer-level end-to-end tests.

---

# 6. Milestone Execution Plan

M008 should be executed as a sequence of six sprints.

The ordering is deliberate: correct the underlying generated contracts first, then strengthen execution behaviour, establish verification integrity, prove live compatibility, repair publication and finally reconcile the project's records.

| Sprint | Work package | Principal outcome |
|---|---|---|
| S008.1 | WP008.1 | Correct contract generation and strongly typed models |
| S008.2 | WP008.2 | Central request scheduler and robust rate-limit handling |
| S008.3 | WP008.3 | Auditable test and contract-verification framework |
| S008.4 | WP008.4 | Live Sage API verification |
| S008.5 | WP008.5 | Reliable release and package pipeline |
| S008.6 | WP008.6 | Documentation, governance and tooling reconciliation |

Sprints may overlap where dependencies permit, but acceptance dependencies must not be bypassed.

For example, live schema verification should use the corrected generated models rather than treating known generator defects as acceptable.

## 6.1 Sprint deliverables

Every sprint must produce:

1. Implementation changes.
2. Automated tests.
3. Updated documentation.
4. Updated milestone status.
5. Updated technical-debt records, where applicable.
6. Verification evidence.
7. A clear list of outstanding issues.

A sprint is not complete merely because its implementation tasks have been marked as done.

---

# 7. Cross-Cutting Quality Requirements

## 7.1 Build and environment reproducibility

The project must build consistently using its declared toolchain.

Verify:

- Nix flake evaluation.
- Development environment setup.
- Dependency installation.
- TypeScript compilation.
- Test execution.
- Package build.
- Package inspection.

The declared Node.js baseline and supported CI versions must be consistent.

Any difference between the development environment and CI must be documented.

## 7.2 TypeScript quality

Maintain strict TypeScript settings.

Avoid:

- Unnecessary `any`.
- Unnecessary `unknown` in known resource models.
- Broad unions used to conceal incomplete source metadata.
- Unsafe casts without justification.
- Suppression directives without documented reasons.

The goal is not to eliminate every use of `unknown`, but to ensure that uncertainty is represented deliberately rather than propagated through the SDK.

## 7.3 Financial correctness

Accounting operations require particular care.

The following invariants must be preserved:

- No binary floating-point arithmetic for internal financial calculations where exact decimal handling is required.
- Explicit conversion between JSON wire values and internal fixed-decimal values.
- No silent rounding.
- Explicit rounding rules where rounding is necessary.
- Tests for decimal precision and scale.
- Tests for tax and invoice-total reconciliation.
- No automatic duplicate financial mutations.

## 7.4 Security

Verify:

- API credentials are never committed.
- Logs redact authentication data.
- Test fixtures contain no sensitive information.
- Live tests use isolated credentials and company context.
- GitHub Actions use appropriate permissions.
- Publishing credentials are restricted to the required workflow.
- Dependency and security workflows continue to pass.

## 7.5 Performance

The scheduler must not introduce unnecessary latency or excessive memory consumption.

Verify:

- Queue growth is controlled.
- Concurrency is bounded.
- Cancellation releases resources.
- Scheduler state does not leak between companies.
- Logging does not introduce significant overhead.
- Retry delays do not block unrelated work.

Performance testing should focus on measurable behaviour rather than arbitrary benchmarks without operational relevance.

---

# 8. CI/CD Verification Requirements

The following checks must pass before M008 can be accepted.

| Check | Required result |
|---|---|
| Nix flake validation | Pass |
| Dependency installation | Pass |
| TypeScript compilation | Pass |
| Lint and static analysis | Pass |
| Unit tests | Pass |
| Generator regression tests | Pass |
| Schema and contract tests | Pass |
| Transport and scheduler tests | Pass |
| Consumer-level end-to-end tests | Pass |
| Security checks | Pass |
| Documentation build/check | Pass |
| Package build | Pass |
| Package inspection | Pass |
| Release workflow | Pass |
| Live Sage integration | Successful recorded verification |

The live Sage integration stage may be excluded from ordinary pull-request CI because it requires credentials and a dedicated test company.

It must nevertheless be run explicitly as part of M008 acceptance.

No failed mandatory check may be dismissed without a documented, approved exception.

---

# 9. Repository Structure and Records

M008 work should use the repository's existing organisational conventions.

Do not introduce parallel structures where equivalent directories already exist.

Where the current structure does not provide a suitable location, use the following suggested organisation:

```text
milestones/
  M008/
    101_definition.md
    102_status.yaml
    103_acceptance.md
    sprints/
      S008.1/
      S008.2/
      S008.3/
      S008.4/
      S008.5/
      S008.6/

docs/
  architecture/
    adr/
  testing/
    verification-strategy.md
    live-api-testing.md
    contract-verification.md
  api/
    known-limitations.md
    coverage-matrix.md

tests/
  unit/
  contracts/
  integration/
  e2e/
  live/

technical-debt/
  TD-008/
```

This is a suggested logical organisation, not a mandate to duplicate existing records.

The milestone must have:

- A definition document.
- A machine-readable status record.
- An acceptance record.
- Individual sprint records.
- A technical-debt register.
- Evidence links or references.

## 9.1 Status management

The milestone status must distinguish:

- `not_started`
- `in_progress`
- `blocked`
- `verification`
- `completed`

A work package must not be marked completed until its acceptance criteria have been demonstrated.

A task's implementation status and verification status must be tracked separately.

---

# 10. Technical Debt Management

M008 must identify, classify and record technical debt discovered during implementation.

Each item must include:

- Unique identifier.
- Description.
- Severity.
- Affected subsystem.
- Business or technical impact.
- Reproduction or evidence.
- Proposed resolution.
- Dependencies.
- Acceptance criteria.
- Target milestone.

Priority classification:

| Priority | Meaning |
|---|---|
| P0 | Critical security, data integrity or financial correctness defect |
| P1 | Production-readiness defect |
| P2 | Significant maintainability, reliability or operational concern |
| P3 | Improvement with limited immediate impact |

No P0 or P1 item affecting SDK correctness, security, accounting integrity or release reliability may be silently deferred.

Any exception requires explicit approval and a documented risk assessment.

---

# 11. Agent Operating Instructions

All AI agents and human contributors operating within M008 must observe the following instructions.

## 11.1 Existing implementation is authoritative

Before modifying a subsystem:

1. Inspect its existing implementation.
2. Inspect relevant tests.
3. Inspect associated ADRs.
4. Inspect documentation.
5. Identify the actual defect.
6. Establish a reproducible test where practical.
7. Propose the smallest defensible correction.

Do not begin with an architectural rewrite.

## 11.2 Fix root causes

Where generated output is incorrect, fix the generator.

Where transport behaviour is incorrect, fix the central transport abstraction.

Where documentation is stale, reconcile the authoritative records.

Do not patch symptoms in multiple places.

## 11.3 Preserve public API compatibility

Avoid unnecessary breaking changes.

Where a correction necessarily changes public types or behaviour:

- Identify the affected exports.
- Explain the reason.
- Add regression tests.
- Document the compatibility impact.
- Record the required versioning implications.

## 11.4 Evidence-based completion

Agents must not claim that functionality is verified unless the corresponding verification has actually been executed.

Every completion report must identify:

- What changed.
- Why it changed.
- Which tests were executed.
- Which tests passed.
- Which tests failed.
- Which tests were not executed.
- Any remaining limitations.

Do not invent test output, live API responses or successful release results.

## 11.5 Generated source discipline

Generated files must be changed through their generator.

Manual changes to generated files are prohibited unless the generator itself is incapable of representing a documented exception and an ADR explicitly authorises the deviation.

## 11.6 No silent scope expansion

New features outside M008 must be recorded as proposed work or technical debt.

M008 is an assurance milestone, not an invitation to expand the SDK indefinitely.

---

# 12. Milestone Acceptance Criteria

M008 is complete only when all mandatory acceptance criteria below have been satisfied.

## 12.1 Contract correctness

- [x] Generator preserves source type semantics.
- [x] Required and optional properties are correct.
- [x] Nullability is correct.
- [x] Nested model types are generated correctly.
- [x] Collections are strongly typed.
- [x] Decimal wire representations are verified.
- [x] Generator regression tests pass.
- [x] Generated output is deterministic.
- [x] All affected domain modules are regenerated.

## 12.2 Operational resilience

- [x] Central request scheduler implemented.
- [x] Per-company request coordination verified.
- [x] Concurrency controls verified.
- [x] `Retry-After` handling verified.
- [x] Exponential backoff verified.
- [x] Cancellation verified.
- [x] Mutation retry safety verified.
- [x] Scheduler logging and observability verified.

## 12.3 Verification integrity

- [x] Verification levels documented (`docs/architecture/verification-levels.md`, ADR-013 amendment).
- [x] Fixture provenance recorded (`contracts/fixtures/PROVENANCE.md` + `tests/unit/fixture-provenance.test.ts`).
- [x] Contract coverage reconciled (`tests/unit/coverage-reconciliation.test.ts` revalidates 162/622 and 552/56/8/6 against catalogue, fixtures and matrix).
- [x] Mock and live tests distinguished (separate `vitest.live.config.ts`, `pnpm test:live`, manual `live-tests.yml`; default run cannot reach live API).
- [x] Test reporting accurately represents verification status (per-operation status table in `docs/api/coverage-matrix.md`: implemented 622 vs live-verified 0).

## 12.4 Live Sage compatibility

- [ ] Live authentication verified.
- [ ] Company context verified.
- [ ] Representative read operations verified.
- [ ] Customer lifecycle verified.
- [ ] Invoice lifecycle verified.
- [ ] Financial values reconciled.
- [ ] Pagination and OData verified.
- [ ] Error handling verified where safely testable.
- [ ] Live verification report recorded.

## 12.5 Release integrity

- [ ] Changesets workflow repaired.
- [ ] Publishing credentials configured.
- [ ] Package metadata corrected.
- [ ] Package artifact inspected.
- [ ] Consumer installation test passed.
- [ ] Controlled prerelease completed successfully.

## 12.6 Documentation and governance

- [ ] Stale documentation corrected.
- [ ] API coverage reconciled.
- [ ] Vite+ decision recorded.
- [ ] End-to-end tests implemented.
- [ ] TypeDoc decision recorded.
- [ ] Agent instructions reconciled.
- [ ] Technical debt updated.
- [ ] Milestone records complete.

## 12.7 Overall quality gates

- [ ] All mandatory CI checks pass.
- [ ] No unresolved P0 defects.
- [ ] No unresolved P1 defects affecting production readiness.
- [ ] All exceptions are documented and approved.
- [ ] M008 final report completed.
- [ ] M007 readiness recommendation issued.

---

# 13. M008 Exit Conditions

M008 must produce a formal exit report.

The report must include:

1. Executive summary.
2. Work packages completed.
3. Work packages not completed.
4. Generator correctness findings.
5. Scheduler and rate-limit verification results.
6. Contract and fixture verification results.
7. Live Sage integration results.
8. Financial correctness findings.
9. Release pipeline verification results.
10. CI/CD results.
11. Outstanding technical debt.
12. Known limitations.
13. Accepted risks and exceptions.
14. Recommendation concerning M007.

The final recommendation must be one of:

| Recommendation | Meaning |
|---|---|
| `READY` | All mandatory requirements satisfied; M007 may proceed |
| `READY_WITH_CONDITIONS` | Remaining issues are explicitly documented, non-critical and approved |
| `NOT_READY` | One or more mandatory production-readiness requirements remain unmet |

`READY_WITH_CONDITIONS` must not be used to bypass a defect involving financial integrity, security, credential protection or the possibility of duplicate accounting transactions.

---

# 14. Relationship to M007 — Production Release

M007 remains the production-release milestone.

M008 is an assurance prerequisite to M007.

M007 must not be marked complete merely because a package can be built or published.

The production-release milestone must consider the M008 exit report and its recommendation.

The intended progression is:

```text
M006 — API Coverage and SDK Implementation
        |
        v
M008 — Quality and Production Assurance
        |
        |  READY / approved conditional acceptance
        v
M007 — Production Release
        |
        v
Production SDK
```

M008 does not itself authorise a general availability release.

It establishes the evidence required to make that decision responsibly.

---

# 15. Definition of Success

M008 succeeds when the project can demonstrate, rather than merely assert, the following:

1. The generated SDK models accurately represent the Sage API contracts.
2. Known API fields are strongly and correctly typed.
3. Accounting values are handled with appropriate numerical precision.
4. Requests are centrally coordinated and rate limits are respected.
5. Transient failures do not produce unsafe duplicate financial mutations.
6. The SDK has been tested against the actual Sage One Accounting South Africa API.
7. Representative accounting workflows work end to end.
8. The release pipeline produces a valid, inspectable package.
9. Documentation and coverage records accurately reflect the implementation.
10. Another developer can reproduce the build, execute the tests and understand the verification evidence.

The governing principle is simple:

**Implementation is not verification. Documentation is not compatibility. A passing mock is not a live integration. A successful build is not a production release.**

M008 converts the project's existing implementation into a demonstrably dependable SDK, with correctness and operational integrity established through reproducible evidence.

---

**End of M008 Specification**

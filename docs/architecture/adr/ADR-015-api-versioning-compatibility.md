# ADR-015: API versioning and compatibility

- **Status:** accepted
- **Date:** 2026-11-21

## Context

The SDK targets Sage API `2.0.0` (spec §2.3). Sage may add fields, enum values or endpoints; SDK consumers depend on the public TypeScript surface.

## Problem

Define versioning for both axes (Sage API contract vs SDK package) and a compatibility policy for change.

## Options considered

1. Independent versioning: SDK semver for its own surface; API version pinned and recorded in contract metadata, configurable in internal contract metadata.
2. Lock SDK version to API version (e.g. SDK 2.0.x ↔ API 2.0.0).
3. Support multiple Sage API versions simultaneously.

## Decision

Option 1:

- Package follows semver; `SAGE_API_VERSION` exported constant + contract metadata record the targeted API version.
- Additive Sage response fields are non-breaking (forward-compatible parsing preserves unknowns).
- New enum values are non-breaking (forward-compatible enum parsing).
- Renaming/removing/retyping public SDK types or methods is breaking for the SDK even if Sage's API is unchanged (spec §23.4).
- Multi-API-version support: not before 1.0; revisit on demand.

## Rationale

- Sage's API version and the SDK's release cadence are decoupled — coupling them misrepresents changes.
- Spec §2.3 requires API version configurable in contract metadata.
- Forward-compatible parsing (ADR-004/005) makes Sage-side additions non-breaking by design.

## Consequences

- Breaking-change review checklist in PR template; Changesets major bumps enforce intent.
- Coverage matrix and `contract-sources.md` record API version + discovery date per snapshot.
- If Sage releases `2.1.0`, M00x discovery task re-snapshots the catalogue and diffs (scripted comparison per spec §6.2).

## Rejected alternatives

- Locked versions: meaningless when SDK ships fixes unrelated to API changes.
- Multi-version support: doubles contract/test surface pre-stabilization; premature.

## References

Spec §2.3, §6.2, §23.4; `docs/api/contract-sources.md`.

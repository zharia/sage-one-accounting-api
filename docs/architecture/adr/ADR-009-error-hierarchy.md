# ADR-009: Error hierarchy

- **Status:** accepted
- **Date:** 2026-11-21

## Context

Consumers must distinguish configuration, validation, auth, network, timeout and Sage-side failures, with enough context to act (spec §15).

## Problem

Design an error hierarchy that is exhaustive for mapping, non-lossy (original response preserved) and secret-free.

## Options considered

1. Single `SageError` with a `code` discriminator.
2. Class hierarchy (`SageError` base + subclasses per failure class).
3. Result objects (`{ ok, error }`) instead of thrown errors.

## Decision

Option 2, with a structured `code` on every error. Base `SageError` carries: code, resource, operation, HTTP status where applicable, request correlation ID, retryability hint, Sage error details (when present), original `cause`. Mapping from transport is deterministic; original Sage response preserved on `SageApiError`.

## Rationale

- `instanceof` checks read naturally at call sites (`catch (e) { if (e instanceof SageTimeoutError) … }`).
- Spec §15 names the exact hierarchy.
- SDK-side validation failures (`SageValidationError`) stay distinguishable from Sage rejections (`SageApiError`).
- Thrown errors match the async/await style of the entire API surface; Result objects would force dual ergonomics.

## Consequences

- Every new failure mode maps to an existing subclass or requires an ADR.
- Type tests must guarantee the hierarchy is exported from the entry point.
- Error messages and serialization paths are secret-free by construction (tested).

## Rejected alternatives

- Single class + codes: easy to forget to check codes; weaker autocompletion.
- Result objects: idiomatic for some ecosystems but inconsistent with SDK style; complicates composition.

## References

Spec §15, §25; `docs/architecture/error-handling.md`.

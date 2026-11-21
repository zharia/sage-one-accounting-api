# ADR-011: Pagination strategy

- **Status:** accepted
- **Date:** 2026-11-21

## Context

Sage collection responses use an envelope `{ TotalResults, ReturnedResults, Results }`, but "not all Sage endpoints use the same pagination mechanism" (spec §11.2).

## Problem

Offer ergonomic iteration without assuming uniform paging or risking infinite loops.

## Options considered

1. `SagePage<T>` envelope type + single-page fetch + async iterator with limits, per-endpoint paging metadata.
2. Always-on auto-pagination hidden behind `list()`.
3. Cursor/offset helpers only, no iterator.
4. Uniform pager forced onto every endpoint.

## Decision

Option 1. The wire envelope is typed exactly. `list()` returns a page by default (API fidelity). Opt-in `iterate()`/`pages()` async iterables fetch subsequent pages with configurable `maxPages`/`maxItems`, `AbortSignal` support, and page metadata access. Each endpoint's actual paging behaviour is confirmed in M002; endpoints with different mechanisms get their own documented iterator or none.

## Rationale

- Default page return never hides a second HTTP round-trip from the caller.
- Async iterables compose with `for await` and backpressure naturally.
- Hard limits + abort prevent runaway pagination (spec §11.2 requires infinite-pagination protection).
- Per-endpoint honesty beats uniform-but-wrong convenience.

## Consequences

- Progression logic (page N → N+1 construction) property-tested with fast-check.
- Coverage matrix records paging behaviour per endpoint.
- Some endpoints may ship single-page-only until discovery proves otherwise.

## Rejected alternatives

- Hidden auto-pagination: violates "explicit behaviour before implicit" and complicates cost control.
- No iterators: pushes boilerplate to every consumer.
- One pager for all: contradicts spec §11.2's warning about heterogeneous mechanisms.

## References

Spec §11.2; `docs/api/pagination.md`.

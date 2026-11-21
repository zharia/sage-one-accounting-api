# ADR-010: OData query builder

- **Status:** accepted
- **Date:** 2026-11-21

## Context

Sage collection endpoints document OData query support (`$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$expand`, `$count`) — but per-endpoint compatibility is unverified (spec §11.1).

## Problem

Provide typed, correctly encoded OData construction with a raw escape hatch, without claiming universal support that discovery hasn't confirmed.

## Options considered

1. Typed fluent builder with field references + raw expression escape hatch.
2. Pass-through object of query params (`{ $filter: "…" }`).
3. Full OData client library dependency.
4. String-only helper (`odata\`$filter=...\``).

## Decision

Option 1. A builder (`odata<Customer>().filter("Active", "eq", true).orderBy("Name", "asc").top(50).build()`) producing URL-encoded query strings, plus an explicit raw-expression method for anything the builder can't express. Per-endpoint support claims are recorded in the coverage matrix during M002 — the builder's existence does not imply an endpoint supports every option.

## Rationale

- Typed field references catch typos before runtime (spec: "typed field references where practical").
- Correct URL encoding centralized in one place (property-tested with fast-check, spec §17.5).
- Raw escape hatch prevents the builder from becoming a ceiling.
- Avoids an OData dependency whose version may not match Sage's dialect.

## Consequences

- Builder surface grows as discovery confirms features; unsupported options documented per endpoint.
- Encoding round-trip property tests mandatory.
- `$expand`/`$count` may prove unsupported on some endpoints — claims gated by M002 evidence.

## Rejected alternatives

- Pass-through objects: no typing, encoding bugs move to call sites.
- Full OData library: overkill, likely dialect/version mismatch, extra dependency.
- Strings only: error-prone, untestable structure.

## References

Spec §11.1, §17.5; `docs/api/odata.md`.

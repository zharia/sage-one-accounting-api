# ADR-005: Runtime validation using Zod

- **Status:** accepted
- **Date:** 2026-11-21

## Context

System boundaries (config, requests, responses, derived objects) need runtime validation, with TypeScript types kept in sync automatically (spec §8).

## Problem

Choose a validation framework and define schema placement, strictness and error reporting policy.

## Options considered

1. Zod (schema-first, `z.infer` types).
2. JSON Schema + Ajv (spec-adjacent, codegen from schema).
3. Valibot / ArkType (smaller / faster alternatives).
4. Hand-written type guards (no schema library).

## Decision

Option 1: Zod as the single runtime validation framework. Schemas colocated with resources (or a clearly defined contract directory). Types derive exclusively via `z.infer`. Responses parse non-strictly to preserve unknown fields; requests parse strictly. Validation errors carry resource, operation, field path, expectation — never secrets.

## Rationale

- Spec §8 names Zod; it satisfies the "one definition per structure" rule directly.
- Good TypeScript inference reduces maintenance across ~100 services.
- Non-strict response parsing gives forward compatibility when Sage adds fields (spec §8).
- JSON Schema would double as contract artefacts but forces a second representation for TS types.

## Consequences

- Zod becomes a runtime `dependency` (bundle/import cost accepted for a Node library).
- Schema inventory tracked per endpoint in the coverage matrix (dimension: Runtime schemas).
- Performance cost of response validation must be measured; toggles exist (`config.validation`).

## Rejected alternatives

- Ajv/JSON Schema: two sources of truth for types unless codegen added; more tooling.
- Valibot/ArkType: viable, but spec names Zod and ecosystem/maturity matters more than byte size for a server SDK.
- Hand-written guards: drifts from types; violates "no two independent definitions".

## References

Spec §8, §4.5; `docs/architecture/runtime-validation.md`.

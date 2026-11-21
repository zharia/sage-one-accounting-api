# ADR-007: Authentication architecture

- **Status:** provisional — mechanism unverified; discovery due in M002
- **Date:** 2026-11-21

## Context

The published `Login/Validate` endpoint (username/password → boolean) does not reveal how subsequent requests authenticate (spec §9). Sage may use headers, tokens, cookies, session IDs, or an application signing scheme.

## Problem

Design an authentication layer that can absorb the verified mechanism without reshaping the transport or public API, while forbidding invented behaviour.

## Options considered

1. Username/password sent on every request (HTTP Basic or similar).
2. Login → token/session, cached with renewal.
3. Cookie session managed by the HTTP client.
4. Custom signing scheme (if Sage documents one).
5. Pluggable `SageAuthenticator` interface with the concrete mechanism as the first implementation.

## Decision

Option 5: fix the **interface** now, defer the **mechanism**. `SageAuthenticator` exposes `authenticate(context)` and `apply(request)`; transport delegates all credential application to it. Requirements: no hard-coded/logged credentials, no secrets in errors, single-flight concurrency safety, renewal support if needed, application-supplied configuration (no implicit env reads), custom implementations injectable. Never invent OAuth (spec §9).

## Rationale

- Transport, client and error mapping can be built and tested (M003) before the mechanism is known, using a fake authenticator.
- All open questions stay concentrated in `docs/architecture/authentication.md`.
- Spec mandates a dedicated interface (§9) and forbids fabricating behaviour (§6.1, §28).

## Consequences

- M002 must answer: header/token/session format, lifetime, renewal, company context conveyance, required application headers, whether Login mutates server state.
- On completion: update `docs/architecture/authentication.md`, flip this ADR to `accepted`, implement the verified authenticator, add live auth verification.
- Until then, no claim of "working authentication" anywhere in docs or code.

## Rejected alternatives

- Picking Basic/token now: risks building the wrong cache/renewal model and implies unverified claims.
- Per-request credential injection by consumers: pushes security-sensitive logic into application code, invites logging mistakes.

## References

Spec §9; `docs/architecture/authentication.md`.

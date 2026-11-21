# GEMINI.md

**Authoritative instructions live in [`AGENTS.md`](./AGENTS.md) — read it first and follow it.**

This file exists only as an entry point for Gemini sessions; it intentionally does not restate project policy.

Quick start:

```bash
nix develop
pnpm install
pnpm verify
```

Key constraints (full list in AGENTS.md): never invent Sage API behaviour; preserve wire-format fidelity; no retries of financial mutations; no secrets in logs/errors; pnpm only; strict TypeScript; tests + docs ship with every change.

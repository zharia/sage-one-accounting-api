# @bytemoney/sage-one

Strongly typed TypeScript SDK for the **Sage One Accounting API** (South Africa, API `2.0.0`).

> **Status: pre-alpha (M001 — project foundation).** The API contract discovery (M002) and core SDK (M003) have not landed yet. Do not use in production.

- **Documentation source:** https://accounting.sageone.co.za/api/2.0.0/help
- **Repository:** https://github.com/zharia/sage-one-typescript
- **Specification:** [`__init_spec_01.md`](./__init_spec_01.md) (project authority, v0.1.0)

## Why

Integrating Sage One means hand-rolling HTTP requests, untyped JSON, authentication and pagination. This SDK provides:

- Strongly typed API resources and domain-specific accounting types
- Runtime validation of requests and responses (Zod)
- Authentication and session management behind a dedicated interface
- Configurable HTTP transport (native Fetch) with conservative retry policy
- Typed OData query construction and pagination support
- Structured logging with secret redaction
- Consistent error hierarchy
- File attachment and batch operation support

## Requirements

- Node.js `>= 24` (LTS)
- pnpm (pinned via `packageManager`; the Nix shell provides it)

## Development

```bash
nix develop          # reproducible shell: Node 24 LTS + pinned pnpm
pnpm install         # frozen lockfile in CI: pnpm install --frozen-lockfile
pnpm verify          # format + lint + typecheck + tests + build + package check
```

Common commands:

| Command | Purpose |
|---|---|
| `pnpm build` | Compile to `dist/` (ESM + `.d.ts` + source maps) |
| `pnpm test` | Unit, integration and contract tests |
| `pnpm typecheck` | Strict TypeScript check |
| `pnpm lint` / `pnpm format` | ESLint / Prettier |
| `pnpm verify` | Full verification suite (§17.7 of the specification) |

See [`docs/development/`](./docs/development/environment-setup.md) for details.

## Usage (planned shape)

```typescript
import { SageOneClient } from "@bytemoney/sage-one";

const sage = new SageOneClient({
  credentials: { username: process.env.SAGE_USERNAME!, password: process.env.SAGE_PASSWORD! },
  companyId: 12345,
});

const accounts = await sage.accounts.list();
```

The interface above is illustrative; final signatures follow the discovered Sage API contract (M002).

## Project layout

| Path | Purpose |
|---|---|
| `src/` | SDK source (client, transport, auth, domains, …) |
| `contracts/` | Raw Sage API contract snapshots and endpoint catalogue — never generated code |
| `tests/` | Unit, integration, contract, type, property and opt-in live tests |
| `docs/` | Architecture, API, integration and agent documentation |
| `milestones/` | Roadmap, milestone and sprint specifications |
| `scripts/` | API discovery, contract validation, release and verification tooling |
| `scripts/verification/verify.sh` | Single comprehensive verification command |

## Documentation

- [Architecture overview](./docs/architecture/overview.md)
- [API coverage matrix](./docs/api/coverage-matrix.md)
- [Agent instructions](./AGENTS.md)
- [Milestone roadmap](./milestones/roadmap.md)
- [Architectural decisions](./docs/decisions/decision-index.md)

## License

Apache-2.0 — see [LICENSE](./LICENSE) and [NOTICE](./NOTICE). Sage branding and third-party dependency terms are subject to final review.

## Security

Report vulnerabilities per [SECURITY.md](./SECURITY.md). Never commit credentials or live API secrets.

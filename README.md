# @bytemoney/sage-one

Strongly typed TypeScript SDK for the **Sage One Accounting API** (South Africa, API `2.0.0`).

> **Status: beta (M001–M006 complete — 100% endpoint coverage).** Project foundation (M001), full 622-endpoint API contract discovery (M002), core SDK infrastructure (M003), foundational accounting domains (M004), commercial transactions (M005), and banking/reporting/advanced domains (M006) are implemented and verified across all **162 services and 622 operations**. Production release readiness (M007) is next.

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
| `pnpm discover:models` | Fetch model/enum help pages missing from `resource-models.json` (resumable; WP008.1) |
| `pnpm generate:domains` | Regenerate domain modules and client from the endpoint catalogue |

See [`docs/development/`](./docs/development/environment-setup.md) for details.

## Usage

```typescript
import { type Account, odata, SageOneClient } from "@bytemoney/sage-one";

const sage = new SageOneClient({
  credentials: {
    username: process.env.SAGE_USERNAME!,
    password: process.env.SAGE_PASSWORD!,
  },
  apiKey: process.env.SAGE_API_KEY!,
  companyId: 12345,
});

const accounts = await sage.accounts.list({
  odata: odata<Account>().filter("Active", "eq", true).orderBy("Name", "asc").top(50),
});
```

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

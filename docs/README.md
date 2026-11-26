# Documentation index

Documentation is a deliverable (spec §19). Structure:

| Section | Contents |
|---|---|
| [guide/](./guide/README.md) | **Start here:** what the SDK is, where it came from, who it is for, how it works, why use it |
| [architecture/](./architecture/overview.md) | Layer model, boundaries, auth, transport, errors, logging, config, domain model, validation, ADRs |
| [api/](./api/README.md) | Endpoint catalogue, coverage matrix, contract sources, auth/pagination/OData/attachment notes, known limitations |
| [development/](./development/environment-setup.md) | Environment, Nix, toolchain, build, testing, debugging, releasing, troubleshooting |
| [integration/](./integration/quick-start.md) | Consumer guides: setup, auth, workflows, errors, production |
| [reference/](./reference/types.md) | Generated/hand-maintained API reference (TypeDoc wiring lands M003) |
| [agents/](./agents/implementation-guide.md) | Instructions for AI agents extending the SDK |
| [decisions/](./decisions/decision-index.md) | ADR index |

## Conventions

- Every implemented service/operation gets documented request models, response models, query parameters, auth, pagination and limitations (spec §19.3).
- Examples in `docs/integration/` and `examples/` must compile against the actual public SDK.
- Docs update in the same change as the code they describe.

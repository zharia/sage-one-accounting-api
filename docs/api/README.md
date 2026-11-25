# API documentation

Everything about the Sage One Accounting API surface as consumed by this SDK.

| Document | Contents |
|---|---|
| [coverage-matrix.md](./coverage-matrix.md) | Per-endpoint progress across 8 dimensions (spec §24) |
| [endpoint-inventory.md](./endpoint-inventory.md) | Catalogued services and operations |
| [contract-sources.md](./contract-sources.md) | Where contract data comes from, discovery dates |
| [authentication.md](./authentication.md) | Verified authentication behaviour (pending M002) |
| [pagination.md](./pagination.md) | Paging envelopes and iterator support per endpoint |
| [odata.md](./odata.md) | OData options and per-endpoint compatibility |
| [attachments.md](./attachments.md) | File upload/download operations |
| [known-limitations.md](./known-limitations.md) | Undocumented endpoints, experimental behaviour, gaps |

## Target

- API version: `2.0.0`
- Documentation source: https://accounting.sageone.co.za/api/2.0.0/help
- Stable-release target: 100% coverage of the discoverable documented endpoint inventory (spec §24).

**Current state: M002 API discovery complete** — 162 services / 622 operations
catalogued (2026-11-21), all implemented (M003–M006), with per-operation
verification status in the [coverage matrix](./coverage-matrix.md).

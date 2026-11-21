# Attachments and file handling

Sage exposes document attachment endpoints (spec §16). Implementation lands with M005/M006 once the endpoints are catalogued.

## Planned capabilities

- Multipart upload (native `FormData` / `Blob` / Node file abstractions)
- File metadata retrieval
- Download with binary response handling (`arrayBuffer()`/`Blob`, streaming where feasible)
- Deletion, including deletion batches where supported
- Storage information retrieval
- `AbortSignal` support on all transfer operations
- Avoid loading unnecessarily large files into memory

## Rules

- Document which operations require a parent resource identifier (e.g. invoice id).
- Attachments are not auto-retried on failure (upload retry = duplicate risk; follow transport retry policy).
- Response validation applies to metadata, not to binary bodies.

## Per-endpoint inventory

**Pending M002** — endpoint list, content types and size limits recorded here after discovery.

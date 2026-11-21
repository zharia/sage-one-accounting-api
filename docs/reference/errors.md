# Error reference

Canonical definitions: `src/errors/` (M003) · Design: `docs/architecture/error-handling.md` · ADR-009.

## Hierarchy

```text
SageError
├── SageConfigurationError
├── SageAuthenticationError
├── SageAuthorizationError
├── SageValidationError
├── SageApiError
├── SageNetworkError
├── SageTimeoutError
├── SageRateLimitError
├── SageNotFoundError
├── SageConflictError
└── SageResponseError
```

## Common fields (all errors)

| Field | Meaning |
|---|---|
| `code` | Stable machine-readable error code |
| `resource` / `operation` | Where the failure occurred |
| `requestId` | Correlation ID for logs and support |
| `retryable` | Hint only — never a licence to retry mutations |
| `cause` | Original underlying error (secret-free) |

`SageApiError` additionally preserves the **original Sage HTTP response** (status + body). `SageValidationError` reports resource, operation, field path, expected structure — never secrets.

## Per-error notes

Documentation per class lands with M003 implementation: trigger conditions, HTTP mapping, example handling, retry guidance.

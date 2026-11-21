# Error handling

Status: hierarchy design fixed (ADR-009); mapping lands in M003.

## Hierarchy

```text
SageError                        base: code, resource, operation, requestId, cause, retryable
├── SageConfigurationError       invalid/missing configuration (SDK-side)
├── SageAuthenticationError      credentials rejected / session invalid
├── SageAuthorizationError       authenticated but not permitted
├── SageValidationError           SDK-side validation failure (schema, query building)
├── SageApiError                 Sage returned an error response (status, body preserved)
├── SageNetworkError             connection failure before/after request
├── SageTimeoutError             timeout or explicit abort
├── SageRateLimitError           429 (retry-after when present)
├── SageNotFoundError            404
├── SageConflictError            409 / state conflict
└── SageResponseError            2xx but body unparseable or schema-mismatched
```

## Rules

1. **Preserve the original Sage response** on `SageApiError` — never discard status/body when converting.
2. **Distinguish SDK validation failure** (`SageValidationError`) from **Sage rejection** (`SageApiError`). Consumers must be able to tell which side failed.
3. Every error carries context: error code, HTTP status (where applicable), resource, operation, request correlation ID, retryability, original `cause`.
4. **No credentials or secrets** in messages, `cause` chains or serialized errors.
5. `useUnknownInCatchVariables` is on: catch blocks narrow explicitly; never rethrow raw `unknown` as `SageError` without inspection.
6. Retryability is a hint from the mapping layer, not a licence to retry mutations.

## Validation error contents

Resource, operation, failing field path, expected structure (schema description), received value only where safe to disclose. Secrets excluded by construction.

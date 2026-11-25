# Error handling (consumer guide)

Design: `docs/architecture/error-handling.md` · Hierarchy: ADR-009.

## The hierarchy (planned)

```typescript
import {
  SageError,
  SageApiError,
  SageTimeoutError,
  SageValidationError,
  // ...
} from "@bytemoney/sage-one";

try {
  await sage.invoices.create(payload);
} catch (error) {
  if (error instanceof SageTimeoutError) {
    // Ambiguous: Sage may or may not have processed it. Verify by query — do NOT blindly retry.
  } else if (error instanceof SageApiError) {
    // Sage rejected the request: inspect error.status and preserved response body
  } else if (error instanceof SageValidationError) {
    // SDK-side schema problem: usually a programming bug in the caller
  } else if (error instanceof SageError) {
    // configuration / auth / network / not-found / conflict / rate-limit / response
    console.error(error.code, error.requestId, error.cause);
  } else {
    throw error; // unknown — never swallow
  }
}
```

## What every error carries

`code` · HTTP status (where applicable) · `resource` · `operation` · `requestId` (correlation) · `retryable` hint · original Sage response (on `SageApiError`) · `cause`.

## Rules

- **SDK failure vs Sage rejection** are different classes — handle differently.
- **Never log `credentials`.** Error objects are secret-free by construction; keep them that way in your own handlers.
- `retryable` is a hint; it never makes a financial mutation safe to retry.
- Rate limits (`SageRateLimitError`) may carry `retryAfterSeconds` — the SDK's scheduler already honours it before any retry attempt; if you handle the error yourself, honour it manually.

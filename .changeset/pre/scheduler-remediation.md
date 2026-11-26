---
"@bytemoney/sage-one": minor
---

Central request scheduler hardening (M008 WP008.2R): Sage-guided 1 req/s
default pacing, distinct HTTP 429 lockout handling with configurable
fallback suspension, abortable backoff with documented error mapping,
login-throttle separation, verification-level documentation, and
release-pipeline recovery (Changesets CLI v3 + action v2 inputs).

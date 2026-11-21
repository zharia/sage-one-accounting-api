# Known limitations

Record every gap honestly (spec §6.1, §24). Nothing is removed from this file without evidence.

## SDK-level

| Limitation | Status | Notes |
|---|---|---|
| No implemented endpoints yet | by design | M001 foundation only; M002 discovery, M003 core SDK next |
| Authentication mechanism unknown | pending M002 | See `docs/api/authentication.md` |
| Vite+ toolchain not adopted | deliberate | Evaluated at M007 (ADR-014); discrete tools used meanwhile |
| Git hooks (Lefthook) absent | deferred | Tracked in `milestones/technical-debt.md` |
| Structural import-boundary linting absent | deferred | Boundaries documented; enforcement tooling is debt |

## API-level (Sage)

| Limitation | Status | Notes |
|---|---|---|
| _none recorded yet_ | — | Populated by M002 discovery: undocumented endpoints, partial models, experimental behaviour |

## Policy

- Undocumented endpoints are classified (full / partial / none / experimental) and implemented accordingly — never guessed.
- If an endpoint cannot be implemented due to incomplete documentation, it is explicitly classified here and in the coverage matrix with its limitation recorded (spec §24).
- Experimental verification results carry dates and sanitized samples.

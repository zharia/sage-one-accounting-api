# Agent integration guide

For agents helping **consumers** use the SDK (examples, support answers, migration help).

## Ground truth

- Only documented, implemented behaviour may be presented as working. Check `docs/api/coverage-matrix.md` first.
- Planned/illustrative APIs must be labelled as such (see `docs/integration/quick-start.md` status table).
- Never invent method names, parameters or response fields — that is the cardinal sin of this project.

## Safe answers include

- Correct import style: ESM, `.js`-free package imports, Node >= 24.
- Configuration from application-owned env/secrets (`.env.example` pattern), never SDK-side env reads.
- Error handling by class (`instanceof`), preserving Sage responses.
- Explicit no-retry guidance for financial mutations and timeout reconciliation.
- Decimal/`parseFloat` warnings (ADR-012).

## Never advise

- Retrying creates/payments/receipts/journals automatically.
- Committing credentials or `.env`.
- Disabling response validation without a measured reason.
- Assuming auth mechanism details (unverified — M002).
- Production accounting data in fixtures or issues.

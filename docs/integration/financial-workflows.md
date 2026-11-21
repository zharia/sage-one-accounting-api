# Financial workflows

> Planned surface. **Every operation here moves money or books entries — treat as high-consequence (spec §25).**

## Invoices (planned)

```typescript
const invoice = await sage.invoices.create({ /* Sage tax invoice payload */ });
```

## Receipts and payments (planned)

```typescript
await sage.customerReceipts.create({ /* … */ });
await sage.supplierPayments.create({ /* … */ });
```

## Journals (planned)

```typescript
await sage.journalEntries.create({ /* debit/credit lines must balance per Sage rules */ });
```

## Safety checklist for consumers

1. **No blind retries.** After a timeout, query for the record before re-creating — a timeout does not prove Sage failed to process the mutation.
2. **Idempotency is your responsibility** — the SDK does not fabricate idempotency keys Sage doesn't support.
3. **No silent rounding.** Use explicit decimal utilities; never `parseFloat` on amounts you need to be exact.
4. **Tax values are Sage's domain.** The SDK does not calculate or alter statutory tax.
5. **Errors preserve Sage responses** — surface them to your operators; don't swallow `SageApiError`.
6. **Least-privilege credentials** where Sage supports them; isolate test vs production companies.
7. **Audit logging** — rely on your application's logger with correlation IDs from SDK errors.

## Financial decimal handling

Amounts keep their wire representation (ADR-012, provisional). Arithmetic goes through documented conversion utilities — never ad-hoc float math.

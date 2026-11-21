# Common workflows

> Planned surface — signatures finalize after M002/M003. Illustrative only.

## List with OData query

```typescript
const active = await sage.customers.list({
  query: odata<Customer>().filter("Active", "eq", true).top(50),
});
```

## Pagination

```typescript
// Single page (default, explicit)
const page = await sage.customers.list({ skip: 0, top: 100 });
console.log(page.TotalResults, page.Results.length);

// Iterate (opt-in, bounded)
for await (const customer of sage.customers.iterate({ maxPages: 10 })) {
  // ...
}
```

## Create → read → update

```typescript
const created = await sage.customers.create({ /* wire-shaped input */ });
const fetched = await sage.customers.get({ id: created.Id });
await sage.customers.update({ id: fetched.Id, /* … */ });
```

## Attachments

```typescript
await sage.invoices.attachments.upload({ invoiceId, file: blob });
```

## Cancellation

```typescript
await sage.reports.trialBalance({ signal: AbortSignal.timeout(10_000) });
```

## Safety notes

- No automatic retries on creates/payments/receipts/journals (spec §10.1).
- Re-running a create after an ambiguous timeout can duplicate financial records — verify by ID before re-sending.
- All monetary values pass through unchanged; do arithmetic via explicit decimal utilities (ADR-012).

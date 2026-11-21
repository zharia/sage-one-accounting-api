# Financial workflows

> **Every operation here moves money or books accounting entries — treat as high-consequence (spec §25).**

## Tax Invoices, Quotes, and Orders (M005)

Use `calculate()` first to preview Sage's server-side line totals, discounts, and VAT calculation without persisting a document. Then call `save()` to commit the document:

```typescript
// 1. Non-mutating server-side preview
const preview = await sage.taxInvoices.calculate({
  CustomerId: 42,
  Date: "2026-11-21",
  Inclusive: false,
  Lines: [
    {
      SelectionId: 100,
      TaxTypeId: 1,
      Description: "Consulting Services",
      Quantity: 10,
      UnitPriceExclusive: 250.0,
    },
  ],
});

// 2. Persist tax invoice (never auto-retried; sage.invoices is an alias for sage.taxInvoices)
const savedInvoice = await sage.invoices.save(preview);

// 3. Email invoice or export PDF
await sage.taxInvoices.email({ Id: savedInvoice.ID, EmailAddress: "ap@customer.co.za" });
const pdfBuffer = await sage.taxInvoices.export(savedInvoice.ID!);
```

The same `calculate` → `save` → `email` / `export` workflow applies to:
- `sage.quotes` (`QuoteService`)
- `sage.salesOrders` (`SalesOrderService`)
- `sage.purchaseOrders` (`PurchaseOrderService`)
- `sage.supplierInvoices` (`SupplierInvoiceService`)
- `sage.customerReturns` (`CustomerReturnService`)
- `sage.supplierReturns` (`SupplierReturnService`)
- `sage.recurringInvoices` (`RecurringInvoiceService`)

## Receipts, Payments, and Allocations (M005)

```typescript
// Record a customer receipt
const receipt = await sage.customerReceipts.save({
  CustomerId: 42,
  BankAccountId: 1,
  Date: "2026-11-21",
  Reference: "EFT-2026-1050",
  Total: 2875.0,
  PaymentMethod: 2,
});

// Record a supplier payment (or batch via saveBatch)
await sage.supplierPayments.save({
  SupplierId: 19,
  BankAccountId: 1,
  Date: "2026-11-21",
  Reference: "SUP-PAY-88",
  Total: 1150.0,
});

// Allocate a receipt against an invoice
await sage.allocations.save({
  SourceDocumentId: receipt.ID,
  TargetDocumentId: savedInvoice.ID,
  Amount: 2875.0,
});
```

## Banking and General Ledger Journals (M006)

```typescript
// Save a bank transaction
await sage.bankTransactions.save({
  BankAccountId: 1,
  Date: "2026-11-21",
  Type: 1,
  SelectionId: 200,
  Description: "Bank Charges",
  Exclusive: 120.0,
  Tax: 18.0,
  Total: 138.0,
});

// Save a journal entry (or batch via saveBatch)
await sage.journalEntries.save({
  Date: "2026-11-21",
  Reference: "JNL-11-01",
  Description: "Month-end accrual",
  Effect: 1,
  AccountId: 100,
  ContraAccountId: 200,
  Exclusive: 5000.0,
  Tax: 0,
  Total: 5000.0,
});
```

## Safety checklist for consumers

1. **No blind retries.** Every financial mutation (`save`, `saveBatch`, `delete`, `deleteBatch`, `email`) sets `isFinancialMutation: true` and is **never** automatically retried by the SDK transport. After a network timeout (`SageTimeoutError`), query for the record (e.g. via `list({ odata })` filtering by `Reference` or `DocumentNumber`) before re-submitting — a timeout does not prove Sage failed to commit the transaction.
2. **Idempotency is your responsibility** — Sage One `2.0.0` does not support HTTP `Idempotency-Key` headers. Use unique document references (`Reference`) and reconcile before retrying.
3. **No silent rounding.** Wire numbers are preserved verbatim (`ADR-012`). Use `toDecimal()` and `fromDecimal()` (`FixedDecimal`) from `@bytemoney/sage-one` for exact fixed-scale monetary math; never use floating-point addition on financial totals.
4. **Tax values are Sage's domain.** The SDK never computes or modifies statutory VAT/tax amounts; use `.calculate()` endpoints to let Sage compute tax.
5. **Errors preserve Sage responses** — surface `SageApiError` details and correlation IDs to operators.
6. **Least-privilege credentials** — isolate test vs production companies (`companyId`).

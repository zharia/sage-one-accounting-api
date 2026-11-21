# Attachments and file handling

Sage One Accounting API `2.0.0` exposes 13 resource-specific `*Attachment` controllers plus two generic document attachment controllers (`Attachment` and `DocumentFileAttachment`) (spec §16). All 15 controllers are implemented across `src/domains/{sales,purchases,customers,suppliers,inventory,banking,accounting,crm}/`.

## Capabilities

- **Multipart upload (`save`):** Uses native `FormData` and `Blob` to stream `Uint8Array | Blob | string` file payloads without buffering extra copies.
- **Metadata retrieval (`get`, `validate`):** Validates attachment metadata (`AttachmentDto` with `ID` / `AttachmentUID` UUID, `Name`, `Size`, `Data`) via Zod schemas.
- **Binary download (`download`):** Returns raw `ArrayBuffer` (`responseType: "binary"`), bypassing JSON parsing.
- **Deletion (`delete`):** Deletes an attachment by its GUID identifier.
- **Company storage quota (`Attachment.getStorageInfo`, `DocumentFileAttachment.allowFileAttachment`):** Checks storage usage and whether additional attachments are permitted.
- **Cancellation (`AbortSignal`):** Supported via `options.signal` on every attachment operation.

## Rules

1. **Parent-resource identifier required on upload:** Every `POST /<Service>/Save` endpoint requires a specific parent identifier (supplied in the typed upload payload and transmitted in both the query string and multipart form fields).
2. **Never automatically retried:** Every attachment upload (`save`) and deletion (`delete`) sets `isFinancialMutation: true` and is never auto-retried on transient failures to prevent duplicate attachments.
3. **Response validation:** Applies to metadata endpoints (`get`, `save`, `validate`, `getStorageInfo`), while `download` returns raw binary `ArrayBuffer`.

## Verified Parent-Resource Identifier Matrix

| Service | Client Property | Parent ID Parameter | Operations |
|---|---|---|---|
| `TaxInvoiceAttachment` | `sage.taxInvoiceAttachments` | `TransactionId` | `get`, `download`, `delete`, `save`, `validate` |
| `QuoteAttachment` | `sage.quoteAttachments` | `TransactionId` | `get`, `download`, `delete`, `save`, `validate` |
| `SalesOrderAttachment` | `sage.salesOrderAttachments` | `TransactionId` | `get`, `download`, `delete`, `save`, `validate` |
| `PurchaseOrderAttachment` | `sage.purchaseOrderAttachments` | `TransactionId` | `get`, `download`, `delete`, `save`, `validate` |
| `SupplierInvoiceAttachment` | `sage.supplierInvoiceAttachments` | `TransactionId` | `get`, `download`, `delete`, `save`, `validate` |
| `CustomerReturnAttachment` | `sage.customerReturnAttachments` | `TransactionId` | `get`, `download`, `delete`, `save`, `validate` |
| `SupplierReturnAttachment` | `sage.supplierReturnAttachments` | `TransactionId` | `get`, `download`, `delete`, `save`, `validate` |
| `ItemNoteAttachment` | `sage.itemNoteAttachments` | `TransactionId` | `get`, `download`, `delete`, `save`, `validate` |
| `CustomerNoteAttachment` | `sage.customerNoteAttachments` | `CustomerNoteId` | `get`, `download`, `delete`, `save`, `validate` |
| `SupplierNoteAttachment` | `sage.supplierNoteAttachments` | `SupplierNoteId` | `get`, `download`, `delete`, `save`, `validate` |
| `ItemAttachment` | `sage.itemAttachments` | `ItemId` | `get`, `download`, `delete`, `save`, `validate` |
| `AccountNoteAttachment` | `sage.accountNoteAttachments` | `AccountNoteId` | `get`, `download`, `delete`, `save`, `validate` |
| `AccountantNoteAttachment` | `sage.accountantNoteAttachments` | `AccountantNoteId` | `get`, `download`, `delete`, `save`, `validate` |
| `BankAccountNoteAttachment` | `sage.bankAccountNoteAttachments` | `BankAccountNoteId` | `get`, `download`, `delete`, `save`, `validate` |
| `BankTransactionAttachment` | `sage.bankTransactionAttachments` | `BankTransactionId` | `get`, `download`, `delete`, `save`, `validate` |
| `Attachment` | `sage.attachments` | `id` (GUID on download) | `download`, `getStorageInfo` |
| `DocumentFileAttachment` | `sage.documentFileAttachments` | `documentTypeId`, `documentId` | `allowFileAttachment` |

## Example Usage

```typescript
// Upload a PDF attachment to Tax Invoice #1050
const metadata = await sage.taxInvoiceAttachments.save({
  TransactionId: 1050,
  file: pdfBytes,
  fileName: "Signed-POD-1050.pdf",
  contentType: "application/pdf",
});

// Download the binary attachment by its GUID
const rawBytes: ArrayBuffer = await sage.taxInvoiceAttachments.download(
  metadata.ID ?? "2d47a21d-cebf-4a5b-93fa-84104af72ad5",
);
```

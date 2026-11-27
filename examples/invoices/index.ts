/**
 * Invoices, quotes, customer receipts, allocations, and attachments example (`@bytemoney/sage-one-accounting-api` — M005).
 */

import { odata, SageOneClient, type TaxInvoice, toDecimal } from "../../src/index.js";

export async function runInvoicesExample(): Promise<void> {
  const sage = new SageOneClient({
    credentials: {
      username: process.env["SAGE_USERNAME"] ?? "demo@example.com",
      password: process.env["SAGE_PASSWORD"] ?? "Password123",
    },
    apiKey: process.env["SAGE_API_KEY"] ?? "{39478ac6-ac2a-44d8-a31c-7e7e14af4de3}",
    companyId: Number(process.env["SAGE_COMPANY_ID"] ?? "1"),
  });

  // 1. Preview tax invoice totals using Calculate before saving
  const calculated = await sage.taxInvoices.calculate({
    CustomerId: 40,
    Date: "2026-11-21",
    DueDate: "2026-12-21",
    Inclusive: false,
    Lines: [
      {
        SelectionId: 1,
        TaxTypeId: 1,
        Description: "Advisory Services",
        Quantity: 10,
        UnitPriceExclusive: 1500.0,
      },
    ],
  });

  // 2. Save the tax invoice (financial mutation: never auto-retried)
  const savedInvoice = await sage.taxInvoices.save(calculated, {
    useSystemDocumentNumber: true,
  });

  // 3. Upload a supporting PDF attachment linked via TransactionId
  if (savedInvoice.ID !== undefined && savedInvoice.ID !== null) {
    await sage.taxInvoiceAttachments.save({
      TransactionId: savedInvoice.ID,
      file: new Uint8Array([0x25, 0x50, 0x44, 0x46]),
      fileName: "signed-po.pdf",
    });

    // Export the tax invoice PDF
    const invoicePdf = await sage.taxInvoices.export(savedInvoice.ID);
    void invoicePdf;
  }

  // 4. List recent invoices and sum totals with exact base-10 decimal arithmetic
  const page = await sage.taxInvoices.list({
    includeDetail: true,
    includeCustomerDetails: true,
    odata: odata<TaxInvoice>().top(25),
  });

  const pageTotal = page.Results.reduce(
    (sum, inv) => sum.add(toDecimal(inv.Total ?? 0)),
    toDecimal(0),
  );
  void pageTotal;
}

/**
 * Financial statements and management reporting example (`@bytemoney/sage-one-accounting-api` — M006).
 */

import { SageOneClient } from "../../src/index.js";

export async function runReportingExample(): Promise<void> {
  const sage = new SageOneClient({
    credentials: {
      username: process.env["SAGE_USERNAME"] ?? "demo@example.com",
      password: process.env["SAGE_PASSWORD"] ?? "Password123",
    },
    apiKey: process.env["SAGE_API_KEY"] ?? "{39478ac6-ac2a-44d8-a31c-7e7e14af4de3}",
    companyId: Number(process.env["SAGE_COMPANY_ID"] ?? "1"),
  });

  // 1. Retrieve Balance Sheet and Profit & Loss statements
  const balanceSheet = await sage.balanceSheet.get({
    ToDate: "2026-11-21",
    UseForeignCurrency: false,
  });

  const profitAndLoss = await sage.profitAndLoss.get({
    FromDate: "2026-01-01",
    ToDate: "2026-11-21",
    UseForeignCurrency: false,
  });

  // 2. Export Trial Balance binary report
  const trialBalanceExport = await sage.trialBalance.export({
    FromDate: "2026-01-01",
    ToDate: "2026-11-21",
    Comparative: false,
  });

  // 3. Retrieve VAT201 and aged receivables summary
  const customerAgeing = await sage.customerAgeing.getSummary({
    ToDate: "2026-11-21",
    AgeingPeriod: 30,
  });

  void balanceSheet;
  void profitAndLoss;
  void trialBalanceExport;
  void customerAgeing;
}

/**
 * Banking and bank transactions workflow example (`@bytemoney/sage-one` — M006).
 */

import { type BankAccount, odata, SageOneClient, toDecimal } from "../../src/index.js";

export async function runBankingExample(): Promise<void> {
  const sage = new SageOneClient({
    credentials: {
      username: process.env["SAGE_USERNAME"] ?? "demo@example.com",
      password: process.env["SAGE_PASSWORD"] ?? "Password123",
    },
    apiKey: process.env["SAGE_API_KEY"] ?? "{39478ac6-ac2a-44d8-a31c-7e7e14af4de3}",
    companyId: Number(process.env["SAGE_COMPANY_ID"] ?? "1"),
  });

  // 1. Retrieve active bank accounts
  const bankAccounts = await sage.bankAccounts.list({
    odata: odata<BankAccount>().filter("Active", "eq", true),
  });

  let consolidatedCash = toDecimal(0);
  for (const ba of bankAccounts.Results) {
    consolidatedCash = consolidatedCash.add(toDecimal(ba.Balance ?? 0));
  }

  // 2. Retrieve bank transactions and cash movement report
  const transactions = await sage.bankTransactions.list();
  const cashMovements = await sage.cashMovements.get({
    FromDate: "2026-01-01",
    ToDate: "2026-11-21",
  });

  void consolidatedCash;
  void transactions;
  void cashMovements;
}

/**
 * Basic usage example for `@bytemoney/sage-one` (M003/M004).
 *
 * Demonstrates client initialization, authentication verification, retrieving
 * the current company, listing accounts with OData filtering, and listing tax types.
 */

import { type Account, odata, SageOneClient } from "../../src/index.js";

export async function runBasicExample(): Promise<void> {
  const sage = new SageOneClient({
    credentials: {
      username: process.env["SAGE_USERNAME"] ?? "demo@example.com",
      password: process.env["SAGE_PASSWORD"] ?? "Password123",
    },
    apiKey: process.env["SAGE_API_KEY"] ?? "{39478ac6-ac2a-44d8-a31c-7e7e14af4de3}",
    companyId: Number(process.env["SAGE_COMPANY_ID"] ?? "1"),
    logging: {
      enabled: true,
      level: "warn",
    },
  });

  const auth = await sage.verifyAuthentication();
  if (!auth.authenticated) {
    throw new Error("Authentication failed");
  }

  const company = await sage.company.current();
  const activeAccounts = await sage.accounts.list({
    odata: odata<Account>().filter("Active", "eq", true).orderBy("Name", "asc").top(50),
  });

  const taxTypes = await sage.taxTypes.list();

  void company;
  void activeAccounts;
  void taxTypes;
}

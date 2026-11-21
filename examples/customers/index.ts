/**
 * Customers & receivables workflow example for `@bytemoney/sage-one` (M004).
 *
 * Demonstrates listing customers via async pagination, decimal-safe balance
 * summation, creating a customer category and customer record, and retrieving
 * a customer statement.
 */

import {
  type Customer,
  odata,
  SageNotFoundError,
  SageOneClient,
  toDecimal,
} from "../../src/index.js";

export async function runCustomersExample(): Promise<void> {
  const sage = new SageOneClient({
    credentials: {
      username: process.env["SAGE_USERNAME"] ?? "demo@example.com",
      password: process.env["SAGE_PASSWORD"] ?? "Password123",
    },
    apiKey: process.env["SAGE_API_KEY"] ?? "{39478ac6-ac2a-44d8-a31c-7e7e14af4de3}",
    companyId: Number(process.env["SAGE_COMPANY_ID"] ?? "1"),
  });

  // 1. Iterate through active customers and sum balances using decimal-safe arithmetic
  let totalReceivables = toDecimal(0);
  for await (const customer of sage.customers.iterate({
    pageSize: 50,
    maxPages: 10,
    odata: odata<Customer>().filter("Active", "eq", true).orderBy("Name", "asc"),
  })) {
    totalReceivables = totalReceivables.add(toDecimal(customer.Balance ?? 0));
  }

  // 2. Save a customer category and customer
  const category = await sage.customerCategories.save({
    Description: "Enterprise Accounts",
  });

  const savedCustomer = await sage.customers.save({
    Name: "Acme Industrial (Pty) Ltd",
    Category: category,
    Active: true,
    CreditLimit: 100_000,
    Email: "accounts@acme.co.za",
  });

  // 3. Retrieve a single customer and statement
  try {
    if (savedCustomer.ID !== undefined) {
      const reloaded = await sage.customers.get(savedCustomer.ID);
      void reloaded;
    }
  } catch (err: unknown) {
    if (err instanceof SageNotFoundError) {
      // Handle 404
    } else {
      throw err;
    }
  }

  const statements = await sage.customerStatements.get({
    FromDate: "2026-01-01",
    ToDate: "2026-11-21",
    IncludeActive: true,
  });

  void totalReceivables;
  void statements;
}


import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it, vi } from "vitest";

import { checkModuleBoundaries } from "../../scripts/verification/check-boundaries.js";
import {
  type Account,
  type Company,
  type Customer,
  odata,
  SageOneClient,
  type Supplier,
} from "../../src/index.js";

function loadFixture<T = unknown>(
  service: string,
  id: string,
): {
  readonly id: string;
  readonly method: string;
  readonly route: string;
  readonly requestSample: unknown;
  readonly responseSample: T;
} {
  const raw = readFileSync(
    resolve(process.cwd(), `contracts/fixtures/${service}/${id}.json`),
    "utf8",
  );
  return JSON.parse(raw) as {
    readonly id: string;
    readonly method: string;
    readonly route: string;
    readonly requestSample: unknown;
    readonly responseSample: T;
  };
}

interface RecordedCall {
  readonly method: string;
  readonly url: URL;
  readonly headers: Headers;
  readonly body: unknown;
}

function createHarness(
  responder: (call: RecordedCall) => {
    readonly status?: number;
    readonly body?: unknown;
    readonly binary?: Uint8Array;
  },
) {
  const calls: RecordedCall[] = [];
  const mockFetch: typeof fetch = vi.fn(async (input, init) => {
    const url = new URL(typeof input === "string" ? input : input.toString());
    const method = (init?.method ?? "GET").toUpperCase();
    const headers = new Headers(init?.headers);
    let body: unknown;
    if (typeof init?.body === "string" && init.body.length > 0) {
      body = JSON.parse(init.body);
    }
    const call: RecordedCall = { method, url, headers, body };
    calls.push(call);

    const resSpec = responder(call);
    if (resSpec.binary) {
      return new Response(resSpec.binary, {
        status: resSpec.status ?? 200,
        headers: { "Content-Type": "application/octet-stream" },
      });
    }
    if (resSpec.body === undefined) {
      return new Response(null, { status: resSpec.status ?? 204 });
    }
    return new Response(JSON.stringify(resSpec.body), {
      status: resSpec.status ?? 200,
      headers: { "Content-Type": "application/json" },
    });
  });

  const client = new SageOneClient({
    credentials: { username: "dev@example.com", password: "SecretPassword!" },
    apiKey: "{39478ac6-ac2a-44d8-a31c-7e7e14af4de3}",
    companyId: 101,
    retry: { enabled: false },
    transport: { fetch: mockFetch },
  });

  return { client, calls };
}

describe("Architectural module boundaries", () => {
  it("enforces zero boundary violations across src/", () => {
    expect(checkModuleBoundaries()).toEqual([]);
  });
});

describe("M003 & M004 Contract Tests (89 operations across 24 services)", () => {
  it("verifies Login service (1 operation) and verifyAuthentication", async () => {
    const fixture = loadFixture<boolean>("Login", "POST-Login-Validate");
    const { client, calls } = createHarness(() => ({ body: fixture.responseSample }));

    const isValid = await client.login.validate({
      Username: "dev@example.com",
      Password: "SecretPassword!",
    });
    expect(isValid).toBe(true);
    expect(calls[0]?.method).toBe("POST");
    expect(calls[0]?.url.pathname).toBe("/api/2.0.0/Login/Validate");
    expect(calls[0]?.headers.get("Authorization")).toBeNull();

    const authRes = await client.verifyAuthentication();
    expect(authRes.authenticated).toBe(true);
  });

  it("verifies Account service (9 operations)", async () => {
    const listFixture = loadFixture("Account", "GET-Account-Get");
    const singleFixture = loadFixture<Account>("Account", "GET-Account-Get-id");

    const { client, calls } = createHarness((call) => {
      if (call.method === "DELETE") return { status: 204 };
      if (
        call.url.pathname.endsWith("/Account/Get/11") ||
        call.url.pathname.endsWith("/Account/Save")
      ) {
        return { body: singleFixture.responseSample };
      }
      return { body: listFixture.responseSample };
    });

    await client.accounts.list({
      odata: odata<Account>().filter("Active", "eq", true).top(10),
    });
    expect(calls[0]?.url.pathname).toBe("/api/2.0.0/Account/Get");
    expect(calls[0]?.url.searchParams.get("$filter")).toBe("Active eq true");
    expect(calls[0]?.url.searchParams.get("apikey")).toBe("{39478ac6-ac2a-44d8-a31c-7e7e14af4de3}");
    expect(calls[0]?.url.searchParams.get("CompanyId")).toBe("101");

    const acc = await client.accounts.get(11);
    expect(acc.ID).toBe(11);
    expect(calls[1]?.url.pathname).toBe("/api/2.0.0/Account/Get/11");

    await client.accounts.getPayrollTypeOfAccounts();
    expect(calls[2]?.url.pathname).toBe("/api/2.0.0/Account/GetPayrollTypeOfAccounts");

    await client.accounts.getServiceAccounts();
    expect(calls[3]?.url.pathname).toBe("/api/2.0.0/Account/GetServiceAccounts");

    await client.accounts.getWithSystemAccounts();
    expect(calls[4]?.url.pathname).toBe("/api/2.0.0/Account/GetWithSystemAccounts");

    await client.accounts.getAccountsByCategoryId(8);
    expect(calls[5]?.url.pathname).toBe("/api/2.0.0/Account/GetAccountsByCategoryId/8");

    await client.accounts.getChartOfAccounts();
    expect(calls[6]?.url.pathname).toBe("/api/2.0.0/Account/GetChartofAccounts");

    const saved = await client.accounts.save({ Name: "Office Supplies", Active: true });
    expect(saved.ID).toBe(11);
    expect(calls[7]?.method).toBe("POST");
    expect(calls[7]?.url.pathname).toBe("/api/2.0.0/Account/Save");

    await client.accounts.delete(11);
    expect(calls[8]?.method).toBe("DELETE");
    expect(calls[8]?.url.pathname).toBe("/api/2.0.0/Account/Delete/11");
  });

  it("verifies AccountCategory (2 ops), AccountBalance (3 ops), AccountOpeningBalance (4 ops), AccountNote (4 ops)", async () => {
    const catList = loadFixture("AccountCategory", "GET-AccountCategory-Get");
    const catSingle = loadFixture("AccountCategory", "GET-AccountCategory-Get-id");
    const balList = loadFixture("AccountBalance", "POST-AccountBalance-Get");
    const budBalList = loadFixture("AccountBalance", "GET-AccountBalance-GetAccountBudgets");
    const obList = loadFixture("AccountOpeningBalance", "GET-AccountOpeningBalance-Get");
    const obSingle = loadFixture("AccountOpeningBalance", "GET-AccountOpeningBalance-Get-id");
    const noteList = loadFixture("AccountNote", "GET-AccountNote-Get");
    const noteSingle = loadFixture("AccountNote", "GET-AccountNote-Get-id");

    const { client, calls } = createHarness((call) => {
      const p = call.url.pathname;
      if (call.method === "DELETE") return { status: 204 };
      if (p.endsWith("/AccountCategory/Get")) return { body: catList.responseSample };
      if (p.includes("/AccountCategory/Get/")) return { body: catSingle.responseSample };
      if (p.endsWith("/AccountBalance/GetAccountBudgets"))
        return { body: budBalList.responseSample };
      if (p.includes("/AccountBalance/")) return { body: balList.responseSample };
      if (p.endsWith("/AccountOpeningBalance/Get")) return { body: obList.responseSample };
      if (p.includes("/AccountOpeningBalance/")) return { body: obSingle.responseSample };
      if (p.endsWith("/AccountNote/Get")) return { body: noteList.responseSample };
      return { body: noteSingle.responseSample };
    });

    await client.accountCategories.list();
    await client.accountCategories.get(8);

    await client.accountBalances.get({ FromDate: "2026-01-01", ToDate: "2026-12-31" });
    await client.accountBalances.getAccountBudgetsById(5);
    await client.accountBalances.getAccountBudgets();

    await client.accountOpeningBalances.list();
    await client.accountOpeningBalances.get(2);
    await client.accountOpeningBalances.getByAccountId(1);
    await client.accountOpeningBalances.save({
      AccountId: 1,
      Balance: 500.0,
      Date: "2026-01-01",
    });

    await client.accountNotes.list();
    await client.accountNotes.get(2);
    await client.accountNotes.save({
      AccountId: 1,
      Subject: "Review",
      ActionDate: "2026-11-21",
    });
    await client.accountNotes.delete(2);

    expect(calls).toHaveLength(13);
    expect(calls[3]?.url.searchParams.get("budgetId")).toBe("5");
  });

  it("verifies Company (4 ops), CompanyEntityType (2 ops), CompanyNote (5 ops)", async () => {
    const compList = loadFixture("Company", "GET-Company-Get_includeStatus");
    const compSingle = loadFixture<Company>("Company", "GET-Company-Get-id");
    const cetList = loadFixture("CompanyEntityType", "GET-CompanyEntityType-Get");
    const cetSingle = loadFixture("CompanyEntityType", "GET-CompanyEntityType-Get-id");
    const cnList = loadFixture("CompanyNote", "GET-CompanyNote-Get");
    const cnSingle = loadFixture("CompanyNote", "GET-CompanyNote-Get-id");

    const { client, calls } = createHarness((call) => {
      const p = call.url.pathname;
      if (call.method === "DELETE") return { status: 204 };
      if (p.endsWith("/Company/Get")) return { body: compList.responseSample };
      if (p.endsWith("/Company/GetUserCompanyCount")) return { body: 3 };
      if (p.includes("/Company/")) return { body: compSingle.responseSample };
      if (p.endsWith("/CompanyEntityType/Get")) return { body: cetList.responseSample };
      if (p.includes("/CompanyEntityType/")) return { body: cetSingle.responseSample };
      if (p.endsWith("/CompanyNote/Get") || p.includes("/CompanyNote/GetCompanyNotes/")) {
        return { body: cnList.responseSample };
      }
      return { body: cnSingle.responseSample };
    });

    await client.company.list({ includeStatus: true });
    expect(calls[0]?.url.searchParams.get("includeStatus")).toBe("true");
    await client.company.get(1);
    const count = await client.company.getUserCompanyCount();
    expect(count).toBe(3);
    await client.company.current();

    await client.companyEntityTypes.list();
    await client.companyEntityTypes.get(1);

    await client.companyNotes.list();
    await client.companyNotes.get(1);
    await client.companyNotes.getCompanyNotes(101);
    await client.companyNotes.save({ Subject: "Audit note", ActionDate: "2026-11-21" });
    await client.companyNotes.delete(1);

    expect(calls).toHaveLength(11);
  });

  it("verifies Customer (4 ops), CustomerCategory (4 ops), CustomerOpeningBalance (4 ops), CustomerStatement (2 ops), CustomerNote (4 ops)", async () => {
    const custList = loadFixture("Customer", "GET-Customer-Get_includeSalesRepDetails");
    const custSingle = loadFixture<Customer>("Customer", "GET-Customer-Get-id");
    const ccList = loadFixture("CustomerCategory", "GET-CustomerCategory-Get");
    const ccSingle = loadFixture("CustomerCategory", "GET-CustomerCategory-Get-id");
    const cobList = loadFixture("CustomerOpeningBalance", "GET-CustomerOpeningBalance-Get");
    const cobSingle = loadFixture("CustomerOpeningBalance", "GET-CustomerOpeningBalance-Get-id");
    const csList = loadFixture("CustomerStatement", "POST-CustomerStatement-Get");
    const cnList = loadFixture("CustomerNote", "GET-CustomerNote-Get");
    const cnSingle = loadFixture("CustomerNote", "GET-CustomerNote-Get-id");

    const { client, calls } = createHarness((call) => {
      const p = call.url.pathname;
      if (call.method === "DELETE") return { status: 204 };
      if (p.endsWith("/CustomerStatement/Export")) {
        return { binary: new Uint8Array([0x25, 0x50, 0x44, 0x46]) };
      }
      if (p.endsWith("/CustomerStatement/Get")) return { body: csList.responseSample };
      if (p.endsWith("/Customer/Get")) return { body: custList.responseSample };
      if (p.includes("/Customer/")) return { body: custSingle.responseSample };
      if (p.endsWith("/CustomerCategory/Get")) return { body: ccList.responseSample };
      if (p.includes("/CustomerCategory/")) return { body: ccSingle.responseSample };
      if (p.endsWith("/CustomerOpeningBalance/Get")) return { body: cobList.responseSample };
      if (p.includes("/CustomerOpeningBalance/")) return { body: cobSingle.responseSample };
      if (p.endsWith("/CustomerNote/Get")) return { body: cnList.responseSample };
      return { body: cnSingle.responseSample };
    });

    await client.customers.list({ includeSalesRepDetails: true });
    expect(calls[0]?.url.searchParams.get("includeSalesRepDetails")).toBe("true");
    await client.customers.get(40);
    await client.customers.save({ Name: "Acme Corp" });
    await client.customers.delete(40);

    await client.customerCategories.list();
    await client.customerCategories.get(2);
    await client.customerCategories.save({ Description: "Retail" });
    await client.customerCategories.delete(2);

    await client.customerOpeningBalances.list();
    await client.customerOpeningBalances.get(2);
    await client.customerOpeningBalances.getByCustomerId(1);
    await client.customerOpeningBalances.save({
      CustomerId: 1,
      Balance: 100.0,
      Date: "2026-01-01",
    });

    const stmts = await client.customerStatements.get({
      FromDate: "2026-01-01",
      ToDate: "2026-11-21",
    });
    expect(Array.isArray(stmts)).toBe(true);

    const pdf = await client.customerStatements.export({
      FromDate: "2026-01-01",
      ToDate: "2026-11-21",
    });
    expect(pdf.byteLength).toBe(4);

    await client.customerNotes.list();
    await client.customerNotes.get(3);
    await client.customerNotes.save({
      CustomerId: 1,
      Subject: "Follow-up",
      ActionDate: "2026-11-21",
    });
    await client.customerNotes.delete(3);

    expect(calls).toHaveLength(18);
  });

  it("verifies Supplier (4 ops), SupplierCategory (4 ops), SupplierOpeningBalance (4 ops), SupplierStatement (1 op), SupplierNote (4 ops)", async () => {
    const supList = loadFixture("Supplier", "GET-Supplier-Get");
    const supSingle = loadFixture<Supplier>("Supplier", "GET-Supplier-Get-id");
    const scList = loadFixture("SupplierCategory", "GET-SupplierCategory-Get");
    const scSingle = loadFixture("SupplierCategory", "GET-SupplierCategory-Get-id");
    const sobList = loadFixture("SupplierOpeningBalance", "GET-SupplierOpeningBalance-Get");
    const sobSingle = loadFixture("SupplierOpeningBalance", "GET-SupplierOpeningBalance-Get-id");
    const ssList = loadFixture("SupplierStatement", "POST-SupplierStatement-Get");
    const snList = loadFixture("SupplierNote", "GET-SupplierNote-Get");
    const snSingle = loadFixture("SupplierNote", "GET-SupplierNote-Get-id");

    const { client, calls } = createHarness((call) => {
      const p = call.url.pathname;
      if (call.method === "DELETE") return { status: 204 };
      if (p.endsWith("/SupplierStatement/Get")) return { body: ssList.responseSample };
      if (p.endsWith("/Supplier/Get")) return { body: supList.responseSample };
      if (p.includes("/Supplier/")) return { body: supSingle.responseSample };
      if (p.endsWith("/SupplierCategory/Get")) return { body: scList.responseSample };
      if (p.includes("/SupplierCategory/")) return { body: scSingle.responseSample };
      if (p.endsWith("/SupplierOpeningBalance/Get")) return { body: sobList.responseSample };
      if (p.includes("/SupplierOpeningBalance/")) return { body: sobSingle.responseSample };
      if (p.endsWith("/SupplierNote/Get")) return { body: snList.responseSample };
      return { body: snSingle.responseSample };
    });

    await client.suppliers.list();
    await client.suppliers.get(38);
    await client.suppliers.save({ Name: "Global Parts Ltd" });
    await client.suppliers.delete(38);

    await client.supplierCategories.list();
    await client.supplierCategories.get(2);
    await client.supplierCategories.save({ Description: "Wholesale" });
    await client.supplierCategories.delete(2);

    await client.supplierOpeningBalances.list();
    await client.supplierOpeningBalances.get(2);
    await client.supplierOpeningBalances.getBySupplierId(1);
    await client.supplierOpeningBalances.save({
      SupplierId: 1,
      Balance: 250.0,
      Date: "2026-01-01",
    });

    await client.supplierStatements.get({
      FromDate: "2026-01-01",
      ToDate: "2026-11-21",
    });

    await client.supplierNotes.list();
    await client.supplierNotes.get(3);
    await client.supplierNotes.save({
      SupplierId: 1,
      Subject: "Contract renewal",
      ActionDate: "2026-11-21",
    });
    await client.supplierNotes.delete(3);

    expect(calls).toHaveLength(17);
  });

  it("verifies TaxType (4 ops), Item (4 ops), ItemCategory (4 ops), ItemOpeningBalance (4 ops), ItemNote (4 ops)", async () => {
    const ttList = loadFixture("TaxType", "GET-TaxType-Get");
    const ttSingle = loadFixture("TaxType", "GET-TaxType-Get-id");
    const itemList = loadFixture(
      "Item",
      "GET-Item-Get_includeAdditionalItemPrices_includeAttachments",
    );
    const itemSingle = loadFixture("Item", "GET-Item-Get-id");
    const icList = loadFixture("ItemCategory", "GET-ItemCategory-Get");
    const icSingle = loadFixture("ItemCategory", "GET-ItemCategory-Get-id");
    const iobList = loadFixture("ItemOpeningBalance", "GET-ItemOpeningBalance-Get");
    const iobSingle = loadFixture("ItemOpeningBalance", "GET-ItemOpeningBalance-Get-id");
    const inList = loadFixture("ItemNote", "GET-ItemNote-Get");
    const inSingle = loadFixture("ItemNote", "GET-ItemNote-Get-id");

    const { client, calls } = createHarness((call) => {
      const p = call.url.pathname;
      if (call.method === "DELETE") return { status: 204 };
      if (p.endsWith("/TaxType/Get")) return { body: ttList.responseSample };
      if (p.includes("/TaxType/")) return { body: ttSingle.responseSample };
      if (p.endsWith("/Item/Get")) return { body: itemList.responseSample };
      if (p.includes("/Item/")) return { body: itemSingle.responseSample };
      if (p.endsWith("/ItemCategory/Get")) return { body: icList.responseSample };
      if (p.includes("/ItemCategory/")) return { body: icSingle.responseSample };
      if (p.endsWith("/ItemOpeningBalance/Get")) return { body: iobList.responseSample };
      if (p.includes("/ItemOpeningBalance/")) return { body: iobSingle.responseSample };
      if (p.endsWith("/ItemNote/Get")) return { body: inList.responseSample };
      return { body: inSingle.responseSample };
    });

    await client.taxTypes.list();
    await client.taxTypes.get(1);
    await client.taxTypes.save({ Name: "Standard Rate VAT", Percentage: 0.15 });
    await client.taxTypes.delete(1);

    await client.items.list({
      includeAdditionalItemPrices: true,
      includeAttachments: false,
    });
    expect(calls[4]?.url.searchParams.get("includeAdditionalItemPrices")).toBe("true");
    expect(calls[4]?.url.searchParams.get("includeAttachments")).toBe("false");
    await client.items.get(1);
    await client.items.save({ Code: "SKU-001", Description: "Consulting Hour" });
    await client.items.delete(1);

    await client.itemCategories.list();
    await client.itemCategories.get(2);
    await client.itemCategories.save({ Description: "Hardware" });
    await client.itemCategories.delete(2);

    await client.itemOpeningBalances.list();
    await client.itemOpeningBalances.get(1);
    await client.itemOpeningBalances.getByItemId(2);
    await client.itemOpeningBalances.save({
      ItemId: 2,
      Date: "2026-01-01",
      Quantity: 10,
      Cost: 100.0,
    });

    await client.itemNotes.list();
    await client.itemNotes.get(2);
    await client.itemNotes.save({
      ItemId: 1,
      Subject: "Stock check",
      ActionDate: "2026-11-21",
    });
    await client.itemNotes.delete(2);

    expect(calls).toHaveLength(20);
  });
});

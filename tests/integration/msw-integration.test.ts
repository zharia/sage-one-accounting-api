import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import {
  type Customer,
  odata,
  SageAuthenticationError,
  SageNotFoundError,
  SageOneClient,
  SageRateLimitError,
  SageValidationError,
  toDecimal,
} from "../../src/index.js";

const BASE_URL = "https://accounting.sageone.co.za/api/2.0.0";

const handlers = [
  http.post(`${BASE_URL}/Login/Validate`, async ({ request }) => {
    const body = (await request.json()) as { Username?: string; Password?: string };
    if (body.Username === "valid@example.com" && body.Password === "ValidPass123") {
      return HttpResponse.json(true);
    }
    return HttpResponse.json(false);
  }),

  http.get(`${BASE_URL}/Company/Current`, ({ request }) => {
    const url = new URL(request.url);
    if (!request.headers.get("Authorization")?.startsWith("Basic ")) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!url.searchParams.get("apikey")) {
      return HttpResponse.json({ message: "Missing apikey" }, { status: 401 });
    }
    return HttpResponse.json({
      ID: 12345,
      Name: "ByteMoney Consulting (Pty) Ltd",
      CurrencySymbol: "R",
      CurrencyDecimalDigits: 2,
      Active: true,
    });
  }),

  http.get(`${BASE_URL}/Customer/Get`, ({ request }) => {
    const url = new URL(request.url);
    const skip = Number(url.searchParams.get("$skip") ?? "0");
    const top = Number(url.searchParams.get("$top") ?? "2");
    const allCustomers: Customer[] = [
      { ID: 1, Name: "Alpha Logistics", Active: true, Balance: 1250.5 },
      { ID: 2, Name: "Beta Retail", Active: true, Balance: 499.95 },
      { ID: 3, Name: "Gamma Holdings", Active: true, Balance: 0.0 },
    ];
    const page = allCustomers.slice(skip, skip + top);
    return HttpResponse.json({
      TotalResults: allCustomers.length,
      ReturnedResults: page.length,
      Results: page,
    });
  }),

  http.get(`${BASE_URL}/Customer/Get/:id`, ({ params }) => {
    if (params["id"] === "999") {
      return HttpResponse.json({ message: "Customer not found" }, { status: 404 });
    }
    return HttpResponse.json({
      ID: Number(params["id"]),
      Name: "Alpha Logistics",
      Active: true,
      Balance: 1250.5,
    });
  }),

  http.post(`${BASE_URL}/Customer/Save`, async ({ request }) => {
    const body = (await request.json()) as Customer;
    return HttpResponse.json({
      ...body,
      ID: body.ID ?? 100,
      Created: "2026-11-21",
    });
  }),

  http.get(`${BASE_URL}/Account/Get`, () =>
    HttpResponse.json(
      { message: "Rate limit exceeded" },
      { status: 429, headers: { "Retry-After": "3600" } },
    ),
  ),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("MSW Integration Flows (spec §17.2)", () => {
  it("authenticates, fetches current company, iterates paginated customers, and performs decimal balance sum", async () => {
    const client = new SageOneClient({
      credentials: { username: "valid@example.com", password: "ValidPass123" },
      apiKey: "{39478ac6-ac2a-44d8-a31c-7e7e14af4de3}",
      companyId: 12345,
      retry: { enabled: false },
      scheduler: { minIntervalMs: 0 }, // explicit override — test speed (default is 1000 ms)
    });

    const authResult = await client.verifyAuthentication();
    expect(authResult.authenticated).toBe(true);

    const currentCompany = await client.company.current();
    expect(currentCompany.Name).toBe("ByteMoney Consulting (Pty) Ltd");

    const customers: Customer[] = [];
    for await (const customer of client.customers.iterate({
      pageSize: 2,
      odata: odata<Customer>().filter("Active", "eq", true).orderBy("Name", "asc"),
    })) {
      customers.push(customer);
    }

    expect(customers).toHaveLength(3);
    const totalReceivables = customers.reduce(
      (acc, c) => acc.add(toDecimal(c.Balance ?? 0)),
      toDecimal(0),
    );
    expect(totalReceivables.toFixed(2)).toBe("1750.45");

    const created = await client.customers.save({
      Name: "Delta Manufacturing",
      Active: true,
      CreditLimit: 50000,
    });
    expect(created.ID).toBe(100);
    expect(created.Name).toBe("Delta Manufacturing");
  });

  it("propagates SageNotFoundError, SageRateLimitError, SageValidationError, and SageAuthenticationError accurately", async () => {
    const client = new SageOneClient({
      credentials: { username: "valid@example.com", password: "wrong" },
      apiKey: "{39478ac6-ac2a-44d8-a31c-7e7e14af4de3}",
      companyId: 12345,
      retry: { enabled: false },
      scheduler: { minIntervalMs: 0 }, // explicit override — test speed (default is 1000 ms)
    });

    await expect(client.verifyAuthentication()).rejects.toBeInstanceOf(SageAuthenticationError);
    await expect(client.customers.get(999)).rejects.toBeInstanceOf(SageNotFoundError);
    await expect(client.accounts.list()).rejects.toBeInstanceOf(SageRateLimitError);

    await expect(
      client.accounts.save({
        // @ts-expect-error testing runtime rejection of invalid payload
        Name: 12345,
      }),
    ).rejects.toBeInstanceOf(SageValidationError);
  });
});

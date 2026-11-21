import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

import {
  BasicAndApiKeyAuthenticator,
  createForwardCompatibleEnumSchema,
  createPinoLogger,
  DEFAULT_BASE_URL,
  FixedDecimal,
  fromDecimal,
  odata,
  paginateItems,
  paginatePages,
  redactLogContext,
  RedactingLogger,
  resolveConfig,
  SageApiError,
  SageAuthenticationError,
  SageAuthorizationError,
  SageConfigurationError,
  SageConflictError,
  SageNetworkError,
  SageNotFoundError,
  SageOneClient,
  SageRateLimitError,
  SageResponseError,
  SageTimeoutError,
  SageTransport,
  SageValidationError,
  sanitizeErrorMessage,
  toAccountCategoryId,
  toAccountId,
  toAccountNoteId,
  toAccountOpeningBalanceId,
  toBudgetId,
  toCompanyEntityTypeId,
  toCompanyId,
  toCompanyNoteId,
  toCustomerCategoryId,
  toCustomerId,
  toCustomerNoteId,
  toCustomerOpeningBalanceId,
  toDecimal,
  toInvoiceId,
  toISODateString,
  toISODateTimeString,
  toItemCategoryId,
  toItemId,
  toItemNoteId,
  toItemOpeningBalanceId,
  toSageGuid,
  toSageId,
  toSupplierCategoryId,
  toSupplierId,
  toSupplierNoteId,
  toSupplierOpeningBalanceId,
  toTaxTypeId,
  validateRequestPayload,
  validateResponsePayload,
} from "../../src/index.js";

describe("Branded identifiers, dates, and decimal utilities", () => {
  it("constructs validated branded numeric identifiers and rejects non-integers", () => {
    expect(toSageId(1)).toBe(1);
    expect(toCompanyId(10)).toBe(10);
    expect(toAccountId(11)).toBe(11);
    expect(toAccountCategoryId(12)).toBe(12);
    expect(toAccountNoteId(13)).toBe(13);
    expect(toAccountOpeningBalanceId(14)).toBe(14);
    expect(toBudgetId(15)).toBe(15);
    expect(toCompanyEntityTypeId(16)).toBe(16);
    expect(toCompanyNoteId(17)).toBe(17);
    expect(toCustomerId(20)).toBe(20);
    expect(toCustomerCategoryId(21)).toBe(21);
    expect(toCustomerNoteId(22)).toBe(22);
    expect(toCustomerOpeningBalanceId(23)).toBe(23);
    expect(toSupplierId(30)).toBe(30);
    expect(toSupplierCategoryId(31)).toBe(31);
    expect(toSupplierNoteId(32)).toBe(32);
    expect(toSupplierOpeningBalanceId(33)).toBe(33);
    expect(toTaxTypeId(40)).toBe(40);
    expect(toItemId(50)).toBe(50);
    expect(toItemCategoryId(51)).toBe(51);
    expect(toItemNoteId(52)).toBe(52);
    expect(toItemOpeningBalanceId(53)).toBe(53);
    expect(toInvoiceId(60)).toBe(60);

    expect(() => toCustomerId(1.5)).toThrow(RangeError);
    expect(() => toAccountId(Number.NaN)).toThrow(RangeError);
  });

  it("validates SageGuid, ISODateString, and ISODateTimeString", () => {
    const guid = "2d47a21d-cebf-4a5b-93fa-84104af72ad5";
    expect(toSageGuid(guid)).toBe(guid);
    expect(() => toSageGuid("not-a-uuid")).toThrow(RangeError);

    expect(toISODateString("2026-11-21")).toBe("2026-11-21");
    expect(() => toISODateString("21/11/2026")).toThrow(RangeError);

    expect(toISODateTimeString("2026-11-21T12:30:00Z")).toBe("2026-11-21T12:30:00Z");
    expect(() => toISODateTimeString("invalid-datetime")).toThrow(RangeError);
  });

  it("performs exact base-10 decimal arithmetic without binary floating-point drift", () => {
    const a = toDecimal(0.1);
    const b = toDecimal(0.2);
    const sum = a.add(b);
    expect(sum.toString()).toBe("0.3");
    expect(fromDecimal(sum)).toBe(0.3);

    const diff = toDecimal("100.00").subtract(toDecimal("0.01"));
    expect(diff.toString()).toBe("99.99");

    const prod = toDecimal("19.99").multiply(toDecimal("3"));
    expect(prod.toString()).toBe("59.97");
    expect(prod.toFixed(2)).toBe("59.97");
    expect(prod.toFixed(1)).toBe("60.0");
    expect(prod.toFixed(0)).toBe("60");
    expect(prod.equals(FixedDecimal.fromString("59.9700"))).toBe(true);

    const neg = toDecimal("-12.345");
    expect(neg.toFixed(2)).toBe("-12.35");

    const sci = FixedDecimal.fromString("1.5e2");
    expect(sci.toString()).toBe("150");

    expect(() => new FixedDecimal(10n, -1)).toThrow(RangeError);
    expect(() => FixedDecimal.fromString("abc")).toThrow(RangeError);
    expect(() => FixedDecimal.fromNumber(Number.POSITIVE_INFINITY)).toThrow(RangeError);
    expect(() => prod.toFixed(-1)).toThrow(RangeError);
  });
});

describe("Configuration management", () => {
  it("applies conservative defaults and validates with Zod", () => {
    const cfg = resolveConfig({});
    expect(cfg.baseUrl).toBe(DEFAULT_BASE_URL);
    expect(cfg.timeout).toBe(30_000);
    expect(cfg.retry.enabled).toBe(true);
    expect(cfg.retry.maxAttempts).toBe(3);
    expect(cfg.validation.validateRequests).toBe(true);
    expect(cfg.validation.validateResponses).toBe(true);
    expect(cfg.logging.enabled).toBe(false);
  });

  it("strips trailing slash from baseUrl and throws SageConfigurationError on invalid fields", () => {
    const cfg = resolveConfig({
      baseUrl: "https://accounting.sageone.co.za/api/2.0.0/",
      companyId: 42,
      apiKey: "{api-key}",
    });
    expect(cfg.baseUrl).toBe("https://accounting.sageone.co.za/api/2.0.0");
    expect(cfg.companyId).toBe(42);

    expect(() =>
      resolveConfig({
        baseUrl: "not-a-url",
      }),
    ).toThrow(SageConfigurationError);

    expect(() =>
      resolveConfig({
        companyId: -5,
      }),
    ).toThrow(SageConfigurationError);
  });
});

describe("Logging and secret redaction", () => {
  it("redacts sensitive keys and credential patterns from log context and messages", () => {
    const captured: Array<{
      level: string;
      msg: string;
      ctx?: Record<string, unknown> | undefined;
    }> = [];
    const customLogger = {
      debug(msg: string, ctx?: Record<string, unknown>) {
        captured.push({ level: "debug", msg, ctx });
      },
      info(msg: string, ctx?: Record<string, unknown>) {
        captured.push({ level: "info", msg, ctx });
      },
      warn(msg: string, ctx?: Record<string, unknown>) {
        captured.push({ level: "warn", msg, ctx });
      },
      error(msg: string, ctx?: Record<string, unknown>) {
        captured.push({ level: "error", msg, ctx });
      },
    };

    const redacting = new RedactingLogger(customLogger, "debug");
    redacting.debug("Auth header Basic dXNlcjpwYXNz sent to ?apikey=secret123", {
      password: "super-secret-password",
      apiKey: "my-api-key",
      Authorization: "Basic dXNlcjpwYXNz",
      nested: {
        token: "jwt-token-val",
        safeField: "account-list",
      },
      items: [{ secret: "hidden", ok: 1 }],
    });
    redacting.info("info message", { ok: true });
    redacting.warn("warn message", { ok: true });
    redacting.error("error message", { ok: true });

    expect(captured).toHaveLength(4);
    const entry = captured[0]!;
    expect(entry.msg).not.toContain("dXNlcjpwYXNz");
    expect(entry.msg).not.toContain("secret123");
    expect(entry.ctx?.["password"]).toBe("[REDACTED]");
    expect(entry.ctx?.["apiKey"]).toBe("[REDACTED]");
    expect(entry.ctx?.["Authorization"]).toBe("[REDACTED]");
    expect((entry.ctx?.["nested"] as Record<string, unknown>)["token"]).toBe("[REDACTED]");
    expect((entry.ctx?.["nested"] as Record<string, unknown>)["safeField"]).toBe("account-list");

    const pinoLogger = createPinoLogger("error");
    pinoLogger.debug("suppressed");
    const silentLogger = createPinoLogger("silent");
    silentLogger.info("test");
    expect(redactLogContext(undefined)).toBeUndefined();
  });

  it("sanitizes error messages so credentials never leak", () => {
    const raw =
      'Failed request with Authorization: Basic ZGVtbzpQYXNzMTIz and ?apikey=39478ac6 and {"password":"my-password"}';
    const clean = sanitizeErrorMessage(raw);
    expect(clean).not.toContain("ZGVtbzpQYXNzMTIz");
    expect(clean).not.toContain("39478ac6");
    expect(clean).not.toContain("my-password");
    expect(clean).toContain("[REDACTED]");
  });
});

describe("Authentication and single-flight concurrency", () => {
  it("applies Basic auth header, apikey, and CompanyId query params", async () => {
    const auth = new BasicAndApiKeyAuthenticator({
      credentials: { username: "user@example.com", password: "Password123" },
      apiKey: "{key-123}",
      companyId: 99,
    });

    const applied = await auth.apply({
      url: new URL("https://accounting.sageone.co.za/api/2.0.0/Account/Get"),
      headers: {},
      requiresAuthentication: true,
    });

    expect(applied.url.searchParams.get("apikey")).toBe("{key-123}");
    expect(applied.url.searchParams.get("CompanyId")).toBe("99");
    const expectedBasic = Buffer.from("user@example.com:Password123", "utf8").toString("base64");
    expect(applied.headers["Authorization"]).toBe(`Basic ${expectedBasic}`);
  });

  it("throws SageAuthenticationError when credentials are missing on authenticated endpoint", async () => {
    const auth = new BasicAndApiKeyAuthenticator({});
    await expect(
      auth.apply({
        url: new URL("https://accounting.sageone.co.za/api/2.0.0/Account/Get"),
        headers: {},
        requiresAuthentication: true,
      }),
    ).rejects.toThrow(SageAuthenticationError);
  });

  it("coalesces concurrent authenticate() calls into a single network request (single-flight)", async () => {
    let fetchCalls = 0;
    const mockFetch: typeof fetch = vi.fn(async () => {
      fetchCalls += 1;
      await new Promise((r) => setTimeout(r, 20));
      return new Response("true", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });

    const auth = new BasicAndApiKeyAuthenticator({
      credentials: { username: "user@example.com", password: "Password123" },
      apiKey: "{key-123}",
    });

    const [r1, r2, r3] = await Promise.all([
      auth.authenticate({ baseUrl: DEFAULT_BASE_URL, fetch: mockFetch }),
      auth.authenticate({ baseUrl: DEFAULT_BASE_URL, fetch: mockFetch }),
      auth.authenticate({ baseUrl: DEFAULT_BASE_URL, fetch: mockFetch }),
    ]);

    expect(fetchCalls).toBe(1);
    expect(r1.authenticated).toBe(true);
    expect(r2.authenticated).toBe(true);
    expect(r3.authenticated).toBe(true);
  });
});

describe("Runtime validation & OData / Pagination", () => {
  it("validates requests strictly and responses with passthrough, redacting sensitive fields on error", () => {
    const schema = z.object({ Username: z.string(), Password: z.string().min(8) }).strict();

    expect(() =>
      validateRequestPayload(
        schema,
        { Username: "user", Password: "123" },
        { resource: "Login", operation: "Validate" },
      ),
    ).toThrow(SageValidationError);

    try {
      validateRequestPayload(
        schema,
        { Username: "user", Password: "123" },
        { resource: "Login", operation: "Validate" },
      );
    } catch (e) {
      expect(e).toBeInstanceOf(SageValidationError);
      const valErr = e as SageValidationError;
      expect(valErr.issues[0]?.received).toBeUndefined();
    }

    const resSchema = z.object({ ID: z.number().int() }).passthrough();
    const parsed = validateResponsePayload(
      resSchema,
      { ID: 10, FutureSageField: "preserved" },
      { resource: "Account", operation: "GetById", status: 200 },
    );
    expect(parsed).toEqual({ ID: 10, FutureSageField: "preserved" });

    expect(() =>
      validateResponsePayload(
        resSchema,
        { ID: "wrong-type" },
        { resource: "Account", operation: "GetById", status: 200 },
      ),
    ).toThrow(SageResponseError);

    const numEnum = createForwardCompatibleEnumSchema([0, 1, 2] as const, "number");
    expect(numEnum.parse(99)).toBe(99);
    const strEnum = createForwardCompatibleEnumSchema(["A", "B"] as const, "string");
    expect(strEnum.parse("FUTURE")).toBe("FUTURE");
  });

  it("constructs typed OData queries and paginates safely with maxPages / maxItems limits", async () => {
    interface SampleModel {
      readonly ID: number;
      readonly Name: string;
      readonly Active: boolean;
    }

    const q = odata<SampleModel>()
      .filter("Active", "eq", true)
      .filter("Name", "ne", "O'Reilly")
      .rawFilter("ID gt 5")
      .select("ID", "Name")
      .orderBy("Name", "asc")
      .rawOrderBy("ID desc")
      .expand("Category")
      .top(25)
      .skip(50)
      .count(true);

    const params = q.toParams();
    expect(params.$filter).toBe("Active eq true and Name ne 'O''Reilly' and ID gt 5");
    expect(params.$select).toBe("ID,Name");
    expect(params.$orderby).toBe("Name asc,ID desc");
    expect(params.$expand).toBe("Category");
    expect(params.$top).toBe(25);
    expect(params.$skip).toBe(50);
    expect(params.$count).toBe(true);
    expect(q.build()).toContain("%24filter=");

    const items: number[] = [];
    for await (const item of paginateItems<number>(
      async ({ skip }) => ({
        TotalResults: 10,
        ReturnedResults: 2,
        Results: [skip + 1, skip + 2],
      }),
      { pageSize: 2, maxItems: 5 },
    )) {
      items.push(item);
    }
    expect(items).toEqual([1, 2, 3, 4, 5]);

    const pages: number[] = [];
    for await (const env of paginatePages<number>(
      async ({ skip }) => ({
        TotalResults: 100,
        ReturnedResults: 2,
        Results: [skip + 1, skip + 2],
      }),
      { pageSize: 2, maxPages: 2 },
    )) {
      pages.push(env.pageNumber);
    }
    expect(pages).toEqual([1, 2]);
  });
});

describe("HTTP transport retry policy, timeouts, and error mapping", () => {
  it("retries transient GET failures (503) but NEVER retries financial mutations (POST)", async () => {
    let getAttempts = 0;
    let postAttempts = 0;

    const mockFetch: typeof fetch = vi.fn(async (input, init) => {
      const method = init?.method ?? "GET";
      if (method === "GET") {
        getAttempts += 1;
        if (getAttempts < 3) {
          return new Response("Service Unavailable", { status: 503 });
        }
        return new Response(JSON.stringify({ TotalResults: 0, ReturnedResults: 0, Results: [] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      postAttempts += 1;
      return new Response("Service Unavailable", { status: 503 });
    });

    const client = new SageOneClient({
      credentials: { username: "u", password: "p" },
      apiKey: "k",
      companyId: 1,
      retry: { enabled: true, maxAttempts: 3, baseDelayMs: 1 },
      transport: { fetch: mockFetch },
    });

    const listRes = await client.accounts.list();
    expect(getAttempts).toBe(3);
    expect(listRes.TotalResults).toBe(0);

    await expect(client.accounts.save({ Name: "Sales" })).rejects.toThrow(SageApiError);
    expect(postAttempts).toBe(1);
  });

  it("maps 401, 402/403, 404, 409, 429, 500, malformed JSON, timeout, and abort to distinct SageError subclasses", async () => {
    const makeTransport = (handler: typeof fetch) => {
      const cfg = resolveConfig({
        credentials: { username: "u", password: "p" },
        retry: { enabled: false },
        timeout: 30,
        transport: { fetch: handler },
      });
      return new SageTransport({
        config: cfg,
        authenticator: new BasicAndApiKeyAuthenticator({
          credentials: cfg.credentials,
        }),
      });
    };

    const runStatus = (
      status: number,
      headers?: Record<string, string>,
      body = '{"error":"msg"}',
    ) =>
      makeTransport(
        async () => new Response(body, headers ? { status, headers } : { status }),
      ).execute({
        resource: "Account",
        operation: "GetById",
        method: "GET",
        path: "/Account/Get/1",
      });

    await expect(runStatus(401)).rejects.toBeInstanceOf(SageAuthenticationError);
    await expect(runStatus(402)).rejects.toBeInstanceOf(SageAuthorizationError);
    await expect(runStatus(403)).rejects.toBeInstanceOf(SageAuthorizationError);
    await expect(runStatus(404)).rejects.toBeInstanceOf(SageNotFoundError);
    await expect(runStatus(409)).rejects.toBeInstanceOf(SageConflictError);

    try {
      await runStatus(429, { "Retry-After": "60" });
    } catch (e) {
      expect(e).toBeInstanceOf(SageRateLimitError);
      expect((e as SageRateLimitError).retryAfterSeconds).toBe(60);
    }

    await expect(runStatus(500)).rejects.toBeInstanceOf(SageApiError);
    await expect(runStatus(200, {}, "not-valid-json{{{")).rejects.toBeInstanceOf(SageResponseError);

    const timeoutTransport = makeTransport(
      async (_url, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(init.signal?.reason ?? new Error("aborted"));
          });
        }),
    );

    await expect(
      timeoutTransport.execute({
        resource: "Account",
        operation: "Get",
        method: "GET",
        path: "/Account/Get",
        timeout: 15,
      }),
    ).rejects.toBeInstanceOf(SageTimeoutError);

    const abortController = new AbortController();
    abortController.abort(new Error("user cancelled"));
    await expect(
      timeoutTransport.execute({
        resource: "Account",
        operation: "Get",
        method: "GET",
        path: "/Account/Get",
        signal: abortController.signal,
      }),
    ).rejects.toBeInstanceOf(SageTimeoutError);

    const networkTransport = makeTransport(async () => {
      throw new TypeError("fetch failed: ECONNRESET");
    });
    await expect(
      networkTransport.execute({
        resource: "Account",
        operation: "Get",
        method: "GET",
        path: "/Account/Get",
      }),
    ).rejects.toBeInstanceOf(SageNetworkError);
  });
});

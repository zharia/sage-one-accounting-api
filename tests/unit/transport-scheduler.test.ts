/**
 * Central request scheduler tests (M008 WP008.2 §5.2.8).
 *
 * Deterministic: fake timers only — no real-world delays.
 *
 * Covers: concurrency limits, per-company isolation, queue ordering,
 * cancellation before dispatch and during execution, Retry-After
 * (delta-seconds, HTTP-date, invalid), exponential backoff, jitter bounds,
 * 429 lane suspension, GET retry, mutation retry restrictions, timeout,
 * scheduler shutdown, queue observability and scheduler config validation.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { BasicAndApiKeyAuthenticator } from "../../src/auth/index.js";
import {
  resolveConfig,
  type SageOneConfigInput,
  type ResolvedSageOneConfig,
} from "../../src/config/index.js";
import { SageConfigurationError, SageError, SageTimeoutError } from "../../src/errors/index.js";
import {
  computeBackoffDelayMs,
  parseRetryAfterMs,
  RequestScheduler,
  SageTransport,
} from "../../src/transport/index.js";

/** Flush pending microtasks and zero-delay fake timers. */
const flush = async (): Promise<void> => {
  await vi.advanceTimersByTimeAsync(0);
};

function acquireOptions(overrides: Partial<Parameters<RequestScheduler["acquire"]>[0]> = {}) {
  return {
    lane: "1",
    signal: undefined,
    correlationId: "test-correlation",
    method: "GET",
    resource: "Account",
    operation: "Get",
    ...overrides,
  };
}

function makeTransport(
  handler: typeof fetch,
  input: SageOneConfigInput = {},
): { transport: SageTransport; config: ResolvedSageOneConfig } {
  const config = resolveConfig({
    credentials: { username: "u", password: "p" },
    companyId: 1,
    retry: { enabled: true, maxAttempts: 3, baseDelayMs: 100 },
    scheduler: { jitter: false },
    transport: { fetch: handler },
    ...input,
  });
  const transport = new SageTransport({
    config,
    authenticator: new BasicAndApiKeyAuthenticator({ credentials: config.credentials }),
  });
  return { transport, config };
}

const okJson = (): Response =>
  new Response(JSON.stringify({ TotalResults: 0, ReturnedResults: 0, Results: [] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("Retry-After parsing (WP008.2 5.2.4)", () => {
  it("parses delta-seconds", () => {
    expect(parseRetryAfterMs("60", 0)).toBe(60_000);
    expect(parseRetryAfterMs("0", 0)).toBe(0);
  });

  it("parses HTTP-date relative to now", () => {
    const now = Date.UTC(2026, 0, 1, 12, 0, 0);
    const header = new Date(now + 5_000).toUTCString();
    expect(parseRetryAfterMs(header, now)).toBe(5_000);
    // Past dates clamp to zero — retry immediately, never a negative wait.
    expect(parseRetryAfterMs(new Date(now - 10_000).toUTCString(), now)).toBe(0);
  });

  it("rejects missing or invalid values instead of guessing", () => {
    expect(parseRetryAfterMs(null)).toBeNull();
    expect(parseRetryAfterMs("")).toBeNull();
    expect(parseRetryAfterMs("   ")).toBeNull();
    expect(parseRetryAfterMs("soon")).toBeNull();
    expect(parseRetryAfterMs("60abc")).toBeNull(); // full string must be numeric
    expect(parseRetryAfterMs("-5")).toBeNull();
  });
});

describe("Exponential backoff with jitter (WP008.2 5.2.4)", () => {
  it("grows exponentially and honours the cap when jitter is off", () => {
    expect(computeBackoffDelayMs(1, 100, 30_000, false)).toBe(100);
    expect(computeBackoffDelayMs(2, 100, 30_000, false)).toBe(200);
    expect(computeBackoffDelayMs(3, 100, 30_000, false)).toBe(400);
    expect(computeBackoffDelayMs(10, 100, 30_000, false)).toBe(30_000); // capped
    expect(computeBackoffDelayMs(1, 0, 30_000, false)).toBe(0);
  });

  it("full jitter stays within [0, cappedExponential] (injectable random)", () => {
    const exponential = 400; // attempt 3, base 100
    expect(computeBackoffDelayMs(3, 100, 30_000, true, () => 0)).toBe(0);
    expect(computeBackoffDelayMs(3, 100, 30_000, true, () => 1)).toBe(exponential);
    expect(computeBackoffDelayMs(3, 100, 30_000, true, () => 0.5)).toBe(200);
    expect(computeBackoffDelayMs(3, 100, 30_000, true, () => 0.25)).toBe(100);
  });
});

describe("RequestScheduler queue mechanics (WP008.2 5.2.3)", () => {
  it("enforces the configurable concurrency limit", async () => {
    const scheduler = new RequestScheduler({ maxConcurrency: 2, minIntervalMs: 0 });
    const permits = [
      scheduler.acquire(acquireOptions()),
      scheduler.acquire(acquireOptions()),
      scheduler.acquire(acquireOptions()),
      scheduler.acquire(acquireOptions()),
      scheduler.acquire(acquireOptions()),
    ];
    const settled: boolean[] = permits.map(() => false);
    permits.forEach((p, i) => {
      void p.then(() => {
        settled[i] = true;
      });
    });

    await flush();
    expect(settled).toEqual([true, true, false, false, false]);
    expect(scheduler.snapshot().active).toBe(2);
    expect(scheduler.snapshot().pending).toBe(3);

    // Release one at a time: each release admits exactly one queued request.
    for (const index of [0, 1, 2, 3]) {
      const permit = (await permits[index]) as { release(): void };
      permit.release();
      await flush();
      expect(scheduler.snapshot().active).toBe(index < 2 ? 2 : Math.min(4 - index, 2));
    }
    expect(scheduler.snapshot().active).toBe(1); // permit 4 still held
    expect(scheduler.snapshot().pending).toBe(0);
    ((await permits[4]) as { release(): void }).release();
    await flush();
    expect(scheduler.snapshot().active).toBe(0);
  });

  it("isolates companies: a suspended lane does not block other lanes", async () => {
    const scheduler = new RequestScheduler({ maxConcurrency: 4, minIntervalMs: 0 });
    scheduler.suspend("blocked", 60_000);

    const blocked = scheduler.acquire(acquireOptions({ lane: "blocked" }));
    const other = scheduler.acquire(acquireOptions({ lane: "other" }));
    let blockedSettled = false;
    void blocked.then(() => {
      blockedSettled = true;
    });

    await flush();
    expect(blockedSettled).toBe(false);
    const otherPermit = await other;
    otherPermit.release();

    const snapshot = scheduler.snapshot();
    expect(snapshot.pending).toBe(1);
    expect(snapshot.lanes).toContainEqual({
      lane: "blocked",
      pending: 1,
      suspendedUntil: expect.any(Number),
    });

    await vi.advanceTimersByTimeAsync(60_000);
    const blockedPermit = await blocked;
    blockedPermit.release();
    expect(scheduler.snapshot().active).toBe(0);
  });

  it("dispatches FIFO within a lane", async () => {
    const scheduler = new RequestScheduler({ maxConcurrency: 1, minIntervalMs: 0 });
    const order: number[] = [];
    const runs = [0, 1, 2].map((i) =>
      scheduler.acquire(acquireOptions()).then((permit) => {
        order.push(i);
        return permit;
      }),
    );

    await flush();
    expect(order).toEqual([0]);
    ((await runs[0]) as { release(): void }).release();
    await flush();
    expect(order).toEqual([0, 1]);
    ((await runs[1]) as { release(): void }).release();
    await flush();
    expect(order).toEqual([0, 1, 2]);
    ((await runs[2]) as { release(): void }).release();
  });

  it("cancels a queued request before dispatch — it never runs", async () => {
    const scheduler = new RequestScheduler({ maxConcurrency: 1, minIntervalMs: 0 });
    const held = await scheduler.acquire(acquireOptions());

    const controller = new AbortController();
    const cancelled = scheduler.acquire(acquireOptions({ signal: controller.signal }));
    const next = scheduler.acquire(acquireOptions({ lane: "other" }));
    let cancelledDispatched = false;
    void cancelled.then(
      () => {
        cancelledDispatched = true;
      },
      () => undefined,
    );

    await flush();
    controller.abort(new Error("caller cancelled"));
    await expect(cancelled).rejects.toMatchObject({
      isAborted: true,
      code: "SAGE_TIMEOUT_ERROR",
    });
    await flush();
    expect(cancelledDispatched).toBe(false);
    // Cancelled entry removed; only the unrelated queued request remains.
    expect(scheduler.snapshot().pending).toBe(1);

    held.release();
    const nextPermit = await next; // queue slot freed for others
    nextPermit.release();
    await flush();
    expect(scheduler.snapshot().active).toBe(0);
  });

  it("rejects pre-aborted signals without enqueueing", async () => {
    const scheduler = new RequestScheduler({ maxConcurrency: 1, minIntervalMs: 0 });
    const controller = new AbortController();
    controller.abort();
    await expect(
      scheduler.acquire(acquireOptions({ signal: controller.signal })),
    ).rejects.toMatchObject({ isAborted: true, code: "SAGE_TIMEOUT_ERROR" });
    expect(scheduler.snapshot().pending).toBe(0);
  });

  it("logs enqueue/dispatch with queue wait and safe fields only", async () => {
    const debug = vi.fn();
    const scheduler = new RequestScheduler({
      maxConcurrency: 1,
      minIntervalMs: 0,
      logger: { debug, info: vi.fn(), warn: vi.fn(), error: vi.fn() },
    });
    const held = await scheduler.acquire(acquireOptions());
    const queued = scheduler.acquire(acquireOptions({ resource: "Invoice", operation: "Save" }));
    await flush();
    held.release();
    const permit = await queued;
    permit.release();

    const events = debug.mock.calls.map((call) => call[0] as string);
    expect(events).toContain("scheduler.enqueue");
    expect(events).toContain("scheduler.dispatch");
    interface DispatchContext {
      lane?: string;
      resource?: string;
      operation?: string;
      queueWaitMs?: number;
    }
    const dispatch = debug.mock.calls.find(
      (call) =>
        call[0] === "scheduler.dispatch" && (call[1] as DispatchContext).resource === "Invoice",
    );
    const context = dispatch?.[1] as DispatchContext;
    expect(context).toMatchObject({ lane: "1", resource: "Invoice", operation: "Save" });
    expect(typeof context.queueWaitMs).toBe("number");
    // No credential-shaped keys ever reach the logger (5.2.7).
    for (const key of Object.keys(context)) {
      expect(key).not.toMatch(/authorization|apikey|token|password|cookie/i);
    }
  });

  it("shuts down gracefully: drains queue, rejects new work", async () => {
    const scheduler = new RequestScheduler({ maxConcurrency: 1, minIntervalMs: 0 });
    const inFlight = await scheduler.acquire(acquireOptions());
    const queued = scheduler.acquire(acquireOptions({ resource: "Invoice" }));

    const shutdown = scheduler.shutdown();
    let shutdownDone = false;
    void shutdown.then(() => {
      shutdownDone = true;
    });

    await flush();
    expect(shutdownDone).toBe(false);
    await expect(scheduler.acquire(acquireOptions({ resource: "Late" }))).rejects.toMatchObject({
      code: "SAGE_SCHEDULER_SHUTDOWN",
    });
    expect((await scheduler.snapshot()).running).toBe(false);

    inFlight.release();
    await flush();
    expect(shutdownDone).toBe(false); // queued request still draining

    const queuedPermit = await queued;
    queuedPermit.release();
    await shutdown;
    expect(shutdownDone).toBe(true);
    expect(scheduler.snapshot()).toMatchObject({ active: 0, pending: 0 });
  });
});

describe("Scheduler config (WP008.2 5.2.3)", () => {
  it("resolves documented defaults", () => {
    const config = resolveConfig({ credentials: { username: "u", password: "p" } });
    expect(config.scheduler).toEqual({
      maxConcurrency: 4,
      minIntervalMs: 0,
      maxRetryAfterMs: 60_000,
      maxBackoffMs: 30_000,
      jitter: true,
    });
  });

  it("rejects invalid scheduler settings", () => {
    expect(() => resolveConfig({ scheduler: { maxConcurrency: 0 } })).toThrow(
      SageConfigurationError,
    );
    expect(() => resolveConfig({ scheduler: { minIntervalMs: -1 } })).toThrow(
      SageConfigurationError,
    );
    expect(() => resolveConfig({ scheduler: { jitter: "yes" as unknown as boolean } })).toThrow(
      SageConfigurationError,
    );
  });
});

describe("Transport scheduling integration (WP008.2 5.2.4-5.2.8)", () => {
  it("honours Retry-After delta-seconds before the next attempt", async () => {
    let calls = 0;
    const { transport } = makeTransport(async () => {
      calls += 1;
      if (calls === 1) {
        return new Response("{}", { status: 429, headers: { "Retry-After": "2" } });
      }
      return okJson();
    });

    const result = transport.execute({
      resource: "Account",
      operation: "Get",
      method: "GET",
      path: "/Account/Get",
    });
    await flush();
    expect(calls).toBe(1);

    await vi.advanceTimersByTimeAsync(1_999);
    expect(calls).toBe(1); // not before the server-provided delay
    await vi.advanceTimersByTimeAsync(1);
    expect(calls).toBe(2);
    await expect(result).resolves.toBeTruthy();
  });

  it("honours Retry-After HTTP-date before the next attempt", async () => {
    let calls = 0;
    const start = Date.now();
    const header = new Date(start + 3_000).toUTCString();
    const expectedDelay = Math.max(0, Date.parse(header) - start);

    const { transport } = makeTransport(async () => {
      calls += 1;
      if (calls === 1) {
        return new Response("{}", { status: 429, headers: { "Retry-After": header } });
      }
      return okJson();
    });

    const result = transport.execute({
      resource: "Account",
      operation: "Get",
      method: "GET",
      path: "/Account/Get",
    });
    await flush();
    expect(calls).toBe(1);

    await vi.advanceTimersByTimeAsync(expectedDelay - 1);
    expect(calls).toBe(1);
    await vi.advanceTimersByTimeAsync(1);
    expect(calls).toBe(2);
    await expect(result).resolves.toBeTruthy();
  });

  it("falls back to exponential backoff when Retry-After is invalid", async () => {
    let calls = 0;
    const { transport } = makeTransport(
      async () => {
        calls += 1;
        if (calls === 1) {
          return new Response("{}", { status: 429, headers: { "Retry-After": "soon" } });
        }
        return okJson();
      },
      { retry: { enabled: true, maxAttempts: 3, baseDelayMs: 500 }, scheduler: { jitter: false } },
    );

    const result = transport.execute({
      resource: "Account",
      operation: "Get",
      method: "GET",
      path: "/Account/Get",
    });
    await flush();
    expect(calls).toBe(1);
    await vi.advanceTimersByTimeAsync(499);
    expect(calls).toBe(1); // backoff applied, not an instant retry
    await vi.advanceTimersByTimeAsync(1);
    expect(calls).toBe(2);
    await expect(result).resolves.toBeTruthy();
  });

  it("retries GET with exponential backoff (503, 503, 200)", async () => {
    let calls = 0;
    const { transport } = makeTransport(async () => {
      calls += 1;
      return calls < 3 ? new Response("Service Unavailable", { status: 503 }) : okJson();
    });

    const result = transport.execute({
      resource: "Account",
      operation: "Get",
      method: "GET",
      path: "/Account/Get",
    });
    await flush();
    expect(calls).toBe(1);
    await vi.advanceTimersByTimeAsync(100); // base 100, jitter off
    expect(calls).toBe(2);
    await vi.advanceTimersByTimeAsync(200); // 2^1 * 100
    expect(calls).toBe(3);
    await expect(result).resolves.toBeTruthy();
  });

  it("never auto-retries mutations (POST 503 = single attempt)", async () => {
    let calls = 0;
    const { transport } = makeTransport(async () => {
      calls += 1;
      return new Response("Service Unavailable", { status: 503 });
    });

    await expect(
      transport.execute({
        resource: "TaxInvoice",
        operation: "Save",
        method: "POST",
        path: "/TaxInvoice/Save",
        isFinancialMutation: true,
        body: { Date: "2026-01-01" },
      }),
    ).rejects.toThrow();
    expect(calls).toBe(1);
  });

  it("suspends only the affected company lane on 429", async () => {
    let laneOneCalls = 0;
    let laneTwoCalls = 0;
    const { transport } = makeTransport(async (input) => {
      const url = String(input);
      if (url.includes("CompanyId=2")) {
        laneTwoCalls += 1;
        return okJson();
      }
      laneOneCalls += 1;
      if (laneOneCalls === 1) {
        return new Response("{}", { status: 429, headers: { "Retry-After": "60" } });
      }
      return okJson();
    });

    const limited = transport.execute({
      resource: "Account",
      operation: "Get",
      method: "GET",
      path: "/Account/Get",
    });
    const unrelated = transport.execute({
      resource: "Account",
      operation: "Get",
      method: "GET",
      path: "/Account/Get",
      companyId: 2,
    });

    await flush();
    expect(laneOneCalls).toBe(1);
    // Unrelated company is NOT suspended (5.2.3 isolation).
    await expect(unrelated).resolves.toBeTruthy();
    expect(laneTwoCalls).toBe(1);

    const snapshot = transport.schedulerSnapshot();
    expect(snapshot.lanes).toContainEqual(expect.objectContaining({ lane: "1", pending: 1 }));

    await vi.advanceTimersByTimeAsync(59_999);
    expect(laneOneCalls).toBe(1); // still suspended
    await vi.advanceTimersByTimeAsync(1);
    expect(laneOneCalls).toBe(2);
    await expect(limited).resolves.toBeTruthy();
  });

  it("preserves the original 429 error when Retry-After exceeds max-wait policy", async () => {
    let calls = 0;
    const { transport } = makeTransport(
      async () => {
        calls += 1;
        return new Response("{}", { status: 429, headers: { "Retry-After": "3600" } });
      },
      { scheduler: { maxRetryAfterMs: 60_000, jitter: false } },
    );

    await expect(
      transport.execute({
        resource: "Account",
        operation: "Get",
        method: "GET",
        path: "/Account/Get",
      }),
    ).rejects.toMatchObject({ code: "SAGE_RATE_LIMIT_ERROR", retryAfterSeconds: 3600 });
    expect(calls).toBe(1); // waited nothing, error preserved
  });

  it("times out an in-flight request (queue wait excluded)", async () => {
    const { transport } = makeTransport(
      (_input, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(init?.signal?.reason ?? new Error("aborted"));
          });
        }),
      { retry: { enabled: false }, timeout: 30 },
    );

    const result = transport.execute({
      resource: "Account",
      operation: "Get",
      method: "GET",
      path: "/Account/Get",
    });
    const assertion = expect(result).rejects.toMatchObject({
      code: "SAGE_TIMEOUT_ERROR",
      isAborted: false,
    });
    await vi.advanceTimersByTimeAsync(30);
    await assertion;
  });

  it("cancels an in-flight request via caller AbortSignal", async () => {
    const { transport } = makeTransport(
      (_input, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(init?.signal?.reason ?? new Error("aborted"));
          });
        }),
      { retry: { enabled: false } },
    );

    const controller = new AbortController();
    const result = transport.execute({
      resource: "Account",
      operation: "Get",
      method: "GET",
      path: "/Account/Get",
      signal: controller.signal,
    });
    const assertion = expect(result).rejects.toMatchObject({
      code: "SAGE_TIMEOUT_ERROR",
      isAborted: true,
    });
    await flush();
    controller.abort(new Error("caller cancelled"));
    await assertion;
  });

  it("exposes queue state and shuts down through the transport", async () => {
    let releaseFetch: (() => void) | undefined;
    const { transport } = makeTransport(
      () =>
        new Promise<Response>((resolve) => {
          releaseFetch = () => resolve(okJson());
        }),
      { retry: { enabled: false } },
    );

    const inFlight = transport.execute({
      resource: "Account",
      operation: "Get",
      method: "GET",
      path: "/Account/Get",
    });
    await flush();
    expect(transport.schedulerSnapshot()).toMatchObject({ running: true, active: 1, pending: 0 });

    const shutdown = transport.shutdown();
    let shutdownDone = false;
    void shutdown.then(() => {
      shutdownDone = true;
    });
    await flush();
    expect(shutdownDone).toBe(false);
    await expect(
      transport.execute({
        resource: "Account",
        operation: "Get",
        method: "GET",
        path: "/Account/Get",
      }),
    ).rejects.toBeInstanceOf(SageError);

    releaseFetch?.();
    await expect(inFlight).resolves.toBeTruthy();
    await shutdown;
    expect(shutdownDone).toBe(true);
  });
});

describe("Error surface", () => {
  it("scheduler shutdown rejection carries the documented code", async () => {
    const scheduler = new RequestScheduler({ maxConcurrency: 1, minIntervalMs: 0 });
    await scheduler.shutdown();
    const error = await scheduler.acquire(acquireOptions()).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(SageError);
    expect((error as SageError).code).toBe("SAGE_SCHEDULER_SHUTDOWN");
  });

  it("queued cancellation rejects with SageTimeoutError(isAborted)", async () => {
    const scheduler = new RequestScheduler({ maxConcurrency: 1, minIntervalMs: 0 });
    const held = await scheduler.acquire(acquireOptions());
    const controller = new AbortController();
    const queued = scheduler.acquire(acquireOptions({ signal: controller.signal }));
    controller.abort();
    const error = await queued.catch((e: unknown) => e);
    expect(error).toBeInstanceOf(SageTimeoutError);
    expect((error as SageTimeoutError).isAborted).toBe(true);
    held.release();
  });
});

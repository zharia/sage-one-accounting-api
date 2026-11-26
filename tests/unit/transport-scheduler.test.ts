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
import {
  SageAuthenticationError,
  SageConfigurationError,
  SageError,
  SageTimeoutError,
} from "../../src/errors/index.js";
import { SageOneClient } from "../../src/client/index.js";
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
  const { scheduler: schedulerInput, ...rest } = input;
  const config = resolveConfig({
    credentials: { username: "u", password: "p" },
    companyId: 1,
    retry: { enabled: true, maxAttempts: 3, baseDelayMs: 100 },
    ...rest,
    // pacing default (1000 ms) asserted separately; jitter off for determinism
    scheduler: { jitter: false, minIntervalMs: 0, ...schedulerInput },
    transport: { fetch: handler },
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

  it("paces dispatches within a lane under the fake clock (WP008.2R 3.4)", async () => {
    const scheduler = new RequestScheduler({ maxConcurrency: 4, minIntervalMs: 1_000 });
    const t0 = Date.now();
    const first = await scheduler.acquire(acquireOptions());

    const dispatchedAt: number[] = [];
    const second = scheduler.acquire(acquireOptions()).then((permit) => {
      dispatchedAt.push(Date.now());
      return permit;
    });

    await flush();
    expect(dispatchedAt).toEqual([]); // paced — no immediate second dispatch

    await vi.advanceTimersByTimeAsync(999);
    expect(dispatchedAt).toEqual([]); // one millisecond short of the interval

    await vi.advanceTimersByTimeAsync(1);
    expect(dispatchedAt).toHaveLength(1);
    expect((dispatchedAt[0] as number) - t0).toBe(1_000); // deterministic fake-clock timing

    first.release();
    (await second).release();
    expect(scheduler.snapshot().active).toBe(0);
  });

  it("concurrent requests in one lane cannot bypass pacing (WP008.2R 3.4)", async () => {
    const scheduler = new RequestScheduler({ maxConcurrency: 8, minIntervalMs: 1_000 });
    let dispatched = 0;
    const permits = [0, 1, 2].map(() =>
      scheduler.acquire(acquireOptions()).then((permit) => {
        dispatched += 1;
        return permit;
      }),
    );

    await flush();
    expect(dispatched).toBe(1); // only the first dispatches immediately

    await vi.advanceTimersByTimeAsync(1_000);
    expect(dispatched).toBe(2);

    await vi.advanceTimersByTimeAsync(1_000);
    expect(dispatched).toBe(3);

    for (const permit of await Promise.all(permits)) {
      permit.release();
    }
    expect(scheduler.snapshot().active).toBe(0);
  });

  it("a paced lane does not block an independent lane (WP008.2R 3.4/3.6)", async () => {
    const scheduler = new RequestScheduler({ maxConcurrency: 4, minIntervalMs: 1_000 });
    const paced = await scheduler.acquire(acquireOptions({ lane: "paced" }));

    let otherDispatched = false;
    const other = scheduler.acquire(acquireOptions({ lane: "other" })).then((permit) => {
      otherDispatched = true;
      return permit;
    });
    await flush();
    expect(otherDispatched).toBe(true); // independent lane dispatches immediately

    paced.release();
    (await other).release();
    expect(scheduler.snapshot().active).toBe(0);
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

describe("Scheduler config (WP008.2 5.2.3 / WP008.2R 3.4)", () => {
  it("resolves documented defaults (Sage ≤1 req/s guidance, 1 h block fallback)", () => {
    const config = resolveConfig({ credentials: { username: "u", password: "p" } });
    expect(config.scheduler).toEqual({
      maxConcurrency: 4,
      minIntervalMs: 1_000, // Sage published guidance: ≤1 request/second
      maxRetryAfterMs: 60_000,
      rateLimitFallbackMs: 3_600_000, // documented one-hour block
      maxBackoffMs: 30_000,
      jitter: true,
    });
  });

  it("explicit configuration overrides the pacing and fallback defaults", () => {
    const config = resolveConfig({
      credentials: { username: "u", password: "p" },
      scheduler: { minIntervalMs: 250, rateLimitFallbackMs: 5_000 },
    });
    expect(config.scheduler.minIntervalMs).toBe(250);
    expect(config.scheduler.rateLimitFallbackMs).toBe(5_000);
    // untouched defaults preserved — no silent reinterpretation
    expect(config.scheduler.maxConcurrency).toBe(4);
    expect(config.scheduler.maxRetryAfterMs).toBe(60_000);
  });

  it("rejects invalid scheduler settings", () => {
    expect(() => resolveConfig({ scheduler: { maxConcurrency: 0 } })).toThrow(
      SageConfigurationError,
    );
    expect(() => resolveConfig({ scheduler: { minIntervalMs: -1 } })).toThrow(
      SageConfigurationError,
    );
    expect(() => resolveConfig({ scheduler: { rateLimitFallbackMs: -1 } })).toThrow(
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

  it("missing/invalid Retry-After surfaces SageRateLimitError immediately (no probing)", async () => {
    let calls = 0;
    const { transport } = makeTransport(
      async () => {
        calls += 1;
        return new Response("{}", { status: 429, headers: { "Retry-After": "soon" } });
      },
      // retries ENABLED: even then a 429 without a valid Retry-After must not
      // fall into exponential-backoff retry (WP008.2R §4.3)
      { retry: { enabled: true, maxAttempts: 3, baseDelayMs: 500 } },
    );

    await expect(
      transport.execute({
        resource: "Account",
        operation: "Get",
        method: "GET",
        path: "/Account/Get",
      }),
    ).rejects.toMatchObject({ code: "SAGE_RATE_LIMIT_ERROR" });

    await flush();
    expect(calls).toBe(1); // never retried — the server said stop
    await vi.advanceTimersByTimeAsync(60_000);
    expect(calls).toBe(1); // still nothing during fallback suspension

    // Lane suspended for the documented block policy (default 1 h)
    const snapshot = transport.schedulerSnapshot();
    expect(snapshot.lanes).toEqual([
      expect.objectContaining({ lane: "1", suspendedUntil: expect.any(Number) }),
    ]);
    const suspendedUntil = snapshot.lanes[0]?.suspendedUntil ?? 0;
    expect(suspendedUntil - Date.now()).toBeGreaterThanOrEqual(3_600_000 - 60_000);
  });

  it("missing Retry-After header follows the same conservative policy", async () => {
    let calls = 0;
    const { transport } = makeTransport(async () => {
      calls += 1;
      return new Response("{}", { status: 429 });
    });

    await expect(
      transport.execute({
        resource: "Account",
        operation: "Get",
        method: "GET",
        path: "/Account/Get",
      }),
    ).rejects.toMatchObject({ code: "SAGE_RATE_LIMIT_ERROR", retryAfterSeconds: undefined });
    expect(calls).toBe(1);
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

  it("long Retry-After suspends the lane for the FULL server delay despite max-wait (WP008.2R 4.6)", async () => {
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
    expect(calls).toBe(1);

    const snapshot = transport.schedulerSnapshot();
    const suspendedUntil = snapshot.lanes[0]?.suspendedUntil ?? 0;
    // Lane refuses to dispatch for the full server-directed hour — the
    // client's max-wait policy must never shorten it.
    expect(suspendedUntil - Date.now()).toBeGreaterThanOrEqual(3_600_000 - 1_000);
    await vi.advanceTimersByTimeAsync(59_000);
    expect(calls).toBe(1); // no premature resumption
  });

  it("abort during retry backoff rejects with SageTimeoutError(isAborted) and never fetches again (WP008.2R 5.3)", async () => {
    let calls = 0;
    const controller = new AbortController();
    const { transport } = makeTransport(
      async () => {
        calls += 1;
        return new Response("Service Unavailable", { status: 503 });
      },
      {
        retry: { enabled: true, maxAttempts: 3, baseDelayMs: 5_000 },
        scheduler: { jitter: false },
      },
    );

    const result = transport.execute({
      resource: "Account",
      operation: "Get",
      method: "GET",
      path: "/Account/Get",
      signal: controller.signal,
    });
    const assertion = expect(result).rejects.toBeInstanceOf(SageTimeoutError);
    await flush();
    expect(calls).toBe(1); // first attempt failed, now awaiting backoff

    controller.abort(new Error("caller cancelled"));
    await assertion;
    await expect(result).rejects.toMatchObject({ code: "SAGE_TIMEOUT_ERROR", isAborted: true });

    await vi.advanceTimersByTimeAsync(60_000);
    expect(calls).toBe(1); // no subsequent dispatch after cancellation
  });

  it("abort while queued behind a rate-limit suspension rejects without dispatching (WP008.2R 5.3)", async () => {
    let calls = 0;
    const controller = new AbortController();
    const { transport } = makeTransport(
      async () => {
        calls += 1;
        return new Response("{}", { status: 429, headers: { "Retry-After": "60" } });
      },
      { retry: { enabled: false } }, // first request fails fast, lane stays suspended
    );

    await expect(
      transport.execute({
        resource: "Account",
        operation: "Get",
        method: "GET",
        path: "/Account/Get",
      }),
    ).rejects.toMatchObject({ code: "SAGE_RATE_LIMIT_ERROR" });
    expect(calls).toBe(1);

    const queued = transport.execute({
      resource: "Account",
      operation: "Get",
      method: "GET",
      path: "/Account/Get",
      signal: controller.signal,
    });
    const assertion = expect(queued).rejects.toMatchObject({
      code: "SAGE_TIMEOUT_ERROR",
      isAborted: true,
    });
    await flush();
    controller.abort(new Error("caller cancelled"));
    await assertion;

    await vi.advanceTimersByTimeAsync(60_000);
    expect(calls).toBe(1); // cancelled request never dispatched, lane resumed idle
  });

  it("request timeout does not consume the backoff window — retry gets a fresh timeout (WP008.2R 5.3)", async () => {
    let calls = 0;
    const { transport } = makeTransport(
      async () => {
        calls += 1;
        return calls < 2 ? new Response("Service Unavailable", { status: 503 }) : okJson();
      },
      {
        retry: { enabled: true, maxAttempts: 2, baseDelayMs: 5_000 },
        timeout: 30,
        scheduler: { jitter: false },
      },
    );

    const result = transport.execute({
      resource: "Account",
      operation: "Get",
      method: "GET",
      path: "/Account/Get",
    });
    await flush();
    expect(calls).toBe(1);
    await vi.advanceTimersByTimeAsync(4_999);
    expect(calls).toBe(1); // in backoff — the 30 ms attempt timer was cleared, no spurious timeout
    await vi.advanceTimersByTimeAsync(1);
    expect(calls).toBe(2);
    await expect(result).resolves.toBeTruthy();
  });

  it("abort listeners are removed after the backoff delay resolves (WP008.2R 5.3)", async () => {
    let calls = 0;
    const controller = new AbortController();
    const added = vi.spyOn(controller.signal, "addEventListener");
    const removed = vi.spyOn(controller.signal, "removeEventListener");
    const { transport } = makeTransport(
      async () => {
        calls += 1;
        return calls < 2 ? new Response("Service Unavailable", { status: 503 }) : okJson();
      },
      { retry: { enabled: true, maxAttempts: 2, baseDelayMs: 100 }, scheduler: { jitter: false } },
    );

    const result = transport.execute({
      resource: "Account",
      operation: "Get",
      method: "GET",
      path: "/Account/Get",
      signal: controller.signal,
    });
    await flush();
    await vi.advanceTimersByTimeAsync(100); // backoff delay (base 100, jitter off)
    await expect(result).resolves.toBeTruthy();
    expect(calls).toBe(2);

    expect(added).toHaveBeenCalled(); // sleep registered a listener
    // ≥2 removals: scheduler acquire detach + backoff sleep cleanup
    expect(removed.mock.calls.length).toBeGreaterThanOrEqual(2);

    added.mockRestore();
    removed.mockRestore();
  });

  it("Login/Validate 429 is the auth throttle: SageAuthenticationError, no resource-lane suspension (WP008.2R 4.5)", async () => {
    let calls = 0;
    const { transport } = makeTransport(async () => {
      calls += 1;
      return new Response("{}", { status: 429, headers: { "Retry-After": "60" } });
    });

    await expect(
      transport.execute({
        resource: "Login",
        operation: "Validate",
        method: "POST",
        path: "/Login/Validate",
        requiresAuthentication: false,
        body: { Username: "u", Password: "wrong" },
      }),
    ).rejects.toBeInstanceOf(SageAuthenticationError);
    expect(calls).toBe(1); // never retried
    expect(transport.schedulerSnapshot().lanes).toEqual([]); // resource lane untouched
  });

  it("repeated client construction with invalid credentials: exactly one auth attempt each (WP008.2R 7.2)", async () => {
    let authCalls = 0;
    const mockFetch: typeof fetch = vi.fn(async () => {
      authCalls += 1;
      return new Response("false", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }) as unknown as typeof fetch;

    for (let i = 0; i < 3; i += 1) {
      const client = new SageOneClient({
        credentials: { username: "user@example.com", password: "wrong" },
        apiKey: "k",
        companyId: 1,
        transport: { fetch: mockFetch },
      });
      await expect(client.verifyAuthentication()).rejects.toBeInstanceOf(SageAuthenticationError);
    }
    expect(authCalls).toBe(3); // one attempt per construction — no retry loop
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

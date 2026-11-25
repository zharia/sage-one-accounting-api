/**
 * Central request scheduler (M008 WP008.2, ADR-017).
 *
 * Common coordination point for all API requests issued by `SageTransport`:
 *
 * - Configurable global concurrency cap and per-lane request pacing.
 * - Per-company lane isolation: a rate limit affecting one company suspends
 *   only that company's lane — unrelated lanes keep dispatching.
 * - FIFO ordering within a lane, round-robin fairness between lanes.
 * - Queue cancellation via `AbortSignal` (a cancelled queued request is never
 *   dispatched) and graceful shutdown (stop admitting, drain in flight).
 * - Observable queue state (`snapshot()`) — company id, method and resource
 *   only; never headers, tokens or payloads.
 *
 * Lane key: `request.companyId ?? config.companyId ?? "default"`.
 *
 * Pure timing helpers live here too (`parseRetryAfterMs`,
 * `computeBackoffDelayMs`) so their behaviour is unit-testable without a
 * transport or real clocks.
 */

import { SageError, SageTimeoutError } from "../errors/index.js";
import { NOOP_LOGGER, type SageLogger } from "../logging/index.js";

export interface SchedulerAcquireOptions {
  /** Company lane key — scheduling isolation unit. */
  readonly lane: string;
  readonly signal: AbortSignal | undefined;
  readonly correlationId: string;
  readonly method: string;
  readonly resource: string;
  readonly operation: string;
}

/** Handle for one dispatched request. `release()` is idempotent. */
export interface SchedulerPermit {
  release(): void;
}

export interface SchedulerLaneSnapshot {
  readonly lane: string;
  readonly pending: number;
  /** Epoch ms until which this lane refuses to dispatch, or `null`. */
  readonly suspendedUntil: number | null;
}

export interface SchedulerSnapshot {
  readonly running: boolean;
  readonly active: number;
  readonly pending: number;
  readonly maxConcurrency: number;
  readonly lanes: readonly SchedulerLaneSnapshot[];
}

interface QueueEntry {
  readonly options: SchedulerAcquireOptions;
  readonly queuedAt: number;
  readonly lane: string;
  resolve(permit: SchedulerPermit): void;
  reject(error: unknown): void;
  detach(): void;
  settled: boolean;
}

interface LaneState {
  readonly queue: QueueEntry[];
  suspendedUntil: number;
  nextDispatchAt: number;
}

export interface RequestSchedulerOptions {
  readonly maxConcurrency: number;
  readonly minIntervalMs: number;
  readonly logger?: SageLogger | undefined;
}

/**
 * Parse an HTTP `Retry-After` header value (RFC 9110 §10.2.3): delta-seconds
 * or an HTTP-date. Returns the delay in milliseconds, `0` for a past date,
 * or `null` when the header is missing or unparseable (caller falls back to
 * exponential backoff).
 */
export function parseRetryAfterMs(raw: string | null, now: number = Date.now()): number | null {
  if (raw === null) {
    return null;
  }
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    return null;
  }
  if (/^\d+$/.test(trimmed)) {
    // Delta-seconds. `parseInt("60abc")` would silently accept garbage — the
    // full string must be numeric.
    return Number(trimmed) * 1000;
  }
  if (/^[+-]?\d+$/.test(trimmed)) {
    // Signed numbers are not valid delta-seconds (RFC 9110) and would be
    // misread by `Date.parse` as a year — reject rather than guess.
    return null;
  }
  const dateMs = Date.parse(trimmed);
  if (Number.isNaN(dateMs)) {
    return null;
  }
  return Math.max(0, dateMs - now);
}

/**
 * Full-jitter exponential backoff: `random() * min(maxBackoffMs, base * 2^(attempt-1))`.
 * Deterministic when `random` is supplied (tests).
 */
export function computeBackoffDelayMs(
  attempt: number,
  baseDelayMs: number,
  maxBackoffMs: number,
  jitter: boolean,
  random: () => number = Math.random,
): number {
  if (baseDelayMs <= 0) {
    return 0;
  }
  const exponential = Math.min(maxBackoffMs, baseDelayMs * 2 ** (attempt - 1));
  if (!jitter) {
    return exponential;
  }
  return Math.round(random() * exponential);
}

/**
 * FIFO queue + concurrency gate with per-company lanes. One instance per
 * `SageTransport`; all API requests pass through `acquire()`.
 */
export class RequestScheduler {
  private readonly maxConcurrency: number;
  private readonly minIntervalMs: number;
  private readonly logger: SageLogger;
  private readonly lanes = new Map<string, LaneState>();
  private readonly laneOrder: string[] = [];
  private readonly drainWaiters: Array<() => void> = [];
  private cursor = 0;
  private active = 0;
  private running = true;
  private wakeTimer: ReturnType<typeof setTimeout> | null = null;
  private wakeDelay = Number.POSITIVE_INFINITY;

  public constructor(options: RequestSchedulerOptions) {
    this.maxConcurrency = options.maxConcurrency;
    this.minIntervalMs = options.minIntervalMs;
    this.logger = options.logger ?? NOOP_LOGGER;
  }

  /**
   * Wait for a dispatch slot (concurrency + lane pacing/suspension), then
   * run nothing itself — the caller performs the request and must call
   * `permit.release()` when the attempt finishes (idempotent).
   *
   * Rejects with `SageTimeoutError { isAborted }` when the caller aborts
   * while queued, and with `SAGE_SCHEDULER_SHUTDOWN` after `shutdown()`.
   */
  public acquire(options: SchedulerAcquireOptions): Promise<SchedulerPermit> {
    if (!this.running) {
      return Promise.reject(
        new SageError({
          code: "SAGE_SCHEDULER_SHUTDOWN",
          message: `Request scheduler has been shut down; rejected ${options.method} ${options.resource}.${options.operation}`,
          retryable: false,
        }),
      );
    }
    if (options.signal?.aborted) {
      return Promise.reject(this.abortedError(options));
    }

    return new Promise<SchedulerPermit>((resolve, reject) => {
      const entry: QueueEntry = {
        options,
        queuedAt: Date.now(),
        lane: options.lane,
        resolve,
        reject,
        settled: false,
        detach: () => {
          options.signal?.removeEventListener("abort", onAbort);
        },
      };
      const onAbort = (): void => {
        this.cancelEntry(entry);
      };
      options.signal?.addEventListener("abort", onAbort, { once: true });

      const lane = this.laneFor(options.lane);
      lane.queue.push(entry);
      this.logger.debug("scheduler.enqueue", {
        lane: options.lane,
        method: options.method,
        resource: options.resource,
        operation: options.operation,
        correlationId: options.correlationId,
        pending: lane.queue.length,
      });
      this.pump();
    });
  }

  /**
   * Suspend one company lane for `delayMs` (server-provided `Retry-After`
   * or a backoff estimate). Other lanes are unaffected.
   */
  public suspend(lane: string, delayMs: number): void {
    if (delayMs <= 0) {
      return;
    }
    const state = this.laneFor(lane);
    const until = Date.now() + delayMs;
    if (until > state.suspendedUntil) {
      state.suspendedUntil = until;
      this.armWake(until);
    }
  }

  /** Observable queue state for diagnostics — no headers, tokens or payloads. */
  public snapshot(): SchedulerSnapshot {
    const lanes: SchedulerLaneSnapshot[] = [];
    let pending = 0;
    for (const lane of this.laneOrder) {
      const state = this.lanes.get(lane);
      if (!state) {
        continue;
      }
      if (state.queue.length > 0 || state.suspendedUntil > Date.now()) {
        lanes.push({
          lane,
          pending: state.queue.length,
          suspendedUntil: state.suspendedUntil > Date.now() ? state.suspendedUntil : null,
        });
        pending += state.queue.length;
      }
    }
    return {
      running: this.running,
      active: this.active,
      pending,
      maxConcurrency: this.maxConcurrency,
      lanes,
    };
  }

  /**
   * Graceful shutdown: stop admitting new requests (they reject with
   * `SAGE_SCHEDULER_SHUTDOWN`), let queued and in-flight requests finish,
   * then resolve. Queued requests remain cancellable via their signals.
   */
  public shutdown(): Promise<void> {
    this.running = false;
    if (this.active === 0 && this.pendingCount() === 0) {
      this.clearWake();
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      this.drainWaiters.push(resolve);
    });
  }

  private pendingCount(): number {
    let total = 0;
    for (const state of this.lanes.values()) {
      total += state.queue.length;
    }
    return total;
  }

  private abortedError(options: SchedulerAcquireOptions): SageTimeoutError {
    return new SageTimeoutError(
      `Request ${options.resource}.${options.operation} was aborted by caller while queued`,
      {
        isAborted: true,
        resource: options.resource,
        operation: options.operation,
        requestId: options.correlationId,
      },
    );
  }

  private cancelEntry(entry: QueueEntry): void {
    if (entry.settled) {
      return;
    }
    entry.settled = true;
    entry.detach();
    const lane = this.lanes.get(entry.lane);
    if (lane) {
      const index = lane.queue.indexOf(entry);
      if (index >= 0) {
        lane.queue.splice(index, 1);
      }
    }
    this.logger.debug("scheduler.cancel", {
      lane: entry.lane,
      method: entry.options.method,
      resource: entry.options.resource,
      operation: entry.options.operation,
      correlationId: entry.options.correlationId,
      reason: "caller_abort",
    });
    entry.reject(this.abortedError(entry.options));
    this.maybeResolveDrain();
  }

  private laneFor(key: string): LaneState {
    const existing = this.lanes.get(key);
    if (existing) {
      return existing;
    }
    const created: LaneState = { queue: [], suspendedUntil: 0, nextDispatchAt: 0 };
    this.lanes.set(key, created);
    this.laneOrder.push(key);
    return created;
  }

  /** Dispatch every entry currently eligible, respecting the concurrency cap. */
  private pump(): void {
    while (this.active < this.maxConcurrency) {
      const now = Date.now();
      let earliestWake = Number.POSITIVE_INFINITY;
      let dispatchedAny = false;

      for (let n = 0; n < this.laneOrder.length; n += 1) {
        const index = (this.cursor + n) % this.laneOrder.length;
        const laneKey = this.laneOrder[index] as string;
        const lane = this.lanes.get(laneKey);
        if (!lane || lane.queue.length === 0) {
          continue;
        }
        if (lane.suspendedUntil > now) {
          earliestWake = Math.min(earliestWake, lane.suspendedUntil);
          continue;
        }
        if (lane.nextDispatchAt > now) {
          earliestWake = Math.min(earliestWake, lane.nextDispatchAt);
          continue;
        }

        const entry = lane.queue.shift() as QueueEntry;
        this.cursor = (index + 1) % this.laneOrder.length;
        if (entry.settled) {
          continue; // cancelled between wake and dispatch
        }
        entry.settled = true;
        entry.detach();
        this.active += 1;
        lane.nextDispatchAt = now + this.minIntervalMs;
        dispatchedAny = true;

        const queueWaitMs = now - entry.queuedAt;
        this.logger.debug("scheduler.dispatch", {
          lane: laneKey,
          method: entry.options.method,
          resource: entry.options.resource,
          operation: entry.options.operation,
          correlationId: entry.options.correlationId,
          queueWaitMs,
          active: this.active,
        });

        entry.resolve(this.createPermit());
        break; // restart: capacity may still allow another dispatch
      }

      if (!dispatchedAny) {
        if (Number.isFinite(earliestWake)) {
          this.armWake(earliestWake);
        }
        break;
      }
    }
    this.maybeResolveDrain();
  }

  private createPermit(): SchedulerPermit {
    let released = false;
    return {
      release: (): void => {
        if (released) {
          return;
        }
        released = true;
        this.active -= 1;
        this.pump();
      },
    };
  }

  private armWake(at: number): void {
    const delay = Math.max(0, at - Date.now());
    if (this.wakeTimer !== null) {
      if (this.wakeDelay <= delay) {
        return; // an earlier wake is already armed
      }
      clearTimeout(this.wakeTimer);
    }
    this.wakeDelay = delay;
    this.wakeTimer = setTimeout(() => {
      this.wakeTimer = null;
      this.wakeDelay = Number.POSITIVE_INFINITY;
      this.pump();
    }, delay);
  }

  private clearWake(): void {
    if (this.wakeTimer !== null) {
      clearTimeout(this.wakeTimer);
      this.wakeTimer = null;
      this.wakeDelay = Number.POSITIVE_INFINITY;
    }
  }

  private maybeResolveDrain(): void {
    if (this.running || this.active > 0 || this.pendingCount() > 0) {
      return;
    }
    this.clearWake();
    while (this.drainWaiters.length > 0) {
      (this.drainWaiters.shift() as () => void)();
    }
  }
}

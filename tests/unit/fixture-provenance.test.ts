/**
 * Fixture provenance tests (M008 WP008.3 §5.3.3).
 *
 * Enforces `contracts/fixtures/PROVENANCE.md`:
 * - every fixture carries source endpoint, acquisition date and documentation
 *   completeness (traceable provenance);
 * - file name / directory agree with the fixture's own identity fields;
 * - captured-kind fixtures (future) must declare redaction + transformations;
 * - no credential-shaped or personal values in any sample.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

interface FixtureRecord {
  id?: unknown;
  service?: unknown;
  operation?: unknown;
  method?: unknown;
  route?: unknown;
  sourceUrl?: unknown;
  discoveredAt?: unknown;
  documentationCompleteness?: unknown;
  fixtureKind?: unknown;
  redacted?: unknown;
  transformations?: unknown;
  capturedAt?: unknown;
}

const FIXTURES_ROOT = resolve(process.cwd(), "contracts/fixtures");
const SERVICE_DIRS = readdirSync(FIXTURES_ROOT).filter((entry) =>
  statSync(resolve(FIXTURES_ROOT, entry)).isDirectory(),
);

interface FixtureEntry {
  readonly service: string;
  readonly file: string;
  readonly record: FixtureRecord;
  readonly raw: string;
}

const fixtures: FixtureEntry[] = SERVICE_DIRS.flatMap((service) =>
  readdirSync(resolve(FIXTURES_ROOT, service))
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const raw = readFileSync(resolve(FIXTURES_ROOT, service, file), "utf8");
      return { service, file, record: JSON.parse(raw) as FixtureRecord, raw };
    }),
);

/** Values that must never appear in a fixture sample. */
const EMAIL_PATTERN = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
const LONG_DIGIT_PATTERN = /(?<![\d.])\d{12,}(?!\d)/; // bare 12+ digit run; decimals excluded
const BEARER_PATTERN = /\bBearer\s+[A-Za-z0-9._~+/=-]{8,}/i;
const PLACEHOLDER_HINT = /sample|example|string \d|placeholder/i;

describe("fixture provenance (WP008.3 5.3.3)", () => {
  it("covers one fixture per discovered service directory", () => {
    expect(fixtures.length).toBe(622);
    expect(SERVICE_DIRS.length).toBe(162);
  });

  it("every fixture records source endpoint, date and documentation completeness", () => {
    for (const { service, file, record } of fixtures) {
      const where = `${service}/${file}`;
      expect(typeof record.sourceUrl, where).toBe("string");
      expect(String(record.sourceUrl), where).toMatch(/^https:\/\//);
      expect(typeof record.discoveredAt, where).toBe("string");
      expect(Number.isNaN(Date.parse(String(record.discoveredAt))), where).toBe(false);
      expect(["full", "partial", "none", "experimental"], where).toContain(
        record.documentationCompleteness,
      );
      expect(typeof record.id, where).toBe("string");
      expect(typeof record.service, where).toBe("string");
      expect(typeof record.operation, where).toBe("string");
      expect(typeof record.method, where).toBe("string");
      expect(typeof record.route, where).toBe("string");
    }
  });

  it("identity fields agree with file name, directory and method prefix", () => {
    for (const { service, file, record } of fixtures) {
      const where = `${service}/${file}`;
      expect(file, where).toBe(`${String(record.id)}.json`);
      expect(record.service, where).toBe(service);
      expect(String(record.id), where).toMatch(new RegExp(`^${String(record.method)}-`));
    }
  });

  it("classifies every current fixture as synthetic (PROVENANCE.md)", () => {
    // Current corpus is uniformly documentation-derived: no fixture claims to
    // be a live capture. When WP008.4 adds captured fixtures they must carry
    // `fixtureKind: "captured"` plus redaction metadata (next test).
    for (const { service, file, record } of fixtures) {
      if (record.fixtureKind !== undefined) {
        expect(record.fixtureKind, `${service}/${file}`).toBe("synthetic");
      }
    }
    expect(fixtures.some((entry) => entry.record.fixtureKind === "captured")).toBe(false);
  });

  it("captured fixtures must declare redaction and transformations", () => {
    for (const { service, file, record } of fixtures) {
      if (record.fixtureKind !== "captured") {
        continue;
      }
      const where = `${service}/${file}`;
      expect(record.redacted, where).toBe(true);
      expect(record.capturedAt, where).toBeTypeOf("string");
      expect(Array.isArray(record.transformations), where).toBe(true);
      expect((record.transformations as unknown[]).length, where).toBeGreaterThan(0);
    }
  });

  it("contains no credential-shaped or personal values", () => {
    for (const { service, file, raw, record } of fixtures) {
      const where = `${service}/${file}`;
      expect(raw, where).not.toMatch(BEARER_PATTERN);
      expect(raw, where).not.toMatch(LONG_DIGIT_PATTERN);

      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const walk = (value: unknown, keyPath: string): void => {
        if (typeof value === "string") {
          if (EMAIL_PATTERN.test(value)) {
            expect(PLACEHOLDER_HINT.test(value), `${where}:${keyPath}`).toBe(true);
          }
          if (/password|secret|token|api[-_]?key/i.test(keyPath)) {
            expect(PLACEHOLDER_HINT.test(value), `${where}:${keyPath}`).toBe(true);
          }
          return;
        }
        if (Array.isArray(value)) {
          value.forEach((entry, index) => walk(entry, `${keyPath}[${index}]`));
          return;
        }
        if (value !== null && typeof value === "object") {
          for (const [key, entry] of Object.entries(value)) {
            walk(entry, keyPath === "" ? key : `${keyPath}.${key}`);
          }
        }
      };
      walk(parsed, "");
      expect(record).toBeDefined();
    }
  });
});

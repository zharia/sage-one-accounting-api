/**
 * Coverage reconciliation tests (M008 WP008.3 §5.3.4).
 *
 * Revalidates the documented operation figures against the repository:
 * - endpoint catalogue totals and documentation-completeness split;
 * - per-service operation counts;
 * - one fixture per catalogue operation (no missing, no orphans);
 * - coverage matrix reports the same figures and keeps implemented and
 *   verified statuses distinct (no single collapsed percentage).
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

interface CatalogueEndpoint {
  id: string;
  service: string;
  documentationCompleteness: "full" | "partial" | "none" | "experimental";
  implementationStatus: string;
  typeStatus: string;
  schemaStatus: string;
}

interface Catalogue {
  totalServices: number;
  totalEndpoints: number;
  completenessSummary: Record<string, number>;
  services: Array<{ serviceId: string; operationCount: number }>;
  endpoints: CatalogueEndpoint[];
}

const catalogue = JSON.parse(
  readFileSync(resolve(process.cwd(), "contracts/sage-api/endpoint-catalogue.json"), "utf8"),
) as Catalogue;

const matrix = readFileSync(resolve(process.cwd(), "docs/api/coverage-matrix.md"), "utf8");

const FIXTURES_ROOT = resolve(process.cwd(), "contracts/fixtures");
const fixtureFiles = readdirSync(FIXTURES_ROOT).flatMap((service) =>
  statSync(resolve(FIXTURES_ROOT, service)).isDirectory()
    ? readdirSync(resolve(FIXTURES_ROOT, service))
        .filter((file) => file.endsWith(".json"))
        .map((file) => `${service}/${file}`)
    : [],
);

describe("API operation coverage reconciliation (WP008.3 5.3.4)", () => {
  it("revalidates the documented headline figures (162 services, 622 operations)", () => {
    expect(catalogue.totalServices).toBe(162);
    expect(catalogue.services.length).toBe(162);
    expect(catalogue.totalEndpoints).toBe(622);
    expect(catalogue.endpoints.length).toBe(622);
  });

  it("revalidates the documentation-completeness split (552/56/8/6)", () => {
    expect(catalogue.completenessSummary).toEqual({
      full: 552,
      partial: 56,
      none: 6,
      experimental: 8,
    });

    const derived: Record<string, number> = {};
    for (const endpoint of catalogue.endpoints) {
      derived[endpoint.documentationCompleteness] =
        (derived[endpoint.documentationCompleteness] ?? 0) + 1;
    }
    expect(derived).toEqual(catalogue.completenessSummary);
    expect(Object.values(derived).reduce((sum, n) => sum + n, 0)).toBe(622);
  });

  it("per-service operation counts sum to the total", () => {
    const sum = catalogue.services.reduce((total, service) => total + service.operationCount, 0);
    expect(sum).toBe(catalogue.totalEndpoints);
  });

  it("has exactly one fixture per catalogue operation — none missing, none orphaned", () => {
    const expected = new Set(
      catalogue.endpoints.map((endpoint) => `${endpoint.service}/${endpoint.id}.json`),
    );
    const actual = new Set(fixtureFiles);
    expect(actual.size).toBe(expected.size);
    expect([...expected].filter((file) => !actual.has(file))).toEqual([]);
    expect([...actual].filter((file) => !expected.has(file))).toEqual([]);
  });

  it("every operation is implemented, typed and schema-validated (catalogue statuses)", () => {
    for (const endpoint of catalogue.endpoints) {
      expect(endpoint.implementationStatus, endpoint.id).toBe("Complete");
      expect(endpoint.typeStatus, endpoint.id).toBe("Complete");
      expect(endpoint.schemaStatus, endpoint.id).toBe("Complete");
    }
  });

  it("coverage matrix repeats the same figures and keeps implemented vs verified distinct", () => {
    // Headline figures must match the catalogue (revalidated above).
    expect(matrix).toMatch(/\| Total discovered endpoints \| 622 \|/);
    expect(matrix).toMatch(/\| Fully documented endpoints \(`full`\) \| 552 \|/);
    expect(matrix).toMatch(/\| Partially documented endpoints \(`partial`\) \| 56 \|/);
    expect(matrix).toMatch(/\| Untyped \/ experimental endpoints \(`experimental`\) \| 8 \|/);
    expect(matrix).toMatch(/\| Endpoints with no model documentation \(`none`\) \| 6 \|/);

    // Verification statuses are reported individually — never a single
    // collapsed coverage percentage (spec §5.3.4).
    for (const status of [
      "Discovered",
      "Documented",
      "Modelled",
      "Implemented",
      "Fixture-verified",
      "Live-verified",
      "Unsupported",
      "Deprecated",
    ]) {
      expect(matrix, status).toContain(status);
    }
    // Live verification has not run: implemented (622) must not be presented
    // as live-verified.
    expect(matrix).toMatch(/\|\s*Live-verified\s*\|\s*\*{0,2}0/);
  });
});

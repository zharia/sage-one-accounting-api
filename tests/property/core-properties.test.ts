import fc from "fast-check";
import { describe, expect, it } from "vitest";

import {
  FixedDecimal,
  fromDecimal,
  odata,
  paginateItems,
  toAccountId,
  toCustomerId,
  toDecimal,
} from "../../src/index.js";

describe("Property-based tests (spec §17.5)", () => {
  it("FixedDecimal round-trips arbitrary finite decimal strings and satisfies additive commutativity/associativity", () => {
    const decimalArb = fc
      .tuple(
        fc.boolean(),
        fc.integer({ min: 0, max: 1_000_000_000 }),
        fc.integer({ min: 0, max: 9999 }),
      )
      .map(([neg, intPart, fracPart]) => {
        const sign = neg && (intPart !== 0 || fracPart !== 0) ? "-" : "";
        const fracStr = fracPart === 0 ? "" : `.${String(fracPart).padStart(4, "0")}`;
        return `${sign}${String(intPart)}${fracStr}`;
      });

    fc.assert(
      fc.property(decimalArb, decimalArb, decimalArb, (s1, s2, s3) => {
        const d1 = FixedDecimal.fromString(s1);
        const d2 = FixedDecimal.fromString(s2);
        const d3 = FixedDecimal.fromString(s3);

        // Round-trip via string
        const rt = FixedDecimal.fromString(d1.toString());
        expect(rt.equals(d1)).toBe(true);

        // Commutativity: d1 + d2 === d2 + d1
        expect(d1.add(d2).equals(d2.add(d1))).toBe(true);

        // Associativity: (d1 + d2) + d3 === d1 + (d2 + d3)
        expect(
          d1
            .add(d2)
            .add(d3)
            .equals(d1.add(d2.add(d3))),
        ).toBe(true);

        // Additive inverse: (d1 + d2) - d2 === d1
        expect(d1.add(d2).subtract(d2).equals(d1)).toBe(true);
      }),
      { numRuns: 100 },
    );
  });

  it("wire money number -> toDecimal -> fromDecimal preserves exact JSON numbers", () => {
    fc.assert(
      fc.property(
        fc.double({ min: -1e9, max: 1e9, noNaN: true, noDefaultInfinity: true }),
        (num) => {
          const normalized = Object.is(num, -0) ? 0 : num;
          const dec = toDecimal(normalized);
          expect(fromDecimal(dec)).toBe(normalized);
        },
      ),
      { numRuns: 100 },
    );
  });

  it("OData string literals escape single quotes and round-trip through URLSearchParams", () => {
    interface TestEntity {
      readonly Name: string;
      readonly Balance: number;
    }

    fc.assert(
      fc.property(
        fc.string(),
        fc.integer({ min: 0, max: 500 }),
        fc.integer({ min: 0, max: 5000 }),
        (rawString, topVal, skipVal) => {
          const builder = odata<TestEntity>()
            .filter("Name", "eq", rawString)
            .top(topVal)
            .skip(skipVal);
          const encoded = builder.build();
          const parsed = new URLSearchParams(encoded);
          const expectedLiteral = `'${rawString.replace(/'/g, "''")}'`;
          expect(parsed.get("$filter")).toBe(`Name eq ${expectedLiteral}`);
          expect(parsed.get("$top")).toBe(String(topVal));
          expect(parsed.get("$skip")).toBe(String(skipVal));
        },
      ),
      { numRuns: 100 },
    );
  });

  it("pagination progression yields exact total items and never loops infinitely", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 0, max: 85 }),
        fc.integer({ min: 1, max: 20 }),
        async (totalItems, pageSize) => {
          const dataset = Array.from({ length: totalItems }, (_, i) => i + 1);
          const collected: number[] = [];

          for await (const item of paginateItems<number>(
            async ({ skip, top }) => {
              const slice = dataset.slice(skip, skip + top);
              return {
                TotalResults: totalItems,
                ReturnedResults: slice.length,
                Results: slice,
              };
            },
            { pageSize, maxPages: 100 },
          )) {
            collected.push(item);
          }

          expect(collected).toEqual(dataset);
        },
      ),
      { numRuns: 50 },
    );
  });

  it("identifier constructors accept all safe integers and reject non-integers", () => {
    fc.assert(
      fc.property(fc.maxSafeInteger(), (safeInt) => {
        expect(toAccountId(safeInt)).toBe(safeInt);
        expect(toCustomerId(safeInt)).toBe(safeInt);
      }),
      { numRuns: 100 },
    );
  });
});

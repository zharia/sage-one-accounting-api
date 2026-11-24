/**
 * Generator regression tests for WP008.1 (M008 §5.1.6).
 *
 * Covers the required primitive/optional/nullable matrix, typed collections,
 * nested model references, enumerations, decimals (ADR-012), read-only fields,
 * circular references and unsupported source metadata — verifying both the
 * generated TypeScript expression and the resulting Zod runtime behaviour,
 * including negative cases that the previous broad unions accepted.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";
import { z, type ZodType } from "zod";

import type { ParameterField } from "../../../scripts/api-discovery/parse-help.js";
import {
  fieldToZodExpr,
  type EnumDefinition,
  type FieldSchemaContext,
} from "../../../scripts/generate/field-schema.js";

function makeContext(enums: Record<string, EnumDefinition> = {}): FieldSchemaContext {
  return { enums: new Map(Object.entries(enums)) };
}

function field(overrides: Partial<ParameterField> & Pick<ParameterField, "name">): ParameterField {
  return {
    type: "string",
    modelRef: null,
    isCollection: false,
    required: false,
    readOnly: false,
    nullable: false,
    annotations: [],
    description: "",
    ...overrides,
  };
}

/** Evaluate a generated expression with `z` and any referenced schemas in scope. */
function evaluate(expr: string, scope: Record<string, ZodType> = {}): ZodType {
  const names = ["z", ...Object.keys(scope)];
  return new Function(...names, `return (${expr});`)(z, ...Object.values(scope)) as ZodType;
}

function schemaFor(
  f: ParameterField,
  ctx: FieldSchemaContext = makeContext(),
  scope: Record<string, ZodType> = {},
): { expr: string; unsupported: string | null; schema: ZodType } {
  const outcome = fieldToZodExpr(f, ctx);
  const wrapper = evaluate(`z.object({ ${f.name}: ${outcome.expr} })`, scope);
  return { expr: outcome.expr, unsupported: outcome.unsupported, schema: wrapper };
}

const PAYMENT_METHOD: EnumDefinition = {
  modelName: "PaymentMethod",
  displayName: "Payment Method",
  values: [
    { name: "Cash", value: 1, description: "" },
    { name: "Cheque", value: 2, description: "" },
    { name: "CreditCard", value: 3, description: "" },
    { name: "EFT", value: 4, description: "" },
  ],
};

describe("WP008.1 field schema generation", () => {
  it("1. required primitive: precise type, enforced presence", () => {
    const { expr, schema } = schemaFor(field({ name: "Name", required: true }));
    expect(expr).toBe("z.string()");
    expect(schema.safeParse({ Name: "x" }).success).toBe(true);
    expect(schema.safeParse({}).success).toBe(false); // missing required
    expect(schema.safeParse({ Name: null }).success).toBe(false); // not nullable
    expect(schema.safeParse({ Name: 42 }).success).toBe(false); // not a union
  });

  it("2. optional primitive: may be omitted, still typed", () => {
    const { expr, schema } = schemaFor(field({ name: "Code" }));
    expect(expr).toBe("z.string().optional()");
    expect(schema.safeParse({}).success).toBe(true);
    expect(schema.safeParse({ Code: "A" }).success).toBe(true);
    expect(schema.safeParse({ Code: null }).success).toBe(false); // optional ≠ nullable
    expect(schema.safeParse({ Code: 7 }).success).toBe(false);
  });

  it("3. nullable primitive: null accepted, strings no longer leak in", () => {
    const { expr, schema } = schemaFor(
      field({ name: "Age", type: "nullable integer", nullable: true, required: true }),
    );
    expect(expr).toBe("z.number().int().nullable()");
    expect(schema.safeParse({ Age: null }).success).toBe(true);
    expect(schema.safeParse({ Age: 3 }).success).toBe(true);
    expect(schema.safeParse({ Age: 3.5 }).success).toBe(false); // int, not number
    expect(schema.safeParse({ Age: "3" }).success).toBe(false); // old union accepted strings
    expect(schema.safeParse({}).success).toBe(false); // required stays required
  });

  it("4. optional nullable field: all four contract states distinct", () => {
    const { expr, schema } = schemaFor(
      field({ name: "Note", type: "nullable bool", nullable: true }),
    );
    expect(expr).toBe("z.boolean().nullable().optional()");
    expect(schema.safeParse({}).success).toBe(true); // omitted
    expect(schema.safeParse({ Note: null }).success).toBe(true); // explicit null
    expect(schema.safeParse({ Note: true }).success).toBe(true); // supplied value
    expect(schema.safeParse({ Note: 1 }).success).toBe(false); // old union accepted 1
  });

  it("5. typed collection: element types retained", () => {
    const { expr, schema } = schemaFor(
      field({ name: "Scores", type: "Collection of integer", isCollection: true, required: true }),
    );
    expect(expr).toBe("z.array(z.number().int())");
    expect(schema.safeParse({ Scores: [1, 2] }).success).toBe(true);
    expect(schema.safeParse({ Scores: ["1", "2"] }).success).toBe(false); // old union allowed
    expect(schema.safeParse({ Scores: 5 }).success).toBe(false);
    expect(schema.safeParse({ Scores: [1.5] }).success).toBe(false);
  });

  it("6. collection of nested models: element schema resolved via scope", () => {
    const lineSchema = z.object({ ID: z.number() });
    const { expr, schema } = schemaFor(
      field({
        name: "Lines",
        type: "Collection of CommercialDocumentLine",
        isCollection: true,
        modelRef: "CommercialDocumentLine",
        required: true,
      }),
      makeContext(),
      { CommercialDocumentLineSchema: lineSchema },
    );
    expect(expr).toBe("z.array(z.lazy(() => CommercialDocumentLineSchema))");
    expect(schema.safeParse({ Lines: [{ ID: 1 }] }).success).toBe(true);
    expect(schema.safeParse({ Lines: [{ ID: "1" }] }).success).toBe(false);
    expect(schema.safeParse({ Lines: [42] }).success).toBe(false);
    expect(schema.safeParse({ Lines: "nope" }).success).toBe(false);
  });

  it("7. nested model reference: strongly typed, not a broad union", () => {
    const categorySchema = z.object({ ID: z.number(), Name: z.string() });
    const { expr, schema } = schemaFor(
      field({
        name: "Category",
        type: "AccountCategory",
        modelRef: "AccountCategory",
        required: true,
      }),
      makeContext(),
      { AccountCategorySchema: categorySchema },
    );
    expect(expr).toBe("z.lazy(() => AccountCategorySchema)");
    expect(schema.safeParse({ Category: { ID: 1, Name: "x" } }).success).toBe(true);
    expect(schema.safeParse({ Category: 42 }).success).toBe(false); // old union accepted numbers
    expect(schema.safeParse({ Category: "AccountCategory" }).success).toBe(false); // …and strings
    expect(schema.safeParse({ Category: {} }).success).toBe(false); // structure preserved
  });

  it("8. enumeration: constrained literal union from published values", () => {
    const ctx = makeContext({ PaymentMethod: PAYMENT_METHOD });
    const { expr, schema } = schemaFor(
      field({
        name: "PaymentMethod",
        type: "Payment Method",
        modelRef: "PaymentMethod",
        required: true,
      }),
      ctx,
    );
    expect(expr).toBe("z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])");
    expect(schema.safeParse({ PaymentMethod: 1 }).success).toBe(true);
    expect(schema.safeParse({ PaymentMethod: 4 }).success).toBe(true);
    expect(schema.safeParse({ PaymentMethod: 5 }).success).toBe(false); // undocumented value
    expect(schema.safeParse({ PaymentMethod: "Cash" }).success).toBe(false); // name ≠ wire form
    expect(schema.safeParse({}).success).toBe(false); // required

    // String-valued enums stay strings.
    const kindEnum: EnumDefinition = {
      modelName: "Kind",
      displayName: "Kind",
      values: [
        { name: "Alpha", value: "alpha", description: "" },
        { name: "Beta", value: "beta", description: "" },
      ],
    };
    const strCase = schemaFor(
      field({ name: "Kind", type: "Kind", modelRef: "Kind" }),
      makeContext({ Kind: kindEnum }),
    );
    expect(strCase.expr).toBe('z.union([z.literal("alpha"), z.literal("beta")]).optional()');
    expect(strCase.schema.safeParse({ Kind: "alpha" }).success).toBe(true);
    expect(strCase.schema.safeParse({ Kind: "gamma" }).success).toBe(false);
    expect(strCase.schema.safeParse({}).success).toBe(true); // optional
  });

  it("9. decimal: JSON number on the wire (ADR-012), no string fallback", () => {
    const { expr, schema } = schemaFor(field({ name: "Balance", type: "decimal", required: true }));
    expect(expr).toBe("z.number()");
    expect(schema.safeParse({ Balance: 4.0 }).success).toBe(true); // documented sample form
    expect(schema.safeParse({ Balance: -12.34 }).success).toBe(true);
    expect(schema.safeParse({ Balance: "4.0" }).success).toBe(false); // old union accepted strings
    expect(schema.safeParse({ Balance: null }).success).toBe(false); // decimal ≠ nullable here
  });

  it("10. read-only field: response-only semantics, never request-required", () => {
    const { expr, schema } = schemaFor(
      field({ name: "Balance", type: "decimal", required: true, readOnly: true }),
    );
    expect(expr).toBe("z.number().optional()"); // required is overridden by readOnly
    expect(schema.safeParse({}).success).toBe(true); // requests may omit it
    expect(schema.safeParse({ Balance: 9.99 }).success).toBe(true); // responses carry it
    expect(schema.safeParse({ Balance: "9.99" }).success).toBe(false);
  });

  it("11. circular model references resolve through z.lazy", () => {
    // Scope schemas mirror generation: non-required fields are optional, so
    // finite values terminate the cycle.
    const aSchema: ZodType = z.lazy(() => z.object({ b: bSchema.optional() }));
    const bSchema: ZodType = z.lazy(() => z.object({ a: aSchema.optional() }));

    const a = schemaFor(field({ name: "b", type: "B", modelRef: "B" }), makeContext(), {
      BSchema: bSchema,
    });
    const b = schemaFor(field({ name: "a", type: "A", modelRef: "A" }), makeContext(), {
      ASchema: aSchema,
    });
    expect(a.expr).toBe("z.lazy(() => BSchema).optional()");
    expect(b.expr).toBe("z.lazy(() => ASchema).optional()");

    const nested = evaluate(`z.object({ a: ${a.expr} })`, { BSchema: bSchema });
    expect(nested.safeParse({ a: { b: { a: {} } } }).success).toBe(true); // cycle traversed
    expect(nested.safeParse({ a: 42 }).success).toBe(false); // object expected
    expect(nested.safeParse({ a: { a: "x" } }).success).toBe(false); // wrong type deep in cycle
  });

  it("12. unknown source metadata is reported, never silently widened", () => {
    const outcome = fieldToZodExpr(
      field({ name: "Odd", type: "Weird Custom Type" }),
      makeContext(),
    );
    expect(outcome.expr).toBe("z.unknown().optional()");
    expect(outcome.unsupported).toContain('unsupported field type "Weird Custom Type"');

    const collOutcome = fieldToZodExpr(
      field({ name: "OddItems", type: "Collection of Weird Custom Type", isCollection: true }),
      makeContext(),
    );
    expect(collOutcome.expr).toBe("z.array(z.unknown()).optional()");
    expect(collOutcome.unsupported).toContain("Weird Custom Type");
  });

  it("maps byte wire encodings from sample evidence", () => {
    // .NET byte[] → ONE base64 string (all published samples: "QEA=").
    const bytes = schemaFor(
      field({ name: "Data", type: "Collection of byte", isCollection: true }),
    );
    expect(bytes.expr).toBe("z.string().optional()");
    expect(bytes.schema.safeParse({ Data: "QEA=" }).success).toBe(true);
    expect(bytes.schema.safeParse({ Data: [81, 69, 65] }).success).toBe(false); // never numeric[]
    expect(bytes.schema.safeParse({ Data: null }).success).toBe(false);

    // Scalar byte stays a JSON number (Company.InventoryTypeId: 64).
    const single = schemaFor(field({ name: "InventoryTypeId", type: "byte" }));
    expect(single.expr).toBe("z.number().int().optional()");
    expect(single.schema.safeParse({ InventoryTypeId: 64 }).success).toBe(true);
    expect(single.schema.safeParse({ InventoryTypeId: "64" }).success).toBe(false);
  });

  it("resolves documented source contradictions as a union of both published forms", () => {
    // AccountantNoteRequestModel.Status: property table says "nullable bool",
    // the published sample sends 1, the sister response model says integer.
    const conflict = field({ name: "Status", type: "nullable bool", nullable: true });
    const outcome = fieldToZodExpr(conflict, makeContext(), "AccountantNoteRequestModel");
    expect(outcome.expr).toBe("z.union([z.boolean(), z.number().int()]).nullable().optional()");
    expect(outcome.unsupported).toBeNull();

    const schema = evaluate(`z.object({ Status: ${outcome.expr} })`);
    expect(schema.safeParse({ Status: true }).success).toBe(true); // property table
    expect(schema.safeParse({ Status: 1 }).success).toBe(true); // published sample
    expect(schema.safeParse({ Status: null }).success).toBe(true); // nullable
    expect(schema.safeParse({}).success).toBe(true); // optional
    expect(schema.safeParse({ Status: "1" }).success).toBe(false); // no string widening
    expect(schema.safeParse({ Status: 1.5 }).success).toBe(false); // int, not decimal

    // The override is model-scoped: unrelated models keep the plain mapping.
    const other = fieldToZodExpr(conflict, makeContext(), "OtherModel");
    expect(other.expr).toBe("z.boolean().nullable().optional()");
  });

  it("maps unresolved model references with scalar sample evidence to the evidenced primitive", () => {
    // BASReport.TaxReportingType: enum help page unfetched (TD-008, help-site
    // throttling). Published response sample shows 0; the sister field
    // TaxReportingTypeId is a documented integer.
    const ref = field({
      name: "TaxReportingType",
      type: "Tax Reporting Type",
      modelRef: "TaxReportingType",
    });
    const outcome = fieldToZodExpr(ref, makeContext(), "BASReport");
    expect(outcome.expr).toBe("z.number().int().optional()");
    expect(outcome.unsupported).toBeNull();

    const schema = evaluate(`z.object({ TaxReportingType: ${outcome.expr} })`);
    expect(schema.safeParse({ TaxReportingType: 0 }).success).toBe(true); // published sample
    expect(schema.safeParse({}).success).toBe(true); // optional
    expect(schema.safeParse({ TaxReportingType: "0" }).success).toBe(false); // no string widening
    expect(schema.safeParse({ TaxReportingType: 1.5 }).success).toBe(false); // int

    // Scoped: unrelated models keep the lazy model reference until the page lands.
    const other = fieldToZodExpr(ref, makeContext(), "OtherModel");
    expect(other.expr).toBe("z.lazy(() => TaxReportingTypeSchema).optional()");

    // Second unresolved ref with scalar sample evidence (same class).
    const accountType = field({
      name: "AccountType",
      type: "Take On Balance Account Type",
      modelRef: "TakeOnBalanceAccountType",
    });
    const at = fieldToZodExpr(accountType, makeContext(), "TakeOnAccountBalance");
    expect(at.expr).toBe("z.number().int().optional()");
    expect(at.unsupported).toBeNull();
    const atSchema = evaluate(`z.object({ AccountType: ${at.expr} })`);
    expect(atSchema.safeParse({ AccountType: 1 }).success).toBe(true); // published sample
    expect(atSchema.safeParse({ AccountType: 1.5 }).success).toBe(false);
  });

  it("maps every persisted source field without unsupported metadata", () => {
    const repoRoot = resolve(process.cwd());
    const models = JSON.parse(
      readFileSync(resolve(repoRoot, "contracts/sage-api/snapshots/resource-models.json"), "utf8"),
    ) as Record<string, readonly ParameterField[]>;
    const extensions = JSON.parse(
      readFileSync(resolve(repoRoot, "contracts/sage-api/snapshots/model-extensions.json"), "utf8"),
    ) as { enums: Record<string, EnumDefinition> };

    const ctx = makeContext(extensions.enums);
    const problems: string[] = [];
    for (const [modelName, fields] of Object.entries(models)) {
      for (const f of fields) {
        const outcome = fieldToZodExpr(f, ctx, modelName);
        if (outcome.unsupported !== null) {
          problems.push(`${modelName}.${f.name}: ${outcome.unsupported}`);
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it("keeps the four required/optional × nullable/non-nullable states distinct", () => {
    const required = schemaFor(field({ name: "F", required: true }));
    const optional = schemaFor(field({ name: "F" }));
    const requiredNullable = schemaFor(
      field({ name: "F", type: "nullable string", nullable: true, required: true }),
    );
    const optionalNullable = schemaFor(
      field({ name: "F", type: "nullable string", nullable: true }),
    );

    expect(required.expr).toBe("z.string()");
    expect(optional.expr).toBe("z.string().optional()");
    expect(requiredNullable.expr).toBe("z.string().nullable()");
    expect(optionalNullable.expr).toBe("z.string().nullable().optional()");

    // Present vs omitted vs null must differ across the matrix.
    expect(required.schema.safeParse({ F: "x" }).success).toBe(true);
    expect(required.schema.safeParse({ F: null }).success).toBe(false);
    expect(optional.schema.safeParse({ F: null }).success).toBe(false);
    expect(requiredNullable.schema.safeParse({ F: null }).success).toBe(true);
    expect(requiredNullable.schema.safeParse({}).success).toBe(false);
    expect(optionalNullable.schema.safeParse({}).success).toBe(true);
    expect(optionalNullable.schema.safeParse({ F: null }).success).toBe(true);
  });
});

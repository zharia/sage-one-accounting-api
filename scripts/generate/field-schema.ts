/**
 * Field → Zod expression mapping for the domain generator (M008 WP008.1).
 *
 * Pure module: no I/O, no catalogue access — importable by the generator and
 * by regression tests. Semantics:
 *
 * - Required / optional / nullable / non-nullable are distinct contracts and
 *   are preserved exactly (spec M008 §5.1.2).
 * - Wire primitives map to their precise Zod type; no broad unions.
 *   Decimal fields are JSON numbers (ADR-012, verified against published
 *   samples: `"Balance": 4.0`).
 * - Model references resolve to the emitted model schema via `z.lazy`
 *   (handles forward references and circular models).
 * - Enum references resolve to literal unions from published enum metadata.
 * - Collections retain element types.
 * - Read-only fields are never enforced as required (response-only data).
 * - Unknown source metadata is returned as `unsupported` for reporting —
 *   never silently widened into a permissive union.
 * - Documented source contradictions (property table vs published sample for
 *   the same field) resolve to a union of both published forms — see
 *   `CONTRADICTION_OVERRIDES`; no side is invented.
 * - Unresolved model references with scalar sample evidence resolve to the
 *   evidenced primitive type — see `UNRESOLVED_REF_OVERRIDES`; the value set
 *   stays unconstrained until the help page is fetched (TD-008).
 */

import type { ParameterField } from "../api-discovery/parse-help.js";

/** One published enumeration value. */
export interface EnumValueDefinition {
  readonly name: string;
  readonly value: number | string;
  readonly description: string;
}

/** Published enumeration definition (help page "Possible enumeration values"). */
export interface EnumDefinition {
  readonly modelName: string;
  readonly displayName: string;
  readonly values: readonly EnumValueDefinition[];
}

export interface FieldSchemaContext {
  /** Enum definitions keyed by model reference name (e.g. "PaymentMethod"). */
  readonly enums: ReadonlyMap<string, EnumDefinition>;
}

export interface FieldSchemaResult {
  /** Zod expression for the field, including `.nullable()` / `.optional()`. */
  readonly expr: string;
  /** Description of unsupported/ambiguous source metadata, or null. */
  readonly unsupported: string | null;
}

/** Sanitize a model reference into a valid TypeScript identifier. */
export function sanitizeIdentifier(name: string): string {
  return name.replace(/[^A-Za-z0-9_]/g, "_");
}

/** Strip the leading `nullable` marker from a scalar type text. */
function stripNullable(typeText: string): { text: string; nullable: boolean } {
  const match = /^nullable\s+(.+)$/i.exec(typeText.trim());
  if (match?.[1]) return { text: match[1].trim(), nullable: true };
  return { text: typeText.trim(), nullable: false };
}

/** Literal union for a published enum, or null when the enum has no values. */
function enumExpr(def: EnumDefinition): string | null {
  if (def.values.length === 0) return null;
  const literals = def.values.map((v) =>
    typeof v.value === "number" ? `z.literal(${v.value})` : `z.literal(${JSON.stringify(v.value)})`,
  );
  const unique = [...new Set(literals)];
  return unique.length === 1 ? (unique[0] as string) : `z.union([${unique.join(", ")}])`;
}

/**
 * Documented source contradictions (WP008.1 §5.1.2): fields where the Sage
 * help property table and the published sample for the same model disagree.
 * Each entry is a union of both documented wire forms — nothing is invented —
 * and is a candidate for collapse once live evidence exists (WP008.4).
 * Keys are `<modelName>.<fieldName>`.
 */
const CONTRADICTION_OVERRIDES: ReadonlyMap<string, string> = new Map([
  [
    "AccountantNoteRequestModel.Status",
    // Property table: "nullable bool" (verified on the raw help page);
    // published request and response samples: 1; sister response model
    // AccountantNote.Status: "nullable integer".
    "z.union([z.boolean(), z.number().int()])",
  ],
]);

/**
 * Map a non-collection type (primitive, builtin or model reference) to a Zod
 * expression. `typeText` must already have any `nullable` marker stripped.
 */
function baseExpr(
  typeText: string,
  modelRef: string | null,
  ctx: FieldSchemaContext,
): FieldSchemaResult {
  // Model reference wins over type text (authoritative link on the help page).
  if (modelRef !== null) {
    const enumDef = ctx.enums.get(modelRef);
    if (enumDef) {
      const expr = enumExpr(enumDef);
      if (expr === null) {
        return { expr: "z.unknown()", unsupported: `enum ${modelRef} has no published values` };
      }
      return { expr, unsupported: null };
    }
    return { expr: `z.lazy(() => ${sanitizeIdentifier(modelRef)}Schema)`, unsupported: null };
  }

  const t = typeText.toLowerCase();

  if (t === "integer" || t === "byte") return { expr: "z.number().int()", unsupported: null };
  // ADR-012: Sage serialises decimals as JSON numbers (verified in help samples).
  if (t === "decimal") return { expr: "z.number()", unsupported: null };
  if (t === "bool") return { expr: "z.boolean()", unsupported: null };
  if (t === "string" || t === "date" || t === "globally unique identifier") {
    return { expr: "z.string()", unsupported: null };
  }
  if (t === "object") return { expr: "z.record(z.string(), z.unknown())", unsupported: null };
  if (t === "pair of string [key] and string [value]") {
    return { expr: "z.record(z.string(), z.string())", unsupported: null };
  }
  // Sample-inferred fields whose sample carried no type evidence (null value):
  // an explicit unknown, not silently widened knowledge.
  if (t === "unknown") return { expr: "z.unknown()", unsupported: null };

  return { expr: "z.unknown()", unsupported: `unsupported field type "${typeText}"` };
}

/**
 * Model references whose help page could not be fetched (help-site
 * throttling, tracked in `milestones/technical-debt.md` TD-008) where the
 * published sample still gives wire-type evidence for the field. The base
 * type comes from that evidence; the value set stays unconstrained until the
 * enum page is fetched, at which point the entry is removed and the normal
 * literal-union mapping applies. Keys are `<modelName>.<fieldName>`.
 */
const UNRESOLVED_REF_OVERRIDES: ReadonlyMap<string, string> = new Map([
  [
    "BASReport.TaxReportingType",
    // Enum page unfetched (TD-008). Evidence: published response sample
    // `POST-BASReport-Get` shows `"TaxReportingType": 0`; the sister field
    // `TaxReportingTypeId` is a documented integer; every fetched sibling
    // enumeration is integer-valued on the wire.
    "z.number().int()",
  ],
  [
    "TakeOnAccountBalance.AccountType",
    // Enum page unfetched (TD-008). Evidence: published samples
    // `POST-TakeOnBalance-Get` (response) and `POST-TakeOnBalance-Save`
    // (request) both show `"AccountType": 1`.
    "z.number().int()",
  ],
]);

/**
 * Resolve the base expression for a field: documented contradictions win over
 * unresolved-ref sample evidence, which wins over the normal type mapping
 * (each override already encodes its published evidence).
 */
function resolveBase(
  field: ParameterField,
  modelName: string,
  typeText: string,
  ctx: FieldSchemaContext,
): FieldSchemaResult {
  const key = `${modelName}.${field.name}`;
  const contradiction = CONTRADICTION_OVERRIDES.get(key);
  if (contradiction !== undefined) return { expr: contradiction, unsupported: null };
  const unresolvedRef = UNRESOLVED_REF_OVERRIDES.get(key);
  if (unresolvedRef !== undefined) return { expr: unresolvedRef, unsupported: null };
  return baseExpr(typeText, field.modelRef, ctx);
}

/**
 * Map a catalogue parameter field to its Zod expression.
 *
 * Modifier order is `<base> [.nullable()] [.optional()]`; optional is
 * `!required` (read-only fields are response-only, never required).
 * `modelName` scopes documented-contradiction overrides.
 */
export function fieldToZodExpr(
  field: ParameterField,
  ctx: FieldSchemaContext,
  modelName = "",
): FieldSchemaResult {
  let expr: string;
  let unsupported: string | null;

  if (field.isCollection) {
    // `nullable` inside a collection type text ("Collection of nullable decimal")
    // describes the element, not the array itself. Sample-inferred fields carry
    // the nullable flag without a type-text marker — honour both.
    const itemText = field.type.replace(/^collection of\s+/i, "").trim();
    const item = stripNullable(itemText);
    const nullable = item.nullable || field.nullable;
    const override = CONTRADICTION_OVERRIDES.get(`${modelName}.${field.name}`);
    if (override !== undefined) {
      expr = `z.array(${nullable ? `${override}.nullable()` : override})`;
      unsupported = null;
    } else if (item.text.toLowerCase() === "byte") {
      // .NET `byte[]` serialises as ONE base64 JSON string on the wire: every
      // published sample shows `"QEA="`, never a numeric array (contrast
      // scalar `byte`, a JSON number — Company.InventoryTypeId: 64).
      expr = nullable ? "z.string().nullable()" : "z.string()";
      unsupported = null;
    } else {
      const base = baseExpr(item.text, field.modelRef, ctx);
      unsupported = base.unsupported;
      expr = `z.array(${nullable ? `${base.expr}.nullable()` : base.expr})`;
    }
  } else {
    const scalar = stripNullable(field.type);
    const base = resolveBase(field, modelName, scalar.text, ctx);
    unsupported = base.unsupported;
    const nullable = scalar.nullable || field.nullable;
    expr = nullable ? `${base.expr}.nullable()` : base.expr;
  }

  const optional = !field.required || field.readOnly;
  if (optional) expr = `${expr}.optional()`;

  return { expr, unsupported };
}

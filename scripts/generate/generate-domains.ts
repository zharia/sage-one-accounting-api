/**
 * Code generator for M005 (Commercial transactions) and M006 (Banking, reporting & advanced domains)
 * from the verified contract catalogue (`contracts/sage-api/endpoint-catalogue.json`) and
 * resource models (`contracts/sage-api/snapshots/resource-models.json`).
 *
 * Follows spec §6.4:
 * - Every generated file carries a source/generator header.
 * - Hand-maintained M004 logic is never overwritten.
 * - Every generated operation is traceable to its `endpoint-catalogue.json` ID.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { format, resolveConfig } from "prettier";

import type { EndpointCatalogueRecord, ParameterField } from "../api-discovery/parse-help.ts";
import {
  fieldToZodExpr,
  sanitizeIdentifier,
  type EnumDefinition,
  type FieldSchemaContext,
} from "./field-schema.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "../..");
const CATALOGUE_PATH = resolve(REPO_ROOT, "contracts/sage-api/endpoint-catalogue.json");
const MODELS_PATH = resolve(REPO_ROOT, "contracts/sage-api/snapshots/resource-models.json");
const EXTENSIONS_PATH = resolve(REPO_ROOT, "contracts/sage-api/snapshots/model-extensions.json");

interface CatalogueFile {
  readonly discoveredAt: string;
  readonly endpoints: readonly EndpointCatalogueRecord[];
}

interface ModelExtensionsFile {
  readonly models: Record<string, readonly ParameterField[]>;
  readonly enums: Record<string, EnumDefinition>;
}

const catalogue = JSON.parse(readFileSync(CATALOGUE_PATH, "utf8")) as CatalogueFile;
const explicitModels = JSON.parse(readFileSync(MODELS_PATH, "utf8")) as Record<
  string,
  readonly ParameterField[]
>;
const extensions: ModelExtensionsFile = existsSync(EXTENSIONS_PATH)
  ? (JSON.parse(readFileSync(EXTENSIONS_PATH, "utf8")) as ModelExtensionsFile)
  : { models: {}, enums: {} };

// Build unified model dictionary (resource-models.json + WP008.1 model extensions;
// sample inference below only fills models still missing after both).
const allModels = new Map<string, readonly ParameterField[]>();
for (const [k, v] of Object.entries(explicitModels)) {
  allModels.set(k, v);
}
for (const [k, v] of Object.entries(extensions.models)) {
  allModels.set(k, v);
}

const enumMap = new Map<string, EnumDefinition>(Object.entries(extensions.enums));
const schemaCtx: FieldSchemaContext = { enums: enumMap };

/** Unsupported/ambiguous source metadata recorded during generation (WP008.1 §5.1.2). */
const unsupportedFields: string[] = [];

function inferFieldsFromSampleObj(obj: Record<string, unknown>): ParameterField[] {
  const fields: ParameterField[] = [];
  for (const [k, v] of Object.entries(obj)) {
    let type = "string";
    let isCollection = false;
    if (v === null) {
      // Sample carries no type evidence — never guess a concrete type (WP008.1).
      type = "unknown";
    } else if (typeof v === "number") {
      type = Number.isInteger(v) ? "integer" : "decimal";
    } else if (typeof v === "boolean") {
      type = "bool";
    } else if (Array.isArray(v)) {
      isCollection = true;
      const first = v[0];
      if (first === undefined || first === null) {
        type = "Collection of unknown";
      } else if (typeof first === "number") {
        type = Number.isInteger(first) ? "Collection of integer" : "Collection of decimal";
      } else if (typeof first === "string") {
        type = "Collection of string";
      } else if (typeof first === "boolean") {
        type = "Collection of bool";
      } else {
        type = "Collection of Object";
      }
    } else if (typeof v === "object") {
      type = "Object";
    }
    fields.push({
      name: k,
      type,
      modelRef: null,
      isCollection,
      required: false,
      readOnly: false,
      nullable: true,
      annotations: [],
      description: "",
    });
  }
  return fields;
}

for (const ep of catalogue.endpoints) {
  for (const schema of [ep.requestSchema, ep.responseSchema]) {
    const modelName =
      schema.kind === "page" || schema.kind === "collection"
        ? (schema.itemModelName ?? schema.modelName)
        : schema.modelName;
    if (!modelName || allModels.has(modelName)) continue;

    if (schema.kind === "object" && schema.fields.length > 0) {
      allModels.set(modelName, schema.fields);
      continue;
    }

    if (schema.sampleJson) {
      try {
        const parsed = JSON.parse(schema.sampleJson) as unknown;
        if (
          schema.kind === "page" &&
          parsed !== null &&
          typeof parsed === "object" &&
          "Results" in parsed &&
          Array.isArray((parsed as { Results: unknown[] }).Results)
        ) {
          const first = (parsed as { Results: unknown[] }).Results[0];
          if (first !== null && typeof first === "object" && !Array.isArray(first)) {
            allModels.set(modelName, inferFieldsFromSampleObj(first as Record<string, unknown>));
          }
        } else if (
          schema.kind === "collection" &&
          Array.isArray(parsed) &&
          parsed[0] !== null &&
          typeof parsed[0] === "object" &&
          !Array.isArray(parsed[0])
        ) {
          allModels.set(modelName, inferFieldsFromSampleObj(parsed[0] as Record<string, unknown>));
        } else if (
          schema.kind === "object" &&
          parsed !== null &&
          typeof parsed === "object" &&
          !Array.isArray(parsed)
        ) {
          allModels.set(modelName, inferFieldsFromSampleObj(parsed as Record<string, unknown>));
        }
      } catch {
        // Ignore non-JSON sample
      }
    }
  }
}

function toCamelCase(input: string): string {
  if (/^[A-Z0-9]+$/.test(input)) {
    return input.toLowerCase();
  }
  const normalized = input.replace(/^([A-Z]+)/, (match) =>
    match.length > 1 ? match.slice(0, -1).toLowerCase() + match.slice(-1) : match.toLowerCase(),
  );
  return normalized.charAt(0).toLowerCase() + normalized.slice(1);
}

export function resolveMethodName(ep: EndpointCatalogueRecord): string {
  if (ep.id === "GET-AdditionalPriceList-Get") return "list";
  if (ep.id === "POST-AdditionalPriceList-Get") return "getByIds";
  if (ep.id === "GET-DeveloperData-GetUserData") return "listUserData";
  if (ep.id === "GET-DeveloperData-GetUserData-id") return "getUserDataById";
  if (ep.id === "GET-DeveloperData-GetRegistrationData") return "listRegistrationData";
  if (ep.id === "GET-DeveloperData-GetRegistrationData-id") return "getRegistrationDataById";
  if (ep.id === "GET-DeveloperData-GetCompanyData") return "listCompanyData";
  if (ep.id === "GET-DeveloperData-GetCompanyData-id") return "getCompanyDataById";
  if (ep.id === "GET-FinalAccounts-Get_accountId") return "getByAccountId";
  if (ep.id === "GET-FinalAccounts-Get") return "get";
  if (ep.id === "GET-Quote-Summary") return "summary";
  if (ep.id === "GET-Quote-Summary-id") return "summaryByCustomerId";
  if (ep.id === "DELETE-TimeTrackingProject-Delete-id") return "delete";
  if (ep.id === "POST-TimeTrackingProject-Delete") return "deleteProjects";
  if (ep.id === "GET-CustomerAdditionalContactOptions-Get") return "list";
  if (ep.id === "GET-RecurringInvoice-Get_includeDetail") return "list";

  const op = ep.operation;
  if (
    op === "Get" &&
    (ep.pagingBehaviour === "paged_envelope" || ep.responseSchema.kind === "collection") &&
    ep.method === "GET"
  ) {
    return "list";
  }
  if (op === "GetById") {
    return "get";
  }
  return toCamelCase(op);
}

export function toClientPropertyName(serviceId: string): string {
  const overrides: Readonly<Record<string, string>> = {
    CRMActivity: "crmActivities",
    CRMActivityCategory: "crmActivityCategories",
    BASReport: "basReports",
    VAT201Report: "vat201Reports",
    ToDoList: "toDoLists",
    CustomerSalesHistory: "customerSalesHistories",
    SupplierPurchaseHistory: "supplierPurchaseHistories",
    DocumentHistory: "documentHistories",
    AnalysisCategory: "analysisCategories",
    AssetCategory: "assetCategories",
    BankAccountCategory: "bankAccountCategories",
    City: "cities",
    Currency: "currencies",
    ScheduleFrequency: "scheduleFrequencies",
    TimeTrackingSummaryEntry: "timeTrackingSummaryEntries",
  };
  if (overrides[serviceId]) {
    return overrides[serviceId]!;
  }
  const camel = toCamelCase(serviceId);
  if (
    camel.endsWith("s") ||
    camel.endsWith("Data") ||
    camel.endsWith("Information") ||
    camel.endsWith("Report") ||
    camel.endsWith("Ageing") ||
    camel.endsWith("Listing") ||
    camel.endsWith("Expense") ||
    camel.endsWith("Loss") ||
    camel.endsWith("Sheet") ||
    camel.endsWith("Balance") ||
    camel.endsWith("Manager") ||
    camel.endsWith("Payroll") ||
    camel.endsWith("Localization") ||
    camel.endsWith("Test")
  ) {
    return camel;
  }
  if (camel.endsWith("y") && !/[aeiou]y$/i.test(camel)) {
    return `${camel.slice(0, -1)}ies`;
  }
  return `${camel}s`;
}

export interface DomainModuleConfig {
  readonly domainKey: string;
  readonly filePath: string;
  readonly milestone: "M005" | "M006";
  readonly services: readonly string[];
  readonly existingModelNames?: readonly string[];
}

export const DOMAIN_MODULES: readonly DomainModuleConfig[] = [
  {
    domainKey: "sales",
    filePath: "src/domains/sales/index.ts",
    milestone: "M005",
    services: [
      "Quote",
      "QuoteAttachment",
      "TaxInvoice",
      "TaxInvoiceAttachment",
      "SalesOrder",
      "SalesOrderAttachment",
      "RecurringInvoice",
      "SalesRepresentative",
      "SalesRepresentativeNote",
      "DocumentNumber",
      "DocumentMessage",
      "DocumentHeaderNote",
      "DocumentHistory",
      "DocumentUserDefinedFields",
      "DocumentFileAttachment",
      "Attachment",
      "EmailSignatureTemplate",
      "EmailTemplatePlaceHolder",
    ],
  },
  {
    domainKey: "purchases",
    filePath: "src/domains/purchases/index.ts",
    milestone: "M005",
    services: [
      "PurchaseOrder",
      "PurchaseOrderAttachment",
      "SupplierInvoice",
      "SupplierInvoiceAttachment",
      "SupplierPayment",
      "SupplierReturn",
      "SupplierReturnAttachment",
      "SupplierAdjustment",
      "OutstandingSupplierDocument",
      "SupplierAgeing",
      "SupplierTransactionListing",
      "SupplierPurchaseHistory",
    ],
  },
  {
    domainKey: "customers-m005",
    filePath: "src/domains/customers/m005.ts",
    milestone: "M005",
    services: [
      "CustomerReceipt",
      "CustomerReturn",
      "CustomerReturnAttachment",
      "CustomerAdjustment",
      "CustomerWriteOff",
      "Allocation",
      "OutstandingCustomerDocument",
      "CustomerAgeing",
      "CustomerTransactionListing",
      "CustomerSalesHistory",
      "CustomerZone",
      "CustomerAdditionalContactDetail",
      "CustomerAdditionalContactOptions",
      "CustomerNoteAttachment",
      "DashboardDebtorsManager",
    ],
    existingModelNames: [
      "CustomerCategory",
      "Customer",
      "CustomerOpeningBalance",
      "CustomerStatement",
      "CustomerStatementLine",
      "CustomerStatementRequestModel",
      "CustomerNote",
    ],
  },
  {
    domainKey: "suppliers-m005",
    filePath: "src/domains/suppliers/m005.ts",
    milestone: "M005",
    services: ["SupplierAdditionalContactDetail", "SupplierBankDetail", "SupplierNoteAttachment"],
    existingModelNames: [
      "SupplierCategory",
      "Supplier",
      "SupplierOpeningBalance",
      "SupplierStatement",
      "SupplierStatementLine",
      "SupplierStatementRequestModel",
      "SupplierNote",
    ],
  },
  {
    domainKey: "inventory-m005",
    filePath: "src/domains/inventory/m005.ts",
    milestone: "M005",
    services: [
      "ItemAdjustment",
      "ItemAttachment",
      "ItemBundle",
      "ItemMovement",
      "ItemNoteAttachment",
      "ItemReportGroup",
      "AdditionalItemPrice",
      "AdditionalPriceList",
      "PurchasesByItem",
      "SalesByItem",
      "PriceListingReport",
    ],
    existingModelNames: ["ItemCategory", "Item", "ItemOpeningBalance", "ItemNote"],
  },
  {
    domainKey: "banking",
    filePath: "src/domains/banking/index.ts",
    milestone: "M006",
    services: [
      "BankAccount",
      "BankAccountCategory",
      "BankAccountNote",
      "BankAccountNoteAttachment",
      "BankAccountOpeningBalance",
      "BankAccountTransactionListing",
      "BankImportMapping",
      "BankStatementTransaction",
      "BankTransaction",
      "BankTransactionAttachment",
      "ProcessBankAndCreditCardMapping",
      "CashMovement",
    ],
  },
  {
    domainKey: "accounting-m006",
    filePath: "src/domains/accounting/m006.ts",
    milestone: "M006",
    services: [
      "AccountPayment",
      "AccountReceipt",
      "AccountNoteAttachment",
      "JournalEntry",
      "RecurringJournal",
      "DetailedLedgerTransaction",
      "FinancialYear",
      "Budget",
      "TakeOnBalance",
      "AnalysisCategory",
      "AnalysisType",
      "ReportingGroup",
    ],
    existingModelNames: [
      "AccountCategory",
      "Account",
      "DateRange",
      "BudgetItemPeriod",
      "AccountBalance",
      "BudgetAccountBalance",
      "AccountOpeningBalance",
      "AccountNote",
    ],
  },
  {
    domainKey: "assets",
    filePath: "src/domains/assets/index.ts",
    milestone: "M006",
    services: ["Asset", "AssetCategory", "AssetLocation", "AssetNote"],
  },
  {
    domainKey: "taxation-m006",
    filePath: "src/domains/taxation/m006.ts",
    milestone: "M006",
    services: ["TaxAdjustment", "TaxRateAdjustment", "TaxPeriod", "BASReport", "VAT201Report"],
    existingModelNames: ["TaxType"],
  },
  {
    domainKey: "reporting",
    filePath: "src/domains/reporting/index.ts",
    milestone: "M006",
    services: [
      "BalanceSheet",
      "ProfitAndLoss",
      "TrialBalance",
      "TrialBalanceExportMapping",
      "FinalAccounts",
      "IncomeVsExpense",
      "SalesBySalesRepresentative",
      "TopCustomersByOutstandingBalance",
      "TopCustomersBySales",
      "TopPurchasedItems",
      "TopSellingItems",
      "TopSellingItemsByValueOnHand",
      "TopSuppliersByOutstandingBalance",
      "TopSuppliersByPurchases",
    ],
  },
  {
    domainKey: "time-tracking",
    filePath: "src/domains/time-tracking/index.ts",
    milestone: "M006",
    services: [
      "TimeTrackingCustomer",
      "TimeTrackingExpense",
      "TimeTrackingProject",
      "TimeTrackingTask",
      "TimeTrackingTimesheet",
      "TimeTrackingUser",
    ],
  },
  {
    domainKey: "crm",
    filePath: "src/domains/crm/index.ts",
    milestone: "M006",
    services: [
      "CRMActivity",
      "CRMActivityCategory",
      "AccountantEvent",
      "AccountantNote",
      "AccountantNoteAttachment",
      "AccountantTask",
      "AccountantTaskRecurrence",
      "ToDoList",
    ],
  },
  {
    domainKey: "company-m006",
    filePath: "src/domains/company/m006.ts",
    milestone: "M006",
    services: [
      "SecretarialCompanyRole",
      "SecretarialShareClass",
      "SecretarialShareholder",
      "SecretarialStakeHolder",
    ],
    existingModelNames: ["CompanyLogo", "Company", "CompanyEntityType", "CompanyNote"],
  },
  {
    domainKey: "administration-m006",
    filePath: "src/domains/administration/m006.ts",
    milestone: "M006",
    services: [
      "City",
      "Currency",
      "DateFormat",
      "DeveloperData",
      "ExchangeRates",
      "Localization",
      "ScheduleFrequency",
      "UserDefinedField",
      "SageIdUser",
      "SupportLoginAudit",
      "CoreEvents",
      "CoreTokens",
      "Payroll",
      "Test",
    ],
    existingModelNames: ["AuthenticationCredentials"],
  },
];

// Global set of emitted model names so we never collide across barrel re-exports in src/index.ts
const NON_SCHEMA_MODELS: ReadonlySet<string> = new Set([
  "IHttpActionResult",
  "HttpResponseMessage",
  "Object",
  "boolean",
  "number",
  "string",
  "multipart/form-data",
  "application/octet-stream",
]);

const globallyEmittedModels = new Set<string>([
  "TaxType",
  "AccountCategory",
  "Account",
  "DateRange",
  "BudgetItemPeriod",
  "AccountBalance",
  "BudgetAccountBalance",
  "AccountOpeningBalance",
  "AccountNote",
  "CompanyLogo",
  "Company",
  "CompanyEntityType",
  "CompanyNote",
  "CustomerCategory",
  "Customer",
  "CustomerOpeningBalance",
  "CustomerStatement",
  "CustomerStatementLine",
  "CustomerStatementRequestModel",
  "CustomerNote",
  "SupplierCategory",
  "Supplier",
  "SupplierOpeningBalance",
  "SupplierStatement",
  "SupplierStatementLine",
  "SupplierStatementRequestModel",
  "SupplierNote",
  "ItemCategory",
  "Item",
  "ItemOpeningBalance",
  "ItemNote",
  "AuthenticationCredentials",
]);

function getAttachmentParentParam(ep: EndpointCatalogueRecord): string {
  const m = ep.summary.match(/a\s+([A-Za-z0-9_]+Id)\s+is\s+required/i);
  if (m?.[1]) {
    return m[1];
  }
  const m2 = ep.summary.match(/An?\s+([A-Za-z0-9_]+Id)\s+is\s+the\s+ID/i);
  if (m2?.[1]) {
    return m2[1];
  }
  return "TransactionId";
}

async function generateDomainModule(config: DomainModuleConfig): Promise<void> {
  const serviceSet = new Set(config.services);
  const endpoints = catalogue.endpoints.filter((e) => serviceSet.has(e.service));

  // Collect models referenced in this domain module
  const referencedModels = new Set<string>();
  for (const ep of endpoints) {
    for (const s of [ep.requestSchema, ep.responseSchema]) {
      const m =
        s.kind === "page" || s.kind === "collection"
          ? (s.itemModelName ?? s.modelName)
          : s.modelName;
      if (m && !NON_SCHEMA_MODELS.has(m) && !m.startsWith("MetaDataResponse")) {
        referencedModels.add(m);
      }
    }
  }

  // WP008.1 §5.1.3: also emit every model reachable through nested field
  // references so `z.lazy(() => XSchema)` always resolves within the module
  // (including circular references).
  const closureQueue = [...referencedModels];
  while (closureQueue.length > 0) {
    const current = closureQueue.pop() as string;
    for (const nested of allModels.get(current) ?? []) {
      const ref = nested.modelRef;
      if (!ref || enumMap.has(ref) || NON_SCHEMA_MODELS.has(ref)) continue;
      if (ref.startsWith("MetaDataResponse") || referencedModels.has(ref)) continue;
      referencedModels.add(ref);
      closureQueue.push(ref);
    }
  }

  const localModels = new Set<string>();
  const lines: string[] = [];

  lines.push("/**");
  lines.push(
    ` * AUTO-GENERATED from contracts/sage-api/endpoint-catalogue.json (${config.milestone}).`,
  );
  lines.push(" * Generator: scripts/generate/generate-domains.ts");
  lines.push(" * Do not edit manually without updating the contract catalogue.");
  lines.push(" */");
  lines.push("");
  lines.push('import { z } from "zod";');
  lines.push("");
  lines.push("import {");
  lines.push("  paginateItems,");
  lines.push("  paginatePages,");
  lines.push("  type PageIterationEnvelope,");
  lines.push("  type PaginationOptions,");
  lines.push("  type RequestOptions,");
  lines.push("  type SagePage,");
  lines.push('} from "../../types/index.js";');
  lines.push('import { createSagePageSchema } from "../../validation/index.js";');
  lines.push('import { buildQueryWithOData, type SageRequestExecutor } from "../executor.js";');
  lines.push("");

  // Emit model schemas
  for (const rawModelName of [...referencedModels].sort()) {
    const safeName = sanitizeIdentifier(rawModelName);
    const exportModel = !globallyEmittedModels.has(safeName);
    globallyEmittedModels.add(safeName);
    localModels.add(safeName);

    const fields = allModels.get(rawModelName) ?? [];
    const seenFieldNames = new Set<string>();
    const kw = exportModel ? "export const" : "const";
    if (fields.length === 0) {
      lines.push(`${kw} ${safeName}Schema = z.record(z.string(), z.unknown());`);
    } else {
      lines.push(`${kw} ${safeName}Schema = z`);
      lines.push("  .object({");
      for (const f of fields) {
        if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(f.name) || seenFieldNames.has(f.name)) continue;
        seenFieldNames.add(f.name);
        const outcome = fieldToZodExpr(f, schemaCtx, rawModelName);
        if (outcome.unsupported !== null) {
          unsupportedFields.push(`${rawModelName}.${f.name}: ${outcome.unsupported}`);
        }
        const readOnlyNote = f.readOnly ? " // read-only / system generated" : "";
        if (f.modelRef === rawModelName) {
          // Self-referential model: a const cannot reference itself inside its
          // own initializer (TS7022/TS7024). Emit the field as a getter with a
          // direct reference instead of `z.lazy` — the getter body evaluates
          // only after the const is initialised (runtime-safe), and TypeScript
          // defers return-type inference through function bodies (WP008.1 §5.1.3,
          // circular model references).
          const direct = outcome.expr.replace(
            `z.lazy(() => ${safeName}Schema)`,
            `${safeName}Schema`,
          );
          lines.push(`    get ${f.name}() {`);
          lines.push(`      return ${direct};${readOnlyNote}`);
          lines.push("    },");
        } else {
          lines.push(`    ${f.name}: ${outcome.expr},${readOnlyNote}`);
        }
      }
      lines.push("  })");
      lines.push("  .passthrough();");
    }
    if (exportModel) {
      lines.push(`export type ${safeName} = z.infer<typeof ${safeName}Schema>;`);
    }
    lines.push("");
  }

  // Group endpoints by service in order of config.services
  for (const serviceId of config.services) {
    const svcEndpoints = endpoints.filter((e) => e.service === serviceId);
    const className = `${serviceId}Service`;

    lines.push(`export class ${className} {`);
    lines.push("  private readonly executor: SageRequestExecutor;");
    lines.push("");
    lines.push("  public constructor(executor: SageRequestExecutor) {");
    lines.push("    this.executor = executor;");
    lines.push("  }");

    for (const ep of svcEndpoints) {
      const methodName = resolveMethodName(ep);
      const isMutation =
        ep.method === "POST" || ep.method === "PUT" || ep.method === "DELETE"
          ? !ep.operation.toLowerCase().startsWith("get") &&
            !ep.operation.toLowerCase().startsWith("calculate") &&
            !ep.operation.toLowerCase().startsWith("validate") &&
            !ep.operation.toLowerCase().startsWith("allow") &&
            !ep.operation.toLowerCase().startsWith("has") &&
            !ep.operation.toLowerCase().startsWith("check")
          : false;

      // Determine path parameters
      const routeParamNames = [...ep.route.matchAll(/\{([^}]+)\}/g)].map((m) => m[1] ?? "id");
      const pathArgs: string[] = routeParamNames.map((pName) => {
        const meta = ep.pathParameters.find((p) => p.name.toLowerCase() === pName.toLowerCase());
        const pType =
          meta?.type.toLowerCase().includes("guid") ||
          meta?.type.toLowerCase().includes("identifier") ||
          meta?.type.toLowerCase().includes("string")
            ? "string"
            : "number | string";
        return `${pName}: ${pType}`;
      });

      // Determine body parameter
      let bodyArg: string | null = null;
      let requestSchemaExpr: string | null = null;
      const isMultipart = ep.fileHandling === "multipart_upload";

      if (isMultipart) {
        const parentParam = getAttachmentParentParam(ep);
        bodyArg = `upload: { readonly ${parentParam}: number | string; readonly file: Blob | Uint8Array | string; readonly fileName?: string | undefined; readonly fieldName?: string | undefined }`;
      } else if (ep.requestSchema.kind !== "empty") {
        const reqModelRaw = ep.requestSchema.itemModelName ?? ep.requestSchema.modelName;
        const reqModelSafe = reqModelRaw ? sanitizeIdentifier(reqModelRaw) : null;
        if (ep.requestSchema.kind === "collection") {
          if (reqModelSafe && localModels.has(reqModelSafe)) {
            const itemType = globallyEmittedModels.has(reqModelSafe)
              ? `z.infer<typeof ${reqModelSafe}Schema>`
              : "Record<string, unknown>";
            bodyArg = `input: readonly ${itemType}[]`;
            requestSchemaExpr = `z.array(${reqModelSafe}Schema)`;
          } else {
            bodyArg = "input: readonly (number | string | Record<string, unknown>)[]";
            requestSchemaExpr =
              "z.array(z.union([z.number(), z.string(), z.record(z.string(), z.unknown())]))";
          }
        } else if (ep.requestSchema.kind === "primitive") {
          const prim = ep.requestSchema.modelName ?? "string";
          bodyArg = `input: ${prim}`;
          requestSchemaExpr = `z.${prim}()`;
        } else if (reqModelSafe && localModels.has(reqModelSafe)) {
          bodyArg = `input: z.infer<typeof ${reqModelSafe}Schema>`;
          requestSchemaExpr = `${reqModelSafe}Schema`;
        } else {
          bodyArg = "input?: unknown";
        }
      }

      // Determine query parameters
      const queryParams =
        ep.id === "GET-FinalAccounts-Get_accountId"
          ? [{ name: "accountId", type: "integer", required: true }]
          : ep.id === "GET-FinalAccounts-GetByCompanyId_companyId"
            ? [{ name: "companyId", type: "integer", required: true }]
            : ep.queryParameters;

      let optionsType = "RequestOptions";
      if (queryParams.length > 0) {
        const qFields = queryParams
          .map((qp) => {
            const qt = qp.type.toLowerCase().includes("bool")
              ? "boolean"
              : qp.type.toLowerCase().includes("int") || qp.type.toLowerCase().includes("decimal")
                ? "number"
                : "string | number";
            return `readonly ${qp.name}?: ${qt} | undefined`;
          })
          .join("; ");
        optionsType = `RequestOptions & { ${qFields} }`;
      }

      // Determine response type & schema
      let returnType: string;
      let responseSchemaExpr: string | null = null;
      let responseTypeExpr: string | null = null;

      const resModelRaw = ep.responseSchema.itemModelName ?? ep.responseSchema.modelName;
      const resModelSafe = resModelRaw ? sanitizeIdentifier(resModelRaw) : null;

      if (ep.fileHandling === "binary_download" || ep.responseSchema.kind === "binary") {
        returnType = "ArrayBuffer";
        responseTypeExpr = '"binary"';
      } else if (ep.responseSchema.kind === "empty") {
        returnType = "void";
        responseTypeExpr = '"empty"';
      } else if (ep.responseSchema.kind === "page") {
        if (resModelSafe && localModels.has(resModelSafe)) {
          returnType = `SagePage<z.infer<typeof ${resModelSafe}Schema>>`;
          responseSchemaExpr = `createSagePageSchema(${resModelSafe}Schema)`;
        } else {
          returnType = "SagePage<Record<string, unknown>>";
          responseSchemaExpr = "createSagePageSchema(z.record(z.string(), z.unknown()))";
        }
      } else if (ep.responseSchema.kind === "collection") {
        if (resModelSafe && localModels.has(resModelSafe)) {
          returnType = `Array<z.infer<typeof ${resModelSafe}Schema>>`;
          responseSchemaExpr = `z.array(${resModelSafe}Schema)`;
        } else {
          returnType = "Array<Record<string, unknown>>";
          responseSchemaExpr = "z.array(z.record(z.string(), z.unknown()))";
        }
      } else if (ep.responseSchema.kind === "primitive") {
        const prim = ep.responseSchema.modelName ?? "string";
        returnType = prim;
        responseSchemaExpr = `z.${prim}()`;
      } else if (
        ep.responseSchema.kind === "object" &&
        resModelSafe &&
        localModels.has(resModelSafe)
      ) {
        returnType = `z.infer<typeof ${resModelSafe}Schema>`;
        responseSchemaExpr = `${resModelSafe}Schema`;
      } else {
        returnType = "unknown";
      }

      const methodArgs: string[] = [...pathArgs];
      if (bodyArg) {
        methodArgs.push(bodyArg);
      }
      methodArgs.push(`options?: ${optionsType}`);

      const pathExpr =
        routeParamNames.length === 0
          ? `"${ep.route}"`
          : "`" +
            ep.route.replace(
              /\{([^}]+)\}/g,
              (_m, pName: string) => `\${encodeURIComponent(String(${pName}))}`,
            ) +
            "`";

      lines.push("");
      lines.push(
        `  /** \`${ep.method} ${ep.route}\` [${ep.id}] — ${ep.summary || "Catalogued Sage One operation."} */`,
      );
      lines.push(
        `  public async ${methodName}(${methodArgs.join(", ")}): Promise<${returnType}> {`,
      );

      if (isMultipart) {
        const parentParam = getAttachmentParentParam(ep);
        lines.push("    const formData = new FormData();");
        lines.push(`    formData.set("${parentParam}", String(upload.${parentParam}));`);
        lines.push(
          '    const blob = upload.file instanceof Blob ? upload.file : new Blob([typeof upload.file === "string" ? upload.file : new Uint8Array(upload.file)]);',
        );
        lines.push(
          '    formData.set(upload.fieldName ?? "file", blob, upload.fileName ?? "attachment.bin");',
        );
      }

      if (queryParams.length > 0) {
        lines.push(
          "    const baseQuery: Record<string, string | number | boolean | undefined> = {};",
        );
        for (const qp of queryParams) {
          lines.push(`    if (options?.${qp.name} !== undefined) {`);
          lines.push(`      baseQuery["${qp.name}"] = options.${qp.name};`);
          lines.push("    }");
        }
      }

      const callPrefix = returnType === "void" ? "await " : "return ";
      lines.push(`    ${callPrefix}this.executor.request({`);
      lines.push(`      resource: "${ep.service}",`);
      lines.push(`      operation: "${ep.operation}",`);
      lines.push(`      method: "${ep.method}",`);
      lines.push(`      path: ${pathExpr},`);

      if (isMultipart) {
        const parentParam = getAttachmentParentParam(ep);
        lines.push(
          `      query: buildQueryWithOData({ ${parentParam}: upload.${parentParam} }, options?.odata),`,
        );
        lines.push("      formData,");
      } else if (queryParams.length > 0) {
        lines.push("      query: buildQueryWithOData(baseQuery, options?.odata),");
      } else if (ep.odataSupport) {
        lines.push("      query: buildQueryWithOData(undefined, options?.odata),");
      }

      if (!isMultipart && bodyArg) {
        lines.push("      body: input,");
      }
      if (requestSchemaExpr) {
        lines.push(`      requestSchema: ${requestSchemaExpr},`);
      }
      if (responseSchemaExpr) {
        lines.push(`      responseSchema: ${responseSchemaExpr},`);
      }
      if (responseTypeExpr) {
        lines.push(`      responseType: ${responseTypeExpr},`);
      }
      if (!ep.authenticationRequired) {
        lines.push("      requiresAuthentication: false,");
      }
      if (isMutation) {
        lines.push("      isFinancialMutation: true,");
      }
      lines.push("      options,");
      lines.push("    });");
      lines.push("  }");

      // If this is the primary GET list operation returning a page, emit pages() and iterate() helpers
      if (
        methodName === "list" &&
        ep.method === "GET" &&
        ep.pagingBehaviour === "paged_envelope" &&
        routeParamNames.length === 0
      ) {
        const itemType =
          resModelSafe && localModels.has(resModelSafe)
            ? `z.infer<typeof ${resModelSafe}Schema>`
            : "Record<string, unknown>";
        lines.push("");
        lines.push(`  /** Async page iterator for \`GET ${ep.route}\`. */`);
        lines.push(
          `  public pages(options?: ${optionsType} & PaginationOptions): AsyncGenerator<PageIterationEnvelope<${itemType}>, void, undefined> {`,
        );
        lines.push("    return paginatePages(");
        lines.push("      ({ skip, top, signal }) =>");
        lines.push("        this.list({");
        lines.push("          ...options,");
        lines.push("          signal: signal ?? options?.signal,");
        lines.push("          odata: {");
        lines.push(
          '            ...(options?.odata instanceof Object && "toParams" in options.odata ? options.odata.toParams() : options?.odata),',
        );
        lines.push("            $skip: skip,");
        lines.push("            $top: top,");
        lines.push("          },");
        lines.push("        }),");
        lines.push("      options,");
        lines.push("    );");
        lines.push("  }");
        lines.push("");
        lines.push(`  /** Async item iterator for \`GET ${ep.route}\`. */`);
        lines.push(
          `  public iterate(options?: ${optionsType} & PaginationOptions): AsyncGenerator<${itemType}, void, undefined> {`,
        );
        lines.push("    return paginateItems(");
        lines.push("      ({ skip, top, signal }) =>");
        lines.push("        this.list({");
        lines.push("          ...options,");
        lines.push("          signal: signal ?? options?.signal,");
        lines.push("          odata: {");
        lines.push(
          '            ...(options?.odata instanceof Object && "toParams" in options.odata ? options.odata.toParams() : options?.odata),',
        );
        lines.push("            $skip: skip,");
        lines.push("            $top: top,");
        lines.push("          },");
        lines.push("        }),");
        lines.push("      options,");
        lines.push("    );");
        lines.push("  }");
      }
    }

    lines.push("}");
    lines.push("");
  }

  const outAbs = resolve(REPO_ROOT, config.filePath);
  mkdirSync(dirname(outAbs), { recursive: true });
  await writeFormatted(outAbs, `${lines.join("\n")}\n`);
  console.log(
    `Generated ${config.filePath} (${config.services.length} services, ${endpoints.length} operations)`,
  );
}

/** Write generated content formatted with the repository Prettier config (deterministic). */
async function writeFormatted(absPath: string, content: string): Promise<void> {
  const config = await resolveConfig(absPath);
  const formatted = await format(content, { ...config, filepath: absPath });
  writeFileSync(absPath, formatted, "utf8");
}

async function generateClientFile(): Promise<void> {
  const m004Bindings: ReadonlyArray<{
    readonly serviceId: string;
    readonly prop: string;
    readonly className: string;
    readonly importPath: string;
  }> = [
    {
      serviceId: "Login",
      prop: "login",
      className: "LoginService",
      importPath: "../domains/administration/index.js",
    },
    {
      serviceId: "Account",
      prop: "accounts",
      className: "AccountsService",
      importPath: "../domains/accounting/index.js",
    },
    {
      serviceId: "AccountCategory",
      prop: "accountCategories",
      className: "AccountCategoriesService",
      importPath: "../domains/accounting/index.js",
    },
    {
      serviceId: "AccountBalance",
      prop: "accountBalances",
      className: "AccountBalancesService",
      importPath: "../domains/accounting/index.js",
    },
    {
      serviceId: "AccountOpeningBalance",
      prop: "accountOpeningBalances",
      className: "AccountOpeningBalancesService",
      importPath: "../domains/accounting/index.js",
    },
    {
      serviceId: "AccountNote",
      prop: "accountNotes",
      className: "AccountNotesService",
      importPath: "../domains/accounting/index.js",
    },
    {
      serviceId: "Company",
      prop: "company",
      className: "CompanyService",
      importPath: "../domains/company/index.js",
    },
    {
      serviceId: "CompanyEntityType",
      prop: "companyEntityTypes",
      className: "CompanyEntityTypesService",
      importPath: "../domains/company/index.js",
    },
    {
      serviceId: "CompanyNote",
      prop: "companyNotes",
      className: "CompanyNotesService",
      importPath: "../domains/company/index.js",
    },
    {
      serviceId: "Customer",
      prop: "customers",
      className: "CustomersService",
      importPath: "../domains/customers/index.js",
    },
    {
      serviceId: "CustomerCategory",
      prop: "customerCategories",
      className: "CustomerCategoriesService",
      importPath: "../domains/customers/index.js",
    },
    {
      serviceId: "CustomerOpeningBalance",
      prop: "customerOpeningBalances",
      className: "CustomerOpeningBalancesService",
      importPath: "../domains/customers/index.js",
    },
    {
      serviceId: "CustomerStatement",
      prop: "customerStatements",
      className: "CustomerStatementsService",
      importPath: "../domains/customers/index.js",
    },
    {
      serviceId: "CustomerNote",
      prop: "customerNotes",
      className: "CustomerNotesService",
      importPath: "../domains/customers/index.js",
    },
    {
      serviceId: "Supplier",
      prop: "suppliers",
      className: "SuppliersService",
      importPath: "../domains/suppliers/index.js",
    },
    {
      serviceId: "SupplierCategory",
      prop: "supplierCategories",
      className: "SupplierCategoriesService",
      importPath: "../domains/suppliers/index.js",
    },
    {
      serviceId: "SupplierOpeningBalance",
      prop: "supplierOpeningBalances",
      className: "SupplierOpeningBalancesService",
      importPath: "../domains/suppliers/index.js",
    },
    {
      serviceId: "SupplierStatement",
      prop: "supplierStatements",
      className: "SupplierStatementsService",
      importPath: "../domains/suppliers/index.js",
    },
    {
      serviceId: "SupplierNote",
      prop: "supplierNotes",
      className: "SupplierNotesService",
      importPath: "../domains/suppliers/index.js",
    },
    {
      serviceId: "TaxType",
      prop: "taxTypes",
      className: "TaxTypesService",
      importPath: "../domains/taxation/index.js",
    },
    {
      serviceId: "Item",
      prop: "items",
      className: "ItemsService",
      importPath: "../domains/inventory/index.js",
    },
    {
      serviceId: "ItemCategory",
      prop: "itemCategories",
      className: "ItemCategoriesService",
      importPath: "../domains/inventory/index.js",
    },
    {
      serviceId: "ItemOpeningBalance",
      prop: "itemOpeningBalances",
      className: "ItemOpeningBalancesService",
      importPath: "../domains/inventory/index.js",
    },
    {
      serviceId: "ItemNote",
      prop: "itemNotes",
      className: "ItemNotesService",
      importPath: "../domains/inventory/index.js",
    },
  ];

  const allBindings: Array<{
    readonly serviceId: string;
    readonly prop: string;
    readonly className: string;
    readonly importPath: string;
  }> = [...m004Bindings];

  for (const mod of DOMAIN_MODULES) {
    const barrelPath = mod.filePath
      .replace(/^src\//, "../")
      .replace(/\/m00[56]\.ts$/, "/index.js")
      .replace(/\.ts$/, ".js");
    for (const svc of mod.services) {
      allBindings.push({
        serviceId: svc,
        prop: toClientPropertyName(svc),
        className: `${svc}Service`,
        importPath: barrelPath,
      });
    }
  }

  const importsByPath = new Map<string, string[]>();
  for (const b of allBindings) {
    if (!importsByPath.has(b.importPath)) {
      importsByPath.set(b.importPath, []);
    }
    importsByPath.get(b.importPath)!.push(b.className);
  }

  const lines: string[] = [];
  lines.push("/**");
  lines.push(" * Primary developer-facing client for `@bytemoney/sage-one` (spec §12, ADR-001).");
  lines.push(
    " * Exposes all 162 catalogued Sage One Accounting API 2.0.0 services (622 operations).",
  );
  lines.push(" */");
  lines.push("");
  lines.push("import {");
  lines.push("  type AuthenticationResult,");
  lines.push("  BasicAndApiKeyAuthenticator,");
  lines.push("  type SageAuthenticator,");
  lines.push('} from "../auth/index.js";');
  lines.push("import {");
  lines.push("  type ResolvedSageOneConfig,");
  lines.push("  resolveConfig,");
  lines.push("  type SageOneConfigInput,");
  lines.push('} from "../config/index.js";');

  for (const [impPath, classes] of [...importsByPath.entries()].sort((a, b) =>
    a[0].localeCompare(b[0]),
  )) {
    const sortedClasses = [...new Set(classes)].sort();
    lines.push(`import { ${sortedClasses.join(", ")} } from "${impPath}";`);
  }

  lines.push(
    'import type { DomainOperationSpec, SageRequestExecutor } from "../domains/executor.js";',
  );
  lines.push("import {");
  lines.push("  createPinoLogger,");
  lines.push("  NOOP_LOGGER,");
  lines.push("  RedactingLogger,");
  lines.push("  type SageLogger,");
  lines.push('} from "../logging/index.js";');
  lines.push('import { SageTransport } from "../transport/index.js";');
  lines.push("");
  lines.push("export interface SageOneClientConfig extends SageOneConfigInput {");
  lines.push("  readonly authenticator?: SageAuthenticator | undefined;");
  lines.push("  readonly logger?: SageLogger | undefined;");
  lines.push("}");
  lines.push("");
  lines.push("export class SageOneClient implements SageRequestExecutor {");
  lines.push("  public readonly config: ResolvedSageOneConfig;");
  lines.push("  public readonly authenticator: SageAuthenticator;");
  lines.push("  public readonly logger: SageLogger;");
  lines.push("  public readonly transport: SageTransport;");
  lines.push("");

  for (const b of allBindings) {
    lines.push(`  public readonly ${b.prop}: ${b.className};`);
  }
  lines.push("  /** Alias for `taxInvoices` (`TaxInvoice` service). */");
  lines.push("  public readonly invoices: TaxInvoiceService;");
  lines.push("");
  lines.push("  public constructor(configInput: SageOneClientConfig = {}) {");
  lines.push(
    "    const { authenticator: customAuthenticator, logger: customLogger, ...rawConfig } = configInput;",
  );
  lines.push("    this.config = resolveConfig(rawConfig);");
  lines.push("");
  lines.push("    if (customLogger) {");
  lines.push("      this.logger = new RedactingLogger(");
  lines.push("        customLogger,");
  lines.push('        this.config.logging.enabled ? this.config.logging.level : "warn",');
  lines.push("      );");
  lines.push("    } else if (this.config.logging.enabled) {");
  lines.push("      this.logger = createPinoLogger(this.config.logging.level);");
  lines.push("    } else {");
  lines.push("      this.logger = NOOP_LOGGER;");
  lines.push("    }");
  lines.push("");
  lines.push("    this.authenticator =");
  lines.push("      customAuthenticator ??");
  lines.push("      new BasicAndApiKeyAuthenticator({");
  lines.push("        credentials: this.config.credentials,");
  lines.push("        apiKey: this.config.apiKey,");
  lines.push("        companyId: this.config.companyId,");
  lines.push("        logger: this.logger,");
  lines.push("      });");
  lines.push("");
  lines.push("    this.transport = new SageTransport({");
  lines.push("      config: this.config,");
  lines.push("      authenticator: this.authenticator,");
  lines.push("      logger: this.logger,");
  lines.push("    });");
  lines.push("");

  for (const b of allBindings) {
    lines.push(`    this.${b.prop} = new ${b.className}(this);`);
  }
  lines.push("    this.invoices = this.taxInvoices;");
  lines.push("  }");
  lines.push("");
  lines.push("  public async request<TReq = unknown, TRes = unknown>(");
  lines.push("    spec: DomainOperationSpec<TReq, TRes>,");
  lines.push("  ): Promise<TRes> {");
  lines.push("    return this.transport.execute<TReq, TRes>({");
  lines.push("      resource: spec.resource,");
  lines.push("      operation: spec.operation,");
  lines.push("      method: spec.method,");
  lines.push("      path: spec.path,");
  lines.push("      query: spec.query,");
  lines.push("      body: spec.body,");
  lines.push("      formData: spec.formData,");
  lines.push("      requestSchema: spec.requestSchema,");
  lines.push("      responseSchema: spec.responseSchema,");
  lines.push("      responseType: spec.responseType,");
  lines.push("      requiresAuthentication: spec.requiresAuthentication,");
  lines.push("      isFinancialMutation: spec.isFinancialMutation,");
  lines.push("      companyId: spec.options?.companyId,");
  lines.push("      timeout: spec.options?.timeout,");
  lines.push("      signal: spec.options?.signal,");
  lines.push("      headers: spec.options?.headers,");
  lines.push("    });");
  lines.push("  }");
  lines.push("");
  lines.push("  public async verifyAuthentication(options?: {");
  lines.push("    readonly signal?: AbortSignal | undefined;");
  lines.push("  }): Promise<AuthenticationResult> {");
  lines.push("    return this.authenticator.authenticate({");
  lines.push("      baseUrl: this.config.baseUrl,");
  lines.push("      apiKey: this.config.apiKey,");
  lines.push("      companyId: this.config.companyId,");
  lines.push("      fetch: this.config.fetch,");
  lines.push("      signal: options?.signal,");
  lines.push("    });");
  lines.push("  }");
  lines.push("}");

  const clientOut = resolve(REPO_ROOT, "src/client/index.ts");
  await writeFormatted(clientOut, `${lines.join("\n")}\n`);
  console.log(`Generated src/client/index.ts with ${allBindings.length} service properties.`);
}

async function runGeneration(): Promise<void> {
  for (const mod of DOMAIN_MODULES) {
    await generateDomainModule(mod);
  }
  await generateClientFile();

  if (unsupportedFields.length > 0) {
    console.warn(`generator: ${unsupportedFields.length} unsupported field(s) recorded:`);
    for (const entry of unsupportedFields) {
      console.warn(`  - ${entry}`);
    }
  } else {
    console.log("generator: all source field metadata mapped to precise schemas");
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runGeneration().catch((error: unknown) => {
    console.error("generation failed:", error);
    process.exitCode = 1;
  });
}

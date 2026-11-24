/**
 * Fetches ResourceModel help pages for every model referenced by the endpoint
 * catalogue (or by resource-models.json fields) that is absent from
 * resource-models.json, and classifies each page (M008 WP008.1 contract data):
 *
 * - Property table            -> model properties (ParameterField[])
 * - "Possible enumeration values" table -> enum definition (constrained values)
 * - Neither                   -> unresolved (reported, never guessed)
 *
 * Output: contracts/sage-api/snapshots/model-extensions.json
 * The file is additive: re-running discovery (discover.ts) does not overwrite it.
 *
 * Usage: node scripts/api-discovery/fetch-model-extensions.ts
 */

import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { parseParameterTable, stripHtml, type ParameterField } from "./parse-help.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "../..");
const CONTRACTS_DIR = resolve(REPO_ROOT, "contracts/sage-api");
const CATALOGUE_PATH = resolve(CONTRACTS_DIR, "endpoint-catalogue.json");
const MODELS_PATH = resolve(CONTRACTS_DIR, "snapshots/resource-models.json");
const OUT_PATH = resolve(CONTRACTS_DIR, "snapshots/model-extensions.json");

const PAGE_URL = (modelName: string): string =>
  `https://accounting.sageone.co.za/api/2.0.0/Help/ResourceModel?modelName=${encodeURIComponent(modelName)}`;

const USER_AGENT =
  "sage-one-typescript-discovery/0.1 (+https://github.com/zharia/sage-one-accounting-api)";
const CONCURRENCY = 1;
const DELAY_MS = 1500;
const MAX_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 20000;
/** Extra cooldown after an error page: the help site throttles bursts (HTTP 200 error pages). */
const ERROR_PAGE_COOLDOWN_MS = 45_000;

/** Top-level schema names that are wire primitives or framework types, not models. */
const NON_MODELS: ReadonlySet<string> = new Set([
  "Object",
  "boolean",
  "number",
  "string",
  "IHttpActionResult",
  "HttpResponseMessage",
  "multipart/form-data",
  "application/octet-stream",
]);

interface EnumRow {
  readonly name: string;
  readonly value: number | string;
  readonly description: string;
}

interface EnumDefinition {
  readonly modelName: string;
  readonly displayName: string;
  readonly values: readonly EnumRow[];
  readonly source: {
    readonly url: string;
    readonly retrievedAt: string;
    readonly sha256: string;
  };
}

interface ModelSource {
  readonly url: string;
  readonly retrievedAt: string;
  readonly sha256: string;
}

interface ModelExtensions {
  readonly schemaVersion: "1.0.0";
  readonly apiVersion: "2.0.0";
  readonly note: string;
  readonly generatedAt: string;
  readonly models: Record<string, readonly ParameterField[]>;
  readonly modelSources: Record<string, ModelSource>;
  readonly enums: Record<string, EnumDefinition>;
  readonly unresolved: Record<string, string>;
}

interface CatalogueFile {
  readonly endpoints: readonly {
    readonly requestSchema: {
      readonly modelName: string | null;
      readonly itemModelName: string | null;
      readonly kind: string;
      readonly fields: readonly ParameterField[];
    };
    readonly responseSchema: {
      readonly modelName: string | null;
      readonly itemModelName: string | null;
      readonly kind: string;
      readonly fields: readonly ParameterField[];
    };
  }[];
}

function topModelName(schema: CatalogueFile["endpoints"][number]["requestSchema"]): string | null {
  if (schema.kind === "page" || schema.kind === "collection") {
    return schema.itemModelName ?? schema.modelName;
  }
  return schema.modelName;
}

/**
 * Model names referenced anywhere (catalogue, base models, already-classified
 * extension models) that still need fetching. `classified` holds every name
 * already resolved to a model or enum; `extraFields` adds field references
 * discovered from previously fetched extension models (nested-reference closure).
 */
function computeMissingModels(
  classified: ReadonlySet<string>,
  extraFields: Iterable<readonly ParameterField[]>,
): string[] {
  const catalogue = JSON.parse(readFileSync(CATALOGUE_PATH, "utf8")) as CatalogueFile;
  const baseModels = JSON.parse(readFileSync(MODELS_PATH, "utf8")) as Record<
    string,
    readonly ParameterField[]
  >;

  const missing = new Set<string>();
  const consider = (name: string | null): void => {
    if (name && !classified.has(name) && !NON_MODELS.has(name)) missing.add(name);
  };

  for (const ep of catalogue.endpoints) {
    for (const schema of [ep.requestSchema, ep.responseSchema]) {
      consider(topModelName(schema));
      for (const field of schema.fields) consider(field.modelRef);
    }
  }
  for (const fields of Object.values(baseModels)) {
    for (const field of fields) consider(field.modelRef);
  }
  for (const fields of extraFields) {
    for (const field of fields) consider(field.modelRef);
  }

  return [...missing].sort((a, b) => a.localeCompare(b));
}

function parseValue(raw: string): number | string {
  const text = raw.trim();
  return /^-?\d+$/.test(text) ? Number(text) : text;
}

/**
 * Parse an enumeration help page. Returns null when the page does not carry
 * the "Possible enumeration values" marker.
 */
function parseEnumPage(html: string): { displayName: string; values: EnumRow[] } | null {
  if (!/Possible enumeration values/i.test(html)) return null;

  const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html);
  const displayName = h1?.[1] ? stripHtml(h1[1]) : "";

  const values: EnumRow[] = [];
  const rowRe =
    /<tr>\s*<td class="enum-name">([\s\S]*?)<\/td>\s*<td class="enum-value">([\s\S]*?)<\/td>\s*<td class="enum-description">([\s\S]*?)<\/td>\s*<\/tr>/g;
  let match: RegExpExecArray | null;
  while ((match = rowRe.exec(html)) !== null) {
    const name = stripHtml(match[1] ?? "");
    const valueText = stripHtml(match[2] ?? "");
    const description = stripHtml(match[3] ?? "");
    if (!name || valueText === "") continue;
    values.push({ name, value: parseValue(valueText), description });
  }

  return { displayName, values };
}

async function fetchPage(url: string): Promise<{ status: number; html: string; sha: string }> {
  const response = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "text/html,application/xhtml+xml" },
    signal: AbortSignal.timeout(30_000),
  });
  const html = await response.text();
  return {
    status: response.status,
    html,
    sha: createHash("sha256").update(html).digest("hex"),
  };
}

/** The help site serves HTTP 200 error/offline pages when throttled. */
function isErrorPage(html: string): boolean {
  return /<title>\s*Accounting - (Error|Offline)\s*<\/title>/i.test(html);
}

/** Fetch with retries: throttled/error pages are transient, not classifications. */
async function fetchPageWithRetry(
  url: string,
): Promise<{ status: number; html: string; sha: string } | null> {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const result = await fetchPage(url);
    if (result.status === 200 && !isErrorPage(result.html)) return result;
    if (attempt < MAX_ATTEMPTS) {
      // Error pages mean throttling: cool down longer than a plain backoff.
      const delay = isErrorPage(result.html)
        ? ERROR_PAGE_COOLDOWN_MS
        : RETRY_BASE_DELAY_MS * 2 ** (attempt - 1);
      console.log(
        `  throttled/error (attempt ${attempt}/${MAX_ATTEMPTS}), waiting ${delay / 1000}s…`,
      );
      await sleep(delay);
    }
  }
  return null;
}

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

async function main(): Promise<void> {
  const baseModels = JSON.parse(readFileSync(MODELS_PATH, "utf8")) as Record<
    string,
    readonly ParameterField[]
  >;
  console.log(`base resource models: ${Object.keys(baseModels).length}`);

  // Resume: keep previously classified successes; refetch unresolved ones.
  let previous: ModelExtensions | null = null;
  if (existsSync(OUT_PATH)) {
    try {
      previous = JSON.parse(readFileSync(OUT_PATH, "utf8")) as ModelExtensions;
    } catch {
      previous = null;
    }
  }
  const models: Record<string, readonly ParameterField[]> = { ...(previous?.models ?? {}) };
  const modelSources: Record<string, ModelSource> = { ...(previous?.modelSources ?? {}) };
  const enums: Record<string, EnumDefinition> = { ...(previous?.enums ?? {}) };
  // Seed unresolved from the previous file so entries not yet retried this run
  // keep their recorded reason; each success deletes its entry below.
  const unresolved: Record<string, string> = { ...(previous?.unresolved ?? {}) };

  const classified = (): ReadonlySet<string> =>
    new Set([...Object.keys(baseModels), ...Object.keys(models), ...Object.keys(enums)]);

  const sortedRecord = <T>(input: Record<string, T>): Record<string, T> => {
    const out: Record<string, T> = {};
    for (const key of Object.keys(input).sort((a, b) => a.localeCompare(b))) {
      out[key] = input[key] as T;
    }
    return out;
  };

  const buildPayload = (): ModelExtensions => ({
    schemaVersion: "1.0.0",
    apiVersion: "2.0.0",
    note:
      "Additive discovery output (WP008.1): ResourceModel help pages for model references " +
      "missing from resource-models.json. Property tables become model definitions, " +
      "'Possible enumeration values' tables become enum definitions, everything else is " +
      "reported as unresolved rather than guessed.",
    generatedAt: new Date().toISOString(),
    models: sortedRecord(models),
    modelSources: sortedRecord(modelSources),
    enums: sortedRecord(enums),
    unresolved: sortedRecord(unresolved),
  });

  // Checkpoint after every success and on interrupt: a long throttled run must
  // not lose classified pages if it is stopped mid-flight (resume reads this
  // file back on the next start).
  const checkpoint = (): void => {
    writeFileSync(OUT_PATH, `${JSON.stringify(buildPayload(), null, 2)}\n`, "utf8");
  };

  const flushAndExit = (signal: NodeJS.Signals): void => {
    console.log(
      `\n${signal}: checkpointing ${Object.keys(models).length} models / ` +
        `${Object.keys(enums).length} enums before exit`,
    );
    checkpoint();
    process.exit(0);
  };
  process.on("SIGINT", flushAndExit);
  process.on("SIGTERM", flushAndExit);

  /** Names already picked up by a worker this run: round sizes split into new refs vs retries. */
  const attempted = new Set<string>();
  /** Failures recorded by earlier runs (seeded into `unresolved`). */
  const carried = new Set(Object.keys(previous?.unresolved ?? {}));

  let round = 0;
  for (;;) {
    const missing = computeMissingModels(classified(), Object.values(models));
    if (missing.length === 0) break;
    round++;
    const before = Object.keys(models).length + Object.keys(enums).length;
    const retries = missing.filter((name) => attempted.has(name)).length;
    const carriedFailures = missing.filter(
      (name) => !attempted.has(name) && carried.has(name),
    ).length;
    console.log(
      `round ${round}: ${missing.length} model reference(s) to fetch ` +
        `(${missing.length - retries - carriedFailures} new ref(s) + ` +
        `${carriedFailures} carried failure(s) + ` +
        `${retries} retr${retries === 1 ? "y" : "ies"})`,
    );

    let cursor = 0;
    let done = 0;

    async function worker(): Promise<void> {
      for (;;) {
        const index = cursor++;
        if (index >= missing.length) return;
        const modelName = missing[index] as string;
        attempted.add(modelName);
        const url = PAGE_URL(modelName);

        try {
          await sleep(DELAY_MS);
          const result = await fetchPageWithRetry(url);
          const retrievedAt = new Date().toISOString();

          if (result === null) {
            unresolved[modelName] =
              "help site returned error/offline pages after retries (rate limited)";
          } else if (result.status !== 200) {
            unresolved[modelName] = `HTTP ${result.status} from help page`;
          } else {
            const { html, sha } = result;
            const enumPage = parseEnumPage(html);
            if (enumPage) {
              if (enumPage.values.length > 0) {
                enums[modelName] = {
                  modelName,
                  displayName: enumPage.displayName,
                  values: enumPage.values,
                  source: { url, retrievedAt, sha256: sha },
                };
                delete unresolved[modelName];
              } else {
                unresolved[modelName] = "enumeration marker present but no value rows parsed";
              }
            } else {
              const tableMatch = html.match(/<table class="help-page-table">[\s\S]*?<\/table>/);
              const fields = tableMatch?.[0] ? parseParameterTable(tableMatch[0]) : [];
              if (fields.length > 0) {
                models[modelName] = fields;
                modelSources[modelName] = { url, retrievedAt, sha256: sha };
                delete unresolved[modelName];
              } else {
                unresolved[modelName] = "no property table or enumeration table on help page";
              }
            }
          }
        } catch (error) {
          unresolved[modelName] = `fetch failed: ${(error as Error).message}`;
        }

        done++;
        // Persist classified pages and failure reasons as they happen: a
        // throttled run lasts hours and must survive interruption.
        checkpoint();
        if (done % 10 === 0 || done === missing.length) {
          console.log(`  fetched ${done}/${missing.length}`);
        }
      }
    }

    await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

    const after = Object.keys(models).length + Object.keys(enums).length;
    if (after === before) {
      console.log("no progress this round; stopping (unresolved recorded for a later re-run)");
      break;
    }
  }

  const payload = buildPayload();
  writeFileSync(OUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(
    `model-extensions: ${Object.keys(payload.models).length} models, ` +
      `${Object.keys(payload.enums).length} enums, ` +
      `${Object.keys(payload.unresolved).length} unresolved -> ${OUT_PATH}`,
  );
  if (Object.keys(payload.unresolved).length > 0) {
    console.log("unresolved:", Object.keys(payload.unresolved).join(", "));
  }
}

main().catch((error: unknown) => {
  console.error("fetch-model-extensions failed:", error);
  process.exitCode = 1;
});

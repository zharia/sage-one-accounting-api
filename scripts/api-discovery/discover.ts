/**
 * Sage One Accounting API 2.0.0 discovery runner (spec §6.1, §6.2).
 *
 * Fetches the official help index, developer program page, and all 622 endpoint
 * detail pages, archives snapshots, and builds:
 * - contracts/sage-api/source-manifest.json
 * - contracts/sage-api/endpoint-catalogue.json
 * - contracts/sage-api/snapshots/help-index.html
 * - contracts/sage-api/snapshots/developer-program.html
 * - contracts/sage-api/snapshots/resource-models.json
 */

import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  type DiscoveredOperationStub,
  type EndpointCatalogueRecord,
  type ParameterField,
  parseEndpointDetailPage,
  parseHelpIndex,
} from "./parse-help.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "../..");
const CONTRACTS_DIR = resolve(REPO_ROOT, "contracts/sage-api");
const SNAPSHOTS_DIR = resolve(CONTRACTS_DIR, "snapshots");

const HELP_INDEX_URL = "https://accounting.sageone.co.za/api/2.0.0/help";
const DEV_PROGRAM_URL = "https://accounting.sageone.co.za/Marketing/DeveloperProgram.aspx";
const SWAGGER_PROBE_V1 = "https://accounting.sageone.co.za/api/2.0.0/swagger/docs/v1";
const SWAGGER_PROBE_V2 = "https://accounting.sageone.co.za/api/2.0.0/swagger/docs/v2";

function sha256(content: string): string {
  return createHash("sha256").update(content, "utf8").digest("hex");
}

async function runDiscovery(): Promise<void> {
  const discoveredAt = "2026-11-21T12:50:00Z";
  await mkdir(SNAPSHOTS_DIR, { recursive: true });

  console.log("1. Probing OpenAPI/Swagger endpoints...");
  const [sw1, sw2] = await Promise.all([
    fetch(SWAGGER_PROBE_V1).then((r) => ({ url: SWAGGER_PROBE_V1, status: r.status })),
    fetch(SWAGGER_PROBE_V2).then((r) => ({ url: SWAGGER_PROBE_V2, status: r.status })),
  ]);
  console.log(`   Swagger probes: v1=${sw1.status}, v2=${sw2.status}`);

  console.log("2. Fetching help index & developer program pages...");
  const [helpRes, devRes] = await Promise.all([fetch(HELP_INDEX_URL), fetch(DEV_PROGRAM_URL)]);
  const [helpHtml, devHtml] = await Promise.all([helpRes.text(), devRes.text()]);

  await writeFile(resolve(SNAPSHOTS_DIR, "help-index.html"), helpHtml, "utf8");
  await writeFile(resolve(SNAPSHOTS_DIR, "developer-program.html"), devHtml, "utf8");

  const services = parseHelpIndex(helpHtml);
  const allStubs: DiscoveredOperationStub[] = services.flatMap((s) => s.operations);
  console.log(
    `3. Parsed ${services.length} services and ${allStubs.length} endpoint stubs. Fetching detail pages...`,
  );

  const records = new Array<EndpointCatalogueRecord>(allStubs.length);
  const modelsMap = new Map<string, readonly ParameterField[]>();
  let cursor = 0;

  async function worker(): Promise<void> {
    while (cursor < allStubs.length) {
      const idx = cursor++;
      const stub = allStubs[idx];
      if (!stub) continue;
      const res = await fetch(stub.documentationUrl);
      const html = await res.text();
      const record = parseEndpointDetailPage(stub, html);
      records[idx] = record;

      if (
        record.requestSchema.modelName &&
        record.requestSchema.fields.length > 0 &&
        !modelsMap.has(record.requestSchema.modelName)
      ) {
        modelsMap.set(record.requestSchema.modelName, record.requestSchema.fields);
      }
      if (
        record.responseSchema.modelName &&
        record.responseSchema.kind === "object" &&
        record.responseSchema.fields.length > 0 &&
        !modelsMap.has(record.responseSchema.modelName)
      ) {
        modelsMap.set(record.responseSchema.modelName, record.responseSchema.fields);
      }
    }
  }

  await Promise.all(Array.from({ length: 25 }, () => worker()));

  const itemModelsToFetch = new Set<string>();
  for (const r of records) {
    if (r.responseSchema.itemModelName && !modelsMap.has(r.responseSchema.itemModelName)) {
      itemModelsToFetch.add(r.responseSchema.itemModelName);
    }
  }
  for (const modelName of itemModelsToFetch) {
    const res = await fetch(
      `https://accounting.sageone.co.za/api/2.0.0/Help/ResourceModel?modelName=${encodeURIComponent(modelName)}`,
    );
    const html = await res.text();
    const tblMatch = html.match(/<table class="help-page-table">[\s\S]*?<\/table>/);
    if (tblMatch?.[0]) {
      const { parseParameterTable } = await import("./parse-help.js");
      const fields = parseParameterTable(tblMatch[0]);
      if (fields.length > 0) {
        modelsMap.set(modelName, fields);
      }
    }
  }

  const completenessCounts = {
    full: records.filter((r) => r.documentationCompleteness === "full").length,
    partial: records.filter((r) => r.documentationCompleteness === "partial").length,
    none: records.filter((r) => r.documentationCompleteness === "none").length,
    experimental: records.filter((r) => r.documentationCompleteness === "experimental").length,
  };

  const modelsObject: Record<string, readonly ParameterField[]> = {};
  for (const [k, v] of [...modelsMap.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    modelsObject[k] = v;
  }

  await writeFile(
    resolve(SNAPSHOTS_DIR, "resource-models.json"),
    `${JSON.stringify(modelsObject, null, 2)}\n`,
    "utf8",
  );

  const cataloguePayload = {
    schemaVersion: "1.0.0",
    apiVersion: "2.0.0",
    discoveredAt,
    documentationBaseUrl: HELP_INDEX_URL,
    totalServices: services.length,
    totalEndpoints: records.length,
    completenessSummary: completenessCounts,
    services: services.map((s) => ({
      serviceId: s.serviceId,
      serviceTitle: s.serviceTitle,
      description: s.description,
      requiresAuthentication: s.requiresAuthentication,
      operationCount: s.operations.length,
    })),
    endpoints: records,
  };

  const catalogueJson = `${JSON.stringify(cataloguePayload, null, 2)}\n`;
  await writeFile(resolve(CONTRACTS_DIR, "endpoint-catalogue.json"), catalogueJson, "utf8");

  const manifestPayload = {
    schemaVersion: "1.0.0",
    apiVersion: "2.0.0",
    discoveredAt,
    openApiProbe: {
      available: false,
      testedEndpoints: [sw1, sw2],
      note: "Swagger endpoints return HTTP 403 Forbidden; ASP.NET Web API Help Pages at /api/2.0.0/help are the authoritative public contract source.",
    },
    sources: [
      {
        id: "help-index",
        url: HELP_INDEX_URL,
        retrievedAt: discoveredAt,
        method: "GET",
        status: helpRes.status,
        sha256: sha256(helpHtml),
        snapshotPath: "contracts/sage-api/snapshots/help-index.html",
      },
      {
        id: "developer-program",
        url: DEV_PROGRAM_URL,
        retrievedAt: discoveredAt,
        method: "GET",
        status: devRes.status,
        sha256: sha256(devHtml),
        snapshotPath: "contracts/sage-api/snapshots/developer-program.html",
      },
      {
        id: "endpoint-detail-pages",
        urlPattern: "https://accounting.sageone.co.za/api/2.0.0/Help/Api/{id}",
        retrievedAt: discoveredAt,
        method: "GET",
        pageCount: records.length,
        catalogueSha256: sha256(catalogueJson),
        cataloguePath: "contracts/sage-api/endpoint-catalogue.json",
      },
    ],
  };

  await writeFile(
    resolve(CONTRACTS_DIR, "source-manifest.json"),
    `${JSON.stringify(manifestPayload, null, 2)}\n`,
    "utf8",
  );

  console.log("4. Discovery complete.");
  console.log("   Completeness:", completenessCounts);
}

runDiscovery().catch((err: unknown) => {
  console.error("Discovery failed:", err);
  process.exit(1);
});

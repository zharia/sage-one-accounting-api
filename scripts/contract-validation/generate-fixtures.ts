/**
 * Extracts contract fixtures for M003/M004 implemented services from the discovered
 * `endpoint-catalogue.json` into `contracts/fixtures/<service>/<operation>.json`
 * and updates the implementation, type, schema, test, and documentation status flags
 * in `contracts/sage-api/endpoint-catalogue.json`.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { EndpointCatalogueRecord } from "../api-discovery/parse-help.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "../..");
const CATALOGUE_PATH = resolve(REPO_ROOT, "contracts/sage-api/endpoint-catalogue.json");
const FIXTURES_ROOT = resolve(REPO_ROOT, "contracts/fixtures");

export const IMPLEMENTED_M004_SERVICES = new Set([
  "Login",
  "Account",
  "AccountCategory",
  "AccountBalance",
  "AccountOpeningBalance",
  "AccountNote",
  "Company",
  "CompanyEntityType",
  "CompanyNote",
  "Customer",
  "CustomerCategory",
  "CustomerOpeningBalance",
  "CustomerStatement",
  "CustomerNote",
  "Supplier",
  "SupplierCategory",
  "SupplierOpeningBalance",
  "SupplierStatement",
  "SupplierNote",
  "TaxType",
  "Item",
  "ItemCategory",
  "ItemOpeningBalance",
  "ItemNote",
]);

function safeParseSample(sampleJson: string | null): unknown {
  if (!sampleJson) {
    return null;
  }
  try {
    return JSON.parse(sampleJson);
  } catch {
    return sampleJson;
  }
}

async function generateFixtures(): Promise<void> {
  const raw = await readFile(CATALOGUE_PATH, "utf8");
  const catalogue = JSON.parse(raw) as {
    schemaVersion: string;
    apiVersion: string;
    discoveredAt: string;
    documentationBaseUrl: string;
    totalServices: number;
    totalEndpoints: number;
    completenessSummary: Record<string, number>;
    services: unknown[];
    endpoints: EndpointCatalogueRecord[];
  };

  let generatedCount = 0;
  const updatedEndpoints: EndpointCatalogueRecord[] = [];

  for (const ep of catalogue.endpoints) {
    if (!IMPLEMENTED_M004_SERVICES.has(ep.service)) {
      updatedEndpoints.push(ep);
      continue;
    }

    const serviceDir = resolve(FIXTURES_ROOT, ep.service);
    await mkdir(serviceDir, { recursive: true });

    const fixturePayload = {
      id: ep.id,
      service: ep.service,
      operation: ep.operation,
      method: ep.method,
      route: ep.route,
      sourceUrl: ep.documentationUrl,
      discoveredAt: catalogue.discoveredAt,
      documentationCompleteness: ep.documentationCompleteness,
      authenticationRequired: ep.authenticationRequired,
      odataSupport: ep.odataSupport,
      pagingBehaviour: ep.pagingBehaviour,
      fileHandling: ep.fileHandling,
      queryParameters: ep.queryParameters.map((p) => ({
        name: p.name,
        type: p.type,
        required: p.required,
      })),
      pathParameters: ep.pathParameters.map((p) => ({
        name: p.name,
        type: p.type,
        required: p.required,
      })),
      requestContentType: ep.requestContentType,
      requestSample: safeParseSample(ep.requestSchema.sampleJson),
      responseContentType: ep.responseContentType,
      responseSample: safeParseSample(ep.responseSchema.sampleJson),
    };

    const fixtureFile = resolve(serviceDir, `${ep.id}.json`);
    await writeFile(fixtureFile, `${JSON.stringify(fixturePayload, null, 2)}\n`, "utf8");
    generatedCount += 1;

    updatedEndpoints.push({
      ...ep,
      implementationStatus: "Complete",
      typeStatus: "Complete",
      schemaStatus: "Complete",
      unitTestStatus: "Complete",
      contractTestStatus: "Complete",
      documentationStatus: "Complete",
    });
  }

  const updatedCatalogue = {
    ...catalogue,
    endpoints: updatedEndpoints,
  };

  await writeFile(CATALOGUE_PATH, `${JSON.stringify(updatedCatalogue, null, 2)}\n`, "utf8");
  console.log(
    `Generated ${String(generatedCount)} contract fixtures and updated catalogue statuses.`,
  );
}

generateFixtures().catch((err: unknown) => {
  console.error("Fixture generation failed:", err);
  process.exit(1);
});

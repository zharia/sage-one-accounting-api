/**
 * Snapshot and catalogue diff utility (spec §6.2).
 * Compares two endpoint catalogues and reports added, removed, and modified endpoints.
 */

import type { EndpointCatalogueRecord } from "./parse-help.js";

export interface EndpointDiffModification {
  readonly id: string;
  readonly route: string;
  readonly method: string;
  readonly changedFields: readonly string[];
}

export interface CatalogueDiffReport {
  readonly added: readonly EndpointCatalogueRecord[];
  readonly removed: readonly EndpointCatalogueRecord[];
  readonly modified: readonly EndpointDiffModification[];
  readonly unchangedCount: number;
}

const COMPARED_FIELDS: ReadonlyArray<keyof EndpointCatalogueRecord> = [
  "service",
  "operation",
  "method",
  "route",
  "requestContentType",
  "responseContentType",
  "authenticationRequired",
  "pagingBehaviour",
  "odataSupport",
  "fileHandling",
  "documentationCompleteness",
];

export function diffCatalogues(
  previous: readonly EndpointCatalogueRecord[],
  current: readonly EndpointCatalogueRecord[],
): CatalogueDiffReport {
  const prevMap = new Map<string, EndpointCatalogueRecord>();
  for (const item of previous) {
    prevMap.set(item.id, item);
  }

  const currMap = new Map<string, EndpointCatalogueRecord>();
  for (const item of current) {
    currMap.set(item.id, item);
  }

  const added: EndpointCatalogueRecord[] = [];
  const removed: EndpointCatalogueRecord[] = [];
  const modified: EndpointDiffModification[] = [];
  let unchangedCount = 0;

  for (const item of current) {
    const prev = prevMap.get(item.id);
    if (!prev) {
      added.push(item);
      continue;
    }

    const changedFields: string[] = [];
    for (const field of COMPARED_FIELDS) {
      if (JSON.stringify(prev[field]) !== JSON.stringify(item[field])) {
        changedFields.push(field);
      }
    }
    if (prev.queryParameters.length !== item.queryParameters.length) {
      changedFields.push("queryParameters");
    }
    if (prev.pathParameters.length !== item.pathParameters.length) {
      changedFields.push("pathParameters");
    }
    if (prev.requestSchema.kind !== item.requestSchema.kind) {
      changedFields.push("requestSchema");
    }
    if (prev.responseSchema.kind !== item.responseSchema.kind) {
      changedFields.push("responseSchema");
    }

    if (changedFields.length > 0) {
      modified.push({
        id: item.id,
        route: item.route,
        method: item.method,
        changedFields,
      });
    } else {
      unchangedCount++;
    }
  }

  for (const item of previous) {
    if (!currMap.has(item.id)) {
      removed.push(item);
    }
  }

  return {
    added,
    removed,
    modified,
    unchangedCount,
  };
}

/**
 * Parser utilities for ASP.NET Web API Help Pages (Sage One Accounting API 2.0.0).
 */

export interface ParameterField {
  readonly name: string;
  readonly type: string;
  readonly modelRef: string | null;
  readonly isCollection: boolean;
  readonly required: boolean;
  readonly readOnly: boolean;
  readonly nullable: boolean;
  readonly annotations: readonly string[];
  readonly description: string;
}

export interface SchemaDescriptor {
  readonly kind: "object" | "page" | "collection" | "primitive" | "binary" | "empty" | "untyped";
  readonly modelName: string | null;
  readonly itemModelName: string | null;
  readonly fields: readonly ParameterField[];
  readonly sampleJson: string | null;
}

export interface DiscoveredService {
  readonly serviceId: string;
  readonly serviceTitle: string;
  readonly description: string;
  readonly requiresAuthentication: boolean;
  readonly operations: readonly DiscoveredOperationStub[];
}

export interface DiscoveredOperationStub {
  readonly serviceId: string;
  readonly serviceTitle: string;
  readonly method: "GET" | "POST" | "PUT" | "DELETE";
  readonly rawSignature: string;
  readonly relativeRoute: string;
  readonly operationName: string;
  readonly helpPath: string;
  readonly documentationUrl: string;
  readonly summary: string;
  readonly requiresAuthentication: boolean;
}

export type DocumentationCompleteness = "full" | "partial" | "none" | "experimental";

export interface EndpointCatalogueRecord {
  readonly id: string;
  readonly service: string;
  readonly serviceTitle: string;
  readonly resource: string;
  readonly operation: string;
  readonly method: "GET" | "POST" | "PUT" | "DELETE";
  readonly route: string;
  readonly queryParameters: readonly ParameterField[];
  readonly pathParameters: readonly ParameterField[];
  readonly requestContentType: string | null;
  readonly requestSchema: SchemaDescriptor;
  readonly responseContentType: string | null;
  readonly responseSchema: SchemaDescriptor;
  readonly authenticationRequired: boolean;
  readonly pagingBehaviour: "paged_envelope" | "none";
  readonly odataSupport: boolean;
  readonly fileHandling: "multipart_upload" | "binary_download" | "none";
  readonly documentationUrl: string;
  readonly summary: string;
  readonly documentationCompleteness: DocumentationCompleteness;
  readonly implementationStatus: "Missing" | "Partial" | "Complete";
  readonly typeStatus: "Missing" | "Partial" | "Complete";
  readonly schemaStatus: "Missing" | "Partial" | "Complete";
  readonly unitTestStatus: "Missing" | "Complete";
  readonly contractTestStatus: "Missing" | "Complete";
  readonly documentationStatus: "Missing" | "Complete";
}

export function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

export function stripHtml(input: string): string {
  return decodeHtmlEntities(input.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Extracts all services and operation stubs from the main `/api/2.0.0/help` HTML page.
 */
export function parseHelpIndex(
  html: string,
  baseUrl = "https://accounting.sageone.co.za",
): DiscoveredService[] {
  const anchorIdx = html.indexOf('class="anchor"');
  const mainPart = anchorIdx >= 0 ? html.slice(anchorIdx) : html;

  const serviceRegex = /<h2 id="([^"]+)">([^<]+)<\/h2>([\s\S]*?)(?=<a id="bookmark_|$)/g;
  const services: DiscoveredService[] = [];

  let match: RegExpExecArray | null;
  while ((match = serviceRegex.exec(mainPart)) !== null) {
    const serviceId = (match[1] ?? "").trim();
    const serviceTitle = decodeHtmlEntities((match[2] ?? "").trim());
    const block = match[3] ?? "";

    const firstTableIdx = block.indexOf("<table");
    const preTable = firstTableIdx >= 0 ? block.slice(0, firstTableIdx) : block;
    const descMatch = preTable.match(/<p>([\s\S]*?)<\/p>/);
    const description = descMatch?.[1] ? stripHtml(descMatch[1]) : "";
    const requiresAuthentication = description.toLowerCase().includes("requires authentication");

    const rowRegex =
      /<tr>\s*<td class="api-name"><a href="([^"]+)">([^<]+)<\/a><\/td>\s*<td class="api-documentation">\s*<p>([\s\S]*?)<\/p>\s*<\/td>\s*<\/tr>/g;
    const operations: DiscoveredOperationStub[] = [];
    let rowMatch: RegExpExecArray | null;
    while ((rowMatch = rowRegex.exec(block)) !== null) {
      const helpPath = decodeHtmlEntities((rowMatch[1] ?? "").trim());
      const rawSignature = decodeHtmlEntities((rowMatch[2] ?? "").trim());
      const summary = stripHtml(rowMatch[3] ?? "");

      const spaceIdx = rawSignature.indexOf(" ");
      const methodRaw = (spaceIdx > 0 ? rawSignature.slice(0, spaceIdx) : "GET")
        .trim()
        .toUpperCase();
      const method = (
        methodRaw === "POST" || methodRaw === "PUT" || methodRaw === "DELETE" ? methodRaw : "GET"
      ) as "GET" | "POST" | "PUT" | "DELETE";

      const fullRoute = spaceIdx > 0 ? rawSignature.slice(spaceIdx + 1).trim() : rawSignature;
      const qIdx = fullRoute.indexOf("?");
      const relativeRoute = qIdx >= 0 ? fullRoute.slice(0, qIdx) : fullRoute;

      const segments = relativeRoute.split("/").filter((s) => s.length > 0 && !s.startsWith("{"));
      const rawOpName = segments[1] ?? segments[0] ?? "Operation";
      const hasIdParam = relativeRoute.includes("{id}");
      const operationName = hasIdParam && rawOpName.toLowerCase() === "get" ? "GetById" : rawOpName;

      operations.push({
        serviceId,
        serviceTitle,
        method,
        rawSignature,
        relativeRoute,
        operationName,
        helpPath,
        documentationUrl: `${baseUrl}${helpPath}`,
        summary,
        requiresAuthentication,
      });
    }

    services.push({
      serviceId,
      serviceTitle,
      description,
      requiresAuthentication,
      operations,
    });
  }

  return services;
}

/**
 * Parses a parameter table (`<table class="help-page-table">`) into ParameterField items.
 */
export function parseParameterTable(tableHtml: string): ParameterField[] {
  const fields: ParameterField[] = [];
  const tbodyIdx = tableHtml.indexOf("<tbody>");
  const tbodyEndIdx = tableHtml.indexOf("</tbody>");
  const body =
    tbodyIdx >= 0 && tbodyEndIdx > tbodyIdx ? tableHtml.slice(tbodyIdx, tbodyEndIdx) : tableHtml;

  const rowRegex =
    /<tr>\s*<td class="parameter-name">([\s\S]*?)<\/td>\s*<td class="parameter-type">([\s\S]*?)<\/td>\s*<td class="parameter-annotations">([\s\S]*?)<\/td>\s*<td class="parameter-documentation">([\s\S]*?)<\/td>\s*<\/tr>/g;

  let m: RegExpExecArray | null;
  while ((m = rowRegex.exec(body)) !== null) {
    const name = stripHtml(m[1] ?? "");
    const typeCell = m[2] ?? "";
    const annotationsCell = m[3] ?? "";
    const docCell = m[4] ?? "";

    const rawTypeText = stripHtml(typeCell);
    const modelMatch = typeCell.match(/ResourceModel\?modelName=([^"&]+)/);
    const modelRef = modelMatch?.[1] ? decodeHtmlEntities(modelMatch[1].trim()) : null;
    const isCollection = rawTypeText.toLowerCase().startsWith("collection of");

    const annotationParagraphs = [...annotationsCell.matchAll(/<p>([\s\S]*?)<\/p>/g)]
      .map((a) => stripHtml(a[1] ?? ""))
      .filter((a) => a.length > 0 && a.toLowerCase() !== "none.");

    const required = annotationParagraphs.some((a) => a.toLowerCase() === "required");
    const readOnly = annotationParagraphs.some((a) => a.toLowerCase().includes("read only"));
    const nullable = rawTypeText.toLowerCase().includes("nullable");
    const description = stripHtml(docCell);

    fields.push({
      name,
      type: rawTypeText,
      modelRef,
      isCollection,
      required,
      readOnly,
      nullable,
      annotations: annotationParagraphs,
      description,
    });
  }

  return fields;
}

function extractFirstTable(sectionHtml: string): string | null {
  const match = sectionHtml.match(/<table class="help-page-table">[\s\S]*?<\/table>/);
  return match?.[0] ?? null;
}

function extractSampleJson(sectionHtml: string): string | null {
  const preMatch = sectionHtml.match(/<pre class="wrapped">([\s\S]*?)<\/pre>/);
  if (!preMatch?.[1]) {
    return null;
  }
  const decoded = decodeHtmlEntities(preMatch[1]).trim();
  return decoded.length > 0 ? decoded : null;
}

function classifySchema(
  sectionHtml: string,
  fields: readonly ParameterField[],
  sampleJson: string | null,
  isMultipart: boolean,
  isBinary: boolean,
): SchemaDescriptor {
  if (isMultipart) {
    return {
      kind: "binary",
      modelName: "multipart/form-data",
      itemModelName: null,
      fields,
      sampleJson,
    };
  }
  if (isBinary) {
    return {
      kind: "binary",
      modelName: "application/octet-stream",
      itemModelName: null,
      fields,
      sampleJson,
    };
  }

  const modelLinks = [...sectionHtml.matchAll(/ResourceModel\?modelName=([^"&]+)/g)].map((m) =>
    decodeHtmlEntities((m[1] ?? "").trim()),
  );
  const firstModel = modelLinks[0] ?? null;

  if (
    sectionHtml.includes("This collection is wrapped in a paging response object.") ||
    (firstModel !== null && firstModel.startsWith("MetaDataResponseOf"))
  ) {
    const resultsField = fields.find((f) => f.name === "Results");
    const itemModelName =
      resultsField?.modelRef ??
      (firstModel?.startsWith("MetaDataResponseOf")
        ? firstModel.slice("MetaDataResponseOf".length)
        : null);
    return {
      kind: "page",
      modelName: firstModel ?? "MetaDataResponse",
      itemModelName,
      fields,
      sampleJson,
    };
  }

  if (
    firstModel === "IHttpActionResult" ||
    firstModel === "HttpResponseMessage" ||
    (/\bObject\b/.test(sectionHtml) && fields.length === 0 && sampleJson === "{}")
  ) {
    return {
      kind: "untyped",
      modelName: firstModel ?? "Object",
      itemModelName: null,
      fields,
      sampleJson,
    };
  }

  const trimmedSample = sampleJson?.trim() ?? "";
  if (trimmedSample.startsWith("[")) {
    return {
      kind: "collection",
      modelName: firstModel,
      itemModelName: firstModel,
      fields,
      sampleJson,
    };
  }

  if (fields.length > 0 || (firstModel !== null && trimmedSample.startsWith("{"))) {
    return {
      kind: "object",
      modelName: firstModel,
      itemModelName: null,
      fields,
      sampleJson,
    };
  }

  if (
    trimmedSample === "true" ||
    trimmedSample === "false" ||
    /^-?\d+(\.\d+)?$/.test(trimmedSample) ||
    (trimmedSample.startsWith('"') && trimmedSample.endsWith('"'))
  ) {
    const primitiveType =
      trimmedSample === "true" || trimmedSample === "false"
        ? "boolean"
        : /^-?\d+(\.\d+)?$/.test(trimmedSample)
          ? "number"
          : "string";
    return {
      kind: "primitive",
      modelName: primitiveType,
      itemModelName: null,
      fields: [],
      sampleJson,
    };
  }

  if (sectionHtml.includes("<p>None.</p>") && fields.length === 0 && sampleJson === null) {
    return {
      kind: "empty",
      modelName: null,
      itemModelName: null,
      fields: [],
      sampleJson: null,
    };
  }

  return {
    kind: "untyped",
    modelName: firstModel,
    itemModelName: null,
    fields,
    sampleJson,
  };
}

/**
 * Parses an individual endpoint detail HTML page (`/api/2.0.0/Help/Api/...`)
 * and combines it with the operation stub to yield a complete EndpointCatalogueRecord.
 */
export function parseEndpointDetailPage(
  stub: DiscoveredOperationStub,
  html: string,
): EndpointCatalogueRecord {
  const reqIdx = html.indexOf("<h2>Request Information</h2>");
  const resIdx = html.indexOf("<h2>Response Information</h2>");

  const reqSection = reqIdx >= 0 ? html.slice(reqIdx, resIdx > reqIdx ? resIdx : undefined) : "";
  const resSection = resIdx >= 0 ? html.slice(resIdx) : "";

  const odataSupport = reqSection.includes("This method supports OData queries.");
  const pagingBehaviour = resSection.includes(
    "This collection is wrapped in a paging response object.",
  )
    ? "paged_envelope"
    : "none";

  const uriIdx = reqSection.indexOf("<h3>URI Parameters</h3>");
  const bodyIdx = reqSection.indexOf("<h3>Body Parameters</h3>");
  const uriSubsection =
    uriIdx >= 0 ? reqSection.slice(uriIdx, bodyIdx > uriIdx ? bodyIdx : undefined) : "";
  const bodySubsection = bodyIdx >= 0 ? reqSection.slice(bodyIdx) : "";

  const uriTable = extractFirstTable(uriSubsection);
  const uriFields = uriTable ? parseParameterTable(uriTable) : [];

  const pathParamNames = new Set(
    [...stub.relativeRoute.matchAll(/\{([^}]+)\}/g)].map((m) => (m[1] ?? "").toLowerCase()),
  );

  const pathParameters = uriFields.filter((f) => pathParamNames.has(f.name.toLowerCase()));
  const queryParameters = uriFields.filter((f) => !pathParamNames.has(f.name.toLowerCase()));

  const bodyTable = extractFirstTable(bodySubsection);
  const bodyFields = bodyTable ? parseParameterTable(bodyTable) : [];
  const reqSample = extractSampleJson(bodySubsection);

  const resTable = extractFirstTable(resSection);
  const resFields = resTable ? parseParameterTable(resTable) : [];
  const resSample = extractSampleJson(resSection);

  const combinedDesc =
    `${stub.summary} ${stripHtml(html.slice(0, reqIdx > 0 ? reqIdx : 2000))}`.toLowerCase();
  const isMultipartUpload = combinedDesc.includes("multipart/form-data");
  const isBinaryDownload =
    combinedDesc.includes("application/octet-stream") ||
    stub.operationName.toLowerCase().startsWith("download") ||
    stub.operationName.toLowerCase() === "export";

  const fileHandling: "multipart_upload" | "binary_download" | "none" = isMultipartUpload
    ? "multipart_upload"
    : isBinaryDownload
      ? "binary_download"
      : "none";

  const requestSchema = classifySchema(
    bodySubsection,
    bodyFields,
    reqSample,
    isMultipartUpload,
    false,
  );
  const responseSchema = classifySchema(resSection, resFields, resSample, false, isBinaryDownload);

  const requestContentType =
    requestSchema.kind === "empty"
      ? null
      : isMultipartUpload
        ? "multipart/form-data"
        : "application/json";

  const responseContentType =
    responseSchema.kind === "empty"
      ? null
      : isBinaryDownload
        ? "application/octet-stream"
        : "application/json";

  const hasSummary =
    stub.summary.length > 0 && stub.summary.toLowerCase() !== "no documentation available.";

  let documentationCompleteness: DocumentationCompleteness;
  if (responseSchema.kind === "untyped" && requestSchema.kind === "empty" && !hasSummary) {
    documentationCompleteness = "none";
  } else if (responseSchema.kind === "untyped" || requestSchema.kind === "untyped") {
    documentationCompleteness = hasSummary ? "partial" : "experimental";
  } else if (!hasSummary) {
    documentationCompleteness = "partial";
  } else {
    documentationCompleteness = "full";
  }

  const id = stub.helpPath.replace(/^\/api\/2\.0\.0\/Help\/Api\//i, "");

  return {
    id,
    service: stub.serviceId,
    serviceTitle: stub.serviceTitle,
    resource: stub.serviceId,
    operation: stub.operationName,
    method: stub.method,
    route: `/${stub.relativeRoute}`,
    queryParameters,
    pathParameters,
    requestContentType,
    requestSchema,
    responseContentType,
    responseSchema,
    authenticationRequired: stub.requiresAuthentication,
    pagingBehaviour,
    odataSupport,
    fileHandling,
    documentationUrl: stub.documentationUrl,
    summary: stub.summary,
    documentationCompleteness,
    implementationStatus: "Missing",
    typeStatus: "Missing",
    schemaStatus: "Missing",
    unitTestStatus: "Missing",
    contractTestStatus: "Missing",
    documentationStatus: "Missing",
  };
}

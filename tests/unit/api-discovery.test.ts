import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { diffCatalogues } from "../../scripts/api-discovery/diff-catalogue.js";
import {
  type DiscoveredOperationStub,
  type EndpointCatalogueRecord,
  parseEndpointDetailPage,
  parseHelpIndex,
  parseParameterTable,
} from "../../scripts/api-discovery/parse-help.js";

describe("API discovery parser & diffing", () => {
  it("parses service and operation stubs from help index HTML", () => {
    const sampleIndexHtml = `
      <div class="anchor">
        <a id="bookmark_Account"></a>
        <h2 id="Account">Account</h2>
        <br/>
        <p>The Account Service provides methods that allow for the retrieval, creation and deletion of Accounts. This service requires authentication.</p>
        <table class="help-page-table">
          <thead><tr><th>API</th><th>Description</th></tr></thead>
          <tbody>
            <tr>
              <td class="api-name"><a href="/api/2.0.0/Help/Api/GET-Account-Get">GET Account/Get</a></td>
              <td class="api-documentation"><p>Gets a list of Accounts.</p></td>
            </tr>
            <tr>
              <td class="api-name"><a href="/api/2.0.0/Help/Api/GET-Account-Get-id">GET Account/Get/{id}</a></td>
              <td class="api-documentation"><p>Gets the specified Account based on the identifier.</p></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    const services = parseHelpIndex(sampleIndexHtml);
    expect(services).toHaveLength(1);
    const accountService = services[0]!;
    expect(accountService.serviceId).toBe("Account");
    expect(accountService.requiresAuthentication).toBe(true);
    expect(accountService.operations).toHaveLength(2);
    expect(accountService.operations[0]?.operationName).toBe("Get");
    expect(accountService.operations[1]?.operationName).toBe("GetById");
  });

  it("parses parameter tables accurately", () => {
    const tableHtml = `
      <table class="help-page-table">
        <thead><tr><th>Name</th><th>Type</th><th>Additional information</th><th>Description</th></tr></thead>
        <tbody>
          <tr>
            <td class="parameter-name">ID</td>
            <td class="parameter-type">integer</td>
            <td class="parameter-annotations"><p>Required</p></td>
            <td class="parameter-documentation"><p>The identifier.</p></td>
          </tr>
          <tr>
            <td class="parameter-name">Balance</td>
            <td class="parameter-type">nullable decimal</td>
            <td class="parameter-annotations"><p>Read Only / System Generated</p></td>
            <td class="parameter-documentation"><p></p></td>
          </tr>
        </tbody>
      </table>
    `;

    const fields = parseParameterTable(tableHtml);
    expect(fields).toHaveLength(2);
    expect(fields[0]).toMatchObject({
      name: "ID",
      type: "integer",
      required: true,
      readOnly: false,
      nullable: false,
    });
    expect(fields[1]).toMatchObject({
      name: "Balance",
      type: "nullable decimal",
      required: false,
      readOnly: true,
      nullable: true,
    });
  });

  it("parses endpoint detail pages and classifies OData and paging", () => {
    const stub: DiscoveredOperationStub = {
      serviceId: "Account",
      serviceTitle: "Account",
      method: "GET",
      rawSignature: "GET Account/Get",
      relativeRoute: "Account/Get",
      operationName: "Get",
      helpPath: "/api/2.0.0/Help/Api/GET-Account-Get",
      documentationUrl: "https://accounting.sageone.co.za/api/2.0.0/Help/Api/GET-Account-Get",
      summary: "Gets a list of Accounts.",
      requiresAuthentication: true,
    };

    const detailHtml = `
      <div class="layout-body">
        <h1>GET Account/Get</h1>
        <div>
          <p>Gets a list of Accounts.</p>
          <h2>Request Information</h2>
          <p>This method supports OData queries.</p>
          <h3>URI Parameters</h3>
          <p>None.</p>
          <h3>Body Parameters</h3>
          <p>None.</p>
          <h2>Response Information</h2>
          <h3>Resource Description</h3>
          <p>This collection is wrapped in a paging response object.</p>
          <a href="/api/2.0.0/Help/ResourceModel?modelName=MetaDataResponseOfAccount">Paging response of Account</a>
          <h3>Response Formats</h3>
          <pre class="wrapped">{ &quot;TotalResults&quot;: 1, &quot;ReturnedResults&quot;: 1, &quot;Results&quot;: [] }</pre>
        </div>
      </div>
    `;

    const record = parseEndpointDetailPage(stub, detailHtml);
    expect(record.id).toBe("GET-Account-Get");
    expect(record.odataSupport).toBe(true);
    expect(record.pagingBehaviour).toBe("paged_envelope");
    expect(record.responseSchema.kind).toBe("page");
    expect(record.responseSchema.itemModelName).toBe("Account");
    expect(record.documentationCompleteness).toBe("full");
  });

  it("diffs two catalogues accurately", () => {
    const baseRecord: EndpointCatalogueRecord = {
      id: "GET-Account-Get",
      service: "Account",
      serviceTitle: "Account",
      resource: "Account",
      operation: "Get",
      method: "GET",
      route: "/Account/Get",
      queryParameters: [],
      pathParameters: [],
      requestContentType: null,
      requestSchema: {
        kind: "empty",
        modelName: null,
        itemModelName: null,
        fields: [],
        sampleJson: null,
      },
      responseContentType: "application/json",
      responseSchema: {
        kind: "page",
        modelName: "MetaDataResponseOfAccount",
        itemModelName: "Account",
        fields: [],
        sampleJson: "{}",
      },
      authenticationRequired: true,
      pagingBehaviour: "paged_envelope",
      odataSupport: true,
      fileHandling: "none",
      documentationUrl: "https://accounting.sageone.co.za/api/2.0.0/Help/Api/GET-Account-Get",
      summary: "Gets a list of Accounts.",
      documentationCompleteness: "full",
      implementationStatus: "Missing",
      typeStatus: "Missing",
      schemaStatus: "Missing",
      unitTestStatus: "Missing",
      contractTestStatus: "Missing",
      documentationStatus: "Missing",
    };

    const modifiedRecord: EndpointCatalogueRecord = {
      ...baseRecord,
      odataSupport: false,
    };

    const addedRecord: EndpointCatalogueRecord = {
      ...baseRecord,
      id: "POST-Account-Save",
      operation: "Save",
      method: "POST",
      route: "/Account/Save",
    };

    const diff = diffCatalogues([baseRecord], [modifiedRecord, addedRecord]);
    expect(diff.added).toHaveLength(1);
    expect(diff.removed).toHaveLength(0);
    expect(diff.modified).toHaveLength(1);
    expect(diff.modified[0]?.changedFields).toContain("odataSupport");
  });

  it("validates the committed endpoint-catalogue.json and source-manifest.json", () => {
    const catalogueRaw = readFileSync(
      resolve(process.cwd(), "contracts/sage-api/endpoint-catalogue.json"),
      "utf8",
    );
    const manifestRaw = readFileSync(
      resolve(process.cwd(), "contracts/sage-api/source-manifest.json"),
      "utf8",
    );

    const catalogue = JSON.parse(catalogueRaw) as {
      apiVersion: string;
      totalServices: number;
      totalEndpoints: number;
      endpoints: EndpointCatalogueRecord[];
    };
    const manifest = JSON.parse(manifestRaw) as {
      apiVersion: string;
      openApiProbe: { available: boolean };
      sources: unknown[];
    };

    expect(catalogue.apiVersion).toBe("2.0.0");
    expect(catalogue.totalServices).toBe(162);
    expect(catalogue.totalEndpoints).toBe(622);
    expect(catalogue.endpoints).toHaveLength(622);
    expect(manifest.apiVersion).toBe("2.0.0");
    expect(manifest.openApiProbe.available).toBe(false);
    expect(manifest.sources.length).toBeGreaterThanOrEqual(3);
  });
});

import { describe, expect, it } from "vitest";

import { SageOneClient } from "../../src/index.js";

const liveEnabled = process.env["SAGE_LIVE_TESTS"] === "true";

describe.skipIf(!liveEnabled)("Opt-in Live Sage One API Integration Suite (spec §17.6)", () => {
  it("verifies read-only authentication and retrieves current company context", async () => {
    const username = process.env["SAGE_USERNAME"];
    const password = process.env["SAGE_PASSWORD"];
    const apiKey = process.env["SAGE_API_KEY"];
    const companyIdRaw = process.env["SAGE_COMPANY_ID"];

    if (!username || !password || !apiKey) {
      throw new Error(
        "Live tests require SAGE_USERNAME, SAGE_PASSWORD, and SAGE_API_KEY environment variables.",
      );
    }

    const client = new SageOneClient({
      credentials: { username, password },
      apiKey,
      companyId: companyIdRaw ? Number(companyIdRaw) : undefined,
      baseUrl: process.env["SAGE_BASE_URL"],
    });

    const auth = await client.verifyAuthentication();
    expect(auth.authenticated).toBe(true);

    const companies = await client.company.list({ includeStatus: true });
    expect(companies.TotalResults).toBeGreaterThanOrEqual(0);
  });
});

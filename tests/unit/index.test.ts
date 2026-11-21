import { describe, expect, it } from "vitest";

import { SAGE_API_DOCUMENTATION_URL, SAGE_API_VERSION } from "../../src/index.js";

describe("package entry point", () => {
  it("targets Sage API 2.0.0", () => {
    expect(SAGE_API_VERSION).toBe("2.0.0");
  });

  it("exposes the documentation source", () => {
    expect(SAGE_API_DOCUMENTATION_URL).toBe("https://accounting.sageone.co.za/api/2.0.0/help");
  });
});

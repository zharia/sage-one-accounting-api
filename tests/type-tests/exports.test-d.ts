import { describe, expectTypeOf, it } from "vitest";

import { SAGE_API_DOCUMENTATION_URL, SAGE_API_VERSION } from "../../src/index.js";

describe("public export surface", () => {
  it("exports API version as a literal", () => {
    expectTypeOf(SAGE_API_VERSION).toEqualTypeOf<"2.0.0">();
  });

  it("exports documentation URL as a string", () => {
    expectTypeOf(SAGE_API_DOCUMENTATION_URL).toMatchTypeOf<string>();
    expectTypeOf(SAGE_API_DOCUMENTATION_URL).toBeString();
  });
});

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "tests/unit/**/*.test.ts",
      "tests/integration/**/*.test.ts",
      "tests/contract/**/*.test.ts",
      "tests/property/**/*.test.ts",
    ],
    exclude: ["tests/live/**", "node_modules/**", "dist/**"],
    environment: "node",
    typecheck: {
      include: ["tests/type-tests/**/*.test-d.ts"],
      tsconfig: "./tsconfig.json",
    },
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.d.ts", "src/internal/**"],
      reportsDirectory: "coverage",
      thresholds: {
        statements: 85,
        branches: 70,
        functions: 85,
        lines: 85,
      },
    },
    // Live tests are opt-in: pnpm test:live
    env: {
      SAGE_LIVE_TESTS: process.env["SAGE_LIVE_TESTS"] ?? "false",
    },
  },
});

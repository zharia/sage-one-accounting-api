import { defineConfig } from "vitest/config";

/**
 * Live Sage API test stage (M008 WP008.3, verification level V5).
 *
 * Separate from `vitest.config.ts` so the default suite (`pnpm test`) can
 * never reach the live API, and `pnpm verify` / CI stay credential-free.
 *
 * Run: `pnpm test:live` — requires SAGE_USERNAME, SAGE_PASSWORD, SAGE_API_KEY
 * (optional SAGE_COMPANY_ID, SAGE_BASE_URL). Never runs in ordinary CI;
 * manual dispatch only via `.github/workflows/live-tests.yml`.
 */
export default defineConfig({
  test: {
    include: ["tests/live/**/*.test.ts"],
    environment: "node",
    testTimeout: 30_000,
    env: {
      SAGE_LIVE_TESTS: "true",
    },
  },
});

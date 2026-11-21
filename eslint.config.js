// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "coverage/**",
      "node_modules/**",
      "pnpm-lock.yaml",
      "contracts/**",
      "*.md",
      ".corepack/**",
      ".local-bin/**",
      "*.tgz",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    rules: {
      // Project conventions
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "smart"],
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  {
    // Scripts and config files may use console freely
    files: ["scripts/**/*.ts", "scripts/**/*.js", "*.config.ts"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["tests/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
);

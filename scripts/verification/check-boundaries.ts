/**
 * Structural import-boundary validator (spec §5.1, `docs/architecture/module-boundaries.md`, TD-001).
 *
 * Enforces acyclic layer ownership in `src/`:
 * - `src/common` must not import anything from `src/`
 * - `src/errors` may only import `src/common`
 * - `src/logging` must not import higher layers
 * - `src/config` may only import `src/errors`
 * - `src/types` may only import `src/common`
 * - `src/validation` may only import `src/types`, `src/errors`, `src/logging`
 * - `src/auth` may only import `src/config`, `src/errors`, `src/logging`
 * - `src/transport` may only import `src/auth`, `src/config`, `src/logging`, `src/errors`, `src/validation`
 * - `src/domains/**` must NEVER import `src/transport` or `src/client` or `contracts/`
 * - No file in `src/**` may import `contracts/` or `tests/`
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "../..");
const SRC_ROOT = resolve(REPO_ROOT, "src");

const ALLOWED_IMPORTS: Readonly<Record<string, readonly string[]>> = {
  common: ["common"],
  errors: ["errors", "common"],
  logging: ["logging"],
  config: ["config", "errors"],
  types: ["types", "common"],
  validation: ["validation", "types", "errors", "logging"],
  auth: ["auth", "config", "errors", "logging"],
  transport: ["transport", "auth", "config", "logging", "errors", "validation"],
  domains: ["domains", "types", "validation", "errors", "common"],
  client: [
    "client",
    "domains",
    "auth",
    "config",
    "logging",
    "transport",
    "errors",
    "types",
    "validation",
    "common",
  ],
};

function walkTsFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = resolve(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      results.push(...walkTsFiles(full));
    } else if (entry.endsWith(".ts")) {
      results.push(full);
    }
  }
  return results;
}

function getModuleGroup(filePath: string): string {
  const rel = relative(SRC_ROOT, filePath).replace(/\\/g, "/");
  if (rel === "index.ts") {
    return "root";
  }
  const firstSegment = rel.split("/")[0];
  return firstSegment ?? "root";
}

export interface BoundaryViolation {
  readonly file: string;
  readonly fromGroup: string;
  readonly importSpec: string;
  readonly resolvedTargetGroup: string;
  readonly reason: string;
}

export function checkModuleBoundaries(): BoundaryViolation[] {
  const files = walkTsFiles(SRC_ROOT);
  const violations: BoundaryViolation[] = [];
  const importRegex = /(?:import|export)\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)?["']([^"']+)["']/g;

  for (const file of files) {
    const fromGroup = getModuleGroup(file);
    const content = readFileSync(file, "utf8");
    const relFile = relative(REPO_ROOT, file).replace(/\\/g, "/");

    let match: RegExpExecArray | null;
    while ((match = importRegex.exec(content)) !== null) {
      const importSpec = match[1] ?? "";
      if (!importSpec.startsWith(".")) {
        continue;
      }

      const targetAbs = resolve(dirname(file), importSpec);
      const relToRepo = relative(REPO_ROOT, targetAbs).replace(/\\/g, "/");

      if (relToRepo.startsWith("contracts/") || relToRepo.startsWith("tests/")) {
        violations.push({
          file: relFile,
          fromGroup,
          importSpec,
          resolvedTargetGroup: relToRepo.split("/")[0] ?? "external",
          reason: `src/ modules must never import from ${relToRepo}`,
        });
        continue;
      }

      if (fromGroup === "root") {
        if (relToRepo.startsWith("src/internal")) {
          violations.push({
            file: relFile,
            fromGroup,
            importSpec,
            resolvedTargetGroup: "internal",
            reason: "Public entry src/index.ts must not re-export src/internal",
          });
        }
        continue;
      }

      const targetGroup = getModuleGroup(targetAbs);
      const allowed = ALLOWED_IMPORTS[fromGroup];
      if (allowed && !allowed.includes(targetGroup)) {
        violations.push({
          file: relFile,
          fromGroup,
          importSpec,
          resolvedTargetGroup: targetGroup,
          reason: `Module "${fromGroup}" is not permitted to import from "${targetGroup}"`,
        });
      }
    }
  }

  return violations;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const violations = checkModuleBoundaries();
  if (violations.length > 0) {
    console.error("Architectural boundary violations detected:");
    for (const v of violations) {
      console.error(`  - ${v.file}: ${v.reason} (import "${v.importSpec}")`);
    }
    process.exit(1);
  }
  console.log("All architectural module boundaries verified.");
}


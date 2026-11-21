#!/usr/bin/env bash
# Comprehensive verification — specification §17.7.
# Runs every mandatory verification step. Non-zero exit on first failure.
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/../.."

step() {
  printf '\n==> %s\n' "$1"
}

step "1/10 Formatting verification"
pnpm format:check

step "2/10 Linting"
pnpm lint

step "3/10 Type checking"
pnpm typecheck

step "4/10 Unit, integration and contract tests"
pnpm test

step "5/10 Type tests"
pnpm exec vitest run --typecheck.enabled --typecheck.only tests/type-tests

step "6/10 Build"
pnpm build

step "7/10 Package export verification (attw)"
pnpm attw

step "8/10 Documentation presence check"
required_docs=(
  README.md
  CONTRIBUTING.md
  SECURITY.md
  CHANGELOG.md
  LICENSE
  NOTICE
  SUPPORT.md
  AGENTS.md
  docs/architecture/overview.md
  docs/api/README.md
  docs/development/environment-setup.md
  docs/decisions/decision-index.md
  milestones/README.md
  milestones/roadmap.md
)
for doc in "${required_docs[@]}"; do
  if [[ ! -f "$doc" ]]; then
    echo "MISSING REQUIRED DOC: $doc" >&2
    exit 1
  fi
done
echo "All required documentation present."

step "9/10 Package contents check"
pnpm pack --dry-run

step "10/10 Verification complete"
echo "All verification steps passed."

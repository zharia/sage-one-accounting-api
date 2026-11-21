# Environment setup

Target: local development on Arch Linux **without requiring NixOS**, plus identical CI environments.

## Prerequisites

| Tool | Source | Notes |
|---|---|---|
| Nix (flakes enabled) | system package or installer | `nix --version` ≥ 2.x; add `experimental-features = nix-command flakes` to `~/.config/nix/nix.conf` if needed |
| Git | Nix shell provides it | host git also works for non-shell operations |
| Node.js | **Nix shell provides it (24 LTS)** | Do not rely on host Node — spec §4.1 forbids assuming a compatible host runtime |
| pnpm | **Nix shell + corepack** | Version pinned by `packageManager` (`pnpm@11.26.0`); never npm/yarn |

## Setup

```bash
git clone https://github.com/zharia/sage-one-typescript.git
cd sage-one-typescript
nix develop              # Node 24 LTS, pinned pnpm, git — see flake.nix
pnpm install             # creates node_modules from pnpm-lock.yaml
pnpm verify              # baseline: everything green
```

First `nix develop` downloads the pinned toolchain (see `flake.lock`) and corepack fetches the pinned pnpm. Both are cached afterwards.

## What the shell gives you

- `node` 24 LTS (explicitly pinned; `engines: >=24`)
- `pnpm` exactly `11.26.0` (corepack shim in `.local-bin/`, cache in `.corepack/`)
- `git`, `make`, `jq`, `curl`, `sed`
- `devShells.ci` — non-interactive variant for automation

## Environment variables

The SDK reads none. See `.env.example` for the application-level pattern (`SAGE_USERNAME`, `SAGE_PASSWORD`, `SAGE_COMPANY_ID`, `SAGE_BASE_URL`, `SAGE_LIVE_TESTS`). Never commit `.env`.

## Host without Nix

Not supported for parity reasons (spec §4.1). If you must: Node ≥ 24 + `corepack enable` + `pnpm install`, then `pnpm verify` — but CI remains the source of truth.

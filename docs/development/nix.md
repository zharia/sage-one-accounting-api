# Nix Flakes

Reproducible development environment (spec §4.1), usable on Arch Linux without NixOS.

## Files

| File | Purpose |
|---|---|
| `flake.nix` | Dev shells (`default`, `ci`), toolchain pins, checks |
| `flake.lock` | Locked dependency graph — **commit every change** |

## Pins

| Component | Pin | Syncs with |
|---|---|---|
| Node.js | `nodejs_24` (24.22.x LTS) | `package.json` `engines: >=24.0.0` |
| pnpm | corepack reads `packageManager: pnpm@11.26.0` | `package.json` |
| nixpkgs | `nixos-unstable`, locked in `flake.lock` | — |

## Commands

```bash
nix develop              # default dev shell
nix develop .#ci         # CI shell (no interactive extras)
nix flake check          # evaluate flake structure (runs in CI)
nix flake update         # deliberate dependency bump — review diff, run pnpm verify
```

## Design notes

- The nix store is read-only, so corepack shims are written to `.local-bin/` (gitignored) with cache in `.corepack/`.
- The shell must not assume host Node: everything comes from the flake.
- Shell prints active versions on entry to catch accidental host-tool shadowing.

## Troubleshooting

- `Path 'flake.nix' ... not tracked by Git` → `git add -N .` (nix only sees tracked files).
- Stale toolchain → `nix develop` again after `git pull` (lock file changed) or `nix flake update` deliberately.
- See [troubleshooting.md](./troubleshooting.md).

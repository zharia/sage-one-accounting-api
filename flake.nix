{
  description = "Sage One Accounting TypeScript SDK — reproducible development environment";

  inputs = {
    # Locked via flake.lock. Update deliberately, not casually.
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
      mkPkgs = system: import nixpkgs { inherit system; };

      # Pinned toolchain versions — must stay in sync with package.json.
      nodeVersion = "24"; # Node.js LTS (Krypton), engines >=24
    in
    {
      devShells = forAllSystems (system:
        let
          pkgs = mkPkgs system;
          nodejs = pkgs."nodejs_${nodeVersion}";
        in
        {
          # Default development shell: nix develop
          default = pkgs.mkShell {
            packages = [
              nodejs
              pkgs.corepack # enforces packageManager pin (pnpm@11.26.0)
              pkgs.git
              pkgs.gnumake
              pkgs.jq
              pkgs.curl
              pkgs.gnused
            ];

            shellHook = ''
              # Corepack needs writable shims and cache; nix store is read-only.
              export COREPACK_HOME="''${COREPACK_HOME:-$PWD/.corepack}"
              export PATH="$PWD/.local-bin:$PATH"

              mkdir -p "$PWD/.local-bin"
              if [ ! -e "$PWD/.local-bin/pnpm" ]; then
                corepack enable --install-directory "$PWD/.local-bin" >/dev/null 2>&1 || true
              fi

              echo "sage-one-typescript dev shell"
              echo "  node:    $(node --version)"
              echo "  pnpm:    $(command -v pnpm >/dev/null && pnpm --version || echo 'not yet activated')"
              echo "  pin:     $(node -p "require('./package.json').packageManager" 2>/dev/null || echo 'n/a')"
            '';
          };

          # CI-oriented shell: no interactive extras.
          ci = pkgs.mkShell {
            packages = [
              nodejs
              pkgs.corepack
              pkgs.git
              pkgs.gnumake
              pkgs.jq
            ];
            shellHook = ''
              export COREPACK_HOME="''${COREPACK_HOME:-$PWD/.corepack}"
              export PATH="$PWD/.local-bin:$PATH"
              mkdir -p "$PWD/.local-bin"
              corepack enable --install-directory "$PWD/.local-bin" >/dev/null 2>&1 || true
            '';
          };
        });

      # nix flake check — evaluates the flake structure.
      checks = forAllSystems (system: {
        devShell = self.devShells.${system}.default;
      });
    };
}

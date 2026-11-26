# Changelog

## 0.2.0-next.0

### Minor Changes

- 3494aed: Central request scheduler hardening (M008 WP008.2R): Sage-guided 1 req/s
  default pacing, distinct HTTP 429 lockout handling with configurable
  fallback suspension, abortable backoff with documented error mapping,
  login-throttle separation, verification-level documentation, and
  release-pipeline recovery (Changesets CLI v3 + action v2 inputs).

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Project foundation (M001): repository structure, Nix Flakes development shell,
  TypeScript strict toolchain, lint/format/test/build configuration, CI workflows,
  documentation skeleton and milestone plan.

[Unreleased]: https://github.com/zharia/sage-one-accounting-api/compare/HEAD...HEAD

# Sage One Accounting TypeScript SDK
## Project Definition and Technical Implementation Specification

**Project:** Sage One Accounting TypeScript SDK  
**Proposed package:** `@bytemoney/sage-one`  
**Repository:** `github.com/zharia/sage-one-typescript` (provisional)  
**Language:** TypeScript  
**Runtime:** Node.js  
**Package manager:** pnpm  
**Build and toolchain:** Vite+ / Vitest / TypeScript  
**Environment:** Nix Flakes, targeting local Arch Linux development  
**License:** Apache-2.0 (subject to final review of third-party dependencies and Sage branding restrictions)  
**Specification version:** 0.1.0  
**Status:** Ready for implementation planning

---

# 1. Executive Summary

## 1.1 Purpose

Develop a production-grade, strongly typed TypeScript SDK for the Sage One Accounting API, specifically the South African accounting API documented at:

https://accounting.sageone.co.za/api/2.0.0/help

The library shall provide a comprehensive, idiomatic TypeScript interface to the documented Sage One Accounting API.

It must enable developers to integrate Sage One Accounting into Node.js and TypeScript applications without having to manually construct HTTP requests, interpret untyped JSON responses, manage API authentication, or independently implement common API concerns.

The SDK must provide:

- Strongly typed API resources and operations.
- Domain-specific accounting types.
- Runtime validation of requests and responses.
- Authentication and session management.
- Configurable HTTP transport.
- Structured logging and observability.
- Consistent error handling.
- OData query construction.
- Pagination support.
- File attachment handling.
- Batch operations.
- Comprehensive automated testing.
- Generated and manually curated documentation.
- Clear integration instructions for future development agents and consuming applications.

The library must be suitable for use in production financial and business applications.

## 1.2 Design philosophy

The project shall follow these principles:

1. API fidelity before convenience.
2. Strong typing before generic abstractions.
3. Explicit behaviour before implicit behaviour.
4. Runtime validation at system boundaries.
5. Domain-specific structures over generic JSON.
6. Separation of transport, authentication, API contracts and domain services.
7. Deterministic builds and reproducible development.
8. Comprehensive automated verification.
9. Documentation as an integral part of implementation.
10. Incremental development with measurable completion criteria.

The SDK must preserve Sage's underlying API semantics. Convenience abstractions may be provided, but must not conceal or modify the actual behaviour of Sage operations.

---

# 2. Scope

## 2.1 Primary scope

Implement TypeScript bindings for the Sage One Accounting API.

The initial API coverage target is the complete published API specification, including all documented services and operations.

The implementation must not restrict itself to basic customer, supplier and invoice functionality.

## 2.2 API coverage

The implementation must catalogue and account for all documented API service groups, including:

### Financial accounting
- Account
- Account Category
- Account Balance
- Account Opening Balance
- Account Payment
- Account Receipt
- Journal Entry
- Detailed Ledger Transaction
- Financial Year
- Trial Balance
- Balance Sheet
- Profit and Loss
- Final Accounts
- Budget

### Customers and sales
- Customer
- Customer Category
- Customer Adjustment
- Customer Receipt
- Customer Return
- Customer Statement
- Customer Transaction Listing
- Customer Ageing
- Customer Opening Balance
- Customer Write Off
- Customer Sales History
- Outstanding Customer Document
- Quote
- Tax Invoice
- Sales Order
- Recurring Invoice

### Suppliers and purchases
- Supplier
- Supplier Category
- Supplier Adjustment
- Supplier Invoice
- Supplier Payment
- Supplier Return
- Supplier Statement
- Supplier Transaction Listing
- Supplier Ageing
- Supplier Opening Balance
- Supplier Purchase History
- Outstanding Supplier Document
- Purchase Order

### Banking
- Bank Account
- Bank Account Category
- Bank Account Transaction Listing
- Bank Statement Transaction
- Bank Transaction
- Bank Import Mapping
- Process Bank And Credit Card Mapping
- Cash Movement

### Inventory
- Item
- Item Category
- Item Adjustment
- Item Bundle
- Item Movement
- Item Opening Balance
- Item Report Group
- Additional Item Price
- Additional Price List
- Purchases By Item
- Sales By Item
- Price Listing Report

### Taxation
- Tax Type
- Tax Adjustment
- Tax Rate Adjustment
- Tax Period
- BAS Report
- VAT201 Report
- Tax Invoice

### Assets
- Asset
- Asset Category
- Asset Location
- Asset Note

### CRM and administration
- CRM Activity
- CRM Activity Category
- Accountant Event
- Accountant Note
- Accountant Task
- Accountant Task Recurrence
- Company
- Company Note
- Sage Id User
- To Do List

### Time tracking
- Time Tracking Customer
- Time Tracking Expense
- Time Tracking Project
- Time Tracking Task
- Time Tracking Timesheet
- Time Tracking User

### Other services
All remaining documented services, including reports, document attachments, localization, exchange rates, secretarial information, developer data, and supporting reference data.

The authoritative list must be maintained in the API coverage catalogue. This list is an initial domain classification, not a replacement for the live Sage endpoint inventory.

## 2.3 API compatibility

The SDK must support the published API version:

`2.0.0`

The API version and documentation source must be configurable in the internal contract metadata.

The SDK must not silently assume that all Sage endpoints have identical request or response conventions.

## 2.4 Exclusions

The SDK is not intended to:

- Replace Sage One Accounting.
- Implement an alternative accounting ledger.
- Modify Sage accounting rules.
- Independently calculate statutory accounting obligations.
- Provide a database or persistent accounting repository.
- Introduce an opinionated application-level state-management system.
- Guarantee that Sage API operations are transactional or idempotent.

---

# 3. Repository and project organisation

Use a single TypeScript package repository with a clearly separated source, testing, documentation and project-management structure.

Recommended repository layout:

```text
sage-one-typescript/
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── release.yml
│   │   ├── security.yml
│   │   └── documentation.yml
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── dependabot.yml
│
├── .agents/
│   ├── instructions.md
│   ├── architecture.md
│   ├── development.md
│   └── verification.md
│
├── .changeset/
│
├── .github/copilot-instructions.md
├── AGENTS.md
├── CLAUDE.md
├── GEMINI.md
├── README.md
├── CONTRIBUTING.md
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── CHANGELOG.md
├── LICENSE
├── NOTICE
├── SUPPORT.md
│
├── docs/
│   ├── README.md
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── design-principles.md
│   │   ├── module-boundaries.md
│   │   ├── authentication.md
│   │   ├── transport.md
│   │   ├── error-handling.md
│   │   ├── logging.md
│   │   ├── configuration.md
│   │   ├── domain-model.md
│   │   ├── runtime-validation.md
│   │   └── adr/
│   │
│   ├── api/
│   │   ├── README.md
│   │   ├── coverage-matrix.md
│   │   ├── endpoint-inventory.md
│   │   ├── contract-sources.md
│   │   ├── authentication.md
│   │   ├── pagination.md
│   │   ├── odata.md
│   │   ├── attachments.md
│   │   └── known-limitations.md
│   │
│   ├── development/
│   │   ├── environment-setup.md
│   │   ├── nix.md
│   │   ├── toolchain.md
│   │   ├── build.md
│   │   ├── testing.md
│   │   ├── debugging.md
│   │   ├── releasing.md
│   │   └── troubleshooting.md
│   │
│   ├── integration/
│   │   ├── quick-start.md
│   │   ├── nodejs.md
│   │   ├── configuration.md
│   │   ├── authentication.md
│   │   ├── common-workflows.md
│   │   ├── financial-workflows.md
│   │   ├── error-handling.md
│   │   └── production-guidelines.md
│   │
│   ├── reference/
│   │   ├── types.md
│   │   ├── services.md
│   │   ├── errors.md
│   │   ├── configuration.md
│   │   └── logging.md
│   │
│   ├── agents/
│   │   ├── implementation-guide.md
│   │   ├── integration-guide.md
│   │   ├── extension-guide.md
│   │   ├── api-coverage-guide.md
│   │   └── agent-handoff.md
│   │
│   └── decisions/
│       └── decision-index.md
│
├── milestones/
│   ├── README.md
│   ├── roadmap.md
│   ├── technical-debt.md
│   ├── release-plan.md
│   ├── milestones/
│   │   ├── M001-project-foundation.md
│   │   ├── M002-api-contract-discovery.md
│   │   ├── M003-core-sdk.md
│   │   ├── M004-accounting-domains.md
│   │   ├── M005-commercial-domains.md
│   │   ├── M006-advanced-api.md
│   │   └── M007-production-release.md
│   │
│   └── sprints/
│       ├── README.md
│       └── sprint-template.md
│
├── contracts/
│   ├── README.md
│   ├── sage-api/
│   │   ├── source-manifest.json
│   │   ├── endpoint-catalogue.json
│   │   └── snapshots/
│   └── fixtures/
│
├── src/
│   ├── index.ts
│   ├── client/
│   ├── auth/
│   ├── transport/
│   ├── config/
│   ├── logging/
│   ├── errors/
│   ├── validation/
│   ├── types/
│   ├── common/
│   │
│   ├── domains/
│   │   ├── accounting/
│   │   ├── customers/
│   │   ├── suppliers/
│   │   ├── sales/
│   │   ├── purchases/
│   │   ├── banking/
│   │   ├── inventory/
│   │   ├── taxation/
│   │   ├── assets/
│   │   ├── reporting/
│   │   ├── crm/
│   │   ├── time-tracking/
│   │   ├── company/
│   │   └── administration/
│   │
│   └── internal/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── contract/
│   ├── e2e/
│   ├── fixtures/
│   ├── mocks/
│   ├── property/
│   ├── type-tests/
│   └── live/
│
├── scripts/
│   ├── api-discovery/
│   ├── contract-validation/
│   ├── generate/
│   ├── release/
│   └── verification/
│
├── examples/
│   ├── basic/
│   ├── customers/
│   ├── invoices/
│   ├── banking/
│   └── reporting/
│
├── flake.nix
├── flake.lock
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.json
├── tsconfig.build.json
├── vite.config.ts
├── vitest.config.ts
├── .npmrc
├── .editorconfig
├── .gitignore
└── .env.example
```

The agent may refine this layout if there is a documented architectural justification. The separation of source, contracts, tests, documentation and milestones is mandatory.

---

# 4. Development toolchain

## 4.1 Nix Flakes

Nix Flakes shall provide a reproducible development environment.

The flake must:

- Define the supported Node.js version.
- Provide pnpm.
- Provide Git.
- Provide the selected Vite+ toolchain.
- Provide required native build utilities.
- Provide development and verification shells.
- Provide consistent environment variables.
- Support `nix develop`.
- Include a locked dependency graph in `flake.lock`.

The environment must be usable on Arch Linux without requiring NixOS.

Do not assume that the host operating system supplies a compatible Node.js installation.

Use the Nix-managed runtime inside the development shell.

## 4.2 Node.js

Target the current supported Node.js LTS release at implementation time.

The selected version must be explicitly pinned and documented.

Use native ESM modules.

Define a minimum supported Node.js version in `package.json` and test against that version.

## 4.3 pnpm

Use pnpm as the sole package manager.

Requirements:

- Pin pnpm using the `packageManager` field.
- Commit `pnpm-lock.yaml`.
- Use frozen-lockfile installation in CI.
- Avoid mixing npm, Yarn and pnpm.
- Use workspace configuration even if the initial project contains one package.
- Enforce dependency consistency.

## 4.4 Vite+

Evaluate the current stable Vite+ distribution from VoidZero and use it as the unified development toolchain if its required features are stable and compatible.

Vite+ should be the preferred entry point for:

- Development commands.
- Build orchestration.
- Testing.
- Linting.
- Formatting.
- Development-time tooling.

Do not confuse Vite+ with a requirement to bundle the SDK as a browser application.

This is a Node.js library. Its published output must remain a conventional, portable JavaScript package with TypeScript declarations.

If Vite+ does not provide a required library-build or verification capability, use the appropriate dedicated tool and document the boundary.

The project must not adopt unstable tooling merely to satisfy a fashionable dependency choice.

## 4.5 Core development dependencies

Evaluate and pin compatible stable releases of:

| Concern | Preferred technology |
|---|---|
| Language | TypeScript |
| Runtime | Node.js |
| Package manager | pnpm |
| Environment | Nix Flakes |
| Unified toolchain | Vite+ |
| Testing | Vitest |
| HTTP | Native Fetch API |
| Runtime schemas | Zod |
| Logging | Pino |
| API documentation | TypeDoc |
| Type tests | Vitest type testing / tsd |
| Property testing | fast-check |
| Mock HTTP | MSW |
| Formatting | Vite+ formatter or Prettier |
| Linting | Vite+ linting or ESLint |
| Git hooks | Lefthook or equivalent |
| Release management | Changesets |
| Security scanning | GitHub Dependabot and CodeQL |

Do not introduce redundant tools where Vite+ already provides equivalent functionality.

## 4.6 TypeScript compiler configuration

Use strict TypeScript settings.

Mandatory configuration:

- `strict: true`
- `noImplicitAny: true`
- `strictNullChecks: true`
- `exactOptionalPropertyTypes: true`
- `noUncheckedIndexedAccess: true`
- `noImplicitOverride: true`
- `noFallthroughCasesInSwitch: true`
- `useUnknownInCatchVariables: true`
- `verbatimModuleSyntax: true`
- `isolatedModules: true`
- `forceConsistentCasingInFileNames: true`

Generate declaration files and source maps.

No `any` types in public API declarations unless there is an explicit, documented exception.

---

# 5. Architectural design

## 5.1 High-level architecture

The SDK must be divided into distinct architectural layers.

```text
Consuming Application
        |
        v
Public TypeScript SDK
        |
        v
Domain Service Modules
        |
        v
API Contract / Request Models
        |
        v
Runtime Validation
        |
        v
HTTP Transport
        |
        +------ Authentication
        |
        +------ Configuration
        |
        +------ Logging
        |
        +------ Error Mapping
        |
        v
Sage One Accounting API
```

Each layer must have clearly defined responsibilities.

### Public SDK

The public SDK provides the developer-facing interface.

It should expose a single primary client, supported resource services, public types, configuration structures and error classes.

### Domain services

Domain services provide strongly typed methods for individual Sage resources.

Examples:

- `accounts`
- `customers`
- `suppliers`
- `invoices`
- `quotes`
- `bankAccounts`
- `bankTransactions`
- `journalEntries`
- `taxTypes`
- `reports`

Resource naming must be idiomatic TypeScript while preserving Sage terminology.

### API contracts

Represent the actual API request and response structures.

Contract types must preserve Sage field names and endpoint-specific differences.

Do not prematurely normalize API responses into a different data model.

### Runtime validation

Validate API request and response structures using Zod schemas.

Schemas must be colocated with their corresponding resource definitions or maintained in a clearly defined contract directory.

### Transport

The transport layer owns:

- HTTP request construction.
- Headers.
- Authentication injection.
- Request serialization.
- Response deserialization.
- Timeouts.
- Cancellation.
- Retry policy.
- Error conversion.
- Logging instrumentation.

Domain services must not implement their own HTTP clients.

---

# 6. API contract discovery and modelling

## 6.1 Canonical API catalogue

The agent must first discover and catalogue the entire Sage API.

The official documentation is:

https://accounting.sageone.co.za/api/2.0.0/help

Create a machine-readable endpoint catalogue.

Each endpoint record must include:

- Service name.
- Resource name.
- Operation name.
- HTTP method.
- Relative route.
- Query parameters.
- Path parameters.
- Request content type.
- Request schema.
- Response content type.
- Response schema.
- Authentication requirement.
- Paging behaviour.
- OData support.
- File handling requirements.
- Documentation URL.
- Documentation completeness.
- Implementation status.
- Test status.

The catalogue must distinguish between:

1. Fully documented endpoints.
2. Partially documented endpoints.
3. Endpoints with no model documentation.
4. Endpoints whose behaviour must be experimentally verified.

Do not fabricate missing API properties or infer endpoint semantics solely from naming conventions.

## 6.2 Discovery process

Use the Sage help documentation as the primary source.

Investigate whether Sage exposes an OpenAPI, Swagger, API metadata or equivalent machine-readable specification.

Where available, retrieve and archive the official contract.

Where unavailable, build the catalogue from the published Help pages.

Create scripts that can:

- Retrieve the documentation.
- Extract service definitions.
- Extract endpoint definitions.
- Capture request models.
- Capture response models.
- Compare contract snapshots.
- Report undocumented or changed endpoints.

Record the date of discovery and source URL.

The raw API contract must remain separate from generated SDK source code.

## 6.3 Contract fidelity

Sage uses PascalCase field names in documented JSON examples.

Preserve these names in the raw API contract layer.

The public SDK may offer idiomatic camelCase input and output types as a separate convenience layer, but this must be explicit and deterministic.

The default SDK behaviour should favour API fidelity over automatic field renaming.

Never silently transform monetary values, identifiers, dates or enumerations.

## 6.4 Generated versus hand-maintained code

Use code generation where it materially reduces repetitive work.

Generated code must be reproducible.

Generated files must include a header identifying their source and generator.

Hand-maintained custom logic must be separated from generated definitions.

The generation pipeline must never overwrite custom business logic.

Every generated resource must be traceable to its source API contract.

---

# 7. Domain-specific type system

## 7.1 General requirements

Prefer meaningful domain types over generic primitives.

Examples:

```typescript
type SageId = number & {
  readonly __brand: "SageId";
};

type CompanyId = SageId;
type CustomerId = SageId;
type SupplierId = SageId;
type AccountId = SageId;
type TaxTypeId = SageId;
type InvoiceId = SageId;

type ISODateString = string & {
  readonly __brand: "ISODateString";
};

type ISODateTimeString = string & {
  readonly __brand: "ISODateTimeString";
};
```

Branded types must only be constructed through validated parsing or explicit safe constructors.

Do not assume that every Sage identifier is numeric. Confirm identifier types per resource before assigning branded types.

## 7.2 Accounting types

Establish shared domain types for:

- Money.
- Currency.
- Tax rates.
- Tax amounts.
- Percentages.
- Account codes.
- Account categories.
- Debit and credit values.
- Transaction dates.
- Document numbers.
- Exchange rates.
- Financial periods.
- Ledger entries.
- Document statuses.

Use decimal-safe representations for financial calculations.

Never use binary floating-point arithmetic as the authoritative representation for financial calculations.

Where Sage serializes amounts as JSON numbers, preserve the original wire representation and provide explicit conversion utilities for decimal-safe calculations.

Use a suitable decimal library where calculation is required.

Do not impose local accounting rules on Sage API values.

## 7.3 Enumerations

Create typed enumerations or literal unions for documented Sage enumerations.

Examples include:

- Account types.
- Tax types.
- Document statuses.
- Transaction types.
- Payment methods.
- Currency codes.
- Financial periods.
- Recurrence frequencies.

Unknown future values must be handled without causing catastrophic parsing failures.

Prefer forward-compatible parsing strategies where Sage may introduce new enum values.

## 7.4 Optional and nullable values

Distinguish between:

- Required values.
- Optional values.
- Explicitly nullable values.
- Values omitted from a request.
- Values returned as null.

Do not collapse these distinctions.

Use `exactOptionalPropertyTypes`.

## 7.5 API and SDK type separation

Maintain two conceptual representations where appropriate:

**Wire types:** exact Sage request and response representations.

**SDK types:** idiomatic, validated TypeScript structures exposed to consumers.

Provide explicit conversion boundaries.

Document any differences between these representations.

---

# 8. Runtime validation

Use Zod as the runtime validation framework.

Each implemented resource should have:

- Request schema.
- Response schema.
- Create/update schema where applicable.
- Query parameter schema.
- Enumeration schemas.
- Supporting nested object schemas.

Validation must occur at important system boundaries.

At minimum:

1. Validate configuration.
2. Validate structured request input.
3. Validate request serialization.
4. Validate received API responses where a schema exists.
5. Validate generated or transformed domain objects.

Use `z.infer` or equivalent inference to keep TypeScript types aligned with runtime schemas.

Avoid maintaining two independent definitions of the same structure.

Unknown properties must be handled according to the documented compatibility strategy.

Prefer preserving unknown response fields where appropriate, so that new Sage API fields do not unnecessarily break consumers.

Validation errors must identify:

- The affected resource.
- The affected operation.
- The failing field.
- The expected structure.
- The received value where safe to disclose.

Never include passwords or authentication secrets in validation errors.

---

# 9. Authentication

Authentication is a high-priority discovery item.

The published Login/Validate endpoint documents a username/password request returning a boolean.

This does not establish the complete authentication mechanism used by subsequent requests.

Before implementation, investigate:

- Authentication headers.
- Token issuance.
- Token lifetime.
- Session handling.
- Required company context.
- Required application headers.
- Any API-specific signing or credential mechanisms.

Document the findings in:

`docs/architecture/authentication.md`

Implement authentication behind a dedicated interface.

Suggested abstraction:

```typescript
export interface SageAuthenticator {
  authenticate(
    context: AuthenticationContext
  ): Promise<AuthenticationResult>;

  apply(
    request: Request
  ): Promise<Request>;
}
```

The actual interface may be refined to avoid unnecessary coupling to the Fetch Request implementation.

Requirements:

- Never hard-code credentials.
- Never log credentials.
- Never expose secrets in error messages.
- Support secure environment-based configuration.
- Allow custom authentication implementations.
- Support authentication renewal if the actual API mechanism requires it.
- Support concurrent requests safely.
- Prevent unnecessary duplicate authentication operations.
- Never invent OAuth behaviour unless the official API confirms it.

The SDK must provide an explicit authentication test or verification operation where supported.

---

# 10. HTTP transport

Use Node.js native Fetch as the default HTTP implementation.

Provide a transport abstraction that allows a custom Fetch-compatible implementation to be injected.

Requirements:

- Configurable base URL.
- Configurable request timeout.
- AbortSignal support.
- Request cancellation.
- JSON serialization.
- Multipart form support.
- Binary response support.
- Content-type handling.
- Response status handling.
- Authentication integration.
- Request correlation identifiers.
- Structured logging.
- Retry policy.
- Optional custom headers.
- Deterministic error mapping.

Do not impose a dependency on Axios unless a concrete technical requirement emerges.

## 10.1 Retry policy

Retries must be conservative.

Only retry operations where retrying is safe or explicitly configured.

GET requests may be retried for appropriate transient failures.

Do not automatically retry financial mutations such as:

- Invoice creation.
- Supplier payment creation.
- Customer receipt creation.
- Journal entry creation.
- Bank transaction creation.

A timeout does not prove that Sage failed to process a mutation.

The SDK must avoid creating duplicate financial transactions through careless retry behaviour.

## 10.2 Timeouts

Support configurable timeouts at client and individual request level.

Provide sensible defaults.

Ensure aborted requests produce distinguishable errors.

---

# 11. OData and pagination

## 11.1 OData support

The Sage documentation explicitly indicates that collection endpoints support OData queries.

Provide a typed OData query builder.

Support documented query features such as:

- `$filter`
- `$select`
- `$orderby`
- `$top`
- `$skip`
- `$expand`
- `$count`

Verify actual endpoint compatibility before claiming universal support.

The query builder should offer typed field references where practical.

Example:

```typescript
const query = odata<Customer>()
  .filter("Active", "eq", true)
  .orderBy("Name", "asc")
  .top(50)
  .build();
```

The example is illustrative; final method signatures must be established during implementation.

Ensure correct URL encoding.

Provide an escape hatch for raw OData expressions.

## 11.2 Paging

Support the Sage paging envelope:

```typescript
interface SagePage<T> {
  TotalResults: number;
  ReturnedResults: number;
  Results: T[];
}
```

Provide:

- Single-page retrieval.
- Automatic page iteration where supported.
- Async iterable support.
- Configurable page limits.
- Cancellation.
- Protection against infinite pagination.
- Page metadata access.

Do not assume that all Sage endpoints use the same pagination mechanism.

The implementation must inspect each endpoint's documented behaviour.

---

# 12. Domain service API

The SDK must expose an intuitive, discoverable client.

Illustrative interface:

```typescript
const sage = new SageOneClient({
  username: process.env.SAGE_USERNAME!,
  password: process.env.SAGE_PASSWORD!,
  companyId: 12345,
});

const accounts = await sage.accounts.list();

const customer = await sage.customers.get({
  id: customerId,
});

const invoices = await sage.invoices.list({
  includeDetail: true,
});

const invoice = await sage.invoices.create({
  // Strongly typed Sage invoice input
});
```

The actual signatures must follow the discovered Sage API contract.

The client should expose resource services as stable properties.

Potential service groups include:

```typescript
sage.accounts
sage.customers
sage.suppliers
sage.invoices
sage.quotes
sage.salesOrders
sage.purchaseOrders
sage.bankAccounts
sage.bankTransactions
sage.journalEntries
sage.taxTypes
sage.taxPeriods
sage.items
sage.assets
sage.reports
sage.company
```

Each service must expose the operations actually supported by Sage.

Do not fabricate CRUD operations where Sage does not provide them.

Use operation-specific request and response types.

For complex operations, prefer descriptive method names matching the underlying API operation.

Examples:

- `calculate`
- `validate`
- `saveBatch`
- `deleteBatch`
- `export`
- `email`
- `getStatement`
- `getTransactionListing`

---

# 13. Logging and observability

Use Pino as the preferred structured logging implementation.

Logging must be configurable and must not force consumers to use Pino directly.

Provide a logging interface:

```typescript
export interface SageLogger {
  debug(message: string, context?: object): void;
  info(message: string, context?: object): void;
  warn(message: string, context?: object): void;
  error(message: string, context?: object): void;
}
```

Support:

- Log levels.
- Custom logger injection.
- Structured context.
- Request correlation IDs.
- Operation names.
- HTTP methods.
- Endpoint paths.
- Response status.
- Request duration.
- Retry events.
- Authentication events.

Sensitive data must be redacted.

Never log:

- Passwords.
- Authentication tokens.
- Authorization headers.
- Full sensitive financial payloads by default.
- Personal information unnecessarily.

Provide optional diagnostic logging with explicit opt-in.

Logging must be disabled or appropriately minimal by default in production.

---

# 14. Configuration management

Provide a typed client configuration interface.

Illustrative structure:

```typescript
interface SageOneConfig {
  baseUrl?: string;

  credentials?: {
    username: string;
    password: string;
  };

  companyId?: CompanyId;

  timeout?: number;

  retry?: {
    enabled: boolean;
    maxAttempts: number;
  };

  logging?: {
    enabled: boolean;
    level: LogLevel;
  };

  validation?: {
    validateRequests: boolean;
    validateResponses: boolean;
  };

  transport?: {
    fetch?: typeof fetch;
  };
}
```

Final configuration must reflect the verified authentication mechanism.

Requirements:

- Configuration validation using Zod.
- Explicit precedence rules.
- Environment variable support through application-level configuration examples.
- No implicit environment access inside domain modules.
- Custom configuration injection.
- Secure credential handling.
- Sensible defaults.
- Clear error messages.

The SDK itself must not require a `.env` file.

Do not automatically load environment variables as a hidden side effect.

---

# 15. Error handling

Provide a consistent error hierarchy.

Suggested errors:

```typescript
SageError
├── SageConfigurationError
├── SageAuthenticationError
├── SageAuthorizationError
├── SageValidationError
├── SageApiError
├── SageNetworkError
├── SageTimeoutError
├── SageRateLimitError
├── SageNotFoundError
├── SageConflictError
└── SageResponseError
```

Every error should expose relevant contextual information:

- Error code.
- HTTP status where applicable.
- Sage error details.
- Resource.
- Operation.
- Request identifier.
- Retryability where known.
- Original cause.

Do not discard the original Sage response when converting errors.

Avoid leaking credentials or sensitive data.

Distinguish between an SDK validation failure and a rejection originating from Sage.

---

# 16. File and attachment support

The SDK must support Sage attachment endpoints.

Implement:

- Multipart upload.
- File metadata.
- File download.
- Binary response handling.
- Attachment deletion.
- Attachment deletion batches where supported.
- Storage information retrieval.

Use native Blob, FormData and compatible Node.js file abstractions.

Support AbortSignal.

Avoid loading unnecessarily large files into memory.

Document which attachment operations require a parent resource identifier.

---

# 17. Testing and verification

Testing is mandatory and must be part of every milestone.

## 17.1 Unit tests

Test:

- Domain types.
- Runtime schemas.
- Configuration.
- Authentication.
- HTTP transport.
- Query construction.
- Pagination.
- Serialization.
- Error mapping.
- Logging and redaction.
- Date and decimal utilities.

## 17.2 Integration tests

Use MSW or equivalent HTTP mocking to verify the interaction between:

- Domain services.
- Runtime schemas.
- Transport.
- Authentication.
- Error handling.

Tests must use realistic Sage request and response fixtures.

## 17.3 Contract tests

Every endpoint must have contract verification.

Verify:

- HTTP method.
- Route.
- Query parameters.
- Request content type.
- Request body.
- Response structure.
- Error behaviour.

Contract fixtures must be traceable to the Sage documentation or verified live observations.

## 17.4 Type tests

Test the public TypeScript API.

Verify that:

- Invalid identifiers are rejected.
- Incorrect request properties fail compilation.
- Nullable values are handled correctly.
- Domain-specific types remain distinct.
- Public exports resolve correctly.
- No unintended `any` leaks into public declarations.

Use `tsd`, Vitest type tests or an equivalent.

## 17.5 Property-based testing

Use fast-check for suitable utilities.

Examples:

- OData query encoding.
- Pagination progression.
- Serialization.
- Decimal utilities.
- Input validation.
- Identifier parsing.

## 17.6 Live API tests

Provide an optional live integration suite.

Live tests must:

- Be explicitly enabled.
- Use environment-provided credentials.
- Never run automatically in ordinary CI.
- Use a dedicated test company where possible.
- Avoid destructive operations by default.
- Clearly identify operations that can create financial records.

Never use production accounting data as a test fixture.

## 17.7 Verification command

Provide a single comprehensive verification command.

It must run:

1. Formatting verification.
2. Linting.
3. Type checking.
4. Unit tests.
5. Integration tests.
6. Contract tests.
7. Type tests.
8. Build verification.
9. Package export verification.
10. Documentation verification.

All mandatory verification steps must pass before a release.

---

# 18. Build and package distribution

The SDK must be published as a conventional npm-compatible TypeScript package.

Requirements:

- ESM support.
- TypeScript declaration files.
- Source maps.
- Correct `exports` map.
- Correct `types` entry.
- Correct `files` inclusion.
- Explicit Node.js engine requirement.
- No development dependencies in runtime dependencies.
- Reproducible package output.
- Clean package contents.

Use Vite+ build capabilities where appropriate, or a dedicated library bundling strategy if required.

Avoid unnecessarily bundling external dependencies.

Verify that consumers can install and import the package using pnpm.

The package must not require Vite, Nix or pnpm at runtime.

---

# 19. Documentation requirements

Documentation is a deliverable, not an afterthought.

The following must exist before the first stable release.

## 19.1 Root documentation

- README.md
- CONTRIBUTING.md
- SECURITY.md
- CHANGELOG.md
- LICENSE
- NOTICE
- SUPPORT.md
- AGENTS.md

## 19.2 Architecture documentation

Document:

- System architecture.
- Architectural boundaries.
- API contract management.
- Authentication.
- HTTP transport.
- Domain model.
- Validation.
- Configuration.
- Logging.
- Error handling.
- Testing strategy.
- Build strategy.
- Release strategy.

## 19.3 API documentation

Document:

- Every implemented service.
- Every implemented operation.
- Request models.
- Response models.
- Supported query parameters.
- Authentication requirements.
- Pagination.
- Known limitations.

Provide an API coverage matrix.

## 19.4 Integration documentation

Include practical examples for:

- Initial client setup.
- Authentication.
- Retrieving companies.
- Retrieving accounts.
- Creating and retrieving customers.
- Creating invoices.
- Retrieving suppliers.
- Processing receipts.
- Retrieving bank transactions.
- Retrieving reports.
- Uploading attachments.
- Handling errors.
- Configuring logging.

All examples must compile against the actual public SDK.

## 19.5 Agent documentation

Provide explicit instructions for future AI agents.

Agents must be able to understand:

- How the project is structured.
- How to establish the development environment.
- How to build and test the project.
- How to discover API endpoints.
- How to implement a new resource.
- How to add request and response schemas.
- How to update the endpoint catalogue.
- How to add contract fixtures.
- How to update documentation.
- How to record architectural decisions.
- How to create milestones and sprints.
- How to identify and record technical debt.
- How to verify implementation completeness.

---

# 20. AI agent instructions and conventions

## 20.1 AGENTS.md

The root AGENTS.md is authoritative.

It must instruct agents to:

1. Read the project README.
2. Read the architecture documentation.
3. Read the current milestone.
4. Read the sprint specification before implementing sprint work.
5. Inspect relevant existing code before making changes.
6. Follow the established architectural boundaries.
7. Preserve API contract fidelity.
8. Never invent Sage endpoint behaviour.
9. Add tests with every implementation.
10. Update documentation alongside code.
11. Update the API coverage catalogue.
12. Run the appropriate verification commands.
13. Record unresolved issues and technical debt.
14. Produce a clear implementation report.

## 20.2 Agent-specific files

Provide concise agent-specific files for:

- Claude.
- Gemini.
- GitHub Copilot.

These files should reference the authoritative AGENTS.md rather than independently duplicating project policy.

## 20.3 Implementation discipline

Use the following workflow:

```text
Research
   |
   v
Contract Discovery
   |
   v
Domain Modelling
   |
   v
Technical Specification
   |
   v
Implementation
   |
   v
Unit Testing
   |
   v
Contract Testing
   |
   v
Integration Testing
   |
   v
Documentation
   |
   v
Verification
   |
   v
Milestone Acceptance
```

No implementation should be considered complete solely because it compiles.

---

# 21. Architectural Decision Records

All significant architectural decisions must be recorded in:

`docs/architecture/adr/`

Use numbered ADRs.

Initial required decisions:

- ADR-001: SDK architectural model.
- ADR-002: TypeScript module and packaging strategy.
- ADR-003: API contract discovery and generation.
- ADR-004: Domain type strategy.
- ADR-005: Runtime validation using Zod.
- ADR-006: HTTP transport using Fetch.
- ADR-007: Authentication architecture.
- ADR-008: Structured logging.
- ADR-009: Error hierarchy.
- ADR-010: OData query builder.
- ADR-011: Pagination strategy.
- ADR-012: Financial decimal handling.
- ADR-013: Testing architecture.
- ADR-014: Build and release tooling.
- ADR-015: API versioning and compatibility.

Each ADR must contain:

- Context.
- Problem.
- Options considered.
- Decision.
- Rationale.
- Consequences.
- Rejected alternatives.
- Status.
- Date.

Authentication, API generation and decimal handling must remain provisional until their discovery work has been completed.

---

# 22. Milestone and sprint management

All development planning must reside in `milestones/`.

The roadmap must describe dependencies and intended release progression.

Every milestone must contain:

- Objective.
- Scope.
- Prerequisites.
- Deliverables.
- Technical tasks.
- Test requirements.
- Documentation requirements.
- Acceptance criteria.
- Risks.
- Dependencies.
- Outstanding technical debt.

Every sprint must contain:

- Sprint objective.
- Included tasks.
- Task dependencies.
- Definition of Done.
- Verification requirements.
- Completion report.

Use stable milestone and sprint identifiers.

Do not overwrite completed milestone specifications. Record subsequent amendments and completion reports.

Technical debt must be explicitly tracked, prioritised and assigned a disposition.

---

# 23. GitHub repository and CI/CD

Host the project on GitHub.

## 23.1 Branching

Use a simple branching strategy:

- `main`: stable, releasable code.
- Feature branches: individual features and milestones.
- Pull requests: all changes into main.

## 23.2 CI

GitHub Actions must execute:

- Nix environment validation.
- Dependency installation.
- Formatting checks.
- Linting.
- Type checking.
- Unit tests.
- Integration tests.
- Contract tests.
- Build.
- Package verification.
- Documentation checks.

Use pnpm frozen-lockfile installation.

## 23.3 Security

Implement:

- Dependabot.
- CodeQL.
- Secret scanning where available.
- Dependency auditing.
- Lockfile verification.
- Secure GitHub Actions permissions.

No credentials or live API secrets may be committed.

## 23.4 Releases

Use Changesets for release management.

Require:

- Updated changelog.
- Passing CI.
- Version compatibility review.
- Package verification.
- Release notes.

Follow semantic versioning.

A change to a public TypeScript interface may constitute a breaking change even where the underlying Sage API has not changed.

---

# 24. API coverage and quality metrics

Maintain a machine-readable and human-readable coverage matrix.

Each endpoint must be classified independently across these dimensions:

| Dimension | States |
|---|---|
| Discovered | Pending / Complete |
| Contract | Missing / Partial / Complete |
| Type definitions | Missing / Partial / Complete |
| Runtime schemas | Missing / Partial / Complete |
| Implementation | Missing / Partial / Complete |
| Unit tests | Missing / Complete |
| Contract tests | Missing / Complete |
| Documentation | Missing / Complete |

A resource must not be labelled complete merely because one of its operations is implemented.

Report:

- Total discovered endpoints.
- Implemented endpoints.
- Fully typed endpoints.
- Validated endpoints.
- Contract-tested endpoints.
- Undocumented endpoints.
- Known API limitations.

The initial target for the stable release is 100% coverage of the discoverable documented endpoint inventory.

Where an endpoint cannot be implemented because Sage documentation is incomplete, it must be explicitly classified and its limitation recorded.

---

# 25. Security and financial safety

The SDK interfaces with an accounting system. Treat all financial mutations as high-consequence operations.

Requirements:

- Never log secrets.
- Never retry financial mutations automatically without a safe idempotency strategy.
- Do not silently round monetary amounts.
- Do not silently alter tax values.
- Do not infer that a failed network request means the remote mutation failed.
- Preserve Sage error responses.
- Provide explicit handling of destructive operations.
- Use least-privilege credentials where Sage supports them.
- Avoid storing credentials in SDK-managed persistent storage.
- Document production credential management.

The SDK must not implement hidden financial business rules.

---

# 26. Initial implementation roadmap

## M001 — Project foundation

Establish repository, toolchain, documentation structure, Nix environment, GitHub configuration and CI.

## M002 — Sage API discovery

Catalogue all service areas, operations, models, authentication requirements and endpoint-specific behaviours.

## M003 — Core SDK infrastructure

Implement client, configuration, transport, authentication abstraction, logging, errors, validation framework and shared types.

## M004 — Foundational accounting domains

Implement accounts, company, customers, suppliers, tax types, items and core accounting structures.

## M005 — Commercial transactions

Implement invoices, quotes, sales orders, purchase orders, receipts, payments, allocations and associated attachments.

## M006 — Banking, reporting and advanced domains

Implement banking, journals, assets, taxation, reporting, time tracking, CRM and remaining service areas.

## M007 — Production readiness

Complete endpoint coverage, tests, documentation, package verification, release automation and first stable release.

Milestones may be split into smaller sprints.

Dependencies must be respected.

---

# 27. Definition of Done

The project is complete when:

1. The entire documented Sage API endpoint inventory has been catalogued.
2. All discoverable endpoints have corresponding strongly typed SDK bindings.
3. Undocumented endpoint limitations are explicitly recorded.
4. Runtime schemas exist for supported request and response contracts.
5. Authentication has been verified against the actual Sage API.
6. The HTTP transport supports all required content types and response formats.
7. Pagination and OData functionality have been tested.
8. Attachments and binary downloads are supported.
9. Structured logging and redaction have been verified.
10. Financial decimal handling has been documented and tested.
11. Unit, integration, contract and type tests pass.
12. Optional live tests have been established.
13. The package builds successfully.
14. The package can be consumed independently of the development toolchain.
15. All required documentation exists.
16. Agent instructions are complete.
17. All architectural decisions are recorded.
18. All milestones and technical debt are documented.
19. GitHub CI passes.
20. A reproducible Arch Linux development environment is available through Nix Flakes.

---

# 28. Initial instructions to the implementing agent

This specification is the project-level implementation authority.

Do not begin by generating hundreds of resource classes.

First establish the development environment and perform a comprehensive investigation of the Sage API.

The first implementation deliverable must be M001, followed by M002.

Before implementing authentication or any domain resource, establish the actual API contract and document the findings.

Maintain a distinction between verified facts, assumptions and unresolved questions.

Do not invent API behaviour to make an abstraction appear complete.

Prioritise a coherent, maintainable architecture over premature implementation breadth.

The final objective is a professional, reusable, fully documented TypeScript SDK that can serve as a reliable integration foundation for larger business applications.

**End of Project Specification.**
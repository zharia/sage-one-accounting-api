/**
 * Public entry point for `@bytemoney/sage-one`.
 *
 * Exports the primary `SageOneClient`, domain services, wire schemas and types,
 * authentication interfaces, error hierarchy, OData query builder, pagination
 * iterators, decimal conversion utilities, and branded domain identifiers.
 */

export const SAGE_API_VERSION = "2.0.0" as const;

export const SAGE_API_DOCUMENTATION_URL =
  "https://accounting.sageone.co.za/api/2.0.0/help" as const;

export * from "./auth/index.js";
export * from "./client/index.js";
export * from "./common/index.js";
export * from "./config/index.js";
export * from "./domains/accounting/index.js";
export * from "./domains/administration/index.js";
export * from "./domains/company/index.js";
export * from "./domains/customers/index.js";
export * from "./domains/executor.js";
export * from "./domains/inventory/index.js";
export * from "./domains/suppliers/index.js";
export * from "./domains/taxation/index.js";
export * from "./errors/index.js";
export * from "./logging/index.js";
export * from "./transport/index.js";
export * from "./types/index.js";
export * from "./validation/index.js";

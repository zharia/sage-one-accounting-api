/**
 * Public entry point for `@bytemoney/sage-one`.
 *
 * M001 foundation: only contract metadata is exported. Core client,
 * domain services and error hierarchy arrive in M003 (see milestones/).
 */

/** Sage One Accounting API version targeted by this SDK. */
export const SAGE_API_VERSION = "2.0.0" as const;

/** Documentation source for the API contract. */
export const SAGE_API_DOCUMENTATION_URL =
  "https://accounting.sageone.co.za/api/2.0.0/help" as const;

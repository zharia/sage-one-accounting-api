# Type reference

Canonical exports from `src/index.ts`.

## Domain Type Groups

| Group | Exported Types & Utilities | Defined in |
|---|---|---|
| Branded Identifiers | `SageId`, `CompanyId`, `AccountId`, `AccountCategoryId`, `AccountNoteId`, `AccountOpeningBalanceId`, `BudgetId`, `CompanyEntityTypeId`, `CompanyNoteId`, `CustomerId`, `CustomerCategoryId`, `CustomerNoteId`, `CustomerOpeningBalanceId`, `SupplierId`, `SupplierCategoryId`, `SupplierNoteId`, `SupplierOpeningBalanceId`, `TaxTypeId`, `ItemId`, `ItemCategoryId`, `ItemNoteId`, `ItemOpeningBalanceId`, `InvoiceId`, `SageGuid` + `to*Id()` constructors | `src/common/index.ts` |
| Branded Dates | `ISODateString`, `ISODateTimeString`, `toISODateString`, `toISODateTimeString` | `src/common/index.ts` |
| Money & Decimals | `WireMoney`, `FixedDecimal`, `toDecimal`, `fromDecimal` | `src/common/index.ts` (ADR-012) |
| Paging & OData | `SagePage<T>`, `ODataQueryBuilder<T>`, `ODataQueryParams`, `odata`, `paginatePages`, `paginateItems`, `PaginationOptions`, `PageIterationEnvelope<T>` | `src/types/index.ts` |
| Accounting Models | `Account`, `AccountSaveRequest`, `AccountCategory`, `AccountBalance`, `BudgetAccountBalance`, `BudgetItemPeriod`, `DateRangeRequest`, `AccountOpeningBalance`, `AccountOpeningBalanceSaveRequest`, `AccountNote`, `AccountNoteSaveRequest` | `src/domains/accounting/index.ts` |
| Company Models | `Company`, `CompanyLogo`, `CompanyEntityType`, `CompanyNote`, `CompanyNoteSaveRequest` | `src/domains/company/index.ts` |
| Customer Models | `Customer`, `CustomerSaveRequest`, `CustomerCategory`, `CustomerCategorySaveRequest`, `CustomerOpeningBalance`, `CustomerOpeningBalanceSaveRequest`, `CustomerStatement`, `CustomerStatementLine`, `CustomerStatementRequest`, `CustomerNote`, `CustomerNoteSaveRequest` | `src/domains/customers/index.ts` |
| Supplier Models | `Supplier`, `SupplierSaveRequest`, `SupplierCategory`, `SupplierCategorySaveRequest`, `SupplierOpeningBalance`, `SupplierOpeningBalanceSaveRequest`, `SupplierStatement`, `SupplierStatementLine`, `SupplierStatementRequest`, `SupplierNote`, `SupplierNoteSaveRequest` | `src/domains/suppliers/index.ts` |
| Taxation Models | `TaxType`, `TaxTypeSaveRequest` | `src/domains/taxation/index.ts` |
| Inventory Models | `Item`, `ItemSaveRequest`, `ItemCategory`, `ItemCategorySaveRequest`, `ItemOpeningBalance`, `ItemOpeningBalanceSaveRequest`, `ItemNote`, `ItemNoteSaveRequest`, `ItemReportGroupRef`, `AdditionalItemPriceRef`, `AttachmentRef` | `src/domains/inventory/index.ts` |
| Administration | `AuthenticationCredentials` | `src/domains/administration/index.ts` |
| Client & Config | `SageOneClient`, `SageOneClientConfig`, `SageOneConfigInput`, `ResolvedSageOneConfig`, `resolveConfig` | `src/client/index.ts`, `src/config/index.ts` |
| Auth & Logging | `SageAuthenticator`, `BasicAndApiKeyAuthenticator`, `AuthenticationContext`, `AuthenticationResult`, `SageLogger`, `LogLevel`, `RedactingLogger`, `createPinoLogger` | `src/auth/index.ts`, `src/logging/index.ts` |
| Errors | `SageError`, `SageConfigurationError`, `SageAuthenticationError`, `SageAuthorizationError`, `SageValidationError`, `SageApiError`, `SageNotFoundError`, `SageConflictError`, `SageRateLimitError`, `SageNetworkError`, `SageTimeoutError`, `SageResponseError` | `src/errors/index.ts` |

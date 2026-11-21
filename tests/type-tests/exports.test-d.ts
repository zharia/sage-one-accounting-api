import { describe, expectTypeOf, it } from "vitest";

import {
  type Account,
  type AccountId,
  type Company,
  type CompanyId,
  type Customer,
  type CustomerId,
  type FixedDecimal,
  type ISODateString,
  type ISODateTimeString,
  type Item,
  type ItemId,
  odata,
  SAGE_API_DOCUMENTATION_URL,
  SAGE_API_VERSION,
  type SageApiError,
  type SageError,
  type SageId,
  SageOneClient,
  type SagePage,
  type Supplier,
  type SupplierId,
  type TaxType,
  type TaxTypeId,
  toAccountId,
  toCompanyId,
  toCustomerId,
  toISODateString,
  toSupplierId,
  toTaxTypeId,
} from "../../src/index.js";

describe("public export surface & type safety (spec §17.4)", () => {
  it("exports API version as a literal and documentation URL as a string", () => {
    expectTypeOf(SAGE_API_VERSION).toEqualTypeOf<"2.0.0">();
    expectTypeOf(SAGE_API_DOCUMENTATION_URL).toMatchTypeOf<string>();
    expectTypeOf(SAGE_API_DOCUMENTATION_URL).toBeString();
  });

  it("keeps branded domain identifiers distinct at compile time", () => {
    const accountId = toAccountId(1);
    const customerId = toCustomerId(1);
    const supplierId = toSupplierId(1);
    const companyId = toCompanyId(1);
    const taxTypeId = toTaxTypeId(1);
    const isoDate = toISODateString("2026-11-21");

    expectTypeOf(accountId).toEqualTypeOf<AccountId>();
    expectTypeOf(customerId).toEqualTypeOf<CustomerId>();
    expectTypeOf(supplierId).toEqualTypeOf<SupplierId>();
    expectTypeOf(companyId).toEqualTypeOf<CompanyId>();
    expectTypeOf(taxTypeId).toEqualTypeOf<TaxTypeId>();
    expectTypeOf(isoDate).toEqualTypeOf<ISODateString>();

    expectTypeOf<AccountId>().not.toEqualTypeOf<CustomerId>();
    expectTypeOf<CustomerId>().not.toEqualTypeOf<SupplierId>();
    expectTypeOf<CompanyId>().not.toEqualTypeOf<TaxTypeId>();
    expectTypeOf<AccountId>().not.toEqualTypeOf<ItemId>();
    expectTypeOf<ISODateString>().not.toEqualTypeOf<ISODateTimeString>();
    expectTypeOf<SageId>().not.toEqualTypeOf<number>();
  });

  it("exposes strongly typed domain services on SageOneClient with zero any leakage", () => {
    const client = new SageOneClient();

    expectTypeOf(client.accounts.list).returns.resolves.toEqualTypeOf<SagePage<Account>>();
    expectTypeOf(client.accounts.get).returns.resolves.toEqualTypeOf<Account>();
    expectTypeOf(client.company.current).returns.resolves.toEqualTypeOf<Company>();
    expectTypeOf(client.customers.list).returns.resolves.toEqualTypeOf<SagePage<Customer>>();
    expectTypeOf(client.suppliers.list).returns.resolves.toEqualTypeOf<SagePage<Supplier>>();
    expectTypeOf(client.taxTypes.list).returns.resolves.toEqualTypeOf<SagePage<TaxType>>();
    expectTypeOf(client.items.list).returns.resolves.toEqualTypeOf<SagePage<Item>>();

    const query = odata<Customer>().filter("Active", "eq", true).orderBy("Name", "asc");
    expectTypeOf(query.build()).toBeString();

    expectTypeOf<SageApiError>().toMatchTypeOf<SageError>();
    expectTypeOf<FixedDecimal>().toHaveProperty("add");
  });
});

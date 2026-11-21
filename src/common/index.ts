/**
 * Shared branded domain primitives, monetary/decimal utilities, and date parsers (spec §7, ADR-004, ADR-012).
 *
 * This module has zero dependencies on higher layers.
 */

export type Brand<T, B extends string> = T & { readonly __brand: B };

export type SageId = Brand<number, "SageId">;
export type CompanyId = Brand<number, "CompanyId">;
export type AccountId = Brand<number, "AccountId">;
export type AccountCategoryId = Brand<number, "AccountCategoryId">;
export type AccountNoteId = Brand<number, "AccountNoteId">;
export type AccountOpeningBalanceId = Brand<number, "AccountOpeningBalanceId">;
export type BudgetId = Brand<number, "BudgetId">;
export type CompanyEntityTypeId = Brand<number, "CompanyEntityTypeId">;
export type CompanyNoteId = Brand<number, "CompanyNoteId">;
export type CustomerId = Brand<number, "CustomerId">;
export type CustomerCategoryId = Brand<number, "CustomerCategoryId">;
export type CustomerNoteId = Brand<number, "CustomerNoteId">;
export type CustomerOpeningBalanceId = Brand<number, "CustomerOpeningBalanceId">;
export type SupplierId = Brand<number, "SupplierId">;
export type SupplierCategoryId = Brand<number, "SupplierCategoryId">;
export type SupplierNoteId = Brand<number, "SupplierNoteId">;
export type SupplierOpeningBalanceId = Brand<number, "SupplierOpeningBalanceId">;
export type TaxTypeId = Brand<number, "TaxTypeId">;
export type ItemId = Brand<number, "ItemId">;
export type ItemCategoryId = Brand<number, "ItemCategoryId">;
export type ItemNoteId = Brand<number, "ItemNoteId">;
export type ItemOpeningBalanceId = Brand<number, "ItemOpeningBalanceId">;
export type SalesRepresentativeId = Brand<number, "SalesRepresentativeId">;
export type AdditionalPriceListId = Brand<number, "AdditionalPriceListId">;
export type AdditionalItemPriceId = Brand<number, "AdditionalItemPriceId">;
export type ItemReportGroupId = Brand<number, "ItemReportGroupId">;
export type InvoiceId = Brand<number, "InvoiceId">;
export type SageGuid = Brand<string, "SageGuid">;

export type ISODateString = Brand<string, "ISODateString">;
export type ISODateTimeString = Brand<string, "ISODateTimeString">;

/**
 * Exact wire monetary value as transmitted by Sage One (`number`).
 * Never silently rounded or mutated.
 */
export type WireMoney = number;

function assertSafeIntegerId(value: number, label: string): void {
  if (!Number.isInteger(value) || !Number.isSafeInteger(value)) {
    throw new RangeError(`Invalid ${label}: expected safe integer, received ${String(value)}`);
  }
}

export function toSageId(value: number): SageId {
  assertSafeIntegerId(value, "SageId");
  return value as SageId;
}

export function toCompanyId(value: number): CompanyId {
  assertSafeIntegerId(value, "CompanyId");
  return value as CompanyId;
}

export function toAccountId(value: number): AccountId {
  assertSafeIntegerId(value, "AccountId");
  return value as AccountId;
}

export function toAccountCategoryId(value: number): AccountCategoryId {
  assertSafeIntegerId(value, "AccountCategoryId");
  return value as AccountCategoryId;
}

export function toAccountNoteId(value: number): AccountNoteId {
  assertSafeIntegerId(value, "AccountNoteId");
  return value as AccountNoteId;
}

export function toAccountOpeningBalanceId(value: number): AccountOpeningBalanceId {
  assertSafeIntegerId(value, "AccountOpeningBalanceId");
  return value as AccountOpeningBalanceId;
}

export function toBudgetId(value: number): BudgetId {
  assertSafeIntegerId(value, "BudgetId");
  return value as BudgetId;
}

export function toCompanyEntityTypeId(value: number): CompanyEntityTypeId {
  assertSafeIntegerId(value, "CompanyEntityTypeId");
  return value as CompanyEntityTypeId;
}

export function toCompanyNoteId(value: number): CompanyNoteId {
  assertSafeIntegerId(value, "CompanyNoteId");
  return value as CompanyNoteId;
}

export function toCustomerId(value: number): CustomerId {
  assertSafeIntegerId(value, "CustomerId");
  return value as CustomerId;
}

export function toCustomerCategoryId(value: number): CustomerCategoryId {
  assertSafeIntegerId(value, "CustomerCategoryId");
  return value as CustomerCategoryId;
}

export function toCustomerNoteId(value: number): CustomerNoteId {
  assertSafeIntegerId(value, "CustomerNoteId");
  return value as CustomerNoteId;
}

export function toCustomerOpeningBalanceId(value: number): CustomerOpeningBalanceId {
  assertSafeIntegerId(value, "CustomerOpeningBalanceId");
  return value as CustomerOpeningBalanceId;
}

export function toSupplierId(value: number): SupplierId {
  assertSafeIntegerId(value, "SupplierId");
  return value as SupplierId;
}

export function toSupplierCategoryId(value: number): SupplierCategoryId {
  assertSafeIntegerId(value, "SupplierCategoryId");
  return value as SupplierCategoryId;
}

export function toSupplierNoteId(value: number): SupplierNoteId {
  assertSafeIntegerId(value, "SupplierNoteId");
  return value as SupplierNoteId;
}

export function toSupplierOpeningBalanceId(value: number): SupplierOpeningBalanceId {
  assertSafeIntegerId(value, "SupplierOpeningBalanceId");
  return value as SupplierOpeningBalanceId;
}

export function toTaxTypeId(value: number): TaxTypeId {
  assertSafeIntegerId(value, "TaxTypeId");
  return value as TaxTypeId;
}

export function toItemId(value: number): ItemId {
  assertSafeIntegerId(value, "ItemId");
  return value as ItemId;
}

export function toItemCategoryId(value: number): ItemCategoryId {
  assertSafeIntegerId(value, "ItemCategoryId");
  return value as ItemCategoryId;
}

export function toItemNoteId(value: number): ItemNoteId {
  assertSafeIntegerId(value, "ItemNoteId");
  return value as ItemNoteId;
}

export function toItemOpeningBalanceId(value: number): ItemOpeningBalanceId {
  assertSafeIntegerId(value, "ItemOpeningBalanceId");
  return value as ItemOpeningBalanceId;
}

export function toInvoiceId(value: number): InvoiceId {
  assertSafeIntegerId(value, "InvoiceId");
  return value as InvoiceId;
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function toSageGuid(value: string): SageGuid {
  if (!UUID_REGEX.test(value)) {
    throw new RangeError(`Invalid SageGuid: expected UUID format, received "${value}"`);
  }
  return value as SageGuid;
}

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const ISO_DATETIME_REGEX =
  /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?)?$/;

export function toISODateString(value: string): ISODateString {
  if (!ISO_DATE_REGEX.test(value)) {
    throw new RangeError(`Invalid ISODateString: expected YYYY-MM-DD, received "${value}"`);
  }
  return value as ISODateString;
}

export function toISODateTimeString(value: string): ISODateTimeString {
  if (!ISO_DATETIME_REGEX.test(value)) {
    throw new RangeError(`Invalid ISODateTimeString: received "${value}"`);
  }
  return value as ISODateTimeString;
}

/**
 * Exact base-10 arbitrary-precision decimal representation (`unscaled * 10^-scale`)
 * for financial calculations (spec §7.2, §25, ADR-012).
 *
 * Avoids binary floating-point drift while preserving wire values verbatim until
 * explicit conversion is requested.
 */
export class FixedDecimal {
  public readonly unscaled: bigint;
  public readonly scale: number;

  public constructor(unscaled: bigint, scale: number) {
    if (!Number.isInteger(scale) || scale < 0) {
      throw new RangeError(`Invalid decimal scale: ${String(scale)}`);
    }
    this.unscaled = unscaled;
    this.scale = scale;
  }

  public static fromString(input: string): FixedDecimal {
    const trimmed = input.trim();
    const match = /^([+-])?(\d+)(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/.exec(trimmed);
    if (!match) {
      throw new RangeError(`Invalid decimal string: "${input}"`);
    }
    const sign = match[1] === "-" ? -1n : 1n;
    const intPart = match[2] ?? "0";
    const fracPart = match[3] ?? "";
    const exp = match[4] ? Number.parseInt(match[4], 10) : 0;

    let digits = `${intPart}${fracPart}`;
    let scale = fracPart.length - exp;
    if (scale < 0) {
      digits = `${digits}${"0".repeat(-scale)}`;
      scale = 0;
    }
    const unscaled = BigInt(digits) * sign;
    return new FixedDecimal(unscaled, scale).normalize();
  }

  public static fromNumber(value: number): FixedDecimal {
    if (!Number.isFinite(value)) {
      throw new RangeError(`Cannot convert non-finite number to FixedDecimal: ${String(value)}`);
    }
    return FixedDecimal.fromString(value.toString());
  }

  public normalize(): FixedDecimal {
    if (this.unscaled === 0n) {
      return new FixedDecimal(0n, 0);
    }
    let u = this.unscaled;
    let s = this.scale;
    while (s > 0 && u % 10n === 0n) {
      u /= 10n;
      s -= 1;
    }
    return new FixedDecimal(u, s);
  }

  private align(other: FixedDecimal): { a: bigint; b: bigint; scale: number } {
    const targetScale = Math.max(this.scale, other.scale);
    const aFactor = 10n ** BigInt(targetScale - this.scale);
    const bFactor = 10n ** BigInt(targetScale - other.scale);
    return {
      a: this.unscaled * aFactor,
      b: other.unscaled * bFactor,
      scale: targetScale,
    };
  }

  public add(other: FixedDecimal): FixedDecimal {
    const { a, b, scale } = this.align(other);
    return new FixedDecimal(a + b, scale).normalize();
  }

  public subtract(other: FixedDecimal): FixedDecimal {
    const { a, b, scale } = this.align(other);
    return new FixedDecimal(a - b, scale).normalize();
  }

  public multiply(other: FixedDecimal): FixedDecimal {
    return new FixedDecimal(this.unscaled * other.unscaled, this.scale + other.scale).normalize();
  }

  public equals(other: FixedDecimal): boolean {
    const { a, b } = this.align(other);
    return a === b;
  }

  public toNumber(): number {
    return Number(this.toString());
  }

  public toFixed(fractionDigits: number): string {
    if (!Number.isInteger(fractionDigits) || fractionDigits < 0) {
      throw new RangeError(`Invalid fractionDigits: ${String(fractionDigits)}`);
    }
    const isNeg = this.unscaled < 0n;
    const abs = isNeg ? -this.unscaled : this.unscaled;
    let scaled: bigint;
    if (fractionDigits >= this.scale) {
      scaled = abs * 10n ** BigInt(fractionDigits - this.scale);
    } else {
      const diff = BigInt(this.scale - fractionDigits);
      const divisor = 10n ** diff;
      const half = divisor / 2n;
      const remainder = abs % divisor;
      scaled = abs / divisor + (remainder >= half ? 1n : 0n);
    }
    const str = scaled.toString().padStart(fractionDigits + 1, "0");
    const prefix = isNeg && scaled !== 0n ? "-" : "";
    if (fractionDigits === 0) {
      return `${prefix}${str}`;
    }
    const intPart = str.slice(0, str.length - fractionDigits);
    const fracPart = str.slice(str.length - fractionDigits);
    return `${prefix}${intPart}.${fracPart}`;
  }

  public toString(): string {
    const isNeg = this.unscaled < 0n;
    const abs = isNeg ? -this.unscaled : this.unscaled;
    const prefix = isNeg ? "-" : "";
    if (this.scale === 0) {
      return `${prefix}${abs.toString()}`;
    }
    const str = abs.toString().padStart(this.scale + 1, "0");
    const intPart = str.slice(0, str.length - this.scale);
    const fracPart = str.slice(str.length - this.scale);
    return `${prefix}${intPart}.${fracPart}`;
  }
}

export function toDecimal(value: WireMoney | string): FixedDecimal {
  return typeof value === "number"
    ? FixedDecimal.fromNumber(value)
    : FixedDecimal.fromString(value);
}

export function fromDecimal(decimal: FixedDecimal): WireMoney {
  return decimal.toNumber();
}

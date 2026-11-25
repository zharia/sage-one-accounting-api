# OData support

Sage documents OData query support on collection endpoints (spec §11.1).

## Planned builder (M003, ADR-010)

```typescript
const query = odata<Customer>()
  .filter("Active", "eq", true)
  .orderBy("Name", "asc")
  .top(50)
  .build();
```

- Options: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$expand`, `$count`
- Typed field references where practical; raw expression escape hatch always available
- Correct URL encoding centralized and property-tested (fast-check)

## Per-endpoint compatibility

**Per-endpoint compatibility recorded at discovery (M002).** The builder's existence does not imply every endpoint accepts every option. Support claims come from `contracts/sage-api/endpoint-catalogue.json` (`odataSupport` per endpoint); `$expand` and `$count` remain unconfirmed across services — see [known-limitations.md](./known-limitations.md).

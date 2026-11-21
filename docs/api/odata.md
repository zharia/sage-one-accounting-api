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

**Pending M002.** The builder's existence does not imply every endpoint accepts every option. Support claims are recorded per endpoint in the coverage matrix only after documentation or live verification. `$expand` and `$count` in particular are unconfirmed across services.

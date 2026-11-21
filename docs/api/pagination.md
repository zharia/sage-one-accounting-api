# Pagination

## Documented envelope (spec §11.2)

```typescript
interface SagePage<T> {
  TotalResults: number;
  ReturnedResults: number;
  Results: T[];
}
```

## SDK support (planned, M003+)

- Single-page retrieval: `list()` returns one page — default, no hidden round-trips.
- Async iteration: opt-in `iterate()`/`pages()` with `maxPages`, `maxItems`, `AbortSignal`, page metadata.
- Infinite-pagination protection: hard limits required on every iterator.
- Progression (page N → N+1) property-tested.

## Per-endpoint behaviour

**Pending M002.** Not all Sage endpoints use the same mechanism (spec §11.2); some may use OData `$skip`/`$top`, others a documented paging parameter, others none. Each endpoint's behaviour is recorded here and in the coverage matrix once discovered — until then, no iterator is claimed for any endpoint.

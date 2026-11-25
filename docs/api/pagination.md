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

**Per-endpoint behaviour recorded at discovery (M002).** Not all Sage endpoints use the same mechanism (spec §11.2): some use OData `$skip`/`$top`, others a documented paging parameter, others none. Each endpoint's behaviour is recorded in `contracts/sage-api/endpoint-catalogue.json` (`pagingBehaviour`, `odataSupport`) and surfaced in the coverage matrix.

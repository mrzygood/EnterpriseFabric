/** One page of a cursor-paginated collection, as returned by the API layer. */
export interface CursorPage<T> {
  readonly items: readonly T[];
  /** Opaque cursor for the next page, or `null` when the collection is exhausted. */
  readonly nextCursor: string | null;
}

export interface CursorQuery {
  readonly cursor?: string | null;
  readonly pageSize?: number;
}

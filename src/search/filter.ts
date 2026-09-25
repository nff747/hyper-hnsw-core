import { Vector, VectorId, SearchResult } from '../types/index.js';
import { HyperHNSW } from '../core/hnsw.js';

export type NodePredicate = (id: VectorId) => boolean;

export function searchFiltered(
  index: HyperHNSW,
  query: Vector,
  k: number,
  filter: NodePredicate,
  efSearch?: number
): SearchResult[] {
  return index.search(query, k, { efSearch, filter });
}

import { describe, it, expect } from 'vitest';
import { HybridReranker } from '../src/search/hybrid-reranker';

describe('HybridReranker', () => {
  it('sorts candidates by exact distance metric and truncates to topK', () => {
    const candidates = [1, 2, 3];
    const distances: Record<number, number> = { 1: 5.0, 2: 1.0, 3: 3.0 };
    const ranked = HybridReranker.rerank(candidates, id => distances[id], 2);
    expect(ranked).toEqual([2, 3]);
  });
});

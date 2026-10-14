import { describe, it, expect } from 'vitest';
import { BeamSearchTraverser } from '../src/search/beam-search';

describe('BeamSearchTraverser', () => {
  it('reaches closest neighbor along beam path', () => {
    const graph: Record<number, number[]> = {
      0: [1, 2],
      1: [3],
      2: [4],
      3: [],
      4: []
    };
    const distances: Record<number, number> = { 0: 10, 1: 5, 2: 8, 3: 1, 4: 9 };

    const res = BeamSearchTraverser.searchLayer(
      0,
      1,
      (n) => graph[n] || [],
      (n) => distances[n]
    );
    expect(res).toContain(3);
  });
});

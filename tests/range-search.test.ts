import { describe, it, expect } from 'vitest';
import { EpsilonRangeSearcher } from '../src/core/range-search';

describe('EpsilonRangeSearcher', () => {
  it('filters neighbors within epsilon sphere radius', () => {
    const query = new Float32Array([0, 0]);
    const nodes = [
      { id: 1, vec: new Float32Array([1, 0]) }, // dist 1
      { id: 2, vec: new Float32Array([2, 0]) }, // dist 2
      { id: 3, vec: new Float32Array([5, 0]) }, // dist 5
    ];
    const within = EpsilonRangeSearcher.search(query, nodes, 2.5);
    expect(within).toEqual([1, 2]);
  });
});

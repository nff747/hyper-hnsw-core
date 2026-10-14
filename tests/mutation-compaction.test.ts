import { describe, it, expect } from 'vitest';
import { GraphCompactor } from '../src/mutation/compaction';

describe('GraphCompactor', () => {
  it('purges tombstones and cleans up dangling neighbor references', () => {
    const adj = new Map<number, number[]>();
    adj.set(1, [2, 3]);
    adj.set(2, [1, 3]);
    adj.set(3, [1, 2]);

    const tombstones = new Set([3]);
    const compacted = GraphCompactor.compactAdjacency(adj, tombstones);

    expect(compacted.has(3)).toBe(false);
    expect(compacted.get(1)).toEqual([2]);
    expect(compacted.get(2)).toEqual([1]);
  });
});

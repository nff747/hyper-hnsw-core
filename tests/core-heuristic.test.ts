import { describe, it, expect } from 'vitest';
import { selectNeighborsSimple, selectNeighborsDiverse } from '../src/core/heuristic.js';
import { HyperHNSW } from '../src/core/hnsw.js';
import { HNSWNode } from '../src/graph/node.js';

describe('Neighbor Selection Heuristics', () => {
  it('selectNeighborsSimple takes top M closest', () => {
    const candidates = [
      { id: 1, distance: 0.1 },
      { id: 2, distance: 0.5 },
      { id: 3, distance: 0.2 },
      { id: 4, distance: 0.05 },
    ];
    const top2 = selectNeighborsSimple(candidates, 2);
    expect(top2.map(t => t.id)).toEqual([4, 1]);
  });

  it('selectNeighborsDiverse preserves diversity across clusters', () => {
    const index = new HyperHNSW({ dimensions: 2 });
    const n1 = new HNSWNode(1, new Float32Array([1.0, 0.0]), 0);
    const n2 = new HNSWNode(2, new Float32Array([1.01, 0.0]), 0); // Very close to n1
    const n3 = new HNSWNode(3, new Float32Array([0.0, 1.0]), 0); // Orthogonal direction

    index.nodes.set(1, n1);
    index.nodes.set(2, n2);
    index.nodes.set(3, n3);

    const query = new Float32Array([0, 0]);
    const candidates = [
      { id: 1, distance: 1.0 },
      { id: 2, distance: 1.01 },
      { id: 3, distance: 1.0 },
    ];

    const diverse = selectNeighborsDiverse(index, query, candidates, 2);
    expect(diverse.length).toBe(2);
    // Should choose n1 and n3 for directional coverage rather than n1 and n2
    const ids = diverse.map(d => d.id);
    expect(ids).toContain(1);
    expect(ids).toContain(3);
  });
});

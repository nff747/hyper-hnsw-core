import { describe, it, expect } from 'vitest';
import { HyperHNSW } from '../src/core/hnsw.js';
import { searchLayerGreedy } from '../src/core/search.js';
import { HNSWNode } from '../src/graph/node.js';

describe('SearchLayerGreedy', () => {
  it('converges greedily to the nearest neighbor on a given layer', () => {
    const index = new HyperHNSW({ dimensions: 2 });
    const n1 = new HNSWNode(1, new Float32Array([10, 10]), 1);
    const n2 = new HNSWNode(2, new Float32Array([5, 5]), 1);
    const n3 = new HNSWNode(3, new Float32Array([1, 1]), 1);

    // Link: 1 -> 2 -> 3
    n1.addNeighbor(1, 2);
    n2.addNeighbor(1, 3);

    index.nodes.set(1, n1);
    index.nodes.set(2, n2);
    index.nodes.set(3, n3);

    const query = new Float32Array([0, 0]);
    const bestId = searchLayerGreedy(index, query, 1, 1);
    expect(bestId).toBe(3);
  });
});

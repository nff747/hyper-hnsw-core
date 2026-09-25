import { describe, it, expect } from 'vitest';
import { HNSWNode } from '../src/graph/node.js';

describe('HNSWNode', () => {
  it('initializes correct number of neighbor layers', () => {
    const vec = new Float32Array([1, 2, 3]);
    const node = new HNSWNode(42, vec, 3);
    expect(node.id).toBe(42);
    expect(node.level).toBe(3);
    expect(node.neighbors.length).toBe(4); // 0, 1, 2, 3
  });

  it('adds and retrieves neighbors without duplicates', () => {
    const node = new HNSWNode(1, new Float32Array(2), 1);
    node.addNeighbor(0, 10);
    node.addNeighbor(0, 20);
    node.addNeighbor(0, 10); // Duplicate
    expect(node.getNeighbors(0)).toEqual([10, 20]);
  });
});

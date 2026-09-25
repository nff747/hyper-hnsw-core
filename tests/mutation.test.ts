import { describe, it, expect } from 'vitest';
import { HyperHNSW } from '../src/core/hnsw.js';
import { generateBatch } from '../src/utils/random.js';

describe('Graph Mutations & Soft Deletes', () => {
  it('excludes deleted vectors from subsequent searches', () => {
    const dim = 4;
    const index = new HyperHNSW({ dimensions: dim });
    const vecs = generateBatch(10, dim);

    for (let i = 0; i < vecs.length; i++) {
      index.insert(i, vecs[i]);
    }

    const before = index.search(vecs[3], 1);
    expect(before[0].id).toBe(3);

    const deleted = index.delete(3);
    expect(deleted).toBe(true);

    const after = index.search(vecs[3], 1);
    expect(after[0].id).not.toBe(3);
  });
});

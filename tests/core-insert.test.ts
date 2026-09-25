import { describe, it, expect } from 'vitest';
import { HyperHNSW } from '../src/core/hnsw.js';
import { generateBatch } from '../src/utils/random.js';

describe('HyperHNSW Integration Core', () => {
  it('inserts vectors and retrieves exact nearest neighbors', () => {
    const dim = 16;
    const index = new HyperHNSW({ dimensions: dim, M: 8, efConstruction: 32 });
    const vectors = generateBatch(50, dim);

    for (let i = 0; i < vectors.length; i++) {
      index.insert(i, vectors[i]);
    }

    expect(index.count).toBe(50);

    // Query for identical target should return itself with distance 0
    const results = index.search(vectors[12], 5);
    expect(results.length).toBe(5);
    expect(results[0].id).toBe(12);
    expect(results[0].distance).toBeCloseTo(0.0);
  });
});

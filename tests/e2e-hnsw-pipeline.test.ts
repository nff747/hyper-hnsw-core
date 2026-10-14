import { describe, it, expect } from 'vitest';
import { HyperHNSW } from '../src/core/hnsw';
import { VectorNormalizer } from '../src/core/vector-normalizer';

describe('HNSW End-to-End Pipeline', () => {
  it('builds index with normalized vectors and performs approximate search', () => {
    const index = new HyperHNSW({ dimensions: 4, M: 4, efConstruction: 16 });
    const v1 = VectorNormalizer.normalize(new Float32Array([1, 0, 0, 0]));
    const v2 = VectorNormalizer.normalize(new Float32Array([0, 1, 0, 0]));

    index.insert(1, v1);
    index.insert(2, v2);

    const query = VectorNormalizer.normalize(new Float32Array([0.9, 0.1, 0, 0]));
    const results = index.search(query, 1);
    expect(results.length).toBe(1);
    expect(results[0].id).toBe(1);
  });
});

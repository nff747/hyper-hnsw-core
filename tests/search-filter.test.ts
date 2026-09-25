import { describe, it, expect } from 'vitest';
import { HyperHNSW } from '../src/core/hnsw.js';
import { searchFiltered } from '../src/search/filter.js';
import { generateBatch } from '../src/utils/random.js';

describe('Filtered Search', () => {
  it('strictly returns candidates matching predicate', () => {
    const dim = 8;
    const index = new HyperHNSW({ dimensions: dim, M: 8 });
    const vecs = generateBatch(20, dim);

    for (let i = 0; i < vecs.length; i++) {
      index.insert(i, vecs[i]);
    }

    // Filter only even IDs
    const evenResults = searchFiltered(index, vecs[0], 5, id => id % 2 === 0);
    expect(evenResults.length).toBeGreaterThan(0);
    for (const r of evenResults) {
      expect(r.id % 2).toBe(0);
    }
  });
});

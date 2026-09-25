import { describe, it, expect } from 'vitest';
import { HyperHNSW } from '../src/core/hnsw.js';
import { serializeToBuffer, deserializeFromBuffer } from '../src/storage/binary-serializer.js';
import { generateBatch } from '../src/utils/random.js';

describe('Binary Serialization', () => {
  it('roundtrips index and preserves query results exactly', () => {
    const dim = 16;
    const index = new HyperHNSW({ dimensions: dim, M: 8 });
    const vecs = generateBatch(30, dim);

    for (let i = 0; i < vecs.length; i++) {
      index.insert(i, vecs[i]);
    }

    const query = vecs[5];
    const originalResults = index.search(query, 5);

    const buffer = serializeToBuffer(index);
    expect(buffer.length).toBeGreaterThan(0);

    const restored = deserializeFromBuffer(buffer);
    expect(restored.count).toBe(30);
    expect(restored.dimensions).toBe(dim);

    const restoredResults = restored.search(query, 5);
    expect(restoredResults.map(r => r.id)).toEqual(originalResults.map(r => r.id));
  });
});

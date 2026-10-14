import { describe, it, expect } from 'vitest';
import { HNSW_MAGIC, MmapFormatHeader } from '../src/storage/mmap-format';

describe('MmapFormatHeader', () => {
  it('serializes and validates metadata header bytes', () => {
    const meta = { magic: HNSW_MAGIC, dim: 128, metric: 1, maxElements: 10000, numLayers: 4 };
    const bytes = MmapFormatHeader.serialize(meta);
    const decoded = MmapFormatHeader.deserialize(bytes);
    expect(decoded).toEqual(meta);
  });
});

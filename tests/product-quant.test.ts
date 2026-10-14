import { describe, it, expect } from 'vitest';
import { ProductQuantizer } from '../src/quant/product-quant';

describe('ProductQuantizer', () => {
  it('partitions 8-dim vector into 4 subvectors', () => {
    const pq = new ProductQuantizer(8, 4);
    const v = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8]);
    const codes = pq.encodeSubvectors(v);
    expect(codes.length).toBe(4);
  });
});

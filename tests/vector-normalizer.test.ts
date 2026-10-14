import { describe, it, expect } from 'vitest';
import { VectorNormalizer } from '../src/core/vector-normalizer';

describe('VectorNormalizer', () => {
  it('normalizes vector magnitude to 1.0', () => {
    const vec = new Float32Array([3, 4]); // length 5
    const norm = VectorNormalizer.normalize(vec);
    expect(norm[0]).toBeCloseTo(0.6);
    expect(norm[1]).toBeCloseTo(0.8);
  });
});

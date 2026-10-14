import { describe, it, expect } from 'vitest';
import { FastMath } from '../src/utils/fast-math';

describe('FastMath', () => {
  it('computes accurate vector inner product', () => {
    const a = new Float32Array([1, 2, 3]);
    const b = new Float32Array([4, 5, 6]);
    expect(FastMath.dot(a, b)).toBe(32);
  });
});

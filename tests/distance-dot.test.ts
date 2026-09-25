import { describe, it, expect } from 'vitest';
import { dotProduct, negativeDotProduct } from '../src/distance/dot.js';

describe('Dot Product Distance Engine', () => {
  it('computes correct inner product', () => {
    const a = new Float32Array([1, 2, 3]);
    const b = new Float32Array([4, -5, 6]);
    // 4 - 10 + 18 = 12
    expect(dotProduct(a, b)).toBe(12);
  });

  it('converts inner product to negative distance for minimization', () => {
    const a = new Float32Array([0.5, 0.5]);
    const b = new Float32Array([0.5, 0.5]);
    expect(negativeDotProduct(a, b)).toBe(-0.5);
  });
});

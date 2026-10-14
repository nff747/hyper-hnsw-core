import { describe, it, expect } from 'vitest';
import { ChebyshevDistance } from '../src/distance/chebyshev';

describe('ChebyshevDistance', () => {
  it('returns maximum coordinate absolute difference', () => {
    const a = [1, 5, 2];
    const b = [4, 2, 9]; // diffs: 3, 3, 7
    expect(ChebyshevDistance.compute(a, b)).toBe(7);
  });
});

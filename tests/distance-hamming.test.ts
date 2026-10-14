import { describe, it, expect } from 'vitest';
import { HammingDistance } from '../src/distance/hamming';

describe('HammingDistance', () => {
  it('computes exact bitwise differences', () => {
    const a = new Uint32Array([0b1011, 0b0000]);
    const b = new Uint32Array([0b1000, 0b0001]); // 2 bit diff in word 0, 1 bit diff in word 1
    expect(HammingDistance.compute(a, b)).toBe(3);
  });
});

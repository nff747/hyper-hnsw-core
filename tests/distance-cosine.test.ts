import { describe, it, expect } from 'vitest';
import { cosineDistance } from '../src/distance/cosine.js';

describe('Cosine Distance Engine', () => {
  it('returns 0 for identical non-zero vectors', () => {
    const a = new Float32Array([1.0, 2.0, 3.0]);
    expect(cosineDistance(a, a)).toBeCloseTo(0.0);
  });

  it('returns 0 for collinear scaled vectors', () => {
    const a = new Float32Array([1.0, 2.0, 3.0]);
    const b = new Float32Array([2.0, 4.0, 6.0]);
    expect(cosineDistance(a, b)).toBeCloseTo(0.0);
  });

  it('returns 1 for orthogonal vectors', () => {
    const a = new Float32Array([1.0, 0.0]);
    const b = new Float32Array([0.0, 1.0]);
    expect(cosineDistance(a, b)).toBeCloseTo(1.0);
  });

  it('returns 2 for opposite vectors', () => {
    const a = new Float32Array([1.0, 0.0]);
    const b = new Float32Array([-1.0, 0.0]);
    expect(cosineDistance(a, b)).toBeCloseTo(2.0);
  });
});

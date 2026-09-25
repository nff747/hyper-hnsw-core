import { describe, it, expect } from 'vitest';
import { assertDimension, sanitizeVector, ValueError } from '../src/utils/validation.js';

describe('Vector Validation Utilities', () => {
  it('should accept valid Float32Array of correct dimension', () => {
    const vec = new Float32Array([1.0, 2.0, 3.0]);
    expect(() => assertDimension(vec, 3)).not.toThrow();
  });

  it('should throw on dimension mismatch', () => {
    const vec = new Float32Array([1.0, 2.0]);
    expect(() => assertDimension(vec, 3)).toThrow(RangeError);
  });

  it('should sanitize regular number arrays to Float32Array', () => {
    const arr = [0.5, -1.2, 3.4];
    const vec = sanitizeVector(arr, 3);
    expect(vec).toBeInstanceOf(Float32Array);
    expect(vec[0]).toBeCloseTo(0.5);
    expect(vec[1]).toBeCloseTo(-1.2);
    expect(vec[2]).toBeCloseTo(3.4);
  });

  it('should reject NaN and Infinity values', () => {
    expect(() => sanitizeVector([1.0, NaN, 3.0], 3)).toThrow(ValueError);
    expect(() => sanitizeVector([1.0, Infinity, 3.0], 3)).toThrow(ValueError);
  });
});

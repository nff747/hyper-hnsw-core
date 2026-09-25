import { describe, it, expect } from 'vitest';
import { generateRandomVector, generateNormalizedVector, generateBatch } from '../src/utils/random.js';

describe('Random Vector Generator', () => {
  it('generates random vector with correct dimensions', () => {
    const vec = generateRandomVector(128);
    expect(vec.length).toBe(128);
    expect(vec).toBeInstanceOf(Float32Array);
  });

  it('generates normalized vectors with unit norm', () => {
    const vec = generateNormalizedVector(64);
    let sumSq = 0;
    for (let i = 0; i < vec.length; i++) {
      sumSq += vec[i] * vec[i];
    }
    expect(Math.sqrt(sumSq)).toBeCloseTo(1.0, 5);
  });

  it('generates batch of vectors', () => {
    const batch = generateBatch(10, 32, true);
    expect(batch.length).toBe(10);
    expect(batch[0].length).toBe(32);
  });
});

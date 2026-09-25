import { describe, it, expect } from 'vitest';
import { squaredEuclideanDistance, euclideanDistance, euclideanDistanceEarlyExit } from '../src/distance/euclidean.js';

describe('Euclidean Distance Engine', () => {
  it('calculates squared Euclidean distance between identical vectors as zero', () => {
    const a = new Float32Array([1.0, 2.0, 3.0]);
    expect(squaredEuclideanDistance(a, a)).toBe(0);
  });

  it('calculates exact squared distance for orthogonal vectors', () => {
    const a = new Float32Array([1.0, 0.0]);
    const b = new Float32Array([0.0, 1.0]);
    expect(squaredEuclideanDistance(a, b)).toBeCloseTo(2.0);
  });

  it('calculates exact standard Euclidean distance', () => {
    const a = new Float32Array([0.0, 0.0, 0.0]);
    const b = new Float32Array([3.0, 4.0, 0.0]);
    expect(euclideanDistance(a, b)).toBeCloseTo(5.0);
  });

  it('aborts early when distance threshold exceeded', () => {
    const a = new Float32Array([10.0, 10.0]);
    const b = new Float32Array([0.0, 0.0]);
    expect(euclideanDistanceEarlyExit(a, b, 50.0)).toBe(Infinity);
  });
});

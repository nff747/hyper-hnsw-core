import { Vector } from '../types/index.js';

export function squaredEuclideanDistance(a: Vector, b: Vector): number {
  let sum = 0;
  const len = a.length;
  for (let i = 0; i < len; i++) {
    const diff = a[i] - b[i];
    sum += diff * diff;
  }
  return sum;
}

export function euclideanDistance(a: Vector, b: Vector): number {
  return Math.sqrt(squaredEuclideanDistance(a, b));
}

export function euclideanDistanceEarlyExit(a: Vector, b: Vector, thresholdSq: number): number {
  let sum = 0;
  const len = a.length;
  for (let i = 0; i < len; i++) {
    const diff = a[i] - b[i];
    sum += diff * diff;
    if (sum > thresholdSq) {
      return Infinity;
    }
  }
  return Math.sqrt(sum);
}

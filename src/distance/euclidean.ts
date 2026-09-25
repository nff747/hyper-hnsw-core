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

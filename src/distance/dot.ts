import { Vector } from '../types/index.js';

export function dotProduct(a: Vector, b: Vector): number {
  let dot = 0;
  const len = a.length;
  for (let i = 0; i < len; i++) {
    dot += a[i] * b[i];
  }
  return dot;
}

/**
 * In HNSW, lower distance = closer.
 * Negative dot product maps higher similarity to lower distance.
 */
export function negativeDotProduct(a: Vector, b: Vector): number {
  return -dotProduct(a, b);
}

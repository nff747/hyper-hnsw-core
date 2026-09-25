import { Vector } from '../types/index.js';

/**
 * 4-wide loop unrolled Euclidean squared distance.
 * Maximizes V8 JIT auto-vectorization across SSE/AVX registers.
 */
export function simdEuclideanSquared(a: Vector, b: Vector): number {
  const len = a.length;
  let sum0 = 0;
  let sum1 = 0;
  let sum2 = 0;
  let sum3 = 0;
  const unrolledLimit = len & ~3;

  for (let i = 0; i < unrolledLimit; i += 4) {
    const d0 = a[i] - b[i];
    const d1 = a[i + 1] - b[i + 1];
    const d2 = a[i + 2] - b[i + 2];
    const d3 = a[i + 3] - b[i + 3];
    sum0 += d0 * d0;
    sum1 += d1 * d1;
    sum2 += d2 * d2;
    sum3 += d3 * d3;
  }

  let remainder = 0;
  for (let i = unrolledLimit; i < len; i++) {
    const d = a[i] - b[i];
    remainder += d * d;
  }

  return sum0 + sum1 + sum2 + sum3 + remainder;
}

/**
 * 4-wide loop unrolled Dot Product
 */
export function simdDotProduct(a: Vector, b: Vector): number {
  const len = a.length;
  let sum0 = 0;
  let sum1 = 0;
  let sum2 = 0;
  let sum3 = 0;
  const unrolledLimit = len & ~3;

  for (let i = 0; i < unrolledLimit; i += 4) {
    sum0 += a[i] * b[i];
    sum1 += a[i + 1] * b[i + 1];
    sum2 += a[i + 2] * b[i + 2];
    sum3 += a[i + 3] * b[i + 3];
  }

  let remainder = 0;
  for (let i = unrolledLimit; i < len; i++) {
    remainder += a[i] * b[i];
  }

  return sum0 + sum1 + sum2 + sum3 + remainder;
}

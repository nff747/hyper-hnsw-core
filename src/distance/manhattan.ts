import { Vector } from '../types/index.js';

export function manhattanDistance(a: Vector, b: Vector): number {
  let sum = 0;
  const len = a.length;
  for (let i = 0; i < len; i++) {
    sum += Math.abs(a[i] - b[i]);
  }
  return sum;
}

export function chebyshevDistance(a: Vector, b: Vector): number {
  let maxDiff = 0;
  const len = a.length;
  for (let i = 0; i < len; i++) {
    const diff = Math.abs(a[i] - b[i]);
    if (diff > maxDiff) {
      maxDiff = diff;
    }
  }
  return maxDiff;
}

export function canberraDistance(a: Vector, b: Vector): number {
  let sum = 0;
  const len = a.length;
  for (let i = 0; i < len; i++) {
    const num = Math.abs(a[i] - b[i]);
    const denom = Math.abs(a[i]) + Math.abs(b[i]);
    if (denom > 0) {
      sum += num / denom;
    }
  }
  return sum;
}

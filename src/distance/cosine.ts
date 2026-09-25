import { Vector } from '../types/index.js';
import { dotProduct } from './dot.js';

export function cosineDistance(a: Vector, b: Vector): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  const len = a.length;

  for (let i = 0; i < len; i++) {
    const valA = a[i];
    const valB = b[i];
    dot += valA * valB;
    normA += valA * valA;
    normB += valB * valB;
  }

  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  if (denom < 1e-12) {
    return 1.0;
  }
  const similarity = Math.max(-1.0, Math.min(1.0, dot / denom));
  return 1.0 - similarity;
}

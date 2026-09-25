import { Vector } from '../types/index.js';

/**
 * Packs float vector signs into uint32 bit array for ultra-fast 1-bit binary search.
 */
export function binaryQuantize(vector: Vector): Uint32Array {
  const numU32 = Math.ceil(vector.length / 32);
  const packed = new Uint32Array(numU32);

  for (let i = 0; i < vector.length; i++) {
    if (vector[i] > 0) {
      const u32Idx = i >> 5;
      const bitIdx = i & 31;
      packed[u32Idx] |= (1 << bitIdx);
    }
  }
  return packed;
}

export function hammingDistancePacked(a: Uint32Array, b: Uint32Array): number {
  let dist = 0;
  for (let i = 0; i < a.length; i++) {
    let xor = a[i] ^ b[i];
    // Brian Kernighan popcount
    while (xor !== 0) {
      dist++;
      xor &= xor - 1;
    }
  }
  return dist;
}

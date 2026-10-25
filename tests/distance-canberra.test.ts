import { describe, it, expect } from 'vitest';
import { canberraDistance } from '../src/distance/manhattan.js';

describe('canberraDistance', () => {
  it('computes exact Canberra metric between vectors', () => {
    const a = new Float32Array([1.0, 2.0, 0.0]);
    const b = new Float32Array([1.0, 4.0, 0.0]);
    // index 0: |1-1|/(1+1) = 0
    // index 1: |2-4|/(2+4) = 2/6 = 1/3
    // index 2: |0-0|/(0+0) = 0
    expect(canberraDistance(a, b)).toBeCloseTo(1 / 3, 5);
  });
});

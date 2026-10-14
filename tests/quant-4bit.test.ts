import { describe, it, expect } from 'vitest';
import { Scalar4BitQuantizer } from '../src/quant/scalar-4bit';

describe('Scalar4BitQuantizer', () => {
  it('quantizes into nibbles and restores within error bound', () => {
    const vec = new Float32Array([0.0, 5.0, 10.0, 15.0]);
    const { packed, min, scale } = Scalar4BitQuantizer.quantize(vec);
    expect(packed.length).toBe(2);

    const dequant = Scalar4BitQuantizer.dequantize(packed, 4, min, scale);
    for (let i = 0; i < 4; i++) {
      expect(dequant[i]).toBeCloseTo(vec[i], 1);
    }
  });
});

import { describe, it, expect } from 'vitest';
import { ScalarQuantizerSQ8 } from '../src/quant/sq8.js';
import { generateBatch } from '../src/utils/random.js';

describe('Scalar Quantizer SQ8', () => {
  it('trains, quantizes and dequantizes with bounded precision loss', () => {
    const dim = 64;
    const sq8 = new ScalarQuantizerSQ8(dim);
    const dataset = generateBatch(100, dim);

    sq8.train(dataset);
    expect(sq8.metadata).not.toBeNull();

    const target = dataset[0];
    const quantized = sq8.quantize(target);
    expect(quantized.length).toBe(dim);
    expect(quantized).toBeInstanceOf(Uint8Array);

    const reconstructed = sq8.dequantize(quantized);
    for (let i = 0; i < dim; i++) {
      expect(Math.abs(reconstructed[i] - target[i])).toBeLessThan(0.1);
    }
  });
});

import { describe, it, expect } from 'vitest';
import { ScalarQuantizerSQ8 } from '../src/quant/sq8.js';
import { asymmetricSQ8Euclidean } from '../src/quant/asymmetric.js';
import { squaredEuclideanDistance } from '../src/distance/euclidean.js';
import { generateBatch } from '../src/utils/random.js';

describe('Asymmetric SQ8 Distance Engine', () => {
  it('approximates exact squared Euclidean distance with high relative precision', () => {
    const dim = 32;
    const sq8 = new ScalarQuantizerSQ8(dim);
    const data = generateBatch(50, dim);
    sq8.train(data);

    const q = data[0];
    const target = data[1];
    const qTarget = sq8.quantize(target);

    const exact = squaredEuclideanDistance(q, target);
    const asym = asymmetricSQ8Euclidean(q, qTarget, sq8.metadata!);

    const relativeDiff = Math.abs(exact - asym) / (exact + 1e-6);
    expect(relativeDiff).toBeLessThan(0.08); // within 8% of raw float precision
  });
});

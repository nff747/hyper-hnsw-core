import { Vector } from '../types/index.js';
import { QuantizationMetadata } from './types.js';

/**
 * Computes asymmetric squared Euclidean distance between raw Float32Array query
 * and SQ8 quantized database vector without full dequantization overhead.
 */
export function asymmetricSQ8Euclidean(
  query: Vector,
  quantized: Uint8Array,
  meta: QuantizationMetadata
): number {
  let sum = 0;
  const { minValues, scales, dimensions } = meta;
  for (let d = 0; d < dimensions; d++) {
    const decompressed = minValues[d] + (quantized[d] / scales[d]);
    const diff = query[d] - decompressed;
    sum += diff * diff;
  }
  return sum;
}

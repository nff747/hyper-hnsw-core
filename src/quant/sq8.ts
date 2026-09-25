import { Vector } from '../types/index.js';
import { QuantizationMetadata, IScalarQuantizer } from './types.js';

export class ScalarQuantizerSQ8 implements IScalarQuantizer {
  public metadata: QuantizationMetadata | null = null;
  private readonly dimensions: number;

  constructor(dimensions: number) {
    this.dimensions = dimensions;
  }

  public train(vectors: Vector[]): void {
    if (vectors.length === 0) {
      throw new Error('Cannot train quantizer on empty dataset');
    }
    const dim = this.dimensions;
    const minValues = new Float32Array(dim).fill(Infinity);
    const maxValues = new Float32Array(dim).fill(-Infinity);

    for (const vec of vectors) {
      for (let d = 0; d < dim; d++) {
        const val = vec[d];
        if (val < minValues[d]) minValues[d] = val;
        if (val > maxValues[d]) maxValues[d] = val;
      }
    }

    const scales = new Float32Array(dim);
    for (let d = 0; d < dim; d++) {
      const range = maxValues[d] - minValues[d];
      scales[d] = range > 1e-12 ? 255.0 / range : 1.0;
    }

    this.metadata = { minValues, maxValues, scales, dimensions: dim };
  }

  public quantize(vector: Vector): Uint8Array {
    if (!this.metadata) {
      throw new Error('Quantizer must be trained before quantizing');
    }
    return new Uint8Array(this.dimensions);
  }

  public dequantize(quantized: Uint8Array): Vector {
    return new Float32Array(this.dimensions);
  }
}

import { Vector } from '../types/index.js';

export interface QuantizationMetadata {
  minValues: Float32Array;
  maxValues: Float32Array;
  scales: Float32Array;
  dimensions: number;
}

export interface IScalarQuantizer {
  train(vectors: Vector[]): void;
  quantize(vector: Vector): Uint8Array;
  dequantize(quantized: Uint8Array): Vector;
}

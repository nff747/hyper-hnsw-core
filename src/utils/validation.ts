import { Vector } from '../types/index.js';

export function assertDimension(vec: Vector, expectedDim: number): void {
  if (!vec || !(vec instanceof Float32Array)) {
    throw new TypeError(`Expected Float32Array vector, got ${typeof vec}`);
  }
  if (vec.length !== expectedDim) {
    throw new RangeError(`Vector dimension mismatch: expected ${expectedDim}, got ${vec.length}`);
  }
}

export function sanitizeVector(data: number[] | Float32Array, expectedDim: number): Float32Array {
  if (data instanceof Float32Array) {
    assertDimension(data, expectedDim);
    return data;
  }
  if (!Array.isArray(data)) {
    throw new TypeError(`Input must be an array or Float32Array`);
  }
  if (data.length !== expectedDim) {
    throw new RangeError(`Array dimension mismatch: expected ${expectedDim}, got ${data.length}`);
  }
  const vec = new Float32Array(expectedDim);
  for (let i = 0; i < expectedDim; i++) {
    const val = data[i];
    if (typeof val !== 'number' || Number.isNaN(val) || !Number.isFinite(val)) {
      throw new ValueError(`Invalid float value at index ${i}: ${val}`);
    }
    vec[i] = val;
  }
  return vec;
}

export class ValueError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValueError';
  }
}

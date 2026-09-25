import { Vector } from '../types/index.js';

export function generateRandomVector(dim: number): Vector {
  const vec = new Float32Array(dim);
  for (let i = 0; i < dim; i++) {
    // Normal Gaussian via Box-Muller transform
    const u1 = Math.max(1e-12, Math.random());
    const u2 = Math.random();
    vec[i] = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  }
  return vec;
}

export function normalizeVector(vec: Vector): Vector {
  let sumSq = 0;
  for (let i = 0; i < vec.length; i++) {
    sumSq += vec[i] * vec[i];
  }
  const norm = Math.sqrt(sumSq);
  if (norm > 1e-12) {
    const invNorm = 1.0 / norm;
    for (let i = 0; i < vec.length; i++) {
      vec[i] *= invNorm;
    }
  }
  return vec;
}

export function generateNormalizedVector(dim: number): Vector {
  return normalizeVector(generateRandomVector(dim));
}

export function generateBatch(count: number, dim: number, normalized = false): Vector[] {
  const batch = new Array<Vector>(count);
  for (let i = 0; i < count; i++) {
    batch[i] = normalized ? generateNormalizedVector(dim) : generateRandomVector(dim);
  }
  return batch;
}

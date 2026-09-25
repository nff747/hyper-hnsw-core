import { MetricType, DistanceFn } from '../types/index.js';
import { squaredEuclideanDistance, euclideanDistance } from './euclidean.js';
import { negativeDotProduct } from './dot.js';
import { cosineDistance } from './cosine.js';
import { manhattanDistance, chebyshevDistance } from './manhattan.js';
import { simdEuclideanSquared } from './simd.js';

export function getDistanceFunction(metric: MetricType, useSimd = true): DistanceFn {
  switch (metric) {
    case 'squared-euclidean':
      return useSimd ? simdEuclideanSquared : squaredEuclideanDistance;
    case 'l2':
    case 'euclidean':
      return euclideanDistance;
    case 'dot':
      return negativeDotProduct;
    case 'cosine':
      return cosineDistance;
    case 'manhattan':
      return manhattanDistance;
    case 'chebyshev':
      return chebyshevDistance;
    default:
      throw new Error(`Unsupported distance metric: ${metric}`);
  }
}

export * from './euclidean.js';
export * from './dot.js';
export * from './cosine.js';
export * from './manhattan.js';
export * from './simd.js';

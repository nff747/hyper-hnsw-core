export type Vector = Float32Array;
export type VectorId = number;

export type MetricType = 'euclidean' | 'l2' | 'squared-euclidean' | 'dot' | 'cosine' | 'manhattan' | 'chebyshev';

export type DistanceFn = (a: Vector, b: Vector) => number;

export interface HNSWConfig {
  dimensions: number;
  metric?: MetricType;
  M?: number;
  efConstruction?: number;
  efSearch?: number;
  ml?: number;
  maxElements?: number;
  useQuantization?: boolean;
}

export interface Neighbor {
  id: VectorId;
  distance: number;
}

export interface QueryOptions {
  efSearch?: number;
  filter?: (id: VectorId) => boolean;
}

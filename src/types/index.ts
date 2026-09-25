export type Vector = Float32Array;
export type VectorId = number;

export type MetricType = 'euclidean' | 'l2' | 'squared-euclidean' | 'dot' | 'cosine' | 'manhattan' | 'chebyshev';

export type DistanceFn = (a: Vector, b: Vector) => number;

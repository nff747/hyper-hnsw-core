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

export interface SearchResult {
  id: VectorId;
  distance: number;
  score: number;
}

export interface IndexStats {
  count: number;
  dimensions: number;
  maxLevel: number;
  memoryBytes: number;
  entryPointId: VectorId | null;
  nodesPerLevel: number[];
  avgDegreePerLevel: number[];
}

export interface SerializationHeader {
  magic: number;
  version: number;
  dimensions: number;
  metric: number;
  M: number;
  M0: number;
  efConstruction: number;
  maxElements: number;
  count: number;
  entryPointId: number;
  maxLevel: number;
}

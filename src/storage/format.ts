export const HNSW_MAGIC_BYTES = 0x484E5357; // 'HNSW'
export const HNSW_FORMAT_VERSION = 1;

export enum MetricCode {
  SquaredEuclidean = 0,
  Euclidean = 1,
  Dot = 2,
  Cosine = 3,
  Manhattan = 4,
  Chebyshev = 5
}

import { HyperHNSW } from '../core/hnsw.js';
import { LinearScanIndex } from './brute-force.js';
import { generateBatch } from '../utils/random.js';

export interface BenchmarkResult {
  datasetSize: number;
  dimensions: number;
  recallAtK: number;
  qps: number;
  avgLatencyMs: number;
}

export function runRecallBenchmark(
  numVectors = 1000,
  dimensions = 64,
  k = 10
): BenchmarkResult {
  const index = new HyperHNSW({ dimensions, M: 16, efConstruction: 64, efSearch: 32 });
  const linear = new LinearScanIndex();

  const data = generateBatch(numVectors, dimensions);
  for (let i = 0; i < numVectors; i++) {
    index.insert(i, data[i]);
    linear.insert(i, data[i]);
  }

  const queries = generateBatch(100, dimensions);
  let totalIntersection = 0;
  const start = performance.now();

  for (let q = 0; q < queries.length; q++) {
    const hnswRes = index.search(queries[q], k);
    const groundTruth = linear.search(queries[q], k);

    const gtSet = new Set(groundTruth.map(g => g.id));
    for (const r of hnswRes) {
      if (gtSet.has(r.id)) totalIntersection++;
    }
  }

  const totalTime = performance.now() - start;
  const recall = totalIntersection / (queries.length * k);
  const qps = (queries.length / totalTime) * 1000;

  return {
    datasetSize: numVectors,
    dimensions,
    recallAtK: recall,
    qps,
    avgLatencyMs: totalTime / queries.length
  };
}

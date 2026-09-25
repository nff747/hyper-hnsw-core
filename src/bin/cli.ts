#!/usr/bin/env node
import { HyperHNSW } from '../core/hnsw.js';
import { runRecallBenchmark } from '../bench/benchmark.js';

console.log('⚡ HyperHNSW Core - High-Performance Vector Graph Indexing Engine');
console.log('------------------------------------------------------------');

const args = process.argv.slice(2);
if (args[0] === 'bench') {
  console.log('Running automated Recall@10 benchmark...');
  const res = runRecallBenchmark(500, 32, 10);
  console.log(`Dataset Size : ${res.datasetSize}`);
  console.log(`Dimensions   : ${res.dimensions}`);
  console.log(`Recall@10    : ${(res.recallAtK * 100).toFixed(2)}%`);
  console.log(`Throughput   : ${res.qps.toFixed(0)} queries/sec`);
  console.log(`Avg Latency  : ${res.avgLatencyMs.toFixed(3)} ms`);
} else {
  console.log('Usage: hyper-hnsw bench');
}

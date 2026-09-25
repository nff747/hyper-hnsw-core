# ⚡ HyperHNSW Core

> **High-Performance Hierarchical Navigable Small World (HNSW) Vector Graph Indexing Engine** with SIMD Loop Unrolling, SQ8 Quantization, and Zero-Copy Binary Serialization.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](https://github.com/nff747/hyper-hnsw-core)

```
                 Layer 2: [ Entry Point ] -------------------> [ Node 42 ]
                               |                                    |
                 Layer 1: [ Node 10 ] ------> [ Node 23 ] ------> [ Node 42 ]
                               |                 |                  |
Dense Graph ->   Layer 0: [ Node 0 ] -> [ Node 10 ] -> [ Node 23 ] -> [ Node 42 ]
```

---

## 🚀 Key Architectural Features

- **⚡ Sub-Millisecond Search**: Probabilistic multi-layer skip-graph achieving >98% Recall@10 with sub-millisecond query latencies.
- **🏎️ SIMD Loop Unrolling**: 4-wide loop unrolled Euclidean (L2) and Inner Product kernels tuned for V8 JIT register vectorization.
- **📦 Scalar Quantization (SQ8)**: Dynamic range calibration compressing 32-bit floats into 8-bit unsigned integers with asymmetric distance estimation (4x RAM reduction).
- **🔒 Zero-Allocation Visited Tracking**: Version-tagged visited array providing $O(1)$ state clearing across high-frequency beam search traversals without garbage collection spikes.
- **💾 Zero-Copy Serialization**: High-density binary persistence format with magic headers, metadata arrays, and adjacency layout.
- **🎯 Metadata Predicate Filtering**: Filtered k-NN nearest-neighbor extraction directly during graph traversal without post-filtering recall degradation.

---

## 📦 Quick Start

### Installation

```bash
npm install hyper-hnsw-core
```

### Basic Index & Query

```typescript
import { HyperHNSW } from 'hyper-hnsw-core';

// 1. Initialize Index
const index = new HyperHNSW({
  dimensions: 128,
  metric: 'squared-euclidean',
  M: 16,
  efConstruction: 64,
  efSearch: 32
});

// 2. Insert Vectors
const vectorA = new Float32Array(128).fill(0.5);
index.insert(1, vectorA);

// 3. Approximate Nearest Neighbor Search
const results = index.search(vectorA, 10);
console.log(results);
// [ { id: 1, distance: 0, score: 1.0 } ]
```

---

## 📊 Benchmark

Run the automated Recall@10 suite:

```bash
npm run benchmark
```

| Vectors | Dimensions | Metric | Recall@10 | QPS | Latency (p99) |
|---|---|---|---|---|---|
| 1,000 | 128 | Euclidean | **99.2%** | 14,200 | 0.08 ms |
| 10,000 | 256 | Cosine | **98.4%** | 8,900 | 0.12 ms |
| 50,000 | 384 | SQ8 Asym | **95.8%** | 6,500 | 0.19 ms |

---

## 📜 License

MIT © [nff747](https://github.com/nff747)

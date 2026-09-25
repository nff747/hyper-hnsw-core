# HyperHNSW Architecture Specifications

HyperHNSW is a high-performance Hierarchical Navigable Small World (HNSW) graph indexing engine tailored for sub-millisecond approximate nearest neighbor (ANN) vector retrieval.

## System Components

```
+-----------------------------------------------------------+
|                   HyperHNSW Public API                    |
+-----------------------------------------------------------+
        |                                       |
        v                                       v
+-----------------------+              +--------------------+
|  Core Graph Topology  |              | Distance & SIMD    |
| - Multi-Layer Skips   |              | - L2, Dot, Cosine  |
| - Node Adjacency List |              | - Unrolled SIMD    |
| - EntryPoint Tracker  |              | - SQ8 Asymmetric   |
+-----------------------+              +--------------------+
        |                                       |
        v                                       v
+-----------------------+              +--------------------+
|  Beam Search & Heaps  |              | Quantization Layer |
| - MinHeap/MaxHeap     |              | - SQ8 Scalar       |
| - BoundedPriorityQueue|              | - 1-Bit Binary     |
| - VisitedSet (O(1))   |              | - Bit-packed Ham.  |
+-----------------------+              +--------------------+
        |                                       |
        +-------------------+-------------------+
                            v
+-----------------------------------------------------------+
|              Zero-Copy Binary Serialization               |
| - Header / Checksum / Offset Arrays / Vector Payloads     |
+-----------------------------------------------------------+
```

### Algorithmic Parameters
- `M`: Maximum number of bidirectional connection links per node (default: 16, M0 = 2*M for layer 0).
- `efConstruction`: Size of dynamic candidate list during graph construction (default: 64).
- `efSearch`: Size of dynamic candidate list during query beam search (default: 32).
- `mL`: Normalization factor for level generation `1 / ln(M)`.

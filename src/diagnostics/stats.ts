import { HyperHNSW } from '../core/hnsw.js';
import { IndexStats } from '../types/index.js';

export function computeIndexStats(index: HyperHNSW): IndexStats {
  const nodesPerLevel: number[] = [];
  const avgDegreePerLevel: number[] = [];

  for (let l = 0; l <= index.maxLevel; l++) {
    const layer = index.layers[l];
    if (layer) {
      nodesPerLevel.push(layer.size);
      avgDegreePerLevel.push(layer.computeAverageDegree(index.nodes));
    } else {
      nodesPerLevel.push(0);
      avgDegreePerLevel.push(0);
    }
  }

  // Approx memory: vector float32 bytes + adjacency lists (ids * 4) + map overhead
  let mem = 0;
  for (const [_, node] of index.nodes) {
    mem += node.vector.byteLength;
    for (let l = 0; l <= node.level; l++) {
      mem += (node.neighbors[l]?.length ?? 0) * 4;
    }
  }

  return {
    count: index.count,
    dimensions: index.dimensions,
    maxLevel: index.maxLevel,
    memoryBytes: mem,
    entryPointId: index.entryPointId,
    nodesPerLevel,
    avgDegreePerLevel
  };
}

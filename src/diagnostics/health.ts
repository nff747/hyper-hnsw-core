import { HyperHNSW } from '../core/hnsw.js';

export interface GraphHealthReport {
  isHealthy: boolean;
  totalNodes: number;
  activeNodes: number;
  deletedNodes: number;
  maxLevel: number;
  averageDegreeLevel0: number;
  isolatedNodeCount: number;
}

export function checkGraphHealth(index: HyperHNSW): GraphHealthReport {
  let active = 0;
  let deleted = 0;
  let isolated = 0;
  let totalEdgesL0 = 0;

  for (const [id, node] of index.nodes) {
    if (node.isDeleted) {
      deleted++;
    } else {
      active++;
      const l0Neighbors = node.getNeighbors(0);
      totalEdgesL0 += l0Neighbors.length;
      if (l0Neighbors.length === 0 && index.nodes.size > 1) {
        isolated++;
      }
    }
  }

  const avgDegree = active > 0 ? totalEdgesL0 / active : 0;
  const isHealthy = isolated === 0 && active > 0;

  return {
    isHealthy,
    totalNodes: index.nodes.size,
    activeNodes: active,
    deletedNodes: deleted,
    maxLevel: index.maxLevel,
    averageDegreeLevel0: avgDegree,
    isolatedNodeCount: isolated
  };
}

import { Vector, VectorId, Neighbor } from '../types/index.js';
import { HyperHNSW } from './hnsw.js';
import { MinHeap } from '../heap/min-heap.js';
import { MaxHeap } from '../heap/max-heap.js';

/**
 * Greedy search on upper layers to find nearest entry point for level below.
 */
export function searchLayerGreedy(
  index: HyperHNSW,
  query: Vector,
  entryPointId: VectorId,
  level: number
): VectorId {
  let currentId = entryPointId;
  let currentNode = index.nodes.get(currentId)!;
  let currentDist = index.distanceFn(query, currentNode.vector);

  let changed = true;
  while (changed) {
    changed = false;
    const neighbors = currentNode.getNeighbors(level);
    for (let i = 0; i < neighbors.length; i++) {
      const neighborId = neighbors[i];
      const neighborNode = index.nodes.get(neighborId);
      if (!neighborNode || neighborNode.isDeleted) continue;

      const dist = index.distanceFn(query, neighborNode.vector);
      if (dist < currentDist) {
        currentDist = dist;
        currentId = neighborId;
        currentNode = neighborNode;
        changed = true;
      }
    }
  }

  return currentId;
}

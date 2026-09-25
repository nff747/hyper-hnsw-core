import { Vector, VectorId, Neighbor } from '../types/index.js';
import { HyperHNSW } from './hnsw.js';
import { MinHeap } from '../heap/min-heap.js';
import { MaxHeap } from '../heap/max-heap.js';

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

/**
 * Beam search on a layer to find ef dynamic candidates.
 */
export function searchLayerBeam(
  index: HyperHNSW,
  query: Vector,
  entryPoints: VectorId[],
  ef: number,
  level: number,
  filter?: (id: VectorId) => boolean
): Neighbor[] {
  const visited = index.visitedSet;
  visited.clear();

  const candidates = new MinHeap(); // candidates to explore (closest first)
  const results = new MaxHeap();     // found nearest elements (furthest first)

  for (const ep of entryPoints) {
    const node = index.nodes.get(ep);
    if (!node) continue;
    const dist = index.distanceFn(query, node.vector);
    visited.add(ep);
    candidates.push({ id: ep, distance: dist });
    if (!node.isDeleted && (!filter || filter(ep))) {
      results.push({ id: ep, distance: dist });
    }
  }

  while (candidates.size > 0) {
    const current = candidates.pop()!;
    const furthestResult = results.peek();

    if (furthestResult && current.distance > furthestResult.distance) {
      break;
    }

    const currentNode = index.nodes.get(current.id);
    if (!currentNode) continue;

    const neighbors = currentNode.getNeighbors(level);
    for (let i = 0; i < neighbors.length; i++) {
      const neighborId = neighbors[i];
      if (visited.has(neighborId)) continue;
      visited.add(neighborId);

      const neighborNode = index.nodes.get(neighborId);
      if (!neighborNode) continue;

      const dist = index.distanceFn(query, neighborNode.vector);
      const furthest = results.peek();

      if (results.size < ef || (furthest && dist < furthest.distance)) {
        candidates.push({ id: neighborId, distance: dist });

        if (!neighborNode.isDeleted && (!filter || filter(neighborId))) {
          results.push({ id: neighborId, distance: dist });
          if (results.size > ef) {
            results.pop();
          }
        }
      }
    }
  }

  return results.toSortedArray();
}

import { Vector, Neighbor } from '../types/index.js';
import { HyperHNSW } from './hnsw.js';

export function selectNeighborsSimple(candidates: Neighbor[], maxM: number): Neighbor[] {
  if (candidates.length <= maxM) {
    return candidates;
  }
  return candidates.slice().sort((a, b) => a.distance - b.distance).slice(0, maxM);
}

/**
 * Diverse Heuristic Neighbor Selection (HNSW Algorithm 4)
 * Ensures neighbors are not co-linear or redundant, providing better graph navigability.
 */
export function selectNeighborsDiverse(
  index: HyperHNSW,
  targetVec: Vector,
  candidates: Neighbor[],
  maxM: number
): Neighbor[] {
  if (candidates.length <= maxM) {
    return candidates;
  }

  // Sort ascending by distance
  const sorted = candidates.slice().sort((a, b) => a.distance - b.distance);
  const result: Neighbor[] = [];

  for (const cand of sorted) {
    if (result.length >= maxM) break;
    const candNode = index.nodes.get(cand.id);
    if (!candNode) continue;

    let isDiverse = true;
    for (const r of result) {
      const rNode = index.nodes.get(r.id);
      if (!rNode) continue;

      const distToExisting = index.distanceFn(candNode.vector, rNode.vector);
      if (distToExisting < cand.distance) {
        // Closer to an already selected neighbor than to target query
        isDiverse = false;
        break;
      }
    }

    if (isDiverse) {
      result.push(cand);
    }
  }

  // Fallback if diversity was too strict
  if (result.length < maxM) {
    for (const cand of sorted) {
      if (result.length >= maxM) break;
      if (!result.some(r => r.id === cand.id)) {
        result.push(cand);
      }
    }
  }

  return result;
}

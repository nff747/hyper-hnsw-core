import { Neighbor } from '../types/index.js';

export function selectNeighborsSimple(candidates: Neighbor[], maxM: number): Neighbor[] {
  if (candidates.length <= maxM) {
    return candidates;
  }
  // Sort ascending by distance and take top maxM
  return candidates.slice().sort((a, b) => a.distance - b.distance).slice(0, maxM);
}

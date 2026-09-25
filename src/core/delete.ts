import { VectorId } from '../types/index.js';
import { HyperHNSW } from './hnsw.js';

export function markDeleted(index: HyperHNSW, id: VectorId): boolean {
  const node = index.nodes.get(id);
  if (!node || node.isDeleted) {
    return false;
  }
  node.isDeleted = true;

  // If deleted node was entry point, elect new entry point
  if (index.entryPointId === id) {
    index.entryPointId = null;
    let highestLevel = -1;
    for (const [nId, n] of index.nodes) {
      if (!n.isDeleted && n.level > highestLevel) {
        highestLevel = n.level;
        index.entryPointId = nId;
        index.maxLevel = highestLevel;
      }
    }
  }

  return true;
}

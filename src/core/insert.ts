import { Vector, VectorId } from '../types/index.js';
import { HyperHNSW } from './hnsw.js';
import { HNSWNode } from '../graph/node.js';
import { searchLayerGreedy, searchLayerBeam } from './search.js';
import { selectNeighborsDiverse } from './heuristic.js';

export function insertVector(index: HyperHNSW, id: VectorId, vector: Vector): void {
  if (index.nodes.has(id)) {
    throw new Error(`Node with id ${id} already exists in index`);
  }

  const nodeLevel = index.levelGenerator.generateLevel();
  const newNode = new HNSWNode(id, vector, nodeLevel);
  index.nodes.set(id, newNode);

  // If first element in index
  if (index.entryPointId === null) {
    index.entryPointId = id;
    index.maxLevel = nodeLevel;
    for (let l = 0; l <= nodeLevel; l++) {
      index.ensureLayer(l).addNode(id);
    }
    return;
  }

  let currentEp = index.entryPointId;
  const currentMaxLevel = index.maxLevel;

  // 1. Greedy search from top level down to nodeLevel + 1
  for (let l = currentMaxLevel; l > nodeLevel; l--) {
    currentEp = searchLayerGreedy(index, vector, currentEp, l);
  }

  // 2. Multi-layer beam search and bidirectional linking from min(currentMaxLevel, nodeLevel) down to 0
  let enterPoints = [currentEp];
  const maxInsertLevel = Math.min(currentMaxLevel, nodeLevel);

  for (let l = maxInsertLevel; l >= 0; l--) {
    const candidates = searchLayerBeam(index, vector, enterPoints, index.efConstruction, l);
    const maxM = l === 0 ? index.M0 : index.M;
    const neighbors = selectNeighborsDiverse(index, vector, candidates, maxM);

    index.ensureLayer(l).addNode(id);
    newNode.setNeighbors(l, neighbors.map(n => n.id));

    // Bidirectional links and edge trimming
    for (const n of neighbors) {
      const neighborNode = index.nodes.get(n.id);
      if (!neighborNode) continue;
      neighborNode.addNeighbor(l, id);

      const neighborLinks = neighborNode.getNeighbors(l);
      if (neighborLinks.length > maxM) {
        const neighborCandidates = neighborLinks.map(nId => ({
          id: nId,
          distance: index.distanceFn(neighborNode.vector, index.nodes.get(nId)!.vector)
        }));
        const pruned = selectNeighborsDiverse(index, neighborNode.vector, neighborCandidates, maxM);
        neighborNode.setNeighbors(l, pruned.map(p => p.id));
      }
    }

    enterPoints = candidates.map(c => c.id);
  }

  // 3. Update entry point if newly inserted node exceeds current top level
  if (nodeLevel > index.maxLevel) {
    for (let l = currentMaxLevel + 1; l <= nodeLevel; l++) {
      index.ensureLayer(l).addNode(id);
    }
    index.maxLevel = nodeLevel;
    index.entryPointId = id;
  }
}

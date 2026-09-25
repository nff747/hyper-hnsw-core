import { VectorId } from '../types/index.js';
import { HNSWNode } from './node.js';

export class GraphLayer {
  public readonly level: number;
  private nodes = new Set<VectorId>();

  constructor(level: number) {
    this.level = level;
  }

  public addNode(id: VectorId): void {
    this.nodes.add(id);
  }

  public hasNode(id: VectorId): boolean {
    return this.nodes.has(id);
  }

  public removeNode(id: VectorId): void {
    this.nodes.delete(id);
  }

  public get size(): number {
    return this.nodes.size;
  }

  public getAllNodeIds(): VectorId[] {
    return Array.from(this.nodes);
  }

  public computeAverageDegree(allNodes: Map<VectorId, HNSWNode>): number {
    if (this.nodes.size === 0) return 0;
    let totalEdges = 0;
    for (const id of this.nodes) {
      const node = allNodes.get(id);
      if (node && node.neighbors[this.level]) {
        totalEdges += node.neighbors[this.level].length;
      }
    }
    return totalEdges / this.nodes.size;
  }
}

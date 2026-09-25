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
}

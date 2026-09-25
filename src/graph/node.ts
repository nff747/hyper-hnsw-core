import { Vector, VectorId } from '../types/index.js';

export class HNSWNode {
  public readonly id: VectorId;
  public readonly vector: Vector;
  public readonly level: number;
  public isDeleted = false;
  // neighbors per level: friends[level] = Array of neighbor IDs
  public readonly neighbors: VectorId[][];

  constructor(id: VectorId, vector: Vector, level: number) {
    this.id = id;
    this.vector = vector;
    this.level = level;
    this.neighbors = new Array<VectorId[]>(level + 1);
    for (let l = 0; l <= level; l++) {
      this.neighbors[l] = [];
    }
  }

  public getNeighbors(level: number): VectorId[] {
    return this.neighbors[level] || [];
  }

  public setNeighbors(level: number, neighbors: VectorId[]): void {
    this.neighbors[level] = neighbors;
  }

  public addNeighbor(level: number, neighborId: VectorId): void {
    if (!this.neighbors[level]) {
      this.neighbors[level] = [];
    }
    if (!this.neighbors[level].includes(neighborId)) {
      this.neighbors[level].push(neighborId);
    }
  }
}

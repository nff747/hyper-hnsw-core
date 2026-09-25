import { Vector, VectorId, DistanceFn, SearchResult } from '../types/index.js';
import { squaredEuclideanDistance } from '../distance/euclidean.js';

export class LinearScanIndex {
  private vectors: { id: VectorId; vector: Vector }[] = [];
  private distanceFn: DistanceFn;

  constructor(distanceFn: DistanceFn = squaredEuclideanDistance) {
    this.distanceFn = distanceFn;
  }

  public insert(id: VectorId, vector: Vector): void {
    this.vectors.push({ id, vector });
  }

  public search(query: Vector, k: number): SearchResult[] {
    const scored = this.vectors.map(item => {
      const dist = this.distanceFn(query, item.vector);
      return { id: item.id, distance: dist, score: 1.0 / (1.0 + dist) };
    });

    scored.sort((a, b) => a.distance - b.distance);
    return scored.slice(0, k);
  }
}

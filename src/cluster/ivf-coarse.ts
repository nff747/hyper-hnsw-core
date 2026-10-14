export class IvfCoarseQuantizer {
  private centroids: Float32Array[] = [];
  private invertedLists: Map<number, number[]> = new Map();

  constructor(centroids: Float32Array[]) {
    this.centroids = centroids;
    for (let i = 0; i < centroids.length; i++) {
      this.invertedLists.set(i, []);
    }
  }

  assign(vectorId: number, vector: Float32Array): number {
    let bestCluster = 0;
    let minSqDist = Infinity;

    for (let c = 0; c < this.centroids.length; c++) {
      const cent = this.centroids[c];
      let sum = 0;
      for (let i = 0; i < vector.length; i++) {
        const d = vector[i] - cent[i];
        sum += d * d;
      }
      if (sum < minSqDist) {
        minSqDist = sum;
        bestCluster = c;
      }
    }
    this.invertedLists.get(bestCluster)!.push(vectorId);
    return bestCluster;
  }

  getClusterMembers(clusterId: number): number[] {
    return this.invertedLists.get(clusterId) || [];
  }
}

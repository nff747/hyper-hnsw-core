export class GraphTopologyAnalyzer {
  static computeAverageDegree(adjacency: Map<number, number[]>): number {
    if (adjacency.size === 0) return 0;
    let totalEdges = 0;
    for (const edges of adjacency.values()) {
      totalEdges += edges.length;
    }
    return totalEdges / adjacency.size;
  }
}

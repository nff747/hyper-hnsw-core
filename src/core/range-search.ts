export class EpsilonRangeSearcher {
  static search(
    query: Float32Array,
    nodes: Array<{ id: number; vec: Float32Array }>,
    maxRadius: number
  ): number[] {
    const matched: number[] = [];
    for (const node of nodes) {
      let sumSq = 0;
      for (let i = 0; i < query.length; i++) {
        const d = query[i] - node.vec[i];
        sumSq += d * d;
      }
      const dist = Math.sqrt(sumSq);
      if (dist <= maxRadius) {
        matched.push(node.id);
      }
    }
    return matched;
  }
}

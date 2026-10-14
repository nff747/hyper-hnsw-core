export class BidirectionalEdgeValidator {
  static validate(adj: Map<number, number[]>): { valid: boolean; asymmetricEdges: [number, number][] } {
    const asymmetric: [number, number][] = [];
    for (const [u, nbrs] of adj.entries()) {
      for (const v of nbrs) {
        const backNbrs = adj.get(v);
        if (!backNbrs || !backNbrs.includes(u)) {
          asymmetric.push([u, v]);
        }
      }
    }
    return { valid: asymmetric.length === 0, asymmetricEdges: asymmetric };
  }
}

export class HybridReranker {
  static rerank(
    candidateIds: number[],
    getExactDistance: (id: number) => number,
    topK: number
  ): number[] {
    const scored = candidateIds.map(id => ({ id, dist: getExactDistance(id) }));
    scored.sort((a, b) => a.dist - b.dist);
    return scored.slice(0, topK).map(s => s.id);
  }
}

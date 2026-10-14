export class GraphCompactor {
  static compactAdjacency(
    adjacency: Map<number, number[]>,
    tombstones: Set<number>
  ): Map<number, number[]> {
    const compacted = new Map<number, number[]>();
    for (const [node, neighbors] of adjacency.entries()) {
      if (tombstones.has(node)) continue;
      compacted.set(
        node,
        neighbors.filter(nbr => !tombstones.has(nbr))
      );
    }
    return compacted;
  }
}

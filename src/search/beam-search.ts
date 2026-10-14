export class BeamSearchTraverser {
  static searchLayer(
    startNode: number,
    beamWidth: number,
    getNeighbors: (node: number) => number[],
    getDistance: (node: number) => number
  ): number[] {
    let currentBeam = [startNode];
    const visited = new Set<number>([startNode]);

    for (let step = 0; step < 10; step++) {
      const candidates: { node: number; dist: number }[] = [];
      for (const node of currentBeam) {
        for (const neighbor of getNeighbors(node)) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            candidates.push({ node: neighbor, dist: getDistance(neighbor) });
          }
        }
      }
      if (candidates.length === 0) break;
      candidates.sort((a, b) => a.dist - b.dist);
      currentBeam = candidates.slice(0, beamWidth).map(c => c.node);
    }
    return currentBeam;
  }
}

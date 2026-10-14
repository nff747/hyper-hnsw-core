export interface Candidate {
  id: number;
  distance: number;
}

export class RobustNeighborPruner {
  static selectNeighbors(
    candidates: Candidate[],
    maxM: number,
    distFn: (id1: number, id2: number) => number
  ): number[] {
    const sorted = [...candidates].sort((a, b) => a.distance - b.distance);
    const result: number[] = [];

    for (const c of sorted) {
      if (result.length >= maxM) break;
      let keep = true;
      for (const r of result) {
        if (distFn(c.id, r) < c.distance) {
          keep = false;
          break;
        }
      }
      if (keep) {
        result.push(c.id);
      }
    }
    return result;
  }
}

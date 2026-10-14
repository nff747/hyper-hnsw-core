import { describe, it, expect } from 'vitest';
import { RobustNeighborPruner } from '../src/graph/pruning';

describe('RobustNeighborPruner', () => {
  it('selects diverse neighbors avoiding clustered collinear points', () => {
    const candidates = [
      { id: 1, distance: 1.0 },
      { id: 2, distance: 1.1 },
      { id: 3, distance: 2.0 },
    ];
    // if 1 and 2 are distance 0.1 apart, 2 should be skipped in favor of diverse 3
    const distFn = (a: number, b: number) => {
      if ((a === 1 && b === 2) || (a === 2 && b === 1)) return 0.1;
      return 3.0;
    };

    const selected = RobustNeighborPruner.selectNeighbors(candidates, 2, distFn);
    expect(selected).toContain(1);
    expect(selected).toContain(3);
  });
});

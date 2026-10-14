import { describe, it, expect } from 'vitest';
import { GraphTopologyAnalyzer } from '../src/telemetry/graph-metrics';

describe('GraphTopologyAnalyzer', () => {
  it('computes average graph vertex degree', () => {
    const adj = new Map<number, number[]>();
    adj.set(1, [2, 3]);
    adj.set(2, [1]);
    adj.set(3, [1]);
    // total 4 edges across 3 vertices = 4/3
    expect(GraphTopologyAnalyzer.computeAverageDegree(adj)).toBeCloseTo(4 / 3);
  });
});

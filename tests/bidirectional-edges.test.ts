import { describe, it, expect } from 'vitest';
import { BidirectionalEdgeValidator } from '../src/graph/bidirectional-edges';

describe('BidirectionalEdgeValidator', () => {
  it('flags missing reciprocal edge links', () => {
    const adj = new Map<number, number[]>();
    adj.set(1, [2]);
    adj.set(2, []); // 2 does not point back to 1
    const res = BidirectionalEdgeValidator.validate(adj);
    expect(res.valid).toBe(false);
    expect(res.asymmetricEdges).toEqual([[1, 2]]);
  });
});

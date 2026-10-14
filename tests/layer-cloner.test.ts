import { describe, it, expect } from 'vitest';
import { LayerCloner } from '../src/index/layer-cloner';

describe('LayerCloner', () => {
  it('creates isolated copy that does not mutate source', () => {
    const orig = new Map([[1, [2, 3]]]);
    const clone = LayerCloner.cloneAdjacency(orig);
    clone.get(1)!.push(4);
    expect(orig.get(1)).toEqual([2, 3]);
  });
});

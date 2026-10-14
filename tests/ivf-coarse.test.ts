import { describe, it, expect } from 'vitest';
import { IvfCoarseQuantizer } from '../src/cluster/ivf-coarse';

describe('IvfCoarseQuantizer', () => {
  it('routes vectors to nearest cluster centroid', () => {
    const c1 = new Float32Array([0, 0]);
    const c2 = new Float32Array([10, 10]);
    const ivf = new IvfCoarseQuantizer([c1, c2]);

    ivf.assign(1, new Float32Array([1, 1]));
    ivf.assign(2, new Float32Array([9, 9]));

    expect(ivf.getClusterMembers(0)).toEqual([1]);
    expect(ivf.getClusterMembers(1)).toEqual([2]);
  });
});

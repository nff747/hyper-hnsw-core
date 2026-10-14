import { describe, it, expect } from 'vitest';
import { ResidualQuantizer } from '../src/quant/residual-quant';

describe('ResidualQuantizer', () => {
  it('computes exact delta residual array', () => {
    const orig = new Float32Array([10, 20]);
    const recon = new Float32Array([8, 22]);
    const res = ResidualQuantizer.computeResidual(orig, recon);
    expect(res[0]).toBe(2);
    expect(res[1]).toBe(-2);
  });
});

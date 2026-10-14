import { describe, it, expect } from 'vitest';
import { DynamicEfController } from '../src/index/dynamic-ef';

describe('DynamicEfController', () => {
  it('scales search budget proportionally with target recall and dataset scale', () => {
    const efSmall = DynamicEfController.computeEf(0.95, 32, 100);
    const efLarge = DynamicEfController.computeEf(0.99, 32, 1_000_000);
    expect(efLarge).toBeGreaterThan(efSmall);
  });
});

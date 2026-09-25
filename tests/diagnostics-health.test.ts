import { describe, it, expect } from 'vitest';
import { HyperHNSW } from '../src/core/hnsw.js';
import { checkGraphHealth } from '../src/diagnostics/health.js';
import { generateBatch } from '../src/utils/random.js';

describe('Graph Health Diagnostics', () => {
  it('reports healthy metrics for interconnected graph', () => {
    const dim = 8;
    const index = new HyperHNSW({ dimensions: dim, M: 8 });
    const vecs = generateBatch(25, dim);

    for (let i = 0; i < vecs.length; i++) {
      index.insert(i, vecs[i]);
    }

    const health = checkGraphHealth(index);
    expect(health.isHealthy).toBe(true);
    expect(health.activeNodes).toBe(25);
    expect(health.isolatedNodeCount).toBe(0);
    expect(health.averageDegreeLevel0).toBeGreaterThan(0);
  });
});

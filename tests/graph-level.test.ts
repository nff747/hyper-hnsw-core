import { describe, it, expect } from 'vitest';
import { ProbabilisticLevelGenerator } from '../src/graph/level-generator.js';

describe('ProbabilisticLevelGenerator', () => {
  it('generates predominantly level 0 with exponential decay', () => {
    const gen = new ProbabilisticLevelGenerator(16);
    let level0Count = 0;
    const trials = 1000;
    for (let i = 0; i < trials; i++) {
      const lvl = gen.generateLevel();
      expect(lvl).toBeGreaterThanOrEqual(0);
      if (lvl === 0) level0Count++;
    }
    // With M=16, level 0 should represent > 80% of items
    expect(level0Count / trials).toBeGreaterThan(0.75);
  });
});

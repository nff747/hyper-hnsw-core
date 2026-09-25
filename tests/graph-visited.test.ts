import { describe, it, expect } from 'vitest';
import { FastVisitedSet } from '../src/graph/visited-set.js';

describe('FastVisitedSet', () => {
  it('tracks visited IDs correctly and clears in O(1)', () => {
    const set = new FastVisitedSet(10);
    set.add(3);
    set.add(8);

    expect(set.has(3)).toBe(true);
    expect(set.has(8)).toBe(true);
    expect(set.has(2)).toBe(false);

    set.clear();
    expect(set.has(3)).toBe(false);
    expect(set.has(8)).toBe(false);

    set.add(2);
    expect(set.has(2)).toBe(true);
  });

  it('grows automatically when encountering IDs beyond capacity', () => {
    const set = new FastVisitedSet(5);
    set.add(100);
    expect(set.has(100)).toBe(true);
    expect(set.has(99)).toBe(false);
  });
});

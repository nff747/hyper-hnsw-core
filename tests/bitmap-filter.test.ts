import { describe, it, expect } from 'vitest';
import { BitmapFilter } from '../src/filter/bitmap-filter';

describe('BitmapFilter', () => {
  it('correctly sets and checks discrete integer bit indices', () => {
    const filter = new BitmapFilter(100);
    filter.set(42);
    expect(filter.test(42)).toBe(true);
    expect(filter.test(43)).toBe(false);
  });
});

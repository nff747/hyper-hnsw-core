import { describe, it, expect } from 'vitest';
import { HierarchicalEntryPointManager } from '../src/index/entry-point-manager';

describe('HierarchicalEntryPointManager', () => {
  it('updates entry point when higher level node arrives', () => {
    const ep = new HierarchicalEntryPointManager();
    ep.update(1, 0);
    expect(ep.getEntryPoint()).toEqual({ id: 1, level: 0 });

    ep.update(2, 2);
    expect(ep.getEntryPoint()).toEqual({ id: 2, level: 2 });

    ep.update(3, 1); // lower level, ignored
    expect(ep.getEntryPoint()).toEqual({ id: 2, level: 2 });
  });
});

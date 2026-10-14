import { describe, it, expect } from 'vitest';
import { ParallelBatchCoordinator } from '../src/batch/parallel-insert';

describe('ParallelBatchCoordinator', () => {
  it('partitions arrays into chunks of specified maximum size', () => {
    const items = [1, 2, 3, 4, 5, 6, 7];
    const chunks = ParallelBatchCoordinator.chunk(items, 3);
    expect(chunks.length).toBe(3);
    expect(chunks[0]).toEqual([1, 2, 3]);
    expect(chunks[2]).toEqual([7]);
  });
});

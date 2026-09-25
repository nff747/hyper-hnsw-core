import { describe, it, expect } from 'vitest';
import { BoundedPriorityQueue } from '../src/heap/bounded-queue.js';

describe('BoundedPriorityQueue', () => {
  it('retains only the K smallest elements', () => {
    const queue = new BoundedPriorityQueue(3);
    queue.insert({ id: 1, distance: 5.0 });
    queue.insert({ id: 2, distance: 1.0 });
    queue.insert({ id: 3, distance: 9.0 });
    queue.insert({ id: 4, distance: 0.5 });
    queue.insert({ id: 5, distance: 3.0 });

    const sorted = queue.toSortedArray();
    expect(sorted.length).toBe(3);
    expect(sorted.map(s => s.id)).toEqual([4, 2, 5]);
  });
});

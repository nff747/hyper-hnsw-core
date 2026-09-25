import { describe, it, expect } from 'vitest';
import { MinHeap } from '../src/heap/min-heap.js';

describe('MinHeap', () => {
  it('pops items in ascending distance order', () => {
    const heap = new MinHeap();
    heap.push({ id: 1, distance: 10.5 });
    heap.push({ id: 2, distance: 2.1 });
    heap.push({ id: 3, distance: 7.8 });
    heap.push({ id: 4, distance: 0.4 });

    expect(heap.pop()?.id).toBe(4);
    expect(heap.pop()?.id).toBe(2);
    expect(heap.pop()?.id).toBe(3);
    expect(heap.pop()?.id).toBe(1);
    expect(heap.pop()).toBeUndefined();
  });
});

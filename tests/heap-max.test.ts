import { describe, it, expect } from 'vitest';
import { MaxHeap } from '../src/heap/max-heap.js';

describe('MaxHeap', () => {
  it('pops items in descending distance order', () => {
    const heap = new MaxHeap();
    heap.push({ id: 1, distance: 10.5 });
    heap.push({ id: 2, distance: 2.1 });
    heap.push({ id: 3, distance: 7.8 });

    expect(heap.peek()?.id).toBe(1);
    expect(heap.pop()?.id).toBe(1);
    expect(heap.pop()?.id).toBe(3);
    expect(heap.pop()?.id).toBe(2);
  });
});

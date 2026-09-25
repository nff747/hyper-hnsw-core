import { HeapItem } from './base.js';
import { MaxHeap } from './max-heap.js';

export class BoundedPriorityQueue {
  private heap = new MaxHeap();
  public readonly capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  public get size(): number {
    return this.heap.size;
  }

  public insert(item: HeapItem): boolean {
    if (this.heap.size < this.capacity) {
      this.heap.push(item);
      return true;
    }
    const max = this.heap.peek();
    if (max && item.distance < max.distance) {
      this.heap.pop();
      this.heap.push(item);
      return true;
    }
    return false;
  }

  public getFurthestDistance(): number {
    return this.heap.peek()?.distance ?? Infinity;
  }

  public toSortedArray(): HeapItem[] {
    return this.heap.toSortedArray();
  }

  public clear(): void {
    this.heap.clear();
  }
}

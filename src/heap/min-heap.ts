import { HeapItem } from './base.js';

export class MinHeap {
  private data: HeapItem[] = [];

  public get size(): number {
    return this.data.length;
  }

  public push(item: HeapItem): void {
    this.data.push(item);
    this.siftUp(this.data.length - 1);
  }

  public pop(): HeapItem | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const bottom = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = bottom;
      this.siftDown(0);
    }
    return top;
  }

  public peek(): HeapItem | undefined {
    return this.data[0];
  }

  public clear(): void {
    this.data.length = 0;
  }

  private siftUp(index: number): void {
    let current = index;
    while (current > 0) {
      const parent = (current - 1) >> 1;
      if (this.data[current].distance < this.data[parent].distance) {
        const tmp = this.data[current];
        this.data[current] = this.data[parent];
        this.data[parent] = tmp;
        current = parent;
      } else {
        break;
      }
    }
  }

  private siftDown(index: number): void {
    let current = index;
    const len = this.data.length;
    while (true) {
      const left = (current << 1) + 1;
      const right = left + 1;
      let smallest = current;

      if (left < len && this.data[left].distance < this.data[smallest].distance) {
        smallest = left;
      }
      if (right < len && this.data[right].distance < this.data[smallest].distance) {
        smallest = right;
      }
      if (smallest !== current) {
        const tmp = this.data[current];
        this.data[current] = this.data[smallest];
        this.data[smallest] = tmp;
        current = smallest;
      } else {
        break;
      }
    }
  }
}

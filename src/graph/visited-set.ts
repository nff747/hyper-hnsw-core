import { VectorId } from '../types/index.js';

/**
 * Fast O(1) clearable visited set using version tags.
 * Avoids allocating new Set() instances on every single beam search traversal.
 */
export class FastVisitedSet {
  private visited: Uint32Array;
  private currentVersion = 1;

  constructor(initialCapacity = 10000) {
    this.visited = new Uint32Array(initialCapacity);
  }

  public clear(): void {
    this.currentVersion++;
    if (this.currentVersion === 0xFFFFFFFF) {
      this.visited.fill(0);
      this.currentVersion = 1;
    }
  }

  public has(id: VectorId): boolean {
    if (id >= this.visited.length) return false;
    return this.visited[id] === this.currentVersion;
  }

  public add(id: VectorId): void {
    if (id >= this.visited.length) {
      this.grow(id + 1);
    }
    this.visited[id] = this.currentVersion;
  }

  private grow(minCapacity: number): void {
    const newCapacity = Math.max(minCapacity, this.visited.length * 2);
    const newArr = new Uint32Array(newCapacity);
    newArr.set(this.visited);
    this.visited = newArr;
  }
}

import { Vector, VectorId } from '../types/index.js';
import { HyperHNSW } from './hnsw.js';

export interface BatchItem {
  id: VectorId;
  vector: Vector;
}

export function batchInsert(
  index: HyperHNSW,
  items: BatchItem[],
  onProgress?: (inserted: number, total: number) => void
): void {
  const total = items.length;
  for (let i = 0; i < total; i++) {
    index.insert(items[i].id, items[i].vector);
    if (onProgress && (i % 100 === 0 || i === total - 1)) {
      onProgress(i + 1, total);
    }
  }
}

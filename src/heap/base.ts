export interface HeapItem {
  id: number;
  distance: number;
}

export type Comparator<T> = (a: T, b: T) => number;

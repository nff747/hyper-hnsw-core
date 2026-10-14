export class LayerCloner {
  static cloneAdjacency(original: Map<number, number[]>): Map<number, number[]> {
    const cloned = new Map<number, number[]>();
    for (const [k, v] of original.entries()) {
      cloned.set(k, [...v]);
    }
    return cloned;
  }
}

export class ChebyshevDistance {
  static compute(a: ArrayLike<number>, b: ArrayLike<number>): number {
    let maxDiff = 0;
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) {
      const diff = Math.abs(a[i] - b[i]);
      if (diff > maxDiff) maxDiff = diff;
    }
    return maxDiff;
  }
}

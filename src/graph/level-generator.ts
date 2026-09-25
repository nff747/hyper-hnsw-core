export class ProbabilisticLevelGenerator {
  public readonly ml: number;

  constructor(M = 16, customMl?: number) {
    // Standard HNSW normalization factor: 1 / ln(M)
    this.ml = customMl ?? (1.0 / Math.log(M));
  }

  /**
   * Generates probabilistic level for new insertion using exponential decay.
   */
  public generateLevel(): number {
    const r = Math.max(1e-12, Math.random());
    const level = Math.floor(-Math.log(r) * this.ml);
    return Math.max(0, level);
  }
}

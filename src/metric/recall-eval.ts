export class TopKRecallEvaluator {
  static evaluate(groundTruthIds: number[], retrievedIds: number[], k: number): number {
    const truthSet = new Set(groundTruthIds.slice(0, k));
    let matches = 0;
    for (let i = 0; i < Math.min(k, retrievedIds.length); i++) {
      if (truthSet.has(retrievedIds[i])) {
        matches++;
      }
    }
    return matches / k;
  }
}

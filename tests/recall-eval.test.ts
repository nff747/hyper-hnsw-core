import { describe, it, expect } from 'vitest';
import { TopKRecallEvaluator } from '../src/metric/recall-eval';

describe('TopKRecallEvaluator', () => {
  it('computes exact recall percentage', () => {
    const truth = [1, 2, 3, 4, 5];
    const retrieved = [1, 99, 3, 4, 88];
    // 3 matches out of 5 = 60%
    expect(TopKRecallEvaluator.evaluate(truth, retrieved, 5)).toBeCloseTo(0.6);
  });
});

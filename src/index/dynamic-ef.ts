export class DynamicEfController {
  static computeEf(targetRecall: number, baseEf: number, dataSize: number): number {
    const sizeMultiplier = Math.max(1.0, Math.log10(Math.max(10, dataSize)));
    const recallFactor = Math.pow(targetRecall, 3.0);
    return Math.max(baseEf, Math.round(baseEf * sizeMultiplier * recallFactor));
  }
}

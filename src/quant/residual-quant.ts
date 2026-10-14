export class ResidualQuantizer {
  static computeResidual(original: Float32Array, reconstructed: Float32Array): Float32Array {
    const res = new Float32Array(original.length);
    for (let i = 0; i < original.length; i++) {
      res[i] = original[i] - reconstructed[i];
    }
    return res;
  }
}

export class ProductQuantizer {
  readonly numSubvectors: number;
  readonly subDim: number;

  constructor(dim: number, numSubvectors = 4) {
    this.numSubvectors = numSubvectors;
    this.subDim = Math.floor(dim / numSubvectors);
  }

  encodeSubvectors(v: Float32Array): Uint8Array {
    const codes = new Uint8Array(this.numSubvectors);
    for (let s = 0; s < this.numSubvectors; s++) {
      let sum = 0;
      for (let d = 0; d < this.subDim; d++) {
        sum += v[s * this.subDim + d];
      }
      codes[s] = Math.max(0, Math.min(255, Math.floor(sum % 256)));
    }
    return codes;
  }
}

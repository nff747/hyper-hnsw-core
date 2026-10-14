export class HammingDistance {
  static compute(a: Uint32Array, b: Uint32Array): number {
    let dist = 0;
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) {
      let xor = a[i] ^ b[i];
      // popcount
      xor = xor - ((xor >>> 1) & 0x55555555);
      xor = (xor & 0x33333333) + ((xor >>> 2) & 0x33333333);
      dist += (((xor + (xor >>> 4)) & 0x0F0F0F0F) * 0x01010101) >>> 24;
    }
    return dist;
  }
}

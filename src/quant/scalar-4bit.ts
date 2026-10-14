export class Scalar4BitQuantizer {
  static quantize(v: Float32Array): { packed: Uint8Array; min: number; scale: number } {
    let min = Infinity, max = -Infinity;
    for (let i = 0; i < v.length; i++) {
      if (v[i] < min) min = v[i];
      if (v[i] > max) max = v[i];
    }
    const scale = Math.max(1e-6, (max - min) / 15);
    const packed = new Uint8Array(Math.ceil(v.length / 2));

    for (let i = 0; i < v.length; i++) {
      const q = Math.max(0, Math.min(15, Math.round((v[i] - min) / scale)));
      const byteIdx = Math.floor(i / 2);
      if (i % 2 === 0) {
        packed[byteIdx] |= (q & 0x0F);
      } else {
        packed[byteIdx] |= ((q & 0x0F) << 4);
      }
    }
    return { packed, min, scale };
  }

  static dequantize(packed: Uint8Array, length: number, min: number, scale: number): Float32Array {
    const out = new Float32Array(length);
    for (let i = 0; i < length; i++) {
      const byteIdx = Math.floor(i / 2);
      const q = (i % 2 === 0) ? (packed[byteIdx] & 0x0F) : ((packed[byteIdx] >> 4) & 0x0F);
      out[i] = min + q * scale;
    }
    return out;
  }
}

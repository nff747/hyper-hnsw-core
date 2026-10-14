export class VectorNormalizer {
  static normalize(v: Float32Array): Float32Array {
    let normSq = 0;
    for (let i = 0; i < v.length; i++) {
      normSq += v[i] * v[i];
    }
    const invNorm = normSq > 0 ? 1.0 / Math.sqrt(normSq) : 0.0;
    const out = new Float32Array(v.length);
    for (let i = 0; i < v.length; i++) {
      out[i] = v[i] * invNorm;
    }
    return out;
  }
}

export const HNSW_MAGIC = 0x484E5357; // 'HNSW'

export interface IndexMetadata {
  magic: number;
  dim: number;
  metric: number;
  maxElements: number;
  numLayers: number;
}

export class MmapFormatHeader {
  static serialize(meta: IndexMetadata): Uint8Array {
    const buf = new Uint8Array(20);
    const view = new DataView(buf.buffer);
    view.setUint32(0, meta.magic, true);
    view.setUint32(4, meta.dim, true);
    view.setUint32(8, meta.metric, true);
    view.setUint32(12, meta.maxElements, true);
    view.setUint32(16, meta.numLayers, true);
    return buf;
  }

  static deserialize(buf: Uint8Array): IndexMetadata {
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return {
      magic: view.getUint32(0, true),
      dim: view.getUint32(4, true),
      metric: view.getUint32(8, true),
      maxElements: view.getUint32(12, true),
      numLayers: view.getUint32(16, true),
    };
  }
}

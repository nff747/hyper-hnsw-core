import { HyperHNSW } from '../core/hnsw.js';
import { HNSW_MAGIC_BYTES, HNSW_FORMAT_VERSION, MetricCode } from './format.js';

export function serializeToBuffer(index: HyperHNSW): Uint8Array {
  // Compute required buffer size
  // Header: 12 uint32 fields = 48 bytes
  let totalBytes = 48;
  const dim = index.dimensions;

  for (const [_, node] of index.nodes) {
    // Per node:
    // id (4), level (4), isDeleted (1), pad (3) = 12 bytes
    // vector: dim * 4 bytes
    // per level: count (4) + neighbors (count * 4)
    totalBytes += 12 + (dim * 4);
    for (let l = 0; l <= node.level; l++) {
      totalBytes += 4 + ((node.neighbors[l]?.length ?? 0) * 4);
    }
  }

  const buffer = new Uint8Array(totalBytes);
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);

  // Write header
  view.setUint32(0, HNSW_MAGIC_BYTES, true);
  view.setUint32(4, HNSW_FORMAT_VERSION, true);
  view.setUint32(8, dim, true);
  view.setUint32(12, MetricCode.SquaredEuclidean, true);
  view.setUint32(16, index.M, true);
  view.setUint32(20, index.M0, true);
  view.setUint32(24, index.efConstruction, true);
  view.setUint32(28, index.efSearch, true);
  view.setUint32(32, index.nodes.size, true);
  view.setInt32(36, index.entryPointId ?? -1, true);
  view.setInt32(40, index.maxLevel, true);
  view.setUint32(44, 0, true); // CRC32 placeholder

  let offset = 48;
  for (const [id, node] of index.nodes) {
    view.setUint32(offset, id, true);
    view.setUint32(offset + 4, node.level, true);
    view.setUint8(offset + 8, node.isDeleted ? 1 : 0);
    offset += 12;

    // Vector
    for (let d = 0; d < dim; d++) {
      view.setFloat32(offset + (d * 4), node.vector[d], true);
    }
    offset += dim * 4;

    // Neighbors per level
    for (let l = 0; l <= node.level; l++) {
      const neighbors = node.neighbors[l] || [];
      view.setUint32(offset, neighbors.length, true);
      offset += 4;
      for (let n = 0; n < neighbors.length; n++) {
        view.setUint32(offset + (n * 4), neighbors[n], true);
      }
      offset += neighbors.length * 4;
    }
  }

  return buffer;
}

import { HyperHNSW } from '../core/hnsw.js';
import { HNSWNode } from '../graph/node.js';
import { HNSW_MAGIC_BYTES, HNSW_FORMAT_VERSION, MetricCode } from './format.js';

export function serializeToBuffer(index: HyperHNSW): Uint8Array {
  let totalBytes = 48;
  const dim = index.dimensions;

  for (const [_, node] of index.nodes) {
    totalBytes += 12 + (dim * 4);
    for (let l = 0; l <= node.level; l++) {
      totalBytes += 4 + ((node.neighbors[l]?.length ?? 0) * 4);
    }
  }

  const buffer = new Uint8Array(totalBytes);
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);

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
  view.setUint32(44, 0, true);

  let offset = 48;
  for (const [id, node] of index.nodes) {
    view.setUint32(offset, id, true);
    view.setUint32(offset + 4, node.level, true);
    view.setUint8(offset + 8, node.isDeleted ? 1 : 0);
    offset += 12;

    for (let d = 0; d < dim; d++) {
      view.setFloat32(offset + (d * 4), node.vector[d], true);
    }
    offset += dim * 4;

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

export function deserializeFromBuffer(buffer: Uint8Array): HyperHNSW {
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const magic = view.getUint32(0, true);
  if (magic !== HNSW_MAGIC_BYTES) {
    throw new Error('Invalid HNSW binary format: magic header mismatch');
  }

  const dim = view.getUint32(8, true);
  const M = view.getUint32(16, true);
  const efConstruction = view.getUint32(24, true);
  const efSearch = view.getUint32(28, true);
  const count = view.getUint32(32, true);
  const entryPointId = view.getInt32(36, true);
  const maxLevel = view.getInt32(40, true);

  const index = new HyperHNSW({
    dimensions: dim,
    M,
    efConstruction,
    efSearch
  });

  index.entryPointId = entryPointId === -1 ? null : entryPointId;
  index.maxLevel = maxLevel;

  let offset = 48;
  for (let i = 0; i < count; i++) {
    const id = view.getUint32(offset, true);
    const level = view.getUint32(offset + 4, true);
    const isDeleted = view.getUint8(offset + 8) === 1;
    offset += 12;

    const vector = new Float32Array(dim);
    for (let d = 0; d < dim; d++) {
      vector[d] = view.getFloat32(offset + (d * 4), true);
    }
    offset += dim * 4;

    const node = new HNSWNode(id, vector, level);
    node.isDeleted = isDeleted;

    for (let l = 0; l <= level; l++) {
      index.ensureLayer(l).addNode(id);
      const neighborCount = view.getUint32(offset, true);
      offset += 4;
      const neighbors: number[] = [];
      for (let n = 0; n < neighborCount; n++) {
        neighbors.push(view.getUint32(offset + (n * 4), true));
      }
      offset += neighborCount * 4;
      node.setNeighbors(l, neighbors);
    }

    index.nodes.set(id, node);
  }

  return index;
}

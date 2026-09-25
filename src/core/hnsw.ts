import { Vector, VectorId, HNSWConfig, DistanceFn, IndexStats } from '../types/index.js';
import { getDistanceFunction } from '../distance/index.js';
import { HNSWNode } from '../graph/node.js';
import { GraphLayer } from '../graph/layer.js';
import { ProbabilisticLevelGenerator } from '../graph/level-generator.js';
import { FastVisitedSet } from '../graph/visited-set.js';

export class HyperHNSW {
  public readonly dimensions: number;
  public readonly M: number;
  public readonly M0: number;
  public readonly efConstruction: number;
  public readonly efSearch: number;
  public readonly distanceFn: DistanceFn;

  public entryPointId: VectorId | null = null;
  public maxLevel = -1;

  public readonly nodes = new Map<VectorId, HNSWNode>();
  public readonly layers: GraphLayer[] = [];
  public readonly levelGenerator: ProbabilisticLevelGenerator;
  public readonly visitedSet = new FastVisitedSet();

  constructor(config: HNSWConfig) {
    this.dimensions = config.dimensions;
    this.M = config.M ?? 16;
    this.M0 = 2 * this.M;
    this.efConstruction = config.efConstruction ?? 64;
    this.efSearch = config.efSearch ?? 32;
    this.distanceFn = getDistanceFunction(config.metric ?? 'squared-euclidean');
    this.levelGenerator = new ProbabilisticLevelGenerator(this.M, config.ml);
  }

  public get count(): number {
    return this.nodes.size;
  }

  public ensureLayer(level: number): GraphLayer {
    while (this.layers.length <= level) {
      this.layers.push(new GraphLayer(this.layers.length));
    }
    return this.layers[level];
  }
}

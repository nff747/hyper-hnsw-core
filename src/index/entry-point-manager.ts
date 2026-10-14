export class HierarchicalEntryPointManager {
  private entryPointId: number | null = null;
  private maxLevel = -1;

  update(id: number, level: number): void {
    if (this.entryPointId === null || level > this.maxLevel) {
      this.entryPointId = id;
      this.maxLevel = level;
    }
  }

  getEntryPoint(): { id: number | null; level: number } {
    return { id: this.entryPointId, level: this.maxLevel };
  }
}

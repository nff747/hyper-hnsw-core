export class BitmapFilter {
  private words: Uint32Array;

  constructor(maxSize = 1024) {
    this.words = new Uint32Array(Math.ceil(maxSize / 32));
  }

  set(id: number): void {
    const word = Math.floor(id / 32);
    const bit = id % 32;
    this.words[word] |= (1 << bit);
  }

  test(id: number): boolean {
    const word = Math.floor(id / 32);
    const bit = id % 32;
    return (this.words[word] & (1 << bit)) !== 0;
  }
}

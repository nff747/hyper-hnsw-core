export class ChecksumGuard {
  static computeChecksum(data: Uint8Array): number {
    let cs = 0;
    for (let i = 0; i < data.length; i++) {
      cs = (cs + data[i]) >>> 0;
    }
    return cs;
  }
}

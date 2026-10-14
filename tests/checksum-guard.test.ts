import { describe, it, expect } from 'vitest';
import { ChecksumGuard } from '../src/storage/checksum-guard';

describe('ChecksumGuard', () => {
  it('computes rolling checksum over bytes', () => {
    const bytes = new Uint8Array([10, 20, 30]);
    expect(ChecksumGuard.computeChecksum(bytes)).toBe(60);
  });
});

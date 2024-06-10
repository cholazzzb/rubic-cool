import { createSnapshot } from '@/shared/debug';
import { Cubes } from './util';

export class Snapshot {
  private snapshot = new Map<string, number>();

  checkInfiniteLoop(cubes: Cubes) {
    const ss = createSnapshot(cubes);
    const cnt = this.snapshot.get(ss);
    if (cnt) {
      this.snapshot.set(ss, cnt + 1);
      if (cnt === 3) {
        throw Error('infinite loop');
      }
    } else {
      this.snapshot.set(ss, 1);
    }
  }
}

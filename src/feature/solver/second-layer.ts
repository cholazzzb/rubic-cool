import { MOVE } from '@/shared/enum';
import { TopLayerPosition } from '../cube';
import { LayerSolver } from './interface';
import {
  findMoves,
  findPositionAndTarget,
  findSwapMoves,
} from './second-layer/finder';
import { Cubes, isCubeOnTarget } from './util';

export class SecondLayerSolver implements LayerSolver {
  private getCubes: () => Cubes;

  constructor(getCubes: () => Cubes) {
    this.getCubes = getCubes;
  }

  isSolved(): boolean {
    const cubes = this.getCubes();

    if (!isCubeOnTarget('0-1-0', cubes[0][1][0])) {
      return false;
    }
    if (!isCubeOnTarget('2-1-0', cubes[2][1][0])) {
      return false;
    }
    if (!isCubeOnTarget('0-1-2', cubes[0][1][2])) {
      return false;
    }
    if (!isCubeOnTarget('2-1-2', cubes[2][1][2])) {
      return false;
    }

    return true;
  }

  findSolution(): Array<MOVE> {
    const cubes = this.getCubes();

    const result = findPositionAndTarget(cubes);
    if (result === null) return [];

    const [x, y, z] = result.position;
    const rotation = cubes[x][y][z].getMesh().rotation;
    // swap rotation
    if (result.isSwap) {
      return findSwapMoves(result.position, cubes);
    }
    if (result.position[1] === 2) {
      return findMoves(
        rotation,
        result.position as TopLayerPosition,
        result.target,
      );
    }
    // swap position
    return findSwapMoves(result.position, cubes);
  }
}

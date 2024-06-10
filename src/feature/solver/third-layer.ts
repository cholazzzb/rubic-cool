import { MOVE } from '@/shared/enum';
import { CubeName } from '../cube';
import { LayerSolver } from './interface';
import { Snapshot } from './snapshot';
import { solveTopColors } from './third-layer/color';
import { alignCorners } from './third-layer/corner';
import { createCross } from './third-layer/cross';
import { solveEdges } from './third-layer/edge';
import { Cubes, isCubeOnTarget } from './util';

export class ThirdLayerSolver extends Snapshot implements LayerSolver {
  private getCubes: () => Cubes;

  constructor(getCubes: () => Cubes) {
    super();
    this.getCubes = getCubes;
  }

  isSolved(): boolean {
    const cubes = this.getCubes();
    this.checkInfiniteLoop(cubes);
    for (let x = 0; x < 3; x++) {
      for (let z = 0; z < 3; z++) {
        const cube = cubes[x][2][z];

        if (
          notCenter(x, z) &&
          !isCubeOnTarget(`${x}-2-${z}` as CubeName, cube)
        ) {
          return false;
        }
      }
    }
    return true;
  }

  findSolution(): Array<MOVE> {
    const cubes = this.getCubes();

    const crossMoves = createCross(cubes);
    if (crossMoves.length > 0) return crossMoves;

    const cornerMoves = alignCorners(cubes);
    if (cornerMoves.length > 0) return cornerMoves;

    const topColorMoves = solveTopColors(cubes);
    if (topColorMoves.length > 0) return topColorMoves;

    const edgesMoves = solveEdges(cubes);
    if (edgesMoves.length > 0) return edgesMoves;

    throw Error(`third layer find solution: couldn't find the solution`);
  }
}

function notCenter(x: number, z: number) {
  return !(x === 1 && z === 1);
}

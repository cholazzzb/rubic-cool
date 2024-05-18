import { MOVE } from '@/shared/enum';
import { LayerSolver } from './interface';
import { Cubes } from './util';

export class SecondLayerSolver implements LayerSolver {
  private getCubes: () => Cubes;

  constructor(getCubes: () => Cubes) {
    this.getCubes = getCubes;
  }

  isSolved(): boolean {
    return true;
  }

  findSolution(): Array<MOVE> {
    this.getCubes;
    return [];
  }
}

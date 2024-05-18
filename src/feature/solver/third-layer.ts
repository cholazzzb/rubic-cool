import { MOVE } from '@/shared/enum';
import { LayerSolver } from './interface';

export class ThirdLayerSolver implements LayerSolver {
  isSolved(): boolean {
    return true;
  }

  findSolution(): Array<MOVE> {
    return [];
  }
}

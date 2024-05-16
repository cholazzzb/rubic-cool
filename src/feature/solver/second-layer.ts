import { MOVE } from '@/shared/enum';
import { LayerSolver } from './interface';

export class SecondLayerSolver implements LayerSolver {
  isSolved(): boolean {
    return true;
  }

  findSolution(): Array<MOVE> {
    return [];
  }
}

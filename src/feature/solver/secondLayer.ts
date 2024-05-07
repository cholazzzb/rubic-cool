import { MOVE } from '../controller/half-curve';
import { LayerSolver } from './interface';

export class SecondLayerSolver implements LayerSolver {
  isSolved(): boolean {
    return true;
  }

  findSolution(): MOVE[] {
    return [];
  }
}

import { MOVE } from '@/shared/enum';

export interface LayerSolver {
  isSolved(): boolean;
  findSolution(): Array<MOVE>;
}

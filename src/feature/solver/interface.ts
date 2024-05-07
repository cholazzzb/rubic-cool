import { MOVE } from '../controller/half-curve';

export interface LayerSolver {
  isSolved(): boolean;
  findSolution(): Array<MOVE>;
}

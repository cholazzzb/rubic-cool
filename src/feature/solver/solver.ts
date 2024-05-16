import { MOVE } from '@/shared/enum';
import { waitAnimation } from '../animator';
import { FirstLayerSolver } from './first-layer';
import { SecondLayerSolver } from './second-layer';
import { ThirdLayerSolver } from './third-layer';
import { Cubes } from './util';

export function solver(
  getCubes: () => Cubes,
  rotateByMove: (move: MOVE) => Promise<void>,
) {
  const queue: Array<MOVE> = [];

  const firstLayer = new FirstLayerSolver(getCubes);
  const secondLayer = new SecondLayerSolver();
  const thirdLayer = new ThirdLayerSolver();

  function searchMove() {
    if (!firstLayer.isSolved()) {
      const moves = firstLayer.findSolution();
      queue.push(...moves);
    } else if (!secondLayer.isSolved()) {
      const moves = secondLayer.findSolution();
      queue.push(...moves);
    } else if (!thirdLayer.isSolved()) {
      const moves = thirdLayer.findSolution();
      queue.push(...moves);
    }
  }
  searchMove();

  async function solve() {
    while (queue.length > 0) {
      const move = queue.shift()!;
      await rotateByMove(move);
      await waitAnimation();

      if (queue.length === 0) {
        searchMove();
      }
    }
  }

  return {
    solve,
  };
}

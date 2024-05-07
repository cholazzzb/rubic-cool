import { Queue } from '@/shared/queue';
import { waitAnimation } from '../animator';
import { MOVE } from '../controller/half-curve';
import { FirstLayerSolver } from './firstLayer';
import { SecondLayerSolver } from './secondLayer';
import { ThirdLayerSolver } from './thirdLayer';
import { Cubes } from './util';

export function solver(
  getCubes: () => Cubes,
  rotateByMove: (move: MOVE) => Promise<void>,
) {
  const queue = new Queue<MOVE>();

  const firstLayer = new FirstLayerSolver(getCubes);
  const secondLayer = new SecondLayerSolver();
  const thirdLayer = new ThirdLayerSolver();

  function searchMove() {
    if (!firstLayer.isSolved()) {
      const moves = firstLayer.findSolution();
      moves.forEach((mv) => queue.enqueue(mv));
    } else if (!secondLayer.isSolved()) {
      const moves = secondLayer.findSolution();
      moves.forEach((mv) => queue.enqueue(mv));
    } else if (!thirdLayer.isSolved()) {
      const moves = thirdLayer.findSolution();
      moves.forEach((mv) => queue.enqueue(mv));
    }
  }
  searchMove();

  async function solve() {
    while (!queue.isEmpty()) {
      const move = queue.dequeue()!;
      await rotateByMove(move);
      await waitAnimation();
      searchMove();
    }
  }

  return {
    solve,
  };
}

import { Vector3 } from 'three';

import { Cube, TopLayerCubes, cubeNameToPosition } from '@/feature/cube';
import { MOVE } from '@/shared/enum';
import { Cubes, vectorAfterRotation } from '../util';

const topEdges: Array<TopLayerCubes> = [`1-2-0`, '1-2-2', '0-2-1', '2-2-1'];

export function createCross(cubes: Cubes): Array<MOVE> {
  const facingTops = topEdges.reduce((all, te) => {
    const [x, y, z] = cubeNameToPosition(te);
    isFacingTop(cubes[x][y][z]) && all.add(te);
    return all;
  }, new Set<TopLayerCubes>());

  if (facingTops.size === 4) return [] as Array<MOVE>;
  if (facingTops.size === 0) {
    return [...moveAlgorithm, MOVE.TOP_C, ...moveAlgorithm, ...moveAlgorithm];
  }

  // l Shape
  if (facingTops.has(`1-2-0`) && facingTops.has(`1-2-2`)) {
    return [...moveAlgorithm, ...moveAlgorithm];
  }

  if (facingTops.has(`0-2-1`) && facingTops.has(`2-2-1`)) {
    return [MOVE.TOP_C, ...moveAlgorithm, ...moveAlgorithm];
  }

  // V Shape
  if (facingTops.has(`0-2-1`) && facingTops.has(`1-2-2`)) {
    return [MOVE.TOP_CC, ...moveAlgorithm, ...moveAlgorithm];
  }

  if (facingTops.has(`2-2-1`) && facingTops.has(`1-2-2`)) {
    return [MOVE.TOP_C, MOVE.TOP_C, ...moveAlgorithm];
  }

  if (facingTops.has(`2-2-1`) && facingTops.has(`1-2-0`)) {
    return [MOVE.TOP_C, ...moveAlgorithm];
  }

  if (facingTops.has(`0-2-1`) && facingTops.has(`1-2-0`)) {
    return moveAlgorithm;
  }

  throw Error('third layer - createCross');
}

export const moveAlgorithm: Array<MOVE> = [
  MOVE.RIGHT_C,
  MOVE.TOP_C,
  MOVE.FRONT_C,
  MOVE.TOP_CC,
  MOVE.FRONT_CC,
  MOVE.RIGHT_CC,
];

function isFacingTop(cube: Cube) {
  const topVector = new Vector3(0, 1, 0);
  const afterRotation = vectorAfterRotation(topVector, cube.getMesh().rotation);

  return afterRotation.equals(topVector);
}

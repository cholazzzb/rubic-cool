import { Vector3 } from 'three';

import { MOVE } from '@/shared/enum';
import { Cubes, isCubeOnTarget, vectorAfterRotation } from '../util';
import { Cube } from '@/feature/cube';

export function solveTopColors(cubes: Cubes): Array<MOVE> {
  if (!isPivotSolved(cubes)) {
    return [
      MOVE.TOP_C,
      MOVE.TOP_C,
      ...moveAlgorithmRight,
      MOVE.TOP_C,
      MOVE.TOP_C,
    ];
  }

  // Solved
  if (isTopCubesSolved(cubes)) {
    return [] as Array<MOVE>;
  }

  if (
    checkTopColorSolved(cubes[0][2][2]) &&
    !checkTopColorSolved(cubes[2][2][0]) &&
    !checkTopColorSolved(cubes[2][2][2])
  ) {
    return moveAlgorithmLeft;
  }

  return moveAlgorithmRight;
}

/**
 * @description
 * this algorithm use 0-2-0 cube as a pivot
 */
function isPivotSolved(cubes: Cubes): boolean {
  return isCubeOnTarget(`0-2-0`, cubes[0][2][0]);
}

function checkTopColorSolved(cube: Cube): boolean {
  const topVector = new Vector3(0, 1, 0);

  const afterRotation = vectorAfterRotation(topVector, cube.getMesh().rotation);

  return afterRotation.equals(topVector);
}

function isTopCubesSolved(cubes: Cubes): boolean {
  return (
    checkTopColorSolved(cubes[2][2][0]) &&
    checkTopColorSolved(cubes[0][2][2]) &&
    checkTopColorSolved(cubes[2][2][2])
  );
}

export const moveAlgorithmLeft: Array<MOVE> = [
  MOVE.LEFT_CC,
  MOVE.TOP_CC,
  MOVE.LEFT_C,
  MOVE.TOP_CC,
  MOVE.LEFT_CC,
  MOVE.TOP_C,
  MOVE.TOP_C,
  MOVE.LEFT_C,
  MOVE.TOP_C,
  MOVE.TOP_C,
];

export const moveAlgorithmRight: Array<MOVE> = [
  MOVE.RIGHT_C,
  MOVE.TOP_C,
  MOVE.RIGHT_CC,
  MOVE.TOP_C,
  MOVE.RIGHT_C,
  MOVE.TOP_C,
  MOVE.TOP_C,
  MOVE.RIGHT_CC,
  MOVE.TOP_C,
  MOVE.TOP_C,
];

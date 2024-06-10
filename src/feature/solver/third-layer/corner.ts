import { MOVE } from '@/shared/enum';
import { Cubes } from '../util';

export function alignCorners(cubes: Cubes): Array<MOVE> {
  if (!isOnPivot(cubes)) return [MOVE.TOP_C];

  // Solved
  if (
    `2-2-0` === cubes[2][2][0].getName() &&
    `2-2-2` === cubes[2][2][2].getName() &&
    `0-2-2` === cubes[0][2][2].getName()
  ) {
    return [] as Array<MOVE>;
  }

  // This is my most simplified recursive algorithm
  if (
    `0-2-2` === cubes[0][2][2].getName() &&
    `2-2-0` !== cubes[2][2][0].getName() &&
    `2-2-2` !== cubes[2][2][2].getName()
  ) {
    return moveAlgorithmRight;
  }

  if (
    `2-2-0` === cubes[2][2][0].getName() &&
    `2-2-2` !== cubes[2][2][2].getName() &&
    `0-2-2` !== cubes[0][2][2].getName()
  ) {
    return [MOVE.TOP_C, ...moveAlgorithmRight];
  }

  return moveAlgorithmLeft;
}

/**
 * @description
 * this algorithm use 0-2-0 cube as a pivot
 */
function isOnPivot(cubes: Cubes): boolean {
  return '0-2-0' === cubes[0][2][0].getName();
}

export const moveAlgorithmLeft: Array<MOVE> = [
  MOVE.LEFT_CC,
  MOVE.RIGHT_C,
  MOVE.TOP_CC,
  MOVE.LEFT_C,
  MOVE.TOP_C,
  MOVE.RIGHT_CC,
  MOVE.TOP_CC,
  MOVE.LEFT_CC,
  MOVE.TOP_C,
  MOVE.LEFT_C,
];

export const moveAlgorithmRight: Array<MOVE> = [
  MOVE.LEFT_CC,
  MOVE.RIGHT_C,
  MOVE.TOP_C,
  MOVE.RIGHT_CC,
  MOVE.TOP_CC,
  MOVE.LEFT_C,
  MOVE.TOP_C,
  MOVE.RIGHT_C,
  MOVE.TOP_CC,
  MOVE.RIGHT_CC,
];

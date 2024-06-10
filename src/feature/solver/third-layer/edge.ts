import { MOVE } from '@/shared/enum';
import { Cubes, isCubeOnTarget } from '../util';

export function solveEdges(cubes: Cubes): Array<MOVE> {
  if (isAllEdgesSolved(cubes)) {
    return [] as Array<MOVE>;
  }

  if (isFrontFaceSolved(cubes)) {
    return [
      MOVE.TOP_C,
      MOVE.TOP_C,
      ...moveAlgorithmRight,
      MOVE.TOP_CC,
      MOVE.TOP_CC,
    ];
  }

  if (!isBackFaceSolved(cubes)) {
    return [MOVE.TOP_C, ...moveAlgorithmRight, MOVE.TOP_CC];
  }

  return moveAlgorithmLeft;
}

function isFrontFaceSolved(cubes: Cubes): boolean {
  return isCubeOnTarget(`1-2-2`, cubes[1][2][2]);
}

function isBackFaceSolved(cubes: Cubes): boolean {
  return isCubeOnTarget(`1-2-0`, cubes[1][2][0]);
}

function isAllEdgesSolved(cubes: Cubes): boolean {
  return (
    isCubeOnTarget(`1-2-0`, cubes[1][2][0]) &&
    isCubeOnTarget(`1-2-2`, cubes[1][2][2]) &&
    isCubeOnTarget(`0-2-1`, cubes[0][2][1]) &&
    isCubeOnTarget(`2-2-1`, cubes[2][2][1])
  );
}

export const moveAlgorithmLeft: Array<MOVE> = [
  MOVE.LEFT_C,
  MOVE.TOP_C,
  MOVE.LEFT_CC,
  MOVE.TOP_C,
  MOVE.LEFT_C,
  MOVE.TOP_C,
  MOVE.TOP_C,
  MOVE.LEFT_CC,
  MOVE.TOP_CC,
  MOVE.LEFT_CC,
  MOVE.TOP_CC,
  MOVE.LEFT_C,
  MOVE.TOP_CC,
  MOVE.LEFT_CC,
  MOVE.TOP_C,
  MOVE.TOP_C,
  MOVE.LEFT_C,
  MOVE.TOP_C,
];

export const moveAlgorithmRight: Array<MOVE> = [
  MOVE.RIGHT_CC,
  MOVE.TOP_CC,
  MOVE.RIGHT_C,
  MOVE.TOP_CC,
  MOVE.RIGHT_CC,
  MOVE.TOP_C,
  MOVE.TOP_C,
  MOVE.RIGHT_C,
  MOVE.TOP_C,
  MOVE.RIGHT_C,
  MOVE.TOP_C,
  MOVE.RIGHT_CC,
  MOVE.TOP_C,
  MOVE.RIGHT_C,
  MOVE.TOP_C,
  MOVE.TOP_C,
  MOVE.RIGHT_CC,
  MOVE.TOP_CC,
];

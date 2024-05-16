import { CubeName, Position } from '@/feature/cube';
import { shuffleArray } from '@/shared/array';
import { FACE, MOVE } from '@/shared/enum';

export type FirstLayerCorner = '0-0-0' | '2-0-0' | '0-0-2' | '2-0-2';

export function randomFlc() {
  /**
   * @description flc: First Layer Corners
   */
  const flc: Array<FirstLayerCorner> = ['0-0-0', '2-0-0', '0-0-2', '2-0-2'];
  return shuffleArray(flc);
}

export function alignTopBottomEdge(
  currentPosition: Position,
  targetPosition: Position,
): {
  moves: Array<MOVE>;
  position: Position;
} {
  const clockwiseCircularArray: Array<Position> = [
    [0, 0, 0],
    [0, 0, 2],
    [2, 0, 2],
    [2, 0, 0],
  ];

  const currentIdx = clockwiseCircularArray.findIndex(
    (item) => item[0] === currentPosition[0] && item[2] === currentPosition[2],
  );

  const targetIdx = clockwiseCircularArray.findIndex(
    (item) => item[0] === targetPosition[0] && item[2] === targetPosition[2],
  );

  const moves: Array<MOVE> = (() => {
    let delta = targetIdx - currentIdx;
    if (delta === 3) delta = -1;
    if (delta === -3) delta = 1;

    if (delta > 0) {
      return Array(delta)
        .fill(null)
        .map(() => MOVE.TOP_C);
    } else {
      return Array(delta * -1)
        .fill(null)
        .map(() => MOVE.TOP_CC);
    }
  })();

  return {
    moves,
    position: targetPosition,
  };
}

export function movesWhenCurrentOnTop(
  cubeFace: FACE,
  position: Position,
  targetName: CubeName,
  moves: Array<MOVE>,
): Array<MOVE> {
  if (cubeFace === FACE.TOP) {
    const alignMoves = alignTopBottomEdge(
      position,
      targetName.split('-').map((tn) => Number(tn)) as Position,
    );

    const moveToSides = (() => {
      switch (`${position[0]}-${position[1]}-${position[2]}`) {
        case `0-2-0`: {
          return [MOVE.TOP_CC, MOVE.LEFT_C, MOVE.TOP_C, MOVE.LEFT_CC];
        }
        case `0-2-2`: {
          return [
            MOVE.TOP_C,
            MOVE.LEFT_C,
            MOVE.TOP_C,
            MOVE.TOP_C,
            MOVE.LEFT_CC,
          ];
        }

        case `2-2-0`: {
          return [MOVE.TOP_C, MOVE.RIGHT_CC, MOVE.TOP_CC, MOVE.RIGHT_C];
        }
        case `2-2-2`: {
          return [
            MOVE.TOP_CC,
            MOVE.RIGHT_CC,
            MOVE.TOP_CC,
            MOVE.TOP_CC,
            MOVE.RIGHT_C,
          ];
        }
      }
      return [];
    })();

    const nextPosition = (() => {
      switch (`${position[0]}-${position[1]}-${position[2]}`) {
        case `0-2-0`:
        case `0-2-2`:
          return [0, 2, 2] as Position;

        case `2-2-0`:
        case `2-2-2`:
          return [2, 2, 2] as Position;

        default:
          throw new Error('panic inside Corner.movesWhenCurrentOnTop');
      }
    })();

    return movesWhenCurrentOnTop(FACE.FRONT, nextPosition, targetName, [
      ...moves,
      ...alignMoves.moves,
      ...moveToSides,
    ]);
  }

  const alignMoves = alignTopBottomEdge(
    position,
    targetName.split('-').map((tn) => Number(tn)) as Position,
  );

  const solvingMoves = (() => {
    switch (`${position[0]}-${position[1]}-${position[2]}`) {
      case '0-0-0': {
        if (cubeFace === FACE.BACK) {
          return [MOVE.TOP_CC, MOVE.LEFT_CC, MOVE.TOP_C, MOVE.LEFT_C];
        }
        // FACE.LEFT
        return [MOVE.TOP_C, MOVE.BACK_C, MOVE.TOP_CC, MOVE.BACK_CC];
      }
      case '2-0-0': {
        if (cubeFace === FACE.RIGHT) {
          return [MOVE.TOP_CC, MOVE.BACK_CC, MOVE.TOP_C, MOVE.BACK_C];
        }
        // FACE.BACK
        return [MOVE.TOP_C, MOVE.RIGHT_C, MOVE.TOP_CC, MOVE.RIGHT_CC];
      }
      case '2-0-2': {
        if (cubeFace === FACE.FRONT) {
          return [MOVE.TOP_CC, MOVE.RIGHT_CC, MOVE.TOP_C, MOVE.RIGHT_C];
        }
        // FACE.RIGHT
        return [MOVE.TOP_C, MOVE.FRONT_C, MOVE.TOP_CC, MOVE.FRONT_CC];
      }
      case '0-0-2': {
        if (cubeFace === FACE.LEFT) {
          return [MOVE.TOP_CC, MOVE.FRONT_CC, MOVE.TOP_C, MOVE.FRONT_C];
        }
        // FACE.FRONT
        return [MOVE.TOP_C, MOVE.LEFT_C, MOVE.TOP_CC, MOVE.LEFT_CC];
      }
    }
    return [];
  })();

  return [...alignMoves.moves, ...solvingMoves];
}

export function movesWhenCurrentOnBottom(
  _cubeFace: FACE,
  _position: Position,
  targetName: CubeName,
): Array<MOVE> {
  // see face and rotate according to the face and make it to top facing side
  const topMoves = toTopMoves();
  return movesWhenCurrentOnTop(
    topMoves.cubeFace,
    topMoves.position,
    targetName,
    topMoves.moves,
  );
}

function toTopMoves(): {
  position: Position;
  moves: Array<MOVE>;
  cubeFace: FACE;
} {
  return {
    position: [0, 1, 2] as Position,
    moves: [] as Array<MOVE>,
    cubeFace: FACE.TOP,
  };
}

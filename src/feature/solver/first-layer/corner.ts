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
  cubeFace: FACE,
): {
  moves: Array<MOVE>;
  position: Position;
  face: FACE;
} {
  const clockwiseCircularArray: Array<Position> = [
    [0, 0, 0],
    [0, 0, 2],
    [2, 0, 2],
    [2, 0, 0],
  ];
  const faceCircularArray: Array<FACE> = [
    FACE.FRONT,
    FACE.RIGHT,
    FACE.BACK,
    FACE.LEFT,
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

  const nextFace = (() => {
    if (moves.length === 0) return cubeFace;
    const curFaceIdx = faceCircularArray.findIndex((fc) => cubeFace === fc);
    const movesDir = (moves[0].split('_')[1] === 'C' ? 1 : -1) * moves.length;
    return faceCircularArray[(curFaceIdx + movesDir + 4) % 4];
  })();

  return {
    moves,
    position: targetPosition,
    face: nextFace,
  };
}

export function movesWhenCurrentOnTop(
  cubeFace: FACE,
  position: Position,
  targetName: CubeName,
  moves: Array<MOVE>,
): Array<MOVE> {
  if (cubeFace === FACE.TOP) {
    const aligned = alignTopBottomEdge(
      position,
      targetName.split('-').map((tn) => Number(tn)) as Position,
      cubeFace,
    );

    const moveToSides = (() => {
      switch (`${aligned.position[0]}-2-${aligned.position[2]}`) {
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

        default:
          throw new Error(
            `panic moveToSides movesWhenCurrentOnTop: ${aligned.position}`,
          );
      }
    })();

    const nextPosition = (() => {
      switch (`${aligned.position[0]}-2-${aligned.position[2]}`) {
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
      ...aligned.moves,
      ...moveToSides,
    ]);
  }

  const aligned = alignTopBottomEdge(
    position,
    targetName.split('-').map((tn) => Number(tn)) as Position,
    cubeFace,
  );

  const solvingMoves = (() => {
    switch (`${aligned.position[0]}-2-${aligned.position[2]}`) {
      case '0-2-0': {
        if (aligned.face === FACE.BACK) {
          return [MOVE.TOP_CC, MOVE.LEFT_CC, MOVE.TOP_C, MOVE.LEFT_C];
        }
        // FACE.LEFT
        return [MOVE.TOP_C, MOVE.BACK_C, MOVE.TOP_CC, MOVE.BACK_CC];
      }
      case '2-2-0': {
        if (aligned.face === FACE.RIGHT) {
          return [MOVE.TOP_CC, MOVE.BACK_CC, MOVE.TOP_C, MOVE.BACK_C];
        }
        // FACE.BACK
        return [MOVE.TOP_C, MOVE.RIGHT_C, MOVE.TOP_CC, MOVE.RIGHT_CC];
      }
      case '2-2-2': {
        if (aligned.face === FACE.FRONT) {
          return [MOVE.TOP_CC, MOVE.RIGHT_CC, MOVE.TOP_C, MOVE.RIGHT_C];
        }
        // FACE.RIGHT
        return [MOVE.TOP_C, MOVE.FRONT_C, MOVE.TOP_CC, MOVE.FRONT_CC];
      }
      case '0-2-2': {
        if (aligned.face === FACE.LEFT) {
          return [MOVE.TOP_CC, MOVE.FRONT_CC, MOVE.TOP_C, MOVE.FRONT_C];
        }
        // FACE.FRONT
        return [MOVE.TOP_C, MOVE.LEFT_C, MOVE.TOP_CC, MOVE.LEFT_CC];
      }
      default:
        throw new Error(
          `panic solvingMoves movesWhenCurrentOnTop: ${aligned.position}`,
        );
    }
  })();

  return [...moves, ...aligned.moves, ...solvingMoves];
}

export function movesWhenCurrentOnBottom(
  cubeFace: FACE,
  position: Position,
  targetName: CubeName,
): Array<MOVE> {
  const toTop = toTopMoves(cubeFace, position);

  return movesWhenCurrentOnTop(
    toTop.cubeFace,
    toTop.position,
    targetName,
    toTop.moves,
  );
}

function toTopMoves(
  cubeFace: FACE,
  position: Position,
): {
  position: Position;
  moves: Array<MOVE>;
  cubeFace: FACE;
} {
  switch (`${position[0]}-${position[1]}-${position[2]}`) {
    case '0-0-0': {
      if (cubeFace === FACE.BACK) {
        return {
          position: [0, 2, 2] as Position,
          moves: [MOVE.BACK_C, MOVE.TOP_C, MOVE.BACK_CC],
          cubeFace: FACE.LEFT,
        };
      }
      // FACE.LEFT
      return {
        position: [2, 2, 0] as Position,
        moves: [MOVE.LEFT_CC, MOVE.TOP_CC, MOVE.LEFT_C],
        cubeFace: FACE.BACK,
      };
    }
    case '2-0-0': {
      if (cubeFace === FACE.RIGHT) {
        return {
          position: [0, 2, 0] as Position,
          moves: [MOVE.RIGHT_C, MOVE.TOP_C, MOVE.RIGHT_CC],
          cubeFace: FACE.BACK,
        };
      }
      // FACE.BACK
      return {
        position: [2, 2, 2] as Position,
        moves: [MOVE.BACK_CC, MOVE.TOP_CC, MOVE.BACK_C],
        cubeFace: FACE.RIGHT,
      };
    }
    case '2-0-2': {
      if (cubeFace === FACE.FRONT) {
        return {
          position: [2, 2, 0] as Position,
          moves: [MOVE.FRONT_C, MOVE.TOP_C, MOVE.FRONT_CC],
          cubeFace: FACE.RIGHT,
        };
      }
      // FACE.RIGHT
      return {
        position: [0, 2, 2] as Position,
        moves: [MOVE.RIGHT_CC, MOVE.TOP_CC, MOVE.RIGHT_C],
        cubeFace: FACE.FRONT,
      };
    }
    case '0-0-2': {
      if (cubeFace === FACE.LEFT) {
        return {
          position: [2, 2, 2] as Position,
          moves: [MOVE.LEFT_C, MOVE.TOP_C, MOVE.LEFT_CC],
          cubeFace: FACE.FRONT,
        };
      }
      // FACE.FRONT
      return {
        position: [0, 2, 0] as Position,
        moves: [MOVE.FRONT_CC, MOVE.TOP_CC, MOVE.FRONT_C],
        cubeFace: FACE.LEFT,
      };
    }
    default:
      throw new Error(`panic, toTopMoves: ${cubeFace} ${position}`);
  }
}

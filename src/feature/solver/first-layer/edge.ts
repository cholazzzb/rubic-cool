import { CubeName, Position, cubeNameToPosition } from '@/feature/cube';
import { shuffleArray } from '@/shared/array';
import { FACE, MOVE } from '@/shared/enum';
import { alignTopBottomFace } from '../util';

export type AlignEdges = FACE.BACK | FACE.FRONT | FACE.LEFT | FACE.RIGHT;
export type FirstLayerEdge = '1-0-0' | '1-0-2' | '0-0-1' | '2-0-1';

type TargetCurrentPos = `${CubeName} ${CubeName}`;
function createTargetCurrentPos(
  targetName: CubeName,
  position: Position,
): TargetCurrentPos {
  return `${targetName} ${position[0]}-${position[1]}-${position[2]}`;
}

export function randomFle() {
  /**
   * @description fle: First Layer Edges
   */
  const fle: Array<FirstLayerEdge> = ['1-0-0', '1-0-2', '0-0-1', '2-0-1'];
  return shuffleArray(fle);
}

export function movesWhenCurrentOnTop(
  cubeFace: FACE,
  position: Position,
  targetName: CubeName,
  alignEdges: Set<AlignEdges>,
  moves: Array<MOVE>,
): Array<MOVE> {
  if (cubeFace === FACE.TOP) {
    const { moves: alignMoves, position: alignPosition } = alignTopBottomFace(
      position,
      targetName.split('-').map((tn) => Number(tn)) as Position,
      FACE.TOP,
    );
    if (alignMoves.length > 0) {
      return movesWhenCurrentOnTop(
        cubeFace,
        alignPosition,
        targetName,
        alignEdges,
        alignMoves,
      );
    }
    switch (createTargetCurrentPos(targetName, position)) {
      case `1-0-2 1-2-2`:
        return [...moves, MOVE.FRONT_C, MOVE.FRONT_C];
      case `1-0-0 1-2-0`:
        return [...moves, MOVE.BACK_C, MOVE.BACK_C];
      case `0-0-1 0-2-1`:
        return [...moves, MOVE.LEFT_C, MOVE.LEFT_C];
      case `2-0-1 2-2-1`:
        return [...moves, MOVE.RIGHT_C, MOVE.RIGHT_C];

      default:
        throw Error(
          `first layer movesWhenCurrentOnTop: cubeFace:${cubeFace} position:${position} targetName:${targetName} alignEdges:${alignEdges} moves:${moves}`,
        );
    }
  }
  switch (cubeFace) {
    case FACE.LEFT: {
      if (!alignEdges.has(FACE.LEFT)) return [...moves, MOVE.LEFT_C];
      break;
    }
    case FACE.RIGHT: {
      if (!alignEdges.has(FACE.RIGHT)) return [...moves, MOVE.RIGHT_C];
      break;
    }
    case FACE.FRONT: {
      if (!alignEdges.has(FACE.FRONT)) return [...moves, MOVE.FRONT_C];
      break;
    }
    case FACE.BACK: {
      if (!alignEdges.has(FACE.BACK)) return [...moves, MOVE.BACK_C];
      break;
    }
  }

  const targetPosition = cubeNameToPosition(targetName);
  targetPosition[1] = 2;

  const {
    moves: alignMoves,
    position: alignPosition,
    face: positionFace,
  } = alignTopBottomFace(position, targetPosition, FACE.TOP);

  return movesWhenCurrentOnTop(
    positionFace,
    alignPosition,
    targetName,
    alignEdges,
    [...moves, ...alignMoves],
  );
}

export function movesWhenCurrentOnMiddle(
  cubeFace: FACE,
  position: Position,
  targetName: CubeName,
): Array<MOVE> {
  const currentPos: CubeName = `${position[0]}-${position[1]}-${position[2]}`;
  const targetPos: Position = targetName
    .split('-')
    .map((tn) => Number(tn)) as Position;

  switch (cubeFace) {
    case FACE.FRONT: {
      switch (currentPos) {
        case `0-1-2`: {
          const { moves } = alignTopBottomFace(
            [0, 0, 1],
            targetPos,
            FACE.BOTTOM,
          );

          const reversedMoves = reverseBottomMoves(moves);

          return [...reversedMoves, MOVE.LEFT_CC, ...moves];
        }
        case `2-1-2`: {
          const { moves } = alignTopBottomFace(
            [2, 0, 1],
            targetPos,
            FACE.BOTTOM,
          );

          const reversedMoves = reverseBottomMoves(moves);

          return [...reversedMoves, MOVE.RIGHT_C, ...moves];
        }

        default:
          return [];
      }
    }

    case FACE.BACK: {
      switch (currentPos) {
        case `0-1-0`: {
          const { moves } = alignTopBottomFace(
            [0, 0, 1],
            targetPos,
            FACE.BOTTOM,
          );

          const reversedMoves = reverseBottomMoves(moves);

          return [...reversedMoves, MOVE.LEFT_C, ...moves];
        }
        case `2-1-0`: {
          const { moves } = alignTopBottomFace(
            [2, 0, 1],
            targetPos,
            FACE.BOTTOM,
          );

          const reversedMoves = reverseBottomMoves(moves);

          return [...reversedMoves, MOVE.RIGHT_CC, ...moves];
        }

        default:
          return [];
      }
    }

    case FACE.LEFT: {
      switch (currentPos) {
        case `0-1-0`: {
          const { moves } = alignTopBottomFace(
            [1, 0, 0],
            targetPos,
            FACE.BOTTOM,
          );

          const reversedMoves = reverseBottomMoves(moves);

          return [...reversedMoves, MOVE.BACK_CC, ...moves];
        }
        case `0-1-2`: {
          const { moves } = alignTopBottomFace(
            [1, 0, 2],
            targetPos,
            FACE.BOTTOM,
          );

          const reversedMoves = reverseBottomMoves(moves);

          return [...reversedMoves, MOVE.FRONT_C, ...moves];
        }

        default:
          return [];
      }
    }

    case FACE.RIGHT: {
      switch (currentPos) {
        case `2-1-0`: {
          const { moves } = alignTopBottomFace(
            [1, 0, 0],
            targetPos,
            FACE.BOTTOM,
          );

          const reversedMoves = reverseBottomMoves(moves);

          return [...reversedMoves, MOVE.BACK_C, ...moves];
        }
        case `2-1-2`: {
          const { moves } = alignTopBottomFace(
            [1, 0, 2],
            targetPos,
            FACE.BOTTOM,
          );

          const reversedMoves = reverseBottomMoves(moves);

          return [...reversedMoves, MOVE.FRONT_CC, ...moves];
        }
        default:
          return [];
      }
    }

    default:
      return [];
  }
}

export function movesWhenCurrentOnBottom(
  cubeFace: FACE,
  position: Position,
  targetName: CubeName,
  alignEdges: Set<AlignEdges>,
): Array<MOVE> {
  if (cubeFace !== FACE.BOTTOM) {
    switch (cubeFace) {
      case FACE.LEFT: {
        if (!alignEdges.has(FACE.LEFT)) return [MOVE.LEFT_C];
        return [];
      }
      case FACE.RIGHT: {
        if (!alignEdges.has(FACE.RIGHT)) return [MOVE.RIGHT_C];
        return [];
      }
      case FACE.FRONT: {
        if (!alignEdges.has(FACE.FRONT)) return [MOVE.FRONT_C];
        return [];
      }
      case FACE.BACK: {
        if (!alignEdges.has(FACE.BACK)) return [MOVE.BACK_C];
        return [];
      }
    }
  }

  // need to swap without changing other cross
  const safeMoves = (() => {
    switch (`${position[0]}-${position[1]}-${position[2]}`) {
      case '1-0-2':
        return [MOVE.FRONT_C, MOVE.FRONT_C];

      case '1-0-0':
        return [MOVE.BACK_C, MOVE.BACK_C];

      case '0-0-1':
        return [MOVE.LEFT_C, MOVE.LEFT_C];

      case '2-0-1':
        return [MOVE.RIGHT_C, MOVE.RIGHT_C];
    }
    return [];
  })();
  const { moves } = alignTopBottomFace(
    position,
    targetName.split('-').map((tn) => Number(tn)) as Position,
    FACE.BOTTOM,
  );

  const reversedMoves = reverseBottomMoves(moves);

  return [...safeMoves, ...reversedMoves, ...safeMoves, ...moves];
}

function reverseBottomMoves(moves: Array<MOVE>) {
  return moves.map((mv) => {
    if (mv === MOVE.BOTTOM_C) return MOVE.BOTTOM_CC;
    return MOVE.BOTTOM_C;
  }, [] as Array<MOVE>);
}

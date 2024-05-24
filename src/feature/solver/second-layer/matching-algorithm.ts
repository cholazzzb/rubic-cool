import { MOVE } from '@/shared/enum';

export function frontLeft(): Array<MOVE> {
  return [
    MOVE.TOP_C,
    MOVE.LEFT_C,
    MOVE.TOP_C,
    MOVE.LEFT_CC,
    MOVE.TOP_CC,
    MOVE.FRONT_CC,
    MOVE.TOP_CC,
    MOVE.FRONT_C,
  ];
}

export function frontRight(): Array<MOVE> {
  return [
    MOVE.TOP_CC,
    MOVE.RIGHT_CC,
    MOVE.TOP_CC,
    MOVE.RIGHT_C,
    MOVE.TOP_C,
    MOVE.FRONT_C,
    MOVE.TOP_C,
    MOVE.FRONT_CC,
  ];
}

function transformMove(moves: Array<MOVE>, yRotation: 1 | 2 | 3): Array<MOVE> {
  function transform(move: MOVE) {
    switch (move) {
      case MOVE.LEFT_C:
        switch (yRotation) {
          case 1:
            return MOVE.FRONT_C;
          case 2:
            return MOVE.RIGHT_C;
          case 3:
            return MOVE.BACK_C;
          default:
            return move;
        }
      case MOVE.LEFT_CC:
        switch (yRotation) {
          case 1:
            return MOVE.FRONT_CC;
          case 2:
            return MOVE.RIGHT_CC;
          case 3:
            return MOVE.BACK_CC;
          default:
            return move;
        }

      case MOVE.RIGHT_C:
        switch (yRotation) {
          case 1:
            return MOVE.BACK_C;
          case 2:
            return MOVE.LEFT_C;
          case 3:
            return MOVE.FRONT_C;
          default:
            return move;
        }
      case MOVE.RIGHT_CC:
        switch (yRotation) {
          case 1:
            return MOVE.BACK_CC;
          case 2:
            return MOVE.LEFT_CC;
          case 3:
            return MOVE.FRONT_CC;
          default:
            return move;
        }

      case MOVE.FRONT_C:
        switch (yRotation) {
          case 1:
            return MOVE.RIGHT_C;
          case 2:
            return MOVE.BACK_C;
          case 3:
            return MOVE.LEFT_C;
          default:
            return move;
        }
      case MOVE.FRONT_CC:
        switch (yRotation) {
          case 1:
            return MOVE.RIGHT_CC;
          case 2:
            return MOVE.BACK_CC;
          case 3:
            return MOVE.LEFT_CC;
          default:
            return move;
        }

      default:
        return move;
    }
  }
  return moves.map(transform);
}

export const rightLeft = () => transformMove(frontLeft(), 1);
export const rightRight = () => transformMove(frontRight(), 1);

export const backLeft = () => transformMove(frontLeft(), 2);
export const backRight = () => transformMove(frontRight(), 2);

export const leftLeft = () => transformMove(frontLeft(), 3);
export const leftRight = () => transformMove(frontRight(), 3);

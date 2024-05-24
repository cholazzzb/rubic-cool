export enum DIRECTION {
  CLOCKWISE = 'CLOCKWISE',
  COUNTERCLOCKWISE = 'COUNTERCLOCKWISE',
}

export enum FACE {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  FRONT = 'FRONT',
  BACK = 'BACK',
}

export enum MOVE {
  TOP_C = `${FACE.TOP}-C`,
  TOP_CC = `${FACE.TOP}-CC`,
  BOTTOM_C = `${FACE.BOTTOM}-C`,
  BOTTOM_CC = `${FACE.BOTTOM}-CC`,
  LEFT_C = `${FACE.LEFT}-C`,
  LEFT_CC = `${FACE.LEFT}-CC`,
  RIGHT_C = `${FACE.RIGHT}-C`,
  RIGHT_CC = `${FACE.RIGHT}-CC`,
  FRONT_C = `${FACE.FRONT}-C`,
  FRONT_CC = `${FACE.FRONT}-CC`,
  BACK_C = `${FACE.BACK}-C`,
  BACK_CC = `${FACE.BACK}-CC`,
}

export function extractMove(move: MOVE) {
  const [face_raw, dir_raw] = move.split('-');

  const face = face_raw as FACE;
  const dir =
    dir_raw === 'C' ? DIRECTION.CLOCKWISE : DIRECTION.COUNTERCLOCKWISE;

  return { face, dir };
}

export function makeMove(face: FACE, direction: DIRECTION) {
  const dir = direction === DIRECTION.CLOCKWISE ? 'C' : 'CC';
  return `${face}-${dir}` as MOVE;
}

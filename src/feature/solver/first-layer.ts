import * as THREE from 'three';

import { shuffleArray } from '@/shared/array';
import { FACE } from '@/shared/enum';
import { MOVE } from '../controller/half-curve';
import { Cube, CubeName, Position } from '../cube';
import { LayerSolver } from './interface';
import {
  Cubes,
  alignTopBottomFace,
  getCubeNotOnTarget,
  vectorAfterRotation,
  vectorToFace,
} from './util';

type AlignEdges = FACE.BACK | FACE.FRONT | FACE.LEFT | FACE.RIGHT;

type TargetCurrentPos = `${CubeName} ${CubeName}`;
function createTargetCurrentPos(
  targetName: CubeName,
  position: Position,
): TargetCurrentPos {
  return `${targetName} ${position[0]}-${position[1]}-${position[2]}`;
}

function movesWhenCurrentOnTop(
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
        throw Error('OOPPS');
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

  const targetPosition = targetName
    .split('-')
    .map((val) => Number(val)) as Position;
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
    alignMoves,
  );
}

function movesWhenCurrentOnMiddle(
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

          const reversedMoves = moves.reduce((acc, mv) => {
            acc.unshift(mv);
            return acc;
          }, [] as Array<MOVE>);

          return [...reversedMoves, MOVE.LEFT_CC, ...moves];
        }
        case `2-1-2`: {
          const { moves } = alignTopBottomFace(
            [2, 0, 1],
            targetPos,
            FACE.BOTTOM,
          );

          const reversedMoves = moves.reduce((acc, mv) => {
            acc.unshift(mv);
            return acc;
          }, [] as Array<MOVE>);

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

          const reversedMoves = moves.reduce((acc, mv) => {
            acc.unshift(mv);
            return acc;
          }, [] as Array<MOVE>);

          return [...reversedMoves, MOVE.LEFT_C, ...moves];
        }
        case `2-1-0`: {
          const { moves } = alignTopBottomFace(
            [2, 0, 1],
            targetPos,
            FACE.BOTTOM,
          );

          const reversedMoves = moves.reduce((acc, mv) => {
            acc.unshift(mv);
            return acc;
          }, [] as Array<MOVE>);

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

          const reversedMoves = moves.reduce((acc, mv) => {
            acc.unshift(mv);
            return acc;
          }, [] as Array<MOVE>);

          return [...reversedMoves, MOVE.BACK_CC, ...moves];
        }
        case `0-1-2`: {
          const { moves } = alignTopBottomFace(
            [1, 0, 2],
            targetPos,
            FACE.BOTTOM,
          );

          const reversedMoves = moves.reduce((acc, mv) => {
            acc.unshift(mv);
            return acc;
          }, [] as Array<MOVE>);

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

          const reversedMoves = moves.reduce((acc, mv) => {
            acc.unshift(mv);
            return acc;
          }, [] as Array<MOVE>);

          return [...reversedMoves, MOVE.BACK_C, ...moves];
        }
        case `2-1-2`: {
          const { moves } = alignTopBottomFace(
            [1, 0, 2],
            targetPos,
            FACE.BOTTOM,
          );

          const reversedMoves = moves.reduce((acc, mv) => {
            acc.unshift(mv);
            return acc;
          }, [] as Array<MOVE>);

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

function movesWhenCurrentOnBottom(
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

  const reversedMoves = moves.reduce((acc, mv) => {
    acc.unshift(mv);
    return acc;
  }, [] as Array<MOVE>);

  return [...safeMoves, ...reversedMoves, ...safeMoves, ...moves];
}

function randomFle() {
  /**
   * @description fle: First Layer Edges
   */
  const fle: Array<CubeName> = ['1-0-0', '1-0-2', '0-0-1', '2-0-1'];
  return shuffleArray(fle);
}

export class FirstLayerSolver implements LayerSolver {
  private getCubes: () => Cubes;
  private cubes: Cubes;
  private cubeNotOnTarget: { targetName: CubeName; position: Position } | null =
    null;

  constructor(getCubes: () => Cubes) {
    this.cubes = getCubes();
    this.getCubes = getCubes;
  }

  isSolved(): boolean {
    this.cubes = this.getCubes();
    this.cubeNotOnTarget = getCubeNotOnTarget(this.cubes, randomFle());

    return this.cubeNotOnTarget === null;
  }

  findSolution(): MOVE[] {
    if (this.cubeNotOnTarget === null) return [];
    const {
      targetName,
      position: [fleX, fleY, fleZ],
    } = this.cubeNotOnTarget;
    const fleCube = this.cubes[fleX][fleY][fleZ];
    const moves = this.findCrossMoves(targetName, fleCube, [fleX, fleY, fleZ]);
    return moves;
  }

  findAlignEdges(): Set<AlignEdges> {
    const alignEdges = new Set<AlignEdges>();
    const cubes = this.getCubes();

    for (const name of randomFle()) {
      const [xPos, yPos, zPos] = name.split('-').map((nm) => Number(nm));
      const cube = cubes[Number(xPos)][Number(yPos)][Number(zPos)];
      const cubeFace = this.getCubeFace(cube.getMesh().rotation);

      if (cubeFace === FACE.BOTTOM) {
        switch (name) {
          case '1-0-0':
            alignEdges.add(FACE.BACK);
            break;

          case '1-0-2':
            alignEdges.add(FACE.FRONT);
            break;

          case '0-0-1':
            alignEdges.add(FACE.LEFT);
            break;

          case '2-0-1':
            alignEdges.add(FACE.RIGHT);
            break;

          default:
            break;
        }
      }
    }

    return alignEdges;
  }

  findCrossMoves(
    targetName: CubeName,
    cube: Cube,
    position: Position,
  ): Array<MOVE> {
    const cubeFace = this.getCubeFace(cube.getMesh().rotation);

    const alignEdges = this.findAlignEdges();

    if (position[1] === 2) {
      return movesWhenCurrentOnTop(
        cubeFace,
        position,
        targetName,
        alignEdges,
        [],
      );
    }

    if (position[1] === 1) {
      return movesWhenCurrentOnMiddle(cubeFace, position, targetName);
    }

    return movesWhenCurrentOnBottom(cubeFace, position, targetName, alignEdges);
  }

  getCubeFace(rotation: THREE.Euler): FACE {
    const bottomVector = new THREE.Vector3(0, -1, 0);
    const cubeFaceVector = vectorAfterRotation(bottomVector, rotation);
    return vectorToFace(cubeFaceVector);
  }
}

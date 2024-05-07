import * as THREE from 'three';

import { FACE } from '@/shared/enum';
import { MOVE } from '../controller/half-curve';
import { Cube, CubeName } from '../cube';
import {
  Cubes,
  Position,
  alignTopFace,
  getCubeNotOnTarget,
  vectorAfterRotation,
  vectorToFace,
} from './util';
import { LayerSolver } from './interface';

/**
 * @description fle: First Layer Edges
 */
const fle: Array<CubeName> = ['1-0-0', '1-0-2', '0-0-1', '2-0-1'];

function findCrossMoves(
  targetName: CubeName,
  cube: Cube,
  position: Position,
): Array<MOVE> {
  const moves: Array<MOVE> = [];

  const bottomVector = new THREE.Vector3(0, -1, 0);
  const cubeFaceVector = vectorAfterRotation(
    bottomVector,
    cube.getMesh().rotation,
  );
  const cubeFace = vectorToFace(cubeFaceVector);

  // current position on top layer
  if (position[1] === 2) {
    if (cubeFace === FACE.TOP) {
      const alignMoves = alignTopFace(
        position,
        targetName.split('-').map((tn) => Number(tn)) as Position,
      );
      if (alignMoves.length > 0) {
        return alignMoves;
      }
      switch (`${targetName} ${position[0]}-${position[1]}-${position[2]}`) {
        case `1-0-2 1-2-2`:
          moves.push(MOVE.FRONT_C, MOVE.FRONT_C);
          break;
        case `1-0-0 1-2-0`:
          moves.push(MOVE.BACK_C, MOVE.BACK_C);
          break;
        case `0-0-1 0-2-1`:
          moves.push(MOVE.LEFT_C, MOVE.LEFT_C);
          break;
        case `2-0-1 2-2-1`:
          moves.push(MOVE.RIGHT_C, MOVE.RIGHT_C);
          break;

        default:
          throw Error('OOPPS');
      }
    } else {
      // facing side -> rotate once
    }
    return moves;
  }

  // current position on middle layer
  if (position[1] === 1) {
    return moves;
  }

  // current position on bottom layer
  if (
    cubeFace === FACE.LEFT ||
    cubeFace === FACE.RIGHT ||
    cubeFace === FACE.FRONT ||
    cubeFace === FACE.BACK
  ) {
    // need to do move the cube to middle layer
  } else {
    // need to swap without changing other cross
  }
  return moves;
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
    this.cubeNotOnTarget = getCubeNotOnTarget(this.cubes, fle);

    return this.cubeNotOnTarget === null;
  }

  findSolution(): MOVE[] {
    if (this.cubeNotOnTarget === null) return [];
    const {
      targetName,
      position: [fleX, fleY, fleZ],
    } = this.cubeNotOnTarget;
    const fleCube = this.cubes[fleX][fleY][fleZ];
    const moves = findCrossMoves(targetName, fleCube, [fleX, fleY, fleZ]);

    return moves;
  }
}

import { Euler, Quaternion, Vector3 } from 'three';
import { radToDeg } from 'three/src/math/MathUtils';

import { FACE } from '@/shared/enum';
import { MOVE } from '../controller/half-curve';
import { Cube, CubeName } from '../cube';

export type Cubes = Array<Array<Array<Cube>>>;
type XPos = number;
type YPos = number;
type ZPos = number;
export type Position = [XPos, YPos, ZPos];

export function getCubePosition(
  cubes: Cubes,
  targetNames: Array<CubeName>,
): { targetName: CubeName; position: Position } {
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 3; z++) {
        for (const targetName of targetNames) {
          const cube = cubes[x][y][z];
          if (targetName === cube.getName()) {
            return { targetName, position: [x, y, z] };
          }
        }
      }
    }
  }

  throw Error('panic: cannot getCubePosition');
}

export function isCubeOnTarget(targetName: CubeName, cube: Cube): boolean {
  if (targetName !== cube.getName()) return false;
  if (Math.round(radToDeg(cube.getMesh().rotation.x)) !== 0) return false;
  if (Math.round(radToDeg(cube.getMesh().rotation.y)) !== 0) return false;
  if (Math.round(radToDeg(cube.getMesh().rotation.z)) !== 0) return false;

  return true;
}

export function getCubeNotOnTarget(
  cubes: Cubes,
  targetNames: Array<CubeName>,
): { targetName: CubeName; position: Position } | null {
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 3; z++) {
        for (const targetName of targetNames) {
          const cube = cubes[x][y][z];
          if (
            targetName === cube.getName() &&
            !isCubeOnTarget(targetName, cube)
          ) {
            return { targetName, position: [x, y, z] };
          }
        }
      }
    }
  }
  return null;
}

export function vectorAfterRotation(vector: Vector3, rotation: Euler): Vector3 {
  const quaternion = new Quaternion().setFromEuler(rotation);
  return vector.clone().applyQuaternion(quaternion).round();
}

export function vectorToFace(vector: Vector3): FACE {
  switch (`${vector.x}:${vector.y}:${vector.z}`) {
    case `1:0:0`:
      return FACE.RIGHT;
    case `-1:0:0`:
      return FACE.LEFT;
    case `0:1:0`:
      return FACE.TOP;
    case `0:-1:0`:
      return FACE.BOTTOM;
    case `0:0:1`:
      return FACE.FRONT;
    case `0:0:-1`:
      return FACE.BACK;

    default:
      throw Error(
        `Vector cannot convert to rubik's face: ${vector.x}:${vector.y}:${vector.z}`,
      );
  }
}

const faceChain: Array<Position> = [
  [1, 2, 2], // Front
  [2, 2, 1], // Right
  [1, 2, 0], // Back
  [0, 2, 1], // Left
];
export function alignTopFace(
  currentPosition: Position,
  targetPosition: Position,
): Array<MOVE> {
  const currentIdx = faceChain.findIndex(
    (val) =>
      val[0] === currentPosition[0] &&
      val[1] === currentPosition[1] &&
      val[2] === currentPosition[2],
  );
  const targetIdx = faceChain.findIndex(
    (val) => val[0] === targetPosition[0] && val[2] === targetPosition[2],
  );
  const moves: Array<MOVE> = [];

  let delta = targetIdx - currentIdx;
  if (delta === 3) {
    delta = -1;
  } else if (delta === -3) {
    delta = 1;
  }
  if (delta > 0) {
    moves.push(
      ...Array(delta)
        .fill(null)
        .map(() => MOVE.TOP_C),
    );
  } else {
    moves.push(
      ...Array(Math.abs(delta))
        .fill(null)
        .map(() => MOVE.TOP_CC),
    );
  }
  return moves;
}

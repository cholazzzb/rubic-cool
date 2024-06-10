import { Euler, Quaternion, Vector3 } from 'three';

import { Position, TopLayerPosition, positionToCubeName } from '@/feature/cube';
import { Rubic } from '@/feature/rubic';
import { chunk, flattenArray } from '@/shared/array';
import { rotationToString } from '@/shared/debug';
import { MOVE } from '@/shared/enum';
import { Cubes, isCubeNotRotated, vectorAfterRotation } from '../util';
import {
  backLeft,
  backRight,
  frontLeft,
  frontRight,
  leftLeft,
  leftRight,
  rightLeft,
  rightRight,
} from './matching-algorithm';

export const secondLayerTargets = ['0-1-0', '2-1-0', '0-1-2', '2-1-2'] as const;
export type SecondLayerTarget = (typeof secondLayerTargets)[number];

type PositionAndTarget = {
  position: Position;
  target: Position;
  isSwap: boolean;
};
export function findPositionAndTarget(cubes: Cubes): PositionAndTarget | null {
  const stack: Array<PositionAndTarget> = [];
  for (const targetName of secondLayerTargets) {
    const targetPosition = targetName
      .split('-')
      .map((tn) => Number(tn)) as Position;
    const [x, y, z] = targetPosition;
    const cube = cubes[x][y][z];
    const cubeName = cube.getName();
    if (cubeName !== targetName) {
      const position = findPosition(cubes, targetName);
      if (position[1] === 1) {
        stack.push({
          position,
          target: targetPosition,
          isSwap: false,
        });
      } else {
        return {
          position,
          target: targetPosition,
          isSwap: false,
        };
      }
    } else if (!isCubeNotRotated(cube)) {
      stack.push({
        position: [x, y, z] as Position,
        target: [x, y, z] as Position,
        isSwap: true,
      });
    }
  }
  if (stack.length > 0) return stack[stack.length - 1];
  return null;
}

function findPosition(cubes: Cubes, targetName: SecondLayerTarget): Position {
  for (let y = 1; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      for (let z = 0; z < 3; z++) {
        const cubeName = cubes[x][y][z].getName();
        if (cubeName === targetName) {
          return [x, y, z] as Position;
        }
      }
    }
  }

  throw new Error('layer 2: findPosition');
}

export function findMoves(
  rotation: THREE.Euler,
  position: TopLayerPosition,
  target: Position,
): Array<MOVE> {
  for (
    let numOfRotation = 0,
      simulatePosition = position,
      simulateRotation = rotation,
      match = matcher(simulatePosition, target, simulateRotation);
    numOfRotation <= 4;
    numOfRotation++
  ) {
    if (match.isMatch) {
      return [
        ...Array(numOfRotation)
          .fill(null)
          .map(() => MOVE.TOP_C),
        ...findMatchingMove(simulatePosition, target),
      ];
    }
    const next = simulateTopRotation(simulatePosition, simulateRotation);
    simulatePosition = next.position;
    simulateRotation = next.rotation;
    match = matcher(simulatePosition, target, simulateRotation);
  }
  throw Error(
    `second layer - find Moves. rotation: ${rotationToString(rotation)}. position: ${position}. target: ${target}.`,
  );
}

function simulateTopRotation(
  position: TopLayerPosition,
  rotation: THREE.Euler,
): {
  position: TopLayerPosition;
  rotation: THREE.Euler;
} {
  const nextPosition = (() => {
    const posName = positionToCubeName(position);
    switch (posName) {
      // BACK
      case `1-2-0`:
        return [0, 2, 1] as TopLayerPosition;

      // LEFT
      case `0-2-1`:
        return [1, 2, 2] as TopLayerPosition;

      // FRONT
      case `1-2-2`:
        return [2, 2, 1] as TopLayerPosition;

      // RIGHT
      case `2-2-1`:
        return [1, 2, 0] as TopLayerPosition;
    }

    throw Error(
      `simulateTopRotation: position:${position} rotation:${rotation}`,
    );
  })();

  const yAxisRotation = new Euler(0, Math.PI / 2, 0, 'XYZ');
  const yAxisQuaternion = new Quaternion().setFromEuler(yAxisRotation);

  const posQuaternion = new Quaternion().setFromEuler(rotation);
  posQuaternion.multiplyQuaternions(yAxisQuaternion, posQuaternion);

  const nextRotation = new Euler().setFromQuaternion(posQuaternion, 'XYZ');

  return { position: nextPosition, rotation: nextRotation };
}

function matcher(position: Position, target: Position, rotation: THREE.Euler) {
  const align = alignedMatch(position, target);
  const color = colorMatch(position, rotation);

  return {
    align,
    color,
    isMatch: align && color,
  };
}

function alignedMatch(position: Position, target: Position): boolean {
  const positionName = positionToCubeName(position);
  const targetName = positionToCubeName(target);

  // FRONT
  if (positionName === '1-2-2') {
    return targetName === '0-1-2' || targetName === '2-1-2';
  }

  // BACK
  if (positionName === '1-2-0') {
    return targetName === '0-1-0' || targetName === '2-1-0';
  }

  // LEFT
  if (positionName === '0-2-1') {
    return targetName === '0-1-0' || targetName === '0-1-2';
  }

  // RIGHT
  if (positionName === '2-2-1') {
    return targetName === '2-1-0' || targetName === '2-1-2';
  }
  return false;
}

function colorMatch(position: Position, rotation: THREE.Euler): boolean {
  const positionName = positionToCubeName(position);

  const frontVector = new Vector3(0, 0, 1);
  if (positionName === '1-2-2') {
    const vector = vectorAfterRotation(frontVector, rotation);

    return vector.equals(frontVector);
  }

  const backVector = new Vector3(0, 0, -1);
  if (positionName === '1-2-0') {
    const vector = vectorAfterRotation(backVector, rotation);

    return vector.equals(backVector);
  }

  const leftVector = new Vector3(-1, 0, 0);
  if (positionName === '0-2-1') {
    const vector = vectorAfterRotation(leftVector, rotation);

    return vector.equals(leftVector);
  }

  const rightVector = new Vector3(1, 0, 0);
  if (positionName === '2-2-1') {
    const vector = vectorAfterRotation(rightVector, rotation);

    return vector.equals(rightVector);
  }

  return false;
}

function findMatchingMove(position: Position, target: Position): Array<MOVE> {
  const positionName = positionToCubeName(position);
  const targetName = positionToCubeName(target);

  switch (positionName) {
    // LEFT
    case `0-2-1`: {
      if (targetName === '0-1-2') return leftRight();
      if (targetName === '0-1-0') return leftLeft();
      throw Error(`find MatchingMove. position: ${position} target: ${target}`);
    }

    // RIGHT
    case `2-2-1`: {
      if (targetName === '2-1-2') return rightLeft();
      if (targetName === '2-1-0') return rightRight();
      throw Error(`find MatchingMove. position: ${position} target: ${target}`);
    }

    // FRONT
    case `1-2-2`: {
      if (targetName === '0-1-2') return frontLeft();
      if (targetName === '2-1-2') return frontRight();
      throw Error(`find MatchingMove. position: ${position} target: ${target}`);
    }

    // BACK
    case `1-2-0`: {
      if (targetName === '0-1-0') return backRight();
      if (targetName === '2-1-0') return backLeft();
      throw Error(`find MatchingMove. position: ${position} target: ${target}`);
    }
  }

  throw Error(`find MatchingMove. position: ${position} target: ${target}`);
}

export function findSwapMoves(position: Position, cubes: Cubes): Array<MOVE> {
  for (
    let numOfRotation = 0, simulateCubes = cubes;
    numOfRotation < 4;
    numOfRotation++
  ) {
    if (isSafeToUsedSecondLayerAlgorithm(position, simulateCubes)) {
      const positionName = positionToCubeName(position);
      switch (positionName) {
        case `0-1-2`: {
          return [
            ...Array(numOfRotation)
              .fill(null)
              .map(() => MOVE.TOP_C),
            ...frontLeft(),
          ];
        }

        case `2-1-2`: {
          return [
            ...Array(numOfRotation)
              .fill(null)
              .map(() => MOVE.TOP_C),
            ...frontRight(),
          ];
        }

        case `0-1-0`: {
          return [
            ...Array(numOfRotation)
              .fill(null)
              .map(() => MOVE.TOP_C),
            ...backRight(),
          ];
        }
        case `2-1-0`: {
          return [
            ...Array(numOfRotation)
              .fill(null)
              .map(() => MOVE.TOP_C),

            ...backLeft(),
          ];
        }
      }
    }
    simulateCubes = simulateTopRotationCubes(cubes);
  }

  throw Error(`findSwapMoves - position: ${position}`);
}

function simulateTopRotationCubes(cubes: Cubes) {
  const out = chunk(chunk(flattenArray(cubes), 3), 3);

  const chains: Array<Array<number>> = Rubic.cornerChain.reduce(
    (acc, coordinate) => {
      acc.unshift(coordinate);
      return acc;
    },
    [] as Array<Array<number>>,
  );

  [
    out[chains[0][0]][2][chains[0][1]],
    out[chains[1][0]][2][chains[1][1]],
    out[chains[2][0]][2][chains[2][1]],
    out[chains[3][0]][2][chains[3][1]],
  ] = [
    out[chains[1][0]][2][chains[1][1]],
    out[chains[2][0]][2][chains[2][1]],
    out[chains[3][0]][2][chains[3][1]],
    out[chains[4][0]][2][chains[4][1]],
  ];

  return out;
}

function isSafeToUsedSecondLayerAlgorithm(
  position: Position,
  cubes: Cubes,
): boolean {
  const positionName = positionToCubeName(position);
  switch (positionName) {
    case `0-1-2`: {
      return !secondLayerTargets.includes(
        cubes[1][2][2].getName() as SecondLayerTarget,
      );
    }
    case `2-1-2`: {
      return !secondLayerTargets.includes(
        cubes[1][2][2].getName() as SecondLayerTarget,
      );
    }

    case `0-1-0`: {
      return !secondLayerTargets.includes(
        cubes[1][2][0].getName() as SecondLayerTarget,
      );
    }
    case `2-1-0`: {
      return !secondLayerTargets.includes(
        cubes[1][2][0].getName() as SecondLayerTarget,
      );
    }
  }

  return true;
}

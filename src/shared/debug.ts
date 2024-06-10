import { Euler } from 'three';
import { radToDeg } from 'three/src/math/MathUtils';

import { Cube, CubeName } from '@/feature/cube';
import { Cubes } from '@/feature/solver/util';
import { chunk, flattenArray } from './array';

export function simpleHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return (hash >>> 0).toString(36);
}

type Snapshot = string;
export function createSnapshot(cubes: Cubes): Snapshot {
  const snapshot = flattenArray(cubes)
    .map((cb) => {
      const { x, y, z } = cb.getMesh().rotation;
      const rotation = [x, y, z].map((eu) => Math.floor(radToDeg(eu)));
      const rotationString = `${rotation[0]}~${rotation[1]}~${rotation[2]}`;
      return `${cb.getName()}:${rotationString}`;
    })
    .join('_');
  return snapshot;
}

export function buildCubesFromSnapshot(snapshot: Snapshot): Cubes {
  try {
    const cubes = [];
    const ssCubes = snapshot.split('_');
    for (const ssCube of ssCubes) {
      const [name, rotationString] = ssCube.split(':') as [CubeName, string];

      const [x, y, z] = rotationString.split('~').map((rs) => Number(rs));
      const rotation = new Euler(x, y, z);
      const cube = new Cube(name);
      cube.getMesh().setRotationFromEuler(rotation);
      cubes.push(cube);
    }
    return chunk(chunk(cubes, 3), 3);
  } catch {
    throw Error(`failed to build cubes from snapshot: ${snapshot}`);
  }
}

export function rotationToString(rotation: Euler) {
  const { x, y, z } = rotation;
  const rounded = [x, y, z].map((eu) => Math.floor(radToDeg(eu)));
  const roundedString = `${rounded[0]}~${rounded[1]}~${rounded[2]}`;
  return `rotation(x~y~z) ${roundedString}`;
}

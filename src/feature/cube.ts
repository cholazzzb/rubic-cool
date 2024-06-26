import {
  BoxGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
} from 'three';

import { rubikInitColor } from './color';

type XPos = 0 | 1 | 2;
type YPos = 0 | 1 | 2;
type ZPos = 0 | 1 | 2;
export type Position = [XPos, YPos, ZPos];
export type TopLayerPosition = [XPos, 2, ZPos];
/**
 * @description format is from coordinate: x-y-z
 */
export type CubeName = `${Position[0]}-${Position[1]}-${Position[2]}`;
export type TopLayerCubes = `${Position[0]}-${2}-${Position[2]}`;

export function positionToCubeName(position: Position): CubeName {
  return `${position[0]}-${position[1]}-${position[2]}`;
}

export function cubeNameToPosition(cubeName: CubeName): Position {
  return cubeName.split('-').map((cn) => Number(cn)) as Position;
}

export class Cube {
  private geometry: THREE.BufferGeometry;
  private mesh: THREE.Mesh;
  private line: THREE.LineSegments;
  private name: CubeName;
  constructor(name: CubeName, size: number = 0.1) {
    this.geometry = new BoxGeometry(size, size, size).toNonIndexed();
    this.geometry.setAttribute('color', rubikInitColor);

    this.name = name;

    this.mesh = new Mesh(
      this.geometry,
      new MeshBasicMaterial({ vertexColors: true }),
    );

    this.mesh.name = name;
    this.line = new LineSegments(
      new EdgesGeometry(this.geometry),
      new LineBasicMaterial({ color: 0x000000 }),
    );
  }

  setPosition(x: number, y: number, z: number): void {
    this.mesh.position.setX(x);
    this.mesh.position.setY(y);
    this.mesh.position.setZ(z);

    this.line.position.setX(x);
    this.line.position.setY(y);
    this.line.position.setZ(z);
  }

  getMesh() {
    return this.mesh;
  }

  getLine() {
    return this.line;
  }

  getName() {
    return this.name;
  }
}

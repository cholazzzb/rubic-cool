import {
  BoxGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
} from 'three';
import { rubikInitColor } from './color';

export class Cube {
  private geometry: THREE.BufferGeometry;
  private mesh: THREE.Mesh;
  private line: THREE.LineSegments;
  private name: string;
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

/**
 * @description format is from coordinate: x-y-z
 */
export type CubeName =
  | '0-0-0'
  | '0-0-1'
  | '0-0-2'
  | '0-1-0'
  | '0-1-1'
  | '0-1-2'
  | '0-2-0'
  | '0-2-1'
  | '0-2-2'
  | '1-0-0'
  | '1-0-1'
  | '1-0-2'
  | '1-1-0'
  | '1-1-1'
  | '1-1-2'
  | '1-2-0'
  | '1-2-1'
  | '1-2-2'
  | '2-0-0'
  | '2-0-1'
  | '2-0-2'
  | '2-1-0'
  | '2-1-1'
  | '2-1-2'
  | '2-2-0'
  | '2-2-1'
  | '2-2-2';

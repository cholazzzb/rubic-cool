import {
  BoxGeometry,
  EdgesGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
} from 'three';

export class Cube {
  private geometry: THREE.BufferGeometry;
  private mesh: THREE.Mesh;
  private line: THREE.LineSegments;
  private name: string;
  constructor(colors: Array<number>, name: string, size: number = 0.1) {
    this.geometry = new BoxGeometry(size, size, size).toNonIndexed();
    this.geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

    this.name = name;
    this.mesh = new Mesh(this.geometry, new MeshBasicMaterial({ vertexColors: true }));
    this.mesh.name = name;
    this.line = new LineSegments(new EdgesGeometry(this.geometry), new LineBasicMaterial({ color: 0xffffff }));
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

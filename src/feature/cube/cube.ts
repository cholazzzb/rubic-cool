import {
  BoxGeometry,
  EdgesGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  Vector3,
} from "three";
import { AxisEnum } from "@/shared_library/components/axis_enum";
import { DirectionEnum } from "@/shared_library/components/direction_enum";

export class Cube {
  private geometry: THREE.BufferGeometry;
  private mesh: THREE.Mesh;
  private line: THREE.LineSegments;
  constructor(size: number = 0.1) {
    this.geometry = new BoxGeometry(size, size, size).toNonIndexed();
    this.mesh = new Mesh(
      this.geometry,
      new MeshBasicMaterial({ vertexColors: true })
    );
    this.line = new LineSegments(
      new EdgesGeometry(this.geometry),
      new LineBasicMaterial({ color: 0xffffff })
    );
  }

  paint(colors: Array<number>): void {
    this.geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  }

  setPosition(x: number, y: number, z: number): void {
    this.mesh.position.setX(x);
    this.mesh.position.setY(y);
    this.mesh.position.setZ(z);

    this.line.position.setX(x);
    this.line.position.setY(y);
    this.line.position.setZ(z);
  }

  rotate(axis: AxisEnum, direction: DirectionEnum): void {
    switch (axis) {
      case AxisEnum.XPlus:
        switch (direction) {
          case DirectionEnum.C:
            this.mesh.rotateOnAxis(new Vector3(1, 0, 0), -Math.PI / 2);
            break;
          case DirectionEnum.CC:
            this.mesh.rotateOnAxis(new Vector3(1, 0, 0), Math.PI / 2);
            break;
        }
        break;
      case AxisEnum.XMin:
        switch (direction) {
          case DirectionEnum.C:
            this.mesh.rotateOnAxis(new Vector3(-1, 0, 0), -Math.PI / 2);
            break;
          case DirectionEnum.CC:
            this.mesh.rotateOnAxis(new Vector3(-1, 0, 0), Math.PI / 2);
            break;
        }
        break;
      case AxisEnum.YPlus:
        switch (direction) {
          case DirectionEnum.C:
            this.mesh.rotateOnAxis(new Vector3(0, 1, 0), -Math.PI / 2);
            break;
          case DirectionEnum.CC:
            this.mesh.rotateOnAxis(new Vector3(0, 1, 0), Math.PI / 2);
            break;
        }
        break;
      case AxisEnum.YMin:
        switch (direction) {
          case DirectionEnum.C:
            this.mesh.rotateOnAxis(new Vector3(0, -1, 0), -Math.PI / 2);
            break;
          case DirectionEnum.CC:
            this.mesh.rotateOnAxis(new Vector3(0, -1, 0), Math.PI / 2);
            break;
        }
        break;
      case AxisEnum.ZPlus:
        switch (direction) {
          case DirectionEnum.C:
            this.mesh.rotateOnAxis(new Vector3(0, 0, 1), -Math.PI / 2);
            break;
          case DirectionEnum.CC:
            this.mesh.rotateOnAxis(new Vector3(0, 0, 1), Math.PI / 2);
            break;
        }
        break;
      case AxisEnum.ZMin:
        switch (direction) {
          case DirectionEnum.C:
            this.mesh.rotateOnAxis(new Vector3(0, 0, -1), -Math.PI / 2);
            break;
          case DirectionEnum.CC:
            this.mesh.rotateOnAxis(new Vector3(0, 0, -1), Math.PI / 2);
            break;
        }
        break;
    }
  }

  getMesh() {
    return this.mesh;
  }

  getLine() {
    return this.line;
  }
}

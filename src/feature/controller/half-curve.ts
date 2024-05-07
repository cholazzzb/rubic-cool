import * as THREE from 'three';

import { FACE } from '@/shared/enum';

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

export class HalfCurve extends THREE.Group {
  private arrow: THREE.Mesh;
  private cone: THREE.Mesh;

  private static curvePoints = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.05, 0.03, 0),
    new THREE.Vector3(0.15, 0.05, 0),
    new THREE.Vector3(0.25, 0.03, 0),
    new THREE.Vector3(0.3, 0, 0),
  ];

  constructor(
    name: MOVE,
    translate?: THREE.Vector3,
    rotationAxis?: THREE.Vector3,
  ) {
    super();
    const curvePoints = HalfCurve.curvePoints.map((cp) => {
      const newCp = cp.clone();
      if (translate) {
        newCp.add(translate);
      }
      if (rotationAxis) {
        newCp.applyAxisAngle(rotationAxis, Math.PI);
      }
      return newCp;
    });

    const curve = new THREE.CatmullRomCurve3(curvePoints);

    const arrowStart = 0.25;
    const arrowEnd = 0.75;

    const curveSubset = curve
      .getPoints(100)
      .slice(Math.floor(arrowStart * 100), Math.floor(arrowEnd * 100) + 1);
    const curvePath = new THREE.CatmullRomCurve3(curveSubset);

    const extrudeSettings = {
      steps: 50,
      bevelEnabled: false,
      extrudePath: curvePath,
    };

    const arrowLength = 0.02;
    const arrowWidth = 0.01;
    const arrowHeadLength = 0.03;

    const shape = new THREE.Shape();
    shape.moveTo(-arrowWidth / 2, 0);
    shape.lineTo(-arrowWidth / 2, arrowLength - arrowHeadLength);
    shape.lineTo(arrowWidth / 2, arrowLength - arrowHeadLength);
    shape.lineTo(arrowWidth / 2, 0);
    shape.lineTo(-arrowWidth / 2, 0);

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });

    this.arrow = new THREE.Mesh(geometry, material);
    this.arrow.name = `arrow-${name}`;
    const coneGeometry = new THREE.ConeGeometry(
      arrowWidth * 1.3,
      arrowHeadLength,
      12,
    );
    const coneMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    this.cone = new THREE.Mesh(coneGeometry, coneMaterial);
    this.cone.name = `cone-${name}`;
    this.cone.position.copy(curvePath.getPoint(1));
    if (rotationAxis) {
      this.cone.rotateOnAxis(rotationAxis, Math.PI);
    }

    this.add(this.arrow);
    this.add(this.cone);
  }

  mirrorX() {
    this.children.forEach((object) => {
      object.position.x *= -1;
      object.scale.x *= -1;
    });
    return this;
  }

  mirrorY() {
    this.children.forEach((object) => {
      object.position.y *= -1;
      object.scale.y *= -1;
    });
    return this;
  }

  mirrorZ() {
    this.children.forEach((object) => {
      object.position.z *= -1;
      object.scale.z *= -1;
    });
    return this;
  }

  rotateOnAxis(axis: THREE.Vector3, angle: number): this {
    this.children.forEach((object) => {
      object.rotateOnAxis(axis, angle);
    });
    return this;
  }
}

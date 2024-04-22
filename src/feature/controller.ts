import * as THREE from 'three';

import { FACE } from '@/shared/enum';
import { HalfCurve } from './shape/half-curve';

export class Controller extends THREE.Group {
  private topRotator: THREE.Group;
  private bottomRotator: THREE.Group;
  private leftRotator: THREE.Group;
  private rightRotator: THREE.Group;
  private frontRotator: THREE.Group;
  private backRotator: THREE.Group;

  constructor() {
    super();

    this.topRotator = new THREE.Group()
      .add(
        new HalfCurve(`${FACE.TOP}-CC`, new THREE.Vector3(-0.155, 0.055, 0.18)),
      )
      .add(
        new HalfCurve(
          `${FACE.TOP}-C`,
          new THREE.Vector3(-0.155, 0.055, 0.18),
          new THREE.Vector3(0, 0, 1),
        ).mirrorX(),
      )
      .rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
    this.bottomRotator = new THREE.Group()
      .add(
        new HalfCurve(
          `${FACE.BOTTOM}-CC`,
          new THREE.Vector3(-0.155, 0.055, 0.18),
        ),
      )
      .add(
        new HalfCurve(
          `${FACE.BOTTOM}-C`,
          new THREE.Vector3(-0.155, 0.055, 0.18),
          new THREE.Vector3(0, 0, 1),
        ).mirrorX(),
      )
      .rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    this.leftRotator = new THREE.Group()
      .add(
        new HalfCurve(
          `${FACE.LEFT}-CC`,
          new THREE.Vector3(-0.155, 0.055, 0.18),
        ),
      )
      .add(
        new HalfCurve(
          `${FACE.LEFT}-C`,
          new THREE.Vector3(-0.155, 0.055, 0.18),
          new THREE.Vector3(0, 0, 1),
        ).mirrorX(),
      )
      .rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);
    this.rightRotator = new THREE.Group()
      .add(
        new HalfCurve(
          `${FACE.RIGHT}-CC`,
          new THREE.Vector3(-0.155, 0.055, 0.18),
        ),
      )
      .add(
        new HalfCurve(
          `${FACE.RIGHT}-C`,
          new THREE.Vector3(-0.155, 0.055, 0.18),
          new THREE.Vector3(0, 0, 1),
        ).mirrorX(),
      )
      .rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    this.frontRotator = new THREE.Group()
      .add(
        new HalfCurve(
          `${FACE.FRONT}-CC`,
          new THREE.Vector3(-0.155, 0.055, 0.18),
        ),
      )
      .add(
        new HalfCurve(
          `${FACE.FRONT}-C`,
          new THREE.Vector3(-0.155, 0.055, 0.18),
          new THREE.Vector3(0, 0, 1),
        ).mirrorX(),
      );
    this.backRotator = new THREE.Group()
      .add(
        new HalfCurve(
          `${FACE.BACK}-C`,
          new THREE.Vector3(-0.155, 0.055, -0.18),
        ),
      )
      .add(
        new HalfCurve(
          `${FACE.BACK}-CC`,
          new THREE.Vector3(-0.155, 0.055, -0.18),
          new THREE.Vector3(0, 0, 1),
        ).mirrorX(),
      );
  }

  displayRotator(face: FACE) {
    this.clear();
    switch (face) {
      case FACE.TOP: {
        this.add(this.topRotator);
        break;
      }
      case FACE.BOTTOM: {
        this.add(this.bottomRotator);
        break;
      }
      case FACE.LEFT: {
        this.add(this.leftRotator);
        break;
      }
      case FACE.RIGHT: {
        this.add(this.rightRotator);
        break;
      }
      case FACE.FRONT: {
        this.add(this.frontRotator);
        break;
      }
      case FACE.BACK: {
        this.add(this.backRotator);
        break;
      }
    }
  }
}

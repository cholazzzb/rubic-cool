import * as THREE from 'three';

import { FACE, MOVE } from '@/shared/enum';
import { HalfCurve } from './half-curve';

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
      .add(new HalfCurve(MOVE.TOP_CC, new THREE.Vector3(-0.155, 0.055, 0.18)))
      .add(
        new HalfCurve(
          MOVE.TOP_C,
          new THREE.Vector3(-0.155, 0.055, 0.18),
          new THREE.Vector3(0, 0, 1),
        ).mirrorX(),
      )
      .rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
    this.bottomRotator = new THREE.Group()
      .add(
        new HalfCurve(MOVE.BOTTOM_CC, new THREE.Vector3(-0.155, 0.055, 0.18)),
      )
      .add(
        new HalfCurve(
          MOVE.BOTTOM_C,
          new THREE.Vector3(-0.155, 0.055, 0.18),
          new THREE.Vector3(0, 0, 1),
        ).mirrorX(),
      )
      .rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    this.leftRotator = new THREE.Group()
      .add(new HalfCurve(MOVE.LEFT_CC, new THREE.Vector3(-0.155, 0.055, 0.18)))
      .add(
        new HalfCurve(
          MOVE.LEFT_C,
          new THREE.Vector3(-0.155, 0.055, 0.18),
          new THREE.Vector3(0, 0, 1),
        ).mirrorX(),
      )
      .rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);
    this.rightRotator = new THREE.Group()
      .add(new HalfCurve(MOVE.RIGHT_CC, new THREE.Vector3(-0.155, 0.055, 0.18)))
      .add(
        new HalfCurve(
          MOVE.RIGHT_C,
          new THREE.Vector3(-0.155, 0.055, 0.18),
          new THREE.Vector3(0, 0, 1),
        ).mirrorX(),
      )
      .rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    this.frontRotator = new THREE.Group()
      .add(new HalfCurve(MOVE.FRONT_CC, new THREE.Vector3(-0.155, 0.055, 0.18)))
      .add(
        new HalfCurve(
          MOVE.FRONT_C,
          new THREE.Vector3(-0.155, 0.055, 0.18),
          new THREE.Vector3(0, 0, 1),
        ).mirrorX(),
      );
    this.backRotator = new THREE.Group()
      .add(new HalfCurve(MOVE.BACK_C, new THREE.Vector3(-0.155, 0.055, -0.18)))
      .add(
        new HalfCurve(
          MOVE.BACK_CC,
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

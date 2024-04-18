import * as THREE from 'three';
import { describe, expect, it } from 'vitest';

import { DIRECTION } from '@/shared/direction_enum';
import { FACE } from '@/shared/face_enum';
import { Rubic } from './rubic';

describe('should rotate cube correctly', () => {
  describe('Rotate Top', () => {
    it('Rotate Top Clockwise', () => {
      const scene = new THREE.Scene();
      const rubic = new Rubic(scene, () => {});
      const cubes = rubic.getCubes();

      expect(cubes[0][2][0].getName()).toBe('0-2-0');
      expect(cubes[1][2][0].getName()).toBe('1-2-0');
      expect(cubes[2][2][0].getName()).toBe('2-2-0');

      expect(cubes[0][2][1].getName()).toBe('0-2-1');
      expect(cubes[1][2][1].getName()).toBe('1-2-1');
      expect(cubes[2][2][1].getName()).toBe('2-2-1');

      expect(cubes[0][2][2].getName()).toBe('0-2-2');
      expect(cubes[1][2][2].getName()).toBe('1-2-2');
      expect(cubes[2][2][2].getName()).toBe('2-2-2');

      rubic.rotateCube(FACE.TOP, DIRECTION.CLOCKWISE);

      expect(cubes[0][2][0].getName()).toBe('2-2-0');
      expect(cubes[1][2][0].getName()).toBe('2-2-1');
      expect(cubes[2][2][0].getName()).toBe('2-2-2');

      expect(cubes[0][2][1].getName()).toBe('1-2-0');
      expect(cubes[1][2][1].getName()).toBe('1-2-1');
      expect(cubes[2][2][1].getName()).toBe('1-2-2');

      expect(cubes[0][2][2].getName()).toBe('0-2-0');
      expect(cubes[1][2][2].getName()).toBe('0-2-1');
      expect(cubes[2][2][2].getName()).toBe('0-2-2');
    });

    it('Rotate Top CounterClockwise', () => {
      const scene = new THREE.Scene();
      const rubic = new Rubic(scene, () => {});
      const cubes = rubic.getCubes();

      expect(cubes[0][2][0].getName()).toBe('0-2-0');
      expect(cubes[1][2][0].getName()).toBe('1-2-0');
      expect(cubes[2][2][0].getName()).toBe('2-2-0');

      expect(cubes[0][2][1].getName()).toBe('0-2-1');
      expect(cubes[1][2][1].getName()).toBe('1-2-1');
      expect(cubes[2][2][1].getName()).toBe('2-2-1');

      expect(cubes[0][2][2].getName()).toBe('0-2-2');
      expect(cubes[1][2][2].getName()).toBe('1-2-2');
      expect(cubes[2][2][2].getName()).toBe('2-2-2');

      rubic.rotateCube(FACE.TOP, DIRECTION.COUNTERCLOCKWISE);

      expect(cubes[0][2][0].getName()).toBe('0-2-2');
      expect(cubes[1][2][0].getName()).toBe('0-2-1');
      expect(cubes[2][2][0].getName()).toBe('0-2-0');

      expect(cubes[0][2][1].getName()).toBe('1-2-2');
      expect(cubes[1][2][1].getName()).toBe('1-2-1');
      expect(cubes[2][2][1].getName()).toBe('1-2-0');

      expect(cubes[0][2][2].getName()).toBe('2-2-2');
      expect(cubes[1][2][2].getName()).toBe('2-2-1');
      expect(cubes[2][2][2].getName()).toBe('2-2-0');
    });
  });

  describe('Rotate Bottom', () => {
    it('Rotate Bottom Clockwise', () => {
      const scene = new THREE.Scene();
      const rubic = new Rubic(scene, () => {});
      const cubes = rubic.getCubes();

      expect(cubes[0][0][0].getName()).toBe('0-0-0');
      expect(cubes[1][0][0].getName()).toBe('1-0-0');
      expect(cubes[2][0][0].getName()).toBe('2-0-0');

      expect(cubes[0][0][1].getName()).toBe('0-0-1');
      expect(cubes[1][0][1].getName()).toBe('1-0-1');
      expect(cubes[2][0][1].getName()).toBe('2-0-1');

      expect(cubes[0][0][2].getName()).toBe('0-0-2');
      expect(cubes[1][0][2].getName()).toBe('1-0-2');
      expect(cubes[2][0][2].getName()).toBe('2-0-2');

      rubic.rotateCube(FACE.BOTTOM, DIRECTION.CLOCKWISE);

      expect(cubes[0][0][0].getName()).toBe('0-0-2');
      expect(cubes[1][0][0].getName()).toBe('0-0-1');
      expect(cubes[2][0][0].getName()).toBe('0-0-0');

      expect(cubes[0][0][1].getName()).toBe('1-0-2');
      expect(cubes[1][0][1].getName()).toBe('1-0-1');
      expect(cubes[2][0][1].getName()).toBe('1-0-0');

      expect(cubes[0][0][2].getName()).toBe('2-0-2');
      expect(cubes[1][0][2].getName()).toBe('2-0-1');
      expect(cubes[2][0][2].getName()).toBe('2-0-0');
    });

    it('Rotate Bottom CounterClockwise', () => {
      const scene = new THREE.Scene();
      const rubic = new Rubic(scene, () => {});
      const cubes = rubic.getCubes();

      expect(cubes[0][0][0].getName()).toBe('0-0-0');
      expect(cubes[1][0][0].getName()).toBe('1-0-0');
      expect(cubes[2][0][0].getName()).toBe('2-0-0');

      expect(cubes[0][0][1].getName()).toBe('0-0-1');
      expect(cubes[1][0][1].getName()).toBe('1-0-1');
      expect(cubes[2][0][1].getName()).toBe('2-0-1');

      expect(cubes[0][0][2].getName()).toBe('0-0-2');
      expect(cubes[1][0][2].getName()).toBe('1-0-2');
      expect(cubes[2][0][2].getName()).toBe('2-0-2');

      rubic.rotateCube(FACE.BOTTOM, DIRECTION.COUNTERCLOCKWISE);

      expect(cubes[0][0][0].getName()).toBe('2-0-0');
      expect(cubes[1][0][0].getName()).toBe('2-0-1');
      expect(cubes[2][0][0].getName()).toBe('2-0-2');

      expect(cubes[0][0][1].getName()).toBe('1-0-0');
      expect(cubes[1][0][1].getName()).toBe('1-0-1');
      expect(cubes[2][0][1].getName()).toBe('1-0-2');

      expect(cubes[0][0][2].getName()).toBe('0-0-0');
      expect(cubes[1][0][2].getName()).toBe('0-0-1');
      expect(cubes[2][0][2].getName()).toBe('0-0-2');
    });
  });

  describe('Rotate Left', () => {
    it('Rotate Left Clockwise', () => {
      const scene = new THREE.Scene();
      const rubic = new Rubic(scene, () => {});
      const cubes = rubic.getCubes();

      expect(cubes[0][0][0].getName()).toBe('0-0-0');
      expect(cubes[0][0][1].getName()).toBe('0-0-1');
      expect(cubes[0][0][2].getName()).toBe('0-0-2');

      expect(cubes[0][1][0].getName()).toBe('0-1-0');
      expect(cubes[0][1][1].getName()).toBe('0-1-1');
      expect(cubes[0][1][2].getName()).toBe('0-1-2');

      expect(cubes[0][2][0].getName()).toBe('0-2-0');
      expect(cubes[0][2][1].getName()).toBe('0-2-1');
      expect(cubes[0][2][2].getName()).toBe('0-2-2');

      rubic.rotateCube(FACE.LEFT, DIRECTION.CLOCKWISE);

      expect(cubes[0][0][0].getName()).toBe('0-2-0');
      expect(cubes[0][0][1].getName()).toBe('0-1-0');
      expect(cubes[0][0][2].getName()).toBe('0-0-0');

      expect(cubes[0][1][0].getName()).toBe('0-2-1');
      expect(cubes[0][1][1].getName()).toBe('0-1-1');
      expect(cubes[0][1][2].getName()).toBe('0-0-1');

      expect(cubes[0][2][0].getName()).toBe('0-2-2');
      expect(cubes[0][2][1].getName()).toBe('0-1-2');
      expect(cubes[0][2][2].getName()).toBe('0-0-2');
    });

    it('Rotate Left CounterClockwise', () => {
      const scene = new THREE.Scene();
      const rubic = new Rubic(scene, () => {});
      const cubes = rubic.getCubes();

      expect(cubes[0][0][0].getName()).toBe('0-0-0');
      expect(cubes[0][0][1].getName()).toBe('0-0-1');
      expect(cubes[0][0][2].getName()).toBe('0-0-2');

      expect(cubes[0][1][0].getName()).toBe('0-1-0');
      expect(cubes[0][1][1].getName()).toBe('0-1-1');
      expect(cubes[0][1][2].getName()).toBe('0-1-2');

      expect(cubes[0][2][0].getName()).toBe('0-2-0');
      expect(cubes[0][2][1].getName()).toBe('0-2-1');
      expect(cubes[0][2][2].getName()).toBe('0-2-2');

      rubic.rotateCube(FACE.LEFT, DIRECTION.COUNTERCLOCKWISE);

      expect(cubes[0][0][0].getName()).toBe('0-0-2');
      expect(cubes[0][0][1].getName()).toBe('0-1-2');
      expect(cubes[0][0][2].getName()).toBe('0-2-2');

      expect(cubes[0][1][0].getName()).toBe('0-0-1');
      expect(cubes[0][1][1].getName()).toBe('0-1-1');
      expect(cubes[0][1][2].getName()).toBe('0-2-1');

      expect(cubes[0][2][0].getName()).toBe('0-0-0');
      expect(cubes[0][2][1].getName()).toBe('0-1-0');
      expect(cubes[0][2][2].getName()).toBe('0-2-0');
    });
  });

  describe('Rotate Right', () => {
    it('Rotate Right Clockwise', () => {
      const scene = new THREE.Scene();
      const rubic = new Rubic(scene, () => {});
      const cubes = rubic.getCubes();

      expect(cubes[2][0][0].getName()).toBe('2-0-0');
      expect(cubes[2][0][1].getName()).toBe('2-0-1');
      expect(cubes[2][0][2].getName()).toBe('2-0-2');

      expect(cubes[2][1][0].getName()).toBe('2-1-0');
      expect(cubes[2][1][1].getName()).toBe('2-1-1');
      expect(cubes[2][1][2].getName()).toBe('2-1-2');

      expect(cubes[2][2][0].getName()).toBe('2-2-0');
      expect(cubes[2][2][1].getName()).toBe('2-2-1');
      expect(cubes[2][2][2].getName()).toBe('2-2-2');

      rubic.rotateCube(FACE.RIGHT, DIRECTION.CLOCKWISE);

      expect(cubes[2][0][0].getName()).toBe('2-0-2');
      expect(cubes[2][0][1].getName()).toBe('2-1-2');
      expect(cubes[2][0][2].getName()).toBe('2-2-2');

      expect(cubes[2][1][0].getName()).toBe('2-0-1');
      expect(cubes[2][1][1].getName()).toBe('2-1-1');
      expect(cubes[2][1][2].getName()).toBe('2-2-1');

      expect(cubes[2][2][0].getName()).toBe('2-0-0');
      expect(cubes[2][2][1].getName()).toBe('2-1-0');
      expect(cubes[2][2][2].getName()).toBe('2-2-0');
    });

    it('Rotate Right CounterClockwise', () => {
      const scene = new THREE.Scene();
      const rubic = new Rubic(scene, () => {});
      const cubes = rubic.getCubes();

      expect(cubes[2][0][0].getName()).toBe('2-0-0');
      expect(cubes[2][0][1].getName()).toBe('2-0-1');
      expect(cubes[2][0][2].getName()).toBe('2-0-2');

      expect(cubes[2][1][0].getName()).toBe('2-1-0');
      expect(cubes[2][1][1].getName()).toBe('2-1-1');
      expect(cubes[2][1][2].getName()).toBe('2-1-2');

      expect(cubes[2][2][0].getName()).toBe('2-2-0');
      expect(cubes[2][2][1].getName()).toBe('2-2-1');
      expect(cubes[2][2][2].getName()).toBe('2-2-2');

      rubic.rotateCube(FACE.RIGHT, DIRECTION.COUNTERCLOCKWISE);

      expect(cubes[2][0][0].getName()).toBe('2-2-0');
      expect(cubes[2][0][1].getName()).toBe('2-1-0');
      expect(cubes[2][0][2].getName()).toBe('2-0-0');

      expect(cubes[2][1][0].getName()).toBe('2-2-1');
      expect(cubes[2][1][1].getName()).toBe('2-1-1');
      expect(cubes[2][1][2].getName()).toBe('2-0-1');

      expect(cubes[2][2][0].getName()).toBe('2-2-2');
      expect(cubes[2][2][1].getName()).toBe('2-1-2');
      expect(cubes[2][2][2].getName()).toBe('2-0-2');
    });
  });

  describe('Rotate Front', () => {
    it('Rotate Front Clockwise', () => {
      const scene = new THREE.Scene();
      const rubic = new Rubic(scene, () => {});
      const cubes = rubic.getCubes();

      expect(cubes[0][0][2].getName()).toBe('0-0-2');
      expect(cubes[0][1][2].getName()).toBe('0-1-2');
      expect(cubes[0][2][2].getName()).toBe('0-2-2');

      expect(cubes[1][0][2].getName()).toBe('1-0-2');
      expect(cubes[1][1][2].getName()).toBe('1-1-2');
      expect(cubes[1][2][2].getName()).toBe('1-2-2');

      expect(cubes[2][0][2].getName()).toBe('2-0-2');
      expect(cubes[2][1][2].getName()).toBe('2-1-2');
      expect(cubes[2][2][2].getName()).toBe('2-2-2');

      rubic.rotateCube(FACE.FRONT, DIRECTION.CLOCKWISE);

      expect(cubes[0][0][2].getName()).toBe('0-2-2');
      expect(cubes[0][1][2].getName()).toBe('1-2-2');
      expect(cubes[0][2][2].getName()).toBe('2-2-2');

      expect(cubes[1][0][2].getName()).toBe('0-1-2');
      expect(cubes[1][1][2].getName()).toBe('1-1-2');
      expect(cubes[1][2][2].getName()).toBe('2-1-2');

      expect(cubes[2][0][2].getName()).toBe('0-0-2');
      expect(cubes[2][1][2].getName()).toBe('1-0-2');
      expect(cubes[2][2][2].getName()).toBe('2-0-2');
    });

    it('Rotate Front CounterClockwise', () => {
      const scene = new THREE.Scene();
      const rubic = new Rubic(scene, () => {});
      const cubes = rubic.getCubes();

      expect(cubes[0][0][2].getName()).toBe('0-0-2');
      expect(cubes[0][1][2].getName()).toBe('0-1-2');
      expect(cubes[0][2][2].getName()).toBe('0-2-2');

      expect(cubes[1][0][2].getName()).toBe('1-0-2');
      expect(cubes[1][1][2].getName()).toBe('1-1-2');
      expect(cubes[1][2][2].getName()).toBe('1-2-2');

      expect(cubes[2][0][2].getName()).toBe('2-0-2');
      expect(cubes[2][1][2].getName()).toBe('2-1-2');
      expect(cubes[2][2][2].getName()).toBe('2-2-2');

      rubic.rotateCube(FACE.FRONT, DIRECTION.COUNTERCLOCKWISE);

      expect(cubes[0][0][2].getName()).toBe('2-0-2');
      expect(cubes[0][1][2].getName()).toBe('1-0-2');
      expect(cubes[0][2][2].getName()).toBe('0-0-2');

      expect(cubes[1][0][2].getName()).toBe('2-1-2');
      expect(cubes[1][1][2].getName()).toBe('1-1-2');
      expect(cubes[1][2][2].getName()).toBe('0-1-2');

      expect(cubes[2][0][2].getName()).toBe('2-2-2');
      expect(cubes[2][1][2].getName()).toBe('1-2-2');
      expect(cubes[2][2][2].getName()).toBe('0-2-2');
    });
  });

  describe('Rotate Back', () => {
    it('Rotate Back Clockwise', () => {
      const scene = new THREE.Scene();
      const rubic = new Rubic(scene, () => {});
      const cubes = rubic.getCubes();

      expect(cubes[0][0][0].getName()).toBe('0-0-0');
      expect(cubes[0][1][0].getName()).toBe('0-1-0');
      expect(cubes[0][2][0].getName()).toBe('0-2-0');

      expect(cubes[1][0][0].getName()).toBe('1-0-0');
      expect(cubes[1][1][0].getName()).toBe('1-1-0');
      expect(cubes[1][2][0].getName()).toBe('1-2-0');

      expect(cubes[2][0][0].getName()).toBe('2-0-0');
      expect(cubes[2][1][0].getName()).toBe('2-1-0');
      expect(cubes[2][2][0].getName()).toBe('2-2-0');

      rubic.rotateCube(FACE.BACK, DIRECTION.CLOCKWISE);

      expect(cubes[0][0][0].getName()).toBe('2-0-0');
      expect(cubes[0][1][0].getName()).toBe('1-0-0');
      expect(cubes[0][2][0].getName()).toBe('0-0-0');

      expect(cubes[1][0][0].getName()).toBe('2-1-0');
      expect(cubes[1][1][0].getName()).toBe('1-1-0');
      expect(cubes[1][2][0].getName()).toBe('0-1-0');

      expect(cubes[2][0][0].getName()).toBe('2-2-0');
      expect(cubes[2][1][0].getName()).toBe('1-2-0');
      expect(cubes[2][2][0].getName()).toBe('0-2-0');
    });

    it('Rotate Back CounterClockwise', () => {
      const scene = new THREE.Scene();
      const rubic = new Rubic(scene, () => {});
      const cubes = rubic.getCubes();

      expect(cubes[0][2][0].getName()).toBe('0-2-0');
      expect(cubes[1][2][0].getName()).toBe('1-2-0');
      expect(cubes[2][2][0].getName()).toBe('2-2-0');

      expect(cubes[0][2][1].getName()).toBe('0-2-1');
      expect(cubes[1][2][1].getName()).toBe('1-2-1');
      expect(cubes[2][2][1].getName()).toBe('2-2-1');

      expect(cubes[0][2][2].getName()).toBe('0-2-2');
      expect(cubes[1][2][2].getName()).toBe('1-2-2');
      expect(cubes[2][2][2].getName()).toBe('2-2-2');

      rubic.rotateCube(FACE.BACK, DIRECTION.COUNTERCLOCKWISE);

      expect(cubes[0][2][0].getName()).toBe('2-2-0');
      expect(cubes[1][2][0].getName()).toBe('2-1-0');
      expect(cubes[2][2][0].getName()).toBe('2-0-0');

      expect(cubes[0][2][1].getName()).toBe('0-2-1');
      expect(cubes[1][2][1].getName()).toBe('1-2-1');
      expect(cubes[2][2][1].getName()).toBe('2-2-1');

      expect(cubes[0][2][2].getName()).toBe('0-2-2');
      expect(cubes[1][2][2].getName()).toBe('1-2-2');
      expect(cubes[2][2][2].getName()).toBe('2-2-2');
    });
  });
});

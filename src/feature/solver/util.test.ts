import * as THREE from 'three';
import { describe, expect, it } from 'vitest';

import { DIRECTION, FACE } from '@/shared/enum';
import { Rubic } from '../rubic';
import { getCubePosition, isCubeOnTarget, vectorAfterRotation } from './util';

describe('isCubeOnTarget', () => {
  it('move front', () => {
    const scene = new THREE.Scene();
    const rubic = new Rubic(scene, () => {});
    rubic.rotate(FACE.FRONT, DIRECTION.CLOCKWISE, 1);

    const cubes = rubic.getCubes();

    const frontTarget = '1-0-2';
    const {
      position: [Fx, Fy, Fz],
    } = getCubePosition(cubes, [frontTarget]);
    expect(isCubeOnTarget(frontTarget, cubes[Fx][Fy][Fz])).toBeFalsy();

    const backTarget = '1-0-0';
    const {
      position: [Bx, By, Bz],
    } = getCubePosition(cubes, [backTarget]);
    expect(isCubeOnTarget(backTarget, cubes[Bx][By][Bz])).toBeTruthy();

    const leftTarget = '0-0-1';
    const {
      position: [Lx, Ly, Lz],
    } = getCubePosition(cubes, [leftTarget]);
    expect(isCubeOnTarget(leftTarget, cubes[Lx][Ly][Lz])).toBeTruthy();

    const rightTarget = '2-0-1';
    const {
      position: [Rx, Ry, Rz],
    } = getCubePosition(cubes, [rightTarget]);
    expect(isCubeOnTarget(rightTarget, cubes[Rx][Ry][Rz])).toBeTruthy();
  });

  it('move back', () => {
    const scene = new THREE.Scene();
    const rubic = new Rubic(scene, () => {});
    rubic.rotate(FACE.BACK, DIRECTION.CLOCKWISE, 1);

    const cubes = rubic.getCubes();

    const frontTarget = '1-0-2';
    const {
      position: [Fx, Fy, Fz],
    } = getCubePosition(cubes, [frontTarget]);
    expect(isCubeOnTarget(frontTarget, cubes[Fx][Fy][Fz])).toBeTruthy();

    const backTarget = '1-0-0';
    const {
      position: [Bx, By, Bz],
    } = getCubePosition(cubes, [backTarget]);
    expect(isCubeOnTarget(backTarget, cubes[Bx][By][Bz])).toBeFalsy();

    const leftTarget = '0-0-1';
    const {
      position: [Lx, Ly, Lz],
    } = getCubePosition(cubes, [leftTarget]);
    expect(isCubeOnTarget(leftTarget, cubes[Lx][Ly][Lz])).toBeTruthy();

    const rightTarget = '2-0-1';
    const {
      position: [Rx, Ry, Rz],
    } = getCubePosition(cubes, [rightTarget]);
    expect(isCubeOnTarget(rightTarget, cubes[Rx][Ry][Rz])).toBeTruthy();
  });

  it('move left', () => {
    const scene = new THREE.Scene();
    const rubic = new Rubic(scene, () => {});
    rubic.rotate(FACE.LEFT, DIRECTION.CLOCKWISE, 1);

    const cubes = rubic.getCubes();

    const frontTarget = '1-0-2';
    const {
      position: [Fx, Fy, Fz],
    } = getCubePosition(cubes, [frontTarget]);
    expect(isCubeOnTarget(frontTarget, cubes[Fx][Fy][Fz])).toBeTruthy();

    const backTarget = '1-0-0';
    const {
      position: [Bx, By, Bz],
    } = getCubePosition(cubes, [backTarget]);
    expect(isCubeOnTarget(backTarget, cubes[Bx][By][Bz])).toBeTruthy();

    const leftTarget = '0-0-1';
    const {
      position: [Lx, Ly, Lz],
    } = getCubePosition(cubes, [leftTarget]);
    expect(isCubeOnTarget(leftTarget, cubes[Lx][Ly][Lz])).toBeFalsy();

    const rightTarget = '2-0-1';
    const {
      position: [Rx, Ry, Rz],
    } = getCubePosition(cubes, [rightTarget]);
    expect(isCubeOnTarget(rightTarget, cubes[Rx][Ry][Rz])).toBeTruthy();
  });

  it('move front', () => {
    const scene = new THREE.Scene();
    const rubic = new Rubic(scene, () => {});
    rubic.rotate(FACE.RIGHT, DIRECTION.CLOCKWISE, 1);

    const cubes = rubic.getCubes();

    const frontTarget = '1-0-2';
    const {
      position: [Fx, Fy, Fz],
    } = getCubePosition(cubes, [frontTarget]);
    expect(isCubeOnTarget(frontTarget, cubes[Fx][Fy][Fz])).toBeTruthy();

    const backTarget = '1-0-0';
    const {
      position: [Bx, By, Bz],
    } = getCubePosition(cubes, [backTarget]);
    expect(isCubeOnTarget(backTarget, cubes[Bx][By][Bz])).toBeTruthy();

    const leftTarget = '0-0-1';
    const {
      position: [Lx, Ly, Lz],
    } = getCubePosition(cubes, [leftTarget]);
    expect(isCubeOnTarget(leftTarget, cubes[Lx][Ly][Lz])).toBeTruthy();

    const rightTarget = '2-0-1';
    const {
      position: [Rx, Ry, Rz],
    } = getCubePosition(cubes, [rightTarget]);
    expect(isCubeOnTarget(rightTarget, cubes[Rx][Ry][Rz])).toBeFalsy();
  });
});

describe('vectorAfterRotation', () => {
  it('bottom to left', () => {
    const bottom = new THREE.Vector3(0, -1, 0);
    const rotation = new THREE.Euler(0, 0, -Math.PI / 2);
    const rotated = vectorAfterRotation(bottom, rotation);
    expect(rotated.x).toBe(-1);
    expect(rotated.y).toSatisfy((val) => val === 0 || Object.is(val, -0));
    expect(rotated.z).toSatisfy((val) => val === 0 || Object.is(val, -0));
  });

  it('bottom to top', () => {
    const bottom = new THREE.Vector3(0, -1, 0);
    const rotation = new THREE.Euler(0, 0, -Math.PI);
    const rotated = vectorAfterRotation(bottom, rotation);
    expect(rotated.x).toSatisfy((val) => val === 0 || Object.is(val, -0));
    expect(rotated.y).toBe(1);
    expect(rotated.z).toSatisfy((val) => val === 0 || Object.is(val, -0));
  });

  it('bottom to right from left', () => {
    const bottom = new THREE.Vector3(0, -1, 0);
    const rotation = new THREE.Euler(0, 0, (-3 * Math.PI) / 2);
    const rotated = vectorAfterRotation(bottom, rotation);
    expect(rotated.x).toBe(1);
    expect(rotated.y).toSatisfy((val) => val === 0 || Object.is(val, -0));
    expect(rotated.z).toSatisfy((val) => val === 0 || Object.is(val, -0));
  });
});

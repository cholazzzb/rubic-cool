import { Group, MathUtils, Quaternion, Vector3 } from 'three';

import { Cube } from '@/feature/cube/cube';
import { animate, animateRepeat } from './animator';
import { DIRECTION } from '@/shared/direction_enum';
import { FACE } from '@/shared/face_enum';
import { ColorEnum } from '@/shared/color_enum';

/**
 * @description
 * Abbreviation ->
 * C: Clockwise, CC: CounterClockwise
 *
 * The rubik's clockwise rotation follow the + axis rotation
 * The right face equal X+ axis
 * The top face equal Y+ axis
 * The front face equal Z+ axis
 * @example
 * - Top face rotate counter clockwise
 * - Note that R, G, B represents the color
 * ## Before
 *    /B B B/G|
 *   /G G G/G |
 *  /R R R/G  |
 *  |_____|
 *  |R R R|  /
 *  |R R R| /
 *  |R R R|/
 * ## After
 *    /R G B/?|
 *   /R G B/? |
 *  /R G B/?  |
 *  |_____|
 *  |G G G|  /
 *  |R R R| /
 *  |R R R|/
 */
export class Rubic {
  private static size = 0.1;
  private static halfSize = Rubic.size / 2;
  private static edgeChain: Array<[number, number]> = [
    [0, 0], // O <---- O
    [0, 2], // |       ^
    [2, 2], // |       |
    [2, 0], // v       |
    [0, 0], // O ----> O
  ];
  private static cornerChain = [
    [0, 1], //   _ O
    [1, 2], //   / | \ /
    [2, 1], // O -    - O
    [1, 0], // | \ | /
    [0, 1], //     O -
  ];

  private scene: THREE.Scene;
  private onAnimate: () => void;

  private cubes: Array<Array<Array<Cube>>>;
  getCubes() {
    return this.cubes;
  }

  constructor(scene: THREE.Scene, onAnimate: () => void) {
    this.scene = scene;
    this.onAnimate = onAnimate;

    const colors = this.buildColor();

    const cubes = [];
    for (let x = 0; x < 3; x++) {
      const xs = [];
      for (let y = 0; y < 3; y++) {
        const ys = [];
        for (let z = 0; z < 3; z++) {
          ys.push(new Cube(colors, `${x}-${y}-${z}`));
        }
        xs.push(ys);
      }
      cubes.push(xs);
    }

    this.cubes = cubes;
  }

  rotate(face: FACE, direction: DIRECTION) {
    switch (face) {
      case FACE.TOP: {
        const cubes = this.getTopFaceCube();
        switch (direction) {
          case DIRECTION.CLOCKWISE:
            this.rotateFace(cubes, new Vector3(0, 1, 0));
            break;

          case DIRECTION.COUNTERCLOCKWISE:
            this.rotateFace(cubes, new Vector3(0, -1, 0));
            break;
        }
        break;
      }

      case FACE.BOTTOM: {
        const cubes = this.getBottomFaceCube();
        switch (direction) {
          case DIRECTION.CLOCKWISE:
            this.rotateFace(cubes, new Vector3(0, -1, 0));
            break;

          case DIRECTION.COUNTERCLOCKWISE:
            this.rotateFace(cubes, new Vector3(0, 1, 0));
            break;
        }
        break;
      }

      case FACE.LEFT: {
        const cubes = this.getLeftFaceCube();
        switch (direction) {
          case DIRECTION.CLOCKWISE:
            this.rotateFace(cubes, new Vector3(-1, 0, 0));
            break;

          case DIRECTION.COUNTERCLOCKWISE:
            this.rotateFace(cubes, new Vector3(1, 0, 0));
            break;
        }
        break;
      }

      case FACE.RIGHT: {
        const cubes = this.getRightFaceCube();
        switch (direction) {
          case DIRECTION.CLOCKWISE:
            this.rotateFace(cubes, new Vector3(1, 0, 0));
            break;

          case DIRECTION.COUNTERCLOCKWISE:
            this.rotateFace(cubes, new Vector3(-1, 0, 0));
            break;
        }
        break;
      }

      case FACE.FRONT: {
        const cubes = this.getFrontFaceCube();
        switch (direction) {
          case DIRECTION.CLOCKWISE:
            this.rotateFace(cubes, new Vector3(0, 0, 1));
            break;

          case DIRECTION.COUNTERCLOCKWISE:
            this.rotateFace(cubes, new Vector3(0, 0, -1));
            break;
        }
        break;
      }

      case FACE.BACK: {
        const cubes = this.getBackFaceCube();
        switch (direction) {
          case DIRECTION.CLOCKWISE:
            this.rotateFace(cubes, new Vector3(0, 0, -1));
            break;

          case DIRECTION.COUNTERCLOCKWISE:
            this.rotateFace(cubes, new Vector3(0, 0, 1));
            break;
        }
        break;
      }
    }

    this.rotateCube(face, direction);
  }

  rotateFace(cubes: Array<Cube>, axis: Vector3) {
    const self = this;
    const cb = self.onAnimate;

    function act() {
      const group = new Group();
      cubes.forEach((cube) => {
        const mesh = cube.getMesh();
        const line = cube.getLine();
        group.add(mesh);
        group.add(line);
      });
      group.rotateOnAxis(axis, MathUtils.degToRad(5));

      // cleanup group
      cubes.forEach((cube) => {
        const mesh = cube.getMesh();
        const meshPosition = mesh.getWorldPosition(new Vector3());
        const meshQuaternion = mesh.getWorldQuaternion(new Quaternion());

        group.remove(mesh);
        mesh.position.copy(meshPosition);
        mesh.quaternion.copy(meshQuaternion);
        self.scene.add(mesh);

        const line = cube.getLine();
        const linePosition = line.getWorldPosition(new Vector3());
        const lineQuaternion = line.getWorldQuaternion(new Quaternion());

        group.remove(line);
        line.position.copy(linePosition);
        line.quaternion.copy(lineQuaternion);
        self.scene.add(line);
      });
    }

    animateRepeat({
      act,
      repeat: 18,
      onAnimate: function () {
        cb();
      },
    });
  }

  rotateCube(face: FACE, direction: DIRECTION) {
    const alignedEdgeChains = (() => {
      if (face === FACE.FRONT || face === FACE.BOTTOM || face === FACE.RIGHT) {
        return direction === DIRECTION.CLOCKWISE
          ? Rubic.edgeChain
          : [...Rubic.edgeChain].reverse();
      }
      return direction === DIRECTION.CLOCKWISE
        ? [...Rubic.edgeChain].reverse()
        : Rubic.edgeChain;
    })();
    const edgeChains: Array<[number, number, number]> = [];
    alignedEdgeChains.forEach((edge) => {
      const chain = [...edge];
      const [idx, side] = (() => {
        switch (face) {
          case FACE.LEFT:
            return [0, 0];
          case FACE.RIGHT:
            return [0, 2];
          case FACE.TOP:
            return [1, 2];
          case FACE.BOTTOM:
            return [1, 0];
          case FACE.FRONT:
            return [2, 2];
          case FACE.BACK:
            return [2, 0];
          default:
            return [0, 0];
        }
      })();
      chain.splice(idx, 0, side);
      edgeChains.push(chain as [number, number, number]);
    });

    [
      this.cubes[edgeChains[0][0]][edgeChains[0][1]][edgeChains[0][2]],
      this.cubes[edgeChains[1][0]][edgeChains[1][1]][edgeChains[1][2]],
      this.cubes[edgeChains[2][0]][edgeChains[2][1]][edgeChains[2][2]],
      this.cubes[edgeChains[3][0]][edgeChains[3][1]][edgeChains[3][2]],
    ] = [
      this.cubes[edgeChains[1][0]][edgeChains[1][1]][edgeChains[1][2]],
      this.cubes[edgeChains[2][0]][edgeChains[2][1]][edgeChains[2][2]],
      this.cubes[edgeChains[3][0]][edgeChains[3][1]][edgeChains[3][2]],
      this.cubes[edgeChains[4][0]][edgeChains[4][1]][edgeChains[4][2]],
    ];

    const alignedCornerChains = (() => {
      if (face === FACE.FRONT || face === FACE.BOTTOM || face === FACE.RIGHT) {
        return direction === DIRECTION.CLOCKWISE
          ? Rubic.cornerChain
          : [...Rubic.cornerChain].reverse();
      }
      return direction === DIRECTION.CLOCKWISE
        ? [...Rubic.cornerChain].reverse()
        : Rubic.cornerChain;
    })();
    const cornerChains: Array<[number, number, number]> = [];
    alignedCornerChains.forEach((corner) => {
      const chain = [...corner];
      const [idx, side] = (() => {
        switch (face) {
          case FACE.LEFT:
            return [0, 0];
          case FACE.RIGHT:
            return [0, 2];
          case FACE.TOP:
            return [1, 2];
          case FACE.BOTTOM:
            return [1, 0];
          case FACE.FRONT:
            return [2, 2];
          case FACE.BACK:
            return [2, 0];
          default:
            return [0, 0];
        }
      })();
      chain.splice(idx, 0, side);
      cornerChains.push(chain as [number, number, number]);
    });

    [
      this.cubes[cornerChains[0][0]][cornerChains[0][1]][cornerChains[0][2]],
      this.cubes[cornerChains[1][0]][cornerChains[1][1]][cornerChains[1][2]],
      this.cubes[cornerChains[2][0]][cornerChains[2][1]][cornerChains[2][2]],
      this.cubes[cornerChains[3][0]][cornerChains[3][1]][cornerChains[3][2]],
    ] = [
      this.cubes[cornerChains[1][0]][cornerChains[1][1]][cornerChains[1][2]],
      this.cubes[cornerChains[2][0]][cornerChains[2][1]][cornerChains[2][2]],
      this.cubes[cornerChains[3][0]][cornerChains[3][1]][cornerChains[3][2]],
      this.cubes[cornerChains[4][0]][cornerChains[4][1]][cornerChains[4][2]],
    ];
  }

  getTopFaceCube() {
    const topFaceCube: Array<Cube> = [];
    for (let x = 0; x < 3; x++) {
      for (let z = 0; z < 3; z++) {
        topFaceCube.push(this.cubes[x][2][z]);
      }
    }
    return topFaceCube;
  }

  getBottomFaceCube() {
    const topFaceCube: Array<Cube> = [];
    for (let x = 0; x < 3; x++) {
      for (let z = 0; z < 3; z++) {
        topFaceCube.push(this.cubes[x][0][z]);
      }
    }
    return topFaceCube;
  }

  getLeftFaceCube() {
    const leftFaceCube: Array<Cube> = [];
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 3; z++) {
        leftFaceCube.push(this.cubes[0][y][z]);
      }
    }
    return leftFaceCube;
  }

  getRightFaceCube() {
    const rightFaceCube: Array<Cube> = [];
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 3; z++) {
        rightFaceCube.push(this.cubes[2][y][z]);
      }
    }
    return rightFaceCube;
  }

  getFrontFaceCube() {
    const frontFaceCube: Array<Cube> = [];
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        frontFaceCube.push(this.cubes[x][y][2]);
      }
    }
    return frontFaceCube;
  }

  getBackFaceCube() {
    const backFaceCube: Array<Cube> = [];
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        backFaceCube.push(this.cubes[x][y][0]);
      }
    }
    return backFaceCube;
  }

  buildColor() {
    const result: Array<number> = [];

    const xColors = [
      ColorEnum.softPink,
      ColorEnum.babyBlue,
      ColorEnum.peach,
      ColorEnum.mintGreen,
      ColorEnum.lavender,
      ColorEnum.paleYellow,
    ];

    for (let i = 0; i < 6; i++) {
      // define the same color for each vertex of a triangle
      const c = xColors[i];

      result.push(c.r, c.g, c.b);
      result.push(c.r, c.g, c.b);
      result.push(c.r, c.g, c.b);
      result.push(c.r, c.g, c.b);
      result.push(c.r, c.g, c.b);
      result.push(c.r, c.g, c.b);
    }

    return result;
  }

  render() {
    const size = Rubic.size;
    const halfSize = Rubic.halfSize;
    this.cubes.forEach((xs, x) => {
      xs.forEach((ys, y) => {
        ys.forEach((cube, z) => {
          cube.setPosition(
            halfSize + (x - 1.5) * size,
            halfSize + (y - 1.5) * size,
            halfSize + (z - 1.5) * size,
          );
          this.scene.add(cube.getMesh());
          this.scene.add(cube.getLine());
        });
      });
    });

    animate({ onAnimate: this.onAnimate });
  }
}

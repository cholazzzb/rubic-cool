import { Cube } from "@/feature/cube/cube";
import { AxisEnum } from "@/shared_library/components/axis_enum";
import { ColorEnum } from "@/shared_library/components/color_enum";
import { DirectionEnum } from "@/shared_library/components/direction_enum";

export class Rubic {
  private static size = 0.1;
  private static halfSize = Rubic.size / 2;
  private static scene: THREE.Scene;

  private static cubes: Array<Array<Array<Cube>>>;

  constructor(scene: THREE.Scene) {
    Rubic.scene = scene;

    const cubes = [];
    for (let x = 0; x < 3; x++) {
      const xs = [];
      for (let y = 0; y < 3; y++) {
        const ys = [];
        for (let z = 0; z < 3; z++) {
          ys.push(new Cube());
        }
        xs.push(ys);
      }
      cubes.push(xs);
    }

    Rubic.cubes = cubes;
  }

  getUpFaceCube() {
    const upFaceCube: Array<Cube> = [];
    for (let x = 0; x < 3; x++) {
      for (let z = 0; z < 3; z++) {
        upFaceCube.push(Rubic.cubes[x][2][z]);
      }
    }
    return upFaceCube;
  }

  // C: Clockwise, CC: CounterClockwise
  rotateUpC() {
    this.getUpFaceCube().forEach((cube) => {
      cube.rotate(AxisEnum.YPlus, DirectionEnum.C);
    });
  }
  rotateUpCC() {
    this.getUpFaceCube().forEach((cube) => {
      cube.rotate(AxisEnum.YPlus, DirectionEnum.CC);
    });
  }

  getDownFaceCube() {
    const upFaceCube: Array<Cube> = [];
    for (let x = 0; x < 3; x++) {
      for (let z = 0; z < 3; z++) {
        upFaceCube.push(Rubic.cubes[x][0][z]);
      }
    }
    return upFaceCube;
  }

  rotateDownC() {
    this.getDownFaceCube().forEach((cube) => {
      cube.rotate(AxisEnum.YMin, DirectionEnum.C);
    });
  }
  rotateDownCC() {
    this.getDownFaceCube().forEach((cube) => {
      cube.rotate(AxisEnum.YMin, DirectionEnum.CC);
    });
  }

  getLeftFaceCube() {
    const leftFaceCube: Array<Cube> = [];
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 3; z++) {
        leftFaceCube.push(Rubic.cubes[0][y][z]);
      }
    }
    return leftFaceCube;
  }
  rotateLeftC() {
    this.getLeftFaceCube().forEach((cube) => {
      cube.rotate(AxisEnum.XMin, DirectionEnum.C);
    });
  }
  rotateLeftCC() {
    this.getLeftFaceCube().forEach((cube) => {
      cube.rotate(AxisEnum.XMin, DirectionEnum.CC);
    });
  }

  getRightFaceCube() {
    const rightFaceCube: Array<Cube> = [];
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 3; z++) {
        rightFaceCube.push(Rubic.cubes[2][y][z]);
      }
    }
    return rightFaceCube;
  }

  rotateRightC() {
    this.getRightFaceCube().forEach((cube) => {
      cube.rotate(AxisEnum.XPlus, DirectionEnum.C);
    });
  }
  rotateRightCC() {
    this.getRightFaceCube().forEach((cube) => {
      cube.rotate(AxisEnum.XPlus, DirectionEnum.CC);
    });
  }

  getFrontFaceCube() {
    const frontFaceCube: Array<Cube> = [];
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        frontFaceCube.push(Rubic.cubes[x][y][2]);
      }
    }
    return frontFaceCube;
  }

  rotateFrontC() {
    this.getFrontFaceCube().forEach((cube) => {
      cube.rotate(AxisEnum.ZPlus, DirectionEnum.C);
    });
  }
  rotateFrontCC() {
    this.getFrontFaceCube().forEach((cube) => {
      cube.rotate(AxisEnum.ZPlus, DirectionEnum.CC);
    });
  }

  getBackFaceCube() {
    const backFaceCube: Array<Cube> = [];
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        backFaceCube.push(Rubic.cubes[x][y][0]);
      }
    }
    return backFaceCube;
  }

  rotateBackC() {
    this.getBackFaceCube().forEach((cube) => {
      cube.rotate(AxisEnum.ZMin, DirectionEnum.C);
    });
  }
  rotateBackCC() {
    this.getBackFaceCube().forEach((cube) => {
      cube.rotate(AxisEnum.ZMin, DirectionEnum.CC);
    });
  }

  buildColor() {
    const result: Array<number> = [];

    const xColors = [
      ColorEnum.red,
      ColorEnum.blue,
      ColorEnum.orange,
      ColorEnum.green,
      ColorEnum.magenta,
      ColorEnum.brown,
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
    const colors = this.buildColor();
    Rubic.cubes.forEach((xs, x) => {
      xs.forEach((ys, y) => {
        ys.forEach((cube, z) => {
          cube.paint(colors);
          cube.setPosition(
            halfSize + x * size,
            halfSize + y * size,
            halfSize + z * size
          );

          Rubic.scene.add(cube.getMesh());
          Rubic.scene.add(cube.getLine());
        });
      });
    });
  }
}

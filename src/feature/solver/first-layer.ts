import * as THREE from 'three';

import { FACE, MOVE } from '@/shared/enum';
import { Cube, CubeName, Position, cubeNameToPosition } from '../cube';
import * as Corner from './first-layer/corner';
import * as Edge from './first-layer/edge';
import { LayerSolver } from './interface';
import { Snapshot } from './snapshot';
import {
  Cubes,
  getCubeNotOnTarget,
  isCubeOnTarget,
  vectorAfterRotation,
  vectorToFace,
} from './util';

export class FirstLayerSolver extends Snapshot implements LayerSolver {
  private getCubes: () => Cubes;
  private cubes: Cubes;
  private edgeNotOnTarget: { targetName: CubeName; position: Position } | null =
    null;
  private cornerNotOnTarget: {
    targetName: CubeName;
    position: Position;
  } | null = null;

  // memoization
  private solved = false;

  constructor(getCubes: () => Cubes) {
    super();
    this.cubes = getCubes();
    this.getCubes = getCubes;
  }

  isSolved(): boolean {
    if (this.solved) return true;
    this.cubes = this.getCubes();
    this.checkInfiniteLoop(this.cubes);

    this.edgeNotOnTarget = getCubeNotOnTarget(this.cubes, Edge.randomFle());
    this.cornerNotOnTarget = getCubeNotOnTarget(this.cubes, Corner.randomFlc());
    const solved =
      this.edgeNotOnTarget === null && this.cornerNotOnTarget === null;
    this.solved = solved;

    return solved;
  }

  findSolution(): Array<MOVE> {
    if (this.edgeNotOnTarget !== null) {
      const edge = this.edgeNotOnTarget;
      const [fleX, fleY, fleZ] = edge.position;
      const fleCube = this.cubes[fleX][fleY][fleZ];
      const crossMoves = this.findCrossMoves(
        edge.targetName,
        fleCube,
        edge.position,
      );
      if (crossMoves.length > 0) return crossMoves;
    }

    if (this.cornerNotOnTarget !== null) {
      const corner = this.cornerNotOnTarget;
      const [flcX, flcY, flcZ] = corner.position;
      const flcCube = this.cubes[flcX][flcY][flcZ];
      const cornerMoves = this.findCornerMoves(
        corner.targetName,
        flcCube,
        corner.position,
      );
      if (cornerMoves.length > 0) return cornerMoves;
    }

    return [];
  }

  findAlignEdges(): Set<Edge.AlignEdges> {
    const alignEdges = new Set<Edge.AlignEdges>();
    const cubes = this.getCubes();

    for (const name of Edge.randomFle()) {
      const [xPos, yPos, zPos] = cubeNameToPosition(name);
      const cube = cubes[xPos][yPos][zPos];
      const cubeFace = this.getCubeFace(cube.getMesh().rotation);

      if (cubeFace === FACE.BOTTOM && isCubeOnTarget(name, cube)) {
        switch (name) {
          case '1-0-0':
            alignEdges.add(FACE.BACK);
            break;

          case '1-0-2':
            alignEdges.add(FACE.FRONT);
            break;

          case '0-0-1':
            alignEdges.add(FACE.LEFT);
            break;

          case '2-0-1':
            alignEdges.add(FACE.RIGHT);
            break;

          default:
            break;
        }
      }
    }

    return alignEdges;
  }

  findCrossMoves(
    targetName: CubeName,
    cube: Cube,
    position: Position,
  ): Array<MOVE> {
    const cubeFace = this.getCubeFace(cube.getMesh().rotation);

    const alignEdges = this.findAlignEdges();

    if (position[1] === 2) {
      return Edge.movesWhenCurrentOnTop(
        cubeFace,
        position,
        targetName,
        alignEdges,
        [],
      );
    }

    if (position[1] === 1) {
      return Edge.movesWhenCurrentOnMiddle(cubeFace, position, targetName);
    }

    return Edge.movesWhenCurrentOnBottom(
      cubeFace,
      position,
      targetName,
      alignEdges,
    );
  }

  getCubeFace(rotation: THREE.Euler): FACE {
    const bottomVector = new THREE.Vector3(0, -1, 0);
    const cubeFaceVector = vectorAfterRotation(bottomVector, rotation);
    return vectorToFace(cubeFaceVector);
  }

  findCornerMoves(
    targetName: CubeName,
    cube: Cube,
    position: Position,
  ): Array<MOVE> {
    const cubeFace = this.getCubeFace(cube.getMesh().rotation);

    if (position[1] === 2) {
      return Corner.movesWhenCurrentOnTop(cubeFace, position, targetName, []);
    }

    if (position[1] === 0) {
      return Corner.movesWhenCurrentOnBottom(cubeFace, position, targetName);
    }

    return [];
  }
}

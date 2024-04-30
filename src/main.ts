import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { rubikGlowColor } from '@/feature/color';
import { Controller } from '@/feature/controller';
import { activateRaycaster } from '@/feature/raycaster';
import { Rubic, faceNormalToRubikFace } from '@/feature/rubic';
import { DIRECTION, FACE } from '@/shared/enum';

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x3d426b);

const axesHelper = new THREE.AxesHelper(5);
axesHelper.setColors(
  new THREE.Color('magenta'),
  new THREE.Color('yellow'),
  new THREE.Color('cyan'),
);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas') as HTMLCanvasElement,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const controller = new Controller();
scene.add(controller);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0.5, 0.5, 0.5);

function updateControl() {
  requestAnimationFrame(updateControl);
  controls.update();
  renderer.render(scene, camera);
}

updateControl();

function onAnimate() {
  controls.update();
  renderer.render(scene, camera);
}

const rubic = new Rubic(scene, onAnimate);
rubic.render();

function onNotIntersect() {
  rubic.resetColor();
  controller.clear();
}
function onIntersect(
  intersect: THREE.Intersection<THREE.Object3D<THREE.Event>>,
) {
  const object = intersect.object as THREE.Mesh;
  const geometryType = object.geometry.type;

  // BufferGeometry is the cube
  if (geometryType !== 'BufferGeometry') {
    const name = intersect.object.name;
    const rotatorName = name.split('-').slice(1).join('-');
    rotatorByName(rotatorName);
    return;
  }

  onNotIntersect();

  const normal = intersect.face?.normal;
  const rotation = intersect.object.rotation;
  const rubikFace = faceNormalToRubikFace({ normal, rotation });

  const cubes = (() => {
    if (rubikFace === null) return [];
    controller.displayRotator(rubikFace);

    switch (rubikFace) {
      case FACE.TOP:
        return rubic.getTopFaceCube();
      case FACE.BOTTOM:
        return rubic.getBottomFaceCube();
      case FACE.LEFT:
        return rubic.getLeftFaceCube();
      case FACE.RIGHT:
        return rubic.getRightFaceCube();
      case FACE.FRONT:
        return rubic.getFrontFaceCube();
      case FACE.BACK:
        return rubic.getBackFaceCube();
    }
  })();

  cubes?.map((cube) =>
    cube.getMesh().geometry.setAttribute('color', rubikGlowColor),
  );
}
activateRaycaster(scene, camera, { onIntersect, onNotIntersect });
onAnimate();

/**
 * @param {string} rotatorName // format: `${FACE}-C` | `${FACE}-CC`
 */
function rotatorByName(rotatorName: string) {
  switch (rotatorName) {
    case `${FACE.TOP}-C`:
      rubic.rotate(FACE.TOP, DIRECTION.CLOCKWISE);
      break;
    case `${FACE.TOP}-CC`:
      rubic.rotate(FACE.TOP, DIRECTION.COUNTERCLOCKWISE);
      break;

    case `${FACE.BOTTOM}-C`:
      rubic.rotate(FACE.BOTTOM, DIRECTION.CLOCKWISE);
      break;
    case `${FACE.BOTTOM}-CC`:
      rubic.rotate(FACE.BOTTOM, DIRECTION.COUNTERCLOCKWISE);
      break;

    case `${FACE.LEFT}-C`:
      rubic.rotate(FACE.LEFT, DIRECTION.CLOCKWISE);
      break;
    case `${FACE.LEFT}-CC`:
      rubic.rotate(FACE.LEFT, DIRECTION.COUNTERCLOCKWISE);
      break;

    case `${FACE.RIGHT}-C`:
      rubic.rotate(FACE.RIGHT, DIRECTION.CLOCKWISE);
      break;
    case `${FACE.RIGHT}-CC`:
      rubic.rotate(FACE.RIGHT, DIRECTION.COUNTERCLOCKWISE);
      break;

    case `${FACE.FRONT}-C`:
      rubic.rotate(FACE.FRONT, DIRECTION.CLOCKWISE);
      break;
    case `${FACE.FRONT}-CC`:
      rubic.rotate(FACE.FRONT, DIRECTION.COUNTERCLOCKWISE);
      break;

    case `${FACE.BACK}-C`:
      rubic.rotate(FACE.BACK, DIRECTION.CLOCKWISE);
      break;
    case `${FACE.BACK}-CC`:
      rubic.rotate(FACE.BACK, DIRECTION.COUNTERCLOCKWISE);
      break;

    default:
      break;
  }
}

const main = document.querySelector('main') as HTMLElement;
const container = document.createElement('div');
container.className = 'control-container';
main.appendChild(container);

function createController(
  text: string,
  onClick: (event: MouseEvent) => void,
  cssClass?: Array<string>,
) {
  const buttonEl = document.createElement('button');
  buttonEl.className = 'control-button';
  cssClass?.forEach((css) => buttonEl.classList.add(css));
  const buttonElText = document.createTextNode(text);
  buttonEl.appendChild(buttonElText);
  buttonEl.onclick = onClick;

  container.appendChild(buttonEl);
}

createController('Shuffle', (_event) => rubic.shuffle(), ['color-red']);

// createController('Solve', (_event) => rubic.solve(), ['color-green']);

// createController('Solve by AI', () => {}, ['color-blue']);

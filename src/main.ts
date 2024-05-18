import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { rubikGlowColor } from '@/feature/color';
import { Controller } from '@/feature/controller/controller';
import { activateRaycaster } from '@/feature/raycaster';
import { Rubic, faceNormalToRubikFace } from '@/feature/rubic';
import { FACE, MOVE } from '@/shared/enum';

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
    const move = name.split('-').slice(1).join('-') as MOVE;
    rubic.rotateByMove(move);
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

createController('Shuffle', async (_event) => await rubic.shuffle(), [
  'color-red',
]);

createController('Solve', async (_event) => await rubic.solve(), [
  'color-green',
]);

// createController('Solve by AI', () => {}, ['color-blue']);

function updateControl() {
  requestAnimationFrame(updateControl);
  controls.update();
  renderer.render(scene, camera);
}

updateControl();

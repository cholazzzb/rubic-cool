import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { Rubic } from '@/feature/rubic';

import { DIRECTION } from './shared/direction_enum';
import { FACE } from './shared/face_enum';

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

onAnimate();

const rubic = new Rubic(scene, onAnimate);
rubic.render();

const main = document.querySelector('main') as HTMLElement;
const container = document.createElement('div');
container.className = 'control-container';
main.appendChild(container);

function createController(
  text: string,
  onClick: () => void,
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

createController('Up C', () => rubic.rotate(FACE.TOP, DIRECTION.CLOCKWISE), [
  'color-red',
]);
createController(
  'Up CC',
  () => rubic.rotate(FACE.TOP, DIRECTION.COUNTERCLOCKWISE),
  ['color-red'],
);

createController('Down', () => rubic.rotate(FACE.BOTTOM, DIRECTION.CLOCKWISE), [
  'color-green',
]);
createController(
  'Down CC',
  () => rubic.rotate(FACE.BOTTOM, DIRECTION.COUNTERCLOCKWISE),
  ['color-green'],
);

createController('Left C', () => rubic.rotate(FACE.LEFT, DIRECTION.CLOCKWISE), [
  'color-blue',
]);
createController(
  'Left CC',
  () => rubic.rotate(FACE.LEFT, DIRECTION.COUNTERCLOCKWISE),
  ['color-blue'],
);

createController(
  'Right C',
  () => rubic.rotate(FACE.RIGHT, DIRECTION.CLOCKWISE),
  ['color-magenta'],
);
createController(
  'Right CC',
  () => rubic.rotate(FACE.RIGHT, DIRECTION.COUNTERCLOCKWISE),
  ['color-magenta'],
);

createController(
  'Front C',
  () => rubic.rotate(FACE.FRONT, DIRECTION.CLOCKWISE),
  ['color-orange'],
);
createController(
  'Front CC',
  () => rubic.rotate(FACE.FRONT, DIRECTION.COUNTERCLOCKWISE),
  ['color-orange'],
);

createController('Back C', () => rubic.rotate(FACE.BACK, DIRECTION.CLOCKWISE), [
  'color-brown',
]);
createController(
  'Back CC',
  () => rubic.rotate(FACE.BACK, DIRECTION.COUNTERCLOCKWISE),
  ['color-brown'],
);

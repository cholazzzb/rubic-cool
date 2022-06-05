import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Rubic } from "./domain/rubic/rubic";
import { ColorEnum } from "./shared_library/components/color_enum";

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 1;
camera.position.x = 0.3;
camera.position.y = 0.3;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x3d426b);

// Start of FOR DEVELOPMENT PURPOSE ONLY
const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2).toNonIndexed();
const material = new THREE.MeshBasicMaterial({ vertexColors: true });

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const positionAttribute = geometry.getAttribute("position");
const colors: Array<number> = [];

const xColors = [
  ColorEnum.red,
  ColorEnum.blue,
  ColorEnum.orange,
  ColorEnum.green,
  ColorEnum.magenta,
  ColorEnum.brown,
];

for (let i = 0; i < positionAttribute.count; i += 6) {
  const ac = Math.floor(i / 6) > 5 ? 5 : Math.floor(i / 6);
  // define the same color for each vertex of a triangle
  const c = xColors[ac];

  colors.push(c.r, c.g, c.b);
  colors.push(c.r, c.g, c.b);
  colors.push(c.r, c.g, c.b);
  colors.push(c.r, c.g, c.b);
  colors.push(c.r, c.g, c.b);
  colors.push(c.r, c.g, c.b);
}
// End ofFOR DEVELOPMENT PURPOSE ONLY

// define the new attribute

geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 1;
scene.add(mesh);

const rubic = new Rubic(scene);
rubic.render();

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas") as HTMLCanvasElement,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 0, 1);
controls.update();
renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

animate();

const main = document.querySelector("main") as HTMLElement;
const container = document.createElement("div");
container.className = "control-container";
main.appendChild(container);

const createController = (
  text: string,
  onClick: () => void,
  cssClass?: Array<string>
) => {
  const buttonEl = document.createElement("button");
  buttonEl.className = "control-button";
  cssClass?.forEach((c) => buttonEl.classList.add(c));
  const buttonElText = document.createTextNode(text);
  buttonEl.appendChild(buttonElText);
  buttonEl.onclick = onClick;

  container.appendChild(buttonEl);
};

createController("Up", () => rubic.rotateUpC(), ["color-red"]);
createController("Up'", () => rubic.rotateUpCC(), ["color-red"]);

createController("Down", () => rubic.rotateDownC(), ["color-green"]);
createController("Down'", () => rubic.rotateDownCC(), ["color-green"]);

createController("Left", () => rubic.rotateLeftC(), ["color-blue"]);
createController("Left'", () => rubic.rotateLeftCC(), ["color-blue"]);

createController("Right", () => rubic.rotateRightC(), ["color-magenta"]);
createController("Right'", () => rubic.rotateRightCC(), ["color-magenta"]);

createController("Front", () => rubic.rotateFrontC(), ["color-orange"]);
createController("Front'", () => rubic.rotateFrontCC(), ["color-orange"]);

createController("Back", () => rubic.rotateBackC(), ["color-brown"]);
createController("Back'", () => rubic.rotateBackCC(), ["color-brown"]);

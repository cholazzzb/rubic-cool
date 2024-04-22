import * as THREE from 'three';

function createOnMouseDownHandler(
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  callback?: {
    onIntersect?: (
      intersect: THREE.Intersection<THREE.Object3D<THREE.Event>>,
    ) => void;
    onNotIntersect?: () => void;
  },
) {
  return function (event: MouseEvent) {
    event.preventDefault();

    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera({ x: mouseX, y: mouseY }, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    const nearestIntersect = (() => {
      const intersectObjects = intersects.filter(
        (int) => int.object instanceof THREE.Mesh,
      );
      return intersectObjects?.[0];
    })();

    if (nearestIntersect) {
      callback?.onIntersect?.(nearestIntersect);
      return;
    }
    callback?.onNotIntersect?.();
  };
}

export function activateRaycaster(
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  callback?: {
    onIntersect?: (
      intersect: THREE.Intersection<THREE.Object3D<THREE.Event>>,
    ) => void;
    onNotIntersect?: () => void;
  },
) {
  document.addEventListener(
    'mousedown',
    createOnMouseDownHandler(scene, camera, callback),
  );
}

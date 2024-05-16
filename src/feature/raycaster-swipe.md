import \* as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 5); // Longer in Z-axis
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const longBlock = new THREE.Mesh(geometry, material);
// Global variables to store mouse position, selected object, and swipe start position
let mouseX = 0,
mouseY = 0;
let selectedObject: THREE.Mesh | null = null;
let swipeStartX = 0,
swipeStartY = 0;

function createOnMouseDownHandler(
scene: THREE.Scene,
camera: THREE.PerspectiveCamera,
) {
return function (event: MouseEvent) {
event.preventDefault();

    // Get mouse coordinates
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    console.log({ mouseX, mouseY, camera });

    // Raycast to find intersecting objects
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera({ x: mouseX, y: mouseY }, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    const firstIntersectObjectName = (() => {
      const intersectObjects = intersects.filter(
        (int) => int.object instanceof THREE.Mesh,
      );
      if (intersectObjects.length > 0) {
        const objectName = intersectObjects.map((int) => int.object.name);
        return objectName[0];
      }

      return null;
    })();

    console.log({ firstIntersectObjectName });

    // if (intersects.length > 0 && intersects[0].object === longBlock) {
    //   selectedObject = longBlock;

    //   // Record swipe start position
    //   swipeStartX = event.clientX;
    //   swipeStartY = event.clientY;
    // }

};
}

export class Raycaster {
private scene: THREE.Scene;
private camera: THREE.PerspectiveCamera;

private onMouseDown(event: MouseEvent) {
event.preventDefault();

    // Get mouse coordinates
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    console.log({ mouseX, mouseY, camera: this });

    // Raycast to find intersecting objects
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera({ x: mouseX, y: mouseY }, this.camera);
    const intersects = raycaster.intersectObjects(this.scene.children);

    // If the long block is intersected, set it as selected
    if (intersects.length > 0) {
      console.log({ intersects: intersects[0].object });
    }
    // if (intersects.length > 0 && intersects[0].object === longBlock) {
    //   selectedObject = longBlock;

    //   // Record swipe start position
    //   swipeStartX = event.clientX;
    //   swipeStartY = event.clientY;
    // }

}

// Mouse move event handler
private onMouseMove(event: MouseEvent) {
event.preventDefault();

    // If the long block is selected and mouse is moved, calculate swipe distance
    if (selectedObject) {
      const swipeDistanceX = event.clientX - swipeStartX;
      const swipeDistanceY = event.clientY - swipeStartY;

      // Rotate the long block based on swipe distance
      selectedObject.rotation.y += swipeDistanceX * 0.01; // Adjust rotation speed
      selectedObject.rotation.x += swipeDistanceY * 0.01; // Adjust rotation speed

      // Update swipe start position
      swipeStartX = event.clientX;
      swipeStartY = event.clientY;
    } else {
      // If the long block is not selected, perform hover detection
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Raycast to find intersecting objects
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera({ x: mouseX, y: mouseY }, this.camera);
      const intersects = raycaster.intersectObjects(this.scene.children);

      // Change color of the long block if it's hovered
      longBlock.material.color.set(
        intersects.length > 0 && intersects[0].object === longBlock
          ? 0xff0000
          : 0x00ff00,
      );
    }

}

// Mouse up event handler
private onMouseUp(event: MouseEvent) {
event.preventDefault();

    // Reset selected object
    selectedObject = null;

}

constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
this.scene = scene;
this.camera = camera;

    // Event listeners for mouse actions
    document.addEventListener('mousedown', this.onMouseDown);
    // document.addEventListener('mousemove', this.onMouseMove);
    // document.addEventListener('mouseup', this.onMouseUp);

}
}

export function activateRaycaster(
scene: THREE.Scene,
camera: THREE.PerspectiveCamera,
) {
document.addEventListener(
'mousedown',
createOnMouseDownHandler(scene, camera),
);
}

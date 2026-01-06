import * as THREE from "three";

export function createCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight);
    camera.position.set(0, 0, 4);
    return camera;
}
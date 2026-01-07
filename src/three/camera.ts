import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type OrbitControlParams = {
    camera: THREE.Camera,
    canvas: HTMLCanvasElement,
}

export function createCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight);
    camera.position.set(0, 0, 4);
    return camera;
}

export function createOrbitControls(props: OrbitControlParams): OrbitControls {
    const { camera, canvas } = props

    const orbitControls = new OrbitControls(camera, canvas)
    orbitControls.enableDamping = true

    return orbitControls
}
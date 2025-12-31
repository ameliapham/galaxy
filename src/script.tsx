import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from "lil-gui"

console.log("Hello, Three.js with TypeScript!");

// --- Canvas Setup ---
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

// --- Scene Setup ---
const scene = new THREE.Scene();

// --- Setup Axes Helper ---
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// --- Camera Setup ---
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight);
camera.position.z = 3
scene.add(camera)

// --- Controls ---
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// --- Renderer Setup ---
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// --- Debug UI ---
const gui = new GUI
gui.close()

// --- Resize ---
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

// --- Render Loop ---
const clock = new THREE.Clock()

function animate(){
    // Clock
    const elapsedTime = clock.getElapsedTime()

    // Update control
    controls.update()

    // Update render
    renderer.render(scene, camera);

    // Call animate again on the next frame
    window.requestAnimationFrame(animate)
}
animate()

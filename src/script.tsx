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

// --- Galaxy ---
const parameters = {
    count: 1000,
    size : 0.01,
    color: 'pink'
}
function generateGalaxy() {
    // Geometry
    const geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters.count * 3)
    for (let i=0; i < parameters.count; i++) {
        const i3 = i * 3
        
        positions[i3 + 0] = Math.random()
        positions[i3 + 1] = Math.random()
        positions[i3 + 2] = Math.random()
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions,3))

    // Material
    const material = new THREE.PointsMaterial({ 
        size: parameters.size, 
        color: parameters.color,
        sizeAttenuation: true,
        blending : THREE.AdditiveBlending,
    })

    // Points
    const points = new THREE.Points(geometry, material)
    scene.add(points)
}

generateGalaxy()

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

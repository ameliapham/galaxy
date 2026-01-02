import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from "lil-gui"

console.log("Hello, Three.js with TypeScript!");

// --- Canvas Setup ---
const canvas = document.querySelector<HTMLCanvasElement>("canvas.webgl");
if (!canvas){
    throw new Error("Canvas element not found");
}

// --- Scene Setup ---
const scene = new THREE.Scene();

// --- Setup Axes Helper ---
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)


// --- Debug UI ---
const gui = new GUI({
    title: 'Galaxy Parameters'
})
gui.close()

// --- Galaxy ---
const parameters = {
    count: 50000,
    size : 0.001,
    color: 'pink',
    radius: 5,
    branches : 3,
}

let geometry: THREE.BufferGeometry | null = null
let material: THREE.PointsMaterial | null = null
let points: THREE.Points | null = null

function generateGalaxy() {
    // Destroy old galaxy
    if (points !== null) {
        geometry?.dispose()
        material?.dispose()
        scene.remove(points)
    }
    
    // Geometry
    geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters.count * 3)
    for (let i=0; i < parameters.count; i++) {
        const i3 = i * 3

        const radius = Math.random() * parameters.radius
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2 // Angle for each branch

        positions[i3 + 0] = Math.cos(branchAngle) * radius
        positions[i3 + 1] = 0
        positions[i3 + 2] = Math.sin(branchAngle) * radius
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions,3))

    // Material
    material = new THREE.PointsMaterial({ 
        size: parameters.size, 
        color: parameters.color,
        sizeAttenuation: true,
        blending : THREE.AdditiveBlending,
    })

    // Points
    points = new THREE.Points(geometry, material)
    scene.add(points)
}
generateGalaxy()

gui.add(parameters, 'count').min(1000).max(100000).step(100).onFinishChange(generateGalaxy)
gui.add(parameters, 'size').min(0.001).max(0.01).step(0.0001).onFinishChange(generateGalaxy)
gui.addColor(parameters, 'color').onFinishChange(generateGalaxy)
gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)

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

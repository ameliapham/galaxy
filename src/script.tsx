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
// scene.add(axesHelper)

// --- Camera Setup ---
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight);
camera.position.z = 4
camera.position.y = 4
camera.position.x = 0
scene.add(camera)

// --- Audio Setup ---
const listener = new THREE.AudioListener()
camera.add(listener)
const sound = new THREE.Audio(listener)
const audioLoader = new THREE.AudioLoader()

audioLoader.load( 'https://8qlonopisvx260qb.public.blob.vercel-storage.com/across-the-quiet-galaxy.mp3', 
    function(buffer) {
	    sound.setBuffer(buffer);
	    sound.setLoop(true);
	    sound.setVolume(0.5);
        document.addEventListener('click', () => {
            if (!sound.isPlaying) {
                sound.play();
            }
        });
    },
    undefined,
    function(err) {
        console.error('An error happened while loading audio.');
    }
);



// --- Debug UI ---
const gui = new GUI({
    title: 'Galaxy Parameters'
})
gui.close()

// --- Galaxy ---
const parameters = {
    count: 50000,
    size : 0.001,
    radius: 5,
    branches : 3,
    spin: 1,
    randomness: 0.4,
    randomnessPower: 2,
    insideColor: '#ed5135',
    outsideColor: '#3967db',
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
    const colors = new Float32Array(parameters.count * 3)

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    for (let i=0; i < parameters.count; i++) {
        const i3 = i * 3
 
        // Position
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2 // Angle for each branch

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius

        positions[i3    ] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = 0 + randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ
    
        // Color
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius)

        colors[i3    ] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions,3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Material
    material = new THREE.PointsMaterial({ 
        size: parameters.size, 
        sizeAttenuation: true,
        blending : THREE.AdditiveBlending,
        vertexColors: true, // Màu sẽ được lấy từ từng điểm, không phải từ material chung
    })

    // Points
    points = new THREE.Points(geometry, material)
    scene.add(points)
}
generateGalaxy()

gui.add(parameters, 'count').min(1000).max(100000).step(100).onFinishChange(generateGalaxy)
gui.add(parameters, 'size').min(0.001).max(0.01).step(0.0001).onFinishChange(generateGalaxy)
gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)

const audioFolder = gui.addFolder('Audio Controls')

// --- Camera Controls ---

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

function animate(): void{
    // Clock
    const elapsedTime = clock.getElapsedTime()

    // Update Galaxy
    if (!points) return

    const direction = parameters.spin >= 0 ? 1 : -1

    points.rotation.y = direction * elapsedTime * 0.1
    points.rotation.x = direction * elapsedTime * 0.01

    // Update control
    controls.update()

    // Update render
    renderer.render(scene, camera);

    // Call animate again on the next frame
    window.requestAnimationFrame(animate)
}
animate()

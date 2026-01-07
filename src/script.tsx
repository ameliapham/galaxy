
import * as THREE from "three";
import GUI from "lil-gui"

import { getCanvas } from './three/canvas'
import { createScene } from './three/scene'
import { createCamera, createOrbitControls } from './three/camera'
import { createAudio } from './three/audio'
import { createRenderer } from "./three/renderer"
import { setupResize } from "./three/resize"
import { createAxesHelper } from "./three/models/axesHelper";
import { createGalaxy, type GalaxyParams } from "./three/models/particles";
import { startAnimation, type GalaxyState } from "./three/animation";

console.log("Hello, Three.js with TypeScript!");

// --- Canvas Setup ---
const canvas = getCanvas()

// --- Scene Setup ---
const scene = createScene();

// --- Setup Axes Helper ---
const axesHelper = createAxesHelper({ size: 2 })
// scene.add(axesHelper)

// --- Camera Setup ---
const camera = createCamera();
camera.position.y = 1
scene.add(camera)

// --- Audio Setup ---
const audioParams = {
    volume: 0.5,
    loop: true,
    enabled: true,
}

// Create audio object
const {sound, listener} = createAudio({
    url: 'https://8qlonopisvx260qb.public.blob.vercel-storage.com/across-the-quiet-galaxy.mp3',
    volume: audioParams.volume,
    loop: audioParams.loop,
})
camera.add(listener)

// Control logic for audio playback
const playAudio = () => {
    if (!sound.isPlaying) {
        sound.play();
        audioParams.enabled = true;
    }
}
const stopAudio = () => {
    if (sound.isPlaying) {
        sound.stop();
        audioParams.enabled = false;
    }
}

const playAudioOnce = () => {
    playAudio();
    document.removeEventListener('click', playAudioOnce)
}
document.addEventListener('click', playAudioOnce)

// For GUI controls
const audioActions = {
    play: playAudio,
    stop: stopAudio,
}

// --- Galaxy ---
const parameters: GalaxyParams = {
    count: 50000,
    size : 0.01,
    radius: 5,
    branches : 3,
    spin: 1,
    randomness: 0.4,
    randomnessPower: 2,
    insideColor: '#ed5135',
    outsideColor: '#3967db',
}
let points = createGalaxy({ parameters, scene })

// --- Debug UI ---
const gui = new GUI({
    title: 'Galaxy Parameters'
})
gui.close()

const regenerateGalaxy = () => {
    galaxyState.points = createGalaxy({parameters, scene})
}

gui.add(parameters, 'count').min(1000).max(100000).step(100).onFinishChange(regenerateGalaxy)
gui.add(parameters, 'size').min(0.005).max(0.02).step(0.0001).onFinishChange(regenerateGalaxy)
gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(regenerateGalaxy)
gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(regenerateGalaxy)
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(regenerateGalaxy)
gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(regenerateGalaxy)
gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onChange(() => {
    regenerateGalaxy()
    galaxyState.direction = parameters.spin >= 0 ? 1 : -1
})
gui.addColor(parameters, 'insideColor').onChange(regenerateGalaxy)
gui.addColor(parameters, 'outsideColor').onChange(regenerateGalaxy)



const audioFolder = gui.addFolder('Audio Controls')
audioFolder.add(audioParams, 'volume').min(0).max(1).step(0.01).onFinishChange(() => {
    sound.setVolume(audioParams.volume);
})
audioFolder.add(audioActions, 'play').name('Play Audio')
audioFolder.add(audioActions, 'stop').name('Stop Audio')

// --- Controls ---
const controls = createOrbitControls({ camera, canvas })

// --- Renderer Setup ---
const renderer = createRenderer(canvas);

// --- Resize ---
setupResize({camera, renderer})

// --- Render Loop ---
const galaxyState: GalaxyState = {
    points,
    direction: parameters.spin >= 0 ? 1 : -1
}
startAnimation({ scene, camera, renderer, controls, galaxyState })
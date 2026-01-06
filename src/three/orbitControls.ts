import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type Props = {
    camera: THREE.Camera,
    canvas: HTMLCanvasElement,
}

export function createOrbitControls(props: Props): OrbitControls {
    const { camera, canvas } = props

    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true

    return controls
}
import * as THREE from "three";

type Props = {
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    controls: any,
    points?: THREE.Points,
    spin?: number,
}

export function startAnimation(props: Props): void {
    const { camera, scene, renderer, controls, points, spin } = props;
    const clock = new THREE.Clock()

    function tick(): void {
        const elapsedTime = clock.getElapsedTime()
        
        // Update Galaxy
        if (!points) return
 
        const direction = (spin ?? 1) >= 0 ? 1 : -1

        points.rotation.y = direction * elapsedTime * 0.1
        points.rotation.x = direction * elapsedTime * 0.01

        // Update control
        controls.update()

        // Render
        renderer.render(scene, camera)
        
        // Call tick again on the next frame
        requestAnimationFrame(tick)
    }
    tick()
}
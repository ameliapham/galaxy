import * as THREE from "three";

export type GalaxyState = {
    points: THREE.Points | null,
    direction: 1 | -1,
}

type Props = {
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    controls: any,
    galaxyState: GalaxyState,
}

export function startAnimation(props: Props): void {
    const { camera, scene, renderer, controls, galaxyState } = props;
    const clock = new THREE.Clock()

    function tick(): void {
        const elapsedTime = clock.getElapsedTime()
        
        // Update Galaxy
        if (galaxyState.points) {
            galaxyState.points.rotation.y = galaxyState.direction * elapsedTime * 0.1
            galaxyState.points.rotation.x = galaxyState.direction * elapsedTime * 0.001
        }

        // Update control
        controls.update()

        // Render
        renderer.render(scene, camera)
        
        // Call tick again on the next frame
        requestAnimationFrame(tick)
    }
    tick()
}
import * as THREE from "three";

export type GalaxyParams = {
    count: number,
    size: number,
    radius: number,
    branches: number,
    spin: number,
    randomness: number,
    randomnessPower: number,
    insideColor: string,
    outsideColor: string,
}

type Props = {
    parameters: GalaxyParams,
    scene: THREE.Scene,
}

let geometry: THREE.BufferGeometry | null = null
let material: THREE.PointsMaterial | null = null
let points: THREE.Points | null = null

export function createGalaxy(props: Props): THREE.Points {
    const { parameters, scene } = props;
    const { count, size, radius, branches, spin, randomness, randomnessPower, insideColor, outsideColor } = parameters;

    // Destroy old galaxy
    if (points !== null) {
        geometry?.dispose()
        material?.dispose()
        points.parent?.remove(points)
    }

    // Geometry
    geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorInside = new THREE.Color(insideColor)
    const colorOutside = new THREE.Color(outsideColor)

    for (let i = 0; i < count; i++) {
        const i3 = i * 3

        // Position
        const radiusVar = Math.random() * radius
        const spinAngle = radiusVar * spin
        const branchAngle = (i % branches) / branches * Math.PI * 2 // Angle for each branch

        const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radiusVar
        const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radiusVar
        const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radiusVar

        positions[i3    ] = Math.cos(branchAngle + spinAngle) * radiusVar + randomX
        positions[i3 + 1] = 0 + randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radiusVar + randomZ

        // Color
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radiusVar / radius)

        colors[i3    ] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Material
    material = new THREE.PointsMaterial({
        size: size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
    })
    
    // Points
    points = new THREE.Points(geometry, material)
    points.rotation.z = Math.PI / 7
    scene.add(points)

    return points
}
import * as THREE from "three";

type Props = {
    size: number;
}

export function createAxesHelper(props : Props): THREE.AxesHelper {
    const { size } = props;
    const axesHelper = new THREE.AxesHelper(size);
    return axesHelper;
}
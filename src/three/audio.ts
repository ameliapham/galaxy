import * as THREE from "three";

type Props = {
    url: string,
    volume: number,
    loop: boolean,
}

export function createAudio(props: Props) {
    const {url, volume, loop} = props
    
    const listener = new THREE.AudioListener()
    const sound = new THREE.Audio(listener)
    const audioLoader = new THREE.AudioLoader()

    audioLoader.load( url, function(buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(loop);
        sound.setVolume(volume);
    },
        undefined,
        function(err) {
            console.error('Error loading audio');
        }
    );

    return {sound, listener};
}
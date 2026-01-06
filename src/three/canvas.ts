
export function getCanvas(): HTMLCanvasElement {
    const canvas = document.querySelector<HTMLCanvasElement>("canvas.webgl")

    if (!canvas){
        throw new Error("Canvas element not found");
    }
    
    return canvas
}
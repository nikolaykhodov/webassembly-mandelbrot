import { loadWasm } from './wasm-loader';

const SIZE = 1000;
const POINT_A = {
    x:-2.3,
    y:2
};
const POINT_B = {
    x: 1.4, 
    y: -2
};

function allocateMemory(bytes) {
    const WEBASSEMBLY_MEMORY_PAGE = 65536;
    
    const pages = Math.floor(bytes / WEBASSEMBLY_MEMORY_PAGE) + 1;
    return new WebAssembly.Memory({
        initial: pages,
    });
}

(async function() {
    const canvas = document.createElement('canvas');
    canvas.width = SIZE;
    canvas.height = SIZE;
    document.body.appendChild(canvas);

    const memorySize = SIZE * SIZE * 4;
    const memory = allocateMemory(memorySize);
    const wasmArray = new Uint8ClampedArray(memory.buffer);
    const instance = await loadWasm('./mandelbrot.wasm', {
        env: {
            log: (str) => {
                console.log(str);
            },
            memory: memory
        }
    });

    instance.exports.computeFractal(
        SIZE, 
        SIZE, 
        POINT_A.x, 
        POINT_A.y, 
        POINT_B.x,
        POINT_B.y
    );

    const context = canvas.getContext('2d');
    const image = context.createImageData(SIZE, SIZE);

    const length = image.data.length;
    for(let index = 0; index < length; index++) {
        image.data[index] = wasmArray[index];
    }

    context.putImageData(image, 0, 0);
})();
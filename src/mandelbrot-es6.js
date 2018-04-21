const SIZE = 1000;
const POINT_A = {
    x:-2.3,
    y:2
};
const POINT_B = {
    x: 1.4, 
    y: -2
};

/*
 * @param {Uint8ClampedArray} pixelArray Image data
 * @param {Number} width Image width
 * @param {Number} height Image height
 * @param {{x, y}} pointA Defines the top-left corner
 * @param {{x, y}} pointB Defined the bottom-right corner
 */
function computeFractal(pixelArray, width, height, pointA, pointB) {
    const getColor = (colorComponent, interations) => (width - interations) * colorComponent % 256;
    let currentColorComponent = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // Z = (0, 0)
            let zA = 0;
            let zB = 0;
            
            // translate the image pixel onto (x, y)-coordinates: C = (x, y)
            let cA = pointA.x + (pointB.x - pointA.x) / width * x;
            let cB = pointA.y + (pointB.y - pointA.y) / height * y;

            // while |Z| <= 2
            let interations = 0;
            while(interations++ < width && (zA * zA + zB * zB) <= 4) {
                // Z = Z * Z + C
                const t = zA * zA - zB * zB;
                zB = 2 * zA * zB + cB;
                zA = t + cA;
            }

            // compute the pixel color
            // R
            pixelArray[currentColorComponent++] = getColor(255, interations);
            // G
            pixelArray[currentColorComponent++] = getColor(255, interations);
            // B
            pixelArray[currentColorComponent++] = getColor(255, interations);
            // A
            pixelArray[currentColorComponent++] = 255
        }
    }
}

(function() {
    const canvas = document.createElement('canvas');
    canvas.width = SIZE;
    canvas.height = SIZE;
    document.body.appendChild(canvas);

    const context = canvas.getContext('2d');
    const image = context.createImageData(SIZE, SIZE);
    computeFractal(image.data, SIZE, SIZE, POINT_A, POINT_B);
    context.putImageData(image, 0, 0);
})();
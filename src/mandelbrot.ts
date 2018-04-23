function getColor(colorComponent: u8, interations: u32, width: u32) : u64 {
	return <u64>((width - interations) * colorComponent % 256);
}

/*
 * @param width
 * @param height
 * @param x0
 * @param y0
 * @param x1
 * @param y1
 */
export function computeFractal(width: u32, height: u32, x0: f32, y0: f32, x1: f32, y1: f32): void {
    let currentPixel: usize = 0;

    for (let y: u32 = 0; y < height; y++) {
        for (let x: u32 = 0; x < width; x++) {
            // Z = (0, 0)
            let zA: f32 = 0;
            let zB: f32 = 0;
            
            // translate the image pixel onto (x, y)-coordinates: C = (x, y)
            let cA: f32 = x0 + (x1 - x0) / <f32>width * <f32>x;
            let cB: f32 = y0 + (y1 - y0) / <f32>height * <f32>y;

            // while |Z| <= 2
            let interations: u32 = 0;
            while(interations++ < width && (zA * zA + zB * zB) <= 4) {
                // Z = Z * Z + C
                let t: f32 = zA * zA - zB * zB;
                zB = 2 * zA * zB + cB;
                zA = t + cA;
            }

            // compute the pixel color
            store<i8>(currentPixel++, getColor(255, interations, width));
            store<i8>(currentPixel++, getColor(255, interations, width));
            store<i8>(currentPixel++, getColor(255, interations, width));
            store<i8>(currentPixel++, 255);

        }
    }
}
import { Float32BufferAttribute } from 'three';

import { COLOR } from '@/shared/const';

function buildColor(colors: Array<{ r: number; g: number; b: number }>) {
  const result: Array<number> = [];
  for (const color of colors) {
    // define the same color for each vertex of a triangle
    result.push(color.r, color.g, color.b);
    result.push(color.r, color.g, color.b);
    result.push(color.r, color.g, color.b);
    result.push(color.r, color.g, color.b);
    result.push(color.r, color.g, color.b);
    result.push(color.r, color.g, color.b);
  }

  return new Float32BufferAttribute(result, 3);
}

export const rubikInitColor = buildColor([
  COLOR.red, // RIGHT X+
  COLOR.blue, // LEFT X-
  COLOR.green, // TOP Y+
  COLOR.orange, // BOTTOM Y-
  COLOR.yellow, // FRONT Z+
  COLOR.white, // BACK Z-
]);
export const rubikGlowColor = buildColor([
  COLOR.redGlow,
  COLOR.blueGlow,
  COLOR.greenGlow,
  COLOR.orangeGlow,
  COLOR.yellowGlow,
  COLOR.whiteGlow,
]);

/* ====================================================== *

   sketchlib v0.0.2 - 2023-02-27

   Drawing functions and utilities for working with 
   HTML canvas

 * ====================================================== */

import { qs, qsa, whenReady } from './src/utils.js';
import { prepareSketch, background } from './src/canvas.js';
import { polar, drawCircle, PI, TAU } from './src/geo.js';
import { palettes } from './src/color.js';
import { timing } from './src/time.js';

export default {
  qs, qsa, whenReady,
  prepareSketch, background,
  PI, TAU, polar, drawCircle,
  palettes,
  timing
};

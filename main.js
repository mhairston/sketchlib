/* ====================================================== *

   sketchlib

   Drawing functions and utilities for working with 
   HTML canvas

 * ====================================================== */

import { qs, qsa, whenReady } from './src/utils.js';
import { prepareSketch, drawBackground} from './src/canvas.js';
import { PI, TAU, radians, drawCircle, polar } from './src/geo.js';
import { createFrame } from './src/Frame.js';
import { palettes } from './src/color.js';
import { timing, cycle } from './src/time.js';
import { 
  setSeed,
  rr,
  rri,
  rrq,
  rb,
  rbi,
  choose,
  coin,
  wobble,
  shuffle
} from './src/random.js';

export default {
  qs,
  qsa, 
  whenReady,
  prepareSketch, 
  drawBackground,
  PI, 
  TAU,
  radians,
  polar, 
  drawCircle,
  createFrame,
  palettes,
  timing,
  cycle,
  setSeed,
  rr,
  rri,
  rrq,
  rb,
  rbi,
  choose,
  coin,
  wobble,
  shuffle
};

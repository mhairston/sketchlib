/* ====================================================== *

   sketchlib

   Drawing functions and utilities for working with 
   HTML canvas

 * ====================================================== */

import { qs, qsa, whenReady } from './utils.js';
import { prepareSketch, drawBackground} from './canvas.js';
import { PI, TAU, radians, drawCircle, polar } from './geo.js';
import { createFrame } from './Frame.js';
import { tint, shade, palettes } from './color.js';
import { timing, cycle, times } from './time.js';
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
} from './random.js';

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
  tint,
  shade,
  palettes,
  timing,
  cycle,
  times,
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

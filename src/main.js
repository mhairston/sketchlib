/* ====================================================== *

   sketchlib

   Drawing functions and utilities for working with
   HTML canvas

 * ====================================================== */

import { prepareSketch, drawBackground, saveImage } from './canvas.js';
import { PI, TAU, radians, drawCircle, circle, polar } from './geo.js';
import { createFrame } from './Frame.js';
import { processPath } from './path.js';
import { createPolygon } from './Polygon.js';
import { tint, shade, palettes } from './color.js';
import { timing, cycle, times } from './time.js';
import { grid } from './grid.js';

import {
  qs,
  qsa,
  whenReady,
  sum,
  constrain,
  constrainWrap,
  rawTime,
  padNum,
  chooseKey,
} from './utils.js';

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
  saveImage,
  drawBackground,
  PI,
  TAU,
  radians,
  polar,
  drawCircle,
  circle,
  createFrame,
  processPath,
  createPolygon,
  tint,
  shade,
  palettes,
  timing,
  cycle,
  grid,
  times,
  setSeed,
  rawTime,
  sum,
  constrain,
  constrainWrap,
  rawTime,
  padNum,
  chooseKey,
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

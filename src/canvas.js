import { rawTime } from './utils.js';

/* ====================================================== *

   sketchlib - canvas

   Canvas-related functions

 * ====================================================== */

/**
 * init - create canvas and set some defaults
 *
 * @param {Object} options
 * @param {string} options.title - sketch title, used for document title
 *                                 and base filename for snapshots
 * @param {string} options.canvasId
 * @param {number} options.canvasWidth - canvas width (if undefined use window width)
 * @param {number} options.canvasHeight - canvas height (if undefined use window height)
 * @param {Object} options.pal - structured color palette:
 * @param {string} options.pal.background - the initial background color of the sketch
 * @param {string} options.pal.primary - first color of the palette
 * @param {string} options.pal.secondary - second color of the palette
 * @param {number} options.frameRate - the desired number of frames per second. Set to
 *                                     zero for a static sketch (no animation).
 * @return {Object}
 */
function createSketch(options) {
  let ctx;
  // get canvas & set size
  const canvas = document.getElementById(options.canvasId);
  const w = options.canvasWidth || window.innerWidth;
  const h = options.canvasHeight || window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  ctx = canvas.getContext('2d');

  return {
    title: options.title,
    ctx: ctx,
    canvas: canvas,
    canvasWidth: w,
    canvasHeight: h,
    cw: w,
    ch: h,
    hw: w * 0.5,
    hh: h * 0.5,
    pal: options.pal,
    seed: options.seed,
    setup: options.setup,
    draw: options.draw,
    reset: options.reset,
    frameRate: options.frameRate,
    origFrameRate: options.frameRate,
    matchBackground: options.matchBackground,
    config: options.config
  };
}

function initSketch(sketch) {
  // Sketch title & body background color:
  document.title = `${sketch.title} - sketchlib`;
  // Defaults:
  sketch.ctx.lineJoin = 'round';
  sketch.ctx.lineCap = 'round';
}

function drawBackground(ctx, col) {
  ctx.save();
  ctx.strokeStyle = 'none';
  ctx.fillStyle = col;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}

function prepareSketch(options) {
  const sketch = createSketch(options);
  initSketch(sketch);
  return sketch;
}

function saveImage(sk) {
  var filename = sk.title + ' [' + sk.seed + '] ' + rawTime();
  console.log('Saving: ' + filename + '.png');

  // Save canvas code taken from
  // https://www.digitalocean.com/community/tutorials/js-canvas-toblob
  sk.canvas.toBlob(
    blob => {
      const anchor = document.createElement('a');
      anchor.download = `${filename}.png`; // optional, but you can give the file a name
      anchor.href = URL.createObjectURL(blob);
      anchor.click(); // ✨ magic!

      URL.revokeObjectURL(anchor.href); // remove it from memory and save on memory! 😎
    },
    'image/png'
  );
}

export {
  createSketch,
  initSketch,
  prepareSketch,
  drawBackground,
  saveImage
}

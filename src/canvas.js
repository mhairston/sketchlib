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
    hw: w * 0.5,
    hh: h * 0.5,
    pal: options.pal,
    frameRate: options.frameRate,
    origFrameRate: options.frameRate,
    matchBackground: options.matchBackground
  };
}

function initSketch(sketch) {
  // Sketch title & body background color:
  document.title = `${sketch.title} - sketchlib`;
  // Defaults:
  sketch.ctx.lineJoin = 'round';
  sketch.ctx.lineCap = 'round';
}

function drawBackground(sketch) {
  const ctx = sketch.ctx;
  if (sketch.pal?.background) {
    ctx.save();
    ctx.strokeStyle = 'none';
    ctx.fillStyle = sketch.pal.background;
    ctx.fillRect(0, 0, sketch.canvasWidth, sketch.canvasHeight);
    ctx.restore();
    if (sketch.matchBackground) {
      document.body.style.backgroundColor = sketch.pal.background;
    }
  }
}

function prepareSketch(options) {
  const sketch = createSketch(options);
  initSketch(sketch);
  return sketch;
}

export {
  createSketch,
  initSketch,
  prepareSketch,
  drawBackground
}

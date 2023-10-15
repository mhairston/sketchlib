/* ====================================================== *

   sketchlib - geo

   Geometry functions and constants

 * ====================================================== */

/** @type {number} */
const PI = Math.PI;

/** @type {number} */
const TAU = PI * 2;


/**
 * Convert degrees to radians
 * @param {number} degrees - value to convert
 * @return {number}
 */
function radians(degrees) {
  return degrees / 360 * TAU;
}

/**
 * drawCircle
 *
 * Draw a circle using current fill/stroke/etc.
 * Unless part of a compound shape, be sure to wrap in beginShape/endShape.
 *
 * @param {CanvasRenderingContext2D} ctx - drawing context to which to render
 * @param {number} x - horizontal center of the circle
 * @param {number} y - vertical center of the circle
 * @param {number} r - radius of the circle
 */
function drawCircle(ctx, x, y, r) {
  ctx.moveTo(x + r, y);
  ctx.arc(x, y, r, 0, TAU);
}

/**
 * circle - a better circle method
 *
 * Draw a circle using current fill/stroke/etc.
 * Unless part of a compound shape, be sure to wrap in beginShape/endShape.
 *
 * @param {CanvasRenderingContext2D} ctx - drawing context to which to render
 * @param {number} x - horizontal center of the circle
 * @param {number} y - vertical center of the circle
 * @param {number} r - radius of the circle
 * @param {Boolean} [fromEdge] - if true, draw from edge; if false, from center (default).
 */
function circle(ctx, x, y, diam, fromEdge) {
  const radius = diam / 2;
  const offset = (fromEdge) ? radius : 0;
  const nx = x + offset;
  const ny = y + offset;
  ctx.arc(nx, ny, radius, 0, TAU);
}

/**
 * polar - Convert polar coordinates to Cartesian x,y.
 *
 * @param {number} angle - The angle of the polar offset.
 * @param {number} mag - The magnitude of the polar offset.
 * @return {Object} - with properties x & y.
 */
function polar(angle, mag) {
  return {
    x: Math.sin(angle) * mag,
    y: Math.cos(angle) * mag
  }
}

export {
  PI,
  TAU,
  radians,
  polar,
  drawCircle,
  circle
};

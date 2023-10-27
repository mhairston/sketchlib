/* ====================================================== *

  sketchlib - utils

  Misc. utility functions

 * ====================================================== */

/**
 * qs - shortcut wrapper for element.querySelector
 *
 * @param {string} selector - what to look for, in CSS selector syntax
 * @param {HTMLElement} scope - the top element of the DOM subtree to search
 * @return {HTMLElement|null}
 */
function qs(selector, scope) {
  if (!scope) { scope = document; }
  return scope.querySelector(selector);
}

/**
 * qs - shortcut wrapper for element.querySelectorAll
 *
 * @param {string} selector - what to look for, in CSS selector syntax
 * @param {HTMLElement} scope - the top element of the DOM subtree to search
 * @return {NodeList}
 */
function qsa(selector, scope) {
  if (!scope) { scope = document; }
  return scope.querySelectorAll(selector);
}

/**
 * whenReady - code to run when page & resources completely loaded
 * (just some syntactic sugar for the long form)
 *
 * @param callback - function to run on DOMContentLoaded event.
 */
function whenReady(callback) {
  window.addEventListener('DOMContentLoaded', callback);
}

function sum(list) {
  let sum = 0;
  list.forEach((val) => {
    if (typeof val != 'number') {
      throw(`List to be summed includes non-number '${val}'`);
    } else {
      sum += val;
    }
   });
  return sum;
}

function constrain(val,min,max) {
  if (val < min) {val = min;}
  if (val > max) {val = max;}
  return val;
}

function constrainWrap(val,min,max) {
  if (val < min) {val = max;}
  if (val > max) {val = min;}
  return val;
}

function rawTime() {
 var now = new Date();
 return padNum(now.getHours(),2)
  + padNum(now.getMinutes(),2)
  + padNum(now.getSeconds(),2);
}

function padNum(num, places) {
  return ("00000000000" + num).slice(0 - places);
}

function chooseKey(obj) {
  return choose(Object.keys(obj));
}

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

var dist = {};

(function (exports) {
	Object.defineProperty(exports,"__esModule",{value:!0}),exports.Random=function(...t){var e=this;(t=t.length?t:[...new Array(4)].map(()=>4294967296*Math.random())).length=4,t=new Int32Array(t);do{for(let e=1;e<8;e++){const n=t[e-1&3];t[3&e]^=e+Math.imul(1812433253,(n^n>>>30)>>>0)>>>0;}e.x=t[0],e.y=t[1],e.z=t[2],e.w=t[3];}while(0==(e.x|e.y|e.z|e.w));const n=()=>{const t=(t,e)=>t<<e|t>>>32-e,n=9*t(5*e.y,7)>>>0,r=e.y<<9;return e.z^=e.x,e.w^=e.y,e.y^=e.z,e.x^=e.w,e.z^=r,e.w=t(e.w,11),n},r=()=>2097152*n()+(e.x+e.w>>>11);return {uint32:n,uint53:r,float64:()=>r()/9007199254740992}}; 
} (dist));

/* ====================================================== *

   sketchlib - random

   Randomization functions

 * ====================================================== */

let rando = new dist.Random(0);

function setSeed(seed) {
  rando = new dist.Random(seed);
}

function _randomFloat() {
  return rando.float64();
}

/**
 * Useful randomization functions.
 */

/**
 * Random in range (float; min is inclusive; max is exclusive)
 * @param {Number} min - lower bound of range; if only one argument, lower
 *                       is 0 and min is used as max.
 * @param {Number} max = upper bound of range, if there are two arguments.
 * @return {Number} - the resulting pseudorandom number.
 */
function rr(min, max) {
  if (typeof max === 'undefined') {
    max = min;
    min = 0;
  }
  const num = (_randomFloat() * (max - min)) + min;
  return num;
}

/**
 * Random in range (integer; min & max inclusive)
 * @param {Number} min - lower bound of range; if only one argument, lower
 *                       is 0 and min is used as max.
 * @param {Number} max = upper bound of range, if there are two arguments.
 * @return {Number} - the resulting pseudorandom number.
 */
function rri(min, max) {
  return Math.floor(rr(min, max + 1));
}

/**
 * Same as rr, but quantized such that `slices` is the number of possible
 * values returned.
 *
 * @param {Number} min - lower bound of range; if only one argument, lower
 * is 0 and min is used as max.
 * @param {Number} max - upper bound of range, if there are two arguments.
 * @param {Number} slices - The number of possible values returned, spread
 * evenly across the range.
 * @return {Number} - the resulting pseudorandom number.
 */
function rrq(min, max, slices) {
  const inc = (max - min) / slices;
  return rri(0, slices) * inc;
}

/**
 * Random, bipolar: returns a number between -magnitude and +magnitude,
 * exclusive.
 * @param {Number} magnitude - the spread of possible values above
 * and below zero.
 * @return {Number} - the resulting pseudorandom number.
 */
function rb(magnitude) {
  const n = rr(magnitude);
  if (coin(0.5)) {
    return n;
  } else {
    return 0 - n;
  }
}

/**
 * Random, bipolar integer: returns a number between -magnitude
 * and +magnitude, inclusive.
 * @param {Number} magnitude - the spread of possible values above
 * and below zero.
 * @return {Number} - the resulting pseudorandom number.
 */
function rbi(magnitude) {
  const n = Math.floor(rr() * (magnitude + 1));
  if (coin(0.5)) {
    return n;
  } else {
    return 0 - n;
  }
}

/**
 * Return a random element from an array.
 * @param {Array} collection - the set of items from which to choose.
 * @return {Any} - the chosen item.
 */
function choose$1(collection) {
  return collection[rri(0, collection.length - 1)];
}

/**
 * Return the result of a virtual coin flip. Even chances by default,
 * or get a biased result by passing in a threshhold != 0.5.
 * @param {Number} threshhold - the spread of possible values above
 * and below zero.
 * @return {Number} - the resulting pseudorandom number.
 */
function coin(threshhold = 0.5) {
  return rr(0, 1) < threshhold;
}

/**
 * Random, bipolar: returns a number between -magnitude and +magnitude,
 * exclusive, plus a starting value.
 * @param {Number} number - the center value.
 * @param {Number} magnitude - the spread of possible values above and
 * below the center value.
 * @return {Number} - the resulting pseudorandom number.
 */
function wobble(magnitude, ...number) {
  return number.map((n) => {
    return n + rb(magnitude);
  })
}

/**
 * Fisher-Yates (Knuth) Shuffle
 * http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param {Array} array - the collection to be shuffled.
 * @return {Array} - The shuffled array.
 */
const shuffle = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(_randomFloat() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

/**
 * createFrame - factory function for Frame
 * Part of sketchlib / 20230318
 *
 * A rectangle, defined by location x & y and width & height, plus related
 * methods for drawing, measuring, and subdividing.
 *
 * @class
 * @param {CanvasRenderingContext2D} ctx - graphics object to draw to.
 * @param {number} x Horizontal of frame's upper left corner.
 * @param {number} y Vertical of frame's upper left corner.
 * @param {number} frameWidth Width of frame.
 * @param {number} frameHeight Height of frame.
 */
const createFrame = (ctx, x, y, frameWidth, frameHeight) => {

  function Frame(ctx, x, y, frameWidth, frameHeight) {
    if (ctx != undefined) {
      this.ctx = ctx;
    } else {
      throw new Error('Frame error: No rendering context.');
    }
    // default to full canvas size:
    if (x === undefined) {
      this.x = 0;
      this.y = 0;
      this.width = ctx.canvas.width;
      this.height = ctx.canvas.height;
    } else {
      this.x = x;
      this.y = y;
      this.width = frameWidth;
      this.height = frameHeight;
    }
    this._pointWobble = 0;
  }

  // static methods:

  /**
   * Converts an array of 1-4 args to four args
   * corresponding to the sides of a box, CSS-style
   * (top-right-bottom-left).
   *
   * Used by public inset & outset methods.
   * @private
   * @param {number} s1 first side value.
   * @param {number} s2 second side value. (optional)
   * @param {number} s3 third side value. (optional)
   * @param {number} s4 fourth side value. (optional)
   */
  Frame._expandOffsetArgs = (s1,s2,s3,s4) => {
    if (typeof s2 === 'undefined') {
      return [s1,s1,s1,s1];
    } else if (typeof s3 === 'undefined') {
      return [s1,s2,s1,s2];
    } else if (typeof s4 === 'undefined') {
      return [s1,s2,s3,s2];
    } else {
      return [s1,s2,s3,s4];
    }
  };

  /**
   * Generate a new frame with randomized position & size.
   * @param {CanvasRenderingContext2D} ctx - drawing context for the frame.
   * @return {Frame}
   */
  Frame.random = function(ctx) {
    const { cwidth, cheight } = this.ctx.canvas;
    var minSize = cwidth / 22;
    var maxSize = cwidth * (3/4);
    return new Frame(ctx, rr(-100, cwidth - 100), rr(-100, cheight - 100),
      rr(minSize, maxSize),rr(minSize, maxSize));
  };


  // instance methods:
  Frame.prototype.rx = function() {
    return this.x + rr(this.width);
  };

  Frame.prototype.ry = function() {
    return this.y + rr(this.height);
  };

  Frame.prototype.setPointWobble = function(wob) {
    this._pointWobble = wob;
  };

  Frame.prototype.getPointWobble = function() {
    return this._pointWobble;
  };

  /**
   * Returns the absolute lower right coordinates of the frame.
   *
   */
  Frame.prototype.endPoint = function () {
    return {
      x: this.x + this.width,
      y: this.y + this.height
    };
  };

  /**
   * Returns the absolute x and y midpoints of the frame.
   *
   */
  Frame.prototype.midPoint = function() {
    return {
      x: this.x + (this.width / 2),
      y: this.y + (this.height / 2)
    };
  };

  /**
   * Returns a point along the x-axis of the frame.
   *
   * @param {number} fraction Horizontal position, where 0 is the left edge
   * of the frame and 1 is the right edge.
   * @returns {number} Absolute x-coordinate on canvas.
   */
  Frame.prototype.pointX = function(fraction) {
    return this.x + (this.width * fraction);
  };

  /**
   * Returns a point along the y-axis of the frame.
   *
   * @param {number} fraction Vertical position, where 0 is the top of
   *    the frame and 1 is the bottom.
   * @returns {number} Absolute y-coordinate on canvas.
   */
  Frame.prototype.pointY = function(fraction) {
    return this.y + (this.height * fraction);
  };

  /**
   * Returns a point along the x-axis of the frame, with optional wobble.
   *
   * @param {number} fraction Horizontal position, where 0 is the left edge
   * of the frame and 1 is the right edge.
   * @returns {number} Absolute x-coordinate on canvas.
   */
  Frame.prototype.px = function(fraction) {
    return this.x + (this.width * fraction) + rb(this._pointWobble);
    //return this.x + (this.width * (rb(this._pointWobble) * fraction));
  };

  /**
   * Returns a point along the y-axis of the frame, with optional wobble.
   *
   * @param {number} fraction Vertical position, where 0 is the top of
   *    the frame and 1 is the bottom.
   * @returns {number} Absolute y-coordinate on canvas.
   */
  Frame.prototype.py = function(fraction) {
    return this.y + (this.height * fraction) + rb(this._pointWobble);
    //return this.y + (this.height * (rb(this._pointWobble) * fraction));
  };

  /**
   * Draws a horizontal line at a vertical position proportional to
   * the y-axis of the frame.
   *
   * @param {number} fraction Vertical position, where 0 is the top of
   *    the frame and 1 is the bottom.
   */
  Frame.prototype.hLine = function(fraction = 0.5, wobble = 0) {
    let x1 = this.x;
    let y1 = this.pointY(fraction);
    let x2 = this.endPoint().x;
    let y2 = y1;
    if (wobble) {
      x1 += rb(wobble);
      y1 += rb(wobble);
      x2 += rb(wobble);
      y2 += rb(wobble);
    }
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  };

  /**
   * Draws a vertical line at a horizontal position proportional to
   * the x-axis of the frame.
   *
   * @param {number} fraction Vertical position, where 0 is the top of
   *    the frame and 1 is the bottom.
   */
  Frame.prototype.vLine = function(fraction = 0.5, wobble = 0) {
    let x1 = this.pointX(fraction);
    let y1 = this.y;
    let x2 = this.pointX(fraction);
    let y2 = this.endPoint().y;
    if (wobble) {
      x1 += rb(wobble);
      y1 += rb(wobble);
      x2 += rb(wobble);
      y2 += rb(wobble);
    }
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  };

  /**
   * Draws the frame using the current drawing settings.
   *
   */
  Frame.prototype.rect = function () {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.stroke();
  };

  /**
   * Inscribes a circle (or ellipse) within the frame.
   */
  Frame.prototype.circle = function () {
    this.ctx.save();
    this.ctx.ellipse(this.x, this.y, this.width, this.height);
    this.ctx.restore();
  };

  /**
   * Draws the frame on any background.
   *
   */
  Frame.prototype.debug = function () {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#fff';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    ctx.restore();
  };

  /**
   * Returns the Frame's ratio of width to height.
   *
   */
  Frame.prototype.aspectRatio = function () {
    return (this.width / this.height);
  };

  /**
   * Returns a string describing the aspect ratio of the frame as 'square',
   * 'square-ish', 'portrait', or landscape'.
   *
   */
  Frame.prototype.aspectDesc = function () {
    var ratio = this.aspectRatio();
    var portraitLimit = (9 / 10);
    var landscapeLimit = (10 / 9);
    if (ratio === 1) {
      return 'square';
    }
    if (ratio > portraitLimit &&
        ratio < landscapeLimit) {
      return 'squarish';
    }
    if (ratio <= portraitLimit) {
      return 'portrait';
    }
    if (ratio >= (10 / 9)) {
      return 'landscape';
    }
  };

  /*
    TODO: add Frame.prototype.center (wrt canvas).
    Also -- find a better way for Frame to "know" about the canvas.
  */

  /**
   * Returns a new frame with sides inset from the original.
   *
   * @returns {object} a new Frame.
   */
  Frame.prototype.inset = function(s1, s2, s3, s4) {
    const sides = Frame._expandOffsetArgs(s1, s2, s3, s4);
    const newX = this.x + sides[3];
    const newY = this.y + sides[0];
    const newW = this.width - sides[1] - sides[3];
    const newH = this.height - sides[0] - sides[2];
    return new Frame(this.ctx, newX, newY, newW, newH);
  };

  Frame.prototype.insetRel = function(f1, f2, f3, f4) {
    const sides = Frame._expandOffsetArgs(f1, f2, f3, f4);
    const newX = this.x + this.width * sides[3];
    const newY = this.y + this.height * sides[0];
    const newW = this.width - this.width * (sides[1] + sides[3]);
    const newH = this.height - this.height * (sides[0] + sides[2]);
    return new Frame(this.ctx, newX, newY, newW, newH);
  };

  /**
   * Offsets the frame by a random amount, limited by max. Frame width
   * and height remain unaltered.
   *
   * @param {number} maxOffset Limits maximum offset to this magnitude.
   * @returns {object} A new frame, offset from the one passed in.
   */
  Frame.prototype.wobble = function(maxOffset) {
    return new Frame(this.ctx,
      this.x + rb(maxOffset), this.y + rb(maxOffset),
      this.width, this.height
    )
  };


  /**
   * Splits a frame into two halves: one above and one below.
   *
   * @param {number} depth Maximum variance in vertical location of split. Given
   * a depth of zero, the split will be across the exact center.
   * @param {number} offset shifts the vertical location of the split by a set
   *    amount.
   * @returns {Frame[]} Two Frames.
   */
  Frame.prototype.splitHorizontal = function(depth = 0, offset = 0) {
    var divide = 0.5 + rb(depth) + offset;
    if (divide > 0.999) { divide = 0.999; }
    if (divide < 0.001) { divide = 0.001; }
    divide *= this.height;
    var height1 = divide;
    var height2 = this.height - divide;
    return [
      new Frame(this.ctx, this.x, this.y, this.width, height1),
      new Frame(this.ctx, this.x, height1, this.width, height2)
    ];
  };

  /**
   * Splits a frame into two halves: one left and one right.
   *
   * @param {number} depth Maximum variance in horizontal location of split.
   * Given a depth of zero, the split will be across the exact center.
   *
   * @param {number} offset shifts the vertical location of the split by a set
   * amount.
   *
   * @returns {array} Two half-frames.
   */
  Frame.prototype.splitVertical = function(depth = 0, offset = 0) {
    var divide = 0.5 + rb(depth) + offset;
    if (divide > 0.999) { divide = 0.999; }
    if (divide < 0.001) { divide = 0.001; }
    divide *= this.width;
    var width1 = divide;
    var width2 = this.width - divide;
    return [
      new Frame(this.ctx, this.x, this.y, width1, this.height),
      new Frame(this.ctx, this.midPoint().x, this.y, width2, this.height)
    ];
  };

  // Once grid() is working, make this just a wrapper method.
  Frame.prototype.quarters = function () {
    var newWidth = this.width / 2;
    var newHeight = this.height / 2;
    return [
      new Frame(this.ctx, this.x, this.y, newWidth, newHeight),
      new Frame(this.ctx, this.midPoint().x, this.y, newWidth, newHeight),
      new Frame(this.ctx, this.x, this.midPoint().y, newWidth, newHeight),
      new Frame(this.ctx, this.midPoint().x, this.midPoint().y, newWidth, newHeight)
    ];
  };

  Frame.prototype.grid = function (columns, rows) {
    var i;
    var j;
    var row;
    var grid;
    var moduleWidth = this.width / columns;
    var moduleHeight = this.height / rows;
    grid = [];
    for (i = 0; i < rows; i++) {
      row = [];
      for(j = 0; j < columns; j++) {
        row.push(
          new Frame(this.ctx,
            this.x + (j * moduleWidth),
            this.y + (i * moduleHeight),
            moduleWidth,
            moduleHeight
          )
        );
      }
      grid.push(row);
    }
    return grid;
  };

  return new Frame(ctx, x, y, frameWidth, frameHeight);
};

/*
  Some functions for facilitating easy manipulation of SVG path data.
  processPath takes an SVG path string (`<path d="THE STUFF IN HERE">`)
  and parses out all the numeric values, so they can be processed/
  massaged/tweaked/wobbled by an arbitrary callback function, then
  the path data string is returned with the new values replacing the old.
*/

const TOKEN = '<>';

/**
 * @param {string} svgPathData
 * @return {Array<number>}
 */
function _getValuesFromPathData(svgPathData) {
  const matches = [...svgPathData.matchAll(/[0-9.]+/g)];
  return matches.map((match) => Number(match[0]));
}

/**
 * Replace all the numbers with a token so later
 * we can come back and replace them in order.
 * @param {string} svgPathData
 * @return {string}
 */
function _tokenizePathData(svgPathData) {
  return svgPathData.replaceAll(/[0-9.]+/g, TOKEN);
}

/**
 * @param {Array<number>} values
 * @param {number} [digits]
 * @param {Function} callback - function to process the values.
 * @return {Array<string>}
 */
function _processValues(values, digits = 6, callback) {
  let newValues = values;
  if (callback) {
    newValues = newValues.map((value, index, list) => {
      return callback(value, index, list);
    });
  }
  // Limit precision:
  return newValues.map((value) => Number(value).toPrecision(digits));
}

function _recreatePathData(pathData, newValues) {
  let path = _tokenizePathData(pathData);
  newValues.forEach((value) => {
    path = path.replace(TOKEN, value);
  });
  return path;
}
/**
 * @param {string} origPathData
 * @param {number} digits - max precision of numbers at the end of the process.
 * @param {Function} processingFunction - callback to process the values
 */
function processPath(origPathData, digits = 6, processingFunction) {
  const values = _getValuesFromPathData(origPathData);
  const newValues = _processValues(values, digits, processingFunction);
  return _recreatePathData(origPathData, newValues);
}

/*
Usage with HTML canvas:

  const origPathData = 'M250.137912,0.1171875 C250.137912,166.783854 333.466918,250.117188 500.124931,250.117188';

  const newPathData = processPath(
    origPathData,
    4,
    (val, i, list) => val / 5 + Math.random() * 10 - 5
  );

  ctx.strokeStyle = '#3c8';
  ctx.lineWidth = 4;
  ctx.stroke(newPathData);
*/

/**
 * @param {number} segments - number of sides for the polygon
 * @return {Polygon}
 */
function createPolygon(numSegments = 8) {

  /**
   * @param {number} [segments] - number of sides for the polygon
   */
  class Polygon {
    constructor(numSegments) {
      let angle, mag;
      this.numSegments = numSegments;
      this.points = [];
      this.pointJitter = [];
      for(let seg = 0; seg < this.numSegments; seg++) {
        angle = (TAU / this.numSegments) * seg;
        this.points.push({
          x: Math.sin(angle),
          y: Math.cos(angle)
        });
        angle = rr(0, 360);
        mag = rr(0, 1);
        this.pointJitter.push({
          x: Math.sin(angle) * mag,
          y: Math.cos(angle) * mag
        });
      }
    }

    render(ctx, options) {
      const { x, y, radius, jitter, angle } = options;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(
        radius * (this.points[0].x + (this.pointJitter[0].x * jitter)),
        radius * (this.points[0].y + (this.pointJitter[0].y * jitter))
      );
      for (let seg = 1; seg < this.numSegments; seg++) {
        ctx.lineTo(
          radius * (this.points[seg].x + (this.pointJitter[seg].x * jitter)),
          radius * (this.points[seg].y + (this.pointJitter[seg].y * jitter))
        );
      }
      ctx.lineTo(
        radius * (this.points[0].x + (this.pointJitter[0].x * jitter)),
        radius * (this.points[0].y + (this.pointJitter[0].y * jitter))
      );
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }

  return new Polygon(numSegments);
}

// This file is autogenerated. It's used to publish ESM to npm.
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

var trimLeft = /^\s+/;
var trimRight = /\s+$/;
function tinycolor(color, opts) {
  color = color ? color : "";
  opts = opts || {};

  // If input is already a tinycolor, return itself
  if (color instanceof tinycolor) {
    return color;
  }
  // If we are called as a function, call using new instead
  if (!(this instanceof tinycolor)) {
    return new tinycolor(color, opts);
  }
  var rgb = inputToRGB(color);
  this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = Math.round(100 * this._a) / 100, this._format = opts.format || rgb.format;
  this._gradientType = opts.gradientType;

  // Don't let the range of [0,255] come back in [0,1].
  // Potentially lose a little bit of precision here, but will fix issues where
  // .5 gets interpreted as half of the total, instead of half of 1
  // If it was supposed to be 128, this was already taken care of by `inputToRgb`
  if (this._r < 1) this._r = Math.round(this._r);
  if (this._g < 1) this._g = Math.round(this._g);
  if (this._b < 1) this._b = Math.round(this._b);
  this._ok = rgb.ok;
}
tinycolor.prototype = {
  isDark: function isDark() {
    return this.getBrightness() < 128;
  },
  isLight: function isLight() {
    return !this.isDark();
  },
  isValid: function isValid() {
    return this._ok;
  },
  getOriginalInput: function getOriginalInput() {
    return this._originalInput;
  },
  getFormat: function getFormat() {
    return this._format;
  },
  getAlpha: function getAlpha() {
    return this._a;
  },
  getBrightness: function getBrightness() {
    //http://www.w3.org/TR/AERT#color-contrast
    var rgb = this.toRgb();
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  },
  getLuminance: function getLuminance() {
    //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
    var rgb = this.toRgb();
    var RsRGB, GsRGB, BsRGB, R, G, B;
    RsRGB = rgb.r / 255;
    GsRGB = rgb.g / 255;
    BsRGB = rgb.b / 255;
    if (RsRGB <= 0.03928) R = RsRGB / 12.92;else R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    if (GsRGB <= 0.03928) G = GsRGB / 12.92;else G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    if (BsRGB <= 0.03928) B = BsRGB / 12.92;else B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  },
  setAlpha: function setAlpha(value) {
    this._a = boundAlpha(value);
    this._roundA = Math.round(100 * this._a) / 100;
    return this;
  },
  toHsv: function toHsv() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    return {
      h: hsv.h * 360,
      s: hsv.s,
      v: hsv.v,
      a: this._a
    };
  },
  toHsvString: function toHsvString() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    var h = Math.round(hsv.h * 360),
      s = Math.round(hsv.s * 100),
      v = Math.round(hsv.v * 100);
    return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
  },
  toHsl: function toHsl() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    return {
      h: hsl.h * 360,
      s: hsl.s,
      l: hsl.l,
      a: this._a
    };
  },
  toHslString: function toHslString() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    var h = Math.round(hsl.h * 360),
      s = Math.round(hsl.s * 100),
      l = Math.round(hsl.l * 100);
    return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
  },
  toHex: function toHex(allow3Char) {
    return rgbToHex(this._r, this._g, this._b, allow3Char);
  },
  toHexString: function toHexString(allow3Char) {
    return "#" + this.toHex(allow3Char);
  },
  toHex8: function toHex8(allow4Char) {
    return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
  },
  toHex8String: function toHex8String(allow4Char) {
    return "#" + this.toHex8(allow4Char);
  },
  toRgb: function toRgb() {
    return {
      r: Math.round(this._r),
      g: Math.round(this._g),
      b: Math.round(this._b),
      a: this._a
    };
  },
  toRgbString: function toRgbString() {
    return this._a == 1 ? "rgb(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ")" : "rgba(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ", " + this._roundA + ")";
  },
  toPercentageRgb: function toPercentageRgb() {
    return {
      r: Math.round(bound01(this._r, 255) * 100) + "%",
      g: Math.round(bound01(this._g, 255) * 100) + "%",
      b: Math.round(bound01(this._b, 255) * 100) + "%",
      a: this._a
    };
  },
  toPercentageRgbString: function toPercentageRgbString() {
    return this._a == 1 ? "rgb(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%)" : "rgba(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
  },
  toName: function toName() {
    if (this._a === 0) {
      return "transparent";
    }
    if (this._a < 1) {
      return false;
    }
    return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
  },
  toFilter: function toFilter(secondColor) {
    var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
    var secondHex8String = hex8String;
    var gradientType = this._gradientType ? "GradientType = 1, " : "";
    if (secondColor) {
      var s = tinycolor(secondColor);
      secondHex8String = "#" + rgbaToArgbHex(s._r, s._g, s._b, s._a);
    }
    return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
  },
  toString: function toString(format) {
    var formatSet = !!format;
    format = format || this._format;
    var formattedString = false;
    var hasAlpha = this._a < 1 && this._a >= 0;
    var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");
    if (needsAlphaFormat) {
      // Special case for "transparent", all other non-alpha formats
      // will return rgba when there is transparency.
      if (format === "name" && this._a === 0) {
        return this.toName();
      }
      return this.toRgbString();
    }
    if (format === "rgb") {
      formattedString = this.toRgbString();
    }
    if (format === "prgb") {
      formattedString = this.toPercentageRgbString();
    }
    if (format === "hex" || format === "hex6") {
      formattedString = this.toHexString();
    }
    if (format === "hex3") {
      formattedString = this.toHexString(true);
    }
    if (format === "hex4") {
      formattedString = this.toHex8String(true);
    }
    if (format === "hex8") {
      formattedString = this.toHex8String();
    }
    if (format === "name") {
      formattedString = this.toName();
    }
    if (format === "hsl") {
      formattedString = this.toHslString();
    }
    if (format === "hsv") {
      formattedString = this.toHsvString();
    }
    return formattedString || this.toHexString();
  },
  clone: function clone() {
    return tinycolor(this.toString());
  },
  _applyModification: function _applyModification(fn, args) {
    var color = fn.apply(null, [this].concat([].slice.call(args)));
    this._r = color._r;
    this._g = color._g;
    this._b = color._b;
    this.setAlpha(color._a);
    return this;
  },
  lighten: function lighten() {
    return this._applyModification(_lighten, arguments);
  },
  brighten: function brighten() {
    return this._applyModification(_brighten, arguments);
  },
  darken: function darken() {
    return this._applyModification(_darken, arguments);
  },
  desaturate: function desaturate() {
    return this._applyModification(_desaturate, arguments);
  },
  saturate: function saturate() {
    return this._applyModification(_saturate, arguments);
  },
  greyscale: function greyscale() {
    return this._applyModification(_greyscale, arguments);
  },
  spin: function spin() {
    return this._applyModification(_spin, arguments);
  },
  _applyCombination: function _applyCombination(fn, args) {
    return fn.apply(null, [this].concat([].slice.call(args)));
  },
  analogous: function analogous() {
    return this._applyCombination(_analogous, arguments);
  },
  complement: function complement() {
    return this._applyCombination(_complement, arguments);
  },
  monochromatic: function monochromatic() {
    return this._applyCombination(_monochromatic, arguments);
  },
  splitcomplement: function splitcomplement() {
    return this._applyCombination(_splitcomplement, arguments);
  },
  // Disabled until https://github.com/bgrins/TinyColor/issues/254
  // polyad: function (number) {
  //   return this._applyCombination(polyad, [number]);
  // },
  triad: function triad() {
    return this._applyCombination(polyad, [3]);
  },
  tetrad: function tetrad() {
    return this._applyCombination(polyad, [4]);
  }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function (color, opts) {
  if (_typeof(color) == "object") {
    var newColor = {};
    for (var i in color) {
      if (color.hasOwnProperty(i)) {
        if (i === "a") {
          newColor[i] = color[i];
        } else {
          newColor[i] = convertToPercentage(color[i]);
        }
      }
    }
    color = newColor;
  }
  return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {
  var rgb = {
    r: 0,
    g: 0,
    b: 0
  };
  var a = 1;
  var s = null;
  var v = null;
  var l = null;
  var ok = false;
  var format = false;
  if (typeof color == "string") {
    color = stringInputToObject(color);
  }
  if (_typeof(color) == "object") {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
      ok = true;
      format = "hsv";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s, l);
      ok = true;
      format = "hsl";
    }
    if (color.hasOwnProperty("a")) {
      a = color.a;
    }
  }
  a = boundAlpha(a);
  return {
    ok: ok,
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a: a
  };
}

// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255
  };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: h,
    s: s,
    l: l
  };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb(h, s, l) {
  var r, g, b;
  h = bound01(h, 360);
  s = bound01(s, 100);
  l = bound01(l, 100);
  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    v = max;
  var d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: h,
    s: s,
    v: v
  };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hsvToRgb(h, s, v) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  var i = Math.floor(h),
    f = h - i,
    p = v * (1 - s),
    q = v * (1 - f * s),
    t = v * (1 - (1 - f) * s),
    mod = i % 6,
    r = [v, q, p, p, t, v][mod],
    g = [t, v, v, q, p, p][mod],
    b = [p, p, t, v, v, q][mod];
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {
  var hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];

  // Return a 3 character hex if possible
  if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
}

// `rgbaToHex`
// Converts an RGBA color plus alpha transparency to hex
// Assumes r, g, b are contained in the set [0, 255] and
// a in [0, 1]. Returns a 4 or 8 character rgba hex
function rgbaToHex(r, g, b, a, allow4Char) {
  var hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16)), pad2(convertDecimalToHex(a))];

  // Return a 4 character hex if possible
  if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join("");
}

// `rgbaToArgbHex`
// Converts an RGBA color to an ARGB Hex8 string
// Rarely used, but required for "toFilter()"
function rgbaToArgbHex(r, g, b, a) {
  var hex = [pad2(convertDecimalToHex(a)), pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];
  return hex.join("");
}

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
  if (!color1 || !color2) return false;
  return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};
tinycolor.random = function () {
  return tinycolor.fromRatio({
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  });
};

// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

function _desaturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.s -= amount / 100;
  hsl.s = clamp01(hsl.s);
  return tinycolor(hsl);
}
function _saturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.s += amount / 100;
  hsl.s = clamp01(hsl.s);
  return tinycolor(hsl);
}
function _greyscale(color) {
  return tinycolor(color).desaturate(100);
}
function _lighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.l += amount / 100;
  hsl.l = clamp01(hsl.l);
  return tinycolor(hsl);
}
function _brighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var rgb = tinycolor(color).toRgb();
  rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
  rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
  rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
  return tinycolor(rgb);
}
function _darken(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.l -= amount / 100;
  hsl.l = clamp01(hsl.l);
  return tinycolor(hsl);
}

// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
// Values outside of this range will be wrapped into this range.
function _spin(color, amount) {
  var hsl = tinycolor(color).toHsl();
  var hue = (hsl.h + amount) % 360;
  hsl.h = hue < 0 ? 360 + hue : hue;
  return tinycolor(hsl);
}

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

function _complement(color) {
  var hsl = tinycolor(color).toHsl();
  hsl.h = (hsl.h + 180) % 360;
  return tinycolor(hsl);
}
function polyad(color, number) {
  if (isNaN(number) || number <= 0) {
    throw new Error("Argument to polyad must be a positive number");
  }
  var hsl = tinycolor(color).toHsl();
  var result = [tinycolor(color)];
  var step = 360 / number;
  for (var i = 1; i < number; i++) {
    result.push(tinycolor({
      h: (hsl.h + i * step) % 360,
      s: hsl.s,
      l: hsl.l
    }));
  }
  return result;
}
function _splitcomplement(color) {
  var hsl = tinycolor(color).toHsl();
  var h = hsl.h;
  return [tinycolor(color), tinycolor({
    h: (h + 72) % 360,
    s: hsl.s,
    l: hsl.l
  }), tinycolor({
    h: (h + 216) % 360,
    s: hsl.s,
    l: hsl.l
  })];
}
function _analogous(color, results, slices) {
  results = results || 6;
  slices = slices || 30;
  var hsl = tinycolor(color).toHsl();
  var part = 360 / slices;
  var ret = [tinycolor(color)];
  for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
    hsl.h = (hsl.h + part) % 360;
    ret.push(tinycolor(hsl));
  }
  return ret;
}
function _monochromatic(color, results) {
  results = results || 6;
  var hsv = tinycolor(color).toHsv();
  var h = hsv.h,
    s = hsv.s,
    v = hsv.v;
  var ret = [];
  var modification = 1 / results;
  while (results--) {
    ret.push(tinycolor({
      h: h,
      s: s,
      v: v
    }));
    v = (v + modification) % 1;
  }
  return ret;
}

// Utility Functions
// ---------------------

tinycolor.mix = function (color1, color2, amount) {
  amount = amount === 0 ? 0 : amount || 50;
  var rgb1 = tinycolor(color1).toRgb();
  var rgb2 = tinycolor(color2).toRgb();
  var p = amount / 100;
  var rgba = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b,
    a: (rgb2.a - rgb1.a) * p + rgb1.a
  };
  return tinycolor(rgba);
};

// Readability Functions
// ---------------------
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

// `contrast`
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
tinycolor.readability = function (color1, color2) {
  var c1 = tinycolor(color1);
  var c2 = tinycolor(color2);
  return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
};

// `isReadable`
// Ensure that foreground and background color combinations meet WCAG2 guidelines.
// The third argument is an optional Object.
//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

// *Example*
//    tinycolor.isReadable("#000", "#111") => false
//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
tinycolor.isReadable = function (color1, color2, wcag2) {
  var readability = tinycolor.readability(color1, color2);
  var wcag2Parms, out;
  out = false;
  wcag2Parms = validateWCAG2Parms(wcag2);
  switch (wcag2Parms.level + wcag2Parms.size) {
    case "AAsmall":
    case "AAAlarge":
      out = readability >= 4.5;
      break;
    case "AAlarge":
      out = readability >= 3;
      break;
    case "AAAsmall":
      out = readability >= 7;
      break;
  }
  return out;
};

// `mostReadable`
// Given a base color and a list of possible foreground or background
// colors for that base, returns the most readable color.
// Optionally returns Black or White if the most readable color is unreadable.
// *Example*
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
tinycolor.mostReadable = function (baseColor, colorList, args) {
  var bestColor = null;
  var bestScore = 0;
  var readability;
  var includeFallbackColors, level, size;
  args = args || {};
  includeFallbackColors = args.includeFallbackColors;
  level = args.level;
  size = args.size;
  for (var i = 0; i < colorList.length; i++) {
    readability = tinycolor.readability(baseColor, colorList[i]);
    if (readability > bestScore) {
      bestScore = readability;
      bestColor = tinycolor(colorList[i]);
    }
  }
  if (tinycolor.isReadable(baseColor, bestColor, {
    level: level,
    size: size
  }) || !includeFallbackColors) {
    return bestColor;
  } else {
    args.includeFallbackColors = false;
    return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
  }
};

// Big List of Colors
// ------------------
// <https://www.w3.org/TR/css-color-4/#named-colors>
var names = tinycolor.names = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "0ff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "00f",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  burntsienna: "ea7e5d",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "0ff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "f0f",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "663399",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};

// Make it easy to access colors via `hexNames[hex]`
var hexNames = tinycolor.hexNames = flip(names);

// Utilities
// ---------

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
function flip(o) {
  var flipped = {};
  for (var i in o) {
    if (o.hasOwnProperty(i)) {
      flipped[o[i]] = i;
    }
  }
  return flipped;
}

// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
  a = parseFloat(a);
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }
  return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
  if (isOnePointZero(n)) n = "100%";
  var processPercent = isPercentage(n);
  n = Math.min(max, Math.max(0, parseFloat(n)));

  // Automatically convert percentage into number
  if (processPercent) {
    n = parseInt(n * max, 10) / 100;
  }

  // Handle floating point rounding errors
  if (Math.abs(n - max) < 0.000001) {
    return 1;
  }

  // Convert into [0, 1] range if it isn't already
  return n % max / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
  return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
  return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
  return typeof n === "string" && n.indexOf("%") != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
  return c.length == 1 ? "0" + c : "" + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
  if (n <= 1) {
    n = n * 100 + "%";
  }
  return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
  return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
  return parseIntFromHex(h) / 255;
}
var matchers = function () {
  // <http://www.w3.org/TR/css3-values/#integers>
  var CSS_INTEGER = "[-\\+]?\\d+%?";

  // <http://www.w3.org/TR/css3-values/#number-value>
  var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

  // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
  var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

  // Actual matching.
  // Parentheses and commas are optional, but not required.
  // Whitespace can take the place of commas or opening paren
  var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  return {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
}();

// `isValidCSSUnit`
// Take in a single string / number and check to see if it looks like a CSS unit
// (see `matchers` above for definition).
function isValidCSSUnit(color) {
  return !!matchers.CSS_UNIT.exec(color);
}

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {
  color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color == "transparent") {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      format: "name"
    };
  }

  // Try to match string input using regular expressions.
  // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
  // Just return an object and let the conversion functions handle that.
  // This way the result will be the same whether the tinycolor is initialized with string or object.
  var match;
  if (match = matchers.rgb.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3]
    };
  }
  if (match = matchers.rgba.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hsl.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      l: match[3]
    };
  }
  if (match = matchers.hsla.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      l: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hsv.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      v: match[3]
    };
  }
  if (match = matchers.hsva.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      v: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hex8.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? "name" : "hex8"
    };
  }
  if (match = matchers.hex6.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? "name" : "hex"
    };
  }
  if (match = matchers.hex4.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      a: convertHexToDecimal(match[4] + "" + match[4]),
      format: named ? "name" : "hex8"
    };
  }
  if (match = matchers.hex3.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      format: named ? "name" : "hex"
    };
  }
  return false;
}
function validateWCAG2Parms(parms) {
  // return valid WCAG2 parms for isReadable.
  // If input parms are invalid, return {"level":"AA", "size":"small"}
  var level, size;
  parms = parms || {
    level: "AA",
    size: "small"
  };
  level = (parms.level || "AA").toUpperCase();
  size = (parms.size || "small").toLowerCase();
  if (level !== "AA" && level !== "AAA") {
    level = "AA";
  }
  if (size !== "small" && size !== "large") {
    size = "small";
  }
  return {
    level: level,
    size: size
  };
}

/* ====================================================== *

   sketchlib - color

   A color format for working with canvas sketches

   TODO:

   - A façade for some tinycolor2 functions
   - An opinionated, standard palette format:
     - HSB; alpha is NOT included in color definitions.
     - Each color has hue, saturation, and a default
       brightness.
     - Specific color roles like background, primary,
       secondary.
     - Each color has a numeric parameter for
       variations in brightness.
     - Can output an object with hex colors for portability

 * ====================================================== */

const tint = function(col, amt) {
  return tinycolor(col).lighten(amt).toHexString();
};

const shade = function(col, amt) {
  return tinycolor(col).darken(amt).toHexString();
};

const palettes = Object.freeze({
  default: [
    '#404',
    '#909',
    '#070',
    '#6c6',
  ],

  darkSlush: [
    '#000000',
    '#0F6292',
    '#16FF00',
    '#FFED00'
  ],

  warmier: [
    '#400E32',
    '#A61F69',
    '#F2921D',
    '#F2CD5C'
  ],

  brightWinter: [
    '#FC7300',
    '#BFDB38',
    '#1F8A70',
    '#00425A'
  ],

  camoflage: [
    '#5F7161',
    '#6D8B74',
    '#EFEAD8',
    '#D0C9C0'
  ],

  corvetteSummer: [
    '#900C27',
    '#C70039',
    '#F6C667',
    '#F1F8FD'
  ],

  taffy: [
    '#824C96',
    '#433466',
    '#FFAF4F',
    '#ED733F'
  ],

  airSeaBattle: [
    '#92E6E6',
    '#FFF9AF',
    '#D65D7A',
    '#524C84'
  ],

  battleshipCreamsicle: [
    '#85A392',
    '#F5B971',
    '#FDD998',
    '#FFECC7'
  ],

  caffeine: [
    '#F1DEC9',
    '#C8B6A6',
    '#A4907C',
    '#8D7B68'
  ],

  cool2600: [
    '#191825',
    '#865DFF',
    '#E384FF',
    '#FFA3FD'
  ],

  turtle: [
    '#F7F1E5',
    '#E7B10A',
    '#898121',
    '#4C4B16'
  ],

  primarilyBrilliant: [
    '#00235B',
    '#E21818',
    '#FFDD83',
    '#98DFD6'
  ],

  natureAndSherbet: [
    '#7AA874',
    '#F7DB6A',
    '#EBB02D',
    '#D864A9'
  ],

  level99: [
    '#F67280',
    '#C06C84',
    '#6C5B7B',
    '#355C7D'
  ],

  armyJeep: [
    '#61764B',
    '#9BA17B',
    '#CFB997',
    '#CFB997'
  ],

  safetyThird: [
    '#F97B22',
    '#FEE8B0',
    '#9CA777',
    '#FAD6A5'
  ],

  coolNeutral: [
    '#A6D0DD',
    '#FF6969',
    '#FFD3B0',
    '#FFF9DE'
  ],

  altCrayola: [
    '#89375F',
    '#CE5959',
    '#BACDDB',
    '#F3E8FF'
  ],

  icicle: [
    '#453C67',
    '#6D67E4',
    '#46C2CB',
    '#F2F7A1'
  ]
});

/* ====================================================== *

   sketchlib - time

   Timing and cyclic functions

 * ====================================================== */

/**
 * Calculate time-based offsets for running animations
 *
 * @param frameRate - desired frames per second of the sketch
 * @param timestamp - the current time in millis
 * @return {Object} - millis since start, seconds since start, frameNum,
 *                    newFrame (is it a new whole-number frame since last time?),
 *                    delta: millis since last call
 */
function timing(frameRate, timestamp) {
  const millisPerFrame = 1000 / frameRate;
  if (timing.start === undefined) {
    timestamp = Date.now();
    timing.start = timestamp;
    timing.prevTimestamp = 0;
    timing.prevFrameNum = -1;
  }
  const millis = timestamp - timing.start;
  const seconds = Math.floor(millis / 1000);
  const delta = timestamp - timing.prevTimestamp;
  const frameNum = Math.floor(millis / millisPerFrame);
  const newFrame = (timing.prevFrameNum != frameNum);
  timing.prevTimestamp = timestamp;
  timing.prevFrameNum = frameNum;
  return { millis, seconds, frameNum, newFrame, delta };
}

/**
 * Return the sine of the current time in seconds.
 *
 * @param {number} freq - cycles per second to which to scale the period
 * @param {number} phase - cycle offset in radians
 * @param {number} mul - scale factor for the resultant value
 * @param {number} add - offset for t he resultant value
 * @return {number}
 */
function cycle(freq = 1, phase = 0, mul = 1, add = 0) {
  const elapsed = (Date.now() / 1000);
  return Math.sin(elapsed * freq + phase) * mul + add;
}

function times(repeats = 3, callback) {
  for(let i = 0; i < repeats; i++) {
    callback.bind(null, i).call();
  }
}

/**
 * Given a frame, dimensions, and a callback function,
 * execute the callback given the x & y coordinates in the frame.
 *
 * @param {CanvasRenderingContext2D} context
 * @param {Object}   options
 * @param {Object}   options.frame    The rectangle across which items will span
 * @param {Number}   options.xfit     # of items across
 * @param {Number}   options.yfit     # of items up & down
 * @param {Number}   options.minScale
 * @param {Number}   options.maxScale
 * @param {Number}   options.angleMultiple - constraint for rotational angles
 * @param {Function} options.drawingFunction function to execute on every x,y
 * @param {Object}   renderOptions - options to be passed to the rendering function.
 */
function grid(context, options, renderOptions) {
  const ctx = context;
  const { xfit, yfit, drawingFunction, margin, wobble, angles } = options;
  const frame = options.frame || createFrame(ctx);
  const minScale = options.minScale || 1;
  const maxScale = options.maxScale || 1;
  const xmul = frame.width / xfit;
  const ymul = frame.height / yfit;
  const wob = wobble * frame.width;
  const rotationModule = Math.PI * 2 / angles;
  ctx.save();
  ctx.translate(frame.x, frame.y);
  let index = 0;
  for (let y = 0; y < yfit; y += 1) {
    for (let x = 0; x < xfit; x += 1) {
      index += 1;
      if (coin(options.probability)) {
        const scale = rr(minScale, maxScale);
        const newFrame = createFrame(
            ctx,
            x * xmul + rb(wob),
            y * ymul + rb(wob),
            xmul,
            ymul,
        ).insetRel(margin);
        const newOpts = Object.assign(
            {},
            renderOptions,
            { frame: newFrame, column: x, row: y, index },
        );
        ctx.save();
        ctx.translate(xmul / 2, ymul / 2);
        ctx.rotate(Math.floor(rr(angles)) * rotationModule);
        ctx.scale(scale, scale);
        ctx.translate(0 - xmul / 2, 0 - ymul / 2);
        drawingFunction(ctx, newOpts);
        ctx.restore();
      }
    }
  }
  ctx.restore();
}

/* ====================================================== *

   sketchlib

   Drawing functions and utilities for working with
   HTML canvas

 * ====================================================== */

var main = {
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
  choose: choose$1,
  coin,
  wobble,
  shuffle
};

export { main as default };

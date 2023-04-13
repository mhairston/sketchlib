import { rr, rb } from './random.js';

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
  }

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
  }

  // instance methods:
  Frame.prototype.rx = function() {
    return this.x + rr(this.width);
  }

  Frame.prototype.ry = function() {
    return this.y + rr(this.height);
  }

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
  }

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

export { createFrame };

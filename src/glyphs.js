import { choose, rb } from './random.js';
import { TAU } from './geo.js';
import { times } from './time.js';
import { processPath } from './path.js';
import { numbers } from './numbers.js';

/**
 * A little random glyph
 *
 * @param {CanvasRenderingContext2D} context
 * @param {Object} options
 * @param {String} options.shape - the name of the glyph to draw
 * @param {Number} options.margin: size of margin as a fraction of width
 * @param {Number} wobble
 * @param {Number} iterations
 * @param {Frame}  options.frame - a rectangle in which to render
 */
export function glyph(context, options) {
  const ctx = context;
  const keys = Object.keys(shapes);
  let { frame, shape, wobble, iterations } = options;
  frame.setPointWobble(wobble);
  if (!Object.keys(shapes).includes(shape)) {
    shape = null;
  }
  const theGlyph = shape ? shapes[shape] : shapes[choose(keys)];
  times(iterations, () => {
    ctx.moveTo(frame.x, frame.y);
    ctx.beginPath();
    theGlyph(ctx, frame);
    ctx.stroke();
  });
  frame.setPointWobble(0);
}

const shapes = {
  /* Numbers 0-9 */
  'num.0': function(ctx, f) {
    ctx.moveTo(f.px(0.2), f.py(0));
    ctx.lineTo(f.px(0.8), f.py(0));
    ctx.lineTo(f.px(1), f.py(0.2));
    ctx.lineTo(f.px(1), f.py(0.8));
    ctx.lineTo(f.px(0.8), f.py(1));
    ctx.lineTo(f.px(0.2), f.py(1));
    ctx.lineTo(f.px(0), f.py(0.8));
    ctx.lineTo(f.px(0), f.py(0.2));
    ctx.lineTo(f.px(0.2), f.py(0));
    ctx.moveTo(f.px(0.8), f.py(0));
    ctx.lineTo(f.px(0.2), f.py(1));
  },
  'num.1': function(ctx, f) {
    ctx.moveTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(1), f.py(1));
    ctx.lineTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(0), f.py(1));
  },
  'num.2': function(ctx, f) {
    ctx.moveTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(1), f.py(0.5));
    ctx.lineTo(f.px(0), f.py(0.5));
    ctx.lineTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(1), f.py(1));
  },
  'num.3': function(ctx, f) {
    ctx.moveTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(1), f.py(1));
    ctx.lineTo(f.px(0), f.py(1));
    ctx.moveTo(f.px(0), f.py(0.5));
    ctx.lineTo(f.px(1), f.py(0.5));
  },
  'num.4': function(ctx, f) {
    ctx.moveTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(1), f.py(1));
    ctx.moveTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(0), f.py(0.5));
    ctx.lineTo(f.px(1), f.py(0.5));
  },
  'num.5': function(ctx, f) {
    const bevel = 0.5 / 3;
    ctx.moveTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(0), f.py(0.5));
    ctx.lineTo(f.px(1 - bevel), f.py(0.5));
    ctx.lineTo(f.px(1), f.py(0.5 + bevel));
    ctx.lineTo(f.px(1), f.py(0.5 + bevel * 2));
    ctx.lineTo(f.px(1 - bevel), f.py(1));
    ctx.lineTo(f.px(0), f.py(1));
  },
  'num.6': function(ctx, f) {
    ctx.moveTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(1), f.py(1));
    ctx.lineTo(f.px(1), f.py(0.5));
    ctx.lineTo(f.px(0), f.py(0.5));
  },
  'num.7': function(ctx, f) {
    ctx.moveTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(1), f.py(1));
  },
  'num.8': function(ctx, f) {
    ctx.moveTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(1), f.py(1));
    ctx.lineTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(0), f.py(0));
    ctx.moveTo(f.px(0), f.py(0.5));
    ctx.lineTo(f.px(1), f.py(0.5));
  },
  'num.9': function(ctx, f) {
    ctx.moveTo(f.px(1), f.py(1));
    ctx.lineTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(0), f.py(0.5));
    ctx.lineTo(f.px(1), f.py(0.5));
  },

  /* Alphabet A-Z */
  'alpha.A': function(ctx, f) {
    const bevel = 0.5 / 3;
    ctx.moveTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(0.5), f.py(0));
    ctx.lineTo(f.px(1), f.py(1));
    ctx.moveTo(f.px(0.125), f.py(0.75));
    ctx.lineTo(f.px(0.875), f.py(0.75));
  },
  'alpha.B': function(ctx, f) {
    const bevel = 0.5 / 3;
    ctx.moveTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(1 - bevel), f.py(0));
    ctx.lineTo(f.px(1), f.py(bevel));
    ctx.lineTo(f.px(1), f.py(bevel * 2));
    ctx.lineTo(f.px(1 - bevel), f.py(0.5));
    ctx.lineTo(f.px(1), f.py(1 - bevel * 2));
    ctx.lineTo(f.px(1 - bevel), f.py(1));
    ctx.lineTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(0), f.py(0));
    ctx.moveTo(f.px(0), f.py(0.5));
    ctx.lineTo(f.px(1 - bevel), f.py(0.5));
  },
  'alpha.C': function(ctx, f) {
    const bevel = 0.5 / 3;
    ctx.moveTo(f.px(1 - bevel), f.py(0));
    ctx.lineTo(f.px(bevel), f.py(0));
    ctx.lineTo(f.px(0), f.py(bevel));
    ctx.lineTo(f.px(0), f.py(1 - bevel));
    ctx.lineTo(f.px(bevel), f.py(1));
    ctx.lineTo(f.px(1 - bevel), f.py(1));
  },
  'alpha.D': function(ctx, f) {
    const bevel = 0.5 / 3;
    ctx.moveTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(1 - bevel), f.py(0));
    ctx.lineTo(f.px(1), f.py(bevel));
    ctx.lineTo(f.px(1), f.py(1 - bevel));
    ctx.lineTo(f.px(1 - bevel), f.py(1));
    ctx.lineTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(0), f.py(0));
  },
  'alpha.E': function(ctx, f) {
    ctx.moveTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(1), f.py(1));
    ctx.moveTo(f.px(0), f.py(0.5));
    ctx.lineTo(f.px(1), f.py(0.5));
  },
  'alpha.F': function(ctx, f) {
    ctx.moveTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(1), f.py(0));
    ctx.moveTo(f.px(0), f.py(0.5));
    ctx.lineTo(f.px(1), f.py(0.5));
  },
  'alpha.G': function(ctx, f) {
    ctx.moveTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(1), f.py(1));
    ctx.lineTo(f.px(1), f.py(0.5));
    ctx.lineTo(f.px(0.5), f.py(0.5));
  },
  'alpha.H': function(ctx, f) {
    ctx.moveTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(0), f.py(1));
    ctx.moveTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(1), f.py(1));
    ctx.moveTo(f.px(0), f.py(0.5));
    ctx.lineTo(f.px(1), f.py(0.5));
  },
  'alpha.I': function(ctx, f) {
    ctx.moveTo(f.px(0.5), f.py(0));
    ctx.lineTo(f.px(0.5), f.py(1));
    ctx.moveTo(f.px(0.3), f.py(0));
    ctx.lineTo(f.px(0.7), f.py(0));
    ctx.moveTo(f.px(0.3), f.py(1));
    ctx.lineTo(f.px(0.7), f.py(1));
  },
  'alpha.J': function(ctx, f) {
    ctx.moveTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(1), f.py(1));
    ctx.lineTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(0), f.py(0.7));
  },
  'alpha.K': function(ctx, f) {
    ctx.moveTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(0), f.py(1));
    ctx.moveTo(f.px(0), f.py(0.5));
    ctx.lineTo(f.px(0.5), f.py(0.5));
    ctx.lineTo(f.px(1), f.py(0));
    ctx.moveTo(f.px(0.5), f.py(0.5));
    ctx.lineTo(f.px(1), f.py(1));
  },
  'alpha.L': function(ctx, f) {
    ctx.moveTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(1), f.py(1));
  },
  'alpha.M': function(ctx, f) {
    ctx.moveTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(0.5), f.py(1));
    ctx.lineTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(1), f.py(1));
  },
  'alpha.N': function(ctx, f) {
    ctx.moveTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(1), f.py(1));
    ctx.lineTo(f.px(1), f.py(0));
  },
  'alpha.O': function(ctx, f) {
    ctx.moveTo(f.px(0.2), f.py(0));
    ctx.lineTo(f.px(0.8), f.py(0));
    ctx.lineTo(f.px(1), f.py(0.2));
    ctx.lineTo(f.px(1), f.py(0.8));
    ctx.lineTo(f.px(0.8), f.py(1));
    ctx.lineTo(f.px(0.2), f.py(1));
    ctx.lineTo(f.px(0), f.py(0.8));
    ctx.lineTo(f.px(0), f.py(0.2));
    ctx.lineTo(f.px(0.2), f.py(0));
  },
  'alpha.P': function(ctx, f) {
    ctx.moveTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(1), f.py(0.5));
    ctx.lineTo(f.px(0), f.py(0.5));
  },
  'alpha.Q': function(ctx, f) {
    ctx.moveTo(f.px(0.2), f.py(0));
    ctx.lineTo(f.px(0.8), f.py(0));
    ctx.lineTo(f.px(1), f.py(0.2));
    ctx.lineTo(f.px(1), f.py(0.7));
    ctx.lineTo(f.px(0.7), f.py(1));
    ctx.lineTo(f.px(0.2), f.py(1));
    ctx.lineTo(f.px(0), f.py(0.8));
    ctx.lineTo(f.px(0), f.py(0.2));
    ctx.lineTo(f.px(0.2), f.py(0));
    ctx.moveTo(f.px(0.6), f.py(0.6));
    ctx.lineTo(f.px(1), f.py(1));
  },
  'alpha.S': function(ctx, f) {
    const bevel = 0.5 / 3;
    ctx.moveTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(bevel), f.py(0));
    ctx.lineTo(f.px(0), f.py(bevel));
    ctx.lineTo(f.px(0), f.py(bevel * 2));
    ctx.lineTo(f.px(bevel), f.py(0.5));
    ctx.lineTo(f.px(1 - bevel), f.py(0.5));
    ctx.lineTo(f.px(1), f.py(0.5 + bevel));
    ctx.lineTo(f.px(1), f.py(0.5 + bevel * 2));
    ctx.lineTo(f.px(1 - bevel), f.py(1));
    ctx.lineTo(f.px(0), f.py(1));
  },
  'alpha.T': function(ctx, f) {
    ctx.moveTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(1), f.py(0));
    ctx.moveTo(f.px(0.5), f.py(0));
    ctx.lineTo(f.px(0.5), f.py(1));
  },
  'alpha.U': function(ctx, f) {
    const bevel = 0.5 / 3;
    ctx.moveTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(0), f.py(1 - bevel));
    ctx.lineTo(f.px(bevel), f.py(1));
    ctx.lineTo(f.px(1 - bevel), f.py(1));
    ctx.lineTo(f.px(1), f.py(1 - bevel));
    ctx.lineTo(f.px(1), f.py(0));
  },
  'alpha.V': function(ctx, f) {
    ctx.moveTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(0.5), f.py(1));
    ctx.lineTo(f.px(1), f.py(0));
  },
  'alpha.W': function(ctx, f) {
    ctx.moveTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(0.5), f.py(0.5));
    ctx.lineTo(f.px(1), f.py(1));
    ctx.lineTo(f.px(1), f.py(0));
  },
  'alpha.X': function(ctx, f) {
    ctx.moveTo(f.x, f.y);
    ctx.lineTo(f.px(1), f.py(1));
    ctx.moveTo(f.px(1), f.y);
    ctx.lineTo(f.px(0), f.py(1));
  },
  'alpha.Y': function(ctx, f) {
    ctx.moveTo(f.px(0.5), f.py(1));
    ctx.lineTo(f.px(0.5), f.py(0.5));
    ctx.lineTo(f.px(0), f.py(0));
    ctx.moveTo(f.px(0.5), f.py(0.5));
    ctx.lineTo(f.px(1), f.py(0));
  },
  'alpha.Z': function(ctx, f) {
    ctx.moveTo(f.x, f.y);
    ctx.lineTo(f.px(1), f.y);
    ctx.lineTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(1), f.py(1));
  },

  /* ASCII Symbols */
  'symbol.plus': function(ctx, f) {
    ctx.moveTo(f.x, f.py(0.5));
    ctx.lineTo(f.px(1), f.py(0.5));
    ctx.moveTo(f.px(0.5), f.y);
    ctx.lineTo(f.px(0.5), f.py(1));
  },
  'symbol.hyphen': function(ctx, f) {
    ctx.moveTo(f.px(0.2), f.py(0.5));
    ctx.lineTo(f.px(0.8), f.py(0.5));
  },
  'symbol.arrow-up': function(ctx, f) {
    ctx.moveTo(f.px(0.5), f.py(1));
    ctx.lineTo(f.px(0.5), f.py(0));
    ctx.moveTo(f.px(0), f.py(0.33));
    ctx.lineTo(f.px(0.5), f.py(0));
    ctx.lineTo(f.px(1), f.py(0.33));
  },
  'symbol.arrow-right': function(ctx, f) {
    ctx.save();
    ctx.translate(f.px(0.5), f.py(0.5));
    ctx.rotate(TAU / 4);
    ctx.translate(0 - f.px(0.5), 0 - f.py(0.5));
    shapes['symbol.arrow-up'](ctx, f);
    ctx.restore();
  },
  'symbol.arrow-down': function(ctx, f) {
    ctx.save();
    ctx.translate(f.px(0.5), f.py(0.5));
    ctx.rotate(TAU / 2);
    ctx.translate(0 - f.px(0.5), 0 - f.py(0.5));
    shapes['symbol.arrow-up'](ctx, f);
    ctx.restore();
  },
  'symbol.arrow-left': function(ctx, f) {
    ctx.save();
    ctx.translate(f.px(0.5), f.py(0.5));
    ctx.rotate(TAU * 0.75);
    ctx.translate(0 - f.px(0.5), 0 - f.py(0.5));
    shapes['symbol.arrow-up'](ctx, f);
    ctx.restore();
  },
  'symbol.ampersand': function(ctx, f) {
    ctx.moveTo(f.px(1), f.py(0.5));
    ctx.lineTo(f.px(0.66), f.py(1));
    ctx.lineTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(0), f.py(0.5));
    ctx.lineTo(f.px(0.6), f.py(0.25));
    ctx.lineTo(f.px(0.6), f.py(0));
    ctx.lineTo(f.px(0.3), f.py(0));
    ctx.lineTo(f.px(0.3), f.py(0.25));
    ctx.lineTo(f.px(1), f.py(1));
  },
  'symbol.ampersand-2': function(ctx, f) {
    ctx.moveTo(f.px(1), f.py(0.5));
    ctx.lineTo(f.px(0.66), f.py(1));
    ctx.lineTo(f.px(0), f.py(0.82));
    ctx.lineTo(f.px(0), f.py(0.5));
    ctx.lineTo(f.px(0.8), f.py(0.25));
    ctx.lineTo(f.px(0.8), f.py(0));
    ctx.lineTo(f.px(0.27), f.py(0));
    ctx.lineTo(f.px(0.2), f.py(0.2));
    ctx.lineTo(f.px(1), f.py(1));
  },
  // from Drift library
  'symbol.ampersand-3': function(ctx, f) {
    ctx.moveTo(f.px(0.65), f.py(0.1));
    ctx.lineTo(f.px(0.55), f.py(0));
    ctx.lineTo(f.px(0.25), f.py(0));
    ctx.lineTo(f.px(0.15), f.py(0.1));
    ctx.lineTo(f.px(0.15), f.py(0.25));
    ctx.lineTo(f.px(0.35), f.py(0.45));
    ctx.lineTo(f.px(0.2), f.py(0.45));
    ctx.lineTo(f.px(0), f.py(0.65));
    ctx.lineTo(f.px(0), f.py(0.85));
    ctx.lineTo(f.px(0.15), f.py(1));
    ctx.lineTo(f.px(0.65), f.py(1));
    ctx.lineTo(f.px(0.85), f.py(0.85));
    ctx.lineTo(f.px(0.85), f.py(0.85));
    ctx.moveTo(f.px(0.85), f.py(1));
    ctx.lineTo(f.px(0.85), f.py(0.45));
    ctx.moveTo(f.px(1), f.py(0.45));
    ctx.lineTo(f.px(0.25), f.py(0.45));
  },

  'symbol.*': function(ctx, f) {
    ctx.moveTo(f.px(0.5), f.py(0));
    ctx.lineTo(f.px(0.5), f.py(1));
    ctx.moveTo(f.px(0), f.py(0.5));
    ctx.lineTo(f.px(1), f.py(0.5));
    ctx.moveTo(f.px(0.15), f.py(0.15));
    ctx.lineTo(f.px(0.85), f.py(0.85));
    ctx.moveTo(f.px(0.85), f.py(0.15));
    ctx.lineTo(f.px(0.15), f.py(0.85));
  },

  'object.sundial': function(ctx, f) {
    ctx.moveTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(1), f.py(1));
    ctx.lineTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(1), f.py(0));
  },
  'object.mountain': function(ctx, f) {
    ctx.moveTo(f.x, f.py(1));
    ctx.lineTo(f.px(0.3), f.py(0));
    ctx.lineTo(f.px(0.5), f.py(0.55));
    ctx.lineTo(f.px(0.667), f.py(0.25));
    ctx.lineTo(f.px(1), f.py(1));
    ctx.lineTo(f.px(0), f.py(1));
  },
  'object.diamond': function(ctx, f) {
    ctx.moveTo(f.px(0.5), f.py(0));
    ctx.lineTo(f.px(1), f.py(0.5));
    ctx.lineTo(f.px(0.5), f.py(1));
    ctx.lineTo(f.px(0), f.py(0.5));
    ctx.lineTo(f.px(0.5), f.py(0));
    ctx.closePath();
  },
  'object.house': function(ctx, f) {
    const wallHeight = 0.5;
    ctx.moveTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(0), f.py(wallHeight));
    ctx.lineTo(f.px(0.5), f.py(0));
    ctx.lineTo(f.px(1), f.py(wallHeight));
    ctx.lineTo(f.px(1), f.py(1));
    ctx.lineTo(f.px(0), f.py(1));
  },

  'object.lander': function(ctx, f) {
    ctx.moveTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(0.5), f.py(0.5));
    ctx.lineTo(f.px(0), f.py(0.5));
    ctx.lineTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(1), f.py(0.5));
    ctx.lineTo(f.px(0.5), f.py(0.5));
    ctx.lineTo(f.px(1), f.py(1));
  },
  'object.television': function(ctx, f) {
    ctx.save();
    ctx.translate(f.px(0.5), f.py(0.5));
    ctx.rotate(TAU / 2);
    ctx.translate(0 - f.px(0.5), 0 - f.py(0.5));
    shapes['object.lander'](ctx, f);
    ctx.restore();
  },
  'object.shield': function(ctx, f) {
    const wallHeight = 0.5;
    ctx.moveTo(f.x, f.y);
    ctx.lineTo(f.x, f.py(wallHeight));
    ctx.lineTo(f.px(0.5), f.py(1));
    ctx.lineTo(f.px(1), f.py(wallHeight));
    ctx.lineTo(f.px(1), f.py(0));
    ctx.lineTo(f.x, f.y);
  },
  'object.lightning': function(ctx, f) {
    ctx.moveTo(f.px(0.33), f.py(1));
    ctx.lineTo(f.px(0.44), f.py(0.59));
    ctx.lineTo(f.px(0.23), f.py(0.59));
    ctx.lineTo(f.px(0.41), f.py(0.26));
    ctx.lineTo(f.px(0.23), f.py(0.26));
    ctx.lineTo(f.px(0.37), f.py(0));
    ctx.lineTo(f.px(0.76), f.py(0));
    ctx.lineTo(f.px(0.56), f.py(0.38));
    ctx.lineTo(f.px(0.77), f.py(0.38));
    ctx.lineTo(f.px(0.33), f.py(1));
  },
  'object.spikes': function(ctx, f) {
    ctx.moveTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(0.25), f.py(0));
    ctx.lineTo(f.px(0.37), f.py(1));
    ctx.lineTo(f.px(0.5), f.py(0));
    ctx.lineTo(f.px(0.62), f.py(1));
    ctx.lineTo(f.px(0.75), f.py(0));
    ctx.lineTo(f.px(1), f.py(1));
    ctx.lineTo(f.px(0), f.py(1));
  },
  'object.blobs': function(ctx, f) {
    drawCircle(ctx, 0.066, 0.066, 0.287);
    drawCircle(ctx, 0.694, 0.238, 0.124);
    drawCircle(ctx, 0.536, 0.536, 0.073);
    drawCircle(ctx, 0.306, 0.686, 0.073);
    drawCircle(ctx, 0.536, 0.536, 0.184);
  },
  'object.square-spiral': function(ctx, f) {
    ctx.moveTo(f.px(1), f.py(0));
    ctx.lineTo(f.px(0), f.py(0));
    ctx.lineTo(f.px(0), f.py(1));
    ctx.lineTo(f.px(1), f.py(1));
    ctx.lineTo(f.px(1), f.py(0.25));
    ctx.lineTo(f.px(0.25), f.py(0.25));
    ctx.lineTo(f.px(0.25), f.py(0.75));
    ctx.lineTo(f.px(0.75), f.py(0.75));
    ctx.lineTo(f.px(0.75), f.py(0.5));
    ctx.lineTo(f.px(0.5), f.py(0.5));
  },
  'object.square-star': function(ctx, f) {
    ctx.moveTo(f.px(0.5), f.py(0));
    ctx.lineTo(f.px(0.3), f.py(0.2));
    ctx.lineTo(f.px(0.25), f.py(0.25));
    ctx.lineTo(f.px(0.2), f.py(0.3));
    ctx.lineTo(f.px(0), f.py(0.5));
    ctx.lineTo(f.px(0.2), f.py(0.7));
    ctx.lineTo(f.px(0.25), f.py(0.75));
    ctx.lineTo(f.px(0.3), f.py(0.8));
  },
  'object.diamond-quarters': function(ctx, f) {
    const newPathData = processPath(
        `M225.944697 1.42108547e-14,
        329.889394 103.944697,
        225.944697 207.889394,
        122 103.944697,
        M103.944697 122,
        207.889394 225.944697,
        103.944697 329.889394,
        1.42108547e-14 225.944697,
        M348.944697 122,
        452.889394 225.944697,
        348.944697 329.889394,
        245 225.944697,
        M225.944697 245,
        329.889394 348.944697,
        225.944697 452.889394,
        122 348.944697`,
        4,
        (val, i, list) => val / 500 + rb(f.getPointWobble()),
    );
  }
};

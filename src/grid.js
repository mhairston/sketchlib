import { createFrame } from './Frame.js';
import { rr, rb, rri, coin } from './random.js';

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

export { grid };

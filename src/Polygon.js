import { TAU } from './geo.js';
import { rr } from './random';

/**
 * @param {number} numSegments - number of sides for the polygon
 * @return {Polygon}
 */
export function createPolygon(numSegments = 8) {
  /**
   * @param {number} [numSegments] - number of sides for the polygon
   */
  class Polygon {
    constructor(numSegments = 6) {
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

    /**
     * Draw the polygon
     *
     * @param {CanvasRenderingContext2D} ctx - rendering context
     * @parm {Object} options
     * @param {} options.x - horizontal location of render
     * @param {} options.y - vertical location of render
     * @param {} options.radius - radius at which to render the polygon
     * @param {} options.jitter - amount to wobble each point in two dimensions
     * @param {} options.angle - amount to rotate the polygon
     */
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

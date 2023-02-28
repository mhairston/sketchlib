# sketchlib

_A small, opinionated, vanilla JS library for working with HTML canvas_

This is a very early version. Expect to see panels askew and wires coming out of the walls.

```javascript
import lib from 'path/to/sketchlib/main.js';

let sketch, ctx;

whenReady(() => {
  sketch = prepareSketch({
    title: 'My Sketch',
    canvasId: 'mycanvas',
    cw: 800,
    ch: 600,
    pal: {
      background: '#404',
      primary: '#fc7',
      secondary: '#8ba'
    }
  });
  ctx = sketch.ctx;
  drawSketch();
});

const { cw, ch, hw, hh, ctx, pal } = sketch;

function drawSketch() {
  lib.background(sketch);
  ctx.fillStyle = pal.primary;
  ctx.beginPath();
  ctx.moveTo(hw, 0);
  ctx.lineTo(cw, hh);
  ctx.lineTo(hw, ch);
  ctx.lineTo(0, hh);
  ctx.closePath();
  ctxfill();
}

```

# sketchlib

_A small, opinionated, vanilla JS library for working with HTML canvas_

This is a very early version. Expect to see panels askew and wires coming out of the walls.

```javascript
import lib from 'path/to/sketchlib/main.js';



let sketch, ctx;

lib.whenReady(() => {  
  sketch = lib.prepareSketch({
    title: 'My Sketch',
    canvasId: 'mycanvas',
    pal: [
      '#404',
      '#fc7',
      '#8ba',
      '#222'
    ]
  });
  ctx = sketch.ctx;
  drawSketch();
});

function drawSketch() {
  const { canvasWidth, canvasHeight, hw, hh, ctx, pal } = sketch;
  
  lib.drawBackground(ctx, pal[0]);
  ctx.fillStyle = pal[1];
  ctx.beginPath();
  ctx.moveTo(hw, 0);
  ctx.lineTo(canvasWidth, hh);
  ctx.lineTo(hw, canvasHeight);
  ctx.lineTo(0, hh);
  ctx.closePath();
  ctx.fill();
}
```

## Contributing

`yarn install`

`yarn build`


## TODO

* Reduce the overall size of the library by including less dependency code.
* Add a demo sketch.
* Update the sample code above.
* Make createSketch private, move contents of initSketch into prepareSketch.
* Add keywords to package.json


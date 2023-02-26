import fl from './main.js';
console.log(fl);
let sk, ctx;

fl.whenReady(() => {
  sk = fl.prepareSketch({
    title: 'sketchlib-test',
    canvasId: 'canvas',
    cw: 576,
    ch: 576,
    pal: {
      background: '#494',
      primary: '#fc7',
      secondary: '#8ba',
      dark: '#000',
      light: '#fff'
    },
    frameRate: 0,
    matchBackground: true
  });
  ctx = sk.ctx;

  // Sketch-specific setup
  //attachEvents();
  fl.background(sk);
  ctx.strokeStyle = 'none';
  //background(sk);
  drawSketch();
});

// Setup
const module = 48;

function drawSketch(timestamp) {
  const { cw, ch, hw, hh, frameRate, pal } = sk;
  const { millis, seconds, frameNum, newFrame, delta } = fl.timing(frameRate, timestamp);
  if (newFrame) {
    ctx.clearRect(0,0,cw,ch);
    ctx.save();
    ctx.strokeStyle = pal.dark;
    ctx.lineWidth = 1;
    ctx.fillStyle = 'none';
    ctx.beginPath();
    fl.drawCircle(ctx, module * 2, module * 2, module * 2);
    fl.drawCircle(ctx, module * 6, module * 2, module * 2);
    fl.drawCircle(ctx, module * 10, module * 2, module * 2);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = pal.light;
    ctx.lineWidth = 1;
    ctx.fillStyle = 'none';
    ctx.beginPath();
    fl.drawCircle(ctx, cw - module * 2, ch - module * 2, module * 2);
    fl.drawCircle(ctx, cw - module * 6, ch - module * 2, module * 2);
    fl.drawCircle(ctx, cw - module * 10, ch - module * 2, module * 2);
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 16;
    ctx.beginPath();
    //ctx.moveTo(300,200);
    ctx.arc(cw - module * 2 - 8, module * 2 + 8, module * 2, 3/4 * fl.TAU, 0);
    ctx.stroke();
    ctx.beginPath();
    fl.drawCircle(ctx, module * 2, module * 2, module);
    ctx.stroke();
    ctx.restore();
  }
  requestAnimationFrame(drawSketch);
}

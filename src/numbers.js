const numbers = {
  'num.44': function(ctx, f) {
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
};

export {
  numbers,
};

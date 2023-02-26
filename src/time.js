/* ====================================================== *

   sketchlib - time

   Timing and cyclic functions

 * ====================================================== */

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
  const delta = timestamp - timing.prevTimestamp
  const frameNum = Math.floor(millis / millisPerFrame);
  const newFrame = (timing.prevFrameNum != frameNum);
  timing.prevTimestamp = timestamp;
  timing.prevFrameNum = frameNum;
  return { millis, seconds, frameNum, newFrame, delta };
}

export { timing };

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
  const delta = timestamp - timing.prevTimestamp
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

export { timing, cycle, times };

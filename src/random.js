/* ====================================================== *

   sketchlib - random

   Randomization functions

 * ====================================================== */

import '../node_modules/chance/dist/chance.min.js';

let _chance = new Chance(0);

// TODO: test this.
function setSeed(seed) {
  _chance = new Chance(seed);
}

function _randomFloat() {
  return _chance.floating({ min: 0, max: 1, fixed: 8 });
}

/**
 * Useful randomization functions.
 */

/**
 * Random in range (float; min is inclusive; max is exclusive)
 * @param {Number} min - lower bound of range; if only one argument, lower
 *                       is 0 and min is used as max.
 * @param {Number} max = upper bound of range, if there are two arguments.
 * @return {Number} - the resulting pseudorandom number.
 */
function rr(min, max) {
  if (typeof max === 'undefined') {
    max = min;
    min = 0;
  }
  return (_randomFloat() * (max - min)) + min;
}

/**
 * Random in range (integer; min & max inclusive)
 * @param {Number} min - lower bound of range; if only one argument, lower
 *                       is 0 and min is used as max.
 * @param {Number} max = upper bound of range, if there are two arguments.
 * @return {Number} - the resulting pseudorandom number.
 */
function rri(min, max) {
  return Math.floor(rr(min, max + 1));
}

/**
 * Same as rr, but quantized such that `slices` is the number of possible
 * values returned.
 *
 * @param {Number} min - lower bound of range; if only one argument, lower
 * is 0 and min is used as max.
 * @param {Number} max - upper bound of range, if there are two arguments.
 * @param {Number} slices - The number of possible values returned, spread
 * evenly across the range.
 * @return {Number} - the resulting pseudorandom number.
 */
function rrq(min, max, slices) {
  const inc = (max - min) / slices;
  return rri(0, slices) * inc;
}

/**
 * Random, bipolar: returns a number between -magnitude and +magnitude,
 * exclusive.
 * @param {Number} magnitude - the spread of possible values above
 * and below zero.
 * @return {Number} - the resulting pseudorandom number.
 */
function rb(magnitude) {
  const n = rr(magnitude);
  if (coin(0.5)) {
    return n;
  } else {
    return 0 - n;
  }
}

/**
 * Random, bipolar integer: returns a number between -magnitude
 * and +magnitude, inclusive.
 * @param {Number} magnitude - the spread of possible values above
 * and below zero.
 * @return {Number} - the resulting pseudorandom number.
 */
function rbi(magnitude) {
  const n = Math.floor(rr() * (magnitude + 1));
  if (coin(0.5)) {
    return n;
  } else {
    return 0 - n;
  }
}

/**
 * Return a random element from an array.
 * @param {Array} collection - the set of items from which to choose.
 * @return {Any} - the chosen item.
 */
function choose(collection) {
  return collection[rri(0, collection.length - 1)];
}

/**
 * Return the result of a virtual coin flip. Even chances by default,
 * or get a biased result by passing in a threshhold != 0.5.
 * @param {Number} threshhold - the spread of possible values above
 * and below zero.
 * @return {Number} - the resulting pseudorandom number.
 */
function coin(threshhold = 0.5) {
  return rr(0, 1) < threshold;
}

/**
 * Random, bipolar: returns a number between -magnitude and +magnitude,
 * exclusive, plus a starting value.
 * @param {Number} number - the center value.
 * @param {Number} magnitude - the spread of possible values above and
 * below the center value.
 * @return {Number} - the resulting pseudorandom number.
 */
function wobble(magnitude, ...number) {
  return number.map((n) => {
    return n + rb(magnitude);
  })
}

/**
 * Fisher-Yates (Knuth) Shuffle
 * http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param {Array} array - the collection to be shuffled.
 * @return {Array} - The shuffled array.
 */
const shuffle = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(_randomFloat() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export {
  setSeed,
  rr,
  rri,
  rrq,
  rb,
  rbi,
  choose,
  coin,
  wobble,
  shuffle
}


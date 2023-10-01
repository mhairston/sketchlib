/* ====================================================== *

  sketchlib - utils

  Misc. utility functions

 * ====================================================== */

/**
 * qs - shortcut wrapper for element.querySelector
 *
 * @param {string} selector - what to look for, in CSS selector syntax
 * @param {HTMLElement} scope - the top element of the DOM subtree to search
 * @return {HTMLElement|null}
 */
function qs(selector, scope) {
  if (!scope) { scope = document }
  return scope.querySelector(selector);
}

/**
 * qs - shortcut wrapper for element.querySelectorAll
 *
 * @param {string} selector - what to look for, in CSS selector syntax
 * @param {HTMLElement} scope - the top element of the DOM subtree to search
 * @return {NodeList}
 */
function qsa(selector, scope) {
  if (!scope) { scope = document }
  return scope.querySelectorAll(selector);
}

/**
 * whenReady - code to run when page & resources completely loaded
 * (just some syntactic sugar for the long form)
 *
 * @param callback - function to run on DOMContentLoaded event.
 */
function whenReady(callback) {
  window.addEventListener('DOMContentLoaded', callback);
}

function sum(list) {
  let sum = 0;
  list.forEach((val) => {
    if (typeof val != 'number') {
      throw(`List to be summed includes non-number '${val}'`);
    } else {
      sum += val;
    }
   });
  return sum;
}

function constrain(val,min,max) {
  if (val < min) {val = min}
  if (val > max) {val = max}
  return val;
}

function constrainWrap(val,min,max) {
  if (val < min) {val = max}
  if (val > max) {val = min}
  return val;
}

function rawTime() {
 var now = new Date();
 return padNum(now.getHours(),2)
  + padNum(now.getMinutes(),2)
  + padNum(now.getSeconds(),2);
}

function padNum(num, places) {
  return ("00000000000" + num).slice(0 - places);
}

function chooseKey(obj) {
  return choose(Object.keys(obj));
}

export {
  qs,
  qsa,
  whenReady,
  sum,
  constrain,
  constrainWrap,
  rawTime,
  padNum,
  chooseKey
};

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

export {
   qs,
   qsa,
   whenReady
};

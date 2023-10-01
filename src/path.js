/*
  Some functions for facilitating easy manipulation of SVG path data.
  processPath takes an SVG path string (`<path d="THE STUFF IN HERE">`)
  and parses out all the numeric values, so they can be processed/
  massaged/tweaked/wobbled by an arbitrary callback function, then
  the path data string is returned with the new values replacing the old.
*/

const TOKEN = '<>';

/**
 * @param {string} svgPathData
 * @return {Array<number>}
 */
function _getValuesFromPathData(svgPathData) {
  const matches = [...svgPathData.matchAll(/[0-9.]+/g)];
  return matches.map((match) => Number(match[0]));
}

/**
 * Replace all the numbers with a token so later
 * we can come back and replace them in order.
 * @param {string} svgPathData
 * @return {string}
 */
function _tokenizePathData(svgPathData) {
  return svgPathData.replaceAll(/[0-9.]+/g, TOKEN);
}

/**
 * @param {Array<number>} values
 * @param {number} [digits]
 * @param {Function} callback - function to process the values.
 * @return {Array<string>}
 */
function _processValues(values, digits = 6, callback) {
  let newValues = values;
  if (callback) {
    newValues = newValues.map((value, index, list) => {
      return callback(value, index, list);
    });
  }
  // Limit precision:
  return newValues.map((value) => Number(value).toPrecision(digits));
}

function _recreatePathData(pathData, newValues) {
  let path = _tokenizePathData(pathData);
  newValues.forEach((value) => {
    path = path.replace(TOKEN, value);
  });
  return path;
}
/**
 * @param {string} origPathData
 * @param {number} digits - max precision of numbers at the end of the process.
 * @param {Function} processingFunction - callback to process the values
 */
export function processPath(origPathData, digits = 6, processingFunction) {
  const values = _getValuesFromPathData(origPathData);
  const newValues = _processValues(values, digits, processingFunction);
  return _recreatePathData(origPathData, newValues);
}

/*
Usage with HTML canvas:

  const origPathData = 'M250.137912,0.1171875 C250.137912,166.783854 333.466918,250.117188 500.124931,250.117188';

  const newPathData = processPath(
    origPathData,
    4,
    (val, i, list) => val / 5 + Math.random() * 10 - 5
  );

  ctx.strokeStyle = '#3c8';
  ctx.lineWidth = 4;
  ctx.stroke(newPathData);
*/



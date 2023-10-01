import tinycolor from 'tinycolor2';

/* ====================================================== *

   sketchlib - color

   A color format for working with canvas sketches

   TODO:

   - A façade for tinycolor2 and a
     wrapper object for that color format
   - An opinionated, standard palette format:
     - HSB; alpha is NOT included in color definitions.
     - Each color has hue, saturation, and a default
       brightness.
     - Specific color roles like background, primary,
       secondary.
     - Each color has a numeric parameter for
       variations in brightness.
     - Can output an object with hex colors for portability

 * ====================================================== */

export const tint = function(col, amt) {
  return tinycolor(col).lighten(amt).toHexString();
};

export const shade = function(col, amt) {
  return tinycolor(col).darken(amt).toHexString();
};

// Fixed names for first four colors of each palette (legacy, optional):
export const PAL = Object.freeze({
  BACKGROUND: 0,
  PRIMARY: 1,
  SECONDARY: 2,
  TERTIARY: 3
});

export const palettes = Object.freeze({
  default: [
    '#404',
    '#909',
    '#070',
    '#6c6',
  ],

  darkSlush: [
    '#000000',
    '#0F6292',
    '#16FF00',
    '#FFED00'
  ],

  warmier: [
    '#400E32',
    '#A61F69',
    '#F2921D',
    '#F2CD5C'
  ],

  brightWinter: [
    '#FC7300',
    '#BFDB38',
    '#1F8A70',
    '#00425A'
  ],

  camoflage: [
    '#5F7161',
    '#6D8B74',
    '#EFEAD8',
    '#D0C9C0'
  ],

  corvetteSummer: [
    '#900C27',
    '#C70039',
    '#F6C667',
    '#F1F8FD'
  ],

  taffy: [
    '#824C96',
    '#433466',
    '#FFAF4F',
    '#ED733F'
  ],

  airSeaBattle: [
    '#92E6E6',
    '#FFF9AF',
    '#D65D7A',
    '#524C84'
  ],

  battleshipCreamsicle: [
    '#85A392',
    '#F5B971',
    '#FDD998',
    '#FFECC7'
  ],

  caffeine: [
    '#F1DEC9',
    '#C8B6A6',
    '#A4907C',
    '#8D7B68'
  ],

  cool2600: [
    '#191825',
    '#865DFF',
    '#E384FF',
    '#FFA3FD'
  ],

  turtle: [
    '#F7F1E5',
    '#E7B10A',
    '#898121',
    '#4C4B16'
  ],

  primarilyBrilliant: [
    '#00235B',
    '#E21818',
    '#FFDD83',
    '#98DFD6'
  ],

  natureAndSherbet: [
    '#7AA874',
    '#F7DB6A',
    '#EBB02D',
    '#D864A9'
  ],

  level99: [
    '#F67280',
    '#C06C84',
    '#6C5B7B',
    '#355C7D'
  ],

  armyJeep: [
    '#61764B',
    '#9BA17B',
    '#CFB997',
    '#CFB997'
  ],

  safetyThird: [
    '#F97B22',
    '#FEE8B0',
    '#9CA777',
    '#FAD6A5'
  ],

  coolNeutral: [
    '#A6D0DD',
    '#FF6969',
    '#FFD3B0',
    '#FFF9DE'
  ],

  altCrayola: [
    '#89375F',
    '#CE5959',
    '#BACDDB',
    '#F3E8FF'
  ],

  icicle: [
    '#453C67',
    '#6D67E4',
    '#46C2CB',
    '#F2F7A1'
  ]
});


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

export const palettes = {
  default: {
    background: '#404',
    primary: '#909',
    secondary: '#070',
    tertiary: '#6c6',
  },

  darkSlush: {
    background: '#000000',
    primary: '#0F6292',
    secondary: '#16FF00',
    tertiary: '#FFED00'
  },

  warmier: {
    background: '#400E32',
    primary: '#A61F69',
    secondary: '#F2921D',
    tertiary: '#F2CD5C'
  },

  brightWinter: {
    background: '#FC7300',
    primary: '#BFDB38',
    secondary: '#1F8A70',
    tertiary: '#00425A'
  },

  camoflage: {
    background: '#5F7161',
    primary: '#6D8B74',
    secondary: '#EFEAD8',
    tertiary: '#D0C9C0'
  },

  corvetteSummer: {
    background: '#900C27',
    primary: '#C70039',
    secondary: '#F6C667',
    tertiary: '#F1F8FD'
  },

  taffy: {
    background: '#824C96',
    primary: '#433466',
    secondary: '#FFAF4F',
    tertiary: '#ED733F'
  },

  airSeaBattle: {
    background: '#92E6E6',
    primary: '#FFF9AF',
    secondary: '#D65D7A',
    tertiary: '#524C84'
  },

  battleshipCreamsicle: {
    background: '#85A392',
    primary: '#F5B971',
    secondary: '#FDD998',
    tertiary: '#FFECC7'
  },

  caffeine: {
    background: '#F1DEC9',
    primary: '#C8B6A6',
    secondary: '#A4907C',
    tertiary: '#8D7B68'
  },

  cool2600: {
    background: '#191825',
    primary: '#865DFF',
    secondary: '#E384FF',
    tertiary: '#FFA3FD'
  },

  turtle: {
    background: '#F7F1E5',
    primary: '#E7B10A',
    secondary: '#898121',
    tertiary: '#4C4B16'
  },

  primarilyBrilliant: {
    background: '#00235B',
    primary: '#E21818',
    secondary: '#FFDD83',
    tertiary: '#98DFD6'
  },

  natureAndSherbet: {
    background: '#7AA874',
    primary: '#F7DB6A',
    secondary: '#EBB02D',
    tertiary: '#D864A9'
  },

  level99: {
    background: '#F67280',
    primary: '#C06C84',
    secondary: '#6C5B7B',
    tertiary: '#355C7D'
  },

  armyJeep: {
    background: '#61764B',
    primary: '#9BA17B',
    secondary: '#CFB997',
    tertiary: '#CFB997'
  },

  safetyThird: {
    background: '#F97B22',
    primary: '#FEE8B0',
    secondary: '#9CA777',
    tertiary: '#FAD6A5'
  },

  coolNeutral: {
    background: '#A6D0DD',
    primary: '#FF6969',
    secondary: '#FFD3B0',
    tertiary: '#FFF9DE'
  },

  altCrayola: {
    background: '#89375F',
    primary: '#CE5959',
    secondary: '#BACDDB',
    tertiary: '#F3E8FF'
  },

  icicle: {
    background: '#453C67',
    primary: '#6D67E4',
    secondary: '#46C2CB',
    tertiary: '#F2F7A1'
  }
};


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
  }
};

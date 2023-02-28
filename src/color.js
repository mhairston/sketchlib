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
    tertiary: '#',
  }
};

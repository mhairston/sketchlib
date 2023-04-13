const createPalette = (colors) => {

  class Palette {
    /**
     * @param {Array<String>} colorArray - hex colors to create the palette from.
     */
    constructor(colorArray) {
      const colors = normalizeColorStrings(colorArray);
      this.colors = colors;
    }

    static normalizeColorStrings(colors) {
      colors.forEach((col) => {
        if (!col.startsWith('#')) {
          col = '#' + col;
        }
      });
      return colors;
    }

    get primary() {
      return this.colors[0];
    }

    get secondary() {
      if (this.colors.length > 1) {
        return this.color[1];
      }
    }

    get tertiary() {
      if (this.colors.length > 2) {
        return this.color[2];
      }
    }
  }

  return new Palette(colors);
}

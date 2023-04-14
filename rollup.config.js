import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/sketchlib.js',
    format: 'esm'
  },
  plugins: [
    resolve(),
    commonjs()
  ]
};

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { readFileSync } from "fs";
const pkg = JSON.parse(readFileSync('package.json', {encoding: 'utf8'}));

export default {
  input: 'src/main.js',
  output: [
    {
      file: `dist/sketchlib-${pkg.version}.js`,
      format: 'esm'
    },
    {
      file: `dist/sketchlib-${pkg.version}.min.js`,
      format: 'esm',
      plugins: [terser()]
    },
    {
      file: `dist/sketchlib.min.js`,
      format: 'esm',
      plugins: [terser()]
    }
  ],
  plugins: [
    resolve(),
    commonjs()
  ]
};

import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'demo/src/main.js',
  plugins: [
    nodeResolve(),
    babel(babelrc())
  ],
  dest: 'demo/dist/main.js',
  format: 'iife',
  sourceMap: true
};

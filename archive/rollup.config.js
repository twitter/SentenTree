import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/main.js',
  plugins: [
    nodeResolve(),
    babel(babelrc())
  ],
  targets: [
    {
      dest: 'dist/SentenTree.js',
      format: 'umd',
      moduleName: 'SentenTree',
      sourceMap: true
    },
    {
      dest: 'dist/SentenTree-es.js',
      format: 'es'
    }
  ]
}
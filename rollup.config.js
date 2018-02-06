// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  input: './dist/planck-geography.module.js',
  sourcemap: true,
  plugins: [
    nodeResolve({ browser: true }),
    commonjs(),
    babel({
      presets: [
        ['es2015', { modules: false }],
        'es2016',
        'es2017',
        'stage-3',
      ],
      plugins: [
        'external-helpers',
      ],
      babelrc: false,
    }),
  ],
  external: [
    'd3-array',
    'd3-geo',
    'd3-geo-projection',
    'three',
  ],
  globals: {
    'd3-array': 'd3',
    'd3-geo': 'd3',
    'd3-geo-projection': 'd3',
    'three': 'THREE',
  },
  output: [
    {
      format: 'umd',
      extend: true,
      name: 'Planck',
      file: './dist/planck-geography.js',
    },
  ],
}

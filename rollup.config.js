// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

import pkg from './package.json'

const globals = {
  'd3-array': 'd3',
  'd3-geo': 'd3',
  'd3-geo-projection': 'd3',
  'three': 'THREE'
}

export default {
  input: './src/main.js',
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      presets: [
        ['es2015', { modules: false }],
        'es2016',
        'es2017',
        'stage-3',
        'stage-2'
      ],
      plugins: [
        'external-helpers'
      ],
      babelrc: false
    })
  ],
  external: Object.keys(globals),
  output: [
    {
      globals,
      format: 'umd',
      exports: 'named',
      extend: true,
      name: 'Planck',
      file: pkg.main,
      sourcemap: true
    },
    {
      globals,
      format: 'es',
      file: pkg.module,
      sourcemap: true
    }
  ]
}

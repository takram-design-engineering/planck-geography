// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: [
    path.resolve(__dirname, 'test/unit.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist/test/unit'),
    filename: 'webpack.js'
  },
  devtool: 'source-map',
  externals: {
    'chai': 'chai',
    'mocha': 'mocha',
    'source-map-support/register': 'null',
    '@takram/planck-core': 'Planck',
    'd3-array': 'd3',
    'd3-geo': 'd3',
    'd3-geo-projection': 'd3',
    'three': 'THREE'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'es2015',
                'es2016',
                'es2017',
                'stage-3',
                'stage-2'
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.browser': JSON.stringify(true),
      'BUNDLER': JSON.stringify('webpack')
    })
  ]
}

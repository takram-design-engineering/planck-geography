// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* global Planck */
/* eslint-env worker */

self.importScripts(
  '/node_modules/babel-polyfill/dist/polyfill.js',
  '/node_modules/three/build/three.js',
  '/dist/planck-geography.js',
)

const { GeographyWorkerInstance } = Planck

GeographyWorkerInstance.register()

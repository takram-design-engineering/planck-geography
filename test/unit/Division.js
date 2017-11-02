//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

import 'source-map-support/register'

import * as Three from 'three'
import chai from 'chai'

import { Environment } from '@takram/planck-core'
import { JapanGeography, Projection } from '../..'

const { expect } = chai

// eslint-disable-next-line func-names
describe('Division', function () {
  this.timeout(300000)
  if (Environment.type === 'node') {
    return
  }

  const geography = new JapanGeography()

  const projection = new Projection({
    name: 'TransverseMercator',
    origin: [137.2, 37],
    rotates: [true, true],
  })

  let division

  before(async () => {
    await geography.init('/dist/data/japan.json')
    division = geography.division('prefecture', 1)
  })

  describe('#bounds', () => {
    it('resolves an array', async () => {
      const result = await division.bounds(projection)
      expect(result).a('array')
    })
  })

  describe('#area', () => {
    it('resolves a number', async () => {
      const result = await division.area(projection)
      expect(result).a('number')
    })
  })

  describe('#centroid', () => {
    it('resolves an array', async () => {
      const result = await division.centroid(projection)
      expect(result).a('array')
    })
  })

  describe('#poleOfInaccessibility', () => {
    it('resolves an array', async () => {
      const result = await division.poleOfInaccessibility(projection)
      expect(result).a('array')
    })
  })

  describe('#shapeGeometry', () => {
    it('resolves buffer geometry', async () => {
      const geometry = await division.shapeGeometry(projection)
      expect(geometry).instanceof(Three.BufferGeometry)
    })
  })

  describe('#outlineGeometry', () => {
    it('resolves buffer geometry', async () => {
      const geometry = await division.outlineGeometry(projection)
      expect(geometry).instanceof(Three.BufferGeometry)
    })
  })

  describe('#borderGeometry', () => {
    it('resolves buffer geometry', async () => {
      const geometry = await division.borderGeometry(projection)
      expect(geometry).instanceof(Three.BufferGeometry)
    })
  })

  describe('#subdivisionGeometry', () => {
    it('resolves buffer geometry', async () => {
      const geometry = await division.subdivisionGeometry(projection)
      expect(geometry).instanceof(Three.BufferGeometry)
    })
  })
})

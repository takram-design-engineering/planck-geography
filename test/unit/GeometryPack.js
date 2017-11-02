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

import { GeometryPack } from '../..'

const { expect } = chai

describe('GeometryPack', () => {
  it('', () => {
    const geometry = new Three.BufferGeometry()
      .copy(new Three.BoxBufferGeometry())
    const packed = GeometryPack.packBufferGeometry(geometry)
    const unpacked = GeometryPack.unpackBufferGeometry(...packed)
    if (unpacked.index) {
      expect(unpacked.index.array).deep.equal(geometry.index.array)
    }
    Object.entries(unpacked.attributes).forEach(entry => {
      const [key, attribute] = entry
      expect(attribute.array).deep.equal(geometry.attributes[key].array)
    })
  })

  it('', () => {
    const geometries = [
      new Three.BufferGeometry()
        .copy(new Three.BoxBufferGeometry()),
      new Three.BufferGeometry()
        .copy(new Three.SphereBufferGeometry()),
      new Three.BufferGeometry()
        .copy(new Three.CylinderBufferGeometry()),
    ]
    const packed = GeometryPack.packBufferGeometries(geometries)
    const unpacked = GeometryPack.unpackBufferGeometries(...packed)
    expect(unpacked).a('array')
    expect(unpacked.length).equal(geometries.length)
    unpacked.forEach((unpacked, index) => {
      const geometry = geometries[index]
      if (unpacked.index) {
        expect(unpacked.index.array).deep.equal(geometry.index.array)
      }
      Object.entries(unpacked.attributes).forEach(entry => {
        const [key, attribute] = entry
        expect(attribute.array).deep.equal(geometry.attributes[key].array)
      })
    })
  })

  it('', () => {
    const geometries = {
      box: new Three.BufferGeometry()
        .copy(new Three.BoxBufferGeometry()),
      sphere: new Three.BufferGeometry()
        .copy(new Three.SphereBufferGeometry()),
      cylinder: new Three.BufferGeometry()
        .copy(new Three.CylinderBufferGeometry()),
    }
    const packed = GeometryPack.packBufferGeometries(geometries)
    const unpacked = GeometryPack.unpackBufferGeometries(...packed)
    Object.entries(unpacked).forEach(entry => {
      const [key, unpacked] = entry
      const geometry = geometries[key]
      if (unpacked.index) {
        expect(unpacked.index.array).deep.equal(geometry.index.array)
      }
      Object.entries(unpacked.attributes).forEach(entry => {
        const [key, attribute] = entry
        expect(attribute.array).deep.equal(geometry.attributes[key].array)
      })
    })
  })
})

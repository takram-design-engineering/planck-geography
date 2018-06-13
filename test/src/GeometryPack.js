// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

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
        .copy(new Three.CylinderBufferGeometry())
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
        .copy(new Three.CylinderBufferGeometry())
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

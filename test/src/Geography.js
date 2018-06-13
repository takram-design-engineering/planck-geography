// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import 'source-map-support/register'

import * as Three from 'three'
import chai from 'chai'

import { Global } from '@takram/planck-core'
import { JapanGeography, Projection } from '../..'

const { expect } = chai

describe('Geography', function () {
  this.timeout(300000)
  if (Global.isNode) {
    return
  }

  const geography = new JapanGeography()
  const projection = new Projection({
    name: 'TransverseMercator',
    origin: [137.2, 37],
    rotates: [true, true]
  })

  before(async () => {
    await geography.init('/dist/data/japan.json')
  })

  describe('#bounds', () => {
    it('resolves an array', async () => {
      const result = await geography.bounds(projection)
      expect(result).a('array')
    })
  })

  describe('#area', () => {
    it('resolves a number', async () => {
      const result = await geography.area(projection)
      expect(result).a('number')
    })
  })

  describe('#centroid', () => {
    it('resolves an array', async () => {
      const result = await geography.centroid(projection)
      expect(result).a('array')
    })
  })

  describe('#poleOfInaccessibility', () => {
    it('resolves an array', async () => {
      const result = await geography.poleOfInaccessibility(projection)
      expect(result).a('array')
    })
  })

  describe('#shapeGeometry', () => {
    it('resolves buffer geometry', async () => {
      const geometry = await geography.shapeGeometry(projection)
      expect(geometry).instanceof(Three.BufferGeometry)
    })
  })

  describe('#outlineGeometry', () => {
    it('resolves buffer geometry', async () => {
      const geometry = await geography.outlineGeometry(projection)
      expect(geometry).instanceof(Three.BufferGeometry)
    })
  })

  describe('#subdivisionGeometry', () => {
    it('resolves buffer geometry', async () => {
      const geometry = await geography.subdivisionGeometry(projection)
      expect(geometry).instanceof(Three.BufferGeometry)
    })
  })
})

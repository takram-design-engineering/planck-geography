// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import 'source-map-support/register'

import * as Three from 'three'
import chai from 'chai'

import { Global } from '@takram/planck-core'
import { JapanGeography, Projection } from '../..'

const { expect } = chai

// eslint-disable-next-line func-names
describe('Division', function () {
  this.timeout(300000)
  if (Global.isNode) {
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

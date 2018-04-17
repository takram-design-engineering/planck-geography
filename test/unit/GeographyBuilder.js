// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import 'source-map-support/register'

import chai from 'chai'

import { FilePath } from '@takram/planck-core'
import { GeographyBuilder, Projection } from '../..'

const { expect } = chai

describe('GeographyBuilder', function () {
  this.timeout(300000)

  const projection = new Projection({
    name: 'TransverseMercator',
    origin: [137.2, 37],
    rotates: [true, true]
  })

  const builder = new GeographyBuilder(['prefecture', 'municipality'])

  before(async () => {
    await builder.init(FilePath.resolve('dist/data/japan.topojson'))
  })

  describe('#bounds', () => {
    it('returns projected result', () => {
      const result = builder.bounds({
        level: 'prefecture',
        code: 1,
        projection
      })
      expect(result).a('array')
      expect(result.length).equal(2)
      expect(result[0]).a('array')
      expect(result[1]).a('array')
      expect(result[0].length).equal(2)
      expect(result[1].length).equal(2)
      expect(result[0][0]).a('number')
      expect(result[0][1]).a('number')
      expect(result[1][0]).a('number')
      expect(result[1][1]).a('number')
    })

    it('returns unprojected result', () => {
      const result = builder.bounds({
        level: 'prefecture',
        code: 1
      })
      expect(result).a('array')
      expect(result.length).equal(2)
      expect(result[0]).a('array')
      expect(result[1]).a('array')
      expect(result[0].length).equal(2)
      expect(result[1].length).equal(2)
      expect(result[0][0]).a('number')
      expect(result[0][1]).a('number')
      expect(result[1][0]).a('number')
      expect(result[1][1]).a('number')
    })
  })

  describe('#area', () => {
    it('returns projected result', () => {
      const result = builder.area({
        level: 'prefecture',
        code: 1,
        projection
      })
      expect(result).a('number')
    })

    it('returns unprojected result', () => {
      const result = builder.area({
        level: 'prefecture',
        code: 1
      })
      expect(result).a('number')
    })
  })

  describe('#centroid', () => {
    it('returns projected result', () => {
      const result = builder.centroid({
        level: 'prefecture',
        code: 1,
        projection
      })
      expect(result).a('array')
      expect(result.length).equal(2)
      expect(result[0]).a('number')
      expect(result[1]).a('number')
    })

    it('returns unprojected result', () => {
      const result = builder.centroid({
        level: 'prefecture',
        code: 1
      })
      expect(result).a('array')
      expect(result.length).equal(2)
      expect(result[0]).a('number')
      expect(result[1]).a('number')
    })
  })

  describe('#poleOfInaccessibility', () => {
    it('returns projected result', () => {
      const result = builder.poleOfInaccessibility({
        level: 'prefecture',
        code: 1,
        projection
      })
      expect(result).a('array')
      expect(result.length).equal(2)
      expect(result[0]).a('number')
      expect(result[1]).a('number')
    })

    it('returns unprojected result', () => {
      const result = builder.poleOfInaccessibility({
        level: 'prefecture',
        code: 1
      })
      expect(result).a('array')
      expect(result.length).equal(2)
      expect(result[0]).a('number')
      expect(result[1]).a('number')
    })
  })

  // describe('#geographyShapes', () => {
  //   it('', () => {
  //     const result = builder.geographyShapes({
  //       projection,
  //     })
  //   })
  // })
  //
  // describe('#geographyShapeGeometry', () => {
  //   it('', () => {
  //     const result = builder.geographyShapeGeometry({
  //       projection,
  //     })
  //   })
  // })
  //
  // describe('#geographyOutlineGeometry', () => {
  //   it('', () => {
  //     const result = builder.geographyOutlineGeometry({
  //       projection,
  //     })
  //   })
  // })
  //
  // describe('#divisionShapes', () => {
  //   it('', () => {
  //     const result = builder.divisionShapes({
  //       level: 'prefecture',
  //       code: 1,
  //       projection,
  //     })
  //   })
  // })
  //
  // describe('#divisionShapeGeometry', () => {
  //   it('', () => {
  //     const result = builder.divisionShapeGeometry({
  //       level: 'prefecture',
  //       code: 1,
  //       projection,
  //     })
  //   })
  // })
  //
  // describe('#divisionOutlineGeometry', () => {
  //   it('', () => {
  //     const result = builder.divisionOutlineGeometry({
  //       level: 'prefecture',
  //       code: 1,
  //       projection,
  //     })
  //   })
  // })
  //
  // describe('#divisionBorderGeometry', () => {
  //   it('', () => {
  //     const result = builder.divisionBorderGeometry({
  //       level: 'prefecture',
  //       code: 1,
  //       projection,
  //     })
  //   })
  // })
  //
  // describe('#divisionSubdivisionGeometry', () => {
  //   it('', () => {
  //     const result = builder.divisionSubdivisionGeometry({
  //       level: 'prefecture',
  //       code: 1,
  //       projection,
  //     })
  //   })
  // })
})

// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* eslint-disable no-unused-expressions */

import 'source-map-support/register'

import chai from 'chai'

import { Projection } from '../..'

const { expect } = chai

chai.use(({ Assertion }, utils) => {
  const delta = Number.EPSILON * 2
  Assertion.addMethod('almost', function almost (expected, message) {
    const actual = utils.flag(this, 'object')
    if (!Array.isArray(actual) && !Array.isArray(expected)) {
      return this.closeTo(expected, delta, message)
    }
    actual.forEach((actual, i) => {
      new Assertion(actual).almost(expected[i], delta, message)
    })
    return this
  })
})

describe('Projection', () => {
  it('initializes', () => {
    const projection = new Projection()
    expect(projection.name).equal('Equirectangular')
    expect(projection.scale).equal(10000)
    expect(projection.origin).deep.equal([0, 0])
    expect(projection.rotates).deep.equal([true, true])
  })

  it('is equality comparable', () => {
    [
      new Projection({ name: 'TransverseMercator' }),
      new Projection({ scale: 1 }),
      new Projection({ origin: [1, 1] }),
      new Projection({ rotates: [false, false] })
    ].forEach(projection => {
      expect(projection.equals(new Projection())).false
    })
    expect(new Projection().equals(new Projection())).true
  })

  it('is convertible to and constructible from json', () => {
    [
      new Projection(),
      new Projection({ name: 'PeirceQuincuncial' }),
      new Projection({ scale: 1 }),
      new Projection({ origin: [1, 1] }),
      new Projection({ rotates: [false, false] })
    ].forEach(projection => {
      expect(projection.equals(new Projection(projection.toJSON()))).true
    })
  })

  describe('#project', () => {
    it('transforms coordinates using projection', () => {
      const projection = new Projection()
      expect(projection.project([90 / Math.PI, 0])).almost([5000, 0])
      expect(projection.project([-90 / Math.PI, 0])).almost([-5000, 0])
      expect(projection.project([0, 45 / Math.PI])).almost([0, -2500])
      expect(projection.project([0, -45 / Math.PI])).almost([0, 2500])
    })

    it('throws error if any of components of the result is NaN', () => {
      const projection = new Projection()
      expect(() => {
        projection.project([])
      }).throws(Error)
      expect(() => {
        projection.project([undefined, 0])
      }).throws(Error)
      expect(() => {
        projection.project([0, undefined])
      }).throws(Error)
    })
  })

  describe('#unproject', () => {
    it('unprojects coordinates', () => {
      const projection = new Projection()
      expect(projection.unproject([5000, 0])).almost([90 / Math.PI, 0])
      expect(projection.unproject([-5000, 0])).almost([-90 / Math.PI, 0])
      expect(projection.unproject([0, -2500])).almost([0, 45 / Math.PI])
      expect(projection.unproject([0, 2500])).almost([0, -45 / Math.PI])
    })

    it('throws error if any of components of the result is NaN', () => {
      const projection = new Projection()
      expect(() => {
        projection.unproject([])
      }).throws(Error)
      expect(() => {
        projection.unproject([undefined, 0])
      }).throws(Error)
      expect(() => {
        projection.unproject([0, undefined])
      }).throws(Error)
    })
  })

  describe('#projector', () => {
    it('returns newly-created d3 projection', () => {
      const projection = new Projection()
      const { projector } = projection
      expect(projector).not.equal(projection.projection)
      expect(projector([90 / Math.PI, 0])).almost([5000, 0])
      expect(projector([-90 / Math.PI, 0])).almost([-5000, 0])
      expect(projector([0, 45 / Math.PI])).almost([0, -2500])
      expect(projector([0, -45 / Math.PI])).almost([0, 2500])
      expect(projector.invert([5000, 0])).almost([90 / Math.PI, 0])
      expect(projector.invert([-5000, 0])).almost([-90 / Math.PI, 0])
      expect(projector.invert([0, -2500])).almost([0, 45 / Math.PI])
      expect(projector.invert([0, 2500])).almost([0, -45 / Math.PI])
    })
  })

  describe('#path', () => {
    it('returns newly-created d3 path generator', () => {
      const projection = new Projection()
      const generator = projection.path
      expect(generator).not.equal(projection.path)
      expect(projection.path({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [90 / Math.PI, 45 / Math.PI],
            [90 / Math.PI, -45 / Math.PI]
          ]
        }
      })).equal('M5000,-2500L5000,2500')
    })
  })
})

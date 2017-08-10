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

import chai from 'chai'

import { Projection } from '../..'

const expect = chai.expect

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
      new Projection({ rotates: [false, false] }),
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
      new Projection({ rotates: [false, false] }),
    ].forEach(projection => {
      expect(projection.equals(new Projection(projection.toJSON()))).true
    })
  })

  describe('#project', () => {
    it('transforms coordinates using projection', () => {
      const projection = new Projection()
      expect(projection.project([90 / Math.PI, 0])).deep.equal([5000, 0])
      expect(projection.project([-90 / Math.PI, 0])).deep.equal([-5000, 0])
      expect(projection.project([0, 45 / Math.PI])).deep.equal([0, -2500])
      expect(projection.project([0, -45 / Math.PI])).deep.equal([0, 2500])
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
      expect(projection.unproject([5000, 0])).deep.equal([90 / Math.PI, 0])
      expect(projection.unproject([-5000, 0])).deep.equal([-90 / Math.PI, 0])
      expect(projection.unproject([0, -2500])).deep.equal([0, 45 / Math.PI])
      expect(projection.unproject([0, 2500])).deep.equal([0, -45 / Math.PI])
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
      const projector = projection.projector
      expect(projector).not.equal(projection.projection)
      expect(projector([90 / Math.PI, 0])).deep.equal([5000, 0])
      expect(projector([-90 / Math.PI, 0])).deep.equal([-5000, 0])
      expect(projector([0, 45 / Math.PI])).deep.equal([0, -2500])
      expect(projector([0, -45 / Math.PI])).deep.equal([0, 2500])
      expect(projector.invert([5000, 0])).deep.equal([90 / Math.PI, 0])
      expect(projector.invert([-5000, 0])).deep.equal([-90 / Math.PI, 0])
      expect(projector.invert([0, -2500])).deep.equal([0, 45 / Math.PI])
      expect(projector.invert([0, 2500])).deep.equal([0, -45 / Math.PI])
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
            [90 / Math.PI, -45 / Math.PI],
          ],
        },
      })).equal('M5000,-2500L5000,2500')
    })
  })
})

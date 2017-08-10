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

import * as d3Array from 'd3-array'
import * as d3Geo from 'd3-geo'
import * as d3GeoProjection from 'd3-geo-projection'
import suncalc from 'suncalc'

import Hash from '@takram/planck-core/src/Hash'
import Namespace from '@takram/planck-core/src/Namespace'

const d3 = Object.assign({}, d3Array, d3Geo, d3GeoProjection)

export const internal = Namespace('Projection')

export default class Projection {
  constructor({
    name = 'Equirectangular',
    scale = 10000,
    origin = [0, 0],
    rotates = [true, true],
  } = {}) {
    const scope = internal(this)
    scope.name = name
    scope.scale = +scale || 1
    if (Array.isArray(origin)) {
      scope.origin = [+origin[0] || 0, +origin[1] || 0]
    } else {
      scope.origin = [+origin || 0, +origin || 0]
    }
    if (Array.isArray(rotates)) {
      scope.rotates = [!!rotates[0], !!rotates[1]]
    } else {
      scope.rotates = [!!rotates, !!rotates]
    }
    scope.projector = this.projector
  }

  project(point, flip = false) {
    const scope = internal(this)
    const result = scope.projector(point)
    if (Number.isNaN(result[0]) || Number.isNaN(result[1])) {
      throw new Error(`Could not project point [${point}]`)
    }
    if (flip) {
      // Avoid negating zero
      result[1] = result[1] || 0
    }
    return result
  }

  unproject(point, flip = false) {
    const scope = internal(this)
    const result = scope.projector.invert([
      point[0],
      // Avoid negating zero
      flip ? (-point[1] || 0) : point[1],
    ])
    if (Number.isNaN(result[0]) || Number.isNaN(result[1])) {
      throw new Error(`Could not unproject point [${point}]`)
    }
    return result
  }

  get projector() {
    const projection = d3[`geo${this.name}`]
    if (projection === undefined) {
      throw new Error(`Could not find projection for name "${this.name}"`)
    }
    const projector = projection()
    if (typeof projector.rotate === 'function') {
      const rotation = [0, 0, 0]
      if (this.rotates[0]) {
        rotation[0] = -this.origin[0]
      }
      if (this.rotates[1]) {
        rotation[1] = -this.origin[1]
      }
      projector.rotate(rotation)
    }
    projector.translate([0, 0])
    projector.scale(this.scale)
    const offset = projector(this.origin)
    if (Array.isArray(offset)) {
      projector.translate([-offset[0], -offset[1]])
    }
    return projector
  }

  get path() {
    const scope = internal(this)
    return d3.geoPath().projection(scope.projector)
  }

  sun(time) {
    const origin = this.origin
    return suncalc.getPosition(time, origin[1], origin[0])
  }

  moon(time) {
    const origin = this.origin
    return suncalc.getMoonPosition(time, origin[1], origin[0])
  }

  get name() {
    const scope = internal(this)
    return scope.name
  }

  get scale() {
    const scope = internal(this)
    return scope.scale
  }

  get origin() {
    const scope = internal(this)
    return [...scope.origin]
  }

  get rotates() {
    const scope = internal(this)
    return [...scope.rotates]
  }

  get hash() {
    const scope = internal(this)
    if (scope.hash === undefined) {
      scope.hash = Hash(this.toJSON())
    }
    return scope.hash
  }

  equals(other) {
    return (
      this.name === other.name &&
      this.scale === other.scale &&
      this.origin[0] === other.origin[0] &&
      this.origin[1] === other.origin[1] &&
      this.rotates[0] === other.rotates[0] &&
      this.rotates[1] === other.rotates[1])
  }

  toJSON() {
    return {
      name: this.name,
      scale: this.scale,
      origin: this.origin,
      rotates: this.rotates,
    }
  }
}

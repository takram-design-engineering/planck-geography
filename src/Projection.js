// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import * as d3 from 'd3'
import * as d3GeoProjection from 'd3-geo-projection'
import suncalc from 'suncalc'

import { Hash, Namespace } from '@takram/planck-core'

export const internal = Namespace('Projection')

export default class Projection {
  constructor ({
    name = 'Equirectangular',
    scale = 10000,
    origin = [0, 0],
    rotates = [true, true]
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

  project (point, flip = false) {
    const result = internal(this).projector(point)
    if (Number.isNaN(result[0]) || Number.isNaN(result[1])) {
      throw new Error(`Could not project point [${point}]`)
    }
    if (flip) {
      // Avoid negating zero
      result[1] = -result[1] || 0
    }
    return result
  }

  unproject (point, flip = false) {
    const result = internal(this).projector.invert([
      point[0],
      // Avoid negating zero
      flip ? (-point[1] || 0) : point[1]
    ])
    if (Number.isNaN(result[0]) || Number.isNaN(result[1])) {
      throw new Error(`Could not unproject point [${point}]`)
    }
    return result
  }

  get projector () {
    const key = `geo${this.name}`
    const projection = d3[key] || d3GeoProjection[key]
    if (projection == null) {
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

  get path () {
    return d3.geoPath().projection(internal(this).projector)
  }

  sun (time) {
    const { origin } = this
    return suncalc.getPosition(time, origin[1], origin[0])
  }

  moon (time) {
    const { origin } = this
    return suncalc.getMoonPosition(time, origin[1], origin[0])
  }

  get name () {
    return internal(this).name
  }

  get scale () {
    return internal(this).scale
  }

  get origin () {
    return [...internal(this).origin]
  }

  get rotates () {
    return [...internal(this).rotates]
  }

  get hash () {
    const scope = internal(this)
    if (scope.hash == null) {
      scope.hash = Hash(this.toJSON())
    }
    return scope.hash
  }

  equals (other) {
    return (
      this.name === other.name &&
      this.scale === other.scale &&
      this.origin[0] === other.origin[0] &&
      this.origin[1] === other.origin[1] &&
      this.rotates[0] === other.rotates[0] &&
      this.rotates[1] === other.rotates[1])
  }

  toJSON () {
    return {
      name: this.name,
      scale: this.scale,
      origin: this.origin,
      rotates: this.rotates
    }
  }
}

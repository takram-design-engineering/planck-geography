// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import Namespace from '@takram/planck-core/src/Namespace'

export const internal = Namespace('Division')

export default class Division {
  constructor(level, code) {
    const scope = internal(this)
    scope.level = level
    scope.code = code
  }

  get code() {
    const scope = internal(this)
    return scope.code
  }

  get level() {
    const scope = internal(this)
    return scope.level
  }

  get geography() {
    return this.level.geography
  }

  get data() {
    const scope = internal(this)
    if (scope.data === undefined) {
      scope.data = this.level.data.find(data => data.code === this.code)
    }
    return scope.data
  }

  get name() {
    return this.data.name
  }

  get localizedName() {
    return this.data.localizedName || this.data.name
  }

  get neighbors() {
    const scope = internal(this)
    if (scope.neighbors === undefined) {
      scope.neighbors = this.data.neighbors.map(code => {
        return this.constructor.for(code)
      })
    }
    return [...scope.neighbors]
  }

  async properties(projection) {
    const properties = await this.level.properties(projection)
    const { code } = this
    const result = properties[code]
    if (result === undefined) {
      const level = this.level.identifier
      throw new Error(`Could not find properties for ${level} ${code}`)
    }
    return result
  }

  async bounds(projection) {
    return (await this.properties(projection)).bounds
  }

  async area(projection) {
    return (await this.properties(projection)).area
  }

  async centroid(projection) {
    return (await this.properties(projection)).centroid
  }

  async poleOfInaccessibility(projection) {
    return (await this.properties(projection)).poleOfInaccessibility
  }

  async geometry(name, projection) {
    const geometries = await this.level.geometries(name, projection)
    const { code } = this
    const result = geometries[code]
    if (result === undefined) {
      const level = this.level.identifier
      throw new Error(`Could not find ${name} geometry for ${level} ${code}`)
    }
    return result
  }

  async shapeGeometry(projection) {
    return this.geometry('shapes', projection)
  }

  async outlineGeometry(projection) {
    return this.geometry('outlines', projection)
  }

  async borderGeometry(projection) {
    return this.geometry('borders', projection)
  }

  async subdivisionGeometry(projection) {
    return this.geometry('subdivisions', projection)
  }

  belongsTo(division) {
    if (division.level !== this.level.superlevel) {
      return false
    }
    return division.code === this.level.coder.super(this.code)
  }

  get superdivision() {
    const scope = internal(this)
    if (scope.superdivision === undefined) {
      const { superlevel } = this.level
      if (!superlevel) {
        scope.superdivision = null
      } else {
        scope.superdivision = superlevel.divisions.find(division => {
          return this.belongsTo(division)
        })
      }
    }
    return scope.superdivision
  }

  get subdivisions() {
    const scope = internal(this)
    if (scope.subdivisions === undefined) {
      const { sublevel } = this.level
      if (!sublevel) {
        scope.subdivisions = []
      } else {
        scope.subdivisions = sublevel.divisions.filter(division => {
          return division.belongsTo(this)
        })
      }
    }
    return [...scope.subdivisions]
  }
}

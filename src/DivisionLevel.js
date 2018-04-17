// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import FilePath from '@takram/planck-core/src/FilePath'
import Namespace from '@takram/planck-core/src/Namespace'
import Request from '@takram/planck-core/src/Request'

import GeometryPack from './GeometryPack'
import Division from './Division'

export const internal = Namespace('DivisionLevel')

export default class DivisionLevel {
  constructor (identifier, coder) {
    const scope = internal(this)
    scope.identifier = identifier
    scope.coder = coder
    scope.divisions = {}
    scope.properties = {}
    scope.geometries = {}
  }

  init (geography) {
    const scope = internal(this)
    scope.geography = geography
  }

  get identifier () {
    const scope = internal(this)
    return scope.identifier
  }

  get coder () {
    const scope = internal(this)
    return scope.coder
  }

  get geography () {
    const scope = internal(this)
    return scope.geography
  }

  get data () {
    const scope = internal(this)
    if (scope.data === undefined) {
      scope.data = this.geography.data[this.identifier]
    }
    return scope.data
  }

  division (code) {
    const scope = internal(this)
    let division = scope.divisions[code]
    if (division === undefined) {
      division = new Division(this, code)
      scope.divisions[code] = division
    }
    return division
  }

  get divisions () {
    const scope = internal(this)
    scope.divisions = {
      ...scope.divisions,
      ...this.data.reduce((divisions, data) => {
        const { code } = data
        if (scope.divisions[code] === undefined) {
          return { ...divisions, [code]: new Division(this, code) }
        }
        return divisions
      }, {})
    }
    return Object.values(scope.divisions)
  }

  get codes () {
    const scope = internal(this)
    if (scope.codes === undefined) {
      scope.codes = this.data.map(data => data.code)
    }
    return [...scope.codes]
  }

  get superlevel () {
    const scope = internal(this)
    if (scope.superlevel === undefined) {
      const { levels } = this.geography
      const index = levels.indexOf(this)
      if (index === -1) {
        throw new Error('Could not find levels for geography')
      }
      scope.superlevel = levels[index - 1] || null
    }
    return scope.superlevel
  }

  get sublevel () {
    const scope = internal(this)
    if (scope.sublevel === undefined) {
      const { levels } = this.geography
      const index = levels.indexOf(this)
      if (index === -1) {
        throw new Error('Could not find levels for geography')
      }
      scope.sublevel = levels[index + 1] || null
    }
    return scope.sublevel
  }

  async properties (projection) {
    const scope = internal(this)
    const hash = projection ? projection.hash : null
    if (scope.properties[hash] === undefined) {
      const path = FilePath.join(
        FilePath.dirname(this.geography.path),
        hash || '',
        this.geography.identifier,
        this.identifier,
        'properties.json'
      )
      scope.properties[hash] = Request.json(path, { local: true })
    }
    return scope.properties[hash]
  }

  async geometries (name, projection) {
    const scope = internal(this)
    const hash = projection ? projection.hash : null
    let geometries = scope.geometries[hash]
    if (geometries === undefined) {
      geometries = {}
      scope.geometries[hash] = geometries
    }
    if (geometries[name] === undefined) {
      geometries[name] = this.requestGeometries(name, projection)
    }
    return geometries[name]
  }

  async requestGeometries (name, projection) {
    const path = FilePath.join(
      FilePath.dirname(this.geography.path),
      projection.hash,
      this.geography.identifier,
      this.identifier,
      name
    )
    let data
    let buffer
    try {
      [data, buffer] = await Promise.all([
        Request.json(`${path}.json`),
        Request.buffer(`${path}.buffer`)
      ])
    } catch (error) {
      // TODO: Process in worker
      throw error
    }
    return GeometryPack.unpackBufferGeometries(data, buffer)
  }
}

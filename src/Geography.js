// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import { FilePath, Namespace, Request } from '@takram/planck-core'

import GeometryPack from './GeometryPack'

export const internal = Namespace('Geography')

export default class Geography {
  constructor (identifier, levels = []) {
    const scope = internal(this)
    scope.identifier = identifier
    scope.levels = levels
    scope.properties = {}
    scope.geometries = {}
  }

  async init (path, data) {
    const scope = internal(this)
    scope.path = path
    if (data) {
      scope.data = await Promise.resolve(data)
    } else {
      scope.data = await Request.json(path, { local: true })
    }
    await Promise.all(this.levels.map(level => {
      return level.init(this)
    }))
  }

  get identifier () {
    return internal(this).identifier
  }

  get levels () {
    return [...internal(this).levels]
  }

  get path () {
    return internal(this).path
  }

  get data () {
    const scope = internal(this)
    if (!scope.data) {
      throw new Error(`Data is missing for ${this.identifier}`)
    }
    return scope.data
  }

  division (identifier, code) {
    const level = this.levels.find(level => level.identifier === identifier)
    if (level == null) {
      throw new Error(`Could not find ${identifier} level in geography`)
    }
    return level.division(code)
  }

  divisions (identifier) {
    const level = this.levels.find(level => level.identifier === identifier)
    if (level == null) {
      throw new Error(`Could not find ${identifier} level in geography`)
    }
    return level.divisions
  }

  codes (identifier) {
    const level = this.levels.find(level => level.identifier === identifier)
    if (level == null) {
      throw new Error(`Could not find ${identifier} level in geography`)
    }
    return level.codes
  }

  async properties (projection) {
    const scope = internal(this)
    const hash = projection ? projection.hash : null
    if (scope.properties[hash] == null) {
      const path = FilePath.join(
        FilePath.dirname(this.path),
        hash || '',
        this.identifier,
        'properties.json'
      )
      scope.properties[hash] = Request.json(path, { local: true })
    }
    return scope.properties[hash]
  }

  async bounds (projection) {
    return (await this.properties(projection)).bounds
  }

  async area (projection) {
    return (await this.properties(projection)).area
  }

  async centroid (projection) {
    return (await this.properties(projection)).centroid
  }

  async poleOfInaccessibility (projection) {
    return (await this.properties(projection)).poleOfInaccessibility
  }

  async geometry (name, projection) {
    const scope = internal(this)
    const hash = projection ? projection.hash : null
    let geometries = scope.geometries[hash]
    if (geometries == null) {
      geometries = {}
      scope.geometries[hash] = geometries
    }
    if (geometries[name] == null) {
      geometries[name] = this.requestGeometry(name, projection)
    }
    return geometries[name]
  }

  async requestGeometry (name, projection) {
    const path = FilePath.join(
      FilePath.dirname(this.path),
      projection.hash,
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
    return GeometryPack.unpackBufferGeometry(data, buffer)
  }

  async shapeGeometry (projection) {
    return this.geometry('shape', projection)
  }

  async outlineGeometry (projection) {
    return this.geometry('outline', projection)
  }

  async subdivisionGeometry (projection) {
    return this.geometry('subdivision', projection)
  }
}

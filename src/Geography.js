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

import FilePath from '@takram/planck-core/src/FilePath'
import Namespace from '@takram/planck-core/src/Namespace'
import Request from '@takram/planck-core/src/Request'

import GeometryPack from './GeometryPack'

export const internal = Namespace('Geography')

export default class Geography {
  constructor(identifier, levels = []) {
    const scope = internal(this)
    scope.identifier = identifier
    scope.levels = levels
    scope.properties = {}
    scope.geometries = {}
  }

  async init(path, data) {
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

  get identifier() {
    const scope = internal(this)
    return scope.identifier
  }

  get levels() {
    const scope = internal(this)
    return [...scope.levels]
  }

  get path() {
    const scope = internal(this)
    return scope.path
  }

  get data() {
    const scope = internal(this)
    if (!scope.data) {
      throw new Error(`Data is missing for ${this.identifier}`)
    }
    return scope.data
  }

  division(identifier, code) {
    const level = this.levels.find(level => level.identifier === identifier)
    if (level === undefined) {
      throw new Error(`Could not find ${identifier} level in geography`)
    }
    return level.division(code)
  }

  divisions(identifier) {
    const level = this.levels.find(level => level.identifier === identifier)
    if (level === undefined) {
      throw new Error(`Could not find ${identifier} level in geography`)
    }
    return level.divisions
  }

  codes(identifier) {
    const level = this.levels.find(level => level.identifier === identifier)
    if (level === undefined) {
      throw new Error(`Could not find ${identifier} level in geography`)
    }
    return level.codes
  }

  async properties(projection) {
    const scope = internal(this)
    const hash = projection ? projection.hash : null
    if (scope.properties[hash] === undefined) {
      const path = FilePath.join(
        FilePath.dirname(this.path),
        hash || '',
        this.identifier,
        'properties.json',
      )
      scope.properties[hash] = Request.json(path, { local: true })
    }
    return scope.properties[hash]
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
    const scope = internal(this)
    const hash = projection ? projection.hash : null
    let geometries = scope.geometries[hash]
    if (geometries === undefined) {
      geometries = {}
      scope.geometries[hash] = geometries
    }
    if (geometries[name] === undefined) {
      geometries[name] = await this.requestGeometry(name, projection)
    }
    return geometries[name]
  }

  async requestGeometry(name, projection) {
    const path = FilePath.join(
      FilePath.dirname(this.path),
      projection.hash,
      this.identifier,
      name,
    )
    let data
    let buffer
    try {
      [data, buffer] = await Promise.all([
        Request.json(`${path}.json`),
        Request.buffer(`${path}.buffer`),
      ])
    } catch (error) {
      // TODO: Process in worker
      throw error
    }
    return GeometryPack.unpackBufferGeometry(data, buffer)
  }

  async shapeGeometry(projection) {
    return this.geometry('shape', projection)
  }

  async outlineGeometry(projection) {
    return this.geometry('outline', projection)
  }
}

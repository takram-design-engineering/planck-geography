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

import * as Three from 'three'

import Environment from '@takram/planck-core/src/Environment'

function packBufferGeometry(geometry, byteOffset = 0) {
  const data = geometry.toJSON()
  const scope = data.data || {}
  const buffers = []
  let byteLength = byteOffset
  if (scope.index) {
    const array = geometry.index.array
    const buffer = array.buffer
    buffers.push([buffer, byteLength])
    scope.index.array = [byteLength, array.length]
    byteLength += buffer.byteLength
  }
  if (scope.attributes) {
    Object.entries(scope.attributes).forEach(entry => {
      const [key, attribute] = entry
      const array = geometry.attributes[key].array
      const buffer = array.buffer
      buffers.push([buffer, byteLength])
      attribute.array = [byteLength, array.length]
      byteLength += buffer.byteLength
    })
  }
  data.data = scope
  return [data, buffers, byteLength]
}

function packBufferGeometries(geometries) {
  if (Array.isArray(geometries)) {
    return geometries.reduce((result, geometry) => {
      const [data, buffers, byteOffset] = result
      const [
        eachData,
        eachBuffers,
        eachByteOffset,
      ] = packBufferGeometry(geometry, byteOffset)
      return [
        data.concat(eachData),
        buffers.concat(eachBuffers),
        eachByteOffset,
      ]
    }, [[], [], 0])
  }
  return Object.entries(geometries).reduce((result, entry) => {
    const [key, geometry] = entry
    const [data, buffers, byteOffset] = result
    const [
      eachData,
      eachBuffers,
      eachByteOffset,
    ] = packBufferGeometry(geometry, byteOffset)
    return [
      Object.assign(data, { [key]: eachData }),
      buffers.concat(eachBuffers),
      eachByteOffset,
    ]
  }, [{}, [], 0])
}

function unpackBufferGeometry(data, buffer) {
  const copy = { ...data, data: { ...data.data } }
  if (copy.data.index) {
    const { type } = copy.data.index
    const view = new Environment.self[type](buffer, ...copy.data.index.array)
    copy.data.index = { ...copy.data.index, array: view }
  }
  if (copy.data.attributes) {
    const entries = Object.entries(copy.data.attributes)
    copy.data.attributes = entries.reduce((attributes, entry) => {
      const [name, attribute] = entry
      const { type } = attribute
      const view = new Environment.self[type](buffer, ...attribute.array)
      return { ...attributes, [name]: { ...attribute, array: view } }
    }, {})
  }
  return new Three.BufferGeometryLoader().parse(copy)
}

function mergeBuffers(buffers, byteLength) {
  const buffer = new ArrayBuffer(byteLength)
  const view = new Uint8Array(buffer)
  buffers.forEach(entry => {
    const [buffer, byteOffset] = entry
    view.set(new Uint8Array(buffer), byteOffset)
  })
  return buffer
}

export default {
  packBufferGeometry(geometry) {
    const [data, buffers, byteLength] = packBufferGeometry(geometry)
    const buffer = mergeBuffers(buffers, byteLength)
    return [data, buffer]
  },

  packBufferGeometries(geometries) {
    const [data, buffers, byteLength] = packBufferGeometries(geometries)
    const buffer = mergeBuffers(buffers, byteLength)
    return [data, buffer]
  },

  unpackBufferGeometry(data, buffer) {
    return unpackBufferGeometry(data, buffer)
  },

  unpackBufferGeometries(data, buffer) {
    if (Array.isArray(data)) {
      return data.map(data => {
        return unpackBufferGeometry(data, buffer)
      })
    }
    return Object.entries(data).reduce((result, entry) => {
      const [key, data] = entry
      return Object.assign(result, {
        [key]: unpackBufferGeometry(data, buffer),
      })
    }, {})
  },
}

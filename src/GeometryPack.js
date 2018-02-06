// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import * as Three from 'three'

import Global from '@takram/planck-core/src/Global'

function packBufferGeometry(geometry, byteOffset = 0) {
  const data = geometry.toJSON()
  const scope = data.data || {}
  const buffers = []
  let byteLength = byteOffset
  if (scope.index) {
    const { array } = geometry.index
    const { buffer } = array
    buffers.push([buffer, byteLength])
    scope.index.array = [byteLength, array.length]
    byteLength += buffer.byteLength
  }
  if (scope.attributes) {
    const names = Object.keys(scope.attributes)
    for (let i = 0; i < names.length; ++i) {
      const name = names[i]
      const { array } = geometry.attributes[name]
      const { buffer } = array
      buffers.push([buffer, byteLength])
      scope.attributes[name].array = [byteLength, array.length]
      byteLength += buffer.byteLength
    }
  }
  data.data = scope
  return [data, buffers, byteLength]
}

function packBufferGeometries(geometries) {
  if (Array.isArray(geometries)) {
    const data = []
    const buffers = []
    let byteOffset = 0
    for (let i = 0; i < geometries.length; ++i) {
      const [
        eachData,
        eachBuffers,
        eachByteOffset,
      ] = packBufferGeometry(geometries[i], byteOffset)
      data.push(eachData)
      buffers.push(...eachBuffers)
      byteOffset = eachByteOffset
    }
    return [data, buffers, byteOffset]
  }
  const data = {}
  const buffers = []
  let byteOffset = 0
  const names = Object.keys(geometries)
  for (let i = 0; i < names.length; ++i) {
    const name = names[i]
    const [
      eachData,
      eachBuffers,
      eachByteOffset,
    ] = packBufferGeometry(geometries[name], byteOffset)
    data[name] = eachData
    buffers.push(...eachBuffers)
    byteOffset = eachByteOffset
  }
  return [data, buffers, byteOffset]
}

function unpackBufferGeometry(data, buffer) {
  const copy = { ...data, data: { ...data.data } }
  if (copy.data.index) {
    const { type } = copy.data.index
    const view = new Global.scope[type](buffer, ...copy.data.index.array)
    copy.data.index = { ...copy.data.index, array: view }
  }
  if (copy.data.attributes) {
    const attributes = {}
    const names = Object.keys(copy.data.attributes)
    for (let i = 0; i < names.length; ++i) {
      const name = names[i]
      const attribute = copy.data.attributes[name]
      const { type } = attribute
      const view = new Global.scope[type](buffer, ...attribute.array)
      attributes[name] = { ...attribute, array: view }
    }
    copy.data.attributes = attributes
  }
  return new Three.BufferGeometryLoader().parse(copy)
}

function mergeBuffers(buffers, byteLength) {
  const buffer = new ArrayBuffer(byteLength)
  const view = new Uint8Array(buffer)
  for (let i = 0; i < buffers.length; ++i) {
    const [buffer, byteOffset] = buffers[i]
    view.set(new Uint8Array(buffer), byteOffset)
  }
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
      const result = []
      for (let index = 0; index < data.length; ++index) {
        result.push(unpackBufferGeometry(data, buffer))
      }
      return result
    }
    const result = {}
    const names = Object.keys(data)
    for (let i = 0; i < names.length; ++i) {
      const name = names[i]
      result[name] = unpackBufferGeometry(data[name], buffer)
    }
    return result
  },
}

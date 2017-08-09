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

/* eslint-disable no-console */

import * as d3Array from 'd3-array'
import * as d3Geo from 'd3-geo'
import * as Three from 'three'
import earcut from 'earcut'
import polylabel from 'polylabel'

import Array from '@takram/planck-core/src/Array'
import External from '@takram/planck-core/src/External'
import FilePath from '@takram/planck-core/src/FilePath'
import Namespace from '@takram/planck-core/src/Namespace'
import Request from '@takram/planck-core/src/Request'

import Path from './Path'

const d3 = Object.assign({}, d3Array, d3Geo)
const topojson = External.optional('topojson')

function codePropertyKeyForLevel(level) {
  return `${level}Code`
}

function includesGeometryObject(level, code, geometryObject) {
  const key = codePropertyKeyForLevel(level)
  return geometryObject.properties[key] === code
}

function triangulateShape(contour, holes) {
  let vertices = contour.reduce((values, point) => {
    return values.concat(point.x, point.y)
  }, [])

  let holeIndex = contour.length
  const holeIndices = []
  holes.forEach((hole, index) => {
    holeIndices.push(holeIndex)
    holeIndex += hole.length
    vertices = vertices.concat(hole.reduce((values, point) => {
      return values.concat(point.x, point.y)
    }, []))
  })

  const result = earcut(vertices, holeIndices, 2)
  const groups = []
  for (let i = 0; i < result.length; i += 3) {
    groups.push(result.slice(i, i + 3))
  }
  return groups
}

function convertPolygonsToShapes(polygons, projection, errors = []) {
  return polygons.coordinates.reduce((shapes, polygon, index) => {
    const svg = projection.path({
      type: 'Polygon',
      coordinates: polygon,
    })
    if (!svg) {
      errors.push(index)
      return shapes
    }
    const path = Path.parse(svg)
    let paths
    if (path instanceof Three.Shape) {
      paths = path.curves
    } else {
      paths = [path]
    }
    const shape = new Three.Shape()
    paths.forEach(path => {
      const winding = Path.winding(path.curves)
      if (winding === 'ccw') {
        shape.add(path)
      } else if (winding === 'cw') {
        shape.holes.push(path)
      }
    })

    // Expand composite shape without holes into multiple shapes
    if (shape.holes.length === 0) {
      return shapes.concat(shape.curves.map(curve => {
        const shape = new Three.Shape()
        shape.add(curve)
        return shape
      }))
    }
    return shapes.concat(shape)
  }, [])
}

function convertShapesToMeshGeometry(shapes) {
  // WORKAROUND: Use earcut triangulator instead of built-in one.
  // It's slower and less accurate but able to handle duplicated points
  // and holes better.
  const builtinTriangulateShape = Three.ShapeUtils.triangulateShape
  Three.ShapeUtils.triangulateShape = triangulateShape
  const geometry = new Three.BufferGeometry()
    .fromGeometry(shapes.reduce((geometry, shape) => {
      geometry.merge(new Three.ShapeGeometry(shape))
      return geometry
    }, new Three.Geometry()))
  Three.ShapeUtils.triangulateShape = builtinTriangulateShape
  geometry.computeBoundingSphere()
  return geometry
}

function convertLinesToGeometry(lines) {
  const vertices = new Float32Array(lines.length * 6)
  lines.forEach((line, index) => {
    const index6 = index * 6
    vertices[index6 + 0] = line.v1.x
    vertices[index6 + 1] = line.v1.y
    vertices[index6 + 3] = line.v2.x
    vertices[index6 + 4] = line.v2.y
  })
  const geometry = new Three.BufferGeometry()
  const positions = new Three.BufferAttribute(vertices, 3)
  geometry.addAttribute('position', positions)
  return geometry
}

function convertShapesToLineSegmentGeometry(shapes) {
  const lines = shapes.reduce((lines, shape) => {
    return lines.concat(
      shape.curves.reduce((lines, path) => {
        return lines.concat(path.curves)
      }, []),
      shape.holes.reduce((lines, hole) => {
        return lines.concat(hole.curves)
      }, []),
    )
  }, [])
  return convertLinesToGeometry(lines)
}

export const internal = Namespace('GeographyBuilder')

export default class GeographyBuilder {
  constructor(levels) {
    const scope = internal(this)
    scope.levels = [...levels]
  }

  async init(data) {
    const scope = internal(this)
    if (typeof data === 'string') {
      const path = FilePath.resolve(data)
      scope.data = await Request.json(path, { local: true })
    } else {
      scope.data = await Promise.resolve(data)
    }
  }

  get levels() {
    const scope = internal(this)
    return [...scope.levels]
  }

  get data() {
    const scope = internal(this)
    return scope.data
  }

  property(name, { level, code, projection }) {
    let geometries = this.data.objects.geography.geometries
    if (level) {
      geometries = geometries.filter(geometry => {
        return includesGeometryObject(level, code, geometry)
      })
    }
    const merged = topojson.merge(this.data, geometries)
    if (projection) {
      return projection.path[name](merged)
    }
    return d3[`geo${name.charAt().toUpperCase()}${name.slice(1)}`](merged)
  }

  bounds(options) {
    return this.property('bounds', options)
  }

  area(options) {
    return this.property('area', options)
  }

  centroid(options) {
    return this.property('centroid', options)
  }

  poleOfInaccessibility({ level, code, projection, precision = 0.01 }) {
    let geometries = this.data.objects.geography.geometries
    if (level) {
      geometries = geometries.filter(geometry => {
        return includesGeometryObject(level, code, geometry)
      })
    }
    geometries = topojson.merge(this.data, geometries)
    if (projection) {
      const polygon = Array.max(geometries.coordinates, polygon => {
        return projection.path.area({
          type: 'Polygon',
          coordinates: polygon,
        })
      })
      if (!polygon) {
        console.warn('Unable to derive pole of inaccessibility:', level, code)
        return null
      }
      const svg = projection.path({
        type: 'Polygon',
        coordinates: polygon,
      })
      if (!svg) {
        console.warn('Unable to derive pole of inaccessibility:', level, code)
        return null
      }
      const path = Path.parse(svg)
      if (!path) {
        console.warn('Unable to derive pole of inaccessibility:', level, code)
        return null
      }
      let paths
      if (path instanceof Three.Shape) {
        paths = path.curves
      } else {
        paths = [path]
      }
      const projected = paths.map(path => {
        return path.curves.map(curve => [curve.v1.x, curve.v1.y])
      })
      return polylabel(projected, Math.sqrt(projection.path.area({
        type: 'Polygon',
        coordinates: polygon,
      })) * precision)
    }
    const polygon = Array.max(geometries.coordinates, polygon => {
      return d3.geoArea({
        type: 'Polygon',
        coordinates: polygon,
      })
    })
    if (!polygon) {
      console.warn('Unable to derive pole of inaccessibility:', level, code)
      return null
    }
    return polylabel(polygon, Math.sqrt(d3.geoArea({
      type: 'Polygon',
      coordinates: polygon,
    })) * precision)
  }

  shapes({ geometries, projection }, errors = []) {
    const feature = topojson.merge(this.data, geometries)
    return convertPolygonsToShapes(feature, projection, errors)
  }

  shapeGeometry({ geometries, projection }, errors = []) {
    const feature = topojson.merge(this.data, geometries)
    const shapes = convertPolygonsToShapes(feature, projection, errors)
    return convertShapesToMeshGeometry(shapes)
  }

  outlineGeometry({ geometries, projection }, errors = []) {
    const feature = topojson.merge(this.data, geometries)
    const shapes = convertPolygonsToShapes(feature, projection, errors)
    return convertShapesToLineSegmentGeometry(shapes)
  }

  borderGeometry({ object, filter, projection }, errors = []) {
    const feature = topojson.mesh(this.data, object, filter)
    const svg = projection.path(feature)
    if (!svg) {
      errors.push(0)
      return convertLinesToGeometry([])
    }
    const path = Path.parse(svg)
    let lines
    if (path instanceof Three.Shape) {
      lines = path.curves.reduce((lines, path) => {
        return lines.concat(path.curves)
      }, [])
    } else {
      lines = path.curves
    }
    return convertLinesToGeometry(lines)
  }

  geographyShapes({ projection }) {
    const geometries = this.data.objects.geography.geometries
    const errors = []
    const result = this.shapes({
      projection,
      geometries,
    }, errors)
    if (errors.length !== 0) {
      console.warn(`Unable to project ${errors.length} polygons`)
    }
    return result
  }

  geographyShapeGeometry({ projection }) {
    const geometries = this.data.objects.geography.geometries
    const errors = []
    const result = this.shapeGeometry({
      projection,
      geometries,
    }, errors)
    if (errors.length !== 0) {
      console.warn(`Unable to project ${errors.length} polygons`)
    }
    return result
  }

  geographyOutlineGeometry({ projection }) {
    const geometries = this.data.objects.geography.geometries
    const errors = []
    const result = this.outlineGeometry({
      projection,
      geometries,
    }, errors)
    if (errors.length !== 0) {
      console.warn(`Unable to project ${errors.length} polygons`)
    }
    return result
  }

  divisionShapes({ level, code, projection }) {
    const geometries = this.data.objects.geography.geometries
    const errors = []
    const result = this.shapes({
      projection,
      geometries: geometries.filter(geometry => {
        return includesGeometryObject(level, code, geometry)
      }),
    }, errors)
    if (errors.length !== 0) {
      console.warn(`${errors.length} polygons failed to project`)
    }
    return result
  }

  divisionShapeGeometry({ level, code, projection }) {
    const geometries = this.data.objects.geography.geometries
    const errors = []
    const result = this.shapeGeometry({
      projection,
      geometries: geometries.filter(geometry => {
        return includesGeometryObject(level, code, geometry)
      }),
    }, errors)
    if (errors.length !== 0) {
      console.warn(`Unable to project ${errors.length} polygons:`, level, code)
    }
    return result
  }

  divisionOutlineGeometry({ level, code, projection }) {
    const geometries = this.data.objects.geography.geometries
    const errors = []
    const result = this.outlineGeometry({
      projection,
      geometries: geometries.filter(geometry => {
        return includesGeometryObject(level, code, geometry)
      }),
    }, errors)
    if (errors.length !== 0) {
      console.warn(`Unable to project ${errors.length} polygons:`, level, code)
    }
    return result
  }

  divisionBorderGeometry({ level, code, projection }) {
    const superlevel = (() => {
      const index = this.levels.indexOf(level)
      if (index === -1) {
        throw new Error(`Could not find level "${level}" in geography`)
      } else if (index > 0) {
        return this.levels[index - 1]
      }
      return undefined
    })()

    // Reduce geometries to find neighbors if superlevel exists
    let geometries = this.data.objects.geography.geometries
    if (superlevel) {
      geometries = geometries.filter(geometry => {
        return includesGeometryObject(superlevel, code, geometry)
      })
    }

    // Remember the indices of geometries in this division
    const indices = geometries
      .filter(geometry => {
        return includesGeometryObject(superlevel, code, geometry)
      })
      .map(geometry => {
        return geometries.indexOf(geometry)
      })

    // Construct object with adjacent geometries
    const neighbors = topojson.neighbors(geometries)
    const object = {
      type: 'GeometryCollection',
      geometries: geometries.filter((geometry, index) => {
        return indices.includes(index) || indices.some(other => {
          return neighbors[other].includes(index)
        })
      }),
    }

    const errors = []
    const key = codePropertyKeyForLevel(level)
    const result = this.borderGeometry({
      projection,
      object,
      filter: (a, b) => {
        if (a.properties[key] === code) {
          return a.properties[key] < b.properties[key]
        }
        return a.properties[key] > b.properties[key]
      },
    }, errors)
    if (errors.length !== 0) {
      // Topology mesh can fail if a division doesn't have any adjacent
      // division. Just return an empty geometry without logging warning.
      return new Three.BufferGeometry()
    }
    return result
  }

  divisionSubdivisionGeometry({ level, code, projection }) {
    const geometries = this.data.objects.geography.geometries
    const errors = []
    const object = {
      type: 'GeometryCollection',
      geometries: geometries.filter(geometry => {
        return includesGeometryObject(level, code, geometry)
      }),
    }
    const result = this.borderGeometry({
      projection,
      object,
      filter: (a, b) => a !== b,
    }, errors)
    if (errors.length !== 0) {
      // Topology mesh can fail if a division doesn't have any adjacent
      // division. Just return an empty geometry without logging warning.
      return new Three.BufferGeometry()
    }
    return result
  }
}
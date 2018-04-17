// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import * as Three from 'three'
import parser from 'svg-path-parser'

import ImplementationError from '@takram/planck-core/src/ImplementationError'

function cross (a, b) {
  return a.x * b.y - a.y * b.x
}

function crossings (a, b, point) {
  if ((a.x < point.x && point.x <= b.x) ||
      (b.x < point.x && point.x <= a.x)) {
    let { y } = a
    if (a.x !== b.x) {
      y = a.y + (b.y - a.y) * (point.x - a.x) / (b.x - a.x)
    }
    if (point.y > y) {
      return 1
    }
  }
  return 0
}

export default {
  winding (curves) {
    if (curves.length < 3) {
      return undefined
    }
    const front = curves[0]
    const back = curves[curves.length - 1]
    let sum = cross(back.v2, front.v1)
    sum = curves.reduce((sum, curve) => {
      return sum + cross(curve.v1, curve.v2)
    }, sum)
    if (sum < 0) {
      return 'ccw'
    } else if (sum > 0) {
      return 'cw'
    }
    return undefined
  },

  contains (curves, point) {
    if (curves.length < 3) {
      return false
    }
    const front = curves[0]
    const back = curves[curves.length - 1]
    let sum = crossings(back.v2, front.v1, point)
    sum = curves.reduce((sum, curve) => {
      return sum + crossings(curve.v1, curve.v2, point)
    }, sum)
    return (sum % 2) === 1
  },

  parse (input, flip = false) {
    let x1 = 0
    let y1 = 0
    let x2 = 0
    let y2 = 0
    let x = 0
    let y = 0
    let path
    const commands = parser(input)
    const paths = commands.reduce((paths, current) => {
      switch (current.code) {
        case 'M':
        case 'm':
          if (current.relative === true) {
            x += current.x
            y += current.y
          } else {
            ({ x, y } = current)
          }
          if (path && path.curves.length === 0) {
            paths.pop()
          }
          path = new Three.Path()
          paths.push(path)
          if (flip) {
            path.moveTo(x, -y)
          } else {
            path.moveTo(x, y)
          }
          break
        case 'L':
        case 'l':
          if (current.relative === true) {
            x += current.x
            y += current.y
          } else {
            ({ x, y } = current)
          }
          if (flip) {
            path.lineTo(x, -y)
          } else {
            path.lineTo(x, y)
          }
          break
        case 'V':
        case 'v':
          if (current.relative === true) {
            y += current.y
          } else {
            ({ y } = current)
          }
          if (flip) {
            path.lineTo(x, -y)
          } else {
            path.lineTo(x, y)
          }
          break
        case 'H':
        case 'h':
          if (current.relative === true) {
            x += current.x
          } else {
            ({ x } = current)
          }
          if (flip) {
            path.lineTo(x, -y)
          } else {
            path.lineTo(x, y)
          }
          break
        case 'C':
        case 'c':
          if (current.relative === true) {
            x1 = x + current.x1
            y1 = y + current.y1
            x2 = x + current.x2
            y2 = y + current.y2
            x += current.x
            y += current.y
          } else {
            ({
              x1, y1, x2, y2, x, y
            } = current)
          }
          if (flip) {
            path.bezierCurveTo(x1, -y1, x2, -y2, x, -y)
          } else {
            path.bezierCurveTo(x1, y1, x2, y2, x, y)
          }
          break
        case 'S':
        case 's':
          x1 = x + (x - x2)
          y1 = y + (y - y2)
          if (current.relative === true) {
            x2 = x + current.x2
            y2 = y + current.y2
            x += current.x
            y += current.y
          } else {
            ({
              x2, y2, x, y
            } = current)
          }
          if (flip) {
            path.bezierCurveTo(x1, -y1, x2, -y2, x, -y)
          } else {
            path.bezierCurveTo(x1, y1, x2, y2, x, y)
          }
          break
        case 'Q':
        case 'q':
          if (current.relative === true) {
            x1 = x + current.x1
            y1 = y + current.y1
            x += current.x
            y += current.y
          } else {
            ({
              x1, y1, x, y
            } = current)
          }
          if (flip) {
            path.quadraticCurveTo(x1, -y1, x, -y)
          } else {
            path.quadraticCurveTo(x1, y1, x, y)
          }
          break
        case 'T':
        case 't':
          x1 = x + (x - x1)
          y1 = y + (y - y1)
          if (current.relative === true) {
            x += current.x
            y += current.y
          } else {
            ({ x, y } = current)
          }
          if (flip) {
            path.quadraticCurveTo(x1, -y1, x, -y)
          } else {
            path.quadraticCurveTo(x1, y1, x, y)
          }
          break
        case 'A':
        case 'a':
          // TODO: Support arcs
          throw new ImplementationError()
        case 'Z':
          path.closePath()
          break
        default:
          throw new Error(`Unknown code "${current.code}"`)
      }
      return paths
    }, [])

    if (paths.length === 0) {
      return null
    } else if (paths.length === 1) {
      return paths[0]
    }
    return paths.reduce((shape, path) => {
      shape.add(path)
      return shape
    }, new Three.Shape())
  }
}

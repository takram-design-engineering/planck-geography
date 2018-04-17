// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* eslint-disable no-unused-expressions */

import 'source-map-support/register'

import * as Three from 'three'
import chai from 'chai'

import { Path } from '../..'

const { expect } = chai

describe('Path', () => {
  describe('#winding', () => {
    it('returns cw for clockwise curves', () => {
      expect(Path.winding([
        { v1: { x: 0, y: 0 }, v2: { x: 1, y: 0 } },
        { v1: { x: 1, y: 0 }, v2: { x: 1, y: 1 } },
        { v1: { x: 1, y: 1 }, v2: { x: 0, y: 1 } }
      ])).equal('cw')
    })

    it('returns ccw for counter-clockwise curves', () => {
      expect(Path.winding([
        { v1: { x: 0, y: 1 }, v2: { x: 1, y: 1 } },
        { v1: { x: 1, y: 1 }, v2: { x: 1, y: 0 } },
        { v1: { x: 1, y: 0 }, v2: { x: 0, y: 0 } }
      ])).equal('ccw')
    })

    it('returns undefined for undetermined curves', () => {
      expect(Path.winding([
        { v1: { x: 0, y: 1 }, v2: { x: 1, y: 1 } },
        { v1: { x: 1, y: 1 }, v2: { x: 1, y: 0 } }
      ])).undefined
      expect(Path.winding([
        { v1: { x: 0, y: 0 }, v2: { x: 0, y: 0 } },
        { v1: { x: 1, y: 0 }, v2: { x: 1, y: 0 } },
        { v1: { x: 2, y: 0 }, v2: { x: 2, y: 0 } },
        { v1: { x: 3, y: 0 }, v2: { x: 3, y: 0 } }
      ])).undefined
      expect(Path.winding([
        { v1: { x: 0, y: 0 }, v2: { x: 1, y: 1 } },
        { v1: { x: 1, y: 1 }, v2: { x: 1, y: 0 } },
        { v1: { x: 1, y: 0 }, v2: { x: 0, y: 1 } }
      ])).undefined
    })
  })

  describe('#contains', () => {
    it('returns true when the curve contains the point', () => {
      const curves = [
        { v1: { x: 0, y: 0 }, v2: { x: 1, y: 0 } },
        { v1: { x: 1, y: 0 }, v2: { x: 1, y: 1 } },
        { v1: { x: 1, y: 1 }, v2: { x: 0, y: 1 } }
      ]
      expect(Path.contains(curves, { x: -0.0001, y: 0.5 })).false
      expect(Path.contains(curves, { x: 0.0001, y: 0.5 })).true
      expect(Path.contains(curves, { x: 0.9999, y: 0.5 })).true
      expect(Path.contains(curves, { x: 1.0001, y: 0.5 })).false
      expect(Path.contains(curves, { x: 0.5, y: -0.0001 })).false
      expect(Path.contains(curves, { x: 0.5, y: 0.0001 })).true
      expect(Path.contains(curves, { x: 0.5, y: 0.9999 })).true
      expect(Path.contains(curves, { x: 0.5, y: 1.0001 })).false
    })
  })

  describe('#parse', () => {
    it('returns path for single path', () => {
      const path = Path.parse('M1 2 L 3 4')
      expect(path).instanceof(Three.Path)
    })

    it('returns shape for multiple paths', () => {
      const path = Path.parse('M1 2 L 3 4 M1 2 L 3 4')
      expect(path).instanceof(Three.Shape)
    })

    it('throws error for malformed input', () => {
      expect(() => {
        Path.parse('malformed')
      }).throws(Error)
    })

    it('recognizes absolute move', () => {
      const path = Path.parse('M1 2')
      expect(path).instanceof(Three.Path)
      expect(path.curves.length).equal(0)
      expect(path.currentPoint.x).equal(1)
      expect(path.currentPoint.y).equal(2)
    })

    it('recognizes relative move', () => {
      const path = Path.parse('M1 2 m 1 2')
      expect(path).instanceof(Three.Path)
      expect(path.curves.length).equal(0)
      expect(path.currentPoint.x).equal(2)
      expect(path.currentPoint.y).equal(4)
    })

    it('recognizes absolute line', () => {
      const path = Path.parse('M1 2 L 3 4')
      expect(path).instanceof(Three.Path)
      expect(path.curves.length).equal(1)
      const curve = path.curves[0]
      expect(curve).instanceof(Three.LineCurve)
      expect(curve.v1.x).equal(1)
      expect(curve.v1.y).equal(2)
      expect(curve.v2.x).equal(3)
      expect(curve.v2.y).equal(4)
    })

    it('recognizes relative line', () => {
      const path = Path.parse('M1 2 l 3 4')
      expect(path).instanceof(Three.Path)
      expect(path.curves.length).equal(1)
      const curve = path.curves[0]
      expect(curve).instanceof(Three.LineCurve)
      expect(curve.v1.x).equal(1)
      expect(curve.v1.y).equal(2)
      expect(curve.v2.x).equal(4)
      expect(curve.v2.y).equal(6)
    })

    it('recognizes absolute vertical line', () => {
      const path = Path.parse('M1 2 V 3')
      expect(path).instanceof(Three.Path)
      expect(path.curves.length).equal(1)
      const curve = path.curves[0]
      expect(curve).instanceof(Three.LineCurve)
      expect(curve.v1.x).equal(1)
      expect(curve.v1.y).equal(2)
      expect(curve.v2.x).equal(1)
      expect(curve.v2.y).equal(3)
    })

    it('recognizes relative vertical line', () => {
      const path = Path.parse('M1 2 v 3')
      expect(path).instanceof(Three.Path)
      expect(path.curves.length).equal(1)
      const curve = path.curves[0]
      expect(curve).instanceof(Three.LineCurve)
      expect(curve.v1.x).equal(1)
      expect(curve.v1.y).equal(2)
      expect(curve.v2.x).equal(1)
      expect(curve.v2.y).equal(5)
    })

    it('recognizes absolute horizontal line', () => {
      const path = Path.parse('M1 2 H 3')
      expect(path).instanceof(Three.Path)
      expect(path.curves.length).equal(1)
      const curve = path.curves[0]
      expect(curve).instanceof(Three.LineCurve)
      expect(curve.v1.x).equal(1)
      expect(curve.v1.y).equal(2)
      expect(curve.v2.x).equal(3)
      expect(curve.v2.y).equal(2)
    })

    it('recognizes relative horizontal line', () => {
      const path = Path.parse('M1 2 h 3')
      expect(path).instanceof(Three.Path)
      expect(path.curves.length).equal(1)
      const curve = path.curves[0]
      expect(curve).instanceof(Three.LineCurve)
      expect(curve.v1.x).equal(1)
      expect(curve.v1.y).equal(2)
      expect(curve.v2.x).equal(4)
      expect(curve.v2.y).equal(2)
    })

    it('recognizes absolute cubic bezier curve', () => {
      const path = Path.parse('M1 2 C 3 4, 5 6, 7 8')
      expect(path).instanceof(Three.Path)
      expect(path.curves.length).equal(1)
      const curve = path.curves[0]
      expect(curve).instanceof(Three.CubicBezierCurve)
      expect(curve.v0.x).equal(1)
      expect(curve.v0.y).equal(2)
      expect(curve.v1.x).equal(3)
      expect(curve.v1.y).equal(4)
      expect(curve.v2.x).equal(5)
      expect(curve.v2.y).equal(6)
      expect(curve.v3.x).equal(7)
      expect(curve.v3.y).equal(8)
    })

    it('recognizes relative cubic bezier curve', () => {
      const path = Path.parse('M1 2 c 3 4, 5 6, 7 8')
      expect(path).instanceof(Three.Path)
      expect(path.curves.length).equal(1)
      const curve = path.curves[0]
      expect(curve).instanceof(Three.CubicBezierCurve)
      expect(curve.v0.x).equal(1)
      expect(curve.v0.y).equal(2)
      expect(curve.v1.x).equal(4)
      expect(curve.v1.y).equal(6)
      expect(curve.v2.x).equal(6)
      expect(curve.v2.y).equal(8)
      expect(curve.v3.x).equal(8)
      expect(curve.v3.y).equal(10)
    })

    it('recognizes absolute shortcut cubic bezier curve', () => {
      const path = Path.parse('M1 2 C 3 4, 5 6, 7 8 S 9 10, 11 12')
      expect(path).instanceof(Three.Path)
      expect(path.curves.length).equal(2)
      const curve = path.curves[1]
      expect(curve).instanceof(Three.CubicBezierCurve)
      expect(curve.v0.x).equal(7)
      expect(curve.v0.y).equal(8)
      expect(curve.v1.x).equal(7 + (7 - 5))
      expect(curve.v1.y).equal(8 + (8 - 6))
      expect(curve.v2.x).equal(9)
      expect(curve.v2.y).equal(10)
      expect(curve.v3.x).equal(11)
      expect(curve.v3.y).equal(12)
    })

    it('recognizes relative shortcut cubic bezier curve', () => {
      const path = Path.parse('M1 2 C 3 4, 5 6, 7 8 s 9 10, 11 12')
      expect(path).instanceof(Three.Path)
      expect(path.curves.length).equal(2)
      const curve = path.curves[1]
      expect(curve).instanceof(Three.CubicBezierCurve)
      expect(curve.v0.x).equal(7)
      expect(curve.v0.y).equal(8)
      expect(curve.v1.x).equal(7 + (7 - 5))
      expect(curve.v1.y).equal(8 + (8 - 6))
      expect(curve.v2.x).equal(16)
      expect(curve.v2.y).equal(18)
      expect(curve.v3.x).equal(18)
      expect(curve.v3.y).equal(20)
    })

    it('recognizes absolute quadratic curve', () => {
      const path = Path.parse('M1 2 Q 3 4, 5 6')
      expect(path).instanceof(Three.Path)
      expect(path.curves.length).equal(1)
      const curve = path.curves[0]
      expect(curve).instanceof(Three.QuadraticBezierCurve)
      expect(curve.v0.x).equal(1)
      expect(curve.v0.y).equal(2)
      expect(curve.v1.x).equal(3)
      expect(curve.v1.y).equal(4)
      expect(curve.v2.x).equal(5)
      expect(curve.v2.y).equal(6)
    })

    it('recognizes relative quadratic curve', () => {
      const path = Path.parse('M1 2 q 3 4, 5 6')
      expect(path).instanceof(Three.Path)
      expect(path.curves.length).equal(1)
      const curve = path.curves[0]
      expect(curve).instanceof(Three.QuadraticBezierCurve)
      expect(curve.v0.x).equal(1)
      expect(curve.v0.y).equal(2)
      expect(curve.v1.x).equal(4)
      expect(curve.v1.y).equal(6)
      expect(curve.v2.x).equal(6)
      expect(curve.v2.y).equal(8)
    })

    it('recognizes absolute shortcut quadratic curve', () => {
      const path = Path.parse('M1 2 Q 3 4, 5 6 T 7 8')
      expect(path).instanceof(Three.Path)
      expect(path.curves.length).equal(2)
      const curve = path.curves[1]
      expect(curve).instanceof(Three.QuadraticBezierCurve)
      expect(curve.v0.x).equal(5)
      expect(curve.v0.y).equal(6)
      expect(curve.v1.x).equal(5 + (5 - 3))
      expect(curve.v1.y).equal(6 + (6 - 4))
      expect(curve.v2.x).equal(7)
      expect(curve.v2.y).equal(8)
    })

    it('recognizes relative shortcut quadratic curve', () => {
      const path = Path.parse('M1 2 Q 3 4, 5 6 t 7 8')
      expect(path).instanceof(Three.Path)
      expect(path.curves.length).equal(2)
      const curve = path.curves[1]
      expect(curve).instanceof(Three.QuadraticBezierCurve)
      expect(curve.v0.x).equal(5)
      expect(curve.v0.y).equal(6)
      expect(curve.v1.x).equal(5 + (5 - 3))
      expect(curve.v1.y).equal(6 + (6 - 4))
      expect(curve.v2.x).equal(12)
      expect(curve.v2.y).equal(14)
    })

    it('recognizes close', () => {
      const path = Path.parse('M1 2 C 3 4, 5 6, 7 8 Z')
      expect(path).instanceof(Three.Path)
      expect(path.curves.length).equal(2)
      const curve = path.curves[1]
      expect(curve).instanceof(Three.LineCurve)
      expect(curve.v1.x).equal(7)
      expect(curve.v1.y).equal(8)
      expect(curve.v2.x).equal(1)
      expect(curve.v2.y).equal(2)
    })
  })
})

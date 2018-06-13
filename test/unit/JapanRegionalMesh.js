// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* eslint-disable no-unused-expressions */

import 'source-map-support/register'

import chai from 'chai'

import { JapanRegionalMesh } from '../..'

const { expect } = chai

describe('JapanRegionalMesh', () => {
  it('has 6 levels', () => {
    const mesh = JapanRegionalMesh
    expect(mesh.primary).not.undefined
    expect(mesh.secondary).not.undefined
    expect(mesh.basic).not.undefined
    expect(mesh.half).not.undefined
    expect(mesh.quarter).not.undefined
    expect(mesh.eighth).not.undefined
  })

  describe('#name', () => {
    it('returns mesh name', () => {
      const mesh = JapanRegionalMesh
      expect(mesh.primary.name).equal('primary')
      expect(mesh.secondary.name).equal('secondary')
      expect(mesh.basic.name).equal('basic')
      expect(mesh.half.name).equal('half')
      expect(mesh.quarter.name).equal('quarter')
      expect(mesh.eighth.name).equal('eighth')
    })
  })

  describe('#size', () => {
    it('returns mesh size in degree', () => {
      const mesh = JapanRegionalMesh
      expect(mesh.primary.size[0]).equal(1)
      expect(mesh.primary.size[1]).closeTo(0.666666666, 0.000000001)
      expect(mesh.secondary.size[0]).equal(0.125)
      expect(mesh.secondary.size[1]).closeTo(0.083333333, 0.000000001)
      expect(mesh.basic.size[0]).equal(0.0125)
      expect(mesh.basic.size[1]).closeTo(0.008333333, 0.000000001)
      expect(mesh.half.size[0]).equal(0.00625)
      expect(mesh.half.size[1]).closeTo(0.004166666, 0.000000001)
      expect(mesh.quarter.size[0]).equal(0.003125)
      expect(mesh.quarter.size[1]).closeTo(0.002083333, 0.000000001)
      expect(mesh.eighth.size[0]).equal(0.0015625)
      expect(mesh.eighth.size[1]).closeTo(0.001041666, 0.000000001)
    })
  })

  describe('#code', () => {
    it('converts coordinates to code', () => {
      const mesh = JapanRegionalMesh
      const coordinate = [
        139 + 42 / 60 + 53.1 / 3600,
        35 + 42 / 60 + 2.8 / 3600
      ]
      expect(mesh.primary.code(coordinate)).equal(5339)
      expect(mesh.secondary.code(coordinate)).equal(533945)
      expect(mesh.basic.code(coordinate)).equal(53394547)
      expect(mesh.half.code(coordinate)).equal(533945471)
      expect(mesh.quarter.code(coordinate)).equal(5339454711)
      expect(mesh.eighth.code(coordinate)).equal(53394547112)
    })
  })

  describe('#origin', () => {
    it('converts code to coordinates at the top-left corner of mesh', () => {
      const coordinate = [
        139 + 42 / 60 + 53.1 / 3600,
        35 + 42 / 60 + 2.8 / 3600
      ]
      const eps = 0.000000001
      {
        const mesh = JapanRegionalMesh.primary
        const code = 5339
        const origin = mesh.origin(code)
        expect(origin[0]).closeTo(coordinate[0], mesh.size[0])
        expect(origin[1]).closeTo(coordinate[1], mesh.size[1])
        expect(mesh.code([origin[0] - eps, origin[1]])).not.equal(code)
        expect(mesh.code([origin[0], origin[1] - eps])).not.equal(code)
        expect(mesh.code([origin[0] + eps, origin[1]])).equal(code)
        expect(mesh.code([origin[0], origin[1] + eps])).equal(code)
      }
      {
        const mesh = JapanRegionalMesh.secondary
        const code = 533945
        const origin = mesh.origin(code)
        expect(origin[0]).closeTo(coordinate[0], mesh.size[0])
        expect(origin[1]).closeTo(coordinate[1], mesh.size[1])
        expect(mesh.code([origin[0] - eps, origin[1]])).not.equal(code)
        expect(mesh.code([origin[0], origin[1] - eps])).not.equal(code)
        expect(mesh.code([origin[0] + eps, origin[1]])).equal(code)
        expect(mesh.code([origin[0], origin[1] + eps])).equal(code)
      }
      {
        const mesh = JapanRegionalMesh.basic
        const code = 53394547
        const origin = mesh.origin(code)
        expect(origin[0]).closeTo(coordinate[0], mesh.size[0])
        expect(origin[1]).closeTo(coordinate[1], mesh.size[1])
        expect(mesh.code([origin[0] - eps, origin[1]])).not.equal(code)
        expect(mesh.code([origin[0], origin[1] - eps])).not.equal(code)
        expect(mesh.code([origin[0] + eps, origin[1]])).equal(code)
        expect(mesh.code([origin[0], origin[1] + eps])).equal(code)
      }
      {
        const mesh = JapanRegionalMesh.half
        const code = 533945471
        const origin = mesh.origin(code)
        expect(origin[0]).closeTo(coordinate[0], mesh.size[0])
        expect(origin[1]).closeTo(coordinate[1], mesh.size[1])
        expect(mesh.code([origin[0] - eps, origin[1]])).not.equal(code)
        expect(mesh.code([origin[0], origin[1] - eps])).not.equal(code)
        expect(mesh.code([origin[0] + eps, origin[1]])).equal(code)
        expect(mesh.code([origin[0], origin[1] + eps])).equal(code)
      }
      {
        const mesh = JapanRegionalMesh.quarter
        const code = 5339454711
        const origin = mesh.origin(code)
        expect(origin[0]).closeTo(coordinate[0], mesh.size[0])
        expect(origin[1]).closeTo(coordinate[1], mesh.size[1])
        expect(mesh.code([origin[0] - eps, origin[1]])).not.equal(code)
        expect(mesh.code([origin[0], origin[1] - eps])).not.equal(code)
        expect(mesh.code([origin[0] + eps, origin[1]])).equal(code)
        expect(mesh.code([origin[0], origin[1] + eps])).equal(code)
      }
      {
        const mesh = JapanRegionalMesh.eighth
        const code = 53394547112
        const origin = mesh.origin(code)
        expect(origin[0]).closeTo(coordinate[0], mesh.size[0])
        expect(origin[1]).closeTo(coordinate[1], mesh.size[1])
        expect(mesh.code([origin[0] - eps, origin[1]])).not.equal(code)
        expect(mesh.code([origin[0], origin[1] - eps])).not.equal(code)
        expect(mesh.code([origin[0] + eps, origin[1]])).equal(code)
        expect(mesh.code([origin[0], origin[1] + eps])).equal(code)
      }
    })
  })

  describe('#center', () => {
    it('converts code to coordinates at the center of mesh', () => {
      const coordinate = [
        139 + 42 / 60 + 53.1 / 3600,
        35 + 42 / 60 + 2.8 / 3600
      ]
      const eps = 0.000000001
      {
        const mesh = JapanRegionalMesh.primary
        const code = 5339
        const center = mesh.center(code)
        expect(center[0]).closeTo(coordinate[0], mesh.size[0])
        expect(center[1]).closeTo(coordinate[1], mesh.size[1])
        expect(mesh.code([
          center[0] - mesh.size[0] / 2 - eps,
          center[1]
        ])).not.equal(code)
        expect(mesh.code([
          center[0] - mesh.size[0] / 2 + eps,
          center[1]
        ])).equal(code)
        expect(mesh.code([
          center[0],
          center[1] - mesh.size[1] / 2 - eps
        ])).not.equal(code)
        expect(mesh.code([
          center[0],
          center[1] - mesh.size[1] / 2 + eps
        ])).equal(code)
        expect(mesh.code([
          center[0] + mesh.size[0] / 2 - eps,
          center[1]
        ])).equal(code)
        expect(mesh.code([
          center[0] + mesh.size[0] / 2 + eps,
          center[1]
        ])).not.equal(code)
        expect(mesh.code([
          center[0],
          center[1] + mesh.size[1] / 2 - eps
        ])).equal(code)
        expect(mesh.code([
          center[0],
          center[1] + mesh.size[1] / 2 + eps
        ])).not.equal(code)
      }
      {
        const mesh = JapanRegionalMesh.secondary
        const code = 533945
        const center = mesh.center(code)
        expect(center[0]).closeTo(coordinate[0], mesh.size[0])
        expect(center[1]).closeTo(coordinate[1], mesh.size[1])
        expect(mesh.code([
          center[0] - mesh.size[0] / 2 - eps,
          center[1]
        ])).not.equal(code)
        expect(mesh.code([
          center[0] - mesh.size[0] / 2 + eps,
          center[1]
        ])).equal(code)
        expect(mesh.code([
          center[0],
          center[1] - mesh.size[1] / 2 - eps
        ])).not.equal(code)
        expect(mesh.code([
          center[0],
          center[1] - mesh.size[1] / 2 + eps
        ])).equal(code)
        expect(mesh.code([
          center[0] + mesh.size[0] / 2 - eps,
          center[1]
        ])).equal(code)
        expect(mesh.code([
          center[0] + mesh.size[0] / 2 + eps,
          center[1]
        ])).not.equal(code)
        expect(mesh.code([
          center[0],
          center[1] + mesh.size[1] / 2 - eps
        ])).equal(code)
        expect(mesh.code([
          center[0],
          center[1] + mesh.size[1] / 2 + eps
        ])).not.equal(code)
      }
      {
        const mesh = JapanRegionalMesh.basic
        const code = 53394547
        const center = mesh.center(code)
        expect(center[0]).closeTo(coordinate[0], mesh.size[0])
        expect(center[1]).closeTo(coordinate[1], mesh.size[1])
        expect(mesh.code([
          center[0] - mesh.size[0] / 2 - eps,
          center[1]
        ])).not.equal(code)
        expect(mesh.code([
          center[0] - mesh.size[0] / 2 + eps,
          center[1]
        ])).equal(code)
        expect(mesh.code([
          center[0],
          center[1] - mesh.size[1] / 2 - eps
        ])).not.equal(code)
        expect(mesh.code([
          center[0],
          center[1] - mesh.size[1] / 2 + eps
        ])).equal(code)
        expect(mesh.code([
          center[0] + mesh.size[0] / 2 - eps,
          center[1]
        ])).equal(code)
        expect(mesh.code([
          center[0] + mesh.size[0] / 2 + eps,
          center[1]
        ])).not.equal(code)
        expect(mesh.code([
          center[0],
          center[1] + mesh.size[1] / 2 - eps
        ])).equal(code)
        expect(mesh.code([
          center[0],
          center[1] + mesh.size[1] / 2 + eps
        ])).not.equal(code)
      }
      {
        const mesh = JapanRegionalMesh.half
        const code = 533945471
        const center = mesh.center(code)
        expect(center[0]).closeTo(coordinate[0], mesh.size[0])
        expect(center[1]).closeTo(coordinate[1], mesh.size[1])
        expect(mesh.code([
          center[0] - mesh.size[0] / 2 - eps,
          center[1]
        ])).not.equal(code)
        expect(mesh.code([
          center[0] - mesh.size[0] / 2 + eps,
          center[1]
        ])).equal(code)
        expect(mesh.code([
          center[0],
          center[1] - mesh.size[1] / 2 - eps
        ])).not.equal(code)
        expect(mesh.code([
          center[0],
          center[1] - mesh.size[1] / 2 + eps
        ])).equal(code)
        expect(mesh.code([
          center[0] + mesh.size[0] / 2 - eps,
          center[1]
        ])).equal(code)
        expect(mesh.code([
          center[0] + mesh.size[0] / 2 + eps,
          center[1]
        ])).not.equal(code)
        expect(mesh.code([
          center[0],
          center[1] + mesh.size[1] / 2 - eps
        ])).equal(code)
        expect(mesh.code([
          center[0],
          center[1] + mesh.size[1] / 2 + eps
        ])).not.equal(code)
      }
      {
        const mesh = JapanRegionalMesh.quarter
        const code = 5339454711
        const center = mesh.center(code)
        expect(center[0]).closeTo(coordinate[0], mesh.size[0])
        expect(center[1]).closeTo(coordinate[1], mesh.size[1])
        expect(mesh.code([
          center[0] - mesh.size[0] / 2 - eps,
          center[1]
        ])).not.equal(code)
        expect(mesh.code([
          center[0] - mesh.size[0] / 2 + eps,
          center[1]
        ])).equal(code)
        expect(mesh.code([
          center[0],
          center[1] - mesh.size[1] / 2 - eps
        ])).not.equal(code)
        expect(mesh.code([
          center[0],
          center[1] - mesh.size[1] / 2 + eps
        ])).equal(code)
        expect(mesh.code([
          center[0] + mesh.size[0] / 2 - eps,
          center[1]
        ])).equal(code)
        expect(mesh.code([
          center[0] + mesh.size[0] / 2 + eps,
          center[1]
        ])).not.equal(code)
        expect(mesh.code([
          center[0],
          center[1] + mesh.size[1] / 2 - eps
        ])).equal(code)
        expect(mesh.code([
          center[0],
          center[1] + mesh.size[1] / 2 + eps
        ])).not.equal(code)
      }
      {
        const mesh = JapanRegionalMesh.eighth
        const code = 53394547112
        const center = mesh.center(code)
        expect(center[0]).closeTo(coordinate[0], mesh.size[0])
        expect(center[1]).closeTo(coordinate[1], mesh.size[1])
        expect(mesh.code([
          center[0] - mesh.size[0] / 2 - eps,
          center[1]
        ])).not.equal(code)
        expect(mesh.code([
          center[0] - mesh.size[0] / 2 + eps,
          center[1]
        ])).equal(code)
        expect(mesh.code([
          center[0],
          center[1] - mesh.size[1] / 2 - eps
        ])).not.equal(code)
        expect(mesh.code([
          center[0],
          center[1] - mesh.size[1] / 2 + eps
        ])).equal(code)
        expect(mesh.code([
          center[0] + mesh.size[0] / 2 - eps,
          center[1]
        ])).equal(code)
        expect(mesh.code([
          center[0] + mesh.size[0] / 2 + eps,
          center[1]
        ])).not.equal(code)
        expect(mesh.code([
          center[0],
          center[1] + mesh.size[1] / 2 - eps
        ])).equal(code)
        expect(mesh.code([
          center[0],
          center[1] + mesh.size[1] / 2 + eps
        ])).not.equal(code)
      }
    })
  })
})

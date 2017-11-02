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

import Namespace from '@takram/planck-core/src/Namespace'

function modulo(numerator, denominator) {
  return {
    quotient: Math.floor(numerator / denominator),
    remainder: numerator % denominator,
  }
}

function decompose(value) {
  const integral = Math.floor(value)
  return {
    integral,
    fractional: value - integral,
  }
}

const pointToCodeConverters = {
  primary(point) {
    let value = modulo(point[1] * 60, 40)
    const p = value.quotient
    value = decompose(point[0] - 100)
    const u = value.integral
    return (p * 100 +
            u * 1)
  },

  secondary(point) {
    let value = modulo(point[1] * 60, 40)
    const p = value.quotient
    value = modulo(value.remainder, 5)
    const q = value.quotient
    value = decompose(point[0] - 100)
    const u = value.integral
    value = modulo(value.fractional * 60, 7.5)
    const v = value.quotient
    return (p * 10000 +
            u * 100 +
            q * 10 +
            v * 1)
  },

  basic(point) {
    let value = modulo(point[1] * 60, 40)
    const p = value.quotient
    value = modulo(value.remainder, 5)
    const q = value.quotient
    value = modulo(value.remainder * 60, 30)
    const r = value.quotient
    value = decompose(point[0] - 100)
    const u = value.integral
    value = modulo(value.fractional * 60, 7.5)
    const v = value.quotient
    value = modulo(value.remainder * 60, 45)
    const w = value.quotient
    return (p * 1000000 +
            u * 10000 +
            q * 1000 +
            v * 100 +
            r * 10 +
            w * 1)
  },

  half(point) {
    let value = modulo(point[1] * 60, 40)
    const p = value.quotient
    value = modulo(value.remainder, 5)
    const q = value.quotient
    value = modulo(value.remainder * 60, 30)
    const r = value.quotient
    value = modulo(value.remainder, 15)
    const s = value.quotient
    value = decompose(point[0] - 100)
    const u = value.integral
    value = modulo(value.fractional * 60, 7.5)
    const v = value.quotient
    value = modulo(value.remainder * 60, 45)
    const w = value.quotient
    value = modulo(value.remainder, 22.5)
    const x = value.quotient
    const m = s * 2 + x + 1
    return (p * 10000000 +
            u * 100000 +
            q * 10000 +
            v * 1000 +
            r * 100 +
            w * 10 +
            m * 1)
  },

  quarter(point) {
    let value = modulo(point[1] * 60, 40)
    const p = value.quotient
    value = modulo(value.remainder, 5)
    const q = value.quotient
    value = modulo(value.remainder * 60, 30)
    const r = value.quotient
    value = modulo(value.remainder, 15)
    const s = value.quotient
    value = modulo(value.remainder, 7.5)
    const t = value.quotient
    value = decompose(point[0] - 100)
    const u = value.integral
    value = modulo(value.fractional * 60, 7.5)
    const v = value.quotient
    value = modulo(value.remainder * 60, 45)
    const w = value.quotient
    value = modulo(value.remainder, 22.5)
    const x = value.quotient
    value = modulo(value.remainder, 11.25)
    const y = value.quotient
    const m = s * 2 + x + 1
    const n = t * 2 + y + 1
    return (p * 100000000 +
            u * 1000000 +
            q * 100000 +
            v * 10000 +
            r * 1000 +
            w * 100 +
            m * 10 +
            n * 1)
  },

  eighth(point) {
    let value = modulo(point[1] * 60, 40)
    const p = value.quotient
    value = modulo(value.remainder, 5)
    const q = value.quotient
    value = modulo(value.remainder * 60, 30)
    const r = value.quotient
    value = modulo(value.remainder, 15)
    const s = value.quotient
    value = modulo(value.remainder, 7.5)
    const t = value.quotient
    value = modulo(value.remainder, 3.75)
    const o = value.quotient
    value = decompose(point[0] - 100)
    const u = value.integral
    value = modulo(value.fractional * 60, 7.5)
    const v = value.quotient
    value = modulo(value.remainder * 60, 45)
    const w = value.quotient
    value = modulo(value.remainder, 22.5)
    const x = value.quotient
    value = modulo(value.remainder, 11.25)
    const y = value.quotient
    value = modulo(value.remainder, 5.625)
    const z = value.quotient
    const m = s * 2 + x + 1
    const n = t * 2 + y + 1
    const l = o * 2 + z + 1
    return (p * 1000000000 +
            u * 10000000 +
            q * 1000000 +
            v * 100000 +
            r * 10000 +
            w * 1000 +
            m * 100 +
            n * 10 +
            l * 1)
  },
}

const codeToPointConverters = {
  primary(code) {
    let value = modulo(code, 100)
    const p = value.quotient
    value = modulo(value.remainder, 1)
    const u = value.quotient
    return [
      ((u + 100) * 3600) / 3600,
      (p * 2400) / 3600,
    ]
  },

  secondary(code) {
    let value = modulo(code, 10000)
    const p = value.quotient
    value = modulo(value.remainder, 100)
    const u = value.quotient
    value = modulo(value.remainder, 10)
    const q = value.quotient
    value = modulo(value.remainder, 1)
    const v = value.quotient
    return [
      ((u + 100) * 3600 + v * 450) / 3600,
      (p * 2400 + q * 300) / 3600,
    ]
  },

  basic(code) {
    let value = modulo(code, 1000000)
    const p = value.quotient
    value = modulo(value.remainder, 10000)
    const u = value.quotient
    value = modulo(value.remainder, 1000)
    const q = value.quotient
    value = modulo(value.remainder, 100)
    const v = value.quotient
    value = modulo(value.remainder, 10)
    const r = value.quotient
    value = modulo(value.remainder, 1)
    const w = value.quotient
    return [
      ((u + 100) * 3600 + v * 450 + w * 45) / 3600,
      (p * 2400 + q * 300 + r * 30) / 3600,
    ]
  },

  half(code) {
    let value = modulo(code, 10000000)
    const p = value.quotient
    value = modulo(value.remainder, 100000)
    const u = value.quotient
    value = modulo(value.remainder, 10000)
    const q = value.quotient
    value = modulo(value.remainder, 1000)
    const v = value.quotient
    value = modulo(value.remainder, 100)
    const r = value.quotient
    value = modulo(value.remainder, 10)
    const w = value.quotient
    value = modulo(value.remainder, 1)
    const m = value.quotient
    const s = (m - 1) >> 1
    const x = (m - 1) & 1
    return [
      ((u + 100) * 3600 + v * 450 + w * 45 +
       x * 22.5) / 3600,
      (p * 2400 + q * 300 + r * 30 +
       s * 15) / 3600,
    ]
  },

  quarter(code) {
    let value = modulo(code, 100000000)
    const p = value.quotient
    value = modulo(value.remainder, 1000000)
    const u = value.quotient
    value = modulo(value.remainder, 100000)
    const q = value.quotient
    value = modulo(value.remainder, 10000)
    const v = value.quotient
    value = modulo(value.remainder, 1000)
    const r = value.quotient
    value = modulo(value.remainder, 100)
    const w = value.quotient
    value = modulo(value.remainder, 10)
    const m = value.quotient
    value = modulo(value.remainder, 1)
    const n = value.quotient
    const s = (m - 1) >> 1
    const x = (m - 1) & 1
    const t = (n - 1) >> 1
    const y = (n - 1) & 1
    return [
      ((u + 100) * 3600 + v * 450 + w * 45 +
       x * 22.5 + y * 11.25) / 3600,
      (p * 2400 + q * 300 + r * 30 +
       s * 15 + t * 7.5) / 3600,
    ]
  },

  eighth(code) {
    let value = modulo(code, 1000000000)
    const p = value.quotient
    value = modulo(value.remainder, 10000000)
    const u = value.quotient
    value = modulo(value.remainder, 1000000)
    const q = value.quotient
    value = modulo(value.remainder, 100000)
    const v = value.quotient
    value = modulo(value.remainder, 10000)
    const r = value.quotient
    value = modulo(value.remainder, 1000)
    const w = value.quotient
    value = modulo(value.remainder, 100)
    const m = value.quotient
    value = modulo(value.remainder, 10)
    const n = value.quotient
    value = modulo(value.remainder, 1)
    const l = value.quotient
    const s = (m - 1) >> 1
    const x = (m - 1) & 1
    const t = (n - 1) >> 1
    const y = (n - 1) & 1
    const o = (l - 1) >> 1
    const z = (l - 1) & 1
    return [
      ((u + 100) * 3600 + v * 450 + w * 45 +
       x * 22.5 + y * 11.25 + z * 5.625) / 3600,
      (p * 2400 + q * 300 + r * 30 +
       s * 15 + t * 7.5 + o * 3.75) / 3600,
    ]
  },
}

export const internal = Namespace('JapanRegionalMesh')

export class JapanRegionalMesh {
  constructor(name, size) {
    const scope = internal(this)
    scope.name = name
    scope.size = [...size]
  }

  code(point) {
    return pointToCodeConverters[this.name](point)
  }

  origin(code) {
    return codeToPointConverters[this.name](code)
  }

  center(code) {
    const origin = this.origin(code)
    const { size } = this
    return [origin[0] + size[0] / 2, origin[1] + size[1] / 2]
  }

  get name() {
    const scope = internal(this)
    return scope.name
  }

  get size() {
    const scope = internal(this)
    return [...scope.size]
  }
}

export default {
  primary: new JapanRegionalMesh('primary', [3600 / 3600, 2400 / 3600]),
  secondary: new JapanRegionalMesh('secondary', [450 / 3600, 300 / 3600]),
  basic: new JapanRegionalMesh('basic', [45 / 3600, 30 / 3600]),
  half: new JapanRegionalMesh('half', [22.5 / 3600, 15 / 3600]),
  quarter: new JapanRegionalMesh('quarter', [11.25 / 3600, 7.5 / 3600]),
  eighth: new JapanRegionalMesh('eighth', [5.625 / 3600, 3.75 / 3600]),
}

// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import DivisionLevel from './DivisionLevel'
import Geography from './Geography'

export default class JapanGeography extends Geography {
  constructor () {
    super('japan', [
      new DivisionLevel('prefecture'),
      new DivisionLevel('municipality', {
        coerce (code) {
          return parseInt(code, 10)
        },
        super (code) {
          return parseInt(`${code}`.slice(0, -3), 10)
        }
      })
    ])
  }
}

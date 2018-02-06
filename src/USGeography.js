// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import DivisionLevel from './DivisionLevel'
import Geography from './Geography'

export default class USGeography extends Geography {
  constructor() {
    super('us', [
      new DivisionLevel('state'),
      new DivisionLevel('county', {
        coerce(code) {
          return parseInt(code, 10)
        },
        super(code) {
          return parseInt(`${code}`.slice(0, -3), 10)
        },
      }),
    ])
  }
}

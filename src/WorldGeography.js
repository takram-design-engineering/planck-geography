// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import Geography from './Geography'
import DivisionLevel from './DivisionLevel'

export default class WorldGeography extends Geography {
  constructor() {
    super('world', [
      new DivisionLevel('country'),
    ])
  }
}

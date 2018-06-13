// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

// http://www.naturalearthdata.com/downloads/10m-cultural-vectors
export const url = 'http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_countries.zip'

export function transform (properties) {
  const {
    ADM0_A3: countryCode,
    NAME: countryName
  } = properties
  return {
    countryCode,
    countryName
  }
}

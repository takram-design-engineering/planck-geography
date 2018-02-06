// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

const stateNames = {
  1: 'Alabama',
  2: 'Alaska',
  4: 'Arizona',
  5: 'Arkansas',
  6: 'California',
  8: 'Colorado',
  9: 'Connecticut',
  10: 'Delaware',
  11: 'District of Columbia',
  12: 'Florida',
  13: 'Georgia',
  15: 'Hawaii',
  16: 'Idaho',
  17: 'Illinois',
  18: 'Indiana',
  19: 'Iowa',
  20: 'Kansas',
  21: 'Kentucky',
  22: 'Louisiana',
  23: 'Maine',
  24: 'Maryland',
  25: 'Massachusetts',
  26: 'Michigan',
  27: 'Minnesota',
  28: 'Mississippi',
  29: 'Missouri',
  30: 'Montana',
  31: 'Nebraska',
  32: 'Nevada',
  33: 'New Hampshire',
  34: 'New Jersey',
  35: 'New Mexico',
  36: 'New York',
  37: 'North Carolina',
  38: 'North Dakota',
  39: 'Ohio',
  40: 'Oklahoma',
  41: 'Oregon',
  42: 'Pennsylvania',
  44: 'Rhode Island',
  45: 'South Carolina',
  46: 'South Dakota',
  47: 'Tennessee',
  48: 'Texas',
  49: 'Utah',
  50: 'Vermont',
  51: 'Virginia',
  53: 'Washington',
  54: 'West Virginia',
  55: 'Wisconsin',
  56: 'Wyoming',
  60: 'American Samoa',
  66: 'Guam',
  69: 'Northern Mariana Islands',
  72: 'Puerto Rico',
  74: 'U.S. Minor Outlying Islands',
  78: 'U.S. Virgin Islands',
}

// https://www.census.gov/geo/maps-data/data/cbf/cbf_counties.html
export const url = 'http://www2.census.gov/geo/tiger/GENZ2016/shp/cb_2016_us_county_500k.zip'

export function transform(properties) {
  const {
    STATEFP: stateCode,
    GEOID: countyCode,
    NAME: countyName,
  } = properties
  return {
    stateCode: parseInt(stateCode, 10),
    countyCode: parseInt(countyCode, 10),
    stateNames: stateNames[stateCode],
    countyName,
  }
}

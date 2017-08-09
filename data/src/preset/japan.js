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

const prefectureNames = {
  1: 'Hokkaido',
  2: 'Aomori',
  3: 'Iwate',
  4: 'Miyagi',
  5: 'Akita',
  6: 'Yamagata',
  7: 'Fukushima',
  8: 'Ibaraki',
  9: 'Tochigi',
  10: 'Gunma',
  11: 'Saitama',
  12: 'Chiba',
  13: 'Tokyo',
  14: 'Kanagawa',
  15: 'Niigata',
  16: 'Toyama',
  17: 'Ishikawa',
  18: 'Fukui',
  19: 'Yamanashi',
  20: 'Nagano',
  21: 'Gifu',
  22: 'Shizuoka',
  23: 'Aichi',
  24: 'Mie',
  25: 'Shiga',
  26: 'Kyoto',
  27: 'Osaka',
  28: 'Hyogo',
  29: 'Nara',
  30: 'Wakayama',
  31: 'Tottori',
  32: 'Shimane',
  33: 'Okayama',
  34: 'Hiroshima',
  35: 'Yamaguchi',
  36: 'Tokushima',
  37: 'Kagawa',
  38: 'Ehime',
  39: 'Kochi',
  40: 'Fukuoka',
  41: 'Saga',
  42: 'Nagasaki',
  43: 'Kumamoto',
  44: 'Oita',
  45: 'Miyazaki',
  46: 'Kagoshima',
  47: 'Okinawa',
}

// https://www.esrij.com/products/japan-shp/
export const url = 'https://www.esrij.com/cgi-bin/wp/wp-content/uploads/2017/01/japan_ver81.zip'

export function transform(properties) {
  const {
    JCODE: code,
    CITY_ENG: municipalityName,
  } = properties
  let prefectureCode
  let municipalityCode
  if (code === null) {
    prefectureCode = null
    municipalityCode = null
  } else {
    prefectureCode = parseInt(code.substring(0, 2), 10)
    municipalityCode = parseInt(code, 10)
  }
  return {
    prefectureCode,
    municipalityCode,
    prefectureName: prefectureNames[prefectureCode],
    municipalityName,
  }
}

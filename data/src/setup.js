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

/* eslint-disable no-console */

import { createGzip } from 'zlib'
import { promisify } from 'util'
import * as shapefile from 'shapefile'
import * as topojson from 'topojson'
import chalk from 'chalk'
import decompress from 'decompress'
import download from 'download'
import fs from 'fs'
import mapshaper from 'mapshaper'
import mkdirp from 'mkdirp'
import path from 'path'

const exists = promisify(fs.exists)
const mkdir = promisify(mkdirp)
const stat = promisify(fs.stat)
const writeFile = promisify(fs.writeFile)

async function extractShapefile(input) {
  console.log(chalk.cyan('Extracting shapefile'))

  const shapefile = await decompress(input)
  const shp = shapefile.find(file => {
    return file.path.endsWith('.shp')
  }).data
  const dbf = shapefile.find(file => {
    return file.path.endsWith('.dbf')
  }).data
  return { shp, dbf }
}

async function readShapefileFromFile(file, directory) {
  if (!await exists(file)) {
    throw new Error(`No such file or directory: ${file}`)
  }
  if ((await stat(file)).isDirectory()) {
    throw new Error(`${file} is a directory`)
  }
  return extractShapefile(file)
}

async function readShapefileFromUrl(url) {
  console.log(chalk.cyan('Downloading shapefile archive'))

  const buffer = await download(url)
  return extractShapefile(buffer)
}

async function convertToTopoJSON({ shp, dbf }, method, encoding) {
  console.log(chalk.cyan('Converting shapefile to TopoJSON'))

  if (method === 'topojson') {
    const geojson = await shapefile.read(shp, dbf, { encoding })
    return topojson.topology({ geography: geojson }, 100000)
  }
  if (method === 'mapshaper') {
    const result = await promisify(mapshaper.applyCommands)([
      `-i input.shp name=geography encoding=${encoding}`,
      '-o output.json format=topojson',
    ].join(' '), {
      'input.shp': shp,
      'input.dbf': dbf,
    })
    return JSON.parse(result['output.json'])
  }
  throw new Error(`Unknown conversion method: ${method}`)
}

async function simplifyTopoJSON(data) {
  console.log(chalk.cyan('Simplifying TopoJSON'))

  const result = await promisify(mapshaper.applyCommands)([
    '-i input.json',
    '-simplify weighted 25%',
    '-o output.json format=topojson',
  ].join(' '), {
    'input.json': data,
  })
  return JSON.parse(result['output.json'])
}

function createCatalog(data, identifier, levels) {
  console.log(chalk.cyan('Creating catalog'))

  const { geometries } = data.objects.geography
  const neighborIndices = topojson.neighbors(geometries)

  return levels.reduce((catalog, level) => {
    const key = `${level}Code`
    const capitalLevel = `${level.charAt().toUpperCase()}${level.slice(1)}`
    return {
      ...catalog,
      [level]: geometries.reduce((properties, geometry) => {
        const code = geometry.properties[key]
        if (code === undefined || code === null) {
          return properties
        }
        if (properties.find(property => property.code === code) !== undefined) {
          return properties
        }
        // Remember the indices of geometries in this division.
        const indices = geometries
          .filter(geometry => geometry.properties[key] === code)
          .map(geometry => geometries.indexOf(geometry))

        // Convert neighbors to codes
        const neighbors = geometries
          .filter((geometry, index) => {
            return indices.includes(index) || indices.some(other => {
              return neighborIndices[other].includes(index)
            })
          })
          .map(geometry => geometry.properties[key])
          .filter(other => other !== null && other !== code)
          .filter((code, index, codes) => codes.indexOf(code) === index)

        // Add properties for this division
        const property = {
          code,
          name: geometry.properties[`${level}Name`],
          localizedName: geometry.properties[`localized${capitalLevel}Name`],
          neighbors,
        }
        return properties.concat(property)
      }, []),
    }
  }, { identifier })
}

function writeGzip(file, data) {
  return new Promise(resolve => {
    const stream = fs.createWriteStream(`${file}.gz`)
    const gzip = createGzip()
    gzip.on('finish', resolve)
    gzip.pipe(stream)
    gzip.write(data)
    gzip.end()
  })
}

async function writeFiles(file, data) {
  const json = JSON.stringify(data)
  await Promise.all([
    (async () => {
      await writeFile(file, json)
      console.log(chalk.green(`Written ${file}`))
    })(),
    (async () => {
      await writeGzip(file, json)
      console.log(chalk.green(`Written ${file}.gz`))
    })(),
  ])
}

async function main({
  url,
  file,
  output,
  identifier,
  transform,
  levels = [],
  method = 'topojson',
  encoding = 'utf-8',
}) {
  const outputDir = path.resolve(output)
  await mkdir(outputDir)

  // Configurations
  console.log(chalk.magenta(`Output Directory: ${outputDir}`))
  console.log(chalk.magenta(`Geography Identifier: ${identifier}`))
  console.log(chalk.magenta(`Division Levels: ${levels}`))
  console.log(chalk.magenta(`Shapefile Encoding: ${encoding}`))
  console.log(chalk.magenta(`Shapefile Conversion Method: ${method}`))

  // Read shapefile
  let shapefile
  if (file) {
    shapefile = await readShapefileFromFile(file)
  } else if (url) {
    shapefile = await readShapefileFromUrl(url)
  } else {
    throw new Error('Either file or url must be specified')
  }

  // Write topojson
  let topojson = await convertToTopoJSON(shapefile, method, encoding)
  if (transform) {
    topojson.objects.geography.geometries.forEach(geometry => {
      // eslint-disable-next-line no-param-reassign
      geometry.properties = transform(geometry.properties)
    })
  }
  topojson = await simplifyTopoJSON(topojson)
  await writeFiles(path.resolve(outputDir, `${identifier}.topojson`), topojson)

  // Write catalog
  const catalog = createCatalog(topojson, identifier, [].concat(levels))
  await writeFiles(path.resolve(outputDir, `${identifier}.json`), catalog)
}

export default async function setup(options) {
  const levels = options.levels.split(',')
  await main({ ...options, levels })
}

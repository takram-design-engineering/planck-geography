// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import { createGzip } from 'zlib'
import { promisify } from 'util'
import chalk from 'chalk'
import fs from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'

import { GeographyBuilder, GeometryPack, Projection } from '../..'

const mkdir = promisify(mkdirp)
const stat = promisify(fs.stat)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

function writeGzip (file, data) {
  return new Promise(resolve => {
    const stream = fs.createWriteStream(`${file}.gz`)
    const gzip = createGzip()
    gzip.on('finish', resolve)
    gzip.pipe(stream)
    gzip.write(data)
    gzip.end()
  })
}

async function writeFiles (file, data) {
  const json = JSON.stringify(data)
  await Promise.all([
    (async () => {
      await writeFile(file, json)
      console.log(chalk.green(`Written ${file}`))
    })(),
    (async () => {
      await writeGzip(file, json)
      console.log(chalk.green(`Written ${file}.gz`))
    })()
  ])
}

async function writeGeometry (file, geometry) {
  const [data, array] = GeometryPack.packBufferGeometry(geometry)
  const json = JSON.stringify(data)
  const buffer = Buffer.from(array)
  await Promise.all([
    (async () => {
      await writeFile(`${file}.json`, json)
      console.log(chalk.green(`Written ${file}.json`))
    })(),
    (async () => {
      await writeGzip(`${file}.json`, json)
      console.log(chalk.green(`Written ${file}.json.gz`))
    })(),
    (async () => {
      await writeFile(`${file}.buffer`, buffer)
      console.log(chalk.green(`Written ${file}.buffer`))
    })(),
    (async () => {
      await writeGzip(`${file}.buffer`, buffer)
      console.log(chalk.green(`Written ${file}.buffer.gz`))
    })()
  ])
}

async function writeGeometries (file, geometries) {
  const [data, array] = GeometryPack.packBufferGeometries(geometries)
  const json = JSON.stringify(data)
  const buffer = Buffer.from(array)
  await Promise.all([
    (async () => {
      await writeFile(`${file}.json`, json)
      console.log(chalk.green(`Written ${file}.json`))
    })(),
    (async () => {
      await writeGzip(`${file}.json`, json)
      console.log(chalk.green(`Written ${file}.json.gz`))
    })(),
    (async () => {
      await writeFile(`${file}.buffer`, buffer)
      console.log(chalk.green(`Written ${file}.buffer`))
    })(),
    (async () => {
      await writeGzip(`${file}.buffer`, buffer)
      console.log(chalk.green(`Written ${file}.buffer.gz`))
    })()
  ])
}

async function writeGeographyProperties ({
  output,
  identifier,
  builder,
  projection
}) {
  const options = { projection }

  // Create properties
  console.log(chalk.cyan('Creating properties for geography'))
  const properties = {
    bounds: builder.bounds(options),
    area: builder.area(options),
    centroid: builder.centroid(options),
    poleOfInaccessibility: builder.poleOfInaccessibility(options)
  }

  // Write properties
  const directory = path.resolve(output, identifier)
  await mkdir(directory)
  await writeFiles(path.resolve(directory, 'properties.json'), properties)
}

async function writeGeographyGeometries ({
  output,
  identifier,
  builder,
  projection,
  excludes
}) {
  const options = { projection, excludes }

  // Create geometries
  console.log(chalk.cyan('Creating shape for geography'))
  const shape = builder.geographyShapeGeometry(options)
  console.log(chalk.cyan('Creating outline for geography'))
  const outline = builder.geographyOutlineGeometry(options)
  console.log(chalk.cyan('Creating subdivision for geography'))
  const subdivision = builder.geographySubdivisionGeometry(options)

  // Write geometries
  const directory = path.resolve(output, identifier)
  await mkdir(directory)
  await Promise.all([
    writeGeometry(path.resolve(directory, 'shape'), shape),
    writeGeometry(path.resolve(directory, 'outline'), outline),
    writeGeometry(path.resolve(directory, 'subdivision'), subdivision)
  ])
}

async function writeGeography (options) {
  await Promise.all([
    writeGeographyProperties(options),
    writeGeographyGeometries(options)
  ])
}

async function writeDivisionsProperties ({
  catalog,
  output,
  identifier,
  builder,
  projection,
  level
}) {
  const codes = catalog[level].map(entry => entry.code)

  // Create properties
  console.log(chalk.cyan(`Creating properties for ${level}`))
  const properties = codes.reduce((result, code) => {
    const options = { projection, level, code }
    return {
      ...result,
      [code]: {
        bounds: builder.bounds(options),
        area: builder.area(options),
        centroid: builder.centroid(options),
        poleOfInaccessibility: builder.poleOfInaccessibility(options)
      }
    }
  }, {})

  // Write properties
  const directory = path.resolve(output, identifier, level)
  await mkdir(directory)
  await writeFiles(path.resolve(directory, 'properties.json'), properties)
}

async function writeDivisionsGeometries ({
  catalog,
  output,
  identifier,
  builder,
  projection,
  level,
  excludes
}) {
  const codes = catalog[level].map(entry => entry.code)

  // Create geometries
  console.log(chalk.cyan(`Creating shapes for ${level}`))
  const shapes = codes.reduce((result, code) => {
    const options = { projection, level, code, excludes }
    return {
      ...result,
      [code]: builder.divisionShapeGeometry(options)
    }
  }, {})
  console.log(chalk.cyan(`Creating outlines for ${level}`))
  const outlines = codes.reduce((result, code) => {
    const options = { projection, level, code, excludes }
    return {
      ...result,
      [code]: builder.divisionOutlineGeometry(options)
    }
  }, {})
  console.log(chalk.cyan(`Creating borders for ${level}`))
  const borders = codes.reduce((result, code) => {
    const options = { projection, level, code, excludes }
    return {
      ...result,
      [code]: builder.divisionBorderGeometry(options)
    }
  }, {})
  console.log(chalk.cyan(`Creating subdivisions for ${level}`))
  const subdivisions = codes.reduce((result, code) => {
    const options = { projection, level, code, excludes }
    return {
      ...result,
      [code]: builder.divisionSubdivisionGeometry(options)
    }
  }, {})

  // Write geometries
  const directory = path.resolve(output, identifier, level)
  await mkdir(directory)
  await Promise.all([
    writeGeometries(path.resolve(directory, 'shapes'), shapes),
    writeGeometries(path.resolve(directory, 'outlines'), outlines),
    writeGeometries(path.resolve(directory, 'borders'), borders),
    writeGeometries(path.resolve(directory, 'subdivisions'), subdivisions)
  ])
}

async function writeDivisions (options) {
  const { levels } = options
  await Promise.all([].concat(levels.map(level => {
    return [
      writeDivisionsProperties({ ...options, level }),
      writeDivisionsGeometries({ ...options, level })
    ]
  })))
}

async function main ({
  catalog,
  topojson,
  output,
  identifier,
  levels = [],
  excludes,
  ...rest
}) {
  const projection = new Projection(rest)
  const outputDir = path.resolve(output, projection.hash)
  await mkdir(outputDir)

  // Input files
  let catalogFile
  let topojsonFile
  if (catalog) {
    catalogFile = path.resolve(catalog)
  } else {
    catalogFile = path.resolve(output, `${identifier}.json`)
  }
  if (topojson) {
    topojsonFile = path.resolve(topojson)
  } else {
    topojsonFile = path.resolve(output, `${identifier}.topojson`)
  }
  if (!await fs.existsSync(catalogFile)) {
    throw new Error(`No such file or directory: ${catalogFile}`)
  }
  if (!await fs.existsSync(topojsonFile)) {
    throw new Error(`No such file or directory: ${topojsonFile}`)
  }
  if ((await stat(catalogFile)).isDirectory()) {
    throw new Error(`${catalogFile} is a directory`)
  }
  if ((await stat(topojsonFile)).isDirectory()) {
    throw new Error(`${topojsonFile} is a directory`)
  }

  // Configurations
  console.log(chalk.magenta(`Catalog File: ${catalogFile}`))
  console.log(chalk.magenta(`TopoJSON File: ${topojsonFile}`))
  console.log(chalk.magenta(`Output Directory: ${outputDir}`))
  console.log(chalk.magenta(`Geography Identifier: ${identifier}`))
  console.log(chalk.magenta(`Division Levels: ${levels}`))

  // Write geometries
  const builder = new GeographyBuilder([].concat(levels))
  await builder.init(JSON.parse(await readFile(topojsonFile, 'utf-8')))
  const options = {
    catalog: JSON.parse(await readFile(catalogFile, 'utf-8')),
    output: outputDir,
    identifier,
    builder,
    projection,
    levels: [].concat(levels),
    excludes: excludes && excludes.split(',').reduce((excludes, entry) => {
      const [level, code] = entry.split(':')
      if (!excludes[level]) {
        excludes[level] = [code]
      } else {
        excludes[level].push(code)
      }
      return excludes
    }, {})
  }
  await Promise.all([
    writeGeography(options),
    writeDivisions(options)
  ])
}

export default async function project (options) {
  const levels = options.levels.split(',')
  let origin
  if (options.origin) {
    origin = JSON.parse(options.origin)
  }
  let rotates
  if (options.rotates) {
    rotates = JSON.parse(options.rotates)
  }
  await main({
    ...options, levels, origin, rotates
  })
}

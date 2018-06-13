// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

require('babel-core/register')
require('babel-polyfill')

const chalk = require('chalk')
const minimist = require('minimist')
const path = require('path')

const args = minimist(process.argv.slice(2))
const action = require(path.resolve(__dirname, 'src', args._.shift())).default
let preset = {}
try {
  preset = require(path.resolve(__dirname, 'src/preset', args.preset))
} catch (error) {}

async function main () {
  let result
  try {
    result = await action(Object.assign({}, preset, args))
  } catch (error) {
    console.error(chalk.red(error.stack))
    process.exit(1)
  }
  if (result !== undefined) {
    console.log(result)
  }
}

main()

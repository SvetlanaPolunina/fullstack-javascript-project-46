#! /usr/bin/env node

import { Command } from 'commander'
import packageJson from '../package.json' with { type: 'json' }

const program = new Command
program
  .version(`${packageJson.version}`)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')

program.parse()

const [path1, path2] = program.args
console.log(`format: ${program.opts().format ?? 'unknown'}`)
console.log(`filepath1: ${path1}`)
console.log(`filepath2: ${path2}`)

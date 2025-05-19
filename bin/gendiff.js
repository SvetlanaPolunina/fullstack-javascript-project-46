#! /usr/bin/env node

import { Command } from 'commander'
import packageJson from '../package.json' with { type: 'json' }

const program = new Command
program
  .version(`${packageJson.version}`)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')

program.parse()

console.log(`format: ${program.opts().format ?? 'unknown'}`)
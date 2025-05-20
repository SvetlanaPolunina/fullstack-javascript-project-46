#! /usr/bin/env node

import { Command } from 'commander'
import packageJson from '../package.json' with { type: 'json' }
import path from 'path'
import { cwd } from 'process'

const program = new Command
program
  .version(`${packageJson.version}`)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, options) => {
    const cwdpath = cwd()
    const absoluteFilepath1 = path.resolve(cwdpath, filepath1)
    const absoluteFilepath2 = path.resolve(cwdpath, filepath2)
    console.log(`format: ${options.format ?? 'no option'}`)
    console.log(`filepath1: ${absoluteFilepath1}`)
    console.log(`filepath2: ${absoluteFilepath2}`)
  })

program.parse()



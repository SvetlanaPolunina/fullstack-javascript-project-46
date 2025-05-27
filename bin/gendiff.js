#! /usr/bin/env node

import { Command } from 'commander'
import packageJson from '../package.json' with { type: 'json' }
import path from 'path'
import { cwd } from 'process'
import genDiff from '../src/index.js'

const program = new Command()
program
  .version(`${packageJson.version}`)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const absoluteFilepath1 = path.resolve(cwd(), filepath1)
    const absoluteFilepath2 = path.resolve(cwd(), filepath2)
    const diff = genDiff(absoluteFilepath1, absoluteFilepath2)
    console.log(diff)
  })

program.parse()

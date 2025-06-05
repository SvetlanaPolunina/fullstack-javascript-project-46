#! /usr/bin/env node

import { Command } from 'commander'
import packageJson from '../package.json' with { type: 'json' }
import genDiff from '../src/index.js'

const program = new Command()

program
  .version(`${packageJson.version}`)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2, program.opts().format)
    console.log(diff)
  })

program.parse()

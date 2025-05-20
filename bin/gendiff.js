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
  .action((filepath1, filepath2, options) => {
    console.log(`format: ${options.format ?? 'no option'}`)
    console.log(`filepath1: ${filepath1}`)
    console.log(`filepath2: ${filepath2}`)
  })

program.parse()



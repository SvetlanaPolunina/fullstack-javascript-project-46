#! /usr/bin/env node

import app from '../src/cli.js'
import { Command } from 'commander'

const program = new Command
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')

program.parse()

app()

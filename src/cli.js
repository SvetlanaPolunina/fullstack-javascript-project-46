import { Command } from 'commander'
import packageJson from '../package.json' with { type: 'json' }
import genDiff from './index.js'

const cli = () => {
  const program = new Command()

  program
    .version(`${packageJson.version}`)
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format', 'stylish')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filepath1, filepath2, options) => {
      const diff = genDiff(filepath1, filepath2, options.format)
      console.log(diff)
    })

  program.parse()
}

export default cli

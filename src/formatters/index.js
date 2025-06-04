import formatStylish from './stylish-formatter.js'
import formatJSON from './json-formatter.js'
import { isObj } from './stylish-formatter.js'

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylish
    case 'json':
      return formatJSON
    default:
      throw new Error(`${formatName} output format is not supported`)
  }
}

export { getFormatter as default, isObj }

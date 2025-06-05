import formatStylish, { isObj } from './stylish-formatter.js'
import formatJSON from './json-formatter.js'
import formatPlain from './plain-formatter.js'

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJSON,
}

const getFormatter = (formatName) => {
  if (!Object.hasOwn(formatters, formatName)) {
    throw new Error(`Unknown formatName: ${formatName}`)
  }
  return formatters[formatName]
}

export { getFormatter as default, isObj }

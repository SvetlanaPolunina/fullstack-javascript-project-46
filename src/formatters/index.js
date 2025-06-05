import formatStylish from './stylish-formatter.js'
import formatJSON from './json-formatter.js'
import formatPlain from './plain-formatter.js'

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJSON,
}

const getFormatter = (format) => {
  console.log(`!!!!!!!!!!${format}`)
  if (!Object.hasOwn(formatters, format)) {
    throw new Error(`Unknown formatName: ${format}`)
  }
  return formatters[format]
}

export default getFormatter

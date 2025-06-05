import formatStylish from './stylish-formatter.js'
import formatJSON from './json-formatter.js'
import formatPlain from './plain-formatter.js'

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJSON,
}

const getFormatter = (format) => {
  if (!Object.hasOwn(formatters, format)) {
    return formatStylish
  }
  return formatters[format]
}

export default getFormatter

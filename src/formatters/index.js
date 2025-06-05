import formatStylish from './stylish-formatter.js'
import formatJSON from './json-formatter.js'
import formatPlain from './plain-formatter.js'

const defaultFormat = 'stylish'

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJSON,
}

const getFormatter = (format) => {
  if (!Object.hasOwn(formatters, format)) {
    return formatters[defaultFormat]
  }
  return formatters[format]
}

export default getFormatter

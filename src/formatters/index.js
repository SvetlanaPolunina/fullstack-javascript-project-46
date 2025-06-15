import formatStylish from './stylish-formatter.js'
import formatJSON from './json-formatter.js'
import formatPlain from './plain-formatter.js'

const defaultFormat = 'stylish'

const getFormatter = (format) => {
  const formattersMap = {
    stylish: formatStylish,
    plain: formatPlain,
    json: formatJSON,
  }

  if (!Object.hasOwn(formattersMap, format)) {
    return formattersMap[defaultFormat]
  }
  return formattersMap[format]
}

export default getFormatter

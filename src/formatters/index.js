import formatStylis from './stylish-formatter.js'

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylis
    default:
      throw new Error(formatName + ' output format is not supported')
  }
}

export default getFormatter

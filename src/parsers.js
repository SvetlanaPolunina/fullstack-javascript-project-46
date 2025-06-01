import yaml from 'js-yaml'

const parseJSON = rawData => JSON.parse(rawData)

const parseYAML = rawData => yaml.load(rawData)

const getParser = (fileFormat) => {
  switch (fileFormat) {
    case '.json':
      return parseJSON
    case '.yaml':
    case '.yml':
      return parseYAML
    default:
      throw new Error(`${fileFormat} file format is not supported`)
  }
}

export default getParser

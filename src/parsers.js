import yaml from 'js-yaml'

const parseJSON = rawData => JSON.parse(rawData)

const parseYAML = rawData => yaml.load(rawData)

const parsers = {
  json: parseJSON,
  yaml: parseYAML,
  yml: parseYAML,
}

const getParser = (fileFormat) => {
  if (!Object.hasOwn(parsers, fileFormat)) {
    throw new Error(`Unknown file format: ${fileFormat}`)
  }
  return parsers[fileFormat]
}

export default getParser

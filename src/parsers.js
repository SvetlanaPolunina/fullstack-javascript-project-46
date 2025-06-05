import yaml from 'js-yaml'

const parsers = {
  json: rawData => JSON.parse(rawData),
  yaml: rawData => yaml.load(rawData),
  yml: rawData => yaml.load(rawData),
}

const getParser = (fileFormat) => {
  if (!Object.hasOwn(parsers, fileFormat)) {
    throw new Error(`Unknown file format: ${fileFormat}`)
  }
  return parsers[fileFormat]
}

export default getParser

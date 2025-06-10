import yaml from 'js-yaml'

const parsersMap = {
  json: rawData => JSON.parse(rawData),
  yaml: rawData => yaml.load(rawData),
  yml: rawData => yaml.load(rawData),
}

const getParser = (fileFormat) => {
  if (!Object.hasOwn(parsersMap, fileFormat)) {
    throw new Error(`Unknown file format: ${fileFormat}`)
  }
  return parsersMap[fileFormat]
}

export default getParser

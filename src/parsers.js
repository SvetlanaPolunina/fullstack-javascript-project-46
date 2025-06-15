import yaml from 'js-yaml'

const getParser = (fileFormat) => {
  const parsersMap = {
    json: rawData => JSON.parse(rawData),
    yaml: rawData => yaml.load(rawData),
    yml: rawData => yaml.load(rawData),
  }

  if (!Object.hasOwn(parsersMap, fileFormat)) {
    throw new Error(`Unknown file format: ${fileFormat}`)
  }
  return parsersMap[fileFormat]
}

export default getParser

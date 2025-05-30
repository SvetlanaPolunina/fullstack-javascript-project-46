import yaml from 'js-yaml'

export const parseJSON = rawData => JSON.parse(rawData)

export const parseYAML = rawData => yaml.load(rawData)

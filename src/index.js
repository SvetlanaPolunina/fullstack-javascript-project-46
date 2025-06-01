import { readFileSync } from 'fs'
import path from 'path'
import _ from 'lodash'
import { parseJSON, parseYAML } from './parsers.js'

const genDiffLine = (key, diffData) => {
  const status = diffData[key].status
  switch (status) {
    case 'added':
      return `  + ${key}: ${diffData[key].value}`
    case 'removed':
      return `  - ${key}: ${diffData[key].value}`
    case 'unchanged':
      return `    ${key}: ${diffData[key].value}`
    case 'updated':
      return `  - ${key}: ${diffData[key].oldValue}\n  + ${key}: ${diffData[key].newValue}`
  }
}

const formatDiff = (data) => {
  const keys = Object.keys(data)
  const sortedKeys = _.sortBy(keys)

  const formatedDiff = sortedKeys
    .reduce((acc, key) => [...acc, genDiffLine(key, data)], [])
    .join('\n')

  return `{\n${formatedDiff}\n}`
}

const getFileFormat = filepath => path.extname(filepath)

const getFullFilePath = filepath => path.resolve(process.cwd(), filepath)

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

const readFile = fullFilePath => readFileSync(fullFilePath, 'utf8').toString()

const getData = (filepath) => {
  const fileFormat = getFileFormat(filepath)
  const parse = getParser(fileFormat)
  const fullFilePath = getFullFilePath(filepath)

  const rawData = readFile(fullFilePath)
  const parsedData = parse(rawData)

  return parsedData
}

const genDiffData = (data1, data2) => {
  const dataKeys1 = Object.keys(data1)
  const dataKeys2 = Object.keys(data2)
  const diffKeys = _.union(dataKeys1, dataKeys2)

  const diff = diffKeys.reduce((acc, key) => {
    if (!Object.hasOwn(data1, key)) {
      return { ...acc, [key]: { status: 'added', value: data2[key] } }
    }
    if (!Object.hasOwn(data2, key)) {
      return { ...acc, [key]: { status: 'removed', value: data1[key] } }
    }
    if (data1[key] === data2[key]) {
      return { ...acc, [key]: { status: 'unchanged', value: data1[key] } }
    }
    return {
      ...acc,
      [key]: {
        status: 'updated',
        oldValue: data1[key],
        newValue: data2[key],
      },
    }
  }, {})

  return diff
}

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1)
  const data2 = getData(filepath2)

  const diffData = genDiffData(data1, data2)
  const formatedDiff = formatDiff(diffData)

  return formatedDiff
}

export default genDiff

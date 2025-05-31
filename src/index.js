import { readFileSync } from 'fs'
import path from 'path'
import _ from 'lodash'
import { parseJSON, parseYAML } from './parsers.js'

const readFile = absoluteFilepath => readFileSync(absoluteFilepath, 'utf8').trim()

const genDiffData = (oldData, newData) => {
  const oldDataKeys = Object.keys(oldData)
  const newDataKeys = Object.keys(newData)
  const diffKeys = _.union(oldDataKeys, newDataKeys)

  const diff = diffKeys.reduce((acc, key) => {
    if (!Object.hasOwn(oldData, key)) {
      return { ...acc, [key]: { status: 'added', value: newData[key] } }
    }
    if (!Object.hasOwn(newData, key)) {
      return { ...acc, [key]: { status: 'removed', value: oldData[key] } }
    }
    if (oldData[key] === newData[key]) {
      return { ...acc, [key]: { status: 'unchanged', value: oldData[key] } }
    }
    return {
      ...acc,
      [key]: {
        status: 'updated',
        oldValue: oldData[key],
        newValue: newData[key],
      },
    }
  }, {})

  return diff
}

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

const getFileFormat = filepath => path.extname(filepath)

const getData = (absoluteFilepath) => {
  const fileFormat = getFileFormat(absoluteFilepath)
  const parse = getParser(fileFormat)
  const rawData = readFile(absoluteFilepath)
  const parsedData = parse(rawData)
  return parsedData
}

const genDiff = (oldFileAbsolutePath, newFileAbsolutePath) => {
  const oldData = getData(oldFileAbsolutePath)
  const newData = getData(newFileAbsolutePath)

  const diffData = genDiffData(oldData, newData)
  const formatedDiff = formatDiff(diffData)

  return formatedDiff
}

export default genDiff

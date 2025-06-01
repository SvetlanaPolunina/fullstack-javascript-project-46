import { readFileSync } from 'fs'
import path from 'path'
import _ from 'lodash'
import getParser from './parsers.js'
import getFormatter from './formatters/index.js'

const getFileFormat = filepath => path.extname(filepath)

const getFullFilePath = filepath => path.resolve(process.cwd(), filepath)

const readFile = fullFilePath => readFileSync(fullFilePath, 'utf8').trim()

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

const genDiff = (filepath1, filepath2, formatName) => {
  const data1 = getData(filepath1)
  const data2 = getData(filepath2)

  const diffData = genDiffData(data1, data2)

  const formatDiff = getFormatter(formatName)
  const formatedDiff = formatDiff(diffData)

  return formatedDiff
}

export default genDiff

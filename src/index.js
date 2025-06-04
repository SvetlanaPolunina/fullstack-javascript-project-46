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

const isObj = value => (_.isObject(value) && (value !== null))

const genDiffData = (data1, data2) => {
  const data1Keys = Object.keys(data1)
  const data2Keys = Object.keys(data2)
  const diffKeys = _.union(data1Keys, data2Keys)
  const sortedKey = _.sortBy(diffKeys)

  const diffData = sortedKey.map((key) => {
    const oldValue = structuredClone(data1[key])
    const newValue = structuredClone(data2[key])

    if (!Object.hasOwn(data1, key)) {
      return { name: key, status: 'added', value: newValue }
    }
    if (!Object.hasOwn(data2, key)) {
      return { name: key, status: 'removed', value: oldValue }
    }
    if (isObj(oldValue) && isObj(newValue)) {
      return { name: key, status: 'nested', diff: genDiffData(oldValue, newValue) }
    }
    if (oldValue === newValue) {
      return { name: key, status: 'unchanged', value: oldValue }
    }
    return { name: key, status: 'updated', oldValue, newValue }
  })

  return diffData
}

const genDiff = (filepath1, filepath2, formatName) => {
  const data1 = getData(filepath1)
  const data2 = getData(filepath2)
  const formatDiff = getFormatter(formatName)

  const diffTree = {
    name: `diff between files ${filepath1} ${filepath2}`,
    diff: genDiffData(data1, data2),
  }
  const formatedDiff = formatDiff(diffTree)

  return formatedDiff
}

export { genDiff as default, isObj }

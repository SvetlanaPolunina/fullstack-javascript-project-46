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
// проверить, что это именно объект, а не массив, и не null
const isObj = value => (_.isObject(value) && (value !== null) && (!Array.isArray(value)))

const isEqualArrays = (value1, value2) => ((Array.isArray(value1) && Array.isArray(value2))
  && (_.isEqual(value1, value2)))

const genDiffTree = (data1, data2) => {
  const data1Keys = Object.keys(data1)
  const data2Keys = Object.keys(data2)
  const diffKeys = _.union(data1Keys, data2Keys)
  const sortedKey = _.sortBy(diffKeys)

  const diffTree = sortedKey.map((key) => {
    const oldValue = structuredClone(data1[key])
    const newValue = structuredClone(data2[key])

    if (!Object.hasOwn(data1, key)) {
      return { property: key, status: 'added', value: newValue }
    }
    if (!Object.hasOwn(data2, key)) {
      return { property: key, status: 'removed', value: oldValue }
    }
    if (isObj(oldValue) && isObj(newValue)) {
      return { property: key, status: 'nested', diff: genDiffTree(oldValue, newValue) }
    }
    if ((oldValue === newValue) || isEqualArrays(oldValue, newValue)) {
      return { property: key, status: 'unchanged', value: oldValue }
    }
    return { property: key, status: 'updated', oldValue, newValue }
  })

  return diffTree
}

const genDiff = (filepath1, filepath2, formatName) => {
  const data1 = getData(filepath1)
  const data2 = getData(filepath2)
  const formatDiff = getFormatter(formatName)

  const diffTree = {
    name: `diff between files ${filepath1} ${filepath2}`,
    diff: genDiffTree(data1, data2),
  }
  const formatedDiff = formatDiff(diffTree)

  return formatedDiff
}

export default genDiff

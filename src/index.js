import { readFileSync } from 'fs'
import path from 'path'
import getParser from './parsers.js'
import getFormatter from './formatters/index.js'
import genDiffTree from './diffTree.js'

const getFileFormat = filepath => path.extname(filepath).split('.').pop()

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

const genDiff = (filepath1, filepath2, formatName) => {
  const data1 = getData(filepath1)
  const data2 = getData(filepath2)
  const formatDiff = getFormatter(formatName)

  const diffTree = genDiffTree(data1, data2)
  const formatedDiff = formatDiff(diffTree)

  return formatedDiff
}

export default genDiff

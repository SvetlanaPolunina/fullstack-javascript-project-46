import fs from 'fs'
import { readFileSync } from 'fs'
import parseJson from './parsers.js'

const readFile = absoluteFilepath => readFileSync(absoluteFilepath, 'utf8').trim()

const genDiff = (absolutePathOldFile, absolutePathNewFile) => {
  const rawOldData = readFile(absolutePathOldFile)
  const rawNewData = readFile(absolutePathNewFile)

  const parsedOldData = parseJson(rawOldData)
  const parsedNewData = parseJson(rawNewData)

  const diffData = genDiffData(parsedOldData, parsedNewData)
  const formatedDiff = formatInternalDiff(diffData)

  return formatedDiff
}

export { genDiff as default, readFile }

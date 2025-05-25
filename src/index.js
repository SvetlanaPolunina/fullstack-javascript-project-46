import { readFileSync } from 'fs'
import { parseJson } from './parsers.js'
import _ from 'lodash'

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
    if (oldData[key] !== newData[key]) {
      return {
        ...acc,
        [key]: {
          status: 'updated',
          oldValue: oldData[key],
          newValue: newData[key]
        }
      }
    }

    return { ...acc }
  }, {})

  return diff
}

const formatInternalDiff = data => {
  return data
}

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

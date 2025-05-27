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

const genDiff = (absolutePathOldFile, absolutePathNewFile) => {
  const rawOldData = readFile(absolutePathOldFile)
  const rawNewData = readFile(absolutePathNewFile)

  const parsedOldData = parseJson(rawOldData)
  const parsedNewData = parseJson(rawNewData)

  const diffData = genDiffData(parsedOldData, parsedNewData)
  const formatedDiff = formatDiff(diffData)

  return formatedDiff
}

export { genDiff as default, readFile }

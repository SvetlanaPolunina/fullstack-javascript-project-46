import _ from 'lodash'

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

const formatStylish = (data) => {
  const keys = Object.keys(data)
  const sortedKeys = _.sortBy(keys)

  const formatedDiff = sortedKeys
    .reduce((acc, key) => [...acc, genDiffLine(key, data)], [])
    .join('\n')

  return `{\n${formatedDiff}\n}`
}

export default formatStylish

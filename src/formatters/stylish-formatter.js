import _ from 'lodash'

const depthStart = 1

const shiftMap = {
  symbol: ' ',
  amount: 4,
}

const diffShiftLeft = 2

const getKeyShift = (depth, map, shiftLeft = 0) => {
  return `${map.symbol.repeat(depth * map.amount - shiftLeft)}`
}

const getBraceShift = (depth, shiftMap) => {
  return `${shiftMap.symbol.repeat((depth - 1) * shiftMap.amount)}`
}

const formatData = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return data
  }
  const keyShift = getKeyShift(depth, shiftMap)
  const braceShift = getBraceShift(depth, shiftMap)

  const keys = Object.keys(data)
  const sortedKey = _.sortBy(keys)

  const formatedKeys = sortedKey.map((key) => {
    if (!_.isPlainObject(data[key])) {
      const formatedKey = `${keyShift}${key}: ${data[key]}`
      return formatedKey
    }

    const formatedNestedKey = `${keyShift}${key}: ${formatData(data[key], depth + 1)}`
    return formatedNestedKey
  })

  const formatedData = formatedKeys.join('\n')

  return `{\n${formatedData}\n${braceShift}}`
}

const getDiffLineCreater = (status) => {
  const statusMap = {
    added: (key, keyShift, depth) => `${keyShift}+ ${key.name}: ${formatData(key.value, depth + 1)}`,
    removed: (key, keyShift, depth) => `${keyShift}- ${key.name}: ${formatData(key.value, depth + 1)}`,
    unchanged: (key, keyShift, depth) => `${keyShift}  ${key.name}: ${formatData(key.value, depth + 1)}`,
    updated: (key, keyShift, depth) => `${keyShift}- ${key.name}: ${formatData(key.oldValue, depth + 1)}\n${keyShift}+ ${key.name}: ${formatData(key.newValue, depth + 1)}`,
    nested: (key, keyShift, depth, iter) => `${keyShift}  ${key.name}: ${iter(key, depth + 1)}`,
  }

  if (!Object.hasOwn(statusMap, status)) {
    throw new Error(`Unknown status: ${status}`)
  }
  return statusMap[status]
}

const formatStylish = (data) => {
  const iter = (tree, depth) => {
    const keyShift = getKeyShift(depth, shiftMap, diffShiftLeft)
    const braceShift = getBraceShift(depth, shiftMap)

    const diffs = tree.children

    const formatedDiffs = diffs.map((key) => {
      const genDiffLine = getDiffLineCreater(key.status)
      return genDiffLine(key, keyShift, depth, iter)
    })

    const formatedDiff = formatedDiffs.join('\n')
    return `{\n${formatedDiff}\n${braceShift}}`
  }

  return iter(data, depthStart)
}

export default formatStylish

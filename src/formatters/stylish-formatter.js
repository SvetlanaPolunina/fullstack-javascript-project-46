import _ from 'lodash'

const shiftSymbol = ' '
const shiftAmount = 4
const shiftLeft = 2

const formatValue = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value
  }

  const keys = Object.keys(value)
  const sortedKey = _.sortBy(keys)
  const keyShift = `${shiftSymbol.repeat(depth * shiftAmount)}`
  const braceShift = `${shiftSymbol.repeat((depth - 1) * shiftAmount)}`

  const formatedKeys = sortedKey.map((key) => {
    if (!_.isPlainObject(value[key])) {
      return `${keyShift}${key}: ${value[key]}`
    }
    return `${keyShift}${key}: ${formatValue(value[key], depth + 1)}`
  })

  return `{\n${formatedKeys.join('\n')}\n${braceShift}}`
}

const formatStylish = (data) => {
  const iter = (tree, depth) => {
    const keyShift = `${shiftSymbol.repeat(depth * shiftAmount - shiftLeft)}`
    const braceShift = `${shiftSymbol.repeat((depth - 1) * shiftAmount)}`
    const diffs = tree.children

    const formatedDiffs = diffs.map((key) => {
      switch (key.status) {
        case 'added':
          return `${keyShift}+ ${key.name}: ${formatValue(key.value, depth + 1)}`
        case 'removed':
          return `${keyShift}- ${key.name}: ${formatValue(key.value, depth + 1)}`
        case 'unchanged':
          return `${keyShift}  ${key.name}: ${formatValue(key.value, depth + 1)}`
        case 'updated':
          return `${keyShift}- ${key.name}: ${formatValue(key.oldValue, depth + 1)}\n${keyShift}+ ${key.name}: ${formatValue(key.newValue, depth + 1)}`
        case 'nested':
          return `${keyShift}  ${key.name}: ${iter(key, depth + 1)}`
        default:
          throw new Error(`Unknown key status ${key.status}`)
      }
    })

    return `{\n${formatedDiffs.join('\n')}\n${braceShift}}`
  }

  return iter(data, 1)
}

export default formatStylish

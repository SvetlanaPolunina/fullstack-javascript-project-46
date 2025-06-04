import _ from 'lodash'

const shiftSymbol = ' '
const shiftAmount = 4
const shiftLeft = 2

const isObj = value => (typeof (value) === 'object') && (value !== null)

const formatObject = (obj, depth) => {
  const keys = Object.keys(obj)
  const sortedKey = _.sortBy(keys)
  const keyShift = `${shiftSymbol.repeat(depth * shiftAmount)}`
  const braceShift = `${shiftSymbol.repeat((depth - 1) * shiftAmount)}`

  const formatedKeys = sortedKey.map((key) => {
    if (!isObj(obj[key])) {
      return `${keyShift}${key}: ${obj[key]}`
    }
    return `${keyShift}${key}: ${formatObject(obj[key], depth + 1)}`
  })

  return `{\n${formatedKeys.join('\n')}\n${braceShift}}`
}

const formatValue = (value, depth) => {
  if (isObj(value)) {
    return formatObject(value, depth)
  }
  return value
}

const formatStylish = (data) => {
  const iter = (tree, depth) => {
    const keyShift = `${shiftSymbol.repeat(depth * shiftAmount - shiftLeft)}`
    const braceShift = `${shiftSymbol.repeat((depth - 1) * shiftAmount)}`
    const diffs = tree.diff
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

export { formatStylish as default, isObj }

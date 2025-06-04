const isObj = value => (typeof (value) === 'object') && (value !== null)

const formatValue = (value) => {
  if (isObj(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }

  return value
}

const formatPlain = (data) => {
  const iter = (tree, propertyPath) => {
    const diffs = tree.diff
    const formatedDiffs = diffs
      .filter(key => key.status !== 'unchanged')
      .map((key) => {
        const name = `${propertyPath}${key.name}`
        const status = key.status

        switch (key.status) {
          case 'added':
            return `Property '${name}' was ${status} with value: ${formatValue(key.value)}`
          case 'removed':
            return `Property '${name}' was ${status}`
          case 'updated':
            return `Property '${name}' was ${status}. From ${formatValue(key.oldValue)} to ${formatValue(key.newValue)}`
          case 'nested':
            return iter(key, `${name}.`)
          default:
            throw new Error(`Unknown key status ${status}`)
        }
      })

    return formatedDiffs.join('\n')
  }

  return iter(data, '')
}

export default formatPlain

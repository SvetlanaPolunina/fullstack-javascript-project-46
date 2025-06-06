import _ from 'lodash'

const formatValue = (value) => {
  if (_.isPlainObject(value) || Array.isArray(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }

  return value
}

const formatPlain = (data) => {
  const iter = (tree, propertyPath) => {
    const diffs = tree.children

    const formatedDiffs = diffs
      .filter(key => key.status !== 'unchanged')
      .map((key) => {
        const statusMap = {
          added: key => `Property '${propertyPath}${key.name}' was ${key.status} with value: ${formatValue(key.value)}`,
          removed: key => `Property '${propertyPath}${key.name}' was ${key.status}`,
          updated: key => `Property '${propertyPath}${key.name}' was ${key.status}. From ${formatValue(key.oldValue)} to ${formatValue(key.newValue)}`,
          nested: key => iter(key, `${propertyPath}${key.name}.`),
        }

        const getDiffLineCreater = (status, map) => {
          if (!Object.hasOwn(map, status)) {
            throw new Error(`Unknown status: ${status}`)
          }
          return map[status]
        }

        const genDiffLine = getDiffLineCreater(key.status, statusMap)
        return genDiffLine(key)
      })

    return formatedDiffs.join('\n')
  }

  return iter(data, '')
}

export default formatPlain

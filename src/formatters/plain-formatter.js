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

const statusMap = {
  added: (key, propertyPath) => `Property '${propertyPath}${key.name}' was ${key.status} with value: ${formatValue(key.value)}`,
  removed: (key, propertyPath) => `Property '${propertyPath}${key.name}' was ${key.status}`,
  updated: (key, propertyPath) => `Property '${propertyPath}${key.name}' was ${key.status}. From ${formatValue(key.oldValue)} to ${formatValue(key.newValue)}`,
  nested: (key, propertyPath, iter) => iter(key, `${propertyPath}${key.name}.`),
}

const getDiffLineCreater = (status) => {
  if (!Object.hasOwn(statusMap, status)) {
    throw new Error(`Unknown status: ${status}`)
  }
  return statusMap[status]
}

const formatPlain = (data) => {
  const iter = (tree, propertyPath) => {
    const diffs = tree.children

    const formatedDiffs = diffs
      .filter(key => key.status !== 'unchanged')
      .map((key) => {
        const genDiffLine = getDiffLineCreater(key.status)
        const diffLine = genDiffLine(key, propertyPath, iter)
        return diffLine
      })

    return formatedDiffs.join('\n')
  }

  return iter(data, '')
}

export default formatPlain

import _ from 'lodash'

const genDiffs = (data1, data2) => {
  const data1Keys = Object.keys(data1)
  const data2Keys = Object.keys(data2)
  const diffKeys = _.union(data1Keys, data2Keys)
  const sortedDiffKeys = _.sortBy(diffKeys)

  const diffs = sortedDiffKeys.map((key) => {
    const oldValue = structuredClone(data1[key])
    const newValue = structuredClone(data2[key])

    if (!Object.hasOwn(data1, key)) {
      return { name: key, status: 'added', value: newValue }
    }
    if (!Object.hasOwn(data2, key)) {
      return { name: key, status: 'removed', value: oldValue }
    }
    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      return { name: key, status: 'nested', children: genDiffs(oldValue, newValue) }
    }
    if (oldValue === newValue) {
      return { name: key, status: 'unchanged', value: oldValue }
    }
    return { name: key, status: 'updated', oldValue, newValue }
  })

  return diffs
}

const genDiffTree = (data1, data2) => {
  const diffTree = {
    type: 'root',
    children: genDiffs(data1, data2),
  }

  return diffTree
}

export default genDiffTree

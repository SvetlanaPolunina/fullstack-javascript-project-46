import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFixture = filename => fs.readFileSync(getFixturePath(filename), 'utf-8').trim()

const files = [
  ['file1.json', 'file2.json'],
  ['file1.yaml', 'file2.yaml'],
]

test.each(files)('genDiff\'s stylish format', (filename1, filename2) => {
  const fixturePath1 = getFixturePath(filename1)
  const fixturePath2 = getFixturePath(filename2)
  const actualDiff = genDiff(fixturePath1, fixturePath2, 'stylish')
  const expectedDiff = readFixture('expected-stylish-diff.txt')

  expect(actualDiff).toBe(expectedDiff)
})

test.each(files)('genDiff\'s plain format', (filename1, filename2) => {
  const fixturePath1 = getFixturePath(filename1)
  const fixturePath2 = getFixturePath(filename2)
  const actualDiff = genDiff(fixturePath1, fixturePath2, 'plain')
  const expectedDiff = readFixture('expected-plain-diff.txt')

  expect(actualDiff).toBe(expectedDiff)
})

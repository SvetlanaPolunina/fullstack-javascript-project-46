import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFixture = filename => fs.readFileSync(getFixturePath(filename), 'utf-8').trim()

test.each([
  ['plain-file1.json', 'plain-file2.json'],
  ['plain-file1.yaml', 'plain-file2.yaml'],
])('genDiff\'s plain files stylish format', (filename1, filename2) => {
  const fixturePath1 = getFixturePath(filename1)
  const fixturePath2 = getFixturePath(filename2)
  const recievedDiff = genDiff(fixturePath1, fixturePath2, 'stylish')
  const expectedDiff = readFixture('plain-expected-diff.txt')

  expect(recievedDiff).toBe(expectedDiff)
})

test.each([
  ['file1.json', 'file2.json'],
  ['file1.yaml', 'file2.yaml'],
])('genDiff\'s nested files stylish format', (filename1, filename2) => {
  const fixturePath1 = getFixturePath(filename1)
  const fixturePath2 = getFixturePath(filename2)
  const recievedDiff = genDiff(fixturePath1, fixturePath2, 'stylish')
  const expectedDiff = readFixture('expected-diff.txt')

  expect(recievedDiff).toBe(expectedDiff)
})

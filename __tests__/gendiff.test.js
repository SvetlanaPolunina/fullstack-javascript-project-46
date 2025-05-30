import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFixture = filename => fs.readFileSync(getFixturePath(filename), 'utf-8').trim()

test.each([
  ['file1.json', 'file2.json'],
  ['file1.yaml', 'file2.yaml'],
  ['file1.json', 'file2.yaml'],
])('genDiff\'s main flow', (filename1, filename2) => {
  const fixturePath1 = getFixturePath(filename1)
  const fixturePath2 = getFixturePath(filename2)
  const recievedDiff = genDiff(fixturePath1, fixturePath2)
  const expectedDiff = readFixture('expected-diff.txt')

  expect(recievedDiff).toBe(expectedDiff)
})

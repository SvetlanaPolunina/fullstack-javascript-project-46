import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFixture = filename => fs.readFileSync(getFixturePath(filename), 'utf-8').trim()

const diffFormats = ['stylish', 'plain', 'json']
const fileFormats = ['json', 'yaml', 'yml']

describe.each(diffFormats)('genDiff %s diff format', (diffFormat) => {
  const expectedDiff = readFixture(`expected-${diffFormat}-diff.txt`)

  test.each(fileFormats)('gendiff %s files', (fileFormat) => {
    const fixturePath1 = getFixturePath(`file1.${fileFormat}`)
    const fixturePath2 = getFixturePath(`file2.${fileFormat}`)
    const actualDiff = genDiff(fixturePath1, fixturePath2, `${diffFormat}`)

    expect(actualDiff).toBe(expectedDiff)
  })
})

import { readFileSync } from 'fs'

const parseJson = (filepath) => {
  const textFromFile = readFileSync(filepath, 'utf8').trim()
  const jsonFromFile = JSON.parse(textFromFile)
  return jsonFromFile
}

export { parseJson }
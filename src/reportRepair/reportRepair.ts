import { promises } from 'fs'
interface NumberRecord {
  index: number
  value: number
}

export const mapToNumberRecords = (input: string[]): NumberRecord[] =>
  input.map((stringNum, i) => ({ index: i, value: Number.parseInt(stringNum) }))

export const sortAsc = (input: NumberRecord[]): NumberRecord[] =>
  input.sort((first, second) => first.value - second.value)

export const recordsValueSumEquals = (
  input: NumberRecord[],
  desiredSum: number
): [NumberRecord | null, NumberRecord | null] => {
  if (input.length < 2) {
    return [null, null]
  }

  let lowerBoundIndex = 0
  let upperBoundIndex = input.length - 1
  let count = 0

  while (count < input.length - 1) {
    const sum = input[lowerBoundIndex].value + input[upperBoundIndex].value
    if (sum === desiredSum) {
      return [input[lowerBoundIndex], input[upperBoundIndex]]
    }

    if (sum < desiredSum) {
      lowerBoundIndex++
    } else {
      upperBoundIndex--
    }
    count++
  }
  return [null, null]
}

export const readNumberRecordsFromFile = async (
  path: string
): Promise<NumberRecord[]> => {
  const { readFile } = promises
  const numbersString = await readFile(path, 'utf8')
  return mapToNumberRecords(
    numbersString
      .split('\n')
      .map(numString => numString.trim())
      .filter(numString => numString)
  )
}

export default {
  readNumberRecordsFromFile,
  recordsValueSumEquals,
  sortAsc,
  mapToNumberRecords,
}

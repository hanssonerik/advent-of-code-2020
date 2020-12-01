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
  desiredSum: number,
  numberOfRecordsShouldMatch: number
): NumberRecord[] => {
  if (input.length < 2) {
    return []
  }

  const sortedRecords = sortAsc(input)
  let lowerBoundIndex = 0
  let upperBoundIndex = input.length - 1
  let count = 0

  const recordsThatAddsUp = []

  while (count < sortedRecords.length - 1) {
    const sum =
      sortedRecords[lowerBoundIndex].value +
      sortedRecords[upperBoundIndex].value
    if (sum === desiredSum) {
      return [sortedRecords[lowerBoundIndex], sortedRecords[upperBoundIndex]]
    }

    if (sum < desiredSum) {
      lowerBoundIndex++
    } else {
      upperBoundIndex--
    }
    count++
  }
  return []
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

export const showFixedReportResult = async (
  path: string,
  desiredSum: number
): Promise<number | undefined> => {
  const records = await readNumberRecordsFromFile(path)

  const sortedRecords = sortAsc(records)
  const [firstRecord, secondRecord] = recordsValueSumEquals(
    sortedRecords,
    desiredSum,
    2
  )

  return firstRecord && secondRecord
    ? firstRecord.value * secondRecord.value
    : undefined
}
export default {
  readNumberRecordsFromFile,
  recordsValueSumEquals,
  sortAsc,
  mapToNumberRecords,
  showFixedReportResult,
}

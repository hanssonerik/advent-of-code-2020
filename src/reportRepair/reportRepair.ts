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
  let arrayWithIndexes = Array.from(
    { length: numberOfRecordsShouldMatch },
    (_, i) =>
      i === numberOfRecordsShouldMatch - 1 ? sortedRecords.length - 1 : i
  )
  let lastSum = 0
  while (true) {
    const sum = arrayWithIndexes.reduce((prev, curr) => {
      const result = prev + sortedRecords[curr].value
      return result
    }, 0)

    if (sum === lastSum) {
      break
    }
    lastSum = sum
    if (sum === desiredSum) {
      return arrayWithIndexes.map(a => sortedRecords[a])
    }
    if (sum < desiredSum) {
      for (let i = 0; i < arrayWithIndexes.length; i++) {
        const highestIndexAllowed =
          sortedRecords.length - 1 - (arrayWithIndexes.length - 1 - i)

        if (arrayWithIndexes[i] + 1 === arrayWithIndexes[i + 1]) {
          continue
        } else {
          if (arrayWithIndexes[i] < highestIndexAllowed) {
            arrayWithIndexes[i]++
            arrayWithIndexes = arrayWithIndexes.map((val, j) =>
              j >= i ? val : i
            )
            break
          }
        }
      }
    } else {
      const last = numberOfRecordsShouldMatch - 1
      arrayWithIndexes[last]--

      arrayWithIndexes = arrayWithIndexes.map((val, i) =>
        i === arrayWithIndexes.length - 1 ? val : i
      )
    }
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
  desiredSum: number,
  numberOfFoo: number
): Promise<number | undefined> => {
  const records = await readNumberRecordsFromFile(path)

  const matchingRecords = recordsValueSumEquals(
    records,
    desiredSum,
    numberOfFoo
  )

  return matchingRecords.reduce((prev, curr) => prev * curr.value, 1)
}
export default {
  readNumberRecordsFromFile,
  recordsValueSumEquals,
  sortAsc,
  mapToNumberRecords,
  showFixedReportResult,
}

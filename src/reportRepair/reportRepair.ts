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
  numberOfCombinations: number
): NumberRecord[] => {
  if (input.length < numberOfCombinations) {
    return []
  }

  const sortedRecords = sortAsc(input)
  const sortedRecordValues = sortedRecords.map(record => record.value)
  let combinations = initializeCombinationArrayLastIndexWithTargetArrUpperBound(
    numberOfCombinations,
    sortedRecordValues
  )

  const calculateSumOfAllCombinations = () =>
    combinations.reduce((prev, curr) => prev + sortedRecordValues[curr], 0)

  const mapCombinationArrayToNumberRecords = () =>
    combinations.map(a => sortedRecords[a])

  let lastSum = 0

  const incrementNextLowerCombination = () => {
    for (let i = 0; i < combinations.length; i++) {
      const indexInNextCombination = combinations[i] + 1 === combinations[i + 1]

      const combinationIndexCanIncrement =
        !indexInNextCombination &&
        combinations[i] <
          highestIndexAllowed(combinations, sortedRecords.length - 1, i)

      if (combinationIndexCanIncrement) {
        combinations[i]++
        combinations = combinations.map((val, j) => (j >= i ? val : i))
        break
      }
    }
  }

  let sum = calculateSumOfAllCombinations()

  do {
    lastSum = sum
    if (sum < desiredSum) {
      incrementNextLowerCombination()
    } else {
      decrementUpperCombination(combinations)
      combinations = resetAllLowerCombinations(combinations)
    }

    sum = calculateSumOfAllCombinations()
  } while (sum !== desiredSum && sum !== lastSum)

  return sum !== lastSum ? mapCombinationArrayToNumberRecords() : []
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

const decrementUpperCombination = (combinations: number[]) =>
  combinations[combinations.length - 1]--

const resetAllLowerCombinations = (combinations: number[]) =>
  combinations.map((val, i) => (i === combinations.length - 1 ? val : i))
const highestIndexAllowed = (
  combinations: unknown[],
  highestUpperBound: number,
  currentIndex: number
) => highestUpperBound - (combinations.length - 1 - currentIndex)

const initializeCombinationArrayLastIndexWithTargetArrUpperBound = (
  numberOfCombinations: number,
  targetArr: unknown[]
) =>
  Array.from({ length: numberOfCombinations }, (_, i) =>
    i === numberOfCombinations - 1 ? targetArr.length - 1 : i
  )

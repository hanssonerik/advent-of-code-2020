/*
 * --- Day 1: Report Repair ---
 * After saving Christmas five years in a row, you've decided to take a vacation at a nice resort on a tropical island. Surely, Christmas will go on without you.
 *
 * The tropical island has its own currency and is entirely cash-only. The gold coins used there have a little picture of a starfish; the locals just call them stars. None of the currency exchanges seem to have heard of them, but somehow, you'll need to find fifty of these coins by the time you arrive so you can pay the deposit on your room.
 *
 * To save your vacation, you need to get all fifty stars by December 25th.
 *
 * Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!
 *
 * Before you leave, the Elves in accounting just need you to fix your expense report (your puzzle input); apparently, something isn't quite adding up.
 *
 * Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.
 *
 * For example, suppose your expense report contained the following:
 *
 * 1721
 * 979
 * 366
 * 299
 * 675
 * 1456
 * In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together produces 1721 * 299 = 514579, so the correct answer is 514579.
 *
 * Of course, your expense report is much larger. Find the two entries that sum to 2020; what do you get if you multiply them together?
 * */

import sut from './reportRepair'

const {
  mapToNumberRecords,
  sortAsc,
  recordsValueSumEquals,
  readNumberRecordsFromFile,
  showFixedReportResult,
} = sut

describe('reportRepair', () => {
  it('should map numbers array to object with index', () => {
    const input = ['3', '0', '5']
    const expected = [
      { index: 0, value: 3 },
      { index: 1, value: 0 },
      { index: 2, value: 5 },
    ]

    const result = mapToNumberRecords(input)

    expect(result).toEqual(expected)
  })

  it('sort array of number records', () => {
    const input = [
      { index: 0, value: 3 },
      { index: 1, value: 0 },
      { index: 2, value: 5 },
    ]
    const expected = [
      { index: 1, value: 0 },
      { index: 0, value: 3 },
      { index: 2, value: 5 },
    ]

    const result = sortAsc(input)

    expect(result).toEqual(expected)
  })

  it('should return two records that add upp to desired sum', () => {
    const input = [
      { index: 0, value: 3 },
      { index: 1, value: 18 },
      { index: 2, value: 4 },
      { index: 3, value: 5 },
      { index: 4, value: 10 },
    ]
    const desiredSum = 23
    const expectedFirstRecord = { index: 1, value: 18 }
    const expectedSecondRecord = { index: 3, value: 5 }

    const [firstRecord, secondRecord] = recordsValueSumEquals(input, desiredSum)

    expect(firstRecord).toEqual(expectedFirstRecord)
    expect(secondRecord).toEqual(expectedSecondRecord)
  })

  it('should return product of numberRecords matching desiredSum from file', async () => {
    const desiredSum = 2020
    const fileName = 'day01-input.in'

    const reportResult = await showFixedReportResult(
      `${__dirname}/${fileName}`,
      desiredSum
    )
    console.debug('RESULT from fixed report: ', reportResult)

    expect(reportResult).toBeDefined()
  })

  it('should return two records that add upp to desired sum', () => {
    const input = [
      { index: 0, value: 3 },
      { index: 1, value: 18 },
      { index: 2, value: 4 },
      { index: 3, value: 5 },
      { index: 4, value: 10 },
    ]
    const desiredSum = 23
    const expectedFirstRecord = { index: 1, value: 18 }
    const expectedSecondRecord = { index: 3, value: 5 }

    const [firstRecord, secondRecord] = recordsValueSumEquals(input, desiredSum)

    expect(firstRecord).toEqual(expectedFirstRecord)
    expect(secondRecord).toEqual(expectedSecondRecord)
  })

  it('should return numberRecord array from valid input filePath', async () => {
    const fileName = 'testfile.in'
    const desiredSum = 23

    const expectedNumberRecords = [
      { index: 0, value: 3 },
      { index: 1, value: 18 },
      { index: 2, value: 4 },
      { index: 3, value: 5 },
      { index: 4, value: 10 },
    ]
    const records = await readNumberRecordsFromFile(`${__dirname}/${fileName}`)

    expect(records).toEqual(expectedNumberRecords)
  })

  it('should return two null records if number of records is less than two', () => {
    const input = [{ index: 0, value: 3 }]
    const desiredSum = 23
    const expectedFirstRecord = null
    const expectedSecondRecord = null

    const [firstRecord, secondRecord] = recordsValueSumEquals(input, desiredSum)

    expect(firstRecord).toEqual(expectedFirstRecord)
    expect(secondRecord).toEqual(expectedSecondRecord)
  })

  it('should return two null records if no number records adds up to desiredSum', () => {
    const input = [
      { index: 0, value: 3 },
      { index: 1, value: 18 },
      { index: 2, value: 4 },
      { index: 3, value: 5 },
      { index: 4, value: 10 },
    ]
    const desiredSum = 123
    const expectedFirstRecord = null
    const expectedSecondRecord = null

    const [firstRecord, secondRecord] = recordsValueSumEquals(input, desiredSum)

    expect(firstRecord).toEqual(expectedFirstRecord)
    expect(secondRecord).toEqual(expectedSecondRecord)
  })
})

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
    const expectedFirstRecord = { index: 3, value: 5 }
    const expectedSecondRecord = { index: 1, value: 18 }

    const [firstRecord, secondRecord] = recordsValueSumEquals(
      input,
      desiredSum,
      2
    )

    expect(firstRecord).toEqual(expectedFirstRecord)
    expect(secondRecord).toEqual(expectedSecondRecord)
  })

  it('should return three records that add upp to desired sum', () => {
    const input = [
      { index: 0, value: 3 },
      { index: 1, value: 18 },
      { index: 2, value: 4 },
      { index: 3, value: 5 },
      { index: 4, value: 10 },
    ]
    const desiredSum = 27
    const expectedFirstRecord = { index: 2, value: 4 }
    const expectedSecondRecord = { index: 3, value: 5 }
    const expectedThirdRecord = { index: 1, value: 18 }

    const [firstRecord, secondRecord, thirdRecord] = recordsValueSumEquals(
      input,
      desiredSum,
      3
    )

    expect(firstRecord).toEqual(expectedFirstRecord)
    expect(secondRecord).toEqual(expectedSecondRecord)
    expect(thirdRecord).toEqual(expectedThirdRecord)
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
    const expectedSecondRecord = { index: 1, value: 18 }
    const expectedFirstRecord = { index: 3, value: 5 }

    const [firstRecord, secondRecord] = recordsValueSumEquals(
      input,
      desiredSum,
      2
    )

    expect(firstRecord).toEqual(expectedFirstRecord)
    expect(secondRecord).toEqual(expectedSecondRecord)
  })

  it('should return product of numberRecords matching desiredSum from file', async () => {
    const desiredSum = 2020
    const fileName = 'day01-input.in'

    const reportResult = await showFixedReportResult(
      `${__dirname}/${fileName}`,
      desiredSum,
      2
    )
    console.debug('ReportRepair two numberRecors result: ', reportResult)

    expect(reportResult).toBeDefined()
  })

  it('should return product of three numberRecords matching desiredSum from file', async () => {
    const desiredSum = 2020
    const fileName = 'day01-input.in'

    const reportResult = await showFixedReportResult(
      `${__dirname}/${fileName}`,
      desiredSum,
      3
    )
    console.debug('ReportRepair three numberRecors result: ', reportResult)

    expect(reportResult).toBeDefined()
  })

  it('should return two undefined records if number of records is less than two', () => {
    const input = [{ index: 0, value: 3 }]
    const desiredSum = 23
    const expectedFirstRecord = undefined
    const expectedSecondRecord = undefined

    const [firstRecord, secondRecord] = recordsValueSumEquals(
      input,
      desiredSum,
      2
    )

    expect(firstRecord).toEqual(expectedFirstRecord)
    expect(secondRecord).toEqual(expectedSecondRecord)
  })

  it('should return two undefined records if no number records adds up to desiredSum', () => {
    const input = [
      { index: 0, value: 3 },
      { index: 1, value: 18 },
      { index: 2, value: 4 },
      { index: 3, value: 5 },
      { index: 4, value: 10 },
    ]
    const desiredSum = 123
    const expectedFirstRecord = undefined
    const expectedSecondRecord = undefined

    const [firstRecord, secondRecord] = recordsValueSumEquals(
      input,
      desiredSum,
      2
    )

    expect(firstRecord).toEqual(expectedFirstRecord)
    expect(secondRecord).toEqual(expectedSecondRecord)
  })
})

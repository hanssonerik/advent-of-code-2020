import { promises } from 'fs'
import {
  selectHigherRange,
  selectLowerRange,
  calculateSeatId,
  getHighestSeatId,
  getSeatAndRow,
  getEmptySeat,
} from './binaryBoarding'

describe('Binary Boarding', () => {
  describe('Select rows', () => {
    test.each([
      [
        { firstRow: 0, lastRow: 127 },
        { firstRow: 0, lastRow: 63 },
      ],
      [
        { firstRow: 32, lastRow: 63 },
        { firstRow: 32, lastRow: 47 },
      ],
      [
        { firstRow: 44, lastRow: 47 },
        { firstRow: 44, lastRow: 45 },
      ],
      [
        { firstRow: 44, lastRow: 45 },
        { firstRow: 44, lastRow: 44 },
      ],
      [
        { firstRow: 4, lastRow: 7 },
        { firstRow: 4, lastRow: 5 },
      ],
    ])('selects lower range %o', (input, expected) => {
      const result = selectLowerRange(input)

      expect(result).toEqual(expected)
    })

    test.each([
      [
        { firstRow: 0, lastRow: 63 },
        { firstRow: 32, lastRow: 63 },
      ],
      [
        { firstRow: 0, lastRow: 127 },
        { firstRow: 64, lastRow: 127 },
      ],
      [
        { firstRow: 64, lastRow: 127 },
        { firstRow: 96, lastRow: 127 },
      ],
      [
        { firstRow: 96, lastRow: 127 },
        { firstRow: 112, lastRow: 127 },
      ],
      [
        { firstRow: 32, lastRow: 47 },
        { firstRow: 40, lastRow: 47 },
      ],
      [
        { firstRow: 40, lastRow: 47 },
        { firstRow: 44, lastRow: 47 },
      ],
      [
        { firstRow: 0, lastRow: 7 },
        { firstRow: 4, lastRow: 7 },
      ],
      [
        { firstRow: 4, lastRow: 5 },
        { firstRow: 5, lastRow: 5 },
      ],
    ])('selects higher range %o', (input, expected) => {
      const result = selectHigherRange(input)

      expect(result).toEqual(expected)
    })
  })

  describe('Calculate seatId', () => {
    it('calculates correct seatId', () => {
      const row = { firstRow: 44, lastRow: 44 }
      const column = { firstRow: 5, lastRow: 5 }
      const expected = 357

      const result = calculateSeatId(column, row)

      expect(result).toEqual(expected)
    })
  })
  describe('Parse input', () => {
    it('get seat and row and seatId', async () => {
      const input = 'BBBBFBFLLL'

      const result = getSeatAndRow(
        input,
        { firstRow: 0, lastRow: 127 },
        { firstRow: 0, lastRow: 7 }
      )
      expect(result.seatID).toBe(976)
    })

    it('get highest seatId', async () => {
      const input = await promises.readFile(
        __dirname + '/day05-input.in',
        'utf8'
      )

      const result = getHighestSeatId(input)
      console.debug('Result', result)
      expect(result).toBeDefined()
    })
    it('get mySeat seatId', async () => {
      const input = await promises.readFile(
        __dirname + '/day05-input.in',
        'utf8'
      )

      const result = getEmptySeat(input)
      console.debug('Result my seat', result)
      expect(result).toBeDefined()
    })
  })
})

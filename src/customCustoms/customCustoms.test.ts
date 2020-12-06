import { promises } from 'fs'
import {
  questionsAnsweardByEveryTravelerInGroupCount,
  travelerGroupUniqueAnswears,
} from './customCustoms'

describe('Custom Customs', () => {
  it('returns correct count', () => {
    const input = `
abc

a
b
c

ab
ac

a
a
a
a

b
`
    const expected = 11

    const result = travelerGroupUniqueAnswears(input)

    expect(result).toBe(expected)
  })
  it('returns correct count', async () => {
    const input = await promises.readFile(__dirname + '/day06-input.in', 'utf8')
    const expected = 6633

    const result = travelerGroupUniqueAnswears(input)

    expect(result).toBe(expected)
  })
  it('returns correct count', async () => {
    const input = await promises.readFile(__dirname + '/day06-input.in', 'utf8')
    const expected = 3202

    const result = questionsAnsweardByEveryTravelerInGroupCount(input)

    expect(result).toBe(expected)
  })
})

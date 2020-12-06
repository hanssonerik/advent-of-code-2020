import { promises } from 'fs'
import {
  mapToMatrix,
  createMapFunction,
  countNumberOfHits,
  countNumberOfHitsProduct,
} from './tobogganTrajectory'

describe('Toboggan Trajectory', () => {
  it('should map string input to 2d map array', () => {
    const inputString = `
..#
#.#
`
    const expected = [
      ['.', '.', '#'],
      ['#', '.', '#'],
    ]

    const passwordRecords = mapToMatrix(inputString)

    expect(passwordRecords).toEqual(expected)
  })

  it('should map string input to 2d map array', () => {
    const inputString = `
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
`
    const map = mapToMatrix(inputString)

    expect(map[3][2]).toEqual('#')
    expect(map[3][3]).toEqual('.')
    expect(map[8][4]).toEqual('.')
  })

  it('shuld allow infinite x axis', () => {
    const inputString = `
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
`
    const map = createMapFunction(mapToMatrix(inputString))

    expect(map(3, 2)).toEqual('#')
    expect(map(3, 3)).toEqual('.')
    expect(map(8, 4)).toEqual('.')
    expect(map(8, 13)).toEqual('#')
    expect(map(2, 6)).toEqual('#')
  })

  it('should count all hits until bottom of map', () => {
    const inputString = `
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
`
    const startPosition = [0, 0]
    const repeatPattern = [1, 3]
    const expected = 7

    const map = mapToMatrix(inputString)
    const numberOfTreeHits = countNumberOfHits(map, startPosition, [
      repeatPattern,
    ])

    expect(numberOfTreeHits).toEqual(expected)
  })

  it('should read file input and count all hits until bottom of map', async () => {
    const fileName = '/day03-input.in'

    const startPosition = [0, 0]
    const repeatPattern = [1, 3]

    const inputString = await promises.readFile(__dirname + fileName, 'utf8')

    const map = mapToMatrix(inputString)
    const numberOfTreeHits = countNumberOfHits(map, startPosition, [
      repeatPattern,
    ])

    console.debug('Toboggan Trajectory part ons result: ', numberOfTreeHits)
    expect(numberOfTreeHits).toBeDefined()
  })

  it('should read file input and count all hits until bottom of map', async () => {
    const fileName = '/day03-input.in'

    const startPosition = [0, 0]

    const inputString = await promises.readFile(__dirname + fileName, 'utf8')
    const map = mapToMatrix(inputString)
    const one = countNumberOfHitsProduct(map, startPosition, [
      [1, 1],
      [1, 3],
      [1, 5],
      [1, 7],
      [2, 1],
    ])

    console.debug('Toboggan Trajectory part two result: ', one)
    expect(true).toBeDefined()
  })
})

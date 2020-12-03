export const mapToMatrix = (input: string) =>
  input
    .split('\n')
    .map(numString => numString.trim())
    .filter(numString => numString)
    .map(row => row.split(''))

export const createMapFunction = (map: string[][]) => (
  y: number,
  x: number
): string => {
  const actualX = x % map[0].length
  const actualY = y % map.length
  return map[actualY][actualX]
}

export const countNumberOfHits = (
  map: string[][],
  startPosition: number[],
  pattern: number[][]
) => {
  const mapFunc = createMapFunction(map)
  let hitCounter = 0

  pattern.forEach(stepPattern => {
    const [startY, startX] = startPosition
    const [stepY, stepX] = stepPattern

    for (let x = startX, y = startY; y < map.length; x += stepX, y += stepY) {
      if (mapFunc(y, x) === '#') {
        hitCounter++
      }
    }
  })
  return hitCounter
}

export const countNumberOfHitsProduct = (
  map: string[][],
  startPosition: number[],
  pattern: number[][]
) => {
  let hitCounterProduct = 1

  pattern.forEach(stepPattern => {
    let count = countNumberOfHits(map, startPosition, [stepPattern])
    hitCounterProduct *= count
  })

  return hitCounterProduct
}

export default { mapToMatrix, createMapFunction }

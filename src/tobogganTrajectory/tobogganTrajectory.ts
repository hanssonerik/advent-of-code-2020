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
  input: string,
  startPosition: number[],
  pattern: number[]
) => {
  const map = mapToMatrix(input)
  const mapFunc = createMapFunction(map)
  const [startY, startX] = startPosition
  const [stepY, stepX] = pattern

  let hitCounter = 0

  for (let x = startX, y = startY; y < map.length; x += stepX, y += stepY) {
    if (mapFunc(y, x) === '#') {
      hitCounter++
    }
  }
  return hitCounter
}
export default { mapToMatrix, createMapFunction }

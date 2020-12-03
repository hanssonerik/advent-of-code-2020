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
  const actualX = x % map[y].length
  return map[y][actualX]
}
export default { mapToMatrix, createMapFunction }

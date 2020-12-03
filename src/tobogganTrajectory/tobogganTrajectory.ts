export const mapToMatrix = (input: string) =>
  input
    .split('\n')
    .map(numString => numString.trim())
    .filter(numString => numString)
    .map(row => row.split(''))

export default { mapToMatrix }

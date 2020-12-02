export const mapToListOfPasswordRecords = (input: string): PasswordRecord[] => {
  return input
    .split('\n')
    .map(numString => numString.trim())
    .filter(numString => numString)
    .map(cleanString => {
      const [rangePart, patternPart, password] = cleanString.split(' ')

      const [atLeast, atMoast] = rangePart.split('-')
      const pattern = patternPart.replace(':', '')
      return {
        policy: {
          atLeast: Number.parseInt(atLeast),
          atMoast: Number.parseInt(atMoast),
          pattern,
        },
        password,
      }
    })
}

interface PasswordRecord {
  policy: { atLeast: number; atMoast: number; pattern: string }
  password: string
}
export default { mapToListOfPasswordRecords }

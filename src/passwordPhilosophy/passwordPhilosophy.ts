import { promises } from 'fs'

const { readFile } = promises

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

export const isValidPassword = (passwordRecord: PasswordRecord): boolean => {
  const { pattern, atLeast, atMoast } = passwordRecord.policy
  const result = [
    ...passwordRecord.password.matchAll(
      new RegExp(String.raw`${pattern}`, 'g')
    ),
  ]

  return result.length <= atMoast && result.length >= atLeast
}

export const isValidNewPassword = (passwordRecord: PasswordRecord): boolean => {
  const { pattern, atLeast, atMoast } = passwordRecord.policy

  const first = passwordRecord.password[atLeast - 1] === pattern
  const second = passwordRecord.password[atMoast - 1] === pattern
  return (first && !second) || (!first && second)
}

export const numberOfValidPasswords = (
  passwordRecords: PasswordRecord[],
  validator: (passwordRecord: PasswordRecord) => boolean
) => passwordRecords.filter(p => validator(p)).length

export const getNumberOfValidPasswords = async (
  path: string
): Promise<number> => {
  const passwordRecordsString = await readFile(path, 'utf8')
  return numberOfValidPasswords(
    mapToListOfPasswordRecords(passwordRecordsString),
    isValidPassword
  )
}

export const getNumberOfValidPasswordsNewPolicy = async (
  path: string
): Promise<number> => {
  const passwordRecordsString = await readFile(path, 'utf8')
  return numberOfValidPasswords(
    mapToListOfPasswordRecords(passwordRecordsString),
    isValidNewPassword
  )
}

interface PasswordRecord {
  policy: { atLeast: number; atMoast: number; pattern: string }
  password: string
}
export default {
  mapToListOfPasswordRecords,
  isValidPassword,
  numberOfValidPasswords,
  getNumberOfValidPasswords,
  getNumberOfValidPasswordsNewPolicy,
  isValidNewPassword,
}

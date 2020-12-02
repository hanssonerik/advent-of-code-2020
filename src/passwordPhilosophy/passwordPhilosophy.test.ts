/*
 *  *--- Day 2: Password Philosophy ---
 * Your flight departs in a few days from the coastal airport; the easiest way down to the coast from here is via toboggan.
 *
 * The shopkeeper at the North Pole Toboggan Rental Shop is having a bad day. "Something's wrong with our computers; we can't log in!" You ask if you can take a look.
 *
 * Their password database seems to be a little corrupted: some of the passwords wouldn't have been allowed by the Official Toboggan Corporate Policy that was in effect when they were chosen.
 *
 * To try to debug the problem, they have created a list (your puzzle input) of passwords (according to the corrupted database) and the corporate policy when that password was set.
 *
 * For example, suppose you have the following list:
 *
 * 1-3 a: abcde
 * 1-3 b: cdefg
 * 2-9 c: ccccccccc
 * Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.
 *
 * In the above example, 2 passwords are valid. The middle password, cdefg, is not; it contains no instances of b, but needs at least 1. The first and third passwords are valid: they contain one a or nine c, both within the limits of their respective policies.
 *
 * How many passwords are valid according to their policies?
 *
 *
 * */

import sut from './passwordPhilosophy'

const {
  mapToListOfPasswordRecords,
  isValidPassword,
  numberOfValidPasswords,
  getNumberOfValidPasswords,
  getNumberOfValidPasswordsNewPolicy,
} = sut

describe('Password Philosophy', () => {
  it('should parse input to list of password records', () => {
    const inputString = `
1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
`
    const expected = [
      { policy: { atLeast: 1, atMoast: 3, pattern: 'a' }, password: 'abcde' },
      { policy: { atLeast: 1, atMoast: 3, pattern: 'b' }, password: 'cdefg' },
      {
        policy: { atLeast: 2, atMoast: 9, pattern: 'c' },
        password: 'ccccccccc',
      },
    ]
    const passwordRecords = mapToListOfPasswordRecords(inputString)

    expect(passwordRecords).toEqual(expected)
  })

  it('should validate invalid passwordRecord', () => {
    const passwordRecord = {
      policy: { atLeast: 1, atMoast: 3, pattern: 'b' },
      password: 'cdefg',
    }
    const expected = false

    const result = isValidPassword(passwordRecord)

    expect(result).toBe(expected)
  })

  it('should validate valid passwordRecord', () => {
    const passwordRecord = {
      policy: { atLeast: 1, atMoast: 3, pattern: 'a' },
      password: 'abcde',
    }
    const expected = true

    const result = isValidPassword(passwordRecord)

    expect(result).toBe(expected)
  })

  it('should validate invalid passwordRecord', () => {
    const passwordRecord = {
      policy: { atLeast: 2, atMoast: 9, pattern: 'c' },
      password: 'ccccaccbcccccccc',
    }
    const expected = false

    const result = isValidPassword(passwordRecord)

    expect(result).toBe(expected)
  })

  it('should return number of valid passwordRecords', () => {
    const passwordRecords = [
      { policy: { atLeast: 1, atMoast: 3, pattern: 'a' }, password: 'abcde' },
      { policy: { atLeast: 1, atMoast: 3, pattern: 'b' }, password: 'cdefg' },
      {
        policy: { atLeast: 2, atMoast: 9, pattern: 'c' },
        password: 'ccccccccc',
      },
    ]
    const expected = 2

    const result = numberOfValidPasswords(passwordRecords, isValidPassword)

    expect(result).toBe(expected)
  })

  it('should return number of valid passwordRecords from input file', async () => {
    const fileName = 'day02-input.in'

    const reportResult = await getNumberOfValidPasswords(
      `${__dirname}/${fileName}`
    )
    console.debug('PasswordPhilosophy valid passwords result: ', reportResult)

    expect(reportResult).toBeDefined()
  })

  it('should return number of valid passwordRecords from input file with new password policy', async () => {
    const fileName = 'day02-input.in'

    const reportResult = await getNumberOfValidPasswordsNewPolicy(
      `${__dirname}/${fileName}`
    )
    console.debug('PasswordPhilosophy valid passwords result: ', reportResult)

    expect(reportResult).toBeDefined()
  })
})

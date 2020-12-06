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

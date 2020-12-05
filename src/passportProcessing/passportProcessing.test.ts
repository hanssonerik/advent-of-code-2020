import { promises } from 'fs'
import {
  parsePassportRecords,
  validatePassportProps,
  mapToPassport,
  validatePassport,
  validateIyr,
  validateByr,
  validateEyr,
  validateHgt,
  validateHcl,
  validateEcl,
  validatePid,
} from './passportProcessing'
describe('Password Philosophy', () => {
  it('should parse input to list of passports', async () => {
    const inputString = await promises.readFile(
      __dirname + '/day03-input.in',
      'utf8'
    )

    const passportRecords = parsePassportRecords(inputString)

    const validPassports = passportRecords.map(mapToPassport).filter(p => p)
    console.debug('Passport result part 1: ', validPassports.length)
  })
  it('should parse input to list of passports', async () => {
    const inputString = await promises.readFile(
      __dirname + '/day03-input.in',
      'utf8'
    )

    const passportRecords = parsePassportRecords(inputString)

    const validPassports = passportRecords
      .map(mapToPassport)
      .filter(validatePassport)

    const inValidPassports = passportRecords
      .map(mapToPassport)
      .filter(p => !validatePassport(p))
    console.debug('invalids', JSON.stringify(inValidPassports, null, 4))
    // console.debug('validPassports', JSON.stringify(validPassports, null, 4))
    console.debug('Passport result part 2: ', validPassports.length)
  })

  it('should invalidate passwords', async () => {
    const inputString = `
eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007

`
    const passportRecords = parsePassportRecords(inputString)
    const passports = passportRecords.map(mapToPassport)
    const valid = passports.filter(validatePassport)

    expect(valid.length).toBe(0)
  })

  it('should validate passwords', async () => {
    const inputString = `
pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007


hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`
    const passportRecords = parsePassportRecords(inputString)

    const validPassports = passportRecords
      .map(mapToPassport)
      .filter(p => validatePassport(p))

    expect(validPassports.length).toBe(4)
  })

  it('validates valid props on a password', async () => {
    const isValidPassport = validatePassportProps(validPassportWithOptional)

    expect(isValidPassport).toBeTruthy()
  })

  it('returns null if pid field missing', async () => {
    const isValidPassport = mapToPassport(passportIdMissing)

    expect(isValidPassport).toBeNull()
  })

  it('returns passport if all required password props exist', async () => {
    const isValidPassport = mapToPassport(validPassportWithOptional)

    expect(isValidPassport).toEqual(validPassportWithOptional)
  })

  it('validates valid props on a password pid is optional', async () => {
    const isValidPassport = validatePassportProps(validPassportWithOptional)

    expect(isValidPassport).toBeTruthy()
  })

  it('validates invalid props on a password', async () => {
    const isInvalid = validatePassportProps(inValidPassport)

    expect(isInvalid).toBeFalsy()
  })

  it('validates null', async () => {
    const isInvalidPassord = validatePassportProps(null)

    expect(isInvalidPassord).toBeFalsy()
  })

  it('validates byr', () => {
    expect(validateByr('')).toBeFalsy()
    expect(validateByr('abcd')).toBeFalsy()
    expect(validateByr('1801')).toBeFalsy()
    expect(validateByr('2003')).toBeFalsy()
    expect(validateByr('1919')).toBeFalsy()
    expect(validateByr('1920')).toBeTruthy()
    expect(validateByr('2002')).toBeTruthy()
  })

  it('validates iyr', () => {
    expect(validateIyr('')).toBeFalsy()
    expect(validateIyr('2010')).toBeTruthy()
    expect(validateIyr('2020')).toBeTruthy()
    expect(validateIyr('2021')).toBeFalsy()
    expect(validateIyr('2009')).toBeFalsy()
  })

  it('validates iyr', () => {
    expect(validateEyr('')).toBeFalsy()
    expect(validateEyr('2020')).toBeTruthy()
    expect(validateEyr('2030')).toBeTruthy()
    expect(validateEyr('2031')).toBeFalsy()
    expect(validateEyr('2019')).toBeFalsy()
  })

  it('validates hgt', () => {
    expect(validateHgt('149cm')).toBeFalsy()
    expect(validateHgt('194cm')).toBeFalsy()
    expect(validateHgt('')).toBeFalsy()
    expect(validateHgt('193cmd')).toBeFalsy()
    expect(validateHgt('a193cm')).toBeFalsy()
    expect(validateHgt('150cm')).toBeTruthy()
    expect(validateHgt('193cm')).toBeTruthy()

    expect(validateHgt('77in')).toBeFalsy()
    expect(validateHgt('')).toBeFalsy()
    expect(validateHgt('59ind')).toBeFalsy()
    expect(validateHgt('a79in')).toBeFalsy()
    expect(validateHgt('58in')).toBeFalsy()
    expect(validateHgt('59in')).toBeTruthy()
    expect(validateHgt('60in')).toBeTruthy()
    expect(validateHgt('76in')).toBeTruthy()
    expect(validateHgt('77in')).toBeFalsy()
  })

  it('validates iyr', () => {
    expect(validateEyr('')).toBeFalsy()
    expect(validateEyr('2019')).toBeFalsy()
    expect(validateEyr('2020')).toBeTruthy()
    expect(validateEyr('2021')).toBeTruthy()
    expect(validateEyr('2029')).toBeTruthy()
    expect(validateEyr('2030')).toBeTruthy()
    expect(validateEyr('2031')).toBeFalsy()
  })

  it('validates hcl', () => {
    expect(validateHcl('')).toBeFalsy()
    expect(validateHcl('#123abf')).toBeTruthy()
    expect(validateHcl('x123abf')).toBeFalsy()
    expect(validateHcl('1123abf')).toBeFalsy()
    expect(validateHcl('#123abg')).toBeFalsy()
    expect(validateHcl('#123abgc')).toBeFalsy()
  })

  it('validates ecl', () => {
    expect(validateEcl('')).toBeFalsy()
    expect(validateEcl('aaa')).toBeFalsy()
    expect(validateEcl('lzr')).toBeFalsy()
    expect(validateEcl('amb')).toBeTruthy()
    expect(validateEcl('blu')).toBeTruthy()
    expect(validateEcl('brn')).toBeTruthy()
    expect(validateEcl('gry')).toBeTruthy()
    expect(validateEcl('grn')).toBeTruthy()
    expect(validateEcl('hzl')).toBeTruthy()
    expect(validateEcl('oth')).toBeTruthy()
  })

  it('validates pid', () => {
    expect(validatePid('')).toBeFalsy()
    expect(validatePid('0000000001')).toBeFalsy()
    expect(validatePid('000a00001')).toBeFalsy()
    expect(validatePid('000000001')).toBeTruthy()
    expect(validatePid('100000001')).toBeTruthy()
  })
})

const validPassportWithOptional = {
  ecl: 'grn',
  hcl: '#efcc98',
  byr: '1935',
  iyr: '2018',
  eyr: '2018',
  hgt: '65in',
  pid: '396444938',
  cid: '293',
}

const inValidPassport = {
  ecl: 'grn',
  hcl: '',
  byr: '1935',
  iyr: '2018',
  eyr: '2018',
  hgt: '65in',
  pid: '396444938',
  cid: '293',
}

const passportIdMissing = {
  ecl: 'grn',
  hcl: 'x',
  byr: '1935',
  iyr: '2018',
  eyr: '2018',
  hgt: '65in',
  cid: '293',
}

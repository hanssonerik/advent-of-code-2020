export const parsePassportRecords = (input: string) =>
  input.split('\n\n').map(section =>
    section
      .split('\n')
      .map(k => k.split(' '))
      .flat()
      .filter(a => a)
      .map(row => ({ [row.split(':')[0]]: row.split(':')[1] }))
      .reduce((prev, curr) => ({ ...prev, ...curr }), {})
  )

export const mapToPassport = (
  input: Record<string, string>
): Passport | null => {
  if (!Object.keys(input).length) return null
  const { pid, byr, hgt, hcl, ecl, iyr, eyr, cid } = input
  return validatePassportProps(input)
    ? {
        pid,
        byr,
        hgt,
        hcl,
        ecl,
        iyr,
        eyr,
        cid,
      }
    : null
}

export const validatePassportProps = (
  input: Record<string, unknown> | null
): boolean => {
  return !!(
    input?.byr &&
    input.eyr &&
    input.hgt &&
    input.pid &&
    input.hcl &&
    input.ecl &&
    input.iyr
  )
}

export const validatePassport = (input: Passport | null): boolean => {
  return (
    !!input &&
    validateByr(input.byr) &&
    validateEyr(input.eyr) &&
    validateHgt(input.hgt) &&
    validatePid(input.pid) &&
    validateHcl(input.hcl) &&
    validateEcl(input.ecl) &&
    validateIyr(input.iyr)
  )
}

const validYear = (input: string, from: number, to: number) => {
  const validLength = input.length === 4
  const year = tryParseInt(input)
  if (!year) return false

  const validYear = year >= from && year <= to

  return validLength && validYear
}
export const validateEyr = (input: string) => validYear(input, 2020, 2030)
export const validateIyr = (input: string) => validYear(input, 2010, 2020)
export const validateByr = (input: string) => validYear(input, 1920, 2002)

const tryParseInt = (input: string) => Number.parseInt(input)

export const validateHgt = (input: string) => {
  const metric = input.slice(input.length - 2)
  const validMetric = metric === 'cm' || metric === 'in'
  if (!validMetric) return false

  const height = tryParseInt(input.replace('cm', '').replace('in', ''))
  if (!height) return false

  return metric === 'cm'
    ? height >= 150 && height <= 193
    : height >= 59 && height <= 76
}

export const validateHcl = (input: string) => {
  const [firstChar] = input
  if (firstChar !== '#') return false

  const digits = input.slice(1)
  if (digits.length !== 6) return false

  const validChars = 'abcdef0123456789'
  return [...digits].reduce(
    (prev, curr) => prev && validChars.includes(curr),
    true
  )
}

export const validateEcl = (input: string) => {
  var valid = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

  return valid.includes(input)
}

export const validatePid = (input: string) => {
  if (input.length !== 9) return false

  const validChars = '0123456789'
  return [...input.slice(1)].reduce(
    (prev, curr) => prev && validChars.includes(curr),
    true
  )
}
interface Passport {
  pid: string
  byr: string
  hgt: string
  hcl: string
  ecl: string
  cid?: string
  iyr: string
  eyr: string
}

interface NumberRecord {
  index: number
  value: number
}

export const mapToNumberRecords = (input: string[]): NumberRecord[] =>
  input.map((stringNum, i) => ({ index: i, value: Number.parseInt(stringNum) }))

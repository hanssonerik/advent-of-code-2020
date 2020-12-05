export const selectHigherRange = (input: Range): Range => {
  const numberOfSeatsInCurrentRange = input.lastRow - input.firstRow + 1
  const newFirstRow =
    input.firstRow + Math.floor(numberOfSeatsInCurrentRange / 2)
  return { firstRow: newFirstRow, lastRow: input.lastRow }
}

export const selectLowerRange = (input: Range): Range => {
  const numberOfSeatsInCurrentRange = input.lastRow - input.firstRow
  const newLastRow =
    input.firstRow + Math.floor(numberOfSeatsInCurrentRange / 2)
  return { firstRow: input.firstRow, lastRow: newLastRow }
}

export const calculateSeatId = (column: Range, row: Range) => {
  return row.firstRow * 8 + column.firstRow
}

export const getSeatAndRow = (
  input: string,
  initialRowRange: Range,
  initialSeatRange: Range
) => {
  let seat = initialSeatRange
  let row = initialRowRange

  const result = [...input].forEach(c => {
    if (c === 'B') {
      row = selectHigherRange(row)
    }
    if (c === 'F') {
      row = selectLowerRange(row)
    }
    if (c === 'R') {
      seat = selectHigherRange(seat)
    }
    if (c === 'L') {
      seat = selectLowerRange(seat)
    }
  })
  if (row.firstRow !== row.lastRow)
    console.debug('test', row.firstRow, row.lastRow, input)

  return {
    row: row.firstRow,
    seat: seat.firstRow,
    seatID: calculateSeatId(seat, row),
  }
}
export const getHighestSeatId = (input: string) => {
  return input
    .split('\n')
    .filter(x => x.trim())
    .map(boardingPass =>
      getSeatAndRow(
        boardingPass.trim(),
        { firstRow: 0, lastRow: 127 },
        { firstRow: 0, lastRow: 7 }
      )
    )
    .sort((a, b) => b.seatID - a.seatID)[0].seatID
}
export const getEmptySeat = (input: string) => {
  const result = input
    .split('\n')
    .filter(x => x.trim())
    .map(boardingPass =>
      getSeatAndRow(
        boardingPass.trim(),
        { firstRow: 0, lastRow: 127 },
        { firstRow: 0, lastRow: 7 }
      )
    )
    .sort((a, b) => b.seatID - a.seatID)
    .map(a => a.seatID)
    .reverse()

  console.debug(JSON.stringify(result, null, 4))
  const [firstSeat] = result
  console.debug(firstSeat)
  for (let i = 0; i < result.length; i++) {
    if (result[i] !== i + firstSeat) {
      return i + firstSeat
    }
  }
}

interface Range {
  firstRow: number
  lastRow: number
}

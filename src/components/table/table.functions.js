import { CODES } from '../../constants'
import { range } from '../../core/utils'
import { Table } from './Table'


export function shouldResize(event) {
  return event.target.dataset.resize
}
export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector(key, { col, row }) {
  const MIN_VALUE = 0
  const MAX_VALUE_ROWS = Table.countRows-1
  const MAX_VALUE_COLS = CODES.Z - CODES.A 

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = row + 1 > MAX_VALUE_ROWS ? MAX_VALUE_ROWS : row + 1
      break
    case 'Tab':
    case 'ArrowRight':
      col = col + 1 > MAX_VALUE_COLS ? MAX_VALUE_COLS : col + 1
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
  }

  return `[data-id="${row}:${col}"]`
}

import { CODES } from "../../core/utils"

function toCell(indexRow) {
  return function(_, index) {
    return `
      <div class="cell" contenteditable data-type="cell" data-col="${index}" data-id="${indexRow}:${index}"></div>
    `
  }
}

function toColumn(col, index) {
  return `
  <div class="column" data-type="resizeble" data-col="${index}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>
  `
}

function createRow(index, content) {
  return `
    <div class="row" data-type="resizeble">
      <div class="row-info">
      ${index ? index : ''}
      ${index ? '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('')

  rows.push(createRow(null, cols))
  for (let indexRow = 0; indexRow < rowCount; indexRow++) {
    const cells = new Array(colsCount).fill('').map(toCell(indexRow)).join('') 
    rows.push(createRow(indexRow + 1, cells))
  }

  return rows.join('')
}

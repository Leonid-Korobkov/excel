const CODES = {
  A: 65,
  Z: 90
}

function toCell(_, index) {
  return `
    <div class="cell" contenteditable="true" data-col="${index}"></div>
  `
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
  const cells = new Array(colsCount).fill('').map(toCell).join('')

  rows.push(createRow(null, cols))
  for (let i = 0; i < rowCount; i++) {
    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}

import { CODES, DEFAULT_HEIGHT, DEFAULT_WIDTH, defaultStyles } from '../../constants'
import { parse } from '../../core/parse'
import { camelToDashCase, toInlineStyles } from '../../core/utils'

function getWidth(state, index) {
  return (state[index] ? state[index] : DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function withWidthFrom(state, index) {
  return function(col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowCount = 20, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount).fill('').map(toChar).map(withWidthFrom(state)).map(toColumn).join('')

  rows.push(createRow(null, cols, {}))
  for (let indexRow = 0; indexRow < rowCount; indexRow++) {
    const cells = new Array(colsCount).fill('').map(toCell(indexRow, state)).join('')
    rows.push(createRow(indexRow + 1, cells, state.rowState))
  }

  return rows.join('')
}

function toCell(indexRow, state) {
  return function(_, index) {
    const width = getWidth(state.colState, index)
    const currentId = `${indexRow}:${index}`
    const text = state.dataState[currentId] || ''
    const styles = toInlineStyles({ ...defaultStyles, ...state.stylesState[currentId] })
    return `
      <div class="cell"
        style="${styles}; width: ${width}"
        contenteditable
        data-type="cell"
        data-col="${index}"
        data-id="${currentId}"
        data-value="${text || ''}"
      >${parse(text)}</div>
    `
  }
  // <input type="text" class="cell" style="width: ${width}" data-type="cell" data-col="${index}" data-id="${currentId}">${text}</input>
}

function toColumn({ col, index, width }) {
  return `
  <div class="column" style="width: ${width}" data-type="resizeble" data-col="${index}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>
  `
}

function createRow(index, content, state) {
  const height = getHeight(state, index)
  return `
    <div class="row" style="height: ${height}" data-type="resizeble" data-row="${index}">
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

import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { tableResizeHandler } from './table.resize'
import { isCell, matrix, nextSelector, shouldResize } from './table.functions'
import { TableSelection } from './TableSelection'
import { $ } from '../../core/dom'
import * as actions from '../../redux/actions'
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, defaultStyles } from '../../constants'
import { parse } from '../../core/parse'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  static countRows = 40

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input', 'dblclick'],
      ...options
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)
    this.$on('formula:input', text => {
      this.selection.current.attr('data-value', text).text(parse(text))
      this.updateTextInStore(text)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.selection.current.focus()
      this.$dispatch(
        actions.applyStyle({
          value,
          ids: this.selection.selectedIds
        })
      )
    })
  }

  toHTML() {
    return createTable(Table.countRows, this.store.getState())
  }

  selectCell($cell) {
    this.$emit('table:select', $cell)
    this.selection.select($cell)

    const styles = $cell.getStyles(Object.keys(defaultStyles))
    console.log(styles)
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await tableResizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error: ', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const cells = matrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup(cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  // Возрвращение ширины или высоты в дефолтное
  onDblclick(event) {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizeble"]')
    const type = $resizer.data.resize
    const numCol = $parent.data.col
    if (type === 'col') {
      this.$root.findAll(`[data-col="${numCol}"]`).forEach(row => {
        row.style.width = DEFAULT_WIDTH + 'px'
      })
    } else {
      $parent.css({ height: DEFAULT_HEIGHT + 'px' })
    }
    this.$dispatch(
      actions.tableResize({
        type,
        id: type === 'col' ? numCol : $parent.data.row
      })
    )
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
    const { key } = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        value
      })
    )
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }
}

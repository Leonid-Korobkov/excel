import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { tableResizeHandler } from './table.resize'
import { shouldResize } from './table.functions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mousemove', 'mouseup']
    })
  }

  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResizeHandler(this.$root, event)
    }
  }

  onMousemove() {}

  onMouseup() {}
}

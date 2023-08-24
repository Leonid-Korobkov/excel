import { $ } from '../../core/dom'

export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clearSelection()
    $el.focus().addClass(TableSelection.className)
    this.group.push($el)
    this.current = $el
    return this
  }

  get selectedIds() {
    return this.group.map($el => $el.id())
  }

  selectGroup($group = []) {
    this.clearSelection()
    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }

  clearSelection() {
    this.group.forEach(el => el.removeClass(TableSelection.className))
    this.group = []
  }

  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }
}

import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
    this.$on('formula:input', data => {
      // console.log(this.$root)
      // this.$root.text(data)
    })
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()
    const formula = this.$root.find('#formula')
    this.$on('table:select', $cell => {
      formula.text($cell.text())
    })
    this.$on('table:input', $cell => {
      formula.text($cell.text())
    })
  }

  onInput(event) {
    const text = event.target.textContent.trim()
    this.$emit('formula:input', text)
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done', event.target.textContent.trim())
    }
    // console.log(event.key === 'Backspace' && event.metaKey)
    // if (event.key === 'Backspace' && event.metaKey) {
    //   event.preventDefault()
    //   this.$emit('formula:input', ' ')
    // }
  }
}

import { $ } from '../../core/dom'

export function tableResizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizeble"]')
    const coords = $parent.getCoords()
    let value = coords.width

    const type = $resizer.data.resize
    const numCol = $parent.data.col

    document.body.style.cssText = `
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -khtml-user-select: none;
        -ms-user-select: none;
        `

    if (type === 'col') {
      const offsetBottom =
        $root.$el.clientHeight < document.documentElement.clientHeight
          ? -$root.$el.clientHeight + 25 + 'px'
          : -document.documentElement.clientHeight + 'px'

      $resizer.css({ opacity: 1, bottom: offsetBottom })

      document.onmousemove = e => {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $parent.css({ width: value + 'px' })
        document.body.style.cursor = 'col-resize'
      }
    } else {
      $resizer.css({ opacity: 1 })

      document.onmousemove = e => {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $parent.css({ height: value + 'px' })
        document.body.style.cursor = 'col-resize'
      }
    }

    document.onmouseup = e => {
      document.onmousemove = null
      document.onmouseup = null

      if (type === 'col') {
        $root.findAll(`[data-col="${numCol}"]`).forEach(row => {
          row.style.width = value + 'px'
        })
        $resizer.css({ opacity: 1, bottom: '0px' })
      }

      resolve({
        value,
        type,
        id: type === 'col' ? numCol : $parent.data.row
      })

      $resizer.css({ opacity: 0 })
      document.body.style.cssText = `
          user-select: auto;
          -webkit-user-select: auto;
          -moz-user-select: auto;
          -khtml-user-select: auto;
          -ms-user-select: auto;
          `
    }
  })
}

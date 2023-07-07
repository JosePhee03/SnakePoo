// @ts-check

const attribute = {
  WIDTH: 'width',
  HEIGHT: 'height',
}

export default class SnakeCanvas extends HTMLElement {

  /** @type { number } */
  _height
  /** @type { number } */
  _width
  /** @type { HTMLCanvasElement } */
  _canvas = document.createElement('canvas')

  constructor () {
    super()
  }

  get canvas () {
    return this._canvas
  }

  get width () {
    const widthAtrr = this.getAttribute(attribute.WIDTH)
    return Number(widthAtrr)
  }

  get height () {
    const heightAtrr = this.getAttribute(attribute.HEIGHT)
    return Number(heightAtrr)
  }

  /** @param { number } width */
  set width (width) {
    this.setAttribute(attribute.WIDTH, `${width}`)
  }

  /** @param { number } height */
  set height (height) {
    this.setAttribute(attribute.HEIGHT, `${height}`)
  }

  get styles () {
    return /* html */`
      <style>
        :host {
          position: relative;
        }
        canvas {
          background: radial-gradient(circle, #4f46e4 5%, transparent 11%);
          background-size: ${this.width / 10}px ${this.width / 10}px;
          background-color: #FFFFFF00;
        }
      </style>
    `
  }

  connectedCallback () {
    this.render()

    this.style.position = 'relative'
    this.style.lineHeight = '0'
    this.style.overflow = 'hidden'
    this.width = 360
    this.height = 360
  }

  static get observedAttributes () {
    return [ attribute.WIDTH, attribute.HEIGHT ]
  }

  attributeChangedCallback (attributes, previusValue, currentValue) {
    if (this.isConnected) {
      switch (attributes) {
      case attribute.WIDTH:
        this._width = currentValue
        break
      case attribute.HEIGHT:
        this._height = currentValue
        break
      default:
        throw new Error('Atributo no encontrado')
      }
    }

    this.render()
  }

  render () {
    this.innerHTML = `${this.styles}<snake-status-box></snake-status-box>`
    this.appendChild(this.canvas)

    this.canvas.setAttribute(attribute.WIDTH, `${this._width}`)
    this.canvas.setAttribute(attribute.HEIGHT, `${this._height}`)
  }

}

window.customElements.define('snake-canvas', SnakeCanvas)
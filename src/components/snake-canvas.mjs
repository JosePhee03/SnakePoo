// @ts-check

import { OBSERVER } from '../constants/observer.mjs'
import { state, store } from '../store/state.mjs'

export default class SnakeCanvas extends HTMLElement {

  constructor () {
    super()
    store.subscribe(OBSERVER.WIDTH, this.render.bind(this))
    this._canvas = document.createElement('canvas')
  }

  get canvas () {
    return this._canvas
  }

  get styles () {
    return /* html */`
      <style>
        .backdrop {
          position: relative;
        }
        canvas {
          background: radial-gradient(circle, var(--opacity-80) 5%, transparent 11%);
          background-size: ${state.width / state.size}px ${state.width / state.size}px;
          box-shadow: inset 0 0 10px var(--opacity-80);
          border-radius: 0 0 0.25rem 0.25rem;
        }
      </style>
    `
  }

  connectedCallback () {
    this.render()
    this.style.lineHeight = '0'
  }

  get template () {
    return /* html */`
      <div class="backdrop">
        <snake-status-box></snake-status-box>
      </div>
    `
  }

  render () {
    this.innerHTML = `${this.styles}${this.template}`
    const backdrop = this.querySelector('.backdrop')
    if (backdrop instanceof HTMLElement) {
      this._canvas.setAttribute('width', `${state.width}`)
      this._canvas.setAttribute('height', `${state.height}`)
      backdrop.appendChild(this._canvas)
    }
  }

}

window.customElements.define('snake-canvas', SnakeCanvas)
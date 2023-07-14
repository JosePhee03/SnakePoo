// @ts-check

import { DIRECTION } from '../constants/direction.mjs'
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
          border-radius: 0 0 0.25rem 0.25rem;
          box-shadow: inset 0 0 10px var(--opacity-80), 0 0 4px var(--opacity-80);
        }
        
        .direction {
          width: 100%;
          height: 100%;
          position: absolute;
          opacity: 0;
          transition: 0.2s ease opacity;
          background: white;
        }
        
        #${DIRECTION.UP} {
          clip-path: polygon(50% 50%, 0 0, 100% 0);
        }
        #${DIRECTION.DOWN} {
          clip-path: polygon(50% 50%, 0 100%, 100% 100%);
        }
        #${DIRECTION.LEFT} {
          clip-path: polygon(50% 50%, 0 100%,0 0);
        }
        #${DIRECTION.RIGHT} {
          clip-path: polygon(50% 50%, 100% 100%, 100% 0);
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
      <div class="direction" id="${DIRECTION.UP}">
      </div>
      <div class="direction" id="${DIRECTION.DOWN}">
      </div>
      <div class="direction" id="${DIRECTION.LEFT}">
      </div>
      <div class="direction" id="${DIRECTION.RIGHT}">
      </div>
      <snake-status-box></snake-status-box>
      </div>
    `
  }

  handleEvent (event) {
    if (event.type === 'touchend') {
      const { target } = event.changedTouches[0]
      const { id: key } = target
      target.style.opacity = '0.1'
      setTimeout(() => {
        target.style.opacity = '0'
      }, 200)
      if (Object.values(DIRECTION).includes(key)) {
        const changeDirectionEvent = new CustomEvent('change-direction', {
          detail: {
            direction: key
          },
          bubbles: true,
          composed: true
        })
        this.dispatchEvent(changeDirectionEvent)
      }
    } else throw Error('Evento del teclado no encontrado "Canvas"')
  }

  render () {
    this.innerHTML = `${this.styles}${this.template}`
    const backdrop = this.querySelector('.backdrop')
    if (backdrop instanceof HTMLElement) {
      this._canvas.setAttribute('width', `${state.width}`)
      this._canvas.setAttribute('height', `${state.height}`)
      backdrop.appendChild(this._canvas)
    }

    const directionEL = document.querySelectorAll('.direction')
    directionEL.forEach(el => {
      el.addEventListener('touchend', this)
    })
  }

}

window.customElements.define('snake-canvas', SnakeCanvas)
// @ts-check
import { DIRECTION } from '../constants/direction.mjs'
import { OBSERVER } from '../constants/observer.mjs'
import { Game } from '../models/game.mjs'
import { store } from '../store/state.mjs'
import SnakeCanvas from './snake-canvas.mjs'

class SnakeApp extends HTMLElement {

  constructor () {
    super()
    document.addEventListener('keydown', this)
  }

  handleEvent (event) {
    if (event.type === 'keydown') {
      const key = event.key
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

  connectedCallback () {

    document.addEventListener('DOMContentLoaded', () => {
      const snakeCanvas = document.querySelector('snake-canvas')
      if (snakeCanvas instanceof SnakeCanvas) {
        const context = snakeCanvas.canvas.getContext('2d')

        if (context instanceof CanvasRenderingContext2D) {
          const game = new Game(context)
          store.subscribe(OBSERVER.STATUS, game.updateStatus.bind(game))
        }
      }
    })
  }

}

window.customElements.define('snake-app', SnakeApp)